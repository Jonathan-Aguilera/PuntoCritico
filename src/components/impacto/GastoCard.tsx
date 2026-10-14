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

// Protagonista: ámbar. Acentos: naranja y amarillo.
const COLOR_PRINCIPAL = '#FFC93C'
const COLORES_COMPOSICION = ['#FFC93C', '#FF9F45', '#FFB84D']

interface Props {
  card: CardImpacto
  index?: number
}

export default function GastoCard({ card, index = 0 }: Props) {
  const datos = card.datos as {
    gasto_como_pbi: Record<string, number>
    composicion_2022: Record<string, number>
    gasto_bolsillo_hogares: number
    nota: string
  }

  const dataPbi = Object.entries(datos.gasto_como_pbi).map(([anio, valor]) => ({
    anio,
    valor,
  }))

  const dataComposicion = Object.entries(datos.composicion_2022).map(
    ([nombre, valor]) => ({
      nombre: nombre.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase()),
      valor,
    })
  )

  return (
    <CardShell
      titulo={card.titulo}
      subtitulo={card.subtitulo}
      descripcion={card.descripcion}
      index={index}
    >
      {/* Número destacado con tinte ámbar */}
      <div className="bg-[#FFC93C]/10 border border-[#FFC93C]/30 rounded-xl p-5 text-center mb-8">
        <p className="text-4xl md:text-5xl font-bold text-[#FFD766]">
          {datos.gasto_bolsillo_hogares}%
        </p>
        <p className="text-xs md:text-sm text-[#FFE9A8] mt-2">
          del gasto en salud de los hogares es de bolsillo
        </p>
      </div>

      {/* Evolución: barras ámbar */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-[#A5F3EA] mb-3">
          Gasto en salud como % del PBI
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dataPbi}
              margin={{ top: 10, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 201, 60, 0.1)"
                vertical={false}
              />
              <XAxis
                dataKey="anio"
                tick={{ fontSize: 12, fill: '#FFE9A8' }}
                axisLine={{ stroke: 'rgba(255, 201, 60, 0.3)' }}
                tickLine={{ stroke: 'rgba(255, 201, 60, 0.3)' }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#FFE9A8' }}
                unit="%"
                domain={[0, 12]}
                axisLine={{ stroke: 'rgba(255, 201, 60, 0.3)' }}
                tickLine={{ stroke: 'rgba(255, 201, 60, 0.3)' }}
              />
              <Tooltip
                cursor={{ fill: 'rgba(255, 201, 60, 0.08)' }}
                formatter={(value) => [`${value ?? 0}%`, '% del PBI']}
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 201, 60, 0.3)',
                  background: 'rgba(60, 45, 5, 0.95)',
                  color: '#fff',
                  fontSize: '12px',
                }}
                labelStyle={{ color: '#FFE9A8' }}
              />
              <Bar
                dataKey="valor"
                radius={[6, 6, 0, 0]}
                animationDuration={900}
                activeBar={{
                  fill: '#FFF3C4',
                  stroke: '#FFC93C',
                  strokeWidth: 1,
                  style: {
                    filter: 'drop-shadow(0 0 8px rgba(255, 201, 60, 0.8))',
                  },
                }}
              >
                {dataPbi.map((_, i) => (
                  <Cell key={i} fill={COLOR_PRINCIPAL} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Composición 2022: barras horizontales con paleta ámbar */}
      <div>
        <h3 className="text-sm font-semibold text-[#A5F3EA] mb-3">
          Composición del gasto (2022)
        </h3>
        <div className="space-y-3">
          {dataComposicion.map((item, i) => (
            <div key={item.nombre}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#A5F3EA] font-medium">
                  {item.nombre}
                </span>
                <span className="text-[#FFD766] font-bold">{item.valor}%</span>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${item.valor}%`,
                    backgroundColor:
                      COLORES_COMPOSICION[i % COLORES_COMPOSICION.length],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-[#A5F3EA]/60 italic mt-4">{datos.nota}</p>
    </CardShell>
  )
}