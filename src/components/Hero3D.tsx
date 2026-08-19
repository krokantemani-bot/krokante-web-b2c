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

  // Title opacity and exit Y position (empieza a desvanecerse a la mitad y desaparece 100% al terminar la sección)
  const titleOpacity = useTransform(scrollY, [0, 180, 440], [1, 1, 0]);
  const titleY = useTransform(scrollY, [0, 180, 440], [0, 0, -35]);

  // Smooth springs for buttery smooth 3D movement
  const bgScale = useSpring(rawBgScale, { stiffness: 90, damping: 20 });
  const bgY = useSpring(rawBgY, { stiffness: 90, damping: 20 });
  const fgScale = useSpring(rawFgScale, { stiffness: 90, damping: 20 });
  const fgY = useSpring(rawFgY, { stiffness: 90, damping: 20 });
  const smoothTitleOpacity = useSpring(titleOpacity, { stiffness: 90, damping: 20 });
  const smoothTitleY = useSpring(titleY, { stiffness: 90, damping: 20 });

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

      {/* ===== LAYER 2: MESA Y PRODUCTO (100% Ancho Completo Edge-to-Edge - Sin recortes) ===== */}
      <motion.div
        style={{
          scale: fgScale,
          y: fgY,
          x: mousePos.x * 0.5,
        }}
        className="absolute inset-x-0 bottom-0 w-full h-[60%] sm:h-[68%] md:h-[74%] z-10 pointer-events-none flex items-end justify-center origin-bottom"
      >
        <img
          src="https://res.cloudinary.com/dcx6wcjlj/image/upload/mesa_y_producto_ghe5dy.png"
          alt="Mesa de madera con tazón de maní Krokanté"
          className="w-full h-full object-cover object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]"
        />

        {/* Sello de Calidad Artesanal (Fijo estático - Gran Tamaño para Celular, Tablet y PC) */}
        <div className="absolute right-[16%] sm:right-[22%] md:right-[28%] lg:right-[32%] bottom-[4%] sm:bottom-[5%] md:bottom-[4%] lg:bottom-[4%] z-20 pointer-events-auto cursor-pointer drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]">
          <img
            src="https://res.cloudinary.com/dcx6wcjlj/image/upload/f_auto,q_auto/sello_ibeecn.png"
            alt="Sello Producto de Calidad Artesanal"
            className="w-40 sm:w-52 md:w-60 lg:w-64 xl:w-72 h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
          />
        </div>
      </motion.div>


      {/* ===== HEADER / NAVBAR (Solución 1: Degradado Oscuro Superior + Cristal de Alto Contraste) ===== */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-3.5 flex items-center justify-between bg-gradient-to-b from-[#0A0503]/95 via-[#0A0503]/60 to-transparent backdrop-blur-sm pointer-events-auto">
        {/* Brand Logo (Logo oficial de Cloudinary) */}
        <div className="flex items-center cursor-pointer">
          <img
            src="https://res.cloudinary.com/dcx6wcjlj/image/upload/f_auto,q_auto/KROKANT%C3%89_MAN%C3%8D_kxwwag.png"
            alt="Logo Oficial Krokanté Maní"
            className="h-12 md:h-16 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform"
          />
        </div>

        {/* Action Button: Dónde comprar (Alto contraste sobre degradado oscuro) */}
        <a
          href="#tiendas"
          onClick={onWhereToBuyClick}
          className="px-6 py-2 rounded-full border border-white/40 bg-white/15 backdrop-blur-md text-white font-display text-[16px] md:text-[18px] uppercase tracking-wider hover:bg-white/30 hover:border-white transition-all shadow-xl"
        >
          Dónde comprar
        </a>
      </header>


      {/* ===== TITLES CENTRADOS EN CAMPO (PC: 85px/95px Negrilla | Subtítulo PC: 35px/40px) ===== */}
      <motion.div
        style={{
          opacity: smoothTitleOpacity,
          y: smoothTitleY,
        }}
        className="fixed top-[18%] sm:top-[20%] md:top-[22%] lg:top-[110px] inset-x-0 z-30 w-full flex flex-col items-center justify-start px-4 sm:px-8 md:px-12 text-center pointer-events-none"
      >
        {/* Title Principal (Anton Font: Celular 50px | Tablet 70px | PC 85px - 95px Negrilla) */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl font-display text-[50px] md:text-[70px] lg:text-[85px] xl:text-[95px] font-bold tracking-wide uppercase leading-[1.02] mb-1 sm:mb-2 text-[#120904] pointer-events-auto"
          style={{
            textShadow: '0px 2px 20px rgba(255, 255, 255, 0.85), 0px 4px 24px rgba(0, 0, 0, 0.9)'
          }}
        >
          ¿Todavía no probaste el maní TOP?
        </motion.h1>

        {/* Subtítulo (Oswald Font: Celular 20px | Tablet 30px | PC 35px - 40px) */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-4xl sm:max-w-5xl font-['Oswald',sans-serif] text-[20px] md:text-[30px] lg:text-[35px] xl:text-[40px] text-stone-100 font-medium leading-[1.2] drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)] pointer-events-auto px-2 normal-case tracking-wide"
        >
          En Bolivia, el maní subió de categoría: una capa crujiente, cuatro sabores y mas por descubrir.
        </motion.p>
      </motion.div>




      {/* ===== BOTTOM SPACING ===== */}
      <div className="relative z-20 pb-3 text-center font-mono text-xs text-amber-300/80 uppercase tracking-widest pointer-events-none">
        ✦ Desliza hacia abajo para ver más ✦
      </div>

    </section>
  );
};

export default Hero3D;
