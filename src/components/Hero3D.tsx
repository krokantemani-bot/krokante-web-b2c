import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';

interface HeroProps {
  onWhereToBuyClick?: () => void;
}

export const Hero3D: React.FC<HeroProps> = ({ onWhereToBuyClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Asegurar autoplay silenciado continuo sin controles
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-[#FBF8F2] text-[#1E1B18] select-none flex flex-col justify-between pt-4 pb-12 px-6 sm:px-10 md:px-16 lg:px-20 overflow-hidden">
      {/* ===== HEADER / NAVBAR ===== */}
      <header className="w-full flex items-center justify-between py-2 sm:py-4 z-30">
        {/* Brand Logo */}
        <div className="flex items-center cursor-pointer">
          <img
            src="https://res.cloudinary.com/dcx6wcjlj/image/upload/f_auto,q_auto/KROKANT%C3%89_MAN%C3%8D_kxwwag.png"
            alt="Krokanté Maní"
            className="h-10 sm:h-12 md:h-14 w-auto object-contain hover:scale-105 transition-transform"
          />
        </div>

        {/* Hamburger Menu Icon */}
        <button
          type="button"
          aria-label="Abrir menú"
          className="p-2 sm:p-2.5 rounded-xl hover:bg-black/5 transition-colors text-[#0E7A5A] flex flex-col justify-center items-center gap-1.5 cursor-pointer"
        >
          <span className="w-7 sm:w-8 h-[3px] bg-[#0E7A5A] rounded-full transition-all" />
          <span className="w-7 sm:w-8 h-[3px] bg-[#0E7A5A] rounded-full transition-all" />
          <span className="w-7 sm:w-8 h-[3px] bg-[#0E7A5A] rounded-full transition-all" />
        </button>
      </header>

      {/* ===== CONTENIDO HERO PRINCIPAL (2 COLUMNAS) ===== */}
      <div className="w-full max-w-7xl mx-auto my-auto py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center z-20">
        
        {/* Columna Izquierda: Copy + Badge + Botón CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="lg:col-span-6 flex flex-col items-start text-left space-y-6 sm:space-y-7"
        >
          {/* Badge verde: Maní japonés horneado */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#0E7A5A] text-white text-xs sm:text-sm font-medium tracking-wide shadow-sm">
            Maní japonés horneado
          </div>

          {/* Titular Principal */}
          <h1 className="font-display text-[10vw] sm:text-5xl md:text-6xl lg:text-[62px] xl:text-[68px] font-black uppercase text-[#141210] leading-[1.03] tracking-tight">
            Pide <span className="text-[#FF6519]">100 gramos</span>. Vas a volver por el frasco entero.
          </h1>

          {/* Subtítulo / Párrafo explicativo */}
          <p className="text-sm sm:text-base md:text-lg text-[#3D3833] font-normal leading-relaxed max-w-xl">
            Auténtico maní japonés servido al peso. Olvídate de los snacks industriales de bolsa. Krokanté Maní tiene una corteza crujiente, sabor natural y frescura de frasco.
          </p>

          {/* Botón CTA Naranja */}
          <div className="pt-2 sm:pt-4 w-full sm:w-auto">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="#tiendas"
              onClick={onWhereToBuyClick}
              className="inline-flex w-full sm:w-auto items-center justify-center px-8 sm:px-12 py-4 sm:py-4.5 rounded-full bg-[#FF6519] hover:bg-[#F05508] text-white font-display text-lg sm:text-xl uppercase font-bold tracking-wider shadow-[0_8px_25px_rgba(255,101,25,0.4)] transition-all"
            >
              ¿DÓNDE COMPRO?
            </motion.a>
          </div>
        </motion.div>

        {/* Columna Derecha: Video continuo limpio sin ningún control */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="lg:col-span-6 flex justify-center items-center w-full"
        >
          <div className="relative w-full max-w-[560px] aspect-[4/3] sm:aspect-[16/11] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.14)] select-none bg-black flex items-center justify-center">
            <video
              ref={videoRef}
              src="https://res.cloudinary.com/dcx6wcjlj/video/upload/v1792110973/Man_holding_peanuts_near_scale_20261009135519_oevys1.mp4"
              playsInline
              autoPlay
              loop
              muted
              controls={false}
              disablePictureInPicture
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero3D;
