import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts'
import CardShell from './CardShell'
import type { CardImpacto } from '../../data/services/impacto.service'

export default function GastoCard({ card }: { card: CardImpacto }) {
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

  const COLORES_COMPOSICION = ['#0891b2', '#0e7490', '#155e75']

  return (
    <CardShell
      titulo={card.titulo}
      subtitulo={card.subtitulo}
      descripcion={card.descripcion}
    >
      {/* Número destacado */}
      <div className="bg-cyan-50 rounded-xl p-5 text-center mb-8">
        <p className="text-4xl md:text-5xl font-bold text-cyan-700">
          {datos.gasto_bolsillo_hogares}%
        </p>
        <p className="text-xs md:text-sm text-slate-600 mt-2">
          del gasto en salud de los hogares es de bolsillo
        </p>
      </div>

      {/* Evolución del gasto como % del PBI */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">
          Gasto en salud como % del PBI
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataPbi} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="anio" tick={{ fontSize: 12, fill: '#475569' }} />
              <YAxis
                tick={{ fontSize: 11, fill: '#475569' }}
                unit="%"
                domain={[0, 12]}
              />
              <Tooltip
                formatter={(value) => [`${value ?? 0}%`, '% del PBI']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Bar dataKey="valor" radius={[6, 6, 0, 0]} animationDuration={900}>
                {dataPbi.map((_, i) => (
                  <Cell key={i} fill="#0891b2" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Composición 2022 */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">
          Composición del gasto (2022)
        </h3>
        <div className="space-y-3">
          {dataComposicion.map((item, i) => (
            <div key={item.nombre}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-700 font-medium">{item.nombre}</span>
                <span className="text-slate-900 font-bold">{item.valor}%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${item.valor}%`,
                    backgroundColor: COLORES_COMPOSICION[i % COLORES_COMPOSICION.length],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-500 italic mt-4">{datos.nota}</p>
    </CardShell>
  )
}