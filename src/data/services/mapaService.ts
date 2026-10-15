import type { MapaData, Provincia } from '../types/mapa'

let cached: MapaData | null = null
let inflight: Promise<MapaData> | null = null

export async function cargarMapaData(): Promise<MapaData> {
  if (cached) return cached
  if (inflight) return inflight
  inflight = fetch('/data/mapa.json')
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status} al cargar mapa.json`)
      return res.json() as Promise<MapaData>
    })
    .then((d) => { cached = d; return d })
    .finally(() => { inflight = null })
  return inflight
}

export function getMapaDataSync(): MapaData | null {
  return cached
}

export function calcularValor(
  provincia: Provincia,
  indicador: string,
  anio: number
): number | null {
  const dato = provincia.datos_por_anio[String(anio)]
  if (!dato) return null

  switch (indicador) {
    case 'Muertes absolutas':
      return dato.muertes_totales
    case 'Tasa por 100.000 hab.':
      if (!provincia.poblacion_2022) return null
      return (dato.muertes_totales / provincia.poblacion_2022) * 100_000
    case '% del total de muertes': {
      const total = dato.muertes_totales
      const cv = dato.muertes_cardiovasculares
      if (!total || !cv) return null
      return (cv / total) * 100
    }
    case 'Variación 2018–2022': {
      const a = provincia.datos_por_anio['2018']?.muertes_totales
      const b = provincia.datos_por_anio['2022']?.muertes_totales
      if (!a || !b) return null
      return ((b - a) / a) * 100
    }
    case 'Centros por 100.000 hab.':
      if (!provincia.poblacion_2022) return null
      return (provincia.centros_rehabilitacion / provincia.poblacion_2022) * 100_000
    case 'Cardiólogos por millón':
      if (!provincia.cardiologos || !provincia.poblacion_2022) return null
      return (provincia.cardiologos / provincia.poblacion_2022) * 1_000_000
    default:
      return null
  }
}

export function formatearValor(v: number | null, indicador: string): string {
  if (v == null || !isFinite(v)) return '—'
  switch (indicador) {
    case 'Muertes absolutas': return v.toLocaleString('es-AR')
    case 'Tasa por 100.000 hab.': return v.toFixed(1)
    case '% del total de muertes': return `${v.toFixed(1)}%`
    case 'Variación 2018–2022': return `${v >= 0 ? '+' : ''}${v.toFixed(1)}%`
    case 'Centros por 100.000 hab.': return v.toFixed(3)
    case 'Cardiólogos por millón': return v.toFixed(1)
    default: return String(v)
  }
}