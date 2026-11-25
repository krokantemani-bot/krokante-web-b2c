import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

interface MomentCardProps {
  m: MomentCardData;
  isMobileView?: boolean;
}

const MomentCard: React.FC<MomentCardProps> = ({ m, isMobileView = false }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 95%', 'end 5%'],
  });

  // Scroll-driven continuo: viaje notable al entrar (0 -> 0.42), pico en el centro (0.42 -> 0.58), reverso al salir (0.58 -> 1)
  const overlayOpacity = useTransform(scrollYProgress, [0.05, 0.42, 0.58, 0.95], [0, 1, 1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.42, 0.58, 0.9], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.1, 0.42, 0.58, 0.9], [48, 0, 0, 40]);
  const labelScale = useTransform(scrollYProgress, [0.05, 0.42, 0.58, 0.95], [0.7, 1.45, 1.45, 0.7]);
  const labelRotate = useTransform(scrollYProgress, [0.05, 0.42, 0.58, 0.95], [-14, 6, 6, -14]);
  const labelX = useTransform(scrollYProgress, [0.05, 0.42, 0.58, 0.95], [80, 0, 0, 80]);
  const labelY = useTransform(scrollYProgress, [0.05, 0.42, 0.58, 0.95], [-80, 0, 0, -80]);
  const labelOpacity = useTransform(scrollYProgress, [0.05, 0.35, 0.65, 0.95], [0.25, 1, 1, 0.25]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.32, 1.15]);

  return (
    <Link
      to={`/sabores/${m.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full cursor-pointer focus:outline-none"
    >
      <div
        ref={cardRef}
        className={`group relative rounded-3xl overflow-hidden shadow-xl border border-stone-800/20 transition-shadow duration-300 hover:shadow-2xl ${m.cardBg} ${
          isMobileView ? 'w-[84vw] max-w-[320px] aspect-[9/16] shrink-0 snap-center' : `w-full ${m.cardHeightClass}`
        }`}
        style={{ clipPath: 'inset(0 rounded 1.5rem)' }}
      >
        {/* FOTOGRAFÍA DE FONDO CON ZOOM SCROLL-DRIVEN */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-stone-950">
          <motion.img
            src={m.bgImage || m.labelImg}
            alt={m.title}
            style={isMobileView ? undefined : { scale: imgScale }}
            className="w-full h-full object-cover origin-center opacity-90 scale-[1.25] filter brightness-95 contrast-105"
          />
          {/* Capa oscura inferior impulsada por scroll */}
          <motion.div
            style={isMobileView ? { opacity: 1 } : { opacity: overlayOpacity }}
            className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-10 pointer-events-none"
          />
        </div>

        {/* ETIQUETA CIRCULAR DE SABOR CON EFECTO SCROLL-DRIVEN */}
        {m.labelImg && (
          <div className="absolute inset-0 z-30 pointer-events-none p-6 sm:p-8 flex items-start justify-end lg:items-center lg:justify-center">
            <motion.div
              style={
                isMobileView
                  ? undefined
                  : { x: labelX, y: labelY, scale: labelScale, rotate: labelRotate, opacity: labelOpacity }
              }
              className={`w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full ${m.ringColorClass} ${
                isMobileView ? 'animate-float-natural' : ''
              } drop-shadow-2xl backdrop-blur-sm bg-black/20 p-1`}
            >
              <img
                src={m.labelImg}
                alt={`Etiqueta Oficial Krokanté ${m.title}`}
                className="w-full h-full object-contain pointer-events-none filter contrast-105 drop-shadow-xl"
              />
            </motion.div>
          </div>
        )}

        {/* CONTENIDO INFERIOR: TEXTO MOMENTO Y SABOR IMPULSADO POR SCROLL */}
        <div className="absolute bottom-0 left-0 right-0 z-30 p-6 sm:p-8 flex flex-col justify-end pointer-events-none">
          <motion.div
            style={isMobileView ? undefined : { opacity: textOpacity, y: textY }}
            className="space-y-2"
          >
            <p className="font-mono text-xs sm:text-sm md:text-base font-extrabold tracking-widest text-amber-400 uppercase drop-shadow-md">
              {m.badge.replace(/^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}]\s*/u, '')}
            </p>
            <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-normal leading-none drop-shadow-lg">
              {m.title}
            </h3>
          </motion.div>
        </div>
      </div>
    </Link>
  );
};

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
      story: 'Tu recarga de proteína vegetal y energía activa antes de salir a trotar, al gym o a jugar wally o futsal.',
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
      story: 'El favorito de las tardes-noches en la galería del jardín para compartir en familia.',
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
    <MomentCard key={`${m.id}-${keyIndex}`} m={m} isMobileView={isMobileView} />
  );


  return (
    <section 
      id="section3-momentos" 
      className="relative z-20 min-h-screen py-20 md:py-24 px-4 sm:px-6 md:px-12 bg-[#F5EFDC] text-stone-900 overflow-x-clip font-sans border-t border-stone-300/60"
    >
      {/* Textura sutil de papel artesanal apergaminado */}
      <div className="absolute inset-0 bg-[radial-gradient(#D8C8B3_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:grid lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12 lg:items-start">
        
        {/* ENCABEZADO PINNED EN DESKTOP (IZQUIERDA FIJA) */}
        <div className="text-center lg:text-left max-w-4xl lg:max-w-none mx-auto lg:mx-0 space-y-4 md:space-y-6 lg:col-span-5 lg:sticky lg:top-28">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs sm:text-sm font-mono font-bold tracking-wider inline-block"
          >
            <span className="text-[#F1422A]">[</span>
            <span className="text-stone-900">Guía de Sabores & Maridaje Artesanal</span>
            <span className="text-[#F1422A]">]</span>
          </motion.div>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-6xl tracking-normal text-stone-950 font-extrabold leading-[1.06] drop-shadow-sm flex flex-wrap justify-center lg:justify-start gap-x-[0.26em] gap-y-1"
          >
            {[
              { text: 'Hay', accent: false },
              { text: 'un', accent: false },
              { text: 'maní', accent: false },
              { text: 'Krokanté', accent: true },
              { text: 'para', accent: false },
              { text: 'cada', accent: false },
              { text: 'momento', accent: false },
              { text: 'de', accent: false },
              { text: 'la', accent: false },
              { text: 'vida', accent: false },
            ].map((word, idx) => (
              <span key={idx} className="inline-block overflow-hidden py-0.5">
                <motion.span
                  variants={{
                    hidden: { y: '110%', opacity: 0 },
                    visible: {
                      y: '0%',
                      opacity: 1,
                      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className={`inline-block ${word.accent ? 'text-[#F1422A]' : ''}`}
                >
                  {word.text}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-sm sm:text-lg text-stone-700 font-medium max-w-2xl lg:max-w-md mx-auto lg:mx-0 leading-relaxed"
          >
            Elige el sabor que acompaña tu momento. Cada variedad parte de la misma cobertura crujiente y se termina con una personalidad distinta.
          </motion.p>
        </div>

        {/* COLUMNA DERECHA: CARRUSEL MÓVIL + TARJETAS SCROLLEABLES EN DESKTOP */}
        <div className="lg:col-span-7 w-full">

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
            className="absolute left-0 top-1/2 -translate-y-1/2 z-50 w-11 h-16 rounded-r-full bg-stone-950/90 text-white hover:text-[#F1422A] flex items-center justify-start pl-1.5 shadow-2xl backdrop-blur-md border border-white/15 active:scale-95 transition-transform"
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
            className="absolute right-0 top-1/2 -translate-y-1/2 z-50 w-11 h-16 rounded-l-full bg-stone-950/90 text-white hover:text-[#F1422A] flex items-center justify-end pr-1.5 shadow-2xl backdrop-blur-md border border-white/15 active:scale-95 transition-transform"
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
                    ? 'w-8 bg-[#F1422A] shadow-md shadow-[#F1422A]/40' 
                    : 'w-2 bg-stone-400/50 hover:bg-stone-500'
                }`}
              />
            ))}
          </div>


        </div>

        {/* ------------------------------------------------------------- */}
        {/* VISTA ESCRITORIO Y TABLET: TARJETAS SCROLLEABLES */}
        {/* ------------------------------------------------------------- */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-8 items-start">
          {[...leftColumnMoments, ...rightColumnMoments].map((m) => renderCardContent(m, false))}
        </div>

        </div>
      </div>
    </section>
  );
};

export default Section3Momentos;
