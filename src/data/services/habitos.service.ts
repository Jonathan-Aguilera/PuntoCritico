import habitosData from '../sources/habitos.json'
import preguntasData from '../sources/habitos_preguntas.json'

export interface MitoRealidad {
  id: string
  mito: string
  realidad: string
}

export interface Pregunta {
  id: string
  pregunta: string
  opciones: string[]
  correcta: number
  explicacion: string
}

export interface HabitosData {
  version: string
  fuente_principal: string
  mitos_y_realidades: MitoRealidad[]
}

export function getMitosRealidades(): MitoRealidad[] {
  return (habitosData as HabitosData).mitos_y_realidades
}

export function getPreguntas(): Pregunta[] {
  return (preguntasData as { preguntas: Pregunta[] }).preguntas
}

/** Mezcla un array con Fisher-Yates (no muta el original). */
export function shuffle<T>(array: T[]): T[] {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}