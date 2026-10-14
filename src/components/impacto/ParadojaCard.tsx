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

// Protagonista: verde menta. Acentos: verde lima y turquesa.
const COLOR_PRINCIPAL = '#5DD9A8'
const COLOR_SECUNDARIO = '#A8E063'

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
      {/* Comparación 1:1 con tintes verde lima y verde menta */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
        <div className="bg-[#A8E063]/10 border border-[#A8E063]/30 rounded-xl p-3 sm:p-5 text-center min-w-0">
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#B8E878] leading-tight break-words">
            {datos.cardiologos_por_millon}
          </p>
          <p className="text-[11px] sm:text-xs md:text-sm text-[#D4EFB0] mt-2 leading-tight">
            cardiólogos por millón (Argentina)
          </p>
        </div>
        <div className="bg-[#5DD9A8]/10 border border-[#5DD9A8]/30 rounded-xl p-3 sm:p-5 text-center min-w-0">
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#7FE4BD] leading-tight break-words">
            {datos.cardiologos_optimo_oms}
          </p>
          <p className="text-[11px] sm:text-xs md:text-sm text-[#B0EED6] mt-2 leading-tight">
            recomendado por la OMS
          </p>
        </div>
      </div>

      {/* Concentración territorial con tinte verde menta */}
      <div className="bg-[#5DD9A8]/10 border border-[#5DD9A8]/30 rounded-xl p-3 sm:p-5 text-center mb-8">
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#7FE4BD] leading-tight break-words">
          {datos.concentracion_caba_ba}%
        </p>
        <p className="text-[11px] sm:text-xs md:text-sm text-[#B0EED6] mt-2 leading-tight">
          de los {datos.centros_rehabilitacion_total} centros de rehabilitación
          están en CABA y Buenos Aires
        </p>
      </div>

      {/* Distribución por región: barras horizontales, desplazadas a la izquierda */}
      <div>
        <h3 className="text-sm font-semibold text-[#A5F3EA] mb-3">
          Centros de rehabilitación cardiovascular por región
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dataRegiones}
              layout="vertical"
              margin={{ top: 10, right: 15, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(93, 217, 168, 0.1)"
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: '#B0EED6' }}
                axisLine={{ stroke: 'rgba(93, 217, 168, 0.3)' }}
                tickLine={{ stroke: 'rgba(93, 217, 168, 0.3)' }}
              />
              <YAxis
                type="category"
                dataKey="region"
                tick={{ fontSize: 11, fill: '#B0EED6' }}
                width={95}
                axisLine={{ stroke: 'rgba(93, 217, 168, 0.3)' }}
                tickLine={{ stroke: 'rgba(93, 217, 168, 0.3)' }}
              />
              <Tooltip
                cursor={{ fill: 'rgba(93, 217, 168, 0.08)' }}
                formatter={(value) => [
                  Number(
                    Array.isArray(value) ? value[0] ?? 0 : value ?? 0
                  ),
                  'Centros',
                ]}
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid rgba(93, 217, 168, 0.3)',
                  background: 'rgba(10, 60, 45, 0.95)',
                  color: '#fff',
                  fontSize: '12px',
                }}
                labelStyle={{ color: '#B0EED6' }}
              />
              <Bar
                dataKey="valor"
                radius={[0, 6, 6, 0]}
                animationDuration={900}
                activeBar={{
                  fill: '#FFFFFF',
                  stroke: '#5DD9A8',
                  strokeWidth: 1,
                  style: {
                    filter: 'drop-shadow(0 0 8px rgba(93, 217, 168, 0.9))',
                  },
                }}
              >
                {dataRegiones.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={
                      entry.valor === maxValor
                        ? COLOR_PRINCIPAL
                        : COLOR_SECUNDARIO
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <p className="text-xs text-[#A5F3EA]/60 italic mt-4">{datos.nota}</p>
    </CardShell>
  )
}