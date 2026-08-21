import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FlavorProduct {
  id: string;
  name: string;
  image: string;
  accentColor: string;
}

const FLAVORS: FlavorProduct[] = [
  {
    id: 'picante',
    name: 'PICANTE FUEGO',
    image: 'https://res.cloudinary.com/dcx6wcjlj/image/upload/f_auto,q_auto/picante_opt_y5p1rj.png',
    accentColor: '#EF4444'
  },
  {
    id: 'curcuma',
    name: 'CÚRCUMA',
    image: 'https://res.cloudinary.com/dcx6wcjlj/image/upload/f_auto,q_auto/curcuma_opt_ca3ogn.png',
    accentColor: '#EAB308'
  },
  {
    id: 'cebolla',
    name: 'CEBOLLA CRUNCH',
    image: 'https://res.cloudinary.com/dcx6wcjlj/image/upload/f_auto,q_auto/cebolla_opt_uxlsjl.png',
    accentColor: '#22C55E'
  },
  {
    id: 'soya',
    name: 'SALSA SOYA',
    image: 'https://res.cloudinary.com/dcx6wcjlj/image/upload/f_auto,q_auto/salsa_soya_opt_qkbmnr.png',
    accentColor: '#F97316'
  },
  {
    id: 'chocolate',
    name: 'CHOCOLATE',
    image: 'https://res.cloudinary.com/dcx6wcjlj/image/upload/f_auto,q_auto/chocolate_opt_xmv3gl.png',
    accentColor: '#A855F7'
  },
  {
    id: 'mostaza',
    name: 'MOSTAZA CRUNCH',
    image: 'https://res.cloudinary.com/dcx6wcjlj/image/upload/f_auto,q_auto/v1787234815/mostaza_opt_rt2ji1.webp',
    accentColor: '#EAB308'
  }
];

export const Section3Sabores: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef<boolean>(false);

  // Vincular la posición física de la rueda/scroll a la animación
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Mapeos de transformación 1:1 para el lado izquierdo (Preguntas)
  const leftScale = useTransform(scrollYProgress, [0.05, 0.22, 0.45, 0.68], [0.5, 1, 1, 0.9]);
  const leftOpacity = useTransform(scrollYProgress, [0.05, 0.22, 0.45, 0.68], [0, 1, 1, 0]);
  const leftFilter = useTransform(scrollYProgress, [0.05, 0.22, 0.45, 0.68], ['blur(14px)', 'blur(0px)', 'blur(0px)', 'blur(14px)']);
  const leftY = useTransform(scrollYProgress, [0.05, 0.22, 0.45, 0.68], [0, 0, 0, -80]);

  // Mapeos de transformación 1:1 para el lado derecho (¡¡ABURRIDO!! - 3D Zoom + Salida Parallax)
  const rightScale = useTransform(scrollYProgress, [0.12, 0.32, 0.45, 0.68], [7.0, 1, 1, 0.9]);
  const rightOpacity = useTransform(scrollYProgress, [0.12, 0.32, 0.45, 0.68], [0, 1, 1, 0]);
  const rightFilter = useTransform(scrollYProgress, [0.12, 0.32, 0.45, 0.68], ['blur(30px)', 'blur(0px)', 'blur(0px)', 'blur(14px)']);
  const rightY = useTransform(scrollYProgress, [0.12, 0.32, 0.45, 0.68], [0, 0, 0, -80]);

  // Multiplicamos los sabores para permitir un bucle infinito largo
  const displayFlavors = [...FLAVORS, ...FLAVORS, ...FLAVORS, ...FLAVORS, ...FLAVORS, ...FLAVORS];

  useEffect(() => {
    // Solo activamos la animación continua en escritorio/pantalla grande (md:)
    if (window.innerWidth < 768) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;

    const step = () => {
      if (!isHoveredRef.current && container) {
        container.scrollLeft += 0.6; // Desplazamiento lento y refinado

        const maxScroll = container.scrollWidth / 2;
        if (container.scrollLeft >= maxScroll) {
          container.scrollLeft -= maxScroll / 2;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleManualMove = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const isMobile = window.innerWidth < 768;
      const scrollAmount = isMobile ? scrollContainerRef.current.clientWidth : 340;
      
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={sectionRef} className="relative z-20 min-h-[90vh] md:min-h-0 pt-16 md:pt-36 pb-12 md:pb-28 bg-transparent overflow-x-clip overflow-y-visible select-none w-full flex flex-col justify-between md:block">
      
      {/* 50% SUPERIOR EN MÓVIL/TABLET: ÁREA DE TEXTO CON ESTRUCTURA Y COLORES (ESCENA 1 - TEXTOS +70% Y ABURRIDO HORIZONTAL 100% REVERSIBLE) */}
      <div className="flex-1 md:flex-initial flex items-center justify-center pt-8 md:pt-16 pb-6 px-4 md:px-12 md:mb-12">
        <div className="w-full max-w-[95rem] mx-auto flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 py-4 px-2 sm:px-6 md:px-12 relative">
          {/* Parte Superior: Preguntas (+70% más grandes en general, +40% extra en móvil) */}
          <motion.div
            style={{
              scale: leftScale,
              opacity: leftOpacity,
              filter: leftFilter,
              y: leftY
            }}
            className="flex items-center justify-center gap-3 sm:gap-8 md:gap-12 font-display uppercase tracking-tight text-white leading-none shrink-0 z-10 w-full"
          >
            {/* Columna 1 */}
            <div className="flex flex-col text-right">
              <span className="text-[68px] sm:text-8xl md:text-[120px] lg:text-[150px] xl:text-[170px] font-bold">¿Maní</span>
              <span className="text-[68px] sm:text-8xl md:text-[120px] lg:text-[150px] xl:text-[170px] font-bold">con sal?</span>
            </div>

            {/* Barra vertical divisora */}
            <div className="w-[4px] sm:w-[6px] md:w-[8px] h-36 sm:h-44 md:h-64 lg:h-72 bg-white rounded-full shrink-0" />

            {/* Columna 2 */}
            <div className="flex flex-col text-left">
              <span className="text-[68px] sm:text-8xl md:text-[120px] lg:text-[150px] xl:text-[170px] font-bold">¿Maní con</span>
              <span className="text-[68px] sm:text-8xl md:text-[120px] lg:text-[150px] xl:text-[170px] font-bold">azúcar?</span>
            </div>
          </motion.div>
          
          {/* Parte Inferior: ¡¡ABURRIDO!! (+40% en móvil) */}
          <motion.div
            style={{
              scale: rightScale,
              opacity: rightOpacity,
              filter: rightFilter,
              y: rightY,
              rotate: 0
            }}
            className="flex justify-end items-center shrink-0 origin-center mt-2 sm:mt-4 md:mt-6 z-20 w-full max-w-6xl"
          >
            <h2 className="font-display text-[84px] sm:text-8xl md:text-[130px] lg:text-[160px] uppercase tracking-tighter text-[#EF4444] leading-none drop-shadow-[0_0_40px_rgba(239,68,68,0.85)] text-right select-none">
              ¡¡ABURRIDO!!
            </h2>
          </motion.div>
        </div>
      </div>

      {/* ESCENA 2 (CUADRADO PERFECTO EN MÓVIL / 2 COLUMNAS CENTRADAS CONTRA LA LÍNEA EN DESKTOP Y TABLET) */}
      <div className="flex items-center justify-center pt-2 md:pt-8 pb-6 px-2 sm:px-4 md:px-6 my-4 md:my-10 w-full overflow-visible">
        <div className="w-[92vw] sm:w-[85vw] md:w-full max-w-[500px] md:max-w-[95rem] aspect-square md:aspect-auto bg-white text-[#0A0503] rounded-3xl p-4 sm:p-6 md:p-10 lg:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.7)] border border-white/40 flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 font-display uppercase tracking-tighter leading-none z-10 relative overflow-hidden">
          
          {/* Bloque 1: Ahora el / maní es... (Alineado hacia la derecha pegado a la línea central) */}
          <div className="flex flex-col text-center md:text-right shrink-0 w-full md:w-auto">
            <span className="text-[17vw] sm:text-[75px] md:text-[85px] lg:text-[115px] xl:text-[135px] font-bold text-[#0A0503] leading-[0.9]">Ahora el</span>
            <span className="text-[17vw] sm:text-[75px] md:text-[85px] lg:text-[115px] xl:text-[135px] font-bold text-[#0A0503] leading-[0.9]">maní es...</span>
          </div>

          {/* Divisora: Horizontal completa en Cuadrado / Vertical en Tablet y Desktop */}
          <div className="w-full h-[4px] bg-[#0A0503] rounded-full my-2 md:hidden shrink-0" />
          <div className="hidden md:block w-[5px] lg:w-[8px] h-56 lg:h-72 bg-[#0A0503] rounded-full shrink-0" />

          {/* Bloque 2: sabroso, divertido, / muy KROKANTÉ, / definitivamente TOP (Alineado hacia la izquierda pegado a la línea central) */}
          <div className="flex flex-col text-center md:text-left shrink-0 w-full md:w-auto">
            <span className="text-[9.5vw] sm:text-[42px] md:text-[56px] lg:text-[76px] xl:text-[90px] font-bold whitespace-nowrap text-[#0A0503] leading-[0.95]">sabroso, divertido,</span>
            <span className="text-[9.5vw] sm:text-[42px] md:text-[56px] lg:text-[76px] xl:text-[90px] font-bold whitespace-nowrap text-[#0A0503] leading-[0.95]">
              muy <span className="text-[#16A34A] drop-shadow-[0_2px_8px_rgba(22,163,74,0.3)]">KROKANTÉ</span>,
            </span>
            
            {/* Línea 3: definitivamente + TOP */}
            <div className="flex items-center justify-center md:justify-start gap-1 sm:gap-3 leading-[0.95]">
              <span className="text-[8vw] sm:text-[36px] md:text-[56px] lg:text-[76px] xl:text-[90px] font-bold whitespace-nowrap text-[#0A0503]">
                definitivamente
              </span>
              <span className="font-display text-[11vw] sm:text-[48px] md:text-[76px] lg:text-[96px] uppercase font-bold text-[#16A34A] drop-shadow-[0_2px_8px_rgba(22,163,74,0.35)] tracking-tighter transform -rotate-12 inline-block ml-1">
                TOP
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 50% INFERIOR EN MÓVIL: CARRUSEL DE SABORES (Full height/width 100% útil) */}
      <div 
        className="relative w-full overflow-hidden h-[45vh] md:h-auto py-2 md:py-6 group flex items-center"
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
      >
        {/* Flecha Izquierda */}
        <button
          onClick={() => handleManualMove('left')}
          aria-label="Mover Izquierda"
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-16 md:h-16 rounded-full bg-black/85 border border-white/20 text-[#EAB308] hover:scale-110 hover:border-[#EAB308] transition-all flex items-center justify-center shadow-[0_0_25px_rgba(0,0,0,0.9)] backdrop-blur-md active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-7 h-7 md:w-10 md:h-10 stroke-[3]" />
        </button>

        {/* Flecha Derecha */}
        <button
          onClick={() => handleManualMove('right')}
          aria-label="Mover Derecha"
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-16 md:h-16 rounded-full bg-black/85 border border-white/20 text-[#EAB308] hover:scale-110 hover:border-[#EAB308] transition-all flex items-center justify-center shadow-[0_0_25px_rgba(0,0,0,0.9)] backdrop-blur-md active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-7 h-7 md:w-10 md:h-10 stroke-[3]" />
        </button>

        {/* Contenedor Carrusel con Scroll Snap en móvil */}
        <div
          ref={scrollContainerRef}
          className="flex items-center overflow-x-auto scrollbar-none h-full w-full py-2 md:py-6 snap-x snap-mandatory md:snap-none scroll-smooth cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayFlavors.map((flavor, index) => (
            <div
              key={`${flavor.id}-${index}`}
              className="relative flex-shrink-0 w-full sm:w-[35vw] md:w-72 lg:w-80 h-full md:h-[500px] flex items-center justify-center p-0 snap-center"
            >
              <motion.img
                src={flavor.image}
                alt={`Krokanté Maní - ${flavor.name}`}
                whileHover={window.innerWidth >= 768 ? { 
                  rotate: index % 2 === 0 ? 10 : -10,
                  scale: 1.06,
                  y: -8
                } : {}}
                transition={{ 
                  type: 'spring', 
                  stiffness: 300, 
                  damping: 20 
                }}
                className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] transition-transform select-none pointer-events-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
