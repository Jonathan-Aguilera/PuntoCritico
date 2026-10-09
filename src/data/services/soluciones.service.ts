import solucionesData from '../sources/soluciones.json'

export interface Consejo {
  id: string
  texto: string
  evidencia: string
  fuente: string
}

export interface Categoria {
  id: string
  titulo: string
  icono: string
  consejos: Consejo[]
}

export interface SolucionesData {
  version: string
  fuente_principal: string
  intro: string
  categorias: Categoria[]
  cierre: {
    frase: string
    subtexto: string
  }
}

export function getSoluciones(): SolucionesData {
  return solucionesData as SolucionesData
}