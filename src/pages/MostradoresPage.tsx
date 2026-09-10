import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, MapPin, Compass, MessageCircle, ShieldCheck, Sparkles, Store, RefreshCw, ArrowLeft, List, Map, Globe, Send, X, Frown, ChevronDown, ChevronUp } from 'lucide-react';
import { subscribePuntosDeVenta, calculateDistanceKm, getWhatsAppLink, getGoogleMapsLink, isInsideBolivia, saveZonaRequest, MOCK_STORES } from '../lib/firestoreStores';
import type { PuntoDeVenta } from '../types/store';

const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_PLATFORM_KEY || 'AIzaSyAIfQlbcz6qtYdftaEBocq2I7goDyjOf6Q';

// Estilo Monocromático Neón Sin Íconos Ajeno (Cero colores excepto Krokanté)
const DARK_MAP_STYLES = [
  { elementType: "geometry", stylers: [{ color: "#171717" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#171717" }, { weight: 3 }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#d4d4d8" }] },

  // DESACTIVAR ABSOLUTAMENTE TODOS LOS ÍCONOS DE RUTAS, CARRETERAS Y POIS
  { featureType: "all", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { featureType: "road.highway", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },

  // Nombres de Macrodistritos, Ciudades, Barrios y Zonas en blanco neutro
  { featureType: "administrative", elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }] },
  { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#e4e4e7" }] },
  { featureType: "administrative.neighborhood", elementType: "labels.text.fill", stylers: [{ color: "#a1a1aa" }] },

  // Geometría de Calles y Avenidas en gris monocromático neutro
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#333333" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#525252" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }] },
  { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#3d3d3d" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#d4d4d8" }] },

  // Agua en azul-gris oscuro monocromático
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0d1117" }] },
];

export const MostradoresPage = () => {
  const [stores, setStores] = useState<PuntoDeVenta[]>([]);
  const [isUsingMock, setIsUsingMock] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepto, setSelectedDepto] = useState<string>('TODOS');
  const [selectedStore, setSelectedStore] = useState<PuntoDeVenta | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [mobileView, setMobileView] = useState<'map' | 'list'>('map');
  
  // Soporte de Gesto Drag/Swipe táctil para el botón flotante de Mapa / Lista
  const touchStartXRef = useRef<number | null>(null);
  const touchCurrentXRef = useRef<number | null>(null);
  const isDraggingPillRef = useRef(false);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    touchStartXRef.current = clientX;
    touchCurrentXRef.current = clientX;
    isDraggingPillRef.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDraggingPillRef.current || touchStartXRef.current === null) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    touchCurrentXRef.current = clientX;
  };

  const handleTouchEnd = () => {
    if (!isDraggingPillRef.current || touchStartXRef.current === null || touchCurrentXRef.current === null) {
      isDraggingPillRef.current = false;
      return;
    }
    const diffX = touchCurrentXRef.current - touchStartXRef.current;
    // Si el arrastre es mayor a 25px hacia la derecha -> cambia a 'list', si es a la izquierda -> 'map'
    if (diffX > 25) {
      setMobileView('list');
    } else if (diffX < -25) {
      setMobileView('map');
    }
    touchStartXRef.current = null;
    touchCurrentXRef.current = null;
    isDraggingPillRef.current = false;
  };
  
  // Nuevos estados para tarjeta de distancia, modal B2B y modal internacional
  const [noStoreNearCardOpen, setNoStoreNearCardOpen] = useState(false);
  const [nearestDistanceKm, setNearestDistanceKm] = useState<number | null>(null);
  const [nearestStore, setNearestStore] = useState<PuntoDeVenta | null>(null);
  const [b2bLocationModalOpen, setB2bLocationModalOpen] = useState(false);
  const [internationalModalOpen, setInternationalModalOpen] = useState(false);
  const [suggestedStoreName, setSuggestedStoreName] = useState('');
  const [honeypotValue, setHoneypotValue] = useState('');
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [requestSuccessMsg, setRequestSuccessMsg] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const hasAutoLocatedRef = useRef(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('autoLocate') === 'true' && !hasAutoLocatedRef.current) {
      hasAutoLocatedRef.current = true;
      handleRequestLocation();
    }
  }, [location.search]);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    const unsubscribe = subscribePuntosDeVenta((data, isMock) => {
      setStores(data);
      setIsUsingMock(isMock);
    });
    return () => unsubscribe();
  }, []);

  // Cargar Google Maps JS SDK con la API Key de B2B
  useEffect(() => {
    if ((window as any).google && (window as any).google.maps) {
      setMapsLoaded(true);
      return;
    }

    const scriptId = 'google-maps-script';
    if (document.getElementById(scriptId)) {
      setMapsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}`;
    script.async = true;
    script.onload = () => setMapsLoaded(true);
    script.onerror = (err) => console.error('Error al cargar Google Maps JS API:', err);
    document.head.appendChild(script);
  }, []);

  // Procesar tiendas con distancia GPS
  const processedStores = stores.map((s) => {
    let distanceKm: number | undefined;
    if (userLocation) {
      distanceKm = calculateDistanceKm(userLocation.lat, userLocation.lng, s.latitude, s.longitude);
    }
    return { ...s, distanceKm };
  });

  // Filtrar tiendas
  const filteredStores = processedStores.filter((s) => {
    const matchDepto = selectedDepto === 'TODOS' || s.departamento.toLowerCase().includes(selectedDepto.toLowerCase());
    const query = searchQuery.toLowerCase().trim();
    const matchQuery =
      !query ||
      s.nombre.toLowerCase().includes(query) ||
      s.zona.toLowerCase().includes(query) ||
      s.direccion.toLowerCase().includes(query) ||
      s.departamento.toLowerCase().includes(query) ||
      s.tipoNegocio.toLowerCase().includes(query);

    return matchDepto && matchQuery;
  });

  // Ordenar tiendas estrictamente en orden alfabético A-Z por nombre
  const sortedStores = [...filteredStores].sort((a, b) =>
    a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
  );

  // Geolocalización y Geofencing inteligente
  const handleRequestLocation = () => {
    if (!navigator.geolocation) {
      alert('Tu navegador no soporta geolocalización.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const newLoc = { lat, lng };
        setUserLocation(newLoc);
        setIsLocating(false);

        // Resetear filtros de departamento y búsqueda para mostrar todas las opciones ordenadas por cercanía GPS real
        setSelectedDepto('TODOS');
        setSearchQuery('');

        // 1. Validar Geofencing de Bolivia
        const insideBolivia = isInsideBolivia(lat, lng);
        console.log('Geofencing check:', { lat, lng, insideBolivia });

        if (!insideBolivia) {
          // Extranjero: Abrir Modal Internacional y NO mover el mapa fuera de Bolivia
          setInternationalModalOpen(true);
          return;
        }

        // --- OPCIÓN A: REGISTRO SILENCIOSO AUTOMÁTICO EN FIRESTORE ---
        // Dado que el usuario activó su GPS, guardamos sus coordenadas directamente en el mapa de demanda B2B sin mostrar avisos en pantalla
        saveZonaRequest({
          latitude: lat,
          longitude: lng,
          esInternacional: false,
        });

        // 2. Si está en Bolivia, calcular distancia al mostrador más cercano
        const storeList = stores.length > 0 ? stores : MOCK_STORES;
        let minDist = Infinity;
        let closest: PuntoDeVenta | null = null;
        storeList.forEach((s) => {
          const d = calculateDistanceKm(lat, lng, s.latitude, s.longitude);
          if (d < minDist) {
            minDist = d;
            closest = s;
          }
        });

        console.log('Distance check:', { minDist, closest });
        setNearestDistanceKm(Math.round(minDist * 10) / 10);
        setNearestStore(closest);

        // Umbral dinámico regional (La Paz: 0.8 km, Santa Cruz: 1.5 km, Cochabamba/Otros: 1.0 km)
        const getThresholdKm = (depto?: string) => {
          if (!depto) return 1.0;
          const d = depto.toLowerCase();
          if (d.includes('paz') || d.includes('alto') || d.includes('potosi')) return 0.8;
          if (d.includes('santa cruz') || d.includes('beni') || d.includes('pando')) return 1.5;
          return 1.0;
        };

        const threshold = getThresholdKm((closest as PuntoDeVenta | null)?.departamento);

        if (minDist > threshold) {
          setNoStoreNearCardOpen(true);
        } else {
          setNoStoreNearCardOpen(false);
        }

        // Mover el mapa a la ubicación del usuario si está en Bolivia
        if (mapInstanceRef.current && (window as any).google) {
          mapInstanceRef.current.panTo(newLoc);
          mapInstanceRef.current.setZoom(14);
        }
      },
      (err) => {
        setIsLocating(false);
        console.warn('Error al obtener ubicación:', err);
        alert('No se pudo acceder a tu ubicación.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Guardar solicitud de mostrador con GPS + Nombre de Tienda (Con protección Anti-Bot Honeypot y Rate-Limiting)
  const handleSubmitZonaRequest = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // 1. Trampa Honeypot: si un bot llenó el campo invisible, simular éxito y cancelar silenciosamente
    if (honeypotValue.trim() !== '') {
      console.warn('Bot neutralizado mediante trampa Honeypot.');
      setRequestSuccessMsg('¡Gracias! Tu sugerencia ha sido registrada para expandir Krokanté.');
      setTimeout(() => {
        setB2bLocationModalOpen(false);
        setRequestSuccessMsg('');
        setSuggestedStoreName('');
        setHoneypotValue('');
      }, 1500);
      return;
    }

    // 2. Rate Limiting por dispositivo: máximo 1 envío cada 60 segundos por navegador
    const now = Date.now();
    const lastSubmitTime = localStorage.getItem('krokante_b2b_last_submit');
    if (lastSubmitTime) {
      const diffSeconds = (now - parseInt(lastSubmitTime, 10)) / 1000;
      if (diffSeconds < 60) {
        alert('Has enviado una sugerencia recientemente. Por favor aguarda un momento antes de enviar otra.');
        return;
      }
    }

    if (!suggestedStoreName.trim()) {
      alert('Por favor escribe el nombre de la tienda o negocio cercano antes de enviar.');
      return;
    }
    if (!userLocation) {
      alert('Se requiere tu ubicación GPS para enviar la solicitud.');
      return;
    }
    setIsSubmittingRequest(true);
    try {
      await saveZonaRequest({
        latitude: userLocation.lat,
        longitude: userLocation.lng,
        tiendaSugerida: suggestedStoreName.trim(),
        esInternacional: !isInsideBolivia(userLocation.lat, userLocation.lng),
      });
      
      // Registrar marca de tiempo del envío exitoso para rate-limiting
      localStorage.setItem('krokante_b2b_last_submit', now.toString());

      setRequestSuccessMsg('¡Gracias! Tu sugerencia ha sido registrada para expandir Krokanté.');
      setTimeout(() => {
        setB2bLocationModalOpen(false);
        setRequestSuccessMsg('');
        setSuggestedStoreName('');
        setHoneypotValue('');
      }, 2500);
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error al guardar tu solicitud. Por favor intenta de nuevo.');
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  // Ejecutar búsqueda explícita (al presionar Buscar / Lupa o presionar Enter en teclado móvil/PC)
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }

    const query = searchQuery.trim();
    if (!query || !mapInstanceRef.current || !(window as any).google) return;

    // 1. Si la búsqueda coincide con mostradores existentes registrados con ese nombre o zona
    if (filteredStores.length > 0) {
      const bounds = new (window as any).google.maps.LatLngBounds();
      filteredStores.forEach((s) => bounds.extend({ lat: s.latitude, lng: s.longitude }));
      mapInstanceRef.current.fitBounds(bounds, 60);
      if (filteredStores.length === 1) {
        setSelectedStore(filteredStores[0]);
      }
    } else {
      // 2. Si NO hay mostradores que contengan esa palabra exacta en la base de datos:
      // Usar Google Geocoder para encontrar la ubicación geográfica real del barrio/zona en Bolivia y volar allí.
      const geocoder = new (window as any).google.maps.Geocoder();
      geocoder.geocode(
        {
          address: `${query}, Bolivia`,
          componentRestrictions: { country: 'BO' },
        },
        (results: any[], status: string) => {
          if (status === 'OK' && results && results[0]) {
            const location = results[0].geometry.location;
            const viewport = results[0].geometry.viewport;

            if (viewport) {
              mapInstanceRef.current.fitBounds(viewport);
            } else {
              mapInstanceRef.current.panTo(location);
              mapInstanceRef.current.setZoom(15);
            }

            // Abrir tarjeta de "No hay mostrador cercano en esta zona, ¿quieres sugerir una tienda?"
            setNoStoreNearCardOpen(true);
          }
        }
      );
    }
  };

  const DEPTO_COORDS: Record<string, { lat: number; lng: number; zoom: number }> = {
    'La Paz': { lat: -16.5150, lng: -68.1050, zoom: 14 },
    'Santa Cruz': { lat: -17.7750, lng: -63.1850, zoom: 13.5 },
    'Cochabamba': { lat: -17.3800, lng: -66.1550, zoom: 14 },
  };

  const handleSelectDepto = (dep: string, targetEl?: HTMLElement) => {
    setSelectedDepto(dep);
    setSelectedStore(null);

    // Auto-centrar la pestaña seleccionada en el contenedor con scroll horizontal
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }

    if (mapInstanceRef.current && (window as any).google) {
      const map = mapInstanceRef.current;
      const google = (window as any).google;

      if (dep === 'TODOS') {
        if (stores.length > 0) {
          const bounds = new google.maps.LatLngBounds();
          stores.forEach((s) => bounds.extend({ lat: s.latitude, lng: s.longitude }));
          map.fitBounds(bounds, 50);
        }
      } else {
        const centerInfo = DEPTO_COORDS[dep];
        const deptStores = stores.filter((s) =>
          s.departamento.toLowerCase().includes(dep.toLowerCase()) ||
          s.zona.toLowerCase().includes(dep.toLowerCase()) ||
          s.direccion.toLowerCase().includes(dep.toLowerCase())
        );

        if (deptStores.length > 0) {
          const bounds = new google.maps.LatLngBounds();
          deptStores.forEach((s) => bounds.extend({ lat: s.latitude, lng: s.longitude }));
          map.fitBounds(bounds, { top: 60, right: 60, bottom: 60, left: 60 });
        } else if (centerInfo) {
          map.panTo({ lat: centerInfo.lat, lng: centerInfo.lng });
          map.setZoom(centerInfo.zoom);
        }
      }
    }
  };

  // Renderizar Google Map
  useEffect(() => {
    if (!mapsLoaded || !mapContainerRef.current) return;
    const google = (window as any).google;
    if (!google || !google.maps) return;

    const initialLat = sortedStores[0]?.latitude || -16.5000;
    const initialLng = sortedStores[0]?.longitude || -68.1193;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new google.maps.Map(mapContainerRef.current, {
        center: { lat: initialLat, lng: initialLng },
        zoom: 13,
        styles: DARK_MAP_STYLES,
        disableDefaultUI: true,
        zoomControl: true,
        scrollwheel: true,
        gestureHandling: 'greedy',
      });
    }

    const map = mapInstanceRef.current;

    // Limpiar marcadores anteriores
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    const bounds = new google.maps.LatLngBounds();

    // Marcador usuario si existe
    if (userLocation) {
      const userMarker = new google.maps.Marker({
        position: userLocation,
        map,
        title: 'Tu Ubicación Actual',
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#38bdf8',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
      });
      markersRef.current.push(userMarker);
      bounds.extend(userLocation);
    }

    // InfoWindow reutilizable para las burbujas informativas al pasar el cursor (hover)
    const infoWindow = new google.maps.InfoWindow();

    // Marcadores de tiendas Krokanté (Dorados, prominentes y con alto zIndex)
    filteredStores.forEach((store) => {
      const isSelected = selectedStore?.id === store.id;

      const marker = new google.maps.Marker({
        position: { lat: store.latitude, lng: store.longitude },
        map,
        title: store.nombre,
        zIndex: isSelected ? 9999 : 1000,
        label: {
          text: store.nombre,
          className: 'krokante-map-label',
        },
        icon: {
          path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
          fillColor: isSelected ? '#ffffff' : '#facc15',
          fillOpacity: 1,
          scale: isSelected ? 2.2 : 1.8,
          strokeColor: '#000000',
          strokeWeight: 2,
          anchor: new google.maps.Point(12, 22),
          labelOrigin: new google.maps.Point(12, -10),
        },
      });


      const popupContent = `
        <div style="background-color:#09090b; color:#ffffff; padding:12px 14px; border-radius:12px; border:1.5px solid #facc15; font-family:sans-serif; max-width:240px; box-shadow:0 12px 30px rgba(0,0,0,0.9);">
          <div style="font-size:10px; font-weight:bold; color:#facc15; text-transform:uppercase; letter-spacing:1px; margin-bottom:4px; display:flex; items-center; gap:4px;">
            <span>🍯 MOSTRADOR KROKANTÉ</span>
          </div>
          <div style="font-size:14px; font-weight:bold; color:#ffffff; margin-bottom:2px; leading-height:1.2;">
            ${store.nombre}
          </div>
          <div style="font-size:11px; color:#fbbf24; font-weight:bold; margin-bottom:4px;">
            📍 ${store.zona}
          </div>
          <div style="font-size:11px; color:#a1a1aa; margin-bottom:10px; line-height:1.3;">
            ${store.direccion}
          </div>
          <div style="display:flex; gap:6px;">
            <a href="${getWhatsAppLink(store.whatsapp, store.nombre)}" target="_blank" style="flex:1; text-align:center; background:#059669; color:#ffffff; padding:7px 10px; border-radius:8px; font-size:11px; font-weight:bold; text-decoration:none; display:inline-block;">
              💬 WhatsApp
            </a>
            <a href="${getGoogleMapsLink(store.latitude, store.longitude, store.nombre)}" target="_blank" style="background:#27272a; color:#ffffff; padding:7px 10px; border-radius:8px; font-size:11px; font-weight:bold; text-decoration:none; display:inline-block; border:1px solid rgba(255,255,255,0.2);">
              🗺️ Llegar
            </a>
          </div>
        </div>
      `;

      // Evento de hover (mouseover)
      marker.addListener('mouseover', () => {
        infoWindow.setContent(popupContent);
        infoWindow.open(map, marker);
      });

      // Evento de clic
      marker.addListener('click', () => {
        setSelectedStore(store);
        infoWindow.setContent(popupContent);
        infoWindow.open(map, marker);
        map.panTo({ lat: store.latitude, lng: store.longitude });
        map.setZoom(15);
      });



      markersRef.current.push(marker);
      bounds.extend({ lat: store.latitude, lng: store.longitude });
    });

    if (filteredStores.length > 0 && !selectedStore && !mapInstanceRef.current._hasInitialFit) {
      map.fitBounds(bounds, 60);
      mapInstanceRef.current._hasInitialFit = true;
    }
  }, [mapsLoaded, filteredStores.map(s => s.id).join(','), selectedStore?.id, userLocation]);

  return (
    <div className="relative h-screen w-screen bg-black text-white font-sans flex flex-col overflow-hidden selection:bg-amber-400 selection:text-black">
      {/* HEADER TOP DE PÁGINA INDEPENDIENTE */}
      <header className="relative z-30 px-4 sm:px-6 py-4 border-b border-white/10 bg-black/90 backdrop-blur-xl flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-2.5 rounded-xl bg-neutral-900 border border-amber-400/50 text-amber-400 hover:bg-amber-400 hover:text-black transition-all flex items-center gap-2 font-mono text-xs font-bold shrink-0 cursor-pointer shadow-sm active:scale-95"
            title="Volver a la página principal de Krokanté"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-amber-400 text-black flex items-center justify-center font-display text-lg sm:text-xl font-bold shrink-0">
              K
            </div>
            <div>
              <h1 className="font-display text-lg sm:text-xl uppercase tracking-wider text-white leading-none">
                Encuentra Tu Mostrador
              </h1>
              <span className="text-[10px] sm:text-[11px] text-amber-400 font-mono flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {isUsingMock ? 'Red de Prueba (Demostración)' : 'Red Firestore en Tiempo Real'}
              </span>
            </div>
          </div>
        </div>

        <a
          href="https://b2b.krokantemani.top"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:flex px-4 py-2 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 hover:bg-amber-400 hover:text-black font-mono text-xs font-bold transition-all shrink-0"
        >
          ¿Quieres ser Mostrador Krokanté? B2B
        </a>
      </header>

      {/* BARRA DE BÚSQUEDA Y FILTROS POR DEPARTAMENTO (VISIBLES EN MÓVIL Y DESKTOP) */}
      <div className="relative z-30 p-3 sm:p-4 pb-4 border-b border-white/10 space-y-3.5 bg-neutral-950/95 backdrop-blur-xl shrink-0">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 sm:max-w-3xl">
          <form onSubmit={handleSearchSubmit} className="relative flex-1 sm:max-w-md flex items-center w-full">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por zona, barrio o negocio..."
              className="w-full pl-10 pr-20 py-2.5 rounded-xl bg-zinc-200 focus:bg-white border border-zinc-300 text-zinc-900 font-mono text-xs font-semibold placeholder:text-zinc-500 focus:border-amber-500 outline-none transition-all shadow-inner"
            />
            
            <button
              type="submit"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-amber-600 transition-colors p-0.5"
              title="Buscar en la zona ingresada"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    if (searchInputRef.current) searchInputRef.current.focus();
                  }}
                  className="p-1 text-zinc-400 hover:text-zinc-700 transition-colors"
                  title="Borrar búsqueda"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-black font-mono text-[10px] font-extrabold rounded-lg transition-all shadow-sm flex items-center gap-1 cursor-pointer"
                title="Ejecutar búsqueda"
              >
                <span>Buscar</span>
              </button>
            </div>
          </form>

          <button
            onClick={handleRequestLocation}
            disabled={isLocating}
            className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl text-xs font-mono font-extrabold bg-amber-400 hover:bg-amber-300 text-black shadow-lg shadow-amber-400/25 flex items-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 shrink-0 cursor-pointer"
            title="Obtener Mostradores Cerca de Mí"
          >
            {isLocating ? (
              <RefreshCw className="w-4 h-4 animate-spin text-black" />
            ) : (
              <Compass className="w-4 h-4 text-black font-bold" />
            )}
            <span>Mostrador más cercano</span>
          </button>
        </div>

        <div className="relative">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth px-1 pt-1 pb-1">
            <button
              onClick={(e) => handleSelectDepto('TODOS', e.currentTarget)}
              className={`px-4 py-2 rounded-t-xl text-xs font-mono font-extrabold whitespace-nowrap transition-all shrink-0 cursor-pointer border-t-2 border-x-2 ${
                selectedDepto === 'TODOS'
                  ? 'bg-amber-400 text-black border-amber-400 shadow-lg shadow-amber-400/20 font-black'
                  : 'bg-zinc-900/90 text-zinc-300 border-zinc-500 hover:border-amber-400/60 hover:text-white'
              }`}
            >
              Todos ({stores.length})
            </button>
            {['Cochabamba', 'La Paz', 'Santa Cruz'].map((dep) => (
              <button
                key={dep}
                onClick={(e) => handleSelectDepto(dep, e.currentTarget)}
                className={`px-4 py-2 rounded-t-xl text-xs font-mono font-extrabold whitespace-nowrap transition-all shrink-0 cursor-pointer border-t-2 border-x-2 ${
                  selectedDepto === dep
                    ? 'bg-amber-400 text-black border-amber-400 shadow-lg shadow-amber-400/20 font-black'
                    : 'bg-zinc-900/90 text-zinc-300 border-zinc-500 hover:border-amber-400/60 hover:text-white'
                }`}
              >
                {dep}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* BODY DE LA PÁGINA: PANEL Y MAPA */}
      <div className="relative z-20 flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
        {/* PANEL DE LISTA */}
        <aside
          className={`w-full md:w-[420px] lg:w-[460px] bg-neutral-950/95 border-r border-white/10 flex flex-col shrink-0 relative z-20 shadow-2xl h-full overflow-hidden ${
            mobileView === 'list' ? 'flex' : 'hidden md:flex'
          }`}
        >
          <div className="flex-1 overflow-y-auto p-2 sm:p-3 pb-24 md:pb-4 space-y-1 custom-scrollbar">
            {sortedStores.length === 0 ? (
              <div className="p-8 text-center space-y-3 text-neutral-500">
                <Store className="w-10 h-10 mx-auto opacity-30" />
                <p className="text-xs font-mono">No se encontraron mostradores en esta zona.</p>
              </div>
            ) : (
              sortedStores.map((store) => {
                const isExpanded = selectedStore?.id === store.id;
                return (
                  <div
                    key={store.id}
                    className={`rounded-lg border transition-all overflow-hidden ${
                      isExpanded
                        ? 'bg-amber-400/10 border-amber-400 shadow-lg shadow-amber-400/10'
                        : 'bg-black/60 border-white/10 hover:border-amber-400/40'
                    }`}
                  >
                    {/* CABECERA COMPACTA (SIEMPRE VISIBLE) */}
                    <div
                      onClick={() => {
                        if (isExpanded) {
                          setSelectedStore(null);
                        } else {
                          setSelectedStore(store);
                          if (mapInstanceRef.current && (window as any).google) {
                            mapInstanceRef.current.panTo({ lat: store.latitude, lng: store.longitude });
                            mapInstanceRef.current.setZoom(15);
                          }
                        }
                      }}
                      className="py-1.5 px-2.5 cursor-pointer flex items-center justify-between gap-2 select-none"
                    >
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-white text-xs sm:text-sm leading-snug">{store.nombre}</h4>
                        <div className="flex flex-wrap items-center gap-x-1 font-mono text-[9px] sm:text-[10px] text-amber-400 mt-0.5 opacity-90">
                          <span>{store.zona}</span>
                          {store.distanceKm !== undefined && (
                            <span className="text-zinc-400 font-medium">
                              ; {store.distanceKm} km (~{Math.max(1, Math.round(store.distanceKm * 2.5))} min)
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          className="p-1 rounded-lg bg-neutral-900 border border-white/10 text-neutral-400 hover:text-white transition-colors"
                          aria-label={isExpanded ? 'Plegar detalles' : 'Desplegar detalles'}
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* CUERPO DESPLEGABLE (DETALLES AMPLIADOS) */}
                    {isExpanded && (
                      <div className="px-3 pb-3 pt-1 border-t border-white/10 space-y-2.5 animate-fadeIn">
                        <div className="flex items-center gap-2 flex-wrap pt-1">
                          <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-400 font-mono text-[10px] font-bold uppercase border border-amber-400/30">
                            {store.tipoNegocio}
                          </span>
                          {store.esSocioKrokante && (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold flex items-center gap-1 border border-emerald-500/30">
                              <ShieldCheck className="w-3 h-3" /> Socio Krokanté
                            </span>
                          )}
                          {store.esNuevo && (
                            <span className="px-2 py-0.5 rounded-md bg-yellow-500/20 text-yellow-300 font-mono text-[10px] font-bold flex items-center gap-1 border border-yellow-500/30">
                              <Sparkles className="w-3 h-3" /> Nuevo
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-neutral-300 flex items-start gap-1.5 leading-relaxed">
                          <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{store.direccion}</span>
                        </p>

                        <div className="pt-2 flex items-center gap-2 border-t border-white/10">
                          <a
                            href={getWhatsAppLink(store.whatsapp, store.nombre)}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                          >
                            <MessageCircle className="w-4 h-4 text-emerald-400" />
                            <span>WhatsApp</span>
                          </a>

                          <a
                            href={getGoogleMapsLink(store.latitude, store.longitude, store.nombre)}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-neutral-300 hover:text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                          >
                            <Compass className="w-4 h-4 text-amber-400" />
                            <span>Cómo Llegar</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </aside>

        {/* MAPA GOOGLE MAPS NATIVO EN MODO OSCURO */}
        <main
          className={`w-full md:flex-1 h-full relative z-10 bg-neutral-900 ${
            mobileView === 'map' ? 'block' : 'hidden md:block'
          }`}
        >
          <div ref={mapContainerRef} className="w-full h-full" />
        </main>
      </div>

      {/* BOTÓN FLOTANTE MÓVIL TOGGLE "VER MAPA" / "VER LISTA" (SLIDING INDICATOR + ARRASTRE TÁCTIL DRAG) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 md:hidden">
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
          className="relative p-1.5 rounded-full bg-zinc-950/95 border-2 border-amber-400/80 shadow-[0_0_25px_rgba(250,204,21,0.25)] backdrop-blur-2xl flex items-center ring-1 ring-amber-400/30 select-none cursor-grab active:cursor-grabbing touch-pan-x"
        >
          {/* Pastilla deslizante amarilla que se mueve suavemente al toque o al arrastre con el dedo */}
          <div
            className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-amber-400 rounded-full shadow-md shadow-amber-400/30 transition-transform duration-350 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
              mobileView === 'map' ? 'translate-x-0' : 'translate-x-[calc(100%+6px)]'
            }`}
          />

          <button
            onClick={() => setMobileView('map')}
            className={`relative z-10 w-28 py-2 text-xs font-mono font-extrabold flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer ${
              mobileView === 'map' ? 'text-black' : 'text-zinc-300 hover:text-white'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Ver Mapa</span>
          </button>

          <button
            onClick={() => setMobileView('list')}
            className={`relative z-10 w-28 py-2 text-xs font-mono font-extrabold flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer ${
              mobileView === 'list' ? 'text-black' : 'text-zinc-300 hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Ver Lista</span>
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 1. TARJETA DISTANTE BOLIVIA (> 5 KM)                */}
      {/* ---------------------------------------------------- */}
      {noStoreNearCardOpen && nearestDistanceKm !== null && (
        <div className="fixed top-20 right-4 left-4 md:left-auto md:bottom-8 md:top-auto md:right-8 z-[999] max-w-md w-auto animate-in fade-in slide-in-from-top-5 md:slide-in-from-bottom-5 duration-300">
          <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/95 border border-amber-400/40 shadow-2xl backdrop-blur-2xl text-white relative">
            <button
              onClick={() => setNoStoreNearCardOpen(false)}
              className="absolute top-2 right-2 text-neutral-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors z-20"
              title="Cerrar aviso"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 shrink-0">
                <Frown className="w-6 h-6 text-amber-400" />
              </div>
              <div className="flex-1 pr-6">
                <h4 className="font-bold text-sm text-white leading-snug">
                  ¡Upss, aún no llegamos a tu barrio con un MOSTRADOR KROKANTÉ!
                </h4>
                <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                  El más cercano está a <strong className="text-amber-400 font-mono text-sm">~{nearestDistanceKm !== null ? Math.max(1, Math.round(nearestDistanceKm * 2.5)) : ''} min ({nearestDistanceKm} km)</strong> en <strong className="text-amber-400">{nearestStore?.zona || nearestStore?.departamento || 'tu ciudad'}</strong>.
                </p>

                <div className="mt-3.5 flex flex-wrap items-center gap-2">
                  {nearestStore && (
                    <button
                      onClick={() => {
                        setNoStoreNearCardOpen(false);
                        setSelectedStore(nearestStore);
                        if (mapInstanceRef.current && (window as any).google) {
                          mapInstanceRef.current.panTo({ lat: nearestStore.latitude, lng: nearestStore.longitude });
                          mapInstanceRef.current.setZoom(16);
                        }
                      }}
                      className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold transition-all shadow-lg shadow-amber-400/20"
                    >
                      Ver mostrador a ~{nearestDistanceKm !== null ? Math.max(1, Math.round(nearestDistanceKm * 2.5)) : ''} min ({nearestDistanceKm} km)
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setNoStoreNearCardOpen(false);
                      setB2bLocationModalOpen(true);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <span>💡 Quiero un mostrador en mi barrio</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 3. MODAL MICRO-FORMULARIO CON CONFIDENCIALIDAD B2B   */}
      {/* ---------------------------------------------------- */}
      {b2bLocationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="max-w-md w-full p-6 rounded-3xl bg-neutral-900 border border-white/15 shadow-2xl text-white relative">
            <button
              onClick={() => setB2bLocationModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">¡Ayúdanos a llevar Krokanté a tu barrio!</h3>
                <p className="text-xs text-neutral-400">Sugiérenos una tienda o negocio cercano</p>
              </div>
            </div>

            {requestSuccessMsg ? (
              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <span>{requestSuccessMsg}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitZonaRequest} className="space-y-4 relative">
                {/* Campo Trampa Anti-Bots (Honeypot) - Totalmente invisible para personas reales */}
                <input
                  type="text"
                  name="b2b_website_ref"
                  value={honeypotValue}
                  onChange={(e) => setHoneypotValue(e.target.value)}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="absolute opacity-0 pointer-events-none -z-50 h-0 w-0 overflow-hidden"
                  autoComplete="off"
                />
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1.5">
                    Escribe el nombre o referencia de la tienda (Requerido)
                  </label>
                  <input
                    type="text"
                    required
                    value={suggestedStoreName}
                    onChange={(e) => setSuggestedStoreName(e.target.value)}
                    placeholder="Ej. Tienda Doña Mary, Licorería El Sol, Vértice 4to Anillo..."
                    className={`w-full px-4 py-3 rounded-xl bg-neutral-950 text-white text-xs placeholder:text-neutral-600 focus:outline-none transition-all ${
                      suggestedStoreName.trim()
                        ? 'border-2 border-amber-400 shadow-sm shadow-amber-400/20'
                        : 'border border-amber-400/40'
                    }`}
                    autoFocus
                  />
                </div>

                <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/25 flex items-start gap-2.5 text-neutral-300">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed text-neutral-300">
                    <strong className="text-amber-400">Confidencialidad garantizada:</strong> Tu sugerencia es 100% confidencial. No compartiremos tu información con terceros.
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmittingRequest || !suggestedStoreName.trim()}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      suggestedStoreName.trim()
                        ? 'bg-amber-400 hover:bg-amber-300 text-black shadow-lg shadow-amber-400/20 cursor-pointer'
                        : 'bg-neutral-800 border border-white/10 text-neutral-500 cursor-not-allowed'
                    }`}
                  >
                    {isSubmittingRequest ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    <span>
                      {suggestedStoreName.trim()
                        ? '🚀 Enviar mi sugerencia'
                        : 'Escribe el nombre para enviar'}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 4. MODAL INTERNACIONAL B2B                           */}
      {/* ---------------------------------------------------- */}
      {internationalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="max-w-md w-full p-6 rounded-3xl bg-neutral-900 border border-amber-400/30 shadow-2xl text-white relative">
            <button
              onClick={() => setInternationalModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">¡Gracias por visitarnos desde el exterior!</h3>
                <p className="text-xs text-neutral-400">Actualmente nuestros mostradores físicos operan en Bolivia.</p>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed mb-5">
              ¿Te interesa exportar, franquiciar o solicitar la llegada de Krokanté a tu país? ¡Hablemos por WhatsApp Directo con Exportaciones!
            </p>

            <div className="space-y-3">
              <a
                href="https://wa.me/59177000000?text=Hola%20Krokant%C3%A9,%20estoy%20interesado%20en%20llevar%20sus%20productos%20a%20mi%20pa%C3%ADs"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contactar Exportaciones / B2B WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setInternationalModalOpen(false);
                  setB2bLocationModalOpen(true);
                }}
                className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/15 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Sugerir un negocio en tu zona</span>
              </button>

              <button
                onClick={() => setInternationalModalOpen(false)}
                className="w-full py-2.5 text-center text-xs text-neutral-400 hover:text-white transition-colors"
              >
                Explorar mostradores en Bolivia
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MostradoresPage;
