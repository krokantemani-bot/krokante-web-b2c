import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from './firebase';
import type { PuntoDeVenta } from '../types/store';

export const DEPARTAMENTOS_BOLIVIA = [
  'La Paz',
  'Santa Cruz',
  'Cochabamba',
  'Oruro',
  'Potosí',
  'Tarija',
  'Chuquisaca',
  'Beni',
  'Pando',
];

export const MOCK_STORES: PuntoDeVenta[] = [];

// Cálculo de distancia en Kilómetros reales por ruta vial urbana (Factor de Tortuosidad Urbano ~1.27x sobre Haversine)
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 9999;
  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const directDistance = R * c;
  
  // Factor de tortuosidad urbana (Circuity Factor 1.27x): convierte línea recta en distancia vial real por avenidas, anillos y calles.
  const urbanRoadDistance = directDistance * 1.27;
  
  return Math.round(urbanRoadDistance * 10) / 10; // Redondeado a 1 decimal
}

// Generador de enlace directo a WhatsApp con mensaje pre-redactado (Preferencia: whatsappPublico -> whatsapp)
export function getWhatsAppLink(phoneOrStore: string | PuntoDeVenta, storeNameParam?: string): string {
  let phone = '';
  let storeName = storeNameParam || 'Exhibidor Krokanté';

  if (typeof phoneOrStore === 'object' && phoneOrStore !== null) {
    phone = phoneOrStore.whatsappPublico?.trim() || phoneOrStore.whatsapp || '';
    storeName = phoneOrStore.nombre || storeName;
  } else {
    phone = phoneOrStore || '';
  }

  const cleanPhone = phone ? phone.replace(/\D/g, '') : '59170000000';
  const formattedPhone = cleanPhone.startsWith('591') ? cleanPhone : `591${cleanPhone}`;
  const text = encodeURIComponent(
    `¡Hola ${storeName}! Vi su exhibidor Krokanté en la web y quisiera consultar si tienen stock de maní a granel disponible.`
  );
  return `https://wa.me/${formattedPhone}?text=${text}`;
}

// Generador de enlace directo a Google Maps Navigation
export function getGoogleMapsLink(lat: number, lng: number, storeName?: string): string {
  if (!lat || !lng) return 'https://maps.google.com';
  const queryParam = storeName ? encodeURIComponent(storeName) : `${lat},${lng}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${queryParam}`;
}

// Listener en tiempo real de la colección 'puntos_de_venta' en Firestore con Fallback Mock
export function subscribePuntosDeVenta(
  onUpdate: (stores: PuntoDeVenta[], isUsingMock: boolean) => void
): () => void {
  try {
    const q = query(
      collection(db, 'puntos_de_venta'),
      where('activo', '==', true)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const firestoreStores: PuntoDeVenta[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            const geo = data.coordenadas_puntos_de_venta || {};
            let lat = Number(data.latitude ?? geo.latitude ?? geo.lat);
            let lng = Number(data.longitude ?? geo.longitude ?? geo.lng);

            // Validación de coherencia geográfica: si el departamento es La Paz pero las coordenadas pertenecen a Santa Cruz (lat < -17)
            const deptoStr = (data.departamento || 'La Paz').toLowerCase();
            if (deptoStr.includes('la paz') && (isNaN(lat) || lat < -17.0 || isNaN(lng) || lng > -65.0)) {
              lat = -16.5050; // San Pedro / Centro La Paz
              lng = -68.1320;
            } else if (isNaN(lat) || isNaN(lng)) {
              lat = -16.5000;
              lng = -68.1193;
            }

            return {
              id: doc.id,
              codigo: data.codigo || doc.id,
              nombre: data.nombre || 'Exhibidor Krokanté',
              propietario: data.propietario || '',
              departamento: data.departamento || 'La Paz',
              zona: data.zona || data.direccion || 'San Pedro',
              direccion: data.direccion || data.zona || '',
              whatsapp: data.whatsapp || '',
              whatsappPublico: data.whatsappPublico || data.whatsapp_publico || '',
              onlineStatus: data.onlineStatus ?? true,
              latitude: lat,
              longitude: lng,
              tipoNegocio: data.tipoNegocio || 'Tienda de barrio',
              activo: data.activo ?? true,
              esSocioKrokante: data.esSocioKrokante ?? true,
              fechaCambio: data.fechaCambio || '',
              materialesPopAsociados: data.materialesPopAsociados || [],
              esNuevo: data.esNuevo ?? true
            };
          });

          onUpdate(firestoreStores, false);
        } else {
          onUpdate([], false);
        }

      },
      (error) => {
        console.warn('Conexión con Firestore no disponible o vacía. Usando datos de prueba MOCK_STORES:', error);
        onUpdate(MOCK_STORES, true);
      }
    );

    return unsubscribe;
  } catch (err) {
    console.warn('Fallback inmediato a MOCK_STORES:', err);
    onUpdate(MOCK_STORES, true);
    return () => {};
  }
}

// Geofencing: Verificar si unas coordenadas GPS se encuentran dentro de las fronteras de Bolivia
export function isInsideBolivia(lat: number, lng: number): boolean {
  if (!lat || !lng) return false;
  return lat >= -22.9 && lat <= -9.6 && lng >= -69.7 && lng <= -57.4;
}

// Determinar Departamento automáticamente basado en Coordenadas GPS (Fallback instantáneo)
export function getDepartamentoFromCoords(lat: number, lng: number): string {
  if (!lat || !lng) return 'Bolivia';
  if (lat >= -16.8 && lat <= -16.2 && lng >= -68.3 && lng <= -67.9) return 'La Paz';
  if (lat >= -18.1 && lat <= -17.3 && lng >= -63.5 && lng <= -62.8) return 'Santa Cruz';
  if (lat >= -17.6 && lat <= -17.1 && lng >= -66.4 && lng <= -65.9) return 'Cochabamba';
  if (lat >= -18.2 && lat <= -17.7 && lng >= -67.4 && lng <= -66.8) return 'Oruro';
  if (lat >= -19.8 && lat <= -19.3 && lng >= -66.0 && lng <= -65.4) return 'Potosí';
  if (lat >= -21.8 && lat <= -21.3 && lng >= -65.0 && lng <= -64.4) return 'Tarija';
  if (lat >= -19.3 && lat <= -18.8 && lng >= -65.5 && lng <= -65.0) return 'Chuquisaca';
  if (lat >= -15.2 && lat <= -14.3 && lng >= -65.2 && lng <= -64.3) return 'Beni';
  if (lat >= -11.6 && lat <= -10.7 && lng >= -69.2 && lng <= -68.4) return 'Pando';
  return 'Bolivia';
}

// Almacenar solicitud de zona / barrio de alta demanda en Firestore para análisis B2B
export async function saveZonaRequest(requestData: {
  latitude: number;
  longitude: number;
  departamento?: string;
  ciudad?: string;
  barrio?: string;
  zona?: string;
  direccionFormateada?: string;
  contextoUbicacion?: string;
  tipoNegocioSugerido?: string;
  tiendaSugerida?: string;
  esInternacional?: boolean;
  origen?: string;
}): Promise<string | null> {
  try {
    const { addDoc } = await import('firebase/firestore');
    const cleanData: Record<string, any> = {};
    Object.entries(requestData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        cleanData[key] = value;
      }
    });

    if (cleanData.departamento) {
      cleanData.departamento = cleanData.departamento.replace(/^Departamento de\s+/i, '').replace(/^Department of\s+/i, '').trim();
    } else if (cleanData.latitude && cleanData.longitude) {
      cleanData.departamento = getDepartamentoFromCoords(cleanData.latitude, cleanData.longitude);
    }

    const docRef = await addDoc(collection(db, 'solicitudes_zona'), {
      origen: 'GPS_AUTOMATICO',
      ...cleanData,
      timestamp: new Date().toISOString(),
      estado: 'Pendiente'
    });
    return docRef.id;
  } catch (err) {
    console.error('Error al guardar solicitud en Firestore:', err);
    return null;
  }
}

// Actualizar solicitud existente en Firestore (Opción 1: Enriquecer la misma sesión)
export async function updateZonaRequest(
  docId: string,
  updateData: {
    tipoNegocioSugerido?: string;
    departamento?: string;
    ciudad?: string;
    barrio?: string;
    zona?: string;
    direccionFormateada?: string;
    origen?: string;
  }
): Promise<boolean> {
  try {
    const { doc, updateDoc } = await import('firebase/firestore');
    const cleanData: Record<string, any> = {};
    Object.entries(updateData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        cleanData[key] = value;
      }
    });

    if (cleanData.departamento) {
      cleanData.departamento = cleanData.departamento.replace(/^Departamento de\s+/i, '').replace(/^Department of\s+/i, '').trim();
    }

    const docRef = doc(db, 'solicitudes_zona', docId);
    await updateDoc(docRef, {
      ...cleanData,
      origen: 'FORMULARIO_COMPLETO',
      fechaActualización: new Date().toISOString()
    });
    return true;
  } catch (err) {
    console.error('Error al actualizar solicitud en Firestore:', err);
    return false;
  }
}