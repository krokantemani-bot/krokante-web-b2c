export interface MaterialPopAsociado {
  materialPopId?: string;
  nombre?: string;
  serialQR?: string;
  depositoGarantia?: number;
  fechaEntrega?: string;
}

export interface PuntoDeVenta {
  id: string;
  codigo?: string;
  nombre: string;
  propietario?: string;
  departamento: string; // "La Paz", "Santa Cruz", "Cochabamba", etc.
  zona: string;
  direccion: string;
  whatsapp: string;
  whatsappPublico?: string;
  onlineStatus?: boolean;
  latitude: number;
  longitude: number;
  tipoNegocio: string; // "Tienda de barrio", "Licorería", "Supermercado", "Mercado Saludable", etc.
  activo: boolean;
  esSocioKrokante?: boolean;
  fechaCambio?: string;
  materialesPopAsociados?: MaterialPopAsociado[];
  // Campos calculados dinámicamente en el frontend
  distanceKm?: number;
  esNuevo?: boolean;
}
