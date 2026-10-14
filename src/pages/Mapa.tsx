import { useCallback, useState } from 'react'
import PanelControl, {
  type FiltrosMapa,
  type OpcionesPanel,
} from '../components/mapa/PanelControl'
import Mapa3D from '../components/mapa/Mapa3D'
import TutorialMapa from '../components/mapa/TutorialMapa'

/* ═══════════════════════════════════════════════════════════
   OPCIONES DEL PANEL
   ═══════════════════════════════════════════════════════════ */

const OPCIONES_BASE: Omit<OpcionesPanel, 'provincias'> = {
  regiones: ['Todas', 'AMBA', 'Centro', 'Cuyo', 'NOA', 'NEA', 'Patagonia'],
  anios: [2018, 2019, 2020, 2021, 2022],
  enfermedades: [
    'Todas',
    'Cardiopatía isquémica',
    'Enfermedad cerebrovascular',
    'Insuficiencia cardíaca',
    'Enfermedad hipertensiva',
    'Arritmias',
    'Enfermedad valvular',
  ],
  indicadores: [
    'Muertes absolutas',
    'Tasa por 100.000 hab.',
    '% del total de muertes',
    'Variación 2018–2022',
    'Centros por 100.000 hab.',
    'Cardiólogos por millón',
  ],
}

const FILTROS_INICIALES: FiltrosMapa = {
  provincias: [],
  region: 'Todas',
  modoAnio: 'unico',
  anios: [2022],
  comparar: false,
  enfermedad: 'Todas',
  indicador: 'Muertes absolutas',
  viz: 'barras',
}

/* ═══════════════════════════════════════════════════════════
   VISTA MAPA
   ═══════════════════════════════════════════════════════════ */

export default function Mapa() {
  const [filtros, setFiltros] = useState<FiltrosMapa>(FILTROS_INICIALES)
  const [provinciasCargadas, setProvinciasCargadas] = useState<string[]>([])

  const handleProvinciasCargadas = useCallback((nombres: string[]) => {
    setProvinciasCargadas(nombres)
  }, [])

  const opciones: OpcionesPanel = {
    ...OPCIONES_BASE,
    provincias: provinciasCargadas,
  }

  return (
    <>
      {/* Panel de control — anclado al viewport, sobre todo lo demás */}
      <PanelControl
        opciones={opciones}
        filtros={filtros}
        onChange={setFiltros}
      />

      {/* Contenedor del mapa: cubre TODO el main del MapLayout.
          El fondo azul profundo solo aparece acá adentro, dejando
          los bordes del HUD con el gradiente violeta global. */}
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: '#9DBCCF' }}
      >
        <Mapa3D
          filtros={filtros}
          onProvinciasCargadas={handleProvinciasCargadas}
        />
      </div>

      <TutorialMapa />
    </>
  )
}