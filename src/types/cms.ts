export interface MediaItem {
  id: string;
  title: string;
  category: 'hero_video' | 'flavor_pack' | 'banner' | 'story_image';
  url: string;
  recommendedResolution: string;
  aspectRatio: string;
  allowedFormats: string[];
  maxSizeMB: number;
}

export const INITIAL_MEDIA_CONFIG: Record<string, MediaItem> = {
  hero_video: {
    id: 'hero_video',
    title: 'Video / Imagen de Portada Principal (Hero)',
    category: 'hero_video',
    url: 'https://res.cloudinary.com/dcx6wcjlj/video/upload/v1778279379/hero_krokante.mp4',
    recommendedResolution: '1920 x 1080 px',
    aspectRatio: '16:9 (Horizontal)',
    allowedFormats: ['MP4', 'WEBM', 'MOV', 'JPG', 'PNG', 'WEBP', 'AVIF'],
    maxSizeMB: 15
  },
  flavor_soya: {
    id: 'flavor_soya',
    title: 'Empaque Salsa Soya (La Tradicional)',
    category: 'flavor_pack',
    url: '/images/soya.png',
    recommendedResolution: '1000 x 1000 px',
    aspectRatio: '1:1 (Cuadrado)',
    allowedFormats: ['PNG', 'JPG', 'WEBP', 'AVIF', 'HEIC', 'SVG'],
    maxSizeMB: 5
  },
  flavor_fuego: {
    id: 'flavor_fuego',
    title: 'Empaque Picante Fuego (Línea Cervecera)',
    category: 'flavor_pack',
    url: '/images/fuego.png',
    recommendedResolution: '1000 x 1000 px',
    aspectRatio: '1:1 (Cuadrado)',
    allowedFormats: ['PNG', 'JPG', 'WEBP', 'AVIF', 'HEIC', 'SVG'],
    maxSizeMB: 5
  },
  flavor_curcuma: {
    id: 'flavor_curcuma',
    title: 'Empaque Cúrcuma Crunch (Línea Saludable)',
    category: 'flavor_pack',
    url: 'https://res.cloudinary.com/dcx6wcjlj/image/upload/q_auto/f_auto/v1778279379/curcuma_eq2qxh.webp',
    recommendedResolution: '1000 x 1000 px',
    aspectRatio: '1:1 (Cuadrado)',
    allowedFormats: ['PNG', 'JPG', 'WEBP', 'AVIF', 'HEIC', 'SVG'],
    maxSizeMB: 5
  },
  flavor_cebolla: {
    id: 'flavor_cebolla',
    title: 'Empaque Cebolla Crunch (Línea Familiar)',
    category: 'flavor_pack',
    url: 'https://res.cloudinary.com/dcx6wcjlj/image/upload/q_auto/f_auto/v1778279379/cebolla_kloydi.webp',
    recommendedResolution: '1000 x 1000 px',
    aspectRatio: '1:1 (Cuadrado)',
    allowedFormats: ['PNG', 'JPG', 'WEBP', 'AVIF', 'HEIC', 'SVG'],
    maxSizeMB: 5
  },
  flavor_choc: {
    id: 'flavor_choc',
    title: 'Empaque Chocolate Premium (Línea Gourmet)',
    category: 'flavor_pack',
    url: 'https://res.cloudinary.com/dcx6wcjlj/image/upload/q_auto/f_auto/v1778279379/chocolate_h8ir8d.webp',
    recommendedResolution: '1000 x 1000 px',
    aspectRatio: '1:1 (Cuadrado)',
    allowedFormats: ['PNG', 'JPG', 'WEBP', 'AVIF', 'HEIC', 'SVG'],
    maxSizeMB: 5
  }
};
