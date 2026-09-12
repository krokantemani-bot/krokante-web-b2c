import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { WorldCanvas } from './WorldCanvas';

export const Section2Granel: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Hook de Scroll para el control radiante del Sunburst (crece al bajar, decrece al subir)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Transformación de escala para que la expansión (efecto radiante creciente/decreciente) sea muy notoria al hacer scroll
  const sunburstScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.45, 1.25, 0.6]);
  // Opacidad alta y continua para mantenerlo brillante
  const sunburstOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.7]);

  // Transformación de escala para el texto de los 3 pasos (incremento del 50% por scroll: de 1.0x a 1.5x)
  const stepsScale = useTransform(scrollYProgress, [0.05, 0.4, 0.75], [1, 1.5, 1]);

  // Brillo e intensidad máxima uniforme (100%) para los 3 números en la vista general
  const opacityPaso1 = useTransform(scrollYProgress, [0.0, 0.25, 0.85, 1.0], [0.8, 1, 1, 0.8]);
  const opacityPaso2 = useTransform(scrollYProgress, [0.0, 0.25, 0.85, 1.0], [0.8, 1, 1, 0.8]);
  const opacityPaso3 = useTransform(scrollYProgress, [0.0, 0.25, 0.85, 1.0], [0.8, 1, 1, 0.8]);

  return (
    <section 
      id="section2-granel"
      ref={sectionRef} 
      className="relative z-20 min-h-fit sm:min-h-screen py-10 sm:py-24 px-4 sm:px-6 md:px-10 text-white flex flex-col items-center justify-between overflow-hidden bg-transparent"
    >
      {/* EFECTO DE PARTÍCULAS EXCLUSIVO DE ESTA SECCIÓN */}
      <WorldCanvas flavorId="fuego" />

      {/* 1. TÍTULO PRINCIPAL GENERAL GIGANTE CON SALTO DE LÍNEA */}
      <div className="text-center max-w-5xl mx-auto mb-16 sm:mb-28 md:mb-28 px-4 sm:px-6 relative z-20">
        <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-white font-black leading-[1.02] md:leading-[1.1] drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
          SIGUE LA RUTA<br className="sm:hidden" /> DEL MANÍ TOP
        </h2>
      </div>

      {/* 2. LOS 3 PASOS CON NÚMEROS GIGANTES QUE SE ENCIENDEN AL 100% EN SCROLL */}
      <motion.div 
        style={{ scale: stepsScale }}
        className="w-full max-w-[98%] sm:max-w-3xl md:max-w-4xl lg:max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-4 lg:gap-8 text-center mb-8 md:mb-12 relative z-20 origin-center px-2 sm:px-4"
      >
        {/* Paso 1 -> Dirige a "Encuentra tu mostrador" (#tiendas) y guarda #section2-granel en el historial */}
        <div 
          onClick={() => {
            window.history.pushState({}, '', '#section2-granel');
            window.location.hash = 'tiendas';
          }}
          className="relative px-2 py-3 md:py-8 min-h-[140px] flex flex-col items-center justify-center group overflow-visible cursor-pointer hover:scale-105 transition-transform duration-300 active:scale-95"
        >
          {/* Número Gigante 01 que se enciende al 100% (text-yellow-400 resplandeciente) */}
          <motion.span 
            style={{ opacity: opacityPaso1 }}
            className="absolute inset-0 flex items-center justify-center font-display text-[130px] sm:text-[140px] md:text-[150px] lg:text-[180px] font-black text-[#EAB308] pointer-events-none select-none group-hover:scale-105 transition-all duration-300 leading-none drop-shadow-[0_0_40px_rgba(234,179,8,1)] translate-y-1"
          >
            01
          </motion.span>
          {/* Texto del Paso */}
          <h3 className="relative z-10 font-display text-3xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-4xl uppercase tracking-normal leading-[1.15] drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">
            PASO 1.<br />Busca el <span className="text-[#EAB308] font-black">mostrador KROKANTÉ</span><br />mas cercano
          </h3>
        </div>

        {/* Paso 2 -> Dirige a "Hay un maní krokanté..." (#section3-momentos) y guarda #section2-granel en el historial */}
        <div 
          onClick={() => {
            window.history.pushState({}, '', '#section2-granel');
            window.location.hash = 'section3-momentos';
          }}
          className="relative px-2 py-3 md:py-8 min-h-[140px] flex flex-col items-center justify-center group overflow-visible cursor-pointer hover:scale-105 transition-transform duration-300 active:scale-95"
        >
          {/* Número Gigante 02 que se enciende al 100% */}
          <motion.span 
            style={{ opacity: opacityPaso2 }}
            className="absolute inset-0 flex items-center justify-center font-display text-[130px] sm:text-[140px] md:text-[150px] lg:text-[180px] font-black text-[#EAB308] pointer-events-none select-none group-hover:scale-105 transition-all duration-300 leading-none drop-shadow-[0_0_40px_rgba(234,179,8,1)] translate-y-1"
          >
            02
          </motion.span>
          {/* Texto del Paso */}
          <h3 className="relative z-10 font-display text-3xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-4xl uppercase tracking-normal leading-[1.15] drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">
            PASO 2.<br />Elige tus <span className="text-[#EAB308] font-black">sabores</span><br />favoritos
          </h3>
        </div>

        {/* Paso 3 -> Dirige a "Servido fresco desde el frasco..." (#granel) y guarda #section2-granel en el historial */}
        <div 
          onClick={() => {
            window.history.pushState({}, '', '#section2-granel');
            window.location.hash = 'granel';
          }}
          className="relative px-2 py-3 md:py-8 min-h-[140px] flex flex-col items-center justify-center group overflow-visible cursor-pointer hover:scale-105 transition-transform duration-300 active:scale-95"
        >
          {/* Número Gigante 03 que se enciende al 100% */}
          <motion.span 
            style={{ opacity: opacityPaso3 }}
            className="absolute inset-0 flex items-center justify-center font-display text-[130px] sm:text-[140px] md:text-[150px] lg:text-[180px] font-black text-[#EAB308] pointer-events-none select-none group-hover:scale-105 transition-all duration-300 leading-none drop-shadow-[0_0_40px_rgba(234,179,8,1)] translate-y-1"
          >
            03
          </motion.span>
          {/* Texto del Paso */}
          <h3 className="relative z-10 font-display text-3xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-4xl uppercase tracking-normal leading-[1.15] drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">
            PASO 3.<br />Pide el <span className="text-[#EAB308] font-black">peso</span><br />que quieras
          </h3>
        </div>
      </motion.div>

      {/* 3. CENTRO VISUAL: SUNBURST RADIANTE + MOSTRADOR */}
      <div className="relative w-full max-w-5xl flex items-center justify-center min-h-[220px] sm:min-h-[420px] md:min-h-[500px] my-2 sm:my-4">
        
        {/* SUNBURST RADIANTE ANIMADO POR SCROLL (Reducido 50%) */}
        <motion.div 
          style={{ 
            scale: sunburstScale, 
            opacity: sunburstOpacity 
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        >
          <img 
            src="https://res.cloudinary.com/dcx6wcjlj/image/upload/f_auto,q_auto/sunburst_o8dxcu.png" 
            alt="Sunburst Radiante Krokanté" 
            className="w-[85%] max-w-[650px] sm:max-w-[750px] md:max-w-[850px] h-auto object-contain mix-blend-screen"
          />
        </motion.div>

        {/* MOSTRADOR KROKANTÉ FÍSICO */}
        <div className="relative z-10 w-full max-w-[780px] px-2 flex justify-center">
          <motion.img 
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src="https://res.cloudinary.com/dcx6wcjlj/image/upload/f_auto,q_auto/mostrador_krokante_yzw4rl.png" 
            alt="Mostrador Krokanté Maní a Granel" 
            className="w-full h-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)]"
          />
        </div>

      </div>
    </section>
  );
};
