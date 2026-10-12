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

const COLORES_DESGLOSE = ['#dc2626', '#ea580c', '#d97706', '#ca8a04', '#a16207']

interface Props {
  card: CardImpacto
  index?: number
}

export default function ImpactoSociocultural({ card, index = 0 }: Props) {
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
      {/* Números grandes destacados */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-orange-500/10 border border-orange-400/20 rounded-xl p-5 text-center">
          <p className="text-4xl md:text-5xl font-bold text-orange-300">
            {totalMuertes.toLocaleString('es-AR')}
          </p>
          <p className="text-xs md:text-sm text-slate-300 mt-2">
            muertes acumuladas 2018-2022
          </p>
        </div>
        <div className="bg-red-500/10 border border-red-400/20 rounded-xl p-5 text-center">
          <p className="text-4xl md:text-5xl font-bold text-red-300">
            {datos.porcentaje_del_total}%
          </p>
          <p className="text-xs md:text-sm text-slate-300 mt-2">
            del total de muertes en 2022
          </p>
        </div>
      </div>

      {/* Gráfico de evolución */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">
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
                stroke="rgba(255,255,255,0.08)"
                vertical={false}
              />
              <XAxis
                dataKey="anio"
                tick={{ fontSize: 12, fill: '#cbd5e1' }}
                axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
                tickLine={{ stroke: 'rgba(255,255,255,0.15)' }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#cbd5e1' }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
                tickLine={{ stroke: 'rgba(255,255,255,0.15)' }}
              />
              <Tooltip
                formatter={(value) => [
                  Number(value ?? 0).toLocaleString('es-AR'),
                  'Muertes',
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
              <Line
                type="monotone"
                dataKey="valor"
                stroke="#dc2626"
                strokeWidth={3}
                dot={{ fill: '#dc2626', r: 5 }}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Desglose 2022 */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3">
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
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(15, 10, 51, 0.95)',
                  color: '#fff',
                  fontSize: '12px',
                }}
                labelStyle={{ color: '#cbd5e1' }}
              />
              <Legend
                wrapperStyle={{ fontSize: '11px', color: '#cbd5e1' }}
                iconSize={10}
                layout="horizontal"
                verticalAlign="bottom"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <p className="text-xs text-slate-400 italic mt-4">{datos.nota}</p>
    </CardShell>
  )
}