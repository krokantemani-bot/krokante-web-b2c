import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MapPin, Navigation, Search, ShieldCheck, Flame, Heart, Zap, Store, ArrowUpRight, Scale, Shield } from 'lucide-react';
import { INITIAL_MEDIA_CONFIG } from '../types/cms';
import { WorldCanvas } from '../components/WorldCanvas';
import { Hero3D } from '../components/Hero3D';

interface MomentFlavor {
  id: string;
  name: string;
  line: string;
  headline: string;
  profile: string;
  copy: string;
  bgGradient: string;
  badgeBg: string;
  accentColor: string;
  image: string;
  icon: any;
  notes: string[];
  pairing: string;
  moments: string;
}

export const ArtDirectionExperience = () => {
  const [activeMomentId, setActiveMomentId] = useState<string>('fuego');
  const [searchZone, setSearchZone] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const momentFlavors: MomentFlavor[] = [
    {
      id: 'fuego',
      name: 'PICANTE FUEGO',
      line: 'LÍNEA CERVECERA • FRASCO ROJO',
      headline: 'EL COMPAÑERO DE TUS CERVEZAS FRÍAS',
      profile: 'Ají Colorado nativo horneado al fuego con notas picantes audaces.',
      copy: 'Creado para cuando la sed se pone seria y las risas con amigos se alargan. El maridaje perfecto para elevar cualquier cerveza fría.',
      bgGradient: 'from-red-950 via-red-900 to-black',
      badgeBg: 'bg-red-600 text-white font-black',
      accentColor: '#EF4444',
      image: INITIAL_MEDIA_CONFIG.flavor_fuego.url,
      icon: Flame,
      notes: ['Horneado con Ají Colorado', 'Picor Audaz', '100% Sin Freír'],
      pairing: 'Cervezas frías, IPAs, Pilsen y picadas entre amigos.',
      moments: 'Noches de fin de semana, churrascos y reuniones.'
    },
    {
      id: 'cebolla',
      name: 'CEBOLLA CRUNCH',
      line: 'LÍNEA FAMILIAR • FRASCO VERDE',
      headline: 'EL FAVORITO DE LAS TARDES EN CASA',
      profile: 'Cebollines dulces deshidratados y finas hierbas horneadas.',
      copy: 'El toque aromático perfecto para compartir en familia. Le cae bien a todos en casa y desaparece primero en la mesa.',
      bgGradient: 'from-emerald-950 via-green-950 to-black',
      badgeBg: 'bg-emerald-500 text-black font-black',
      accentColor: '#22C55E',
      image: '/images/cebolla.png',
      icon: Zap,
      notes: ['Cebollines Dulces', 'Hierbas Aromáticas', 'Crujido Familiar'],
      pairing: 'Refrescos gaseosos, jugos naturales y picadas de hogar.',
      moments: 'Tardes de películas, reuniones familiares y ensaladas.'
    },
    {
      id: 'curcuma',
      name: 'CÚRCUMA CRUNCH',
      line: 'LÍNEA SALUDABLE • FRASCO NARANJA',
      headline: 'TU BREAK ACTIVO Y SALUDABLE',
      profile: 'Cúrcuma Dorada + Pimienta Negra activadora horneada al fuego.',
      copy: 'Energía pura y nutrición con carácter. La prueba científica de que cuidarse también suena crujiente.',
      bgGradient: 'from-amber-950 via-yellow-950 to-black',
      badgeBg: 'bg-amber-400 text-black font-black',
      accentColor: '#FACC15',
      image: '/images/soya.png',
      icon: Heart,
      notes: ['Cúrcuma Dorada', 'Pimienta Negra', 'Horneado Antioxidante'],
      pairing: 'Jugos verdes, tés helados y snacks post-entreno.',
      moments: 'Break de gimnasio, caminatas y nutrición activa.'
    },
    {
      id: 'soya',
      name: 'SALSA SOYA',
      line: 'LÍNEA TRADICIONAL • FRASCO NEGRO',
      headline: 'EL CLÁSICO PARA MATAR EL HAMBRE AL PASO',
      profile: 'Salsa de soya artesanal fermentada con toques umami horneados.',
      copy: 'Nuestra receta original. El crujido tradicional perfecto para matar el antojo en la oficina o durante una caminata.',
      bgGradient: 'from-stone-950 via-neutral-900 to-black',
      badgeBg: 'bg-neutral-200 text-black font-black',
      accentColor: '#E5E5E5',
      image: '/images/soya.png',
      icon: Store,
      notes: ['Salsa Soya Umami', 'Horneado Ancestral', 'Sésamo Tostado'],
      pairing: 'Refrescos fríos, tés helados o solo al paso.',
      moments: 'Pausa de oficina, caminatas urbanas y antojo diario.'
    }
  ];

  const currentMoment = momentFlavors.find(m => m.id === activeMomentId) || momentFlavors[0];

  const stores = [
    { name: 'Licorería El Barrilete', zone: 'Zona Sur - Calacoto', address: 'Calle 15 de Calacoto #450' },
    { name: 'Tienda Doña Martha', zone: 'Centro - Sopocachi', address: 'Av. 20 de Octubre #1820' },
    { name: 'Supermercado Ketal', zone: 'Equipetrol', address: 'Av. San Martín #220' },
    { name: 'Market Expreso', zone: 'Miraflores', address: 'Calle Díaz Romero #890' }
  ];

  const filteredStores = stores.filter(s => 
    s.name.toLowerCase().includes(searchZone.toLowerCase()) || 
    s.zone.toLowerCase().includes(searchZone.toLowerCase())
  );

  return (
      {/* HERO SECTION 3D PARALLAX (Sin partículas) */}
      <Hero3D />

      {/* Background Interactive Canvas (Únicamente para la sección de Sabores) */}
      <WorldCanvas flavorId={activeMomentId} />


      {/* MARIDAJE & MOMENTOS SECTION */}
      <section id="maridaje" className="relative z-20 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16 space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400 block">
              Tu Guía Sensorial de Consumo
            </span>
            <h2 className="font-display text-7xl md:text-9xl uppercase tracking-tighter">
              MARIDAJE DE SABORES
            </h2>
          </div>

          {/* Moment Selector Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {momentFlavors.map(m => (
              <button
                key={m.id}
                onClick={() => setActiveMomentId(m.id)}
                className={`px-8 py-4 rounded-full text-xs font-mono font-bold uppercase tracking-widest transition-all border ${
                  activeMomentId === m.id 
                    ? 'bg-white text-black border-white scale-110 shadow-2xl font-black' 
                    : 'bg-black/40 text-neutral-400 border-white/20 hover:border-white/60 hover:text-white'
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>

          {/* ACTIVE MOMENT SHOWCASE */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMoment.id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative rounded-[3rem] border border-white/20 bg-black/40 backdrop-blur-2xl p-8 md:p-16 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Content */}
              <div className="space-y-8 relative z-20 text-left">
                <span className={`inline-block px-5 py-2 rounded-full border text-xs font-mono text-black font-bold uppercase tracking-widest ${currentMoment.badgeBg}`}>
                  {currentMoment.line}
                </span>

                <div>
                  <h3 className="font-display text-7xl md:text-9xl uppercase leading-none text-white tracking-tighter">
                    {currentMoment.name}
                  </h3>
                  <span className="font-mono text-sm font-bold text-amber-400 tracking-widest block mt-2">
                    "{currentMoment.headline}"
                  </span>
                </div>

                <p className="font-sans text-xl md:text-2xl font-bold text-neutral-100 leading-snug">
                  {currentMoment.profile}
                </p>

                <p className="text-sm font-sans text-neutral-300 leading-relaxed max-w-xl">
                  {currentMoment.copy}
                </p>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <span className="font-mono text-xs uppercase tracking-widest text-amber-400 block">
                    Maridaje Sugerido
                  </span>
                  <p className="text-base font-bold text-white">{currentMoment.pairing}</p>
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block">
                    Momento Ideal:
                  </span>
                  <p className="text-sm text-neutral-300 font-medium">{currentMoment.moments}</p>
                </div>
              </div>

              {/* Image Presentation */}
              <div className="relative flex items-center justify-center">
                <div className="w-80 md:w-[450px] aspect-square rounded-full bg-gradient-to-tr from-white/10 to-transparent p-12 border border-white/20 flex items-center justify-center relative">
                  <motion.img 
                    animate={{ 
                      rotate: [-5, 5, -5],
                      y: [-12, 12, -12]
                    }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    src={currentMoment.image}
                    alt={currentMoment.name}
                    className="w-full h-full object-contain relative z-20 drop-shadow-[0_35px_50px_rgba(0,0,0,0.9)]"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* CONCEPTO A GRANEL Y FRESCURA */}
      <section id="granel" className="relative z-20 py-24 px-6 bg-black/80 backdrop-blur-md border-t border-white/10">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400 block mb-2">
              Calidad Artesanal Sin Intermediarios
            </span>
            <h2 className="font-display text-5xl md:text-8xl uppercase tracking-tighter">
              SERVIDO FRESCO DESDE EL FRASCO DE VIDRIO
            </h2>
          </div>

          <p className="max-w-3xl mx-auto text-lg text-neutral-300 font-medium leading-relaxed">
            Olvídate de snacks industriales empaquetados meses atrás. Krokanté se guarda en frascos herméticos de vidrio en la tienda de tu barrio para mantener el crujido y la frescura intactos. Pídeselo a tu casera por peso exacto desde 100g.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-left space-y-3">
              <Shield className="w-8 h-8 text-amber-400" />
              <h4 className="font-bold text-lg text-white">Vidrio Hermético</h4>
              <p className="text-xs text-neutral-400">Protege el maní de la humedad y conserva el aroma horneado al 100%.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-left space-y-3">
              <Scale className="w-8 h-8 text-amber-400" />
              <h4 className="font-bold text-lg text-white">Por Peso Exacto</h4>
              <p className="text-xs text-neutral-400">Elige la cantidad exacta que deseas llevarte desde 100 gramos.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-left space-y-3">
              <Sparkles className="w-8 h-8 text-amber-400" />
              <h4 className="font-bold text-lg text-white">Horneado Al Fuego</h4>
              <p className="text-xs text-neutral-400">Receta artesanal boliviana con capa gruesa crocante, nunca frito.</p>
            </div>
          </div>
        </div>
      </section>

      {/* STORE LOCATOR & B2B BANNER */}
      <section id="tiendas" className="relative z-20 py-32 px-6 bg-black/90 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400 block mb-2">
              Disponibilidad en Tiempo Real
            </span>
            <h2 className="font-display text-6xl md:text-8xl uppercase tracking-tighter">
              ENCUENTRA TU MOSTRADOR
            </h2>
          </div>

          <div className="bg-neutral-900/80 border border-white/20 rounded-3xl p-6 md:p-10 space-y-8 backdrop-blur-md">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-6 h-6 absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input 
                  type="text"
                  value={searchZone}
                  onChange={e => setSearchZone(e.target.value)}
                  placeholder="Ingresa tu barrio o zona (Calacoto, Sopocachi, Equipetrol)..."
                  className="w-full pl-14 pr-6 py-5 rounded-2xl bg-black border border-white/20 text-white font-mono text-sm placeholder-neutral-500 focus:border-amber-400 outline-none"
                />
              </div>
              <button 
                onClick={() => setSearchZone('')}
                className="px-8 py-5 rounded-2xl bg-amber-400 text-black font-display text-xl uppercase tracking-widest hover:bg-yellow-300 transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-5 h-5" />
                <span>Explorar Zonas</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {filteredStores.map((store, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-black/60 border border-white/10 hover:border-amber-400/50 transition-colors flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">{store.name}</h4>
                    <span className="font-mono text-xs text-amber-400 block mb-1">{store.zone}</span>
                    <p className="text-xs text-neutral-400">{store.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Commercial B2B Banner */}
          <div className="p-10 rounded-3xl bg-gradient-to-r from-amber-950 via-yellow-950 to-black border-2 border-amber-400/40 text-left flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">Oportunidad para Tiendas y Licorerías</span>
              <h3 className="font-display text-3xl uppercase text-white">¿TIENES UNA TIENDA DE BARRIO O MERCADO SALUDABLE?</h3>
              <p className="text-sm text-neutral-300 max-w-xl">Instala nuestro exhibidor impreso con 4 frascos de vidrio y gana hasta el 60% de rentabilidad. El producto se vende solo.</p>
            </div>
            <a 
              href="https://b2b.krokantemani.top" 
              target="_blank" 
              rel="noreferrer"
              className="px-8 py-4 rounded-full bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-white transition-all shrink-0 shadow-lg"
            >
              👉 VER MODELO B2B SOCIOS
            </a>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 py-12 px-8 border-t border-white/10 bg-black text-neutral-500 text-xs font-mono flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <span className="font-display text-2xl uppercase text-white block">Krokanté Maní</span>
          <span>Maní Japonés Artesanal 100% Boliviano © 2026.</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="/admin" className="hover:text-amber-400 transition-colors flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Acceso CMS</span>
          </a>
          <a href="https://b2b.krokantemani.top" target="_blank" rel="noreferrer" className="text-amber-400 font-bold hover:underline">
            Acceso Socios B2B
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ArtDirectionExperience;
