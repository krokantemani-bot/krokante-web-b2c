import React, { useState } from 'react';
import {
  CheckCircle2,
  Store,
  ChevronRight,
  ChevronLeft,
  Upload,
  X,
  MessageCircle,
  Flame,
} from 'lucide-react';
import type {
  B2BEvaluationData,
  B2BScoreResult,
} from '../lib/b2bScoring';
import {
  calculateB2BScore,
  generateB2BWhatsAppText,
} from '../lib/b2bScoring';

interface B2BEvaluationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveToFirebase?: (data: B2BEvaluationData, score: B2BScoreResult) => Promise<void>;
  whatsappNumber?: string;
}

export const B2BEvaluationForm: React.FC<B2BEvaluationFormProps> = ({
  isOpen,
  onClose,
  onSaveToFirebase,
  whatsappNumber = '59170000000',
}) => {
  const [teaserStep, setTeaserStep] = useState<'QUESTION' | 'YES_STATS' | 'FORM'>('QUESTION');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [completedScore, setCompletedScore] = useState<B2BScoreResult | null>(null);
  const [showCriteriaModal, setShowCriteriaModal] = useState<boolean>(false);

  const [formData, setFormData] = useState<B2BEvaluationData>({
    nombreComercio: '',
    nombrePropietario: '',
    whatsapp: '',
    direccion: '',
    barrioZona: '',
    tipoEstablecimiento: 'Minimarket',
    antiguedad: '6 meses - 2 años',
    quienTomaDecisiones: 'Solo yo',
    productosManiActuales: [],
    espacioPreferencial: 'Sí',
    higieneGarantizada: 'Sí, garantizado',
    flujoClientes: '80-150/día',
    garantíaMaterialesPop: 'Sí, totalmente dispuesto',
    compromisoPromociones: 'Sí, me comprometo totalmente',
    ingresosDiariosBs: 'Bs.1101 a Bs.5000',
    interesVitrinasDispensadoras: 'Sí, me interesa mucho',
    futurosLanzamientosPiloto: ['Pasta de Maní con Pistacho'],
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof B2BEvaluationData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArraySelection = (field: keyof B2BEvaluationData, item: string) => {
    setFormData((prev) => {
      const currentArr = (prev[field] as string[]) || [];
      if (currentArr.includes(item)) {
        return { ...prev, [field]: currentArr.filter((i) => i !== item) };
      } else {
        return { ...prev, [field]: [...currentArr, item] };
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, fotoEspacioFile: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCalculateAndFinish = async () => {
    const score = calculateB2BScore(formData);
    setCompletedScore(score);

    if (onSaveToFirebase) {
      try {
        setIsSubmitting(true);
        await onSaveToFirebase(formData, score);
      } catch (e) {
        console.error('Error al guardar en Firebase:', e);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const whatsappUrl = completedScore
    ? `https://wa.me/${whatsappNumber}?text=${generateB2BWhatsAppText(formData, completedScore)}`
    : '#';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
      {/* MODAL CON FONDO CREMA ARTESANAL KROKANTÉ (#F4ECE1) */}
      <div className="relative w-full max-w-2xl bg-[#F4ECE1] text-stone-900 border-2 border-stone-800/30 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* TEXTURA SUTIL DE PUNTOS DE SECCIÓN CATÁLOGO */}
        <div className="absolute inset-0 bg-[radial-gradient(#D8C8B3_1px,transparent_1px)] [background-size:20px_20px] opacity-50 pointer-events-none" />

        {/* Modal Header */}
        <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-stone-800/15 bg-[#EAE1D3]/90 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-600/15 text-amber-900 border border-amber-700/30">
              <Store className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-stone-950 tracking-wide font-display uppercase">
                Evaluación de Socios Krokanté
              </h2>
              <span className="text-[11px] text-stone-700 font-mono font-bold">
                Puntuación de Criterios Mínimos para Exhibidor
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-700 hover:text-stone-950 hover:bg-stone-800/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENIDO SEGÚN ESTADO DE TEASER O FORMULARIO */}

        {/* 1. TEASER: PREGUNTA INICIAL DEL CATÁLOGO Y NOTA DE OBJETIVO */}
        {teaserStep === 'QUESTION' && (
          <div className="relative z-10 p-6 sm:p-8 space-y-5 text-center overflow-y-auto">
            {/* NOTA BREVE DE OBJETIVO Y ESCALA DE EVALUACIÓN */}
            <div className="p-4 rounded-2xl bg-[#EFE6D8] border border-[#D8C8B3] text-left space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold text-amber-900 uppercase tracking-wider">
                  Objetivo de la Evaluación
                </span>
                <span className="text-[10px] font-mono text-stone-600 font-bold">Krokanté B2B</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-800 font-medium leading-relaxed">
                Evaluar la aptitud de tu negocio para instalar un <strong>Exhibidor Krokanté</strong> y activar nuestros 5 Beneficios Exclusivos en tu zona.
              </p>
              
              <div className="pt-2 border-t border-[#D8C8B3] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                <div className="space-y-0.5">
                  <span className="block text-emerald-800 font-extrabold">• 65 a 100 Pts: Socio Aprobado</span>
                  <span className="block text-stone-700 font-bold">• 0 a 64 Pts: Lista de Prevaluación</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCriteriaModal(true)}
                  className="text-amber-900 font-extrabold hover:underline text-xs text-left sm:text-right cursor-pointer"
                >
                  Ver criterios y desglose (100 Pts)
                </button>
              </div>
            </div>

            <div className="w-12 h-12 mx-auto rounded-full bg-amber-600/15 border border-amber-700/30 flex items-center justify-center text-amber-800 animate-pulse">
              <Flame className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-amber-900/10 border border-amber-900/20 text-amber-900 text-xs font-mono font-bold uppercase tracking-wider">
                Pregunta del Catálogo Krokanté
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-stone-950 uppercase leading-tight font-display">
                Con todo este juego de beneficios... <br />
                <span className="text-amber-700">
                  ¿Cree que nuestros socios Krokanté venden al menos 200 gramos de maní japonés por día?
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setTeaserStep('YES_STATS')}
                className="py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base transition-all transform hover:scale-[1.02] shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-2 cursor-pointer uppercase font-display tracking-wider"
              >
                <span>¡SÍ, TOTALMENTE!</span>
                <CheckCircle2 className="w-5 h-5" />
              </button>

              <button
                onClick={() => setTeaserStep('YES_STATS')}
                className="py-4 px-6 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-base border border-stone-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Tengo mis dudas</span>
              </button>
            </div>
          </div>
        )}

        {/* 2. TEASER: ESTADÍSTICA DE DEMANDA NO ATENDIDA EN LA ZONA */}
        {teaserStep === 'YES_STATS' && (
          <div className="relative z-10 p-6 sm:p-8 space-y-6 text-left overflow-y-auto">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase font-bold tracking-widest text-amber-900">
                Demanda Registrada en Mapa Interactivo
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-stone-950 uppercase font-display">
                Según nuestro Mapa Interactivo, en esta zona:
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3 font-mono text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-[#EFE6D8] border border-[#D8C8B3] flex items-center justify-between font-bold">
                <span className="text-stone-800">👥 Buscaron un producto Krokanté:</span>
                <span className="text-amber-800 font-extrabold">142 personas</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#EFE6D8] border border-[#D8C8B3] flex items-center justify-between font-bold">
                <span className="text-stone-800">❌ NO encontraron un PV Krokanté:</span>
                <span className="text-red-700 font-extrabold">98 personas</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#EFE6D8] border border-[#D8C8B3] flex items-center justify-between font-bold">
                <span className="text-stone-800">🗺️ Fueron enviadas a otra zona:</span>
                <span className="text-orange-700 font-extrabold">54 personas</span>
              </div>
              <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-600/30 flex items-center justify-between">
                <span className="text-stone-950 font-black">📦 Pidieron instalar un Exhibidor Krokanté:</span>
                <span className="text-emerald-800 font-black">Alta Demanda</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#EAE1D3] border border-[#D8C8B3] text-stone-900 text-xs sm:text-sm font-medium leading-relaxed">
              Estamos seleccionando un comercio en esta zona que cumpla con las condiciones mínimas necesarias para alojar un <strong>EXHIBIDOR KROKANTÉ</strong> mediante invitación a nuestra Red de Socios.
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setTeaserStep('FORM')}
                className="w-full py-4 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-black text-base uppercase font-display tracking-wider transition-all transform hover:scale-[1.01] shadow-xl shadow-amber-700/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>¿Le interesa aplicar? Comenzar Evaluación</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* 3. FORMULARIO WIZARD DE EVALUACIÓN (PASOS 1 A 4) */}
        {teaserStep === 'FORM' && !completedScore && (
          <div className="relative z-10 flex flex-col flex-1 overflow-hidden">
            {/* Barra de Progreso */}
            <div className="px-6 py-3 bg-[#EAE1D3] border-b border-[#D8C8B3] flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-900">
                <span>PASO {currentStep} DE 4</span>
                <span className="text-stone-400">|</span>
                <span className="text-stone-800 font-sans font-bold">
                  {currentStep === 1 && 'Identificación y Perfil'}
                  {currentStep === 2 && 'Espacio Físico e Imagen'}
                  {currentStep === 3 && 'Compromiso y Solvencia'}
                  {currentStep === 4 && 'Mercado e Innovación'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-1.5 rounded-full transition-all ${
                      step === currentStep
                        ? 'w-6 bg-amber-700'
                        : step < currentStep
                        ? 'w-3 bg-emerald-700'
                        : 'w-3 bg-stone-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Cuerpo del Formulario por Pasos */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              {/* PASO 1: Identificación y Perfil del Comercio */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-stone-700 mb-1">
                        Nombre del Comercio / Razón Social *
                      </label>
                      <input
                        type="text"
                        value={formData.nombreComercio}
                        onChange={(e) => handleInputChange('nombreComercio', e.target.value)}
                        placeholder="Ej. Minimarket Don Pedro"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D8C8B3] text-stone-900 text-sm font-semibold focus:border-amber-600 outline-none shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-stone-700 mb-1">
                        Nombre del Propietario / Encargado *
                      </label>
                      <input
                        type="text"
                        value={formData.nombrePropietario}
                        onChange={(e) => handleInputChange('nombrePropietario', e.target.value)}
                        placeholder="Ej. Carlos Pérez"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D8C8B3] text-stone-900 text-sm font-semibold focus:border-amber-600 outline-none shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-stone-700 mb-1">
                        WhatsApp Directo *
                      </label>
                      <input
                        type="tel"
                        value={formData.whatsapp}
                        onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                        placeholder="Ej. 70012345"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D8C8B3] text-stone-900 text-sm font-semibold focus:border-amber-600 outline-none shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-stone-700 mb-1">
                        Dirección Exacta y Barrio/Zona *
                      </label>
                      <input
                        type="text"
                        value={formData.direccion}
                        onChange={(e) => {
                          handleInputChange('direccion', e.target.value);
                          handleInputChange('barrioZona', e.target.value);
                        }}
                        placeholder="Ej. Av. Heroínas #456, Calacoto"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D8C8B3] text-stone-900 text-sm font-semibold focus:border-amber-600 outline-none shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-stone-700 mb-1">
                        Tipo de Establecimiento
                      </label>
                      <select
                        value={formData.tipoEstablecimiento}
                        onChange={(e) => handleInputChange('tipoEstablecimiento', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D8C8B3] text-stone-900 text-sm font-semibold focus:border-amber-600 outline-none shadow-sm"
                      >
                        <option value="Minimarket">Minimarket / Micromarket</option>
                        <option value="Licorera">Licorería</option>
                        <option value="Tienda Gourmet">Tienda Gourmet / Frutos Secos</option>
                        <option value="Cafetería">Cafetería / Panadería</option>
                        <option value="Estación de Servicio">Estación de Servicio</option>
                        <option value="Bar/Restaurante">Bar / Restaurante</option>
                        <option value="Tienda de Barrio">Tienda de Barrio</option>
                        <option value="Otro">Otro Negocio</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-stone-700 mb-1">
                        Antigüedad del Negocio
                      </label>
                      <select
                        value={formData.antiguedad}
                        onChange={(e) => handleInputChange('antiguedad', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D8C8B3] text-stone-900 text-sm font-semibold focus:border-amber-600 outline-none shadow-sm"
                      >
                        <option value="< 6 meses">Menos de 6 meses</option>
                        <option value="6 meses - 2 años">De 6 meses a 2 años</option>
                        <option value="> 2 años">Más de 2 años (Establecido)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-stone-700 mb-1">
                      ¿Quién toma las decisiones en su negocio?
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                      {['Solo yo', 'Yo y otra(s) persona(s)', 'Otra(s) persona(s)'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleInputChange('quienTomaDecisiones', opt)}
                          className={`py-2.5 px-3 rounded-xl border transition-all ${
                            formData.quienTomaDecisiones === opt
                              ? 'bg-amber-600 text-white border-amber-700 font-bold shadow-sm'
                              : 'bg-white border-[#D8C8B3] text-stone-800 hover:border-amber-600'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-stone-700 mb-1">
                      ¿Qué producto relacionado al maní vende actualmente en su negocio?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-semibold">
                      {[
                        'Ninguno',
                        'Maní tostado',
                        'Maní garapiñado',
                        'Maní japonés importado',
                        'Maní japonés nacional',
                        'Otro snack',
                      ].map((item) => {
                        const isSelected = formData.productosManiActuales.includes(item);
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggleArraySelection('productosManiActuales', item)}
                            className={`py-2 px-3 rounded-xl border transition-all text-left ${
                              isSelected
                                ? 'bg-amber-600 text-white border-amber-700 font-bold shadow-sm'
                                : 'bg-white border-[#D8C8B3] text-stone-800 hover:border-amber-600'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '} {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* PASO 2: Espacio Físico, Imagen y Estándares */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#EFE6D8] border border-[#D8C8B3] space-y-3 shadow-sm">
                    <label className="block text-sm font-bold text-stone-950">
                      ¿Está dispuesto a disponer un espacio preferencial (visible y accesible al cliente) en su tienda para nuestro mostrador?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      {['Sí', 'No', 'Depende del tamaño'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleInputChange('espacioPreferencial', opt)}
                          className={`py-3 px-3 rounded-xl border font-bold transition-all ${
                            formData.espacioPreferencial === opt
                              ? 'bg-amber-600 text-white border-amber-700 shadow-md'
                              : 'bg-white border-[#D8C8B3] text-stone-800 hover:border-amber-600'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#EFE6D8] border border-[#D8C8B3] space-y-3 shadow-sm">
                    <label className="block text-sm font-bold text-stone-950">
                      Fotografía del Espacio Disponibles (Mostrador / Caja)
                    </label>
                    <p className="text-xs text-stone-700 font-medium">
                      Subir una imagen otorga <strong>+8 PUNTOS EXTRAS</strong> en su evaluación final.
                    </p>
                    <div className="flex items-center gap-4">
                      <label className="flex-1 border-2 border-dashed border-stone-400 hover:border-amber-600 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-white">
                        <Upload className="w-6 h-6 mx-auto text-amber-800 mb-1" />
                        <span className="text-xs font-mono font-bold text-stone-800">
                          {formData.fotoEspacioFile ? formData.fotoEspacioFile.name : 'Subir o tomar foto del mostrador'}
                        </span>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                      </label>
                      {previewImage && (
                        <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-amber-600 shrink-0 shadow-md">
                          <img src={previewImage} alt="Vista previa" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#EFE6D8] border border-[#D8C8B3] space-y-3 shadow-sm">
                    <label className="block text-sm font-bold text-stone-950">
                      ¿El mostrador donde se ubicará el exhibidor se mantiene limpio, ordenado e iluminado diariamente?
                    </label>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      {['Sí, garantizado', 'No estoy de acuerdo'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleInputChange('higieneGarantizada', opt)}
                          className={`py-3 px-3 rounded-xl border font-bold transition-all ${
                            formData.higieneGarantizada === opt
                              ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm'
                              : 'bg-white border-[#D8C8B3] text-stone-800'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-stone-700 mb-1">
                      Flujo de Clientes Diarios Estimado
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold">
                      {['+150/día', '80-150/día', '30-80/día', '<30/día'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleInputChange('flujoClientes', opt)}
                          className={`py-2.5 px-2 rounded-xl border text-center transition-all ${
                            formData.flujoClientes === opt
                              ? 'bg-amber-600 text-white border-amber-700 font-bold shadow-sm'
                              : 'bg-white border-[#D8C8B3] text-stone-800'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* PASO 3: Compromiso Comercial y Solvencia */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#EFE6D8] border border-[#D8C8B3] space-y-3 shadow-sm">
                    <label className="block text-sm font-bold text-stone-950 leading-snug">
                      ¿Estaría dispuesto a cubrir la garantía de materiales POP (exhibidores, frascos, mostradores, etc.) como parte de su aporte al negocio de venta de productos Krokanté Maní en caso de ser seleccionado como socio Krokanté?
                    </label>
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      {[
                        'Sí, totalmente dispuesto',
                        'Dispuesto sujeto a condiciones',
                        'No',
                      ].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleInputChange('garantíaMaterialesPop', opt)}
                          className={`py-3 px-4 rounded-xl border font-bold text-left transition-all ${
                            formData.garantíaMaterialesPop === opt
                              ? 'bg-amber-600 text-white border-amber-700 shadow-md'
                              : 'bg-white border-[#D8C8B3] text-stone-800 hover:border-amber-600'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#EFE6D8] border border-[#D8C8B3] space-y-3 shadow-sm">
                    <label className="block text-sm font-bold text-stone-950 leading-snug">
                      Nuestro producto es nuevo en el mercado por lo que necesitará su atención, impulso y dedicación para generar buenos niveles de rotación. En ese sentido, ¿en caso de ser seleccionado como parte de nuestra sociedad comercial, se compromete a aplicar promociones y realizar ventas cruzadas con otros productos de su negocio?
                    </label>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      {['Sí, me comprometo totalmente', 'No estoy seguro'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleInputChange('compromisoPromociones', opt)}
                          className={`py-3 px-3 rounded-xl border font-bold transition-all ${
                            formData.compromisoPromociones === opt
                              ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm'
                              : 'bg-white border-[#D8C8B3] text-stone-800'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#EFE6D8] border border-[#D8C8B3] space-y-3 shadow-sm">
                    <label className="block text-sm font-bold text-stone-950">
                      ¿Cuál de las siguientes opciones expresa mejor los ingresos diarios de su negocio por ventas?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
                      {[
                        'Bs.100 a Bs.250',
                        'Bs.251 a Bs.700',
                        'Bs.701 a Bs.1100',
                        'Bs.1101 a Bs.5000',
                        'mas de Bs.5000',
                      ].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleInputChange('ingresosDiariosBs', opt)}
                          className={`py-3 px-3 rounded-xl border font-bold transition-all ${
                            formData.ingresosDiariosBs === opt
                              ? 'bg-amber-600 text-white border-amber-700 shadow-sm'
                              : 'bg-white border-[#D8C8B3] text-stone-800'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* PASO 4: Investigación de Mercado e Innovación */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#EFE6D8] border border-[#D8C8B3] space-y-3 shadow-sm">
                    <label className="block text-sm font-bold text-stone-950 leading-snug">
                      ¿Le interesaría ingresar al negocio de los frutos secos mediante nuestro modelo de negocio a través de pequeñas vitrinas dispensadoras?
                    </label>
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      {[
                        'Sí, me interesa mucho',
                        'Me gustaría recibir información',
                        'No por el momento',
                      ].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleInputChange('interesVitrinasDispensadoras', opt)}
                          className={`py-3 px-4 rounded-xl border font-bold text-left transition-all ${
                            formData.interesVitrinasDispensadoras === opt
                              ? 'bg-amber-600 text-white border-amber-700 shadow-md'
                              : 'bg-white border-[#D8C8B3] text-stone-800 hover:border-amber-600'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#EFE6D8] border border-[#D8C8B3] space-y-3 shadow-sm">
                    <label className="block text-sm font-bold text-stone-950">
                      Futuros Lanzamientos (Puntos Piloto Exclusivos)
                    </label>
                    <p className="text-xs text-stone-700 font-medium">
                      Seleccione los nuevos productos que le gustaría probar primero en su establecimiento:
                    </p>
                    <div className="grid grid-cols-1 gap-2 text-xs font-semibold">
                      {[
                        'Pasta de Maní con Pistacho',
                        'Mostrador de Frutos Secos Mix',
                        'Línea de Snacks Proteicos',
                      ].map((item) => {
                        const isSelected = formData.futurosLanzamientosPiloto.includes(item);
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggleArraySelection('futurosLanzamientosPiloto', item)}
                            className={`py-3 px-4 rounded-xl border font-bold text-left transition-all ${
                              isSelected
                                ? 'bg-amber-600 text-white border-amber-700 shadow-sm'
                                : 'bg-white border-[#D8C8B3] text-stone-800 hover:border-amber-600'
                            }`}
                          >
                            {isSelected ? '✓ PILOTO SELECCIONADO: ' : '+ INTERÉS EN: '} {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 bg-[#EAE1D3] border-t border-[#D8C8B3] flex items-center justify-between shrink-0">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="px-4 py-2.5 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-bold font-mono transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (!formData.nombreComercio || !formData.whatsapp || !formData.direccion) {
                      alert('Por favor complete los campos obligatorios del comercio para continuar.');
                      return;
                    }
                    setCurrentStep((prev) => prev + 1);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <span>Siguiente Paso</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCalculateAndFinish}
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold font-mono uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Procesando...</span>
                  ) : (
                    <>
                      <span>Calcular Puntaje y Finalizar</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {/* 4. RESULTADO DE EVALUACIÓN CON SCORE REVELADO Y ACCIONES */}
        {completedScore && (
          <div className="relative z-10 p-6 sm:p-8 space-y-6 text-center overflow-y-auto">
            <div className="w-24 h-24 mx-auto rounded-full bg-white border-4 border-amber-600 flex flex-col items-center justify-center shadow-xl">
              <span className="text-3xl font-black text-stone-950 font-mono">{completedScore.totalScore}</span>
              <span className="text-[10px] text-amber-800 font-mono font-bold">/ 100 PTS</span>
            </div>

            <div className="space-y-2">
              <span
                className={`inline-block px-4 py-1 rounded-full text-xs font-mono font-extrabold uppercase tracking-wider ${
                  completedScore.status === 'APROBADO'
                    ? 'bg-emerald-800/15 text-emerald-900 border border-emerald-800/30'
                    : 'bg-amber-800/15 text-amber-950 border border-amber-800/30'
                }`}
              >
                {completedScore.status === 'APROBADO' ? '✅ SOCIO CALIFICADO' : '⏳ LISTA DE PREVALUACIÓN'}
              </span>

              <h3 className="text-xl sm:text-2xl font-black text-stone-950 leading-tight font-display uppercase">
                {completedScore.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 font-medium max-w-md mx-auto leading-relaxed">
                {completedScore.message}
              </p>
            </div>

            {/* Desglose de Puntaje por Bloques */}
            <div className="grid grid-cols-2 gap-2 text-left font-mono text-xs max-w-md mx-auto font-bold">
              <div className="p-2.5 rounded-xl bg-white border border-[#D8C8B3] shadow-sm">
                <span className="text-stone-600 block text-[10px]">Compromiso & Solvencia</span>
                <span className="text-amber-900 font-extrabold">{completedScore.breakdown.compromisoYSolvencia} / 35 pts</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#D8C8B3] shadow-sm">
                <span className="text-stone-600 block text-[10px]">Espacio & Imagen</span>
                <span className="text-amber-900 font-extrabold">{completedScore.breakdown.espacioEImagen} / 30 pts</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#D8C8B3] shadow-sm">
                <span className="text-stone-600 block text-[10px]">Perfil & Tráfico</span>
                <span className="text-amber-900 font-extrabold">{completedScore.breakdown.perfilYTrafico} / 20 pts</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#D8C8B3] shadow-sm">
                <span className="text-stone-600 block text-[10px]">Innovación & Mercado</span>
                <span className="text-amber-900 font-extrabold">{completedScore.breakdown.innovacionYMercado} / 15 pts</span>
              </div>
            </div>

            {/* Acciones Finales: WhatsApp / Cerrar */}
            <div className="space-y-3 pt-2 max-w-md mx-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm uppercase font-display tracking-wider transition-all transform hover:scale-[1.02] shadow-xl flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Enviar Postulación por WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-2xl bg-white hover:bg-stone-100 text-stone-900 font-mono text-xs font-bold border border-[#D8C8B3] transition-colors shadow-sm cursor-pointer"
              >
                Cerrar Ventana
              </button>
            </div>
          </div>
        )}
      </div>

      {/* VENTANA EMERGENTE: CRITERIOS Y DESGLOSE DE PUNTOS (MONOCROMÁTICA CREMA) */}
      {showCriteriaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="max-w-md w-full p-6 rounded-3xl bg-[#F4ECE1] border-2 border-stone-400 shadow-2xl text-stone-900 relative space-y-4">
            <button
              onClick={() => setShowCriteriaModal(false)}
              className="absolute top-4 right-4 text-stone-600 hover:text-stone-950 p-1 rounded-lg hover:bg-stone-300/50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 text-left">
              <h3 className="font-extrabold text-base text-stone-950 font-mono uppercase tracking-wider">
                Criterios de Evaluación y Desglose
              </h3>
              <p className="text-xs text-stone-700 font-mono font-semibold">
                Total de Puntos de Aptitud: 100 Puntuación Máxima
              </p>
            </div>

            <div className="space-y-2.5 font-mono text-xs text-left">
              <div className="p-3 rounded-xl bg-white border border-[#D8C8B3] flex items-center justify-between shadow-sm">
                <div>
                  <span className="font-extrabold text-stone-950 block">1. Compromiso Comercial y Solvencia</span>
                  <span className="text-[11px] text-stone-700 font-medium">Garantía POP, promociones e ingresos en Bs.</span>
                </div>
                <span className="font-extrabold text-stone-950 text-sm shrink-0 ml-2">35 Pts</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#D8C8B3] flex items-center justify-between shadow-sm">
                <div>
                  <span className="font-extrabold text-stone-950 block">2. Espacio Físico e Imagen</span>
                  <span className="text-[11px] text-stone-700 font-medium">Mostrador visible, limpieza diaria y foto (+8)</span>
                </div>
                <span className="font-extrabold text-stone-950 text-sm shrink-0 ml-2">30 Pts</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#D8C8B3] flex items-center justify-between shadow-sm">
                <div>
                  <span className="font-extrabold text-stone-950 block">3. Perfil del Comercio y Tráfico</span>
                  <span className="text-[11px] text-stone-700 font-medium">Flujo de clientes diarios y antigüedad</span>
                </div>
                <span className="font-extrabold text-stone-950 text-sm shrink-0 ml-2">20 Pts</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#D8C8B3] flex items-center justify-between shadow-sm">
                <div>
                  <span className="font-extrabold text-stone-950 block">4. Investigación e Innovación</span>
                  <span className="text-[11px] text-stone-700 font-medium">Vitrinas dispensadoras y productos piloto</span>
                </div>
                <span className="font-extrabold text-stone-950 text-sm shrink-0 ml-2">15 Pts</span>
              </div>
            </div>

            <button
              onClick={() => setShowCriteriaModal(false)}
              className="w-full py-2.5 rounded-xl bg-stone-950 text-white font-mono font-extrabold text-xs uppercase tracking-wider hover:bg-stone-800 transition-colors shadow-md cursor-pointer"
            >
              Entendido / Cerrar Ventana
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
