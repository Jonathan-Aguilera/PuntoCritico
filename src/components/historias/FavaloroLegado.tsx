import type { FavaloroData } from '../../data/services/historias.service'

interface FavaloroLegadoProps {
  legado: FavaloroData['legado']
}

export default function FavaloroLegado({ legado }: FavaloroLegadoProps) {
  return (
    <section className="mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ── Impacto ── */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 md:p-8 border-l-4 border-amber-500 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🌍</span>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-amber-800">
              Impacto mundial
            </h4>
          </div>
          <p className="text-slate-800 leading-relaxed text-sm md:text-base">
            {legado.impacto}
          </p>
        </div>

        {/* ── Prevención ── */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 md:p-8 border-l-4 border-purple-500 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">❤️</span>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-purple-800">
              Su mensaje
            </h4>
          </div>
          <p className="text-slate-800 leading-relaxed text-sm md:text-base">
            {legado.prevencion}
          </p>
        </div>
      </div>
    </section>
  )
}