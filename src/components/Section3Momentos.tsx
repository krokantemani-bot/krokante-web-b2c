import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Scale, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

interface MomentCardData {
  id: string;
  badge: string;
  badgeBg: string;
  badgeTextColor: string;
  title: string;
  subtitle: string;
  lineName: string;
  flavorName: string;
  story: string;
  pairing: string;
  idealMoment: string;
  videoIdDesktop?: string;
  videoIdMobile?: string;
  labelImg: string;
  bgImage?: string;
  ringColorClass: string;
  accentHex: string;
  cardBg: string;
  textColor: string;
  cardHeightClass: string;
}

export const Section3Momentos: React.FC = () => {
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(0);
  const mobileCarouselRef = useRef<HTMLDivElement>(null);

  const leftColumnMoments: MomentCardData[] = [
    {
      id: 'fuego',
      badge: '🍻 MOMENTO CERVECERO',
      badgeBg: 'bg-red-600',
      badgeTextColor: 'text-white',
      title: 'PICANTE FUEGO',
      subtitle: 'Maní Japonés al Ají Colorado',
      lineName: 'LÍNEA CERVECERA',
      flavorName: 'Picante Fuego',
      story: 'El crujido picante que enciende los churrascos nocturnos y las cervezas frías pasadas las 6 de la tarde.',
      pairing: '🍺 Pilsen, Huari, Paceña & IPAs',
      idealMoment: 'Churrascos nocturnos & previas con amigos.',
      videoIdDesktop: 'ApVoofB_akI',
      videoIdMobile: 'ApVoofB_akI',
      bgImage: 'https://img.youtube.com/vi/ApVoofB_akI/maxresdefault.jpg',
      labelImg: 'https://res.cloudinary.com/dcx6wcjlj/image/upload/v1788362869/Picante_kt7fy5.png',
      ringColorClass: 'ring-2 ring-red-500/90 shadow-[0_0_20px_rgba(239,68,68,0.5)]',
      accentHex: '#DC2626',
      cardBg: 'bg-[#1C1210]',
      textColor: 'text-white',
      cardHeightClass: 'h-[520px] md:h-[680px] lg:h-[860px]'
    },
    {
      id: 'curcuma',
      badge: '⚡ MOMENTO PRE-ENTRENO',
      badgeBg: 'bg-amber-500',
      badgeTextColor: 'text-stone-950 font-black',
      title: 'CÚRCUMA PIMIENTA NEGRA',
      subtitle: 'Maní Japonés Antioxidante',
      lineName: 'LÍNEA SALUDABLE',
      flavorName: 'Cúrcuma Pimienta Negra',
      story: 'Tu recarga de proteína vegetal y energía activa antes de salir a trotar, al gym o a jugar pádel.',
      pairing: '🥤 Agua de coco fresca & Jugos naturales',
      idealMoment: 'Ritual pre-entreno & energía activa.',
      videoIdDesktop: 'WWG4DchYJRc',
      videoIdMobile: 'SRD6qQYs-_I',
      bgImage: 'https://img.youtube.com/vi/WWG4DchYJRc/maxresdefault.jpg',
      labelImg: 'https://res.cloudinary.com/dcx6wcjlj/image/upload/v1788362869/curcuma_c7vfaq.png',
      ringColorClass: 'ring-2 ring-amber-400/90 shadow-[0_0_20px_rgba(250,204,21,0.5)]',
      accentHex: '#D97706',
      cardBg: 'bg-[#241A12]',
      textColor: 'text-white',
      cardHeightClass: 'h-[360px] md:h-[400px] lg:h-[480px]'
    }
  ];

  const rightColumnMoments: MomentCardData[] = [
    {
      id: 'cebolla',
      badge: '🏡 MOMENTO FAMILIAR',
      badgeBg: 'bg-emerald-600',
      badgeTextColor: 'text-white',
      title: 'CEBOLLA CRUNCH',
      subtitle: 'Maní Japonés al Cebollín Dulce',
      lineName: 'LÍNEA FAMILIAR',
      flavorName: 'Cebolla Crunch',
      story: 'El favorito de las tardes-noches en la galería del jardín a partir de las 7 PM para compartir en familia.',
      pairing: '🥤 Refrescos fríos & Tés helados',
      idealMoment: 'Charlas de patio & domingos en familia.',
      videoIdDesktop: 'X4SQkaqEwRE',
      videoIdMobile: 'GzRZhb_Fmb8',
      bgImage: 'https://img.youtube.com/vi/X4SQkaqEwRE/maxresdefault.jpg',
      labelImg: 'https://res.cloudinary.com/dcx6wcjlj/image/upload/v1788362869/Cebolla_y8oij5.png',
      ringColorClass: 'ring-2 ring-emerald-400/90 shadow-[0_0_20px_rgba(16,185,129,0.5)]',
      accentHex: '#059669',
      cardBg: 'bg-[#122018]',
      textColor: 'text-white',
      cardHeightClass: 'h-[360px] md:h-[400px] lg:h-[480px]'
    },
    {
      id: 'soya',
      badge: '💼 MOMENTO URBANO',
      badgeBg: 'bg-neutral-200 text-stone-950 font-black',
      badgeTextColor: 'text-stone-950 font-black',
      title: 'SALSA SOYA TRADICIONAL',
      subtitle: 'Maní Japonés Umami Horneado',
      lineName: 'LÍNEA TRADICIONAL',
      flavorName: 'Salsa Soya Tradicional',
      story: 'El toque tradicional umami para hacer una pausa con estilo durante tu jornada laboral.',
      pairing: '☕ Café helado & Antojo de tarde',
      idealMoment: 'Regreso del almuerzo & pausas de oficina.',
      videoIdDesktop: 'coHWgMXups8',
      videoIdMobile: 'coHWgMXups8',
      bgImage: 'https://img.youtube.com/vi/coHWgMXups8/maxresdefault.jpg',
      labelImg: 'https://res.cloudinary.com/dcx6wcjlj/image/upload/v1788362869/Soya_xw04kx.png',
      ringColorClass: 'ring-2 ring-white/90 shadow-[0_0_20px_rgba(255,255,255,0.5)]',
      accentHex: '#D4D4D4',
      cardBg: 'bg-[#1A1A1A]',
      textColor: 'text-white',
      cardHeightClass: 'h-[520px] md:h-[680px] lg:h-[860px]'
    }
  ];

  const momentsList = [...leftColumnMoments, ...rightColumnMoments];

  // Auto-advance mobile carousel infinitely forward every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (mobileCarouselRef.current) {
        const cardWidth = mobileCarouselRef.current.offsetWidth * 0.85 + 16;
        const currentScroll = mobileCarouselRef.current.scrollLeft;
        const currentIndex = Math.round(currentScroll / cardWidth);
        const nextIndex = currentIndex + 1;

        mobileCarouselRef.current.scrollTo({
          left: nextIndex * cardWidth,
          behavior: 'smooth'
        });

        // Reset silently if we scroll far right into duplicated territory
        if (nextIndex >= momentsList.length * 2 - 1) {
          setTimeout(() => {
            if (mobileCarouselRef.current) {
              mobileCarouselRef.current.scrollTo({
                left: 0,
                behavior: 'instant' as ScrollBehavior
              });
            }
          }, 500);
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [momentsList.length]);

  const handleScrollMobile = () => {
    if (mobileCarouselRef.current) {
      const scrollLeft = mobileCarouselRef.current.scrollLeft;
      const cardWidth = mobileCarouselRef.current.offsetWidth * 0.85 + 16;
      const newIndex = Math.round(scrollLeft / cardWidth) % momentsList.length;
      setActiveMobileIndex(newIndex);

      const totalOriginalWidth = cardWidth * momentsList.length;
      if (scrollLeft >= totalOriginalWidth * 1.8) {
        mobileCarouselRef.current.scrollTo({
          left: scrollLeft - totalOriginalWidth,
          behavior: 'instant' as ScrollBehavior
        });
      }
    }
  };

  const renderCardContent = (m: MomentCardData, isMobileView: boolean = false, keyIndex: number = 0) => (
    <motion.div
      key={`${m.id}-${keyIndex}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`group relative rounded-3xl overflow-hidden shadow-xl border border-stone-800/20 transition-all duration-400 ease-out hover:-translate-y-2 ${m.cardBg} ${
        isMobileView ? 'w-[84vw] max-w-[320px] aspect-[9/16] shrink-0 snap-center' : `w-full ${m.cardHeightClass}`
      }`}
      style={{ clipPath: 'inset(0 rounded 1.5rem)', transform: 'translateZ(0)' }}
    >
      {/* FOTOGRAFÍA ESTÁTICA DE ALTA CALIDAD (FONDO A SANGRADO COMPLETO SIN FRANJAS NEGRAS) */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-stone-950">
        <img
          src={m.bgImage || m.labelImg}
          alt={m.title}
          className="w-full h-full object-cover origin-center opacity-90 scale-[1.3] transition-transform duration-400 ease-out group-hover:scale-[1.35] filter brightness-95 contrast-105"
        />
        {/* Capa de soporte inferior para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out" />
      </div>

      {/* ETIQUETA CIRCULAR DE SABOR: LEVITACIÓN NATURAL 3D EN MÓVIL/TABLET Y TRANSICIÓN EN DESKTOP */}
      {m.labelImg && (
        <div className="absolute inset-0 z-30 pointer-events-none p-6 sm:p-8 flex items-start justify-end">
          <div
            className={`w-20 h-20 sm:w-28 sm:h-28 rounded-full ${m.ringColorClass} transition-all duration-400 ease-out animate-float-natural lg:animate-none lg:group-hover:absolute lg:group-hover:top-1/2 lg:group-hover:left-1/2 lg:group-hover:-translate-x-1/2 lg:group-hover:-translate-y-1/2 lg:group-hover:scale-[1.8] lg:group-hover:rotate-6 drop-shadow-2xl backdrop-blur-sm bg-black/20 p-1`}
          >
            <img 
              src={m.labelImg} 
              alt={`Etiqueta Oficial Krokanté ${m.title}`} 
              className="w-full h-full object-contain pointer-events-none filter contrast-105 drop-shadow-xl"
            />
          </div>
        </div>
      )}

      {/* CONTENIDO INFERIOR: TEXTO MOMENTO Y SABOR (SIEMPRE VISIBLE EN MÓVIL Y TABLET, HOVER EN DESKTOP) */}
      <div className="absolute bottom-0 left-0 right-0 z-30 p-6 sm:p-8 flex flex-col justify-end pointer-events-none">
        <div className="opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-6 transition-all duration-400 ease-out group-hover:opacity-100 group-hover:translate-y-0 space-y-1">
          {/* MOMENTO EN MAYÚSCULAS Y LETRA GRANDE (SIN ÍCONOS) */}
          <p className="font-mono text-xs sm:text-sm md:text-base font-extrabold tracking-widest text-amber-400 uppercase drop-shadow-md">
            {m.badge.replace(/^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}]\s*/u, '')}
          </p>
          {/* TÍTULO DEL SABOR EN LETRAS EXTRA GRANDES */}
          <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-white uppercase tracking-tight leading-none drop-shadow-lg">
            {m.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section 
      id="section3-momentos" 
      className="relative z-20 min-h-screen py-20 md:py-24 px-4 sm:px-6 md:px-12 bg-[#F4ECE1] text-stone-900 overflow-hidden font-sans border-t-2 border-amber-900/10 shadow-inner"
    >
      {/* Textura sutil de papel artesanal apergaminado */}
      <div className="absolute inset-0 bg-[radial-gradient(#D8C8B3_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8 md:space-y-10">
        
        {/* ENCABEZADO DE LA SECCIÓN 3 (Espaciado Ajustado y Compacto) */}
        <div className="text-center max-w-4xl mx-auto space-y-4 md:space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-amber-900/10 border border-amber-900/20 text-amber-900 text-xs font-mono font-bold uppercase tracking-widest"
          >
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>Guía de Sabores & Maridaje Artesanal</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-3xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-stone-950 font-extrabold leading-[1.02] drop-shadow-sm"
          >
            Hay un maní <span className="text-amber-600 bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">KROKANTÉ</span><br className="hidden sm:inline" /> para cada momento de la vida
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-sm sm:text-lg md:text-xl text-stone-700 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Descubre cómo nuestro maní japonés artesanal 100% boliviano, servido fresco desde el frasco de vidrio hermético, acompaña cada instante de tu día a día.
          </motion.p>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* VISTA MÓVIL: CARRUSEL HORIZONTAL CON FLECHAS PEGADAS A LA PANTALLA */}
        {/* ------------------------------------------------------------- */}
        <div className="block md:hidden relative -mx-4 sm:-mx-6">
          
          {/* FLECHA IZQUIERDA PEGADA AL BORDE DE LA PANTALLA */}
          <button
            onClick={() => {
              if (mobileCarouselRef.current) {
                const cardWidth = mobileCarouselRef.current.offsetWidth * 0.85 + 16;
                mobileCarouselRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
              }
            }}
            aria-label="Sabor anterior"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-50 w-11 h-16 rounded-r-full bg-stone-950/90 text-amber-400 flex items-center justify-start pl-1.5 shadow-2xl backdrop-blur-md border border-amber-500/30 active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-7 h-7 stroke-[3]" />
          </button>

          {/* FLECHA DERECHA PEGADA AL BORDE DE LA PANTALLA */}
          <button
            onClick={() => {
              if (mobileCarouselRef.current) {
                const cardWidth = mobileCarouselRef.current.offsetWidth * 0.85 + 16;
                mobileCarouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
              }
            }}
            aria-label="Siguiente sabor"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-50 w-11 h-16 rounded-l-full bg-stone-950/90 text-amber-400 flex items-center justify-end pr-1.5 shadow-2xl backdrop-blur-md border border-amber-500/30 active:scale-95 transition-transform"
          >
            <ChevronRight className="w-7 h-7 stroke-[3]" />
          </button>

          {/* Contenedor del Carrusel Horizontal */}
          <div 
            ref={mobileCarouselRef}
            onScroll={handleScrollMobile}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-4 no-scrollbar scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[...momentsList, ...momentsList].map((m, index) => renderCardContent(m, true, index))}
          </div>

          {/* Indicadores de Paginación para Celular (Dots Inferiores) */}
          <div className="flex items-center justify-center gap-2 pt-4">
            {momentsList.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => {
                  if (mobileCarouselRef.current) {
                    const cardWidth = mobileCarouselRef.current.offsetWidth * 0.85 + 16;
                    mobileCarouselRef.current.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
                  }
                }}
                aria-label={`Ver sabor ${m.title}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeMobileIndex === idx 
                    ? 'w-8 bg-amber-500 shadow-md shadow-amber-500/50' 
                    : 'w-2 bg-stone-400/50 hover:bg-stone-500'
                }`}
              />
            ))}
          </div>


        </div>

        {/* ------------------------------------------------------------- */}
        {/* VISTA ESCRITORIO Y TABLET: BENTO GRID 2 COLUMNAS (COMPUTADORAS) */}
        {/* ------------------------------------------------------------- */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-8 items-start">
          
          {/* COLUMNA IZQUIERDA: Picante Fuego (Alto) + Cúrcuma (Corto) */}
          <div className="flex flex-col gap-6 lg:gap-8 w-full">
            {leftColumnMoments.map((m) => renderCardContent(m, false))}
          </div>

          {/* COLUMNA DERECHA: Cebolla Crunch (Corto) + Salsa Soya (Alto) */}
          <div className="flex flex-col gap-6 lg:gap-8 w-full">
            {rightColumnMoments.map((m) => renderCardContent(m, false))}
          </div>

        </div>

        {/* BANNER REAL DEL MOSTRADOR DE EXHIBICIÓN EN LA BASE */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-amber-400 border-2 border-amber-500 p-6 md:p-8 text-stone-950 font-display text-center shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-left space-y-1">
            <span className="font-mono text-xs uppercase font-black tracking-widest text-amber-950 block">
              Formato de Venta Auténtico en Tiendas de Barrio
            </span>
            <h3 className="text-2xl md:text-4xl uppercase font-black tracking-tight leading-tight">
              ¡MANÍ JAPONÉS A GRANEL!
            </h3>
            <p className="font-sans text-xs sm:text-sm text-stone-900 font-bold">
              ELIGE TU FAVORITO • AL MENOS 100 GR. • PÍDELE A LA CASERA PESO EXACTO
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-5 py-3 rounded-2xl bg-black text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg">
              <Scale className="w-5 h-5 text-amber-400" />
              <span>Desde 100 Gramos</span>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-stone-900 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span>Vidrio Hermético</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Section3Momentos;
