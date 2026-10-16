export interface B2BEvaluationData {
  // Paso 1: Identificación y Perfil
  nombreComercio: string;
  nombrePropietario: string;
  whatsapp: string;
  direccion: string;
  barrioZona: string;
  latitude?: number;
  longitude?: number;
  tipoEstablecimiento: string;
  antiguedad: '< 6 meses' | '6 meses - 2 años' | '> 2 años';
  quienTomaDecisiones: 'Solo yo' | 'Yo y otra(s) persona(s)' | 'Otra(s) persona(s)';
  productosManiActuales: string[]; // Ninguno, maní tostado, maní garapiñado, maní japonés importado, maní japonés nacional, otro

  // Paso 2: Espacio Físico e Imagen
  espacioPreferencial: 'Sí' | 'No' | 'Depende del tamaño';
  fotoEspacioUrl?: string;
  fotoEspacioFile?: File;
  higieneGarantizada: 'Sí, garantizado' | 'No estoy de acuerdo';
  flujoClientes: '+150/día' | '80-150/día' | '30-80/día' | '<30/día';

  // Paso 3: Compromiso Comercial y Solvencia
  garantíaMaterialesPop: 'Sí, totalmente dispuesto' | 'Dispuesto sujeto a condiciones' | 'No';
  compromisoPromociones: 'Sí, me comprometo totalmente' | 'No estoy seguro';
  ingresosDiariosBs: 'Bs.100 a Bs.250' | 'Bs.251 a Bs.700' | 'Bs.701 a Bs.1100' | 'Bs.1101 a Bs.5000' | 'mas de Bs.5000';

  // Paso 4: Investigación e Innovación
  interesVitrinasDispensadoras: 'Sí, me interesa mucho' | 'Me gustaría recibir información' | 'No por el momento';
  futurosLanzamientosPiloto: string[]; // Pasta de maní con pistacho, frutos secos mix, etc.
}

export interface B2BScoreResult {
  totalScore: number;
  status: 'APROBADO' | 'PREVALUACION';
  title: string;
  message: string;
  breakdown: {
    compromisoYSolvencia: number; // Max 35
    espacioEImagen: number;      // Max 30
    perfilYTrafico: number;       // Max 20
    innovacionYMercado: number;   // Max 15
  };
}

export function calculateB2BScore(data: Partial<B2BEvaluationData>): B2BScoreResult {
  // BLOQUE 1: Compromiso Comercial y Solvencia (Máximo 35 Puntos)
  let compromisoYSolvencia = 0;

  // 1. Garantía POP (Max 15)
  if (data.garantíaMaterialesPop === 'Sí, totalmente dispuesto') {
    compromisoYSolvencia += 15;
  } else if (data.garantíaMaterialesPop === 'Dispuesto sujeto a condiciones') {
    compromisoYSolvencia += 10;
  }

  // 2. Promociones e Impulso (Max 10)
  if (data.compromisoPromociones === 'Sí, me comprometo totalmente') {
    compromisoYSolvencia += 10;
  } else if (data.compromisoPromociones === 'No estoy seguro') {
    compromisoYSolvencia += 3;
  }

  // 3. Ingresos Diarios en Bolivianos (Max 10)
  switch (data.ingresosDiariosBs) {
    case 'mas de Bs.5000':
      compromisoYSolvencia += 10;
      break;
    case 'Bs.1101 a Bs.5000':
      compromisoYSolvencia += 8;
      break;
    case 'Bs.701 a Bs.1100':
      compromisoYSolvencia += 6;
      break;
    case 'Bs.251 a Bs.700':
      compromisoYSolvencia += 4;
      break;
    case 'Bs.100 a Bs.250':
      compromisoYSolvencia += 2;
      break;
    default:
      break;
  }

  // BLOQUE 2: Espacio Físico, Imagen e Higiene (Máximo 30 Puntos)
  let espacioEImagen = 0;

  // 4. Espacio Preferencial (Max 12)
  if (data.espacioPreferencial === 'Sí') {
    espacioEImagen += 12;
  } else if (data.espacioPreferencial === 'Depende del tamaño') {
    espacioEImagen += 7;
  }

  // 5. Higiene y Limpieza Diaria (Max 10)
  if (data.higieneGarantizada === 'Sí, garantizado') {
    espacioEImagen += 10;
  }

  // 6. Foto del Espacio (Max 8)
  if (data.fotoEspacioFile || data.fotoEspacioUrl) {
    espacioEImagen += 8;
  }

  // BLOQUE 3: Perfil del Comercio y Tráfico (Máximo 20 Puntos)
  let perfilYTrafico = 0;

  // 7. Flujo de Clientes Diarios (Max 8)
  switch (data.flujoClientes) {
    case '+150/día':
      perfilYTrafico += 8;
      break;
    case '80-150/día':
      perfilYTrafico += 6;
      break;
    case '30-80/día':
      perfilYTrafico += 4;
      break;
    case '<30/día':
      perfilYTrafico += 2;
      break;
    default:
      break;
  }

  // 8. Toma de Decisiones (Max 5)
  if (data.quienTomaDecisiones === 'Solo yo') {
    perfilYTrafico += 5;
  } else if (data.quienTomaDecisiones === 'Yo y otra(s) persona(s)') {
    perfilYTrafico += 3;
  } else if (data.quienTomaDecisiones === 'Otra(s) persona(s)') {
    perfilYTrafico += 1;
  }

  // 9. Antigüedad y Tipo de Comercio (Max 7)
  const tiposPrioritarios = ['Minimarket', 'Licorera', 'Tienda Gourmet', 'Estación de Servicio', 'Cafetería'];
  const esTipoPrioritario = data.tipoEstablecimiento && tiposPrioritarios.includes(data.tipoEstablecimiento);

  if (data.antiguedad === '> 2 años') {
    perfilYTrafico += esTipoPrioritario ? 7 : 5;
  } else if (data.antiguedad === '6 meses - 2 años') {
    perfilYTrafico += esTipoPrioritario ? 5 : 3;
  } else {
    perfilYTrafico += esTipoPrioritario ? 3 : 1;
  }

  // BLOQUE 4: Investigación de Mercado e Innovación (Máximo 15 Puntos)
  let innovacionYMercado = 0;

  // 10. Interés en Vitrinas Dispensadoras (Max 8)
  if (data.interesVitrinasDispensadoras === 'Sí, me interesa mucho') {
    innovacionYMercado += 8;
  } else if (data.interesVitrinasDispensadoras === 'Me gustaría recibir información') {
    innovacionYMercado += 5;
  } else if (data.interesVitrinasDispensadoras === 'No por el momento') {
    innovacionYMercado += 1;
  }

  // 11. Futuros Lanzamientos Piloto (Max 7)
  const numFuturos = data.futurosLanzamientosPiloto?.length || 0;
  if (numFuturos >= 2) {
    innovacionYMercado += 7;
  } else if (numFuturos === 1) {
    innovacionYMercado += 4;
  }

  const totalScore = compromisoYSolvencia + espacioEImagen + perfilYTrafico + innovacionYMercado;

  const isApproved = totalScore >= 65;

  return {
    totalScore,
    status: isApproved ? 'APROBADO' : 'PREVALUACION',
    title: isApproved
      ? '¡Felicidades! Su negocio cumple los criterios mínimos requeridos por Krokanté Maní'
      : 'Calificación Preliminar - Lista de Prevaluación',
    message: isApproved
      ? 'Su negocio ha sido pre-calificado exitosamente para ingresar a nuestra red de socios comerciales en esta zona.'
      : 'Su negocio ha ingresado en la Lista de Prevaluación junto a otros negocios de la zona para su revisión.',
    breakdown: {
      compromisoYSolvencia,
      espacioEImagen,
      perfilYTrafico,
      innovacionYMercado,
    },
  };
}

export function generateB2BWhatsAppText(data: B2BEvaluationData, result: B2BScoreResult): string {
  const text = `
*SOLICITUD DE SOCIO KROKANTÉ - EVALUACIÓN B2B*
------------------------------------------------
🏆 *Puntaje Obtenido:* ${result.totalScore} / 100 Pts
📊 *Estado:* ${result.status === 'APROBADO' ? '✅ APROBADO (Criterios Mínimos Cumplidos)' : '⏳ LISTA DE PREVALUACIÓN'}

🏪 *DATOS DEL COMERCIO:*
• *Negocio:* ${data.nombreComercio}
• *Propietario/Contacto:* ${data.nombrePropietario}
• *WhatsApp:* ${data.whatsapp}
• *Dirección/Zona:* ${data.direccion} (${data.barrioZona})
• *Tipo Negocio:* ${data.tipoEstablecimiento}
• *Antigüedad:* ${data.antiguedad}
• *Ingresos Diarios:* ${data.ingresosDiariosBs}

📋 *ESTÁNDARES Y COMPROMISO:*
• *Espacio Preferencial:* ${data.espacioPreferencial}
• *Garantía Materiales POP:* ${data.garantíaMaterialesPop}
• *Impulso y Ventas Cruzadas:* ${data.compromisoPromociones}
• *Higiene Mostrador:* ${data.higieneGarantizada}
• *Flujo Clientes:* ${data.flujoClientes}

💡 *MERCADO E INNOVACIÓN:*
• *Interés Vitrinas Dispensadoras:* ${data.interesVitrinasDispensadoras}
• *Lanzamientos Piloto:* ${data.futurosLanzamientosPiloto?.join(', ') || 'Ninguno'}
------------------------------------------------
_Generado desde la Plataforma Web Oficial de Krokanté_
`.trim();

  return encodeURIComponent(text);
}
