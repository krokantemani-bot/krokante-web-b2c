import { motion } from 'motion/react';

interface Hero3DProps {
  onWhereToBuyClick?: () => void;
}

export const Hero3D = ({ onWhereToBuyClick }: Hero3DProps) => {

  return (
    <section className="relative w-full h-screen min-h-[600px] flex flex-col justify-between overflow-hidden bg-black text-white select-none">
      {/* ===== YOUTUBE BACKGROUND VIDEO ===== */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <iframe
          className="w-[300vw] h-[300vh] md:w-[177.77vh] md:min-w-full md:h-[100vh] min-h-[56.25vw] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover scale-110"
          src="https://www.youtube-nocookie.com/embed/4bmoCfLNGwA?autoplay=1&mute=1&loop=1&playlist=4bmoCfLNGwA&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3"
          title="Krokanté Maní Video Hero"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
        {/* Subtle dark overlay over video on right side for better video depth */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      {/* ===== HEADER / NAVBAR ===== */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-3.5 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/50 to-transparent backdrop-blur-sm pointer-events-auto">
        {/* Brand Logo */}
        <div className="flex items-center cursor-pointer">
          <img
            src="https://res.cloudinary.com/dcx6wcjlj/image/upload/f_auto,q_auto/KROKANT%C3%89_MAN%C3%8D_kxwwag.png"
            alt="Logo Oficial Krokanté Maní"
            className="h-12 md:h-16 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform"
          />
        </div>

        {/* Action Button: Dónde comprar */}
        <a
          href="#tiendas"
          onClick={onWhereToBuyClick}
          className="px-6 py-2 rounded-full border border-white/40 bg-white/15 backdrop-blur-md text-white font-display text-[16px] md:text-[18px] uppercase tracking-wider hover:bg-white/30 hover:border-white transition-all shadow-xl"
        >
          Dónde comprar
        </a>
      </header>

      {/* ===== LEFT TRANSLUCENT OVERLAY PANEL + HEADLINE & BUTTON ===== */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-y-0 left-0 z-20 w-full sm:w-[85%] md:w-[45%] lg:w-[40%] h-full bg-transparent md:bg-gradient-to-r md:from-black/85 md:via-black/40 md:to-transparent border-none px-[2px] sm:px-8 md:px-12 pt-20 pb-8 flex flex-col items-center justify-center text-center space-y-6 md:space-y-8 shadow-none"
      >
        {/* Main Headline (Móvil: 100% de ancho nítido, sin amontonamiento de letras) */}
        <div className="w-full absolute top-[42%] sm:top-[45%] left-0 right-0 -translate-y-1/2 px-2 sm:px-4 md:static md:top-auto md:translate-y-0 md:inset-x-auto md:px-0 space-y-1.5">
          <h1 className="w-full font-display text-[11.5vw] sm:text-[50px] md:text-[54px] lg:text-[62px] xl:text-[68px] uppercase font-bold tracking-normal md:tracking-wide leading-[1.04] md:leading-[1.02] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
            MANÍ JAPONÉS
          </h1>
          <p
            className="w-full font-display text-[9.5vw] sm:text-[42px] md:text-[48px] lg:text-[54px] xl:text-[60px] uppercase font-bold tracking-normal md:tracking-wide leading-[1.05] md:leading-[1.06] drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]"
            style={{ color: '#f4ff28' }}
          >
            A GRANEL<br />
            EN EL COMERCIO<br />
            FAVORITO DE TU<br />
            BARRIO
          </p>
        </div>

        {/* Red Pill CTA Button (Móvil: 100% de ancho expandido de margen a margen | PC: normal) */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#tiendas"
          onClick={onWhereToBuyClick}
          className="absolute bottom-[180px] left-[2px] right-[2px] md:static md:bottom-auto md:left-auto md:right-auto md:w-auto z-20 inline-flex items-center justify-center px-4 md:px-12 py-4 md:py-5 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white font-display text-2xl sm:text-2xl md:text-3xl uppercase tracking-wider shadow-[0_10px_35px_rgba(239,68,68,0.75)] hover:shadow-[0_15px_45px_rgba(239,68,68,1)] transition-all border border-red-400/60"
        >
          DÓNDE COMPRAR
        </motion.a>
      </motion.div>

      {/* ===== BOTTOM INDICATOR ===== */}
      <div className="absolute bottom-3 right-6 md:right-12 z-20 font-mono text-xs text-amber-300/80 uppercase tracking-widest pointer-events-none">
        ✦ Desliza hacia abajo para ver más ✦
      </div>
    </section>
  );
};

export default Hero3D;


