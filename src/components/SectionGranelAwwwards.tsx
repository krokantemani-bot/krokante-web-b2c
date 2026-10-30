import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const SectionGranelAwwwards: React.FC = () => {
  const [selectedGrams, setSelectedGrams] = useState<number>(250);

  const portions = [
    { grams: 100, label: '100g Individual', desc: 'El antojo perfecto para disfrutar en el camino.' },
    { grams: 250, label: '250g Oficina & Compartir', desc: 'Ideal para la jornada laboral o charlar entre dos.' },
    { grams: 500, label: '500g Familiar', desc: 'Para el churrasco de fin de semana o noche de películas.' },
    { grams: 1000, label: '1kg Granel para Eventos', desc: 'Maní fresco pesado al instante para reuniones grandes.' },
  ];

  const currentPortion = portions.find(p => p.grams === selectedGrams) || portions[1];

  return (
    <section id="granel" className="relative z-20 py-24 px-4 sm:px-6 md:px-12 bg-[#0A0706] text-white border-t border-white/10 overflow-hidden">
      
      {/* Resplandor cálido ambiental */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#FF6519]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Encabezado Editorial */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>El Ritual del Vidrio Hermético</span>
          </span>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase font-black tracking-tight leading-[0.95] text-white">
            SERVIDO AL PESO <br />
            <span className="text-[#FF6519]">DESDE EL FRASCO</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
            Olvídate de los snacks industriales empaquetados meses atrás. Krokanté se conserva en frascos herméticos de vidrio en el mostrador de tu tienda de barrio para mantener el crujido intacto. Te lo sirven fresco al peso exacto desde 100g.
          </p>
        </div>

        {/* FOTOGRAFÍA OFICIAL DE LOS FRASCOS CON ZOOM EDITORIAL INTERACTIVO */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto rounded-[2rem] sm:rounded-[2.5rem] p-2 sm:p-4 bg-gradient-to-b from-white/15 via-white/5 to-transparent border border-white/20 shadow-2xl backdrop-blur-xl group overflow-hidden"
        >
          <div className="relative w-full h-[220px] sm:h-[400px] md:h-[480px] rounded-[1.4rem] sm:rounded-[2rem] overflow-hidden bg-black">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              src="https://res.cloudinary.com/dcx6wcjlj/image/upload/v1789176644/sabores_juntos_a56du9.jpg" 
              alt="Frascos de Vidrio Krokanté Maní Todos los Sabores Juntos" 
              className="w-full h-full object-cover object-[center_60%] filter brightness-105 contrast-105"
            />
            {/* Gradiente solo en la base extrema para no tapar los frascos */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 text-white">
              <div className="space-y-1">
                <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-[#0E7A5A] text-[10px] font-mono uppercase font-bold tracking-wider">
                  Conservación Óptima
                </span>
                <p className="font-display text-base sm:text-2xl font-bold uppercase text-white drop-shadow-md">
                  4 Variedades en Exposición Diaria
                </p>
              </div>
              <span className="font-mono text-[10px] sm:text-xs text-amber-300 backdrop-blur-md bg-black/60 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-white/10">
                0% Humedad • Textura Vítrea
              </span>
            </div>
          </div>
        </motion.div>

        {/* WIDGET INTERACTIVO DE BÁSCULA DIGITAL (SELECTOR DE GRAMAJE) */}
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#14100E] border border-white/15 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
            <div>
              <h3 className="font-display text-2xl uppercase font-black text-white">
                ¿Cuánto te vas a llevar hoy?
              </h3>
            </div>

            {/* Display de Báscula Digital */}
            <div className="px-5 py-2.5 rounded-2xl bg-black border border-[#FF6519]/40 flex items-baseline gap-2 shadow-inner">
              <span className="font-mono text-3xl font-black text-[#FF6519]">{selectedGrams}</span>
              <span className="font-mono text-sm uppercase text-neutral-400">GRAMOS</span>
            </div>
          </div>

          {/* Botones Selectores de Gramos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {portions.map((p) => {
              const isSelected = p.grams === selectedGrams;
              return (
                <button
                  key={p.grams}
                  onClick={() => setSelectedGrams(p.grams)}
                  className={`p-4 rounded-2xl text-left transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#FF6519] border-[#FF6519] text-white shadow-lg shadow-[#FF6519]/30 scale-[1.02]'
                      : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <span className="block font-mono text-xs uppercase font-bold tracking-wider mb-1">
                    {p.grams}g
                  </span>
                  <span className="block font-sans text-xs font-semibold leading-tight">
                    {p.label.split(' ')[1] || p.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Descripción de la porción elegida */}
          <motion.div 
            key={selectedGrams}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-black/40 border border-white/5 text-xs sm:text-sm text-neutral-300 font-sans"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>{currentPortion.label}:</strong> {currentPortion.desc}</span>
          </motion.div>
        </div>


      </div>
    </section>
  );
};

export default SectionGranelAwwwards;
