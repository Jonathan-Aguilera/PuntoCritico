import favaloroData from '../sources/historias/favaloro.json'
import testimoniosData from '../sources/historias/testimonios.json'

export interface FavaloroData {
  version: string
  fuente_principal: string
  nombre_completo: string
  nacimiento: string
  fallecimiento: string
  profesion: string
  hito_principal: string
  imagen_retrato: {
    archivo: string
    titulo: string
    descripcion: string
    autor: string
    fecha: string
    fuente: string
    credito: string
    licencia: string
    url: string
  }
  imagen_hito: {
    archivo: string
    titulo: string
    descripcion: string
    autor: string
    fecha: string
    fuente: string
    credito: string
    licencia: string
    url: string
  }
  biografia_resumida: { etapa: string; texto: string }[]
  legado: { impacto: string; prevencion: string }
}

export interface Testimonio {
  id: string
  nombre: string
  edad: number
  titulo: string
  fragmento: string
  recomendacion: string
  tema: string
}

export interface TestimoniosData {
  version: string
  fuente: string
  fuente_url: string
  nota: string
  testimonios: Testimonio[]
}

export function getFavaloro(): FavaloroData {
  return favaloroData as FavaloroData
}

export function getTestimonios(): Testimonio[] {
  return (testimoniosData as TestimoniosData).testimonios
}