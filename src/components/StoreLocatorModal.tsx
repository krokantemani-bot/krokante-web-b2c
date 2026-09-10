import React, { useState, useEffect, useRef } from 'react';
import { X, Search, MapPin, MessageCircle, ExternalLink, ShieldCheck, Sparkles, Store, Compass, RefreshCw } from 'lucide-react';
import type { PuntoDeVenta } from '../types/store';
import { calculateDistanceKm, getWhatsAppLink, getGoogleMapsLink } from '../lib/firestoreStores';


interface StoreLocatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  stores: PuntoDeVenta[];
  initialSelectedZone?: string;
  isUsingMock?: boolean;
}

export const StoreLocatorModal: React.FC<StoreLocatorModalProps> = ({
  isOpen,
  onClose,
  stores,
  initialSelectedZone = '',
  isUsingMock = false,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSelectedZone);
  const [selectedDepto, setSelectedDepto] = useState<string>('TODOS');
  const [selectedStore, setSelectedStore] = useState<PuntoDeVenta | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersGroupRef = useRef<any>(null);

  // Cargar Leaflet CDN dinámicamente si no está presente
  useEffect(() => {
    if (!isOpen) return;

    if ((window as any).L) {
      setLeafletLoaded(true);
      return;
    }

    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(cssLink);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    script.onload = () => {
      setLeafletLoaded(true);
    };
    document.head.appendChild(script);
  }, [isOpen]);

  // Actualizar la lista con distancia si hay ubicación de usuario
  const processedStores = stores.map((s) => {
    let distanceKm: number | undefined;
    if (userLocation) {
      distanceKm = calculateDistanceKm(userLocation.lat, userLocation.lng, s.latitude, s.longitude);
    }
    return { ...s, distanceKm };
  });

  // Filtrado de tiendas
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

  // Ordenar por distancia si hay GPS, o por nuevos primero
  const sortedStores = [...filteredStores].sort((a, b) => {
    if (a.distanceKm !== undefined && b.distanceKm !== undefined) {
      return a.distanceKm - b.distanceKm;
    }
    if (a.esNuevo && !b.esNuevo) return -1;
    if (!a.esNuevo && b.esNuevo) return 1;
    return 0;
  });

  // Solicitar ubicación GPS
  const handleRequestLocation = () => {
    if (!navigator.geolocation) {
      alert('Tu navegador no soporta geolocalización.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newLoc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(newLoc);
        setIsLocating(false);

        if (mapInstanceRef.current && (window as any).L) {
          mapInstanceRef.current.flyTo([newLoc.lat, newLoc.lng], 14, { duration: 1.5 });
        }
      },
      (err) => {
        setIsLocating(false);
        console.warn('Error al obtener geolocalización:', err);
        alert('No se pudo obtener tu ubicación. Mostrando todas las zonas disponibles.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Inicializar o actualizar mapa Leaflet
  useEffect(() => {
    if (!isOpen || !leafletLoaded || !mapContainerRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    // Centro inicial (La Paz por defecto o primer mostrador)
    const initialLat = sortedStores[0]?.latitude || -16.5000;
    const initialLng = sortedStores[0]?.longitude || -68.1193;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: 13,
        zoomControl: false,
      });

      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 18,
      }).addTo(map);


      L.control.zoom({ position: 'bottomright' }).addTo(map);
      mapInstanceRef.current = map;
      markersGroupRef.current = L.layerGroup().addTo(map);
    }

    // Dibujar marcadores
    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;
    markersGroup.clearLayers();

    // Marcador de ubicación de usuario si existe
    if (userLocation) {
      const userIcon = L.divIcon({
        className: 'custom-user-marker',
        html: `<div class="w-6 h-6 rounded-full bg-cyan-400 border-2 border-white animate-ping"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });
      L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
        .addTo(markersGroup)
        .bindTooltip('Tu Ubicación Actual', { permanent: false });
    }

    // Crear marcadores para cada mostrador
    sortedStores.forEach((store) => {
      const isSelected = selectedStore?.id === store.id;

      const jarIconHtml = `
        <div class="relative group cursor-pointer transition-transform duration-300 ${isSelected ? 'scale-125 z-50' : 'hover:scale-110'}">
          <div class="w-10 h-10 rounded-full ${isSelected ? 'bg-amber-400 text-black ring-4 ring-amber-400/50' : 'bg-neutral-900 text-amber-400 border border-amber-400/50'} shadow-xl flex items-center justify-center font-bold text-xs">
            🍯
          </div>
          <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 ${isSelected ? 'bg-amber-400' : 'bg-neutral-900'} rotate-45"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-store-pin',
        html: jarIconHtml,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      const marker = L.marker([store.latitude, store.longitude], { icon: customIcon }).addTo(markersGroup);

      marker.on('click', () => {
        setSelectedStore(store);
        map.flyTo([store.latitude, store.longitude], 15, { duration: 1 });
      });
    });

    // Ajustar vista si hay marcadores
    if (sortedStores.length > 0 && !selectedStore) {
      const bounds = L.latLngBounds(sortedStores.map((s) => [s.latitude, s.longitude]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [isOpen, leafletLoaded, sortedStores.length, selectedStore?.id, userLocation]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col overflow-hidden text-white font-sans selection:bg-amber-400 selection:text-black animate-fade-in">
      {/* HEADER TOP DE BARRA MÓVIL / ESCRITORIO */}
      <header className="px-6 py-4 border-b border-white/10 bg-neutral-950/80 backdrop-blur-md flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-black flex items-center justify-center font-display text-xl font-bold">
            K
          </div>
          <div>
            <h2 className="font-display text-xl uppercase tracking-wider text-white">
              Mapa de Mostradores Krokanté
            </h2>
            <span className="text-[11px] text-amber-400 font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {isUsingMock ? 'Modo Demostración (Datos de Prueba)' : 'Red Firestore en Tiempo Real'}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-2xl bg-neutral-900 border border-white/10 hover:border-amber-400/50 hover:bg-neutral-800 transition-colors"
          title="Cerrar Mapa"
        >
          <X className="w-6 h-6 text-neutral-300" />
        </button>
      </header>

      {/* BODY PRINCIPAL - SPLIT SCREEN EN DESKTOP / VISTA INTEGRADA EN MÓVIL */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* COLUMNA IZQUIERDA: BUSCADOR & LISTADO (380px en PC, Full en Móvil si se conmuta) */}
        <aside className="w-full md:w-[420px] bg-neutral-950/95 border-r border-white/10 flex flex-col h-[50vh] md:h-full shrink-0 relative z-20 shadow-2xl">
          {/* BARRA DE BÚSQUEDA Y CONTROLES */}
          <div className="p-5 border-b border-white/10 space-y-3 bg-neutral-900/50">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por zona, barrio o negocio..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-black border border-white/15 text-white font-mono text-xs placeholder-neutral-500 focus:border-amber-400 outline-none transition-colors"
              />
            </div>

            {/* BANDERAS / DEPARTAMENTOS DE BOLIVIA */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              <button
                onClick={() => setSelectedDepto('TODOS')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all ${
                  selectedDepto === 'TODOS'
                    ? 'bg-amber-400 text-black'
                    : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white'
                }`}
              >
                Todos ({stores.length})
              </button>
              {['La Paz', 'Santa Cruz', 'Cochabamba'].map((dep) => (
                <button
                  key={dep}
                  onClick={() => setSelectedDepto(dep)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all ${
                    selectedDepto === dep
                      ? 'bg-amber-400 text-black'
                      : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white'
                  }`}
                >
                  {dep}
                </button>
              ))}
            </div>

            {/* BOTÓN "CERCA DE MÍ" GPS */}
            <button
              onClick={handleRequestLocation}
              disabled={isLocating}
              className="w-full py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-white/10 text-amber-400 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {isLocating ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Compass className="w-4 h-4 text-amber-400" />
              )}
              <span>{userLocation ? '📍 Posición Actual Detectada' : 'Obtener Mostradores Cerca de Mí'}</span>
            </button>
          </div>

          {/* LISTA DE TARJETAS SCROLLABLE */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {sortedStores.length === 0 ? (
              <div className="p-8 text-center space-y-3 text-neutral-500">
                <Store className="w-10 h-10 mx-auto opacity-30" />
                <p className="text-xs font-mono">No se encontraron mostradores en esta zona.</p>
              </div>
            ) : (
              sortedStores.map((store) => {
                const isSelected = selectedStore?.id === store.id;
                return (
                  <div
                    key={store.id}
                    onClick={() => {
                      setSelectedStore(store);
                      if (mapInstanceRef.current && (window as any).L) {
                        mapInstanceRef.current.flyTo([store.latitude, store.longitude], 15, { duration: 1 });
                      }
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer text-left space-y-3 ${
                      isSelected
                        ? 'bg-amber-400/10 border-amber-400 shadow-lg shadow-amber-400/10'
                        : 'bg-black/60 border-white/10 hover:border-amber-400/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
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
                        <h4 className="font-bold text-white text-base leading-tight">{store.nombre}</h4>
                        <span className="font-mono text-xs text-amber-400 block mt-0.5">{store.zona}</span>
                      </div>

                      {store.distanceKm !== undefined && (
                        <span className="px-2 py-1 bg-neutral-900 border border-white/10 rounded-lg font-mono text-[11px] text-neutral-300 font-bold shrink-0">
                          {store.distanceKm} km
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-neutral-400 flex items-start gap-1.5">
                      <MapPin className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                      <span>{store.direccion}</span>
                    </p>

                    {/* BOTONES DE ACCIÓN DIRECTA */}
                    <div className="pt-2 flex items-center gap-2 border-t border-white/10">
                      <a
                        href={getWhatsAppLink(store.whatsapp, store.nombre)}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 py-2 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp PV</span>
                      </a>

                      <a
                        href={getGoogleMapsLink(store.latitude, store.longitude, store.nombre)}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Cómo Llegar</span>
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </aside>

        {/* COLUMNA DERECHA: CONTENEDOR DEL MAPA LEAFLET */}
        <main className="flex-1 h-[50vh] md:h-full relative z-10 bg-neutral-900">
          <div ref={mapContainerRef} className="w-full h-full" />
        </main>
      </div>
    </div>
  );
};

export default StoreLocatorModal;
