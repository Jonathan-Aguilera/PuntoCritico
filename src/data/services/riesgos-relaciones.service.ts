import relacionesData from '../sources/riesgos_relaciones.json'

export interface Relacion {
  from: string
  to: string
  tipo: 'causa' | 'factor' | 'agrava'
}

export interface RelacionesData {
  version: string
  fuente: string
  relaciones: Relacion[]
}

export function getRelaciones(): Relacion[] {
  return (relacionesData as RelacionesData).relaciones
}