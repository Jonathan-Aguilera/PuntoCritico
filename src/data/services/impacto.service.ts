import impactoData from '../sources/impacto.json'

export interface CardImpacto {
  id: string
  titulo: string
  subtitulo: string
  tipo: 'grafico_evolucion' | 'comparacion' | 'numero_porcentaje'
  descripcion: string
  datos: Record<string, unknown>
}

export interface ImpactoData {
  version: string
  fuente_mortalidad: string
  fuente_gasto: string
  fuente_recursos: string
  fuente_confianza: string
  anio_datos: string
  cards: CardImpacto[]
}

export function getImpacto(): ImpactoData {
  return impactoData as ImpactoData
}

export function getCardsImpacto(): CardImpacto[] {
  return (impactoData as ImpactoData).cards
}