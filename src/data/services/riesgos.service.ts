import riesgosData from '../sources/riesgos.json'

export interface Factor {
  id: string
  nombre: string
  prevalencia_nacional: number | null
  prevalencia_combinada_nacional?: number
  mortalidad_asociada: string
  descripcion: string
  dato_adicional?: string
  prevalencia_por_provincia: Record<string, number> | null
}

export interface RiesgosData {
  version: string
  fuente: string
  fuente_mortalidad: string
  anio_datos: number
  nota: string
  factores: Factor[]
}

export function getRiesgos(): RiesgosData {
  return riesgosData as RiesgosData
}

export function getFactores(): Factor[] {
  return (riesgosData as RiesgosData).factores
}