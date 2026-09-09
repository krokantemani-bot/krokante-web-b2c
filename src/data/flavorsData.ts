export interface FlavorPresentation {
  id: string;
  weightGrams: number;
  name: string;
  containerType: 'bolsa' | 'frasco_mediano' | 'frasco_mostrador' | 'formato_casera';
  description: string;
  priceBs: number;
  isPopular?: boolean;
}

export interface FlavorData {
  id: string;
  title: string;
  subtitle: string;
  lineName: string;
  badgeText: string;
  accentHex: string;
  bgGradient: string;
  textColorClass: string;
  badgeBgClass: string;
  badgeTextColorClass: string;
  ringColorClass: string;
  labelImg: string;
  bgImage: string;
  videoIdDesktop: string;
  videoIdMobile: string;
  
  // Perfil Sensorial e Historia
  shortStory: string;
  fullStory: string;
  flavorProfile: {
    crunchiness: number; // 1 - 10
    intensity: number;   // 1 - 10
    spiciness: number;   // 0 - 10
    sweetness: number;   // 0 - 10
    umami: number;       // 1 - 10
  };
  keyIngredients: string[];
  
  // Maridaje y Consumo
  pairingBeverages: {
    name: string;
    icon: string;
    description: string;
  }[];
  idealMoments: {
    title: string;
    timeSlot: string;
    description: string;
  }[];
  
  // Frascos y Presentaciones
  presentations: FlavorPresentation[];
  
  // Testimonio / Cita Artesanal
  artisanQuote: {
    text: string;
    author: string;
  };
}

export const FLAVORS_DATA: Record<string, FlavorData> = {
  fuego: {
    id: 'fuego',
    title: 'PICANTE FUEGO',
    subtitle: 'Maní Japonés al Ají Colorado Boliviano',
    lineName: 'LÍNEA CERVECERA',
    badgeText: '🍻 MOMENTO CERVECERO',
    accentHex: '#DC2626',
    bgGradient: 'from-red-950 via-stone-950 to-black',
    textColorClass: 'text-red-500',
    badgeBgClass: 'bg-red-600',
    badgeTextColorClass: 'text-white',
    ringColorClass: 'ring-red-500/90 shadow-[0_0_25px_rgba(220,38,38,0.6)]',
    labelImg: 'https://res.cloudinary.com/dcx6wcjlj/image/upload/v1788362869/Picante_kt7fy5.png',
    bgImage: 'https://img.youtube.com/vi/ubCjICSaxjE/maxresdefault.jpg',
    videoIdDesktop: 'ubCjICSaxjE',
    videoIdMobile: 'ApVoofB_akI',


    
    shortStory: 'El crujido picante que enciende los churrascos nocturnos y las cervezas frías pasadas las 6 de la tarde.',
    fullStory: 'Nuestra receta Picante Fuego nació del deseo de rescatar el auténtico ají colorado boliviano, deshidratado artesanalmente y tostado a fuego lento junto a nuestro maní japonés de primera selección. El resultado es una cubierta doblemente crocante con una patada picante de intensidad perfecta, pensada para acompañar la primera cerveza fría del fin de semana.',
    
    flavorProfile: {
      crunchiness: 9,
      intensity: 9,
      spiciness: 8,
      sweetness: 2,
      umami: 8,
    },
    
    keyIngredients: [
      'Maní Selecto Boliviano 100% Horneado',
      'Pimentón y Ají Colorado Deshidratado',
      'Mezcla de Especias Cerveceras',
      'Sal Marina Fina'
    ],
    
    pairingBeverages: [
      { name: 'Pilsen Fría & Huari', icon: '🍺', description: 'El picor del ají resalta el amargor refrescante del lúpulo.' },
      { name: 'Cerveza IPA Artesanal', icon: '🍻', description: 'Potencia los matices cítricos y herbales del lúpulo amargo.' },
      { name: 'Michelada de la Casa', icon: '🍹', description: 'Sinergia total entre el zumo de limón, sal y el crujido de fuego.' }
    ],
    
    idealMoments: [
      { title: 'Churrascos & Parrilladas', timeSlot: 'Sábados 7:00 PM', description: 'El aperitivo ideal mientras el carbón se enciende y la carne se sella.' },
      { title: 'Previa entre Amigos', timeSlot: 'Viernes 6:30 PM', description: 'Dispara la conversación y abre el apetito de manera inmediata.' }
    ],
    
    presentations: [
      { id: 'fuego-100g', weightGrams: 100, name: 'Bolsa Artesanal Antojo', containerType: 'bolsa', description: 'Porción individual servida al momento por la casera.', priceBs: 7 },
      { id: 'fuego-250g', weightGrams: 250, name: 'Frasco Hermético Mediano', containerType: 'frasco_mediano', description: 'Perfecto para compartir en una mesa de 3 a 4 personas.', priceBs: 16, isPopular: true },
      { id: 'fuego-500g', weightGrams: 500, name: 'Frasco de Vidrio Mostrador', containerType: 'frasco_mostrador', description: 'Ideal para eventos, parrillas y consumo recurrente.', priceBs: 30 },
      { id: 'fuego-1000g', weightGrams: 1000, name: 'Formato Mayorista Casera (1 kg)', containerType: 'formato_casera', description: 'La máxima cantidad con el precio por gramo más bajo.', priceBs: 55 }
    ],
    
    artisanQuote: {
      text: 'El ají colorado no debe quemar la lengua; debe despertar las papilas para que cada trago de cerveza se sienta el doble de helado.',
      author: 'Maestro Tostador Krokanté'
    }
  },

  curcuma: {
    id: 'curcuma',
    title: 'CÚRCUMA PIMIENTA NEGRA',
    subtitle: 'Maní Japonés Antioxidante Activo',
    lineName: 'LÍNEA SALUDABLE',
    badgeText: '⚡ MOMENTO PRE-ENTRENO',
    accentHex: '#D97706',
    bgGradient: 'from-amber-950 via-yellow-950 to-black',
    textColorClass: 'text-amber-500',
    badgeBgClass: 'bg-amber-500',
    badgeTextColorClass: 'text-stone-950 font-black',
    ringColorClass: 'ring-amber-400/90 shadow-[0_0_25px_rgba(245,158,11,0.6)]',
    labelImg: 'https://res.cloudinary.com/dcx6wcjlj/image/upload/v1788362869/curcuma_c7vfaq.png',
    bgImage: 'https://img.youtube.com/vi/WWG4DchYJRc/maxresdefault.jpg',
    videoIdDesktop: 'WWG4DchYJRc',
    videoIdMobile: 'SRD6qQYs-_I',
    
    shortStory: 'Tu recarga de proteína vegetal y energía activa antes de salir a trotar, al gym o a jugar pádel.',
    fullStory: 'Una innovación nacida de la nutrición activa consciente. Combinamos cúrcuma dorada con un toque estratégico de pimienta negra recién molida (que activa la absorción de la curcumina hasta en un 2000%), horneando el maní con un toque delicado de mantequilla. Sabor terroso, cálido y crujiente.',

    
    flavorProfile: {
      crunchiness: 8,
      intensity: 7,
      spiciness: 0,
      sweetness: 1,
      umami: 7,
    },

    
    keyIngredients: [
      'Maní Boliviano de Grano Entero',
      'Cúrcuma Dorada Orgánica',
      'Pimienta Negra Activadora Molida',
      'Mantequilla como materia grasa'
    ],

    
    pairingBeverages: [
      { name: 'Agua de Coco Fresca', icon: '🥥', description: 'Rehidrata e intensifica los toques florales y cálidos de la cúrcuma.' },
      { name: 'Jugo Verde o Cítrico', icon: '🥤', description: 'Contraste refrescante con toques de manzana verde, jengibre y apio.' },
      { name: 'Té Helado de Limón', icon: '🍵', description: 'Complemento suave para una tarde de oficina o post-entreno.' }
    ],
    
    idealMoments: [
      { title: 'Ritual Pre y Post Entreno', timeSlot: 'Diario 7:00 AM / 6:00 PM', description: 'Proteína vegetal de rápida digestión y poder antiinflamatorio.' },
      { title: 'Snack de Escritorio Saludable', timeSlot: 'Tardes 4:00 PM', description: 'Satisface el antojo crocante sin culpa ni grasas saturas.' }
    ],
    
    presentations: [
      { id: 'curcuma-100g', weightGrams: 100, name: 'Bolsa Artesanal Antojo', containerType: 'bolsa', description: 'Ideal para llevar en la mochila de entrenamiento.', priceBs: 8 },
      { id: 'curcuma-250g', weightGrams: 250, name: 'Frasco Hermético Mediano', containerType: 'frasco_mediano', description: 'El guardián de tu despensa fitness.', priceBs: 17, isPopular: true },
      { id: 'curcuma-500g', weightGrams: 500, name: 'Frasco de Vidrio Mostrador', containerType: 'frasco_mostrador', description: 'Para familias activas y deportistas constantes.', priceBs: 32 },
      { id: 'curcuma-1000g', weightGrams: 1000, name: 'Formato Mayorista Casera (1 kg)', containerType: 'formato_casera', description: 'Suministro mensual de proteína crujiente.', priceBs: 58 }
    ],
    
    artisanQuote: {
      text: 'Buscábamos un snack que no sólo sepa increíble, sino que te haga sentir lleno de vitalidad al terminar la jornada.',
      author: 'Equipo de Desarrollo Nutricional Krokanté'
    }
  },

  cebolla: {
    id: 'cebolla',
    title: 'CEBOLLA CRUNCH',
    subtitle: 'Maní Japonés al Cebollín Dulce & Finas Hierbas',
    lineName: 'LÍNEA FAMILIAR',
    badgeText: '🏡 MOMENTO FAMILIAR',
    accentHex: '#059669',
    bgGradient: 'from-emerald-950 via-stone-950 to-black',
    textColorClass: 'text-emerald-500',
    badgeBgClass: 'bg-emerald-600',
    badgeTextColorClass: 'text-white',
    ringColorClass: 'ring-emerald-400/90 shadow-[0_0_25px_rgba(16,185,129,0.6)]',
    labelImg: 'https://res.cloudinary.com/dcx6wcjlj/image/upload/v1788362869/Cebolla_y8oij5.png',
    bgImage: 'https://img.youtube.com/vi/X4SQkaqEwRE/maxresdefault.jpg',
    videoIdDesktop: 'X4SQkaqEwRE',
    videoIdMobile: 'GzRZhb_Fmb8',
    
    shortStory: 'El favorito de las tardes-noches en la galería del jardín a partir de las 7 PM para compartir en familia.',
    fullStory: 'Un sabor entrañable que evoca la calidez del hogar. Elaborado con cebollines de campo caramelizados a fuego lento y espolvoreados con un toque de perejil y finas hierbas deshidratadas. Su dulzura aromática le chifla a chicos y grandes por igual.',
    
    flavorProfile: {
      crunchiness: 9,
      intensity: 8,
      spiciness: 0,
      sweetness: 4,
      umami: 8,
    },
    
    keyIngredients: [
      'Maní Selecto Horneado',
      'Cebolla Blanca y Cebollín Carmelizado',
      'Finas Hierbas (Perejil & Orégano)',
      'Cubierta Crocante Umami'
    ],
    
    pairingBeverages: [
      { name: 'Refrescos Helados & Gaseosas', icon: '🥤', description: 'El contraste dulzón de la cebolla horneada combina perfecto con las burbujas.' },
      { name: 'Té Helado o Limonada con Menta', icon: '🍹', description: 'Resalta el aroma herbal y limpia el paladar tras cada puñado.' },
      { name: 'Cerveza Rubia Suave', icon: '🍺', description: 'Maridaje sutil donde ninguno de los sabores opaca al otro.' }
    ],
    
    idealMoments: [
      { title: 'Tardes en Familia & Galería', timeSlot: 'Domingos 5:00 PM', description: 'El centro de la mesa en charlas de patio y reuniones de fin de semana.' },
      { title: 'Noche de Películas & Series', timeSlot: 'Noches 8:30 PM', description: 'Sustituto superior a las pipocas tradicionales.' }
    ],
    
    presentations: [
      { id: 'cebolla-100g', weightGrams: 100, name: 'Bolsa Artesanal Antojo', containerType: 'bolsa', description: 'Porción justa para probar o llevar de paso.', priceBs: 7 },
      { id: 'cebolla-250g', weightGrams: 250, name: 'Frasco Hermético Mediano', containerType: 'frasco_mediano', description: 'Infaltable en la sala para recibir visitas.', priceBs: 16, isPopular: true },
      { id: 'cebolla-500g', weightGrams: 500, name: 'Frasco de Vidrio Mostrador', containerType: 'frasco_mostrador', description: 'El tamaño preferido por familias numerosas.', priceBs: 30 },
      { id: 'cebolla-1000g', weightGrams: 1000, name: 'Formato Mayorista Casera (1 kg)', containerType: 'formato_casera', description: 'Gramaje máximo para rellenar frascos en casa.', priceBs: 54 }
    ],
    
    artisanQuote: {
      text: 'Cuando abres el frasco de Cebolla Crunch, el aroma a cebollín dulce inundará la habitación antes de que puedas dar el primer mordisco.',
      author: 'Receta Familiar Krokanté'
    }
  },

  soya: {
    id: 'soya',
    title: 'SALSA SOYA TRADICIONAL',
    subtitle: 'Maní Japonés Umami Horneado al Tostado Ancestral',
    lineName: 'LÍNEA TRADICIONAL',
    badgeText: '💼 MOMENTO URBANO',
    accentHex: '#D4D4D4',
    bgGradient: 'from-stone-950 via-neutral-900 to-black',
    textColorClass: 'text-neutral-300',
    badgeBgClass: 'bg-neutral-200',
    badgeTextColorClass: 'text-stone-950 font-black',
    ringColorClass: 'ring-white/90 shadow-[0_0_25px_rgba(255,255,255,0.5)]',
    labelImg: 'https://res.cloudinary.com/dcx6wcjlj/image/upload/v1788362869/Soya_xw04kx.png',
    bgImage: 'https://img.youtube.com/vi/OiKSIPFHhNg/maxresdefault.jpg',
    videoIdDesktop: 'OiKSIPFHhNg',
    videoIdMobile: 'coHWgMXups8',
    
    shortStory: 'El toque tradicional umami para hacer una pausa con estilo durante tu jornada laboral.',
    fullStory: 'El pilar que dio origen a la leyenda del maní japonés. Nuestra Salsa Soya Tradicional utiliza salsa de soya puramente fermentada y horneada en capas finas hasta lograr ese color ámbar tostado profundo y un golpe de sabor umami de elegancia inigualable.',
    
    flavorProfile: {
      crunchiness: 10,
      intensity: 8,
      spiciness: 0,
      sweetness: 2,
      umami: 10,
    },
    
    keyIngredients: [
      'Maní Boliviano Tostado',
      'Salsa de Soya Fermentada Natural',
      'Toque de Sésamo Tostado',
      'Sal Marina Fina'
    ],
    
    pairingBeverages: [
      { name: 'Café Helado o Espresso', icon: '☕', description: 'El umami salado resalta la riqueza del grano de café tostado.' },
      { name: 'Agua con Gas y Limón', icon: '🫧', description: 'Limpieza e intermedio perfecto entre cada crujido.' },
      { name: 'Cerveza Negra o Stout', icon: '🍺', description: 'Complemento malteado de profunda sofisticación.' }
    ],
    
    idealMoments: [
      { title: 'Pausa de Oficina & Co-working', timeSlot: 'Tardes 3:30 PM', description: 'Desconecta de la pantalla con una explosión de crujido umami.' },
      { title: 'Regreso del Almuerzo & Caminatas', timeSlot: 'Diario 2:00 PM', description: 'Satisface el antojo salado durante tus traslados en la ciudad.' }
    ],
    
    presentations: [
      { id: 'soya-100g', weightGrams: 100, name: 'Bolsa Artesanal Antojo', containerType: 'bolsa', description: 'Para llevar en el maletín o mochila laboral.', priceBs: 7 },
      { id: 'soya-250g', weightGrams: 250, name: 'Frasco Hermético Mediano', containerType: 'frasco_mediano', description: 'El clásico de escritorio que todos te pedirán.', priceBs: 16, isPopular: true },
      { id: 'soya-500g', weightGrams: 500, name: 'Frasco de Vidrio Mostrador', containerType: 'frasco_mostrador', description: 'Para adictos al verdadero crujido umami.', priceBs: 30 },
      { id: 'soya-1000g', weightGrams: 1000, name: 'Formato Mayorista Casera (1 kg)', containerType: 'formato_casera', description: 'La opción más económica por kilogramo de sabor.', priceBs: 54 }
    ],
    
    artisanQuote: {
      text: 'La receta tradicional japonesa celebra el equilibrio perfecto: una cubierta crujiente de horneado impecable que envuelve el corazón del maní con todo el carácter de la soya.',
      author: 'Fundador Krokanté'
    }

  }
};
