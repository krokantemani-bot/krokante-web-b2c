import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface Hero3DProps {
  onWhereToBuyClick?: () => void;
}

export const Hero3D = ({ onWhereToBuyClick }: Hero3DProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Scroll animations for 3D Parallax
  const { scrollY } = useScroll();
  
  // Layer 1: Background Field - Zoom Out (scale down as user scrolls)
  const rawBgScale = useTransform(scrollY, [0, 600], [1.08, 0.94]);
  const rawBgY = useTransform(scrollY, [0, 600], [0, 40]);
  
  // Layer 2: Foreground Table + Product - Zoom In (scale up as user scrolls)
  const rawFgScale = useTransform(scrollY, [0, 600], [1.0, 1.18]);
  const rawFgY = useTransform(scrollY, [0, 600], [0, -25]);

  // Smooth springs
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
    <section className="relative w-full h-screen min-h-[650px] flex flex-col justify-between overflow-hidden bg-[#0A0503] text-white select-none">
      
      {/* ===== LAYER 1: CAMPO DE FONDO COMPLETO (100% Viewport - Full Bleed) ===== */}
      <motion.div
        style={{
          scale: bgScale,
          y: bgY,
          x: mousePos.x * -0.3,
        }}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      >
        <img
          src="https://res.cloudinary.com/dcx6wcjlj/image/upload/campo-fondo_piukzs.jpg"
          alt="Campo al atardecer Krokanté"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* ===== LAYER 2: MESA Y PRODUCTO A 100% ANCHO COMPLETO (Full Bleed Bottom) ===== */}
      <motion.div
        style={{
          scale: fgScale,
          y: fgY,
          x: mousePos.x * 0.5,
        }}
        className="absolute inset-x-0 bottom-0 w-full h-[62%] sm:h-[70%] md:h-[76%] z-10 pointer-events-none flex items-end justify-center"
      >
        <img
          src="https://res.cloudinary.com/dcx6wcjlj/image/upload/mesa_y_producto_ghe5dy.png"
          alt="Mesa de madera con tazón de maní Krokanté y sello artesanal"
          className="w-full h-full object-cover object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]"
        />
      </motion.div>

      {/* ===== HEADER / NAVBAR ===== */}
      <header className="relative z-30 w-full px-6 md:px-12 py-5 flex items-center justify-between bg-gradient-to-b from-[#120804]/90 via-[#120804]/40 to-transparent">
        {/* Brand Logo (KROKANTÉ MANÍ con icono) */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="flex flex-col text-left">
            <span className="font-display font-black text-2xl md:text-3xl tracking-tight text-[#EB6F12] uppercase leading-none drop-shadow-md">
              KROKANTÉ
            </span>
            <div className="flex items-center gap-1.5 leading-none mt-0.5">
              <span className="font-display font-black text-xl md:text-2xl tracking-tight text-[#EB6F12] uppercase">
                MANÍ
              </span>
              <span className="text-xl">🥜</span>
            </div>
          </div>
        </div>

        {/* Action Button: Dónde comprar */}
        <a
          href="#tiendas"
          onClick={onWhereToBuyClick}
          className="px-6 py-2 rounded-full border border-dashed border-stone-300/40 bg-stone-900/80 backdrop-blur-md text-stone-200 font-sans text-sm font-semibold tracking-wide hover:border-amber-400 hover:text-amber-300 transition-all shadow-lg"
        >
          Dónde comprar
        </a>
      </header>

      {/* ===== TITLES OVER FIELD BACKGROUND ===== */}
      <div className="relative z-20 w-full flex flex-col items-center justify-start pt-2 md:pt-4 px-4 text-center">
        
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#140C07] uppercase leading-tight mb-2"
          style={{
            textShadow: '0px 2px 12px rgba(255, 255, 255, 0.45), 0px 4px 18px rgba(0, 0, 0, 0.7)'
          }}
        >
          ¿Todavía no probaste el maní TOP?
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-3xl font-sans text-base sm:text-xl md:text-2xl text-stone-100 font-medium leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
        >
          En Bolivia, el maní subió de categoría: una capa crujiente, cuatro sabores y mas por descubrir.
        </motion.p>

      </div>

      {/* ===== BOTTOM SPACING ===== */}
      <div className="relative z-20 pb-4 text-center font-mono text-xs text-amber-300/80 uppercase tracking-widest pointer-events-none">
        ✦ Desliza hacia abajo para ver más ✦
      </div>

    </section>
  );
};

export default Hero3D;
