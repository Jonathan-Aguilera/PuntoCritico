import type { MitoRealidad } from '../../data/services/habitos.service'

interface MitoRealidadCardProps {
  item: MitoRealidad
}

export default function MitoRealidadCard({ item }: MitoRealidadCardProps) {
  return (
    <article className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-xl overflow-hidden shadow-md">
      {/* ── Mito ── */}
      <div className="bg-red-50 p-5 md:p-6 border-b-2 md:border-b-0 md:border-r-2 border-red-200">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-bold">
            ✕
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-red-700">
            Mito
          </span>
        </div>
        <p className="text-slate-800 font-medium leading-snug">{item.mito}</p>
      </div>

      {/* ── Realidad ── */}
      <div className="bg-emerald-50 p-5 md:p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-bold">
            ✓
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Realidad
          </span>
        </div>
        <p className="text-slate-800 leading-snug">{item.realidad}</p>
      </div>
    </article>
  )
}