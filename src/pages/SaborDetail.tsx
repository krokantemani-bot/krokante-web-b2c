import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  Flame, 
  Award,
  Zap,
  MapPin
} from 'lucide-react';
import { FLAVORS_DATA, type FlavorData } from '../data/flavorsData';

export const SaborDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Selected flavor state
  const currentFlavorId = id && FLAVORS_DATA[id] ? id : 'fuego';
  const flavor: FlavorData = FLAVORS_DATA[currentFlavorId] || FLAVORS_DATA['fuego'];

  // Video state
  const [isMobile, setIsMobile] = useState<boolean>(false);


  // Detect mobile screen width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset scroll when flavor changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentFlavorId]);

  const activeVideoId = isMobile ? flavor.videoIdMobile : flavor.videoIdDesktop;

  return (
    <div className="relative min-h-screen bg-[#F4ECE1] text-stone-900 font-sans overflow-x-hidden selection:bg-amber-500 selection:text-stone-950">
      
      {/* Textura sutil de papel artesanal apergaminado (idéntica a Sección 3) */}
      <div className="fixed inset-0 bg-[radial-gradient(#D8C8B3_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none z-0" />

      {/* ------------------------------------------------------------- */}
      {/* CABECERA FIJADA PERMANENTEMENTE AL MARGEN SUPERIOR */}
      {/* ------------------------------------------------------------- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F4ECE1]/95 backdrop-blur-md border-b border-amber-900/15 px-3 sm:px-8 py-2.5 sm:py-3 flex items-center justify-start shadow-md">
        <Link
          to="/#section3-momentos"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-amber-900/10 hover:bg-amber-900/20 border border-amber-900/20 text-amber-950 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all active:scale-95 shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-700 shrink-0" />
          <span>Volver a Guía de Sabores & Maridaje Artesanal</span>
        </Link>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION CON VIDEO AMBIENTAL AUTOPLAY */}
      {/* ------------------------------------------------------------- */}
      <section className="relative z-10 min-h-[80vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden border-b border-amber-900/10">
        
        {/* CONTENEDOR DE VIDEO AMBIENTAL LUMINOSO Y CLARO */}
        <div className="absolute inset-0 z-0 bg-stone-950 overflow-hidden">
          {/* Imagen de fondo estática clara para carga instantánea */}
          <img 
            src={flavor.bgImage || flavor.labelImg} 
            alt={flavor.title} 
            className="absolute inset-0 w-full h-full object-cover scale-125 filter brightness-115 contrast-105"
          />

          <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
            <iframe
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&mute=1&loop=1&playlist=${activeVideoId}&controls=0&showinfo=0&rel=0&enablejsapi=1&modestbranding=1&iv_load_policy=3`}
              title={`Video ambiental Krokanté ${flavor.title}`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[300vw] min-h-[300vh] w-[350vw] h-[350vh] lg:w-[177.77vh] lg:h-[56.25vw] max-w-none opacity-100 filter brightness-115 contrast-105 scale-125 lg:scale-115 pointer-events-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>

          {/* Sombra sutil única únicamente en la base para mantener legibilidad con brillo claro */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/20 to-transparent z-10 pointer-events-none" />
        </div>



        {/* CONTENIDO PRINCIPAL HERO (pt-28 evita sobreposición con la cabecera en móviles) */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-28 pb-16 sm:pt-28 sm:pb-16 w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 text-white">

          
          {/* Texto e Información Principal envueltos en tarjeta de cristal oscuro traslúcido */}
          <motion.div 
            key={flavor.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-2xl text-left bg-stone-950/40 backdrop-blur border border-stone-800/80 p-6 sm:p-8 rounded-3xl shadow-2xl"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className={`px-4 py-1.5 rounded-full text-xs font-mono font-extrabold uppercase tracking-widest ${flavor.badgeBgClass} ${flavor.badgeTextColorClass} shadow-lg`}>
                {flavor.badgeText}
              </span>
              <span className="px-4 py-1.5 rounded-full bg-stone-900/90 border border-stone-700 text-stone-300 text-xs font-mono font-bold uppercase tracking-wider">
                {flavor.lineName}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight leading-[0.95] drop-shadow-2xl">
              {flavor.title}
            </h1>

            <p className="font-mono text-base sm:text-xl text-amber-400 font-bold tracking-wider uppercase">
              "{flavor.subtitle}"
            </p>

            <p className="font-sans text-base sm:text-lg text-stone-200 font-medium leading-relaxed max-w-xl">
              {flavor.shortStory}
            </p>

            {/* Badges de calidad rapidos */}
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-stone-300 font-bold">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900/80 border border-stone-800">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>100% Horneado</span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900/80 border border-stone-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Frasco Hermético de Vidrio</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900/80 border border-stone-800">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Maní 100% Boliviano</span>
              </div>
            </div>

          </motion.div>

          {/* Etiqueta / Frasco 3D Flotante con Levitación */}
          <motion.div 
            key={`img-${flavor.id}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex items-center justify-center shrink-0"
          >
            <div className={`relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full p-4 border-2 border-stone-700/40 bg-stone-950/40 backdrop-blur-md ${flavor.ringColorClass} flex items-center justify-center`}>
              <motion.img 
                animate={{ 
                  y: [-10, 10, -10],
                  rotate: [-3, 3, -3]
                }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                src={flavor.labelImg} 
                alt={flavor.title} 
                className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)]"
              />
            </div>
          </motion.div>

        </div>

      </section>

      {/* ------------------------------------------------------------- */}
      {/* HISTORIA DEL SABOR Y PERFIL ORGANOLÉPTICO (ESTILO APERGAMINADO) */}
      {/* ------------------------------------------------------------- */}
      <section className="relative z-10 py-20 px-4 sm:px-6 md:px-12 border-b border-amber-900/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Columna Izquierda: Historia del Sabor */}
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-900/10 border border-amber-900/20 text-amber-900 font-mono text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Orígenes & Receta Artesanal</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl uppercase font-extrabold tracking-tight text-stone-950 leading-tight">
              HISTORIA DEL SABOR <span className="text-amber-700">{flavor.title}</span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-stone-800 leading-relaxed font-medium">
              {flavor.fullStory}
            </p>

            {/* Ingredientes clave */}
            <div className="pt-4 space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-amber-950 font-extrabold">
                Ingredientes Seleccionados:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {flavor.keyIngredients.map((ing, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs font-mono font-bold text-stone-900 bg-amber-900/5 border border-amber-900/15 p-3 rounded-xl shadow-2xs">
                    <Check className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{ing}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cita del artesano */}
            <div className="p-6 rounded-2xl bg-amber-900/10 border border-amber-900/20 relative overflow-hidden italic text-stone-800 text-sm font-sans">
              <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-amber-600" />
              <p className="mb-2">"{flavor.artisanQuote.text}"</p>
              <span className="font-mono text-xs uppercase font-extrabold text-amber-900 not-italic block">
                — {flavor.artisanQuote.author}
              </span>
            </div>
          </div>

          {/* Columna Derecha: Catación Organoléptica */}
          <div className="bg-stone-900 text-white border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl text-left">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-amber-400 block font-bold mb-1">
                Catación Organoléptica
              </span>
              <h3 className="font-display text-2xl uppercase font-black">
                PERFIL SENSORIAL DEL SABOR
              </h3>
            </div>

            <div className="space-y-4 pt-2">
              {[
                { label: 'CRUJIDO / CROCANCIA', value: flavor.flavorProfile.crunchiness, color: 'bg-amber-400' },
                { label: 'INTENSIDAD DE SABOR', value: flavor.flavorProfile.intensity, color: 'bg-amber-500' },
                { label: 'NIVEL DE PICOR', value: flavor.flavorProfile.spiciness, color: 'bg-red-500' },
                { label: 'NOTAS DULCES', value: flavor.flavorProfile.sweetness, color: 'bg-emerald-400' },
                { label: 'NIVEL UMAMI / SALADO', value: flavor.flavorProfile.umami, color: 'bg-neutral-300' }
              ].filter(item => item.value > 0).map((item, idx) => (

                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center font-mono text-xs font-bold text-stone-300">
                    <span>{item.label}</span>
                    <span className="text-amber-400">{item.value} / 10</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-stone-950 overflow-hidden border border-stone-800">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value * 10}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800 text-xs font-mono text-stone-300 flex items-center gap-3">
              <Zap className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Horneado artesanalmente sin freír. Cada grano mantiene la cubierta crujiente de grosor perfecto.</span>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* MARIDAJE COMPLETO & MOMENTOS DE CONSUMO (APERGAMINADO) */}
      {/* ------------------------------------------------------------- */}
      <section className="relative z-10 py-20 px-4 sm:px-6 md:px-12 border-b border-amber-900/10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-900 font-extrabold block">
              Guía de Combinaciones Sensoriales
            </span>
            <h2 className="font-display text-3xl sm:text-6xl uppercase font-extrabold tracking-tight text-stone-950">
              MARIDAJE COMPLETO & MOMENTOS
            </h2>
            <p className="font-sans text-sm sm:text-base text-stone-700 font-medium">
              Descubre con qué acompañar y cuándo disfrutar al máximo de tu <span className="text-amber-700 font-bold">{flavor.title}</span>.
            </p>
          </div>

          {/* Grid de Bebidas de Maridaje */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {flavor.pairingBeverages.map((bev, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="p-6 rounded-3xl bg-[#EBE1D3] border border-amber-900/15 hover:border-amber-700/50 transition-all text-left space-y-3 shadow-md"
              >
                <div className="text-4xl">{bev.icon}</div>
                <h3 className="font-display text-xl uppercase font-black text-stone-950">{bev.name}</h3>
                <p className="font-sans text-xs sm:text-sm text-stone-800 font-medium leading-relaxed">
                  {bev.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Tarjetas de Momentos Ideales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {flavor.idealMoments.map((mom, idx) => (
              <div 
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-[#EBE1D3] border border-amber-900/15 flex flex-col justify-between gap-4 text-left shadow-md"
              >
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-900/10 border border-amber-900/20 text-amber-900 font-mono text-xs font-extrabold uppercase tracking-widest">
                    {mom.timeSlot}
                  </span>
                  <h3 className="font-display text-2xl uppercase font-extrabold text-stone-950">
                    {mom.title}
                  </h3>
                  <p className="font-sans text-sm text-stone-800 font-medium">
                    {mom.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Banner de Mostrador y Enlace a Mapa de Tiendas */}
          <div className="pt-8">
            <div className="rounded-3xl bg-amber-400 border-2 border-amber-500 p-6 md:p-8 text-stone-950 font-display text-center shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left space-y-1">
                <span className="font-mono text-xs uppercase font-black tracking-widest text-amber-950 block">
                  Encuentra este Sabor en Tiendas de Barrio
                </span>
                <h3 className="text-2xl md:text-4xl uppercase font-black tracking-tight leading-tight">
                  ¡DISPONIBLE EN FRASCO DE VIDRIO HERMÉTICO!
                </h3>
                <p className="font-sans text-xs sm:text-sm text-stone-900 font-bold">
                  PÍDELE A TU CASERA TU GRAMAJE FAVORITO A GRANEL EN CUALQUIER EXPOSITOR
                </p>
              </div>

              <Link
                to="/#tiendas"
                className="px-6 py-3.5 rounded-2xl bg-stone-950 text-amber-400 font-mono text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-stone-900 transition-all shrink-0 shadow-lg active:scale-95"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Ver Mapa de Tiendas</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FOOTER Y RETORNO */}
      {/* ------------------------------------------------------------- */}
      <footer className="relative z-10 py-12 px-6 bg-[#E8DEC8] border-t border-amber-900/10 text-center space-y-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-stone-700">
          <span className="font-display text-xl uppercase text-stone-950 font-black">
            Krokanté Maní B2C
          </span>
          <Link
            to="/#section3-momentos"
            className="hover:text-amber-800 font-bold underline transition-colors"
          >
            ← Volver a Guía de Sabores & Maridaje
          </Link>
          <span>© 2026. Todos los derechos reservados.</span>
        </div>
      </footer>

    </div>
  );
};

export default SaborDetail;
