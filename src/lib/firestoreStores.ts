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

export const MOCK_STORES: PuntoDeVenta[] = [
  {
    id: 'mock-1',
    codigo: 'PV-LP-01',
    nombre: 'Licorería El Barrilete',
    propietario: 'Don Roberto Siles',
    departamento: 'La Paz',
    zona: 'Zona Sur - Calacoto',
    direccion: 'Calle 15 de Calacoto #450, frente al parque',
    whatsapp: '76543210',
    onlineStatus: true,
    latitude: -16.5381,
    longitude: -68.0842,
    tipoNegocio: 'Licorería / Snack',
    activo: true,
    esSocioKrokante: true,
    fechaCambio: '2026-09-01',
    esNuevo: true
  },
  {
    id: 'mock-2',
    codigo: 'PV-LP-02',
    nombre: 'Tienda Doña Martha',
    propietario: 'Doña Martha Gutiérrez',
    departamento: 'La Paz',
    zona: 'Centro - Sopocachi',
    direccion: 'Av. 20 de Octubre #1820 esquina Aspiazu',
    whatsapp: '71234567',
    onlineStatus: true,
    latitude: -16.5098,
    longitude: -68.1275,
    tipoNegocio: 'Tienda de barrio',
    activo: true,
    esSocioKrokante: true,
    fechaCambio: '2026-08-20',
    esNuevo: false
  },
  {
    id: 'mock-3',
    codigo: 'PV-SC-01',
    nombre: 'Supermercado Ketal Equipetrol',
    propietario: 'Administración Ketal',
    departamento: 'Santa Cruz',
    zona: 'Equipetrol Norte',
    direccion: 'Av. San Martín #220 entre 2do y 3er Anillo',
    whatsapp: '78901234',
    onlineStatus: true,
    latitude: -17.7695,
    longitude: -63.1942,
    tipoNegocio: 'Supermercado / Conveniencia',
    activo: true,
    esSocioKrokante: true,
    fechaCambio: '2026-09-05',
    esNuevo: true
  },
  {
    id: 'mock-sc-02',
    codigo: 'PV-SC-02',
    nombre: 'Licorería El Parral Banzer',
    propietario: 'Don Carlos Justiniano',
    departamento: 'Santa Cruz',
    zona: 'Norte - Av. Banzer',
    direccion: 'Av. Cristo Redentor (Banzer) entre 4to y 5to Anillo',
    whatsapp: '77341298',
    onlineStatus: true,
    latitude: -17.7423,
    longitude: -63.1705,
    tipoNegocio: 'Licorería Boutique',
    activo: true,
    esSocioKrokante: true,
    fechaCambio: '2026-09-04',
    esNuevo: true
  },
  {
    id: 'mock-sc-03',
    codigo: 'PV-SC-03',
    nombre: 'Express Market Urubó',
    propietario: 'Mariana Aguilera',
    departamento: 'Santa Cruz',
    zona: 'Urubó - Porongo',
    direccion: 'Av. Principal Urubó Village Plaza Comercial #12',
    whatsapp: '76689012',
    onlineStatus: true,
    latitude: -17.7531,
    longitude: -63.2245,
    tipoNegocio: 'Market 24/7',
    activo: true,
    esSocioKrokante: true,
    fechaCambio: '2026-09-07',
    esNuevo: true
  },
  {
    id: 'mock-sc-04',
    codigo: 'PV-SC-04',
    nombre: 'Bodega La Casona Centro',
    propietario: 'Jorge Roca',
    departamento: 'Santa Cruz',
    zona: 'Centro Histórico - Plaza 24 de Septiembre',
    direccion: 'Calle Rene Moreno #340 esquina Sucre',
    whatsapp: '75019283',
    onlineStatus: true,
    latitude: -17.7834,
    longitude: -63.1818,
    tipoNegocio: 'Bodega Tradicional',
    activo: true,
    esSocioKrokante: false,
    fechaCambio: '2026-08-18',
    esNuevo: false
  },
  {
    id: 'mock-4',
    codigo: 'PV-LP-03',
    nombre: 'Market Expreso Miraflores',
    propietario: 'Carlos Mendoza',
    departamento: 'La Paz',
    zona: 'Miraflores',
    direccion: 'Calle Díaz Romero #890 cerca a la Plaza Estadio',
    whatsapp: '77654321',
    onlineStatus: true,
    latitude: -16.5023,
    longitude: -68.1201,
    tipoNegocio: 'Market 24/7',
    activo: true,
    esSocioKrokante: false,
    fechaCambio: '2026-08-15',
    esNuevo: false
  },
  {
    id: 'mock-5',
    codigo: 'PV-CB-01',
    nombre: 'Bodega El Roble Cine Center',
    propietario: 'Sofía Vargas',
    departamento: 'Cochabamba',
    zona: 'Zona Norte - Cine Center',
    direccion: 'Av. Oquendo y Ramón Rivero #102',
    whatsapp: '76012345',
    onlineStatus: true,
    latitude: -17.3821,
    longitude: -66.1554,
    tipoNegocio: 'Licorería Boutique',
    activo: true,
    esSocioKrokante: true,
    fechaCambio: '2026-09-02',
    esNuevo: true
  },
  {
    id: 'mock-cb-02',
    codigo: 'PV-CB-02',
    nombre: 'Licorería & Snack América',
    propietario: 'Gonzalo Camacho',
    departamento: 'Cochabamba',
    zona: 'Queru Queru - Av. América',
    direccion: 'Av. América Este #452 entre Pando y Melchor Urquidi',
    whatsapp: '72290145',
    onlineStatus: true,
    latitude: -17.3712,
    longitude: -66.1508,
    tipoNegocio: 'Licorería / Snack',
    activo: true,
    esSocioKrokante: true,
    fechaCambio: '2026-09-06',
    esNuevo: true
  },
  {
    id: 'mock-cb-03',
    codigo: 'PV-CB-03',
    nombre: 'Market Express El Prado',
    propietario: 'Patricia Terán',
    departamento: 'Cochabamba',
    zona: 'El Prado - Centro',
    direccion: 'Av. Ballivián #680 frente al Paseo del Prado',
    whatsapp: '71738291',
    onlineStatus: true,
    latitude: -17.3889,
    longitude: -66.1583,
    tipoNegocio: 'Convenience Store',
    activo: true,
    esSocioKrokante: true,
    fechaCambio: '2026-09-03',
    esNuevo: false
  },
  {
    id: 'mock-cb-04',
    codigo: 'PV-CB-04',
    nombre: 'Tienda & Frutos Cala Cala',
    propietario: 'Ramiro Claure',
    departamento: 'Cochabamba',
    zona: 'Cala Cala',
    direccion: 'Av. Libertador Simón Bolívar #1120',
    whatsapp: '70745612',
    onlineStatus: true,
    latitude: -17.3654,
    longitude: -66.1628,
    tipoNegocio: 'Tienda Especializada',
    activo: true,
    esSocioKrokante: true,
    fechaCambio: '2026-09-08',
    esNuevo: true
  },
  {
    id: 'mock-6',
    codigo: 'PV-LP-04',
    nombre: 'Snack & Frutos San Miguel',
    propietario: 'Alejandro Torrez',
    departamento: 'La Paz',
    zona: 'Zona Sur - San Miguel',
    direccion: 'Calle Gabriel René Moreno #1280',
    whatsapp: '72098765',
    onlineStatus: true,
    latitude: -16.5412,
    longitude: -68.0815,
    tipoNegocio: 'Mercado Saludable',
    activo: true,
    esSocioKrokante: true,
    fechaCambio: '2026-09-06',
    esNuevo: true
  }
];

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
  let storeName = storeNameParam || 'Mostrador Krokanté';

  if (typeof phoneOrStore === 'object' && phoneOrStore !== null) {
    phone = phoneOrStore.whatsappPublico?.trim() || phoneOrStore.whatsapp || '';
    storeName = phoneOrStore.nombre || storeName;
  } else {
    phone = phoneOrStore || '';
  }

  const cleanPhone = phone ? phone.replace(/\D/g, '') : '59170000000';
  const formattedPhone = cleanPhone.startsWith('591') ? cleanPhone : `591${cleanPhone}`;
  const text = encodeURIComponent(
    `¡Hola ${storeName}! Vi su mostrador Krokanté en la web y quisiera consultar si tienen stock de maní a granel disponible.`
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
              nombre: data.nombre || 'Mostrador Krokanté',
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

          // Unir tiendas reales de Firestore con los ejemplos enriquecidos MOCK_STORES sin duplicar IDs
          const existingIds = new Set(firestoreStores.map((s) => s.id));
          const uniqueMocks = MOCK_STORES.filter((m) => !existingIds.has(m.id));
          const allStores = [...firestoreStores, ...uniqueMocks];
          onUpdate(allStores, false);
        } else {
          onUpdate(MOCK_STORES, true);
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

// Almacenar solicitud de zona / barrio de alta demanda en Firestore para análisis B2B
export async function saveZonaRequest(requestData: {
  latitude: number;
  longitude: number;
  departamento?: string;
  zona?: string;
  tiendaSugerida?: string;
  esInternacional?: boolean;
}): Promise<boolean> {
  try {
    const { addDoc } = await import('firebase/firestore');
    await addDoc(collection(db, 'solicitudes_zona'), {
      ...requestData,
      timestamp: new Date().toISOString(),
      estado: 'Pendiente'
    });
    return true;
  } catch (err) {
    console.warn('No se pudo guardar la solicitud en Firestore:', err);
    return false;
  }
}
