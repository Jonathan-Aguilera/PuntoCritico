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
      whileHover={{ scale: 1.005 }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group bg-white/5 backdrop-blur-md border border-[#4ECDC4]/20 rounded-xl shadow-xl p-6 flex flex-col gap-5 w-full
             transition-[border-color,box-shadow] duration-300
             hover:border-[#4ECDC4]/50 hover:shadow-[0_0_30px_rgba(78,205,196,0.15)]"
    >
      {(() => {
        // ── Mapa de colores variados SOLO para los gráficos (por factor) ──
        const COLORES_GRAFICO: Record<string, string> = {
          hipertension: '#FF6B6B', // rojo coral
          colesterol: '#FF9F45', // naranja
          obesidad: '#FFC93C', // ámbar
          tabaquismo: '#A8E063', // verde lima
          sedentarismo: '#4ECDC4', // verde azulado
          diabetes: '#7BA8D9', // azul claro
          alimentacion: '#C4A3FF', // lavanda
          alcohol: '#F49AC1', // rosa
          estres: '#56C5D0', // turquesa
          no_modificables: '#94A3B8', // gris azulado
        }
        const colorGrafico = COLORES_GRAFICO[factor.id] ?? '#4ECDC4'

        return (
          <>
            {/* ── Bloque 1: Información (títulos y textos en cian/turquesa) ── */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#4ECDC4] mb-1">
                {nombre}
              </h3>
              <p className="text-xs md:text-sm font-medium text-[#A5F3EA]/80 mb-3">
                {mortalidad_asociada}
              </p>
              <p className="text-[#A5F3EA] leading-relaxed text-sm md:text-base">
                {descripcion}
              </p>
            </div>

            {/* ── Bloque 2: Gráfico con color variado por factor ── */}
            {chartData && (
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 8, left: -18, bottom: 55 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(78, 205, 196, 0.08)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="provincia"
                      angle={-55}
                      textAnchor="end"
                      interval={0}
                      height={75}
                      tick={{ fontSize: 11, fill: '#a5f3ea' }}
                      axisLine={{ stroke: 'rgba(78, 205, 196, 0.25)' }}
                      tickLine={{ stroke: 'rgba(78, 205, 196, 0.25)' }}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: '#a5f3ea' }}
                      unit="%"
                      axisLine={{ stroke: 'rgba(78, 205, 196, 0.25)' }}
                      tickLine={{ stroke: 'rgba(78, 205, 196, 0.25)' }}
                    />
                    <Tooltip
                      cursor={{ fill: 'rgba(78, 205, 196, 0.08)' }}
                      formatter={(value) => [`${value ?? 0}%`, 'Prevalencia']}
                      contentStyle={{
                        borderRadius: '8px',
                        border: '1px solid rgba(78, 205, 196, 0.3)',
                        background: 'rgba(10, 60, 60, 0.95)',
                        color: '#fff',
                        fontSize: '12px',
                      }}
                      labelStyle={{ color: '#a5f3ea' }}
                    />
                    <Bar
                      dataKey="valor"
                      fill={colorGrafico}
                      radius={[4, 4, 0, 0]}
                      isAnimationActive
                      animationDuration={600}
                      animationEasing="ease-out"
                      activeBar={{
                        fill: '#FFFFFF',
                        stroke: colorGrafico,
                        strokeWidth: 1,
                        style: {
                          filter: `drop-shadow(0 0 8px ${colorGrafico})`,
                        },
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        )
      })()}
    </motion.article>
  )
}