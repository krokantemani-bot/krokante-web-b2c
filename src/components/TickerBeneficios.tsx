import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, CookingPot, Zap, Activity } from 'lucide-react';

interface BenefitItem {
  id: string;
  icon: React.ElementType;
  textTop: string;
  textBottom: string;
}

export const TickerBeneficios: React.FC = () => {
  const benefits: BenefitItem[] = [
    {
      id: 'naturales',
      icon: Sprout,
      textTop: 'Ingredientes',
      textBottom: 'Naturales'
    },
    {
      id: 'artesanal',
      icon: CookingPot,
      textTop: 'Elaboración',
      textBottom: 'Artesanal'
    },
    {
      id: 'energia',
      icon: Zap,
      textTop: 'Fuente de',
      textBottom: 'Energía'
    },
    {
      id: 'crocante',
      icon: Activity,
      textTop: 'Textura',
      textBottom: 'Crocante'
    }
  ];

  // Duplicamos la lista para generar el efecto de bucle infinito continuo e imperceptible
  const tickerItems = [...benefits, ...benefits, ...benefits, ...benefits];

  return (
    <div className="w-full bg-[#0A0503] border-y border-amber-500/20 py-6 overflow-hidden relative z-20 shadow-2xl backdrop-blur-md">
      {/* Sombras laterales suaves para difuminar la entrada y salida de los ítems */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#0A0503] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#0A0503] to-transparent z-10 pointer-events-none" />

      {/* Marquee Deslizante Infinito */}
      <motion.div
        className="flex items-center gap-12 sm:gap-20 whitespace-nowrap w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 22
        }}
      >
        {tickerItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={`${item.id}-${index}`} className="flex items-center gap-4 group">
              {/* Contenedor del Icono Dorado */}
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500/20 group-hover:border-amber-400 transition-all duration-300 shadow-[0_0_15px_rgba(234,179,8,0.15)]">
                <IconComponent className="w-6 h-6 stroke-[1.75]" />
              </div>

              {/* Textos: Superior e Inferior */}
              <div className="flex flex-col text-left">
                <span className="text-xs sm:text-sm font-sans text-neutral-300 tracking-wide font-normal">
                  {item.textTop}
                </span>
                <span className="text-sm sm:text-base font-display uppercase tracking-wider text-amber-400 font-extrabold group-hover:text-yellow-300 transition-colors">
                  {item.textBottom}
                </span>
              </div>

              {/* Separador Sutil entre Ítems */}
              <span className="ml-8 sm:ml-12 text-amber-500/30 text-xs font-mono">✦</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
