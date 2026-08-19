import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface Hero3DProps {
  onWhereToBuyClick?: () => void;
}

export const Hero3D = ({ onWhereToBuyClick }: Hero3DProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Scroll animations for 3D Parallax
  const { scrollY } = useScroll();
  
  // Layer 1: Background Field ("campo_od41fu.jpg") - Starts at 125% (1.25) and reduces down to 100% (1.0) on scroll
  const rawBgScale = useTransform(scrollY, [0, 500], [1.25, 1.0]);
  const rawBgY = useTransform(scrollY, [0, 500], [0, 35]);
  
  // Layer 2: Foreground Table + Product ("mesa_y_producto_ghe5dy.png") - Zooms in from 100% (1.0) up to 118% (1.18) on scroll
  const rawFgScale = useTransform(scrollY, [0, 500], [1.0, 1.18]);
  const rawFgY = useTransform(scrollY, [0, 500], [0, -25]);

  // Smooth springs for buttery smooth 3D movement
  const bgScale = useSpring(rawBgScale, { stiffness: 90, damping: 20 });
  const bgY = useSpring(rawBgY, { stiffness: 90, damping: 20 });
  const fgScale = useSpring(rawFgScale, { stiffness: 90, damping: 20 });
  const fgY = useSpring(rawFgY, { stiffness: 90, damping: 20 });

  // Subtle 3D tilt tracking mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 14;
      const y = (e.clientY / innerHeight - 0.5) * 14;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] flex flex-col justify-between overflow-hidden bg-[#0A0503] text-white select-none">
      
      {/* ===== LAYER 1: CAMPO DE FONDO ("campo_od41fu.jpg") - 125% a 100% ===== */}
      <motion.div
        style={{
          scale: bgScale,
          y: bgY,
          x: mousePos.x * -0.3,
        }}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none origin-center"
      >
        <img
          src="https://res.cloudinary.com/dcx6wcjlj/image/upload/campo_od41fu.jpg"
          alt="Campo al atardecer Krokanté"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* ===== LAYER 2: MESA Y PRODUCTO EN EL FONDO INFERIOR ===== */}
      <motion.div
        style={{
          scale: fgScale,
          y: fgY,
          x: mousePos.x * 0.5,
        }}
        className="absolute inset-x-0 bottom-0 w-full h-[52%] sm:h-[58%] md:h-[62%] z-10 pointer-events-none flex items-end justify-center origin-bottom"
      >
        <img
          src="https://res.cloudinary.com/dcx6wcjlj/image/upload/mesa_y_producto_ghe5dy.png"
          alt="Mesa de madera con tazón de maní Krokanté y sello artesanal"
          className="w-full h-full object-cover object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]"
        />
      </motion.div>

      {/* ===== HEADER / NAVBAR (100% Transparente) ===== */}
      <header className="relative z-30 w-full px-6 md:px-12 py-4 flex items-center justify-between bg-transparent">
        {/* Brand Logo (Logo oficial de Cloudinary) */}
        <div className="flex items-center cursor-pointer">
          <img
            src="https://res.cloudinary.com/dcx6wcjlj/image/upload/f_auto,q_auto/logo_ultv5b.png"
            alt="Logo Oficial Krokanté Maní"
            className="h-12 md:h-16 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform"
          />
        </div>

        {/* Action Button: Dónde comprar (Transparente empañado, marco blanco delgado, texto Anton) */}
        <a
          href="#tiendas"
          onClick={onWhereToBuyClick}
          className="px-6 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-md text-white font-['Anton',sans-serif] text-base md:text-lg uppercase tracking-wider hover:bg-white/25 hover:border-white transition-all shadow-lg"
        >
          Dónde comprar
        </a>
      </header>


      {/* ===== TITLES OVER SKY / FIELD (Ubicados en la zona superior para no chocar con el tazón) ===== */}
      <div className="relative z-20 w-full flex flex-col items-center justify-start pt-1 md:pt-3 px-4 text-center">
        
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-tight mb-2 text-[#180E07]"
          style={{
            textShadow: '0px 2px 16px rgba(255, 255, 255, 0.6), 0px 4px 22px rgba(0, 0, 0, 0.7)'
          }}
        >
          ¿Todavía no probaste el maní TOP?
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-3xl font-sans text-base sm:text-xl md:text-2xl text-stone-100 font-medium leading-snug drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
        >
          En Bolivia, el maní subió de categoría: una capa crujiente, cuatro sabores y mas por descubrir.
        </motion.p>

      </div>

      {/* ===== BOTTOM SPACING ===== */}
      <div className="relative z-20 pb-3 text-center font-mono text-xs text-amber-300/80 uppercase tracking-widest pointer-events-none">
        ✦ Desliza hacia abajo para ver más ✦
      </div>

    </section>
  );
};

export default Hero3D;
