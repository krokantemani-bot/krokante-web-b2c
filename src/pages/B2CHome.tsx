import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Map as MapIcon } from 'lucide-react';
import { HeroAwwwards as Hero3D } from '../components/HeroAwwwards';
import { SectionExhibidoresAwwwards } from '../components/SectionExhibidoresAwwwards';
import { SectionGranelAwwwards } from '../components/SectionGranelAwwwards';
import { Section3Momentos } from '../components/Section3Momentos';

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
      {/* 1. HERO SECTION */}
      <Hero3D onWhereToBuyClick={() => navigate('/mostradores?autoLocate=true')} />

      {/* SECCIÓN "ENCUENTRA TU EXHIBIDOR" (ELEVADA AWWWARDS CON RADAR GPS 3D) */}
      <SectionExhibidoresAwwwards />

      {/* 4. HAY UN MANÍ KROKANTÉ PARA CADA MOMENTO DE LA VIDA */}
      <Section3Momentos />

      {/* 5. SERVIDO FRESCO DESDE EL FRASCO DE VIDRIO (CON BÁSCULA INTERACTIVA) */}
      <SectionGranelAwwwards />

      {/* 6. BANNER B2B PARA SOCIOS & FOOTER */}
      <section id="b2b" className="relative z-20 py-12 md:py-16 px-4 sm:px-6 md:px-12 bg-[#F4ECE1] text-stone-950 border-t border-black/5 font-sans overflow-hidden">
        {/* Textura sutil de papel artesanal apergaminado */}
        <div className="absolute inset-0 bg-[radial-gradient(#D8C8B3_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Tarjeta con marco redondeado */}
          <div className="p-6 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] bg-[#EDE4D7] border-2 border-[#E5BA9E] text-left shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Columna Izquierda / Superior: Contenido */}
              <div className="lg:col-span-7 space-y-4 md:space-y-5">
                <span className="text-sm md:text-base font-sans font-medium text-[#B83E1E] block">
                  Oportunidad de negocio
                </span>

                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase font-black text-stone-950 leading-[0.98] tracking-tight">
                  ¿TIENES UNA VENTA O TIENDA DE BARRIO?
                </h3>

                <p className="text-sm md:text-base text-stone-800 font-normal max-w-xl leading-relaxed">
                  Krokanté Mani está pensado para comercios que quieren sumar algo diferente, fácil de exhibir y flexible para distintos bolsillos. Descubre nuestra formula de ventas:
                </p>

                {/* 3 Pilares de la fórmula de ventas */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-1 text-xs md:text-sm text-stone-900">
                  <div className="border-l-2 border-black pl-3 py-0.5 space-y-0.5 flex-1">
                    <span className="font-bold text-stone-950 block text-[13px] md:text-sm">El producto.</span>
                    <span className="text-stone-700 block text-xs leading-snug">4 sabores con identidad boliviana</span>
                  </div>
                  <div className="border-l-2 border-black pl-3 py-0.5 space-y-0.5 flex-1">
                    <span className="font-bold text-stone-950 block text-[13px] md:text-sm">La operación.</span>
                    <span className="text-stone-700 block text-xs leading-snug">Nuestro Exhibidor es una maquina de ventas</span>
                  </div>
                  <div className="border-l-2 border-black pl-3 py-0.5 space-y-0.5 flex-1">
                    <span className="font-bold text-stone-950 block text-[13px] md:text-sm">El respaldo.</span>
                    <span className="text-stone-700 block text-xs leading-snug">Red comercial: “Socio Krokanté”</span>
                  </div>
                </div>

                {/* Botón Rojo Terracota Redondeado */}
                <div className="pt-2">
                  <a 
                    href="https://b2b.krokantemani.top" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center justify-center px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-[#B82B14] hover:bg-[#9E230F] text-white font-sans font-bold text-sm sm:text-base uppercase tracking-wider transition-all shadow-md active:scale-98"
                  >
                    DESCUBRE CUANTO PUEDES VENDER
                  </a>
                </div>
              </div>

              {/* Columna Derecha / Inferior en Móvil: Imagen con máscara suave */}
              <div className="lg:col-span-5 flex justify-center items-center mt-2 lg:mt-0">
                <div className="relative max-w-sm sm:max-w-md w-full flex justify-center items-center overflow-hidden">
                  <img 
                    src="https://res.cloudinary.com/dcx6wcjlj/image/upload/v1789397601/muchacha_con_exhibidor_sz3pac.jpg" 
                    alt="Muchacha con exhibidor Krokanté en tienda" 
                    className="w-full h-auto object-cover [mask-image:radial-gradient(48%_48%_at_50%_50%,_black_40%,_transparent_98%)] [-webkit-mask-image:radial-gradient(48%_48%_at_50%_50%,_black_40%,_transparent_98%)]"
                  />
                </div>
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
          <button onClick={() => navigate('/mostradores?autoLocate=true')} className="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer">
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
