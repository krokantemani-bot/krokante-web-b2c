import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface HeroProps {
  onWhereToBuyClick?: () => void;
}

export const HeroAwwwards: React.FC<HeroProps> = ({ onWhereToBuyClick }) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLElement>(null);
  
  const handleBuyClick = () => {
    if (onWhereToBuyClick) {
      onWhereToBuyClick();
    } else {
      navigate('/mostradores?autoLocate=true');
    }
  };
  // Sistema de física reactiva con resortes de alta inercia
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 120, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax multicapa desacoplado
  const videoRotateX = useTransform(smoothY, [-400, 400], [12, -12]);
  const videoRotateY = useTransform(smoothX, [-400, 400], [-14, 14]);
  const textTranslateX = useTransform(smoothX, [-400, 400], [-18, 18]);
  const badgeTranslate = useTransform(smoothY, [-400, 400], [25, -25]);
  const glowTranslateX = useTransform(smoothX, [-400, 400], [40, -40]);
  const glowTranslateY = useTransform(smoothY, [-400, 400], [40, -40]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[100dvh] max-h-[100dvh] bg-[#FBF8F2] text-[#141210] select-none flex flex-col justify-between pt-1 sm:pt-4 pb-0 overflow-hidden"
    >
      {/* 1. TEXTURA DE GRANO EDITORIAL & MALLA DE REFRACCIÓN */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25 z-10 mix-blend-multiply bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.7'/%3E%3C/svg%3E")`
        }}
      />

      {/* 2. HALOS DE LUZ AMBIENTAL DINÁMICA */}
      <motion.div
        style={{ x: glowTranslateX, y: glowTranslateY }}
        className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#FF6519]/12 rounded-full blur-[140px] pointer-events-none"
      />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-[#0E7A5A]/8 rounded-full blur-[130px] pointer-events-none" />

      {/* ===== HEADER NAVEGACIÓN ===== */}
      <header className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-16 flex items-center justify-between py-1.5 sm:py-3 z-40 shrink-0">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img
            src="https://res.cloudinary.com/dcx6wcjlj/image/upload/f_auto,q_auto/KROKANT%C3%89_MAN%C3%8D_kxwwag.png"
            alt="Krokanté Maní"
            className="h-7 sm:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />
          <div className="hidden sm:flex flex-col text-[10px] uppercase font-mono tracking-widest text-[#141210]/50 border-l border-black/10 pl-3">
            <span>Tostaduría Artesanal</span>
            <span className="text-[#0E7A5A] font-bold">Lote Fresco Diario</span>
          </div>
        </motion.div>

        {/* Menú de Navegación */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Abrir menú"
            className="p-1.5 sm:p-3 rounded-2xl bg-white/80 hover:bg-white border border-black/8 shadow-sm hover:shadow-md transition-all text-[#141210] flex flex-col justify-center items-center gap-1 cursor-pointer group"
          >
            <span className="w-5 sm:w-6 h-[2px] bg-[#141210] rounded-full group-hover:w-7 transition-all" />
            <span className="w-3.5 sm:w-4 h-[2px] bg-[#0E7A5A] rounded-full group-hover:w-7 transition-all self-end" />
            <span className="w-5 sm:w-6 h-[2px] bg-[#141210] rounded-full group-hover:w-7 transition-all" />
          </button>
        </div>
      </header>

      {/* ===== HERO COMPOSITION PRINCIPAL (AJUSTADO A PANTALLA MÓVIL) ===== */}
      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-16 my-auto py-1 sm:py-4 grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-6 lg:gap-14 items-center z-30 flex-1 min-h-0 overflow-hidden">
        
        {/* COLUMNA IZQUIERDA: TIPOGRAFÍA MONUMENTAL Y ACCIONES */}
        <motion.div
          style={{ x: textTranslateX }}
          className="lg:col-span-7 flex flex-col items-start text-left space-y-2 sm:space-y-5 z-30"
        >
          {/* Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E7A5A] text-white text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-semibold shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Técnica de Horneado Artesanal
            </span>
            <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-black/5 text-[#3D3833] text-[11px] font-mono tracking-wider">
              Corteza Vítrea de Alta Resonancia
            </span>
          </div>

          {/* TITULAR RESPONSIVO AIREADO Y EDITORIAL */}
          <div className="overflow-hidden pt-1">
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[9.5vw] sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] font-black uppercase text-[#141210] leading-[1.04] sm:leading-[0.95] tracking-[0.02em] sm:tracking-[-0.03em]"
            >
              EL CRUNCH <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6519] via-[#FF7E3D] to-[#E05208] tracking-[0.03em] sm:tracking-[-0.03em]">
                INNEGOCIABLE.
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                  className="absolute -bottom-1 left-0 h-[5px] sm:h-[8px] bg-[#FF6519]/25 rounded-full" 
                />
              </span>
            </motion.h1>
          </div>

          {/* MANIFIESTO SENSORIAL */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-[13px] sm:text-lg md:text-xl text-[#3D3833]/90 font-normal leading-relaxed max-w-xl"
          >
            Auténtico maní japonés servido al peso. Olvídate de los snacks industriales de bolsa. Krokanté Maní es fresco, de corteza crujiente y sabor natural.
          </motion.p>

          {/* CTA & BADGE DE PESO */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 w-full sm:w-auto"
          >
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleBuyClick}
                className="relative group overflow-hidden px-6 py-3 sm:px-10 sm:py-5 rounded-full bg-[#FF6519] text-white font-display text-sm sm:text-lg uppercase font-bold tracking-wider sm:tracking-widest shadow-[0_8px_25px_rgba(255,101,25,0.38)] transition-all flex items-center justify-center gap-2.5 cursor-pointer shrink-0"
              >
                <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                  ¿Dónde Comprar?
                  <span className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#E05208] to-[#FF6519] translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out" />
              </motion.button>
            </div>

            {/* Micro-métrica sensorial */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2 border-l-2 border-[#0E7A5A]/30 text-left">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] sm:text-xs font-bold text-[#0E7A5A] uppercase tracking-wider">Servido al Peso</span>
                <span className="text-[11px] sm:text-[11px] text-[#3D3833]/85 font-medium leading-tight">Desde 100 gr. Pide peso exacto a la casera</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* COLUMNA DERECHA: ESCULTURA CINEMÁTICA INTERACTIVA 3D */}
        <motion.div
          style={{ rotateX: videoRotateX, rotateY: videoRotateY, z: 60 }}
          className="lg:col-span-5 relative flex justify-center items-center w-full [perspective:1400px] z-20 shrink-0 mt-3 sm:mt-0"
        >
          {/* Tarjeta de Video Escultural */}
          <div className="relative w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[480px] aspect-[16/10] sm:aspect-[4/5] rounded-[1.6rem] sm:rounded-[3rem] p-2 sm:p-3.5 bg-gradient-to-b from-white/95 via-white/70 to-white/30 border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.14)] backdrop-blur-xl transition-all duration-700">
            
            <div className="relative w-full h-full rounded-[1.3rem] sm:rounded-[2.4rem] overflow-hidden bg-[#141210]">
              <video
                ref={videoRef}
                src="https://res.cloudinary.com/dcx6wcjlj/video/upload/v1792110973/Man_holding_peanuts_near_scale_20261009135519_oevys1.mp4"
                playsInline
                autoPlay
                loop
                muted
                controls={false}
                disablePictureInPicture
                className="w-full h-full object-cover pointer-events-none scale-105"
              />

              {/* Gradiente cinematográfico */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Ficha de Perfil de Textura - solo en pantallas sm+ para no sobrecargar el móvil */}
              <div className="absolute bottom-2 left-2 right-2 sm:bottom-6 sm:left-6 sm:right-6 p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 text-white flex flex-col gap-1 sm:gap-2">
                <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-mono tracking-widest text-[#FF9E66] uppercase">
                  <span>Perfil de Textura</span>
                  <span className="font-bold text-white">CRUNCH 9.8 / 10</span>
                </div>
                <div className="w-full bg-white/20 h-1 sm:h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '98%' }}
                    transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
                    className="h-full bg-[#FF6519] rounded-full" 
                  />
                </div>
                <p className="hidden sm:block text-[11px] text-white/80 leading-snug font-sans pt-1">
                  Corteza fina sin sensación arenosa. Tostado uniforme al fuego controlado.
                </p>
              </div>
            </div>

            {/* Badge Interactivo Arrastrable */}
            <motion.div
              drag
              dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
              style={{ y: badgeTranslate }}
              className="absolute -top-3 -left-3 px-3 py-1.5 sm:-top-5 sm:-left-5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl bg-[#141210] text-[#FBF8F2] shadow-2xl border border-white/20 text-[9px] sm:text-xs font-mono font-bold tracking-wider uppercase cursor-grab active:cursor-grabbing flex items-center gap-1.5 sm:gap-2"
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#0E7A5A]" />
              <span>0% Grasa Añadida</span>
            </motion.div>

            {/* Sello de Autenticidad flotante */}
            <motion.div
              style={{ y: badgeTranslate }}
              className="absolute -bottom-3 -right-3 px-3 py-1.5 sm:-bottom-4 sm:-right-4 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl bg-[#0E7A5A] text-white shadow-2xl text-[9px] sm:text-xs font-mono font-bold tracking-wider uppercase hidden sm:flex items-center gap-2 border border-white/20"
            >
              <span>100% Maní Seleccionado</span>
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* ===== TICKER EDITORIAL CINEMÁTICO (TOTALMENTE VISIBLE Y ANCLADO AL FONDO) ===== */}
      <div className="relative w-full border-t border-black/8 bg-[#F5EDE1]/80 backdrop-blur-md py-2.5 sm:py-4 overflow-hidden z-20 shrink-0">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 25,
            ease: 'linear'
          }}
          className="flex gap-8 sm:gap-12 whitespace-nowrap text-[11px] sm:text-sm font-mono tracking-widest uppercase text-[#141210]/75 w-max items-center"
        >
          <span className="flex items-center gap-2">🌾 TOSTADO EN PEQUEÑOS LOTES</span>
          <span className="text-[#FF6519]">•</span>
          <span className="flex items-center gap-2">⚡ FÓRMULA JAPONESA DE ALTA RESONANCIA</span>
          <span className="text-[#FF6519]">•</span>
          <span className="flex items-center gap-2">⚖️ SERVIDO AL PESO DESDE MOSTRADOR HERMÉTICO</span>
          <span className="text-[#FF6519]">•</span>
          <span className="flex items-center gap-2">🥜 SIN CONSERVANTES ARTIFICIALES</span>
          <span className="text-[#FF6519]">•</span>
          <span className="flex items-center gap-2">🔥 EL CRUNCH QUE NO SE COMPARA</span>
          <span className="text-[#FF6519]">•</span>
          <span className="flex items-center gap-2">🌾 TOSTADO EN PEQUEÑOS LOTES</span>
          <span className="text-[#FF6519]">•</span>
          <span className="flex items-center gap-2">⚡ FÓRMULA JAPONESA DE ALTA RESONANCIA</span>
          <span className="text-[#FF6519]">•</span>
          <span className="flex items-center gap-2">⚖️ SERVIDO AL PESO DESDE MOSTRADOR HERMÉTICO</span>
          <span className="text-[#FF6519]">•</span>
          <span className="flex items-center gap-2">🥜 SIN CONSERVANTES ARTIFICIALES</span>
          <span className="text-[#FF6519]">•</span>
          <span className="flex items-center gap-2">🔥 EL CRUNCH QUE NO SE COMPARA</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroAwwwards;
