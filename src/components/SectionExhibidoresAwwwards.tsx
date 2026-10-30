import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Compass, ArrowRight, MapPin, Radio } from 'lucide-react';

export const SectionExhibidoresAwwwards: React.FC = () => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  // Física 3D suave de inclinación reactiva al cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 130, mass: 0.7 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-200, 200], [6, -6]);
  const rotateY = useTransform(smoothX, [-200, 200], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="tiendas" className="relative z-20 py-24 px-4 sm:px-6 md:px-12 bg-[#0E0A08] text-white overflow-hidden border-t border-white/10">
      
      {/* Halo de luz cálida de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#FF6519]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        
        {/* TARJETA INTERACTIVA 3D CON RADAR VISUAL */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY }}
          className="relative rounded-[2.5rem] p-6 sm:p-10 md:p-14 bg-gradient-to-b from-[#1C1613] via-[#14100E] to-[#0A0706] border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.5)] [perspective:1000px] group overflow-hidden"
        >
          {/* Malla sutil de fondo */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FF6519_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Columna Izquierda: Información y Copywriting de Impacto */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-amber-400">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Geolocalización GPS Instantánea</span>
              </div>

              <h2 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase font-black tracking-tight leading-[0.95] text-white">
                ENCUENTRA TU <span className="text-[#FF6519]">EXHIBIDOR</span>
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
                Pulsa el botón para calcular automáticamente la distancia exacta hacia el punto de venta más cercano en tu barrio con stock garantizado.
              </p>

              {/* Botón CTA Magnético Awwwards */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => navigate('/mostradores?autoLocate=true')}
                  className="px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-[#FF6519] hover:bg-[#E05208] text-white font-display text-sm sm:text-base uppercase font-bold tracking-wider shadow-[0_8px_25px_rgba(255,101,25,0.38)] transition-all flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-spin [animation-duration:8s]" />
                  <span>EXHIBIDOR MÁS CERCANO</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </motion.button>

                <span className="text-xs font-mono text-neutral-400">
                  Sin descargas • Abre directo en el mapa
                </span>
              </div>
            </div>

            {/* Columna Derecha: Simulación de Radar GPS Interactivo con clic directo al mapa */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/mostradores?autoLocate=true')}
                className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center cursor-pointer group/radar"
                title="Abrir mapa de exhibidores cercanos"
              >
                
                {/* Ondas Concéntricas del Radar */}
                <motion.div
                  animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.2, 0.6, 0.2] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full border border-[#0E7A5A]/40 pointer-events-none group-hover/radar:border-[#0E7A5A]/80 transition-colors"
                />
                <motion.div
                  animate={{ scale: [0.5, 1.1, 0.5], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 0.5, ease: "easeInOut" }}
                  className="absolute inset-8 rounded-full border border-[#FF6519]/40 pointer-events-none group-hover/radar:border-[#FF6519]/80 transition-colors"
                />
                <div className="absolute inset-16 rounded-full border border-white/10 pointer-events-none" />

                {/* Línea de barrido del radar */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                  className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-tr from-transparent via-[#FF6519]/15 to-transparent"
                />

                {/* Núcleo Central de Ubicación */}
                <div className="relative z-10 w-20 h-20 rounded-full bg-[#1C1613] group-hover/radar:bg-[#251D19] border-2 border-[#FF6519] shadow-[0_0_30px_rgba(255,101,25,0.6)] group-hover/radar:shadow-[0_0_45px_rgba(255,101,25,0.9)] flex flex-col items-center justify-center gap-1 transition-all duration-300">
                  <Radio className="w-6 h-6 text-[#FF6519] animate-pulse" />
                  <span className="font-mono text-[9px] uppercase tracking-wider text-white font-bold group-hover/radar:text-[#FF6519] transition-colors">GPS ACTIVO</span>
                </div>

                {/* Puntos de Venta simulados orbitando */}
                <motion.div 
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute top-6 right-8 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-mono text-emerald-400 font-semibold group-hover/radar:bg-white/20 transition-all"
                >
                  ● Tienda Don Carlos (120m)
                </motion.div>

                <motion.div 
                  animate={{ y: [4, -4, 4] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                  className="absolute bottom-8 left-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-mono text-amber-400 font-semibold group-hover/radar:bg-white/20 transition-all"
                >
                  ● Micromarket Central (340m)
                </motion.div>

              </motion.div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SectionExhibidoresAwwwards;
