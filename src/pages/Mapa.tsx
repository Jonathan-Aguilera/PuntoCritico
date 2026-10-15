import { useCallback, useEffect, useMemo, useState } from 'react'
import PanelControl, { type FiltrosMapa, type OpcionesPanel } from '../components/mapa/PanelControl'
import Mapa3D from '../components/mapa/Mapa3D'
import TutorialMapa from '../components/mapa/TutorialMapa'
import CardExplicativa, { type CardContenido } from '../components/mapa/CardExplicativa'
import { cargarMapaData, getMapaDataSync, indicadoresSinDatos } from '../data/services/mapaService'
import type { MapaData } from '../data/types/mapa'

const FILTROS_INICIALES: FiltrosMapa = {
  provincias: [],
  region: 'Todas',
  modoAnio: 'unico',
  anios: [2022],
  comparar: false,
  enfermedad: 'Todas',
  indicador: 'Muertes absolutas',
  viz: 'calor',
}

export default function Mapa() {
  const [data, setData] = useState<MapaData | null>(() => getMapaDataSync())
  const [filtros, setFiltros] = useState<FiltrosMapa>(FILTROS_INICIALES)
  const [card, setCard] = useState<CardContenido | null>(null)

  useEffect(() => {
    if (data) return
    cargarMapaData().then(setData).catch((e) => console.error('[Mapa]', e))
  }, [data])

  const abrirCard = useCallback((titulo: string, texto: string) => {
    setCard({ titulo, texto })
  }, [])

  const opciones = useMemo<OpcionesPanel | null>(() => {
    if (!data) return null
    return {
      provincias: data.provincias.map((p) => p.nombre).sort((a, b) => a.localeCompare(b, 'es')),
      regiones: ['Todas', ...data.regiones],
      anios: data.anios,
      enfermedades: data.enfermedades_disponibles,
      indicadores: data.indicadores_disponibles,
      indicadoresSinDatos: indicadoresSinDatos(data),
    }
  }, [data])

  return (
    <>
      {opciones && (
        <PanelControl
          opciones={opciones}
          filtros={filtros}
          onChange={setFiltros}
          onAbrirCard={abrirCard}
          data={data!}
        />
      )}

      <div className="absolute inset-0 z-0" style={{ backgroundColor: '#9DBCCF' }}>
        {data ? (
          <Mapa3D filtros={filtros} data={data} />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-100/80">
            Cargando datos del mapa…
          </div>
        )}
      </div>

      <TutorialMapa />
      <CardExplicativa card={card} onClose={() => setCard(null)} />
    </>
  )
}