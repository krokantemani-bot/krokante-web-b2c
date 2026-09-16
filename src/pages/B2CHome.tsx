import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
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

      {/* 2. SEGUÍ LA RUTA DEL MANÍ TOP (PASOS 01, 02, 03 & EXHIBIDOR) */}
      <Section2Granel />

      {/* 3. SECCIÓN MINIMALISTA Y LIMPIA "ENCUENTRA TU EXHIBIDOR" (DERIVA A /mostradores) */}
      <section id="tiendas" className="relative z-20 py-20 px-4 sm:px-6 bg-black/90 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 font-mono text-xs uppercase tracking-widest mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Red de Exhibidores Krokanté</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter">
              ENCUENTRA TU EXHIBIDOR
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
                  Ubica el exhibidor Krokanté más cercano a tu posición GPS
                </p>
              </div>

              <button
                onClick={() => navigate('/mostradores?autoLocate=true')}
                className="w-full sm:w-auto px-5 sm:px-8 py-3.5 sm:py-5 rounded-2xl bg-amber-400 hover:bg-yellow-300 text-black font-display text-sm sm:text-lg uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-400/30 shrink-0 group-hover:scale-105"
              >
                <Compass className="w-4 h-4 sm:w-6 sm:h-6 text-black animate-pulse shrink-0" />
                <span className="whitespace-nowrap">EXHIBIDOR MÁS CERCANO</span>
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

          {/* FOTOGRAFÍA DE TODOS LOS FRASCOS JUNTOS (EFECTO PARALLAX REVELACIÓN Y ZOOM AL SCROLL) */}
          <motion.div 
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-10 max-w-4xl mx-auto my-6 sm:my-8 overflow-hidden rounded-3xl border border-amber-400/20 shadow-[0_20px_50px_rgba(234,179,8,0.15)] group h-[210px] xs:h-[240px] sm:h-[440px] md:h-[520px] lg:h-[580px]"
          >
            <motion.img 
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              src="https://res.cloudinary.com/dcx6wcjlj/image/upload/v1789176644/sabores_juntos_a56du9.jpg" 
              alt="Frascos de Vidrio Krokanté Maní Todos los Sabores Juntos"
              className="w-full h-full object-cover object-[center_60%] sm:object-[center_68%] rounded-3xl filter brightness-105 contrast-105"
            />
          </motion.div>

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
      <section id="b2b" className="relative z-20 py-16 px-6 bg-[#F4ECE1] text-stone-950 border-t-2 border-amber-900/10 shadow-inner font-sans overflow-hidden">
        {/* Textura sutil de papel artesanal apergaminado */}
        <div className="absolute inset-0 bg-[radial-gradient(#D8C8B3_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="p-8 md:p-10 rounded-[2.5rem] bg-[#EDE4D7] border-2 border-[#E5BA9E] text-left grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
            {/* Columna Izquierda: Textos y Botón */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono text-[#8C5E3C] font-extrabold uppercase tracking-widest block">
                OPORTUNIDAD PARA TU NEGOCIO
              </span>
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl uppercase font-black text-stone-950 leading-tight">
                ¿TIENES UNA TIENDA DE BARRIO, UN MICROMARKET, UNA FARMACIA LICORERÍA, ETC. ?
              </h3>
              <p className="text-sm md:text-base text-stone-700 font-medium max-w-xl leading-relaxed">
                Instala nuestro exhibidor impreso con 4 frascos de vidrio y genera hasta el 60% de rentabilidad. El producto se vende solo.
              </p>
              <div className="pt-2">
                <a 
                  href="https://b2b.krokantemani.top" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-[#0F0E0E] hover:bg-amber-900 text-[#FDBA74] hover:text-white font-mono font-black text-xs md:text-sm uppercase tracking-widest transition-all shadow-2xl active:scale-95"
                >
                  <span className="text-base">👈</span>
                  <span>QUIERO MI EXHIBIDOR KROKANTÉ</span>
                </a>
              </div>
            </div>

            {/* Columna Derecha: Imagen destacada sin cortes en los bordes laterales y ampliada fija en mobile */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end mt-4 lg:mt-0">
              <div className="relative max-w-lg w-full flex justify-center items-center overflow-hidden p-0 md:p-2">
                <img 
                  src="https://res.cloudinary.com/dcx6wcjlj/image/upload/v1789397601/muchacha_con_exhibidor_sz3pac.jpg" 
                  alt="Muchacha con exhibidor Krokanté en tienda" 
                  className="w-full h-auto object-cover scale-110 md:scale-100 [mask-image:radial-gradient(49%_48%_at_50%_50%,_black_45%,_transparent_98%)] [-webkit-mask-image:radial-gradient(49%_48%_at_50%_50%,_black_45%,_transparent_98%)]"
                />
              </div>
            </div>
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
            <span>Mapa de Exhibidores</span>
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
