import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { Factor } from '../../data/services/riesgos.service'

interface RiesgoCardProps {
  factor: Factor
  accentColor?: string
}

export default function RiesgoCard({
  factor,
  accentColor = '#dc2626',
}: RiesgoCardProps) {
  const { nombre, mortalidad_asociada, descripcion, prevalencia_por_provincia } =
    factor

  const chartData = prevalencia_por_provincia
    ? Object.entries(prevalencia_por_provincia).map(([provincia, valor]) => ({
        provincia,
        valor,
      }))
    : null

  return (
    <article className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-5">
      {/* ── Bloque 1: Información ── */}
      <div>
        <h3 className="text-2xl font-bold text-slate-900">{nombre}</h3>
        <p className="text-sm font-medium text-slate-600 mt-1">
          {mortalidad_asociada}
        </p>
        <p className="text-slate-700 mt-3 leading-relaxed">{descripcion}</p>
      </div>

      {/* ── Bloque 2: Gráfico de provincias ── */}
      {chartData && (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 8, left: -18, bottom: 55 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="provincia"
                angle={-55}
                textAnchor="end"
                interval={0}
                height={70}
                tick={{ fontSize: 10, fill: '#475569' }}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#475569' }}
                unit="%"
              />
              <Tooltip
                formatter={(value) => [`${value ?? 0}%`, 'Prevalencia']}
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '12px',
                }}
              />
              <Bar
                dataKey="valor"
                fill={accentColor}
                radius={[4, 4, 0, 0]}
                isAnimationActive
                animationDuration={800}
                animationEasing="ease-out"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </article>
  )
}