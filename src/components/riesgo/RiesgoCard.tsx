import { motion } from 'motion/react'
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
  index?: number
}

export default function RiesgoCard({
  factor,
  accentColor = '#7BA8D9',
  index = 0,
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
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-xl p-6 flex flex-col gap-5 w-full"
    >
      {/* ── Bloque 1: Información ── */}
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-[#7BA8D9] mb-1">
          {nombre}
        </h3>
        <p className="text-xs md:text-sm font-medium text-slate-300 mb-3">
          {mortalidad_asociada}
        </p>
        <p className="text-slate-200 leading-relaxed text-sm md:text-base">
          {descripcion}
        </p>
      </div>

      {/* ── Bloque 2: Gráfico de provincias ── */}
      {chartData && (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 8, left: -18, bottom: 55 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.08)"
                vertical={false}
              />
              <XAxis
                dataKey="provincia"
                angle={-55}
                textAnchor="end"
                interval={0}
                height={70}
                tick={{ fontSize: 10, fill: '#cbd5e1' }}
                axisLine={{ stroke: 'rgba(255, 255, 255, 0.15)' }}
                tickLine={{ stroke: 'rgba(255, 255, 255, 0.15)' }}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#cbd5e1' }}
                unit="%"
                axisLine={{ stroke: 'rgba(255, 255, 255, 0.15)' }}
                tickLine={{ stroke: 'rgba(255, 255, 255, 0.15)' }}
              />
              <Tooltip
                formatter={(value) => [`${value ?? 0}%`, 'Prevalencia']}
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  background: 'rgba(15, 10, 51, 0.95)',
                  color: '#fff',
                  fontSize: '12px',
                }}
                labelStyle={{ color: '#cbd5e1' }}
              />
              <Bar
                dataKey="valor"
                fill={accentColor}
                radius={[4, 4, 0, 0]}
                isAnimationActive
                animationDuration={600}
                animationEasing="ease-out"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.article>
  )
}