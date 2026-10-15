export interface DatoAnual {
  muertes_totales: number
  muertes_cardiovasculares: number | null
  tasa_cardiovascular_100k: number | null
  tasa_ajustada_edad_100k: number | null
  gasto_salud_percapita: number | null
}

export interface FactoresRiesgo {
  hipertension: number
  colesterol: number
  obesidad: number
  tabaquismo: number
  sedentarismo: number
  diabetes: number
}

export interface Provincia {
  id: string
  nombre: string
  region: string
  poblacion_2022: number
  datos_por_anio: Record<string, DatoAnual>
  centros_rehabilitacion: number
  cardiologos: number | null
  factores_riesgo: FactoresRiesgo
}

export interface NacionalData {
  poblacion_2022: number
  muertes_totales_por_anio: Record<string, number>
  muertes_cardiovasculares_2022: number
  porcentaje_cv_del_total_2022: number
  desglose_cv_2022: Record<string, number>
  cardiologos_total: number
  cardiologos_por_millon: number
  cardiologos_optimo_oms_por_millon: number
  concentracion_caba_ba_porcentaje: number
  centros_rehabilitacion_total: number
}

export interface FuenteInfo {
  nombre: string
  url: string
  nota: string
}

export interface MapaData {
  version: string
  fecha_actualizacion: string
  fuente_principal: string
  anios: number[]
  regiones: string[]
  enfermedades_disponibles: string[]
  indicadores_disponibles: string[]
  nacional: NacionalData
  provincias: Provincia[]
  notas?: Record<string, string>
  fuentes: Record<string, FuenteInfo>
}