import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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

  return (
    <section 
      ref={sectionRef} 
      className="relative z-20 min-h-screen py-24 px-6 sm:px-10 md:px-12 text-white flex flex-col items-center justify-between overflow-hidden bg-[radial-gradient(ellipse_at_center,_rgba(10,5,3,1)_30%,_rgba(10,5,3,0.6)_70%,_rgba(10,5,3,0.35)_100%)]"
    >
      {/* 1. TÍTULO PRINCIPAL GENERAL (Optimizado para móvil: En 2 líneas y más grande) */}
      <div className="text-center max-w-5xl mx-auto mb-14 px-4 sm:px-6 space-y-3 relative z-10">
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight text-white font-extrabold leading-[1.1] md:leading-tight">
          La nueva experiencia de maní<br className="hidden sm:inline" /> agranel en tu tienda favorita
        </h2>
      </div>

      {/* 2. LOS 3 PASOS DE CANVA EN 3 COLUMNAS */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-10 relative z-10">
        {/* Paso 1 */}
        <div className="px-4">
          <h3 className="font-display text-2xl sm:text-3xl md:text-3xl lg:text-4xl uppercase tracking-normal leading-snug">
            Buscá el <span className="text-[#EAB308] font-black">mostrador KROKANTÉ</span> mas cercano
          </h3>
        </div>

        {/* Paso 2 */}
        <div className="px-4">
          <h3 className="font-display text-2xl sm:text-3xl md:text-3xl lg:text-4xl uppercase tracking-normal leading-snug">
            Elegí tus <span className="text-[#EAB308] font-black">sabores</span> favoritos
          </h3>
        </div>

        {/* Paso 3 */}
        <div className="px-4">
          <h3 className="font-display text-2xl sm:text-3xl md:text-3xl lg:text-4xl uppercase tracking-normal leading-snug">
            Pedí el <span className="text-[#EAB308] font-black">peso</span> que quieras
          </h3>
        </div>
      </div>

      {/* 3. CENTRO VISUAL: SUNBURST RADIANTE + MOSTRADOR */}
      <div className="relative w-full max-w-5xl flex items-center justify-center min-h-[420px] sm:min-h-[500px] md:min-h-[600px] my-4">
        
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
