import accesoData from '../sources/acceso.json'
import img1920 from '../../assets/1920-almanaque.jpg'
import img1940 from '../../assets/1940-radio.jpg'
import img1960 from '../../assets/1960-television.jpg'
import img2000 from '../../assets/2000-internet-cafe.jpg'
import img2020 from '../../assets/2020-smartphone.jpg'

export interface ImagenData {
  archivo: string
  titulo: string
  autor: string
  fecha: string
  fuente: string
  credito: string
  resolucion: string
  formato: string
}

export interface LineaTiempoItem {
  id: string
  anio: string
  titulo: string
  imagen: ImagenData
  dato: string
  contexto: string
}

export interface AccesoData {
  version: string
  fuente_imagenes: string
  fuente_datos: string
  intro: string
  linea_tiempo: LineaTiempoItem[]
  cierre: {
    frase: string
    subtexto: string
  }
}

// Mapa id → asset importado (Vite lo resuelve a una URL final)
export const imagenPorId: Record<string, string> = {
  '1920': img1920,
  '1940': img1940,
  '1960': img1960,
  '2000': img2000,
  'hoy': img2020,
}

export function getAcceso(): AccesoData {
  return accesoData as AccesoData
}