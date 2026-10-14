import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import CardShell from './CardShell'
import type { CardImpacto } from '../../data/services/impacto.service'

// Protagonista: rojo coral. Acentos: naranja y ámbar.
const COLOR_PRINCIPAL = '#FF6B6B'
const COLORES_DESGLOSE = ['#FF6B6B', '#FF9F45', '#FFC93C', '#FF8A8A', '#E85555']

interface Props {
  card: CardImpacto
  index?: number
}

export default function ImpactoSociocultural({ card, index = 0 }: Props) {
  const [activePieIndex, setActivePieIndex] = useState<number | null>(null)

  const datos = card.datos as {
    mortalidad_por_anio: Record<string, number>
    desglose_2022: Record<string, number>
    porcentaje_del_total: number
    nota: string
  }

  const totalMuertes = Object.values(datos.mortalidad_por_anio).reduce(
    (a, b) => a + b,
    0
  )

  const dataEvolucion = Object.entries(datos.mortalidad_por_anio).map(
    ([anio, valor]) => ({ anio, valor })
  )

  const dataDesglose = Object.entries(datos.desglose_2022).map(
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
      {/* Números grandes con tinte coral */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-[#FF6B6B]/10 border border-[#FF6B6B]/30 rounded-xl p-5 text-center">
          <p className="text-4xl md:text-5xl font-bold text-[#FF8A8A]">
            {totalMuertes.toLocaleString('es-AR')}
          </p>
          <p className="text-xs md:text-sm text-[#FFD0D0] mt-2">
            muertes acumuladas 2018-2022
          </p>
        </div>
        <div className="bg-[#FF9F45]/10 border border-[#FF9F45]/30 rounded-xl p-5 text-center">
          <p className="text-4xl md:text-5xl font-bold text-[#FFB56B]">
            {datos.porcentaje_del_total}%
          </p>
          <p className="text-xs md:text-sm text-[#FFD9B8] mt-2">
            del total de muertes en 2022
          </p>
        </div>
      </div>

      {/* Evolución: línea coral */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-[#A5F3EA] mb-3">
          Evolución anual de muertes cardiovasculares
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={dataEvolucion}
              margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 107, 107, 0.1)"
                vertical={false}
              />
              <XAxis
                dataKey="anio"
                tick={{ fontSize: 12, fill: '#FFD0D0' }}
                axisLine={{ stroke: 'rgba(255, 107, 107, 0.3)' }}
                tickLine={{ stroke: 'rgba(255, 107, 107, 0.3)' }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#FFD0D0' }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                axisLine={{ stroke: 'rgba(255, 107, 107, 0.3)' }}
                tickLine={{ stroke: 'rgba(255, 107, 107, 0.3)' }}
              />
              <Tooltip
                cursor={{ fill: 'rgba(255, 107, 107, 0.08)' }}
                formatter={(value) => [
                  Number(value ?? 0).toLocaleString('es-AR'),
                  'Muertes',
                ]}
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 107, 107, 0.3)',
                  background: 'rgba(60, 20, 20, 0.95)',
                  color: '#fff',
                  fontSize: '12px',
                }}
                labelStyle={{ color: '#FFD0D0' }}
              />
              <Line
                type="monotone"
                dataKey="valor"
                stroke={COLOR_PRINCIPAL}
                strokeWidth={3}
                dot={{ fill: COLOR_PRINCIPAL, r: 5 }}
                activeDot={{
                  r: 8,
                  fill: '#FFD0D0',
                  stroke: COLOR_PRINCIPAL,
                  strokeWidth: 2,
                }}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Desglose: dona con paleta coral */}
      <div>
        <h3 className="text-sm font-semibold text-[#A5F3EA] mb-3">
          Desglose por causa (2022)
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataDesglose}
                dataKey="valor"
                nameKey="nombre"
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={85}
                paddingAngle={2}
                animationDuration={900}
              >
                {dataDesglose.map((_, i) => (
                  <Cell
                    key={i}
                    fill={COLORES_DESGLOSE[i % COLORES_DESGLOSE.length]}
                    style={{
                      filter:
                        activePieIndex === i
                          ? 'brightness(1.3) drop-shadow(0 0 8px rgba(255,138,138,0.8))'
                          : 'none',
                      transition: 'filter 0.2s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => setActivePieIndex(i)}
                    onMouseLeave={() => setActivePieIndex(null)}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [
                  Number(value ?? 0).toLocaleString('es-AR'),
                  'Muertes',
                ]}
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 107, 107, 0.3)',
                  background: 'rgba(60, 20, 20, 0.95)',
                  color: '#fff',
                  fontSize: '12px',
                }}
                labelStyle={{ color: '#FFD0D0' }}
              />
              <Legend
                wrapperStyle={{ fontSize: '11px', color: '#FFD0D0' }}
                iconSize={10}
                layout="horizontal"
                verticalAlign="bottom"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <p className="text-xs text-[#A5F3EA]/60 italic mt-4">{datos.nota}</p>
    </CardShell>
  )
}