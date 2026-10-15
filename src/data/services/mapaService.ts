import type { MapaData, Provincia } from '../types/mapa'
import mapaJson from '../sources/mapa.json'

// El JSON vive en src/data/sources (igual que el resto de los servicios) y
// se incluye en el bundle. Antes se pedía a /data/mapa.json, que no existe en
// public/: Vite devolvía index.html y res.json() fallaba con "Unexpected token '<'".

export const INDICADORES_MAPA = [
  'Muertes absolutas',
  'Tasa por 100.000 hab.',
  '% del total de muertes',
  'Variación 2018–2022',
  'Centros por 100.000 hab.',
  'Cardiólogos por millón',
]

/** Indicadores que dependen del año elegido (el resto es fijo). */
const INDICADORES_ANUALES = new Set([
  'Muertes absolutas',
  'Tasa por 100.000 hab.',
  '% del total de muertes',
])

export const esIndicadorAnual = (indicador: string) => INDICADORES_ANUALES.has(indicador)

/**
 * El GeoJSON y mapa.json nombran distinto a dos provincias. Se unifica al
 * nombre de mapa.json, que es el que usa el panel de control.
 */
const ALIAS_GEOJSON: Record<string, string> = {
  'Buenos Aires': 'Provincia de Buenos Aires',
  'Tierra del Fuego, Antártida e Islas del Atlántico Sur': 'Tierra del Fuego',
}

export const nombreCanonico = (nombreGeoJSON: string): string =>
  ALIAS_GEOJSON[nombreGeoJSON] ?? nombreGeoJSON

let cached: MapaData | null = null

/**
 * mapa.json no trae las listas de opciones del panel (regiones, enfermedades,
 * indicadores), así que se derivan acá si faltan.
 */
function normalizar(raw: Partial<MapaData>): MapaData {
  const provincias = raw.provincias ?? []
  return {
    ...(raw as MapaData),
    provincias,
    regiones: raw.regiones ?? [...new Set(provincias.map((p) => p.region))],
    enfermedades_disponibles: raw.enfermedades_disponibles ?? ['Todas'],
    indicadores_disponibles: raw.indicadores_disponibles ?? INDICADORES_MAPA,
  }
}

export async function cargarMapaData(): Promise<MapaData> {
  if (!cached) cached = normalizar(mapaJson as unknown as Partial<MapaData>)
  return cached
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
      if (!total || cv == null) return null
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

/**
 * Valor para uno o varios años. Con varios años (modo "Rango") devuelve el
 * promedio anual de los años que tienen dato. Los indicadores que no dependen
 * del año se calculan una sola vez.
 */
export function calcularValorAnios(
  provincia: Provincia,
  indicador: string,
  anios: number[]
): number | null {
  if (!INDICADORES_ANUALES.has(indicador)) {
    return calcularValor(provincia, indicador, anios[0] ?? 2022)
  }
  const vs = anios
    .map((a) => calcularValor(provincia, indicador, a))
    .filter((v): v is number => v != null && isFinite(v))
  if (vs.length === 0) return null
  return vs.reduce((s, v) => s + v, 0) / vs.length
}

/** Indicadores para los que el dataset no tiene ningún valor en ninguna provincia. */
export function indicadoresSinDatos(data: MapaData): string[] {
  return data.indicadores_disponibles.filter(
    (ind) => !data.provincias.some((p) => data.anios.some((a) => calcularValor(p, ind, a) != null))
  )
}

export function formatearValor(v: number | null, indicador: string): string {
  if (v == null || !isFinite(v)) return '—'
  switch (indicador) {
    case 'Muertes absolutas': return Math.round(v).toLocaleString('es-AR')
    case 'Tasa por 100.000 hab.': return v.toFixed(1)
    case '% del total de muertes': return `${v.toFixed(1)}%`
    case 'Variación 2018–2022': return `${v >= 0 ? '+' : ''}${v.toFixed(1)}%`
    case 'Centros por 100.000 hab.': return v.toFixed(3)
    case 'Cardiólogos por millón': return v.toFixed(1)
    default: return String(v)
  }
}