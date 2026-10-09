import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts'
import CardShell from './CardShell'
import type { CardImpacto } from '../../data/services/impacto.service'

export default function ParadojaCard({ card }: { card: CardImpacto }) {
  const datos = card.datos as {
    cardiologos_por_millon: number
    cardiologos_optimo_oms: number
    centros_rehabilitacion_total: number
    concentracion_caba_ba: number
    centros_por_region: Record<string, number>
    pacientes_promedio_por_centro: number
    nota: string
  }

  const dataRegiones = Object.entries(datos.centros_por_region)
    .map(([region, valor]) => ({ region, valor }))
    .sort((a, b) => b.valor - a.valor)

  const maxValor = Math.max(...dataRegiones.map((d) => d.valor))

  return (
    <CardShell
      titulo={card.titulo}
      subtitulo={card.subtitulo}
      descripcion={card.descripcion}
    >
      {/* Comparación 1:1 */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-red-50 rounded-xl p-5 text-center">
          <p className="text-4xl md:text-5xl font-bold text-red-700">
            {datos.cardiologos_por_millon}
          </p>
          <p className="text-xs md:text-sm text-slate-600 mt-2">
            cardiólogos por millón (Argentina)
          </p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-5 text-center">
          <p className="text-4xl md:text-5xl font-bold text-emerald-700">
            {datos.cardiologos_optimo_oms}
          </p>
          <p className="text-xs md:text-sm text-slate-600 mt-2">
            recomendado por la OMS
          </p>
        </div>
      </div>

      {/* Concentración territorial */}
      <div className="bg-orange-50 rounded-xl p-5 text-center mb-8">
        <p className="text-4xl md:text-5xl font-bold text-orange-700">
          {datos.concentracion_caba_ba}%
        </p>
        <p className="text-xs md:text-sm text-slate-600 mt-2">
          de los {datos.centros_rehabilitacion_total} centros de rehabilitación
          están en CABA y Buenos Aires
        </p>
      </div>

      {/* Distribución por región */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">
          Centros de rehabilitación cardiovascular por región
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dataRegiones}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#475569' }} />
              <YAxis
                type="category"
                dataKey="region"
                tick={{ fontSize: 11, fill: '#475569' }}
                width={130}
              />
              <Tooltip
                formatter={(value) => [Number(Array.isArray(value) ? value[0] ?? 0 : value ?? 0), 'Centros']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Bar dataKey="valor" radius={[0, 6, 6, 0]} animationDuration={900}>
                {dataRegiones.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.valor === maxValor ? '#ea580c' : '#fdba74'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <p className="text-xs text-slate-500 italic mt-4">{datos.nota}</p>
    </CardShell>
  )
}