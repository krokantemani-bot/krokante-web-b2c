import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';

interface HeroProps {
  onWhereToBuyClick?: () => void;
}

export const HeroAwwwards: React.FC<HeroProps> = ({ onWhereToBuyClick }) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleBuyClick = () => {
    if (onWhereToBuyClick) {
      onWhereToBuyClick();
    } else {
      navigate('/mostradores?autoLocate=true');
    }
  };

  const scrollToSection = (id: string) => {
    setShowMobileMenu(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative w-full min-h-[100dvh] bg-[#F5EFDC] text-[#141210] flex flex-col justify-between overflow-hidden">
      {/* ===== 1. HEADER LIMPIO: LOGO IZQUIERDA · ENLACES CENTRO (DESKTOP) · CTA + HAMBURGUESA DERECHA ===== */}
      <header className="fixed top-0 left-0 right-0 w-full bg-[#F5EFDC]/95 backdrop-blur-md border-b border-stone-300/70 shadow-xs z-40">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-10 md:px-16 flex items-center justify-between py-2.5 sm:py-3.5">
          <a href="/" className="flex items-center shrink-0">
            <img
              src="https://res.cloudinary.com/dcx6wcjlj/image/upload/f_auto,q_auto/KROKANT%C3%89_MAN%C3%8D_kxwwag.png"
              alt="Krokanté Maní"
              className="h-8 sm:h-11 w-auto object-contain"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-sans font-medium text-[#141210]/80">
            <button
              type="button"
              onClick={() => scrollToSection('section3-momentos')}
              className="hover:text-[#F1422A] transition-colors cursor-pointer"
            >
              Sabores
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('granel')}
              className="hover:text-[#F1422A] transition-colors cursor-pointer"
            >
              Al peso
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('b2b')}
              className="hover:text-[#F1422A] transition-colors cursor-pointer"
            >
              Para tu tienda
            </button>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleBuyClick}
              className="px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-[#F1422A] hover:bg-[#d8351e] text-white font-sans text-xs sm:text-sm font-semibold tracking-normal shadow-sm hover:shadow-md transition-all cursor-pointer shrink-0"
            >
              ¿Dónde comprar?
            </button>

            <button
              type="button"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-xl text-stone-900 hover:bg-stone-200/60 shrink-0 cursor-pointer"
              aria-label="Abrir menú"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menú Desplegable Móvil (estilo B2B) */}
        {showMobileMenu && (
          <div className="md:hidden bg-[#F5EFDC] border-y border-stone-300 px-6 py-4 space-y-3 shadow-lg">
            <button
              type="button"
              onClick={() => scrollToSection('section3-momentos')}
              className="block text-left w-full font-sans font-normal text-sm text-stone-800 py-1 hover:text-[#F1422A] cursor-pointer bg-transparent border-none p-0"
            >
              Sabores
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('granel')}
              className="block text-left w-full font-sans font-normal text-sm text-stone-800 py-1 hover:text-[#F1422A] cursor-pointer bg-transparent border-none p-0"
            >
              Al peso
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('b2b')}
              className="block text-left w-full font-sans font-normal text-sm text-stone-800 py-1 hover:text-[#F1422A] cursor-pointer bg-transparent border-none p-0"
            >
              Para tu tienda
            </button>
          </div>
        )}
      </header>

      {/* ===== 2. HERO ARRIBA-ABAJO: H1 ALINEADO A LA IZQUIERDA + BLOQUE VISUAL 100% ANCHO ===== */}
      <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-10 md:px-16 pt-20 sm:pt-28 pb-8 sm:pb-12 flex flex-col gap-6 sm:gap-8 z-30 flex-1 justify-center">
        <motion.h1
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-black text-[#141210] leading-[1.06] tracking-normal text-left max-w-5xl"
        >
          Maní japonés artesanal,{' '}
          <span className="text-[#F1422A]">horneado y de sabor boliviano,</span>{' '}
          servido fresco desde 100 g.
        </motion.h1>

        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[38vh] sm:h-[46vh] lg:h-[52vh] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#141210] shadow-2xl border border-black/10"
        >
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
        </motion.div>
      </div>
    </section>
  );
};

export default HeroAwwwards;
