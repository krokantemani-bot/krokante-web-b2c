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
  const rawBgScale = useTransform(scrollY, [0, 500], [1.08, 0.94]);
  const rawBgY = useTransform(scrollY, [0, 500], [0, 40]);
  
  // Layer 2: Foreground Table + Product - Zoom In (scale up as user scrolls)
  const rawFgScale = useTransform(scrollY, [0, 500], [1.0, 1.15]);
  const rawFgY = useTransform(scrollY, [0, 500], [0, -30]);

  // Smooth springs for buttery smooth interaction
  const bgScale = useSpring(rawBgScale, { stiffness: 90, damping: 20 });
  const bgY = useSpring(rawBgY, { stiffness: 90, damping: 20 });
  const fgScale = useSpring(rawFgScale, { stiffness: 90, damping: 20 });
  const fgY = useSpring(rawFgY, { stiffness: 90, damping: 20 });

  // Subtle 3D tilt tracking mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 16;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#0F0804] text-white select-none">
      
      {/* ===== 1. TOP NAVBAR (Fiel al diseño de Canva) ===== */}
      <header className="relative z-50 w-full px-6 md:px-12 py-5 flex items-center justify-between bg-gradient-to-b from-[#140A05] via-[#140A05]/80 to-transparent">
        {/* Brand Logo (KROKANTÉ MANÍ con icono) */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="flex flex-col text-left">
            <span className="font-display font-black text-2xl md:text-3xl tracking-tight text-[#E8751A] uppercase leading-none drop-shadow-md">
              KROKANTÉ
            </span>
            <div className="flex items-center gap-1.5 leading-none mt-0.5">
              <span className="font-display font-black text-xl md:text-2xl tracking-tight text-[#E8751A] uppercase">
                MANÍ
              </span>
              <span className="text-xl">🥜</span>
            </div>
          </div>
        </div>

        {/* Action Button: Dónde comprar (Óvalo con borde punteado) */}
        <a
          href="#tiendas"
          onClick={onWhereToBuyClick}
          className="px-6 py-2 rounded-full border border-dashed border-stone-400/50 bg-stone-900/60 backdrop-blur-md text-stone-200 font-sans text-sm font-semibold tracking-wide hover:border-amber-400 hover:text-amber-300 hover:bg-stone-900 transition-all shadow-md"
        >
          Dónde comprar
        </a>
      </header>

      {/* ===== 2. HERO CONTENT & 3D PARALLAX CONTAINER ===== */}
      <div className="relative flex-1 w-full flex flex-col items-center justify-start pt-4 md:pt-6 pb-8 px-4 text-center z-30">
        
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#1C120C] uppercase leading-tight mb-3 drop-shadow-[0_2px_4px_rgba(255,255,255,0.4)]"
          style={{
            textShadow: '0px 2px 10px rgba(0, 0, 0, 0.4), 0px 0px 20px rgba(255, 235, 200, 0.6)'
          }}
        >
          ¿Todavía no probaste el maní TOP?
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="max-w-3xl font-sans text-base sm:text-xl md:text-2xl text-stone-100 font-medium leading-snug mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
        >
          En Bolivia, el maní subió de categoría: una capa crujiente, cuatro sabores y mas por descubrir.
        </motion.p>

        {/* ===== 3. MULTI-LAYER 3D PARALLAX CANVAS CONTAINER ===== */}
        <div className="relative w-full max-w-6xl h-[400px] sm:h-[500px] md:h-[580px] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-amber-900/30 my-2">
          
          {/* CAPA 1: Fondo Campo (Zoom Out / Scale Down al scroll) */}
          <motion.div
            style={{
              scale: bgScale,
              y: bgY,
              x: mousePos.x * -0.4,
            }}
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            <img
              src="https://res.cloudinary.com/dcx6wcjlj/image/upload/f_auto,q_auto/campo-fondo_piukzs.jpg"
              alt="Campo al atardecer Krokanté"
              className="w-full h-full object-cover object-center"
            />
            {/* Gradient Overlay for seamless readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0804]/60 via-transparent to-transparent" />
          </motion.div>

          {/* CAPA 2: Mesa + Tazón de Maní + Sello Artesanal (Zoom In / Scale Up al scroll) */}
          <motion.div
            style={{
              scale: fgScale,
              y: fgY,
              x: mousePos.x * 0.6,
            }}
            className="absolute inset-0 w-full h-full flex items-end justify-center pointer-events-none"
          >
            <img
              src="https://res.cloudinary.com/dcx6wcjlj/image/upload/f_auto,q_auto/mesa_y_producto_ghe5dy.png"
              alt="Mesa de madera con tazón de maní Krokanté y sello artesanal"
              className="w-full h-full object-contain object-bottom drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]"
            />
          </motion.div>

        </div>

      </div>

      {/* ===== 4. FOOTER INDICATOR ===== */}
      <div className="relative z-30 w-full py-3 text-center font-mono text-xs text-amber-400/80 uppercase tracking-widest bg-gradient-to-t from-[#0F0804] to-transparent">
        ✦ Desliza hacia abajo para explorar los 4 sabores ✦
      </div>

    </section>
  );
};

export default Hero3D;
