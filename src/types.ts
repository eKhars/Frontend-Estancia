// src/types.ts

export interface Product {
    id: string;
    titulo: string;
    precio: string | number;
    store?: string;
    marca?: string;
    envio?: string;
    calificacion?: number;
    imagen?: string;
    redireccion?: string;
    plataforma?: string;
    imagen_url?: string;
    url?: string;
  }
  
  export interface FilterState {
    priceRange: [number, number];
    selectedPlatforms: string[];
    selectedBrands: string[];
    freeShipping: boolean;
  }