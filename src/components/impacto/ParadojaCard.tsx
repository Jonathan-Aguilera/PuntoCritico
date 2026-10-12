import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import CardShell from './CardShell'
import type { CardImpacto } from '../../data/services/impacto.service'

interface Props {
  card: CardImpacto
  index?: number
}

export default function ParadojaCard({ card, index = 0 }: Props) {
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
      index={index}
    >
      {/* Comparación 1:1 */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-red-500/10 border border-red-400/20 rounded-xl p-5 text-center">
          <p className="text-4xl md:text-5xl font-bold text-red-300">
            {datos.cardiologos_por_millon}
          </p>
          <p className="text-xs md:text-sm text-slate-300 mt-2">
            cardiólogos por millón (Argentina)
          </p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-xl p-5 text-center">
          <p className="text-4xl md:text-5xl font-bold text-emerald-300">
            {datos.cardiologos_optimo_oms}
          </p>
          <p className="text-xs md:text-sm text-slate-300 mt-2">
            recomendado por la OMS
          </p>
        </div>
      </div>

      {/* Concentración territorial */}
      <div className="bg-orange-500/10 border border-orange-400/20 rounded-xl p-5 text-center mb-8">
        <p className="text-4xl md:text-5xl font-bold text-orange-300">
          {datos.concentracion_caba_ba}%
        </p>
        <p className="text-xs md:text-sm text-slate-300 mt-2">
          de los {datos.centros_rehabilitacion_total} centros de rehabilitación
          están en CABA y Buenos Aires
        </p>
      </div>

      {/* Distribución por región */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3">
          Centros de rehabilitación cardiovascular por región
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dataRegiones}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.08)"
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: '#cbd5e1' }}
                axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
                tickLine={{ stroke: 'rgba(255,255,255,0.15)' }}
              />
              <YAxis
                type="category"
                dataKey="region"
                tick={{ fontSize: 11, fill: '#cbd5e1' }}
                width={130}
                axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
                tickLine={{ stroke: 'rgba(255,255,255,0.15)' }}
              />
              <Tooltip
                formatter={(value) => [
                  Number(
                    Array.isArray(value) ? value[0] ?? 0 : value ?? 0
                  ),
                  'Centros',
                ]}
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(15, 10, 51, 0.95)',
                  color: '#fff',
                  fontSize: '12px',
                }}
                labelStyle={{ color: '#cbd5e1' }}
              />
              <Bar
                dataKey="valor"
                radius={[0, 6, 6, 0]}
                animationDuration={900}
              >
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

      <p className="text-xs text-slate-400 italic mt-4">{datos.nota}</p>
    </CardShell>
  )
}