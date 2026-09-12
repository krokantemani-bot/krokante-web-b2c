import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { Sparkles, ShieldCheck, Scale, Shield, Map as MapIcon, ArrowRight, Compass } from 'lucide-react';
import { Hero3D } from '../components/Hero3D';
import { Section2Granel } from '../components/Section2Granel';
import { Section3Momentos } from '../components/Section3Momentos';
import { TickerBeneficios } from '../components/TickerBeneficios';

export const ArtDirectionExperience = () => {
  const navigate = useNavigate();


  // Auto-scroll a la sección indicada en el hash de la URL
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.replace('#', '');
        const elem = document.getElementById(targetId);
        if (elem) {
          setTimeout(() => {
            elem.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }
      }
    };

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, []);


  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-amber-400 selection:text-black">
      {/* 1. HERO SECTION 3D & TICKER DE BENEFICIOS */}
      <Hero3D />
      <TickerBeneficios />

      {/* 2. SEGUÍ LA RUTA DEL MANÍ TOP (PASOS 01, 02, 03 & MOSTRADOR) */}
      <Section2Granel />

      {/* 3. SECCIÓN MINIMALISTA Y LIMPIA "ENCUENTRA TU MOSTRADOR" (DERIVA A /mostradores) */}
      <section id="tiendas" className="relative z-20 py-20 px-4 sm:px-6 bg-black/90 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 font-mono text-xs uppercase tracking-widest mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Red de Mostradores Krokanté</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter">
              ENCUENTRA TU MOSTRADOR
            </h2>
            <p className="text-neutral-400 text-sm md:text-base max-w-xl mx-auto mt-3 font-medium">
              Explora en tiempo real los Puntos de Venta de tu barrio con frascos de vidrio herméticos servidos a granel.
            </p>
          </div>

          {/* CARD TEASER ULTRA LIMPIO DE 1 CLIC A LA PÁGINA DEDICADA */}
          <div className="bg-gradient-to-b from-neutral-900/90 to-black/90 border border-amber-400/30 rounded-3xl p-5 sm:p-8 md:p-12 space-y-6 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-amber-400 transition-all">
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-400/20 transition-all" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left relative z-10">
              <div className="space-y-2.5">
                <span className="inline-flex items-center justify-center sm:justify-start gap-1.5 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                  <span>📍</span>
                  <span>Geolocalización & WhatsApp Directo</span>
                </span>
                <h3 className="font-bold text-2xl md:text-3xl text-white leading-tight">
                  Mapa Interactivo & Puntos de Venta
                </h3>
                <p className="text-xs md:text-sm text-neutral-400 max-w-lg leading-relaxed mx-auto sm:mx-0">
                  Ubica el mostrador Krokanté más cercano a tu posición GPS
                </p>
              </div>

              <button
                onClick={() => navigate('/mostradores?autoLocate=true')}
                className="w-full sm:w-auto px-5 sm:px-8 py-3.5 sm:py-5 rounded-2xl bg-amber-400 hover:bg-yellow-300 text-black font-display text-sm sm:text-lg uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-400/30 shrink-0 group-hover:scale-105"
              >
                <Compass className="w-4 h-4 sm:w-6 sm:h-6 text-black animate-pulse shrink-0" />
                <span className="whitespace-nowrap">MOSTRADOR MÁS CERCANO</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-black shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HAY UN MANÍ KROKANTÉ PARA CADA MOMENTO DE LA VIDA */}
      <Section3Momentos />

      {/* 5. SERVIDO FRESCO DESDE EL FRASCO DE VIDRIO */}
      <section id="granel" className="relative z-20 py-24 px-6 bg-black/80 backdrop-blur-md border-t border-white/10">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400 block mb-2">
              Calidad Artesanal Sin Intermediarios
            </span>
            <h2 className="font-display text-5xl md:text-8xl uppercase tracking-tighter">
              SERVIDO FRESCO DESDE EL FRASCO DE VIDRIO
            </h2>
          </div>

          <p className="max-w-3xl mx-auto text-lg text-neutral-300 font-medium leading-relaxed">
            Olvídate de snacks industriales empaquetados meses atrás. Krokanté se guarda en frascos herméticos de vidrio en la tienda de tu barrio para mantener el crujido y la frescura intactos. Pídeselo a tu casera por peso exacto desde 100g.
          </p>

          {/* FOTOGRAFÍA DE TODOS LOS FRASCOS JUNTOS (TAPA TOTALMENTE VISIBLE CON MARGEN CERO) */}
          <div className="relative z-10 max-w-4xl mx-auto my-8 overflow-hidden rounded-3xl border border-amber-400/20 shadow-2xl group h-[320px] sm:h-[440px] md:h-[520px] lg:h-[580px]">
            <img 
              src="https://res.cloudinary.com/dcx6wcjlj/image/upload/v1789176644/sabores_juntos_a56du9.jpg" 
              alt="Frascos de Vidrio Krokanté Maní Todos los Sabores Juntos"
              className="w-full h-full object-cover object-[center_68%] rounded-3xl filter brightness-105 contrast-105 group-hover:scale-102 transition-transform duration-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-left space-y-3">
              <Shield className="w-8 h-8 text-amber-400" />
              <h4 className="font-bold text-lg text-white">Vidrio Hermético</h4>
              <p className="text-xs text-neutral-400">Protege el maní de la humedad y conserva el aroma horneado al 100%.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-left space-y-3">
              <Scale className="w-8 h-8 text-amber-400" />
              <h4 className="font-bold text-lg text-white">Por Peso Exacto</h4>
              <p className="text-xs text-neutral-400">Elige la cantidad exacta que deseas llevarte desde 100 gramos.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-left space-y-3">
              <Sparkles className="w-8 h-8 text-amber-400" />
              <h4 className="font-bold text-lg text-white">Horneado Al Fuego</h4>
              <p className="text-xs text-neutral-400">Receta artesanal boliviana con capa gruesa crocante, nunca frito.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BANNER B2B PARA SOCIOS & FOOTER */}
      <section id="b2b" className="relative z-20 py-16 px-6 bg-black/90 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="p-10 rounded-3xl bg-gradient-to-r from-amber-950 via-yellow-950 to-black border-2 border-amber-400/40 text-left flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">Oportunidad para Tiendas y Licorerías</span>
              <h3 className="font-display text-3xl uppercase text-white">¿TIENES UNA TIENDA DE BARRIO O MERCADO SALUDABLE?</h3>
              <p className="text-sm text-neutral-300 max-w-xl">Instala nuestro exhibidor impreso con 4 frascos de vidrio y gana hasta el 60% de rentabilidad. El producto se vende solo.</p>
            </div>
            <a 
              href="https://b2b.krokantemani.top" 
              target="_blank" 
              rel="noreferrer"
              className="px-8 py-4 rounded-full bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-white transition-all shrink-0 shadow-lg"
            >
              👉 VER MODELO B2B SOCIOS
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 py-12 px-8 border-t border-white/10 bg-black text-neutral-500 text-xs font-mono flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <span className="font-display text-2xl uppercase text-white block">Krokanté Maní</span>
          <span>Maní Japonés Artesanal 100% Boliviano © 2026.</span>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/mostradores')} className="hover:text-amber-400 transition-colors flex items-center gap-1">
            <MapIcon className="w-4 h-4 text-amber-400" />
            <span>Mapa de Mostradores</span>
          </button>
          <a href="/admin" className="hover:text-amber-400 transition-colors flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Acceso CMS</span>
          </a>
          <a href="https://b2b.krokantemani.top" target="_blank" rel="noreferrer" className="text-amber-400 font-bold hover:underline">
            Acceso Socios B2B
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ArtDirectionExperience;
