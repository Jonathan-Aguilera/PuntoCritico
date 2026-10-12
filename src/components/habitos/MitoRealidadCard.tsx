import { motion } from 'motion/react'
import type { MitoRealidad } from '../../data/services/habitos.service'

interface MitoRealidadCardProps {
  item: MitoRealidad
  index?: number
}

export default function MitoRealidadCard({
  item,
  index = 0,
}: MitoRealidadCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-xl overflow-hidden shadow-xl border border-white/10"
    >
      {/* ── Mito ── */}
      <div className="bg-red-500/10 backdrop-blur-md p-5 md:p-6 border-b-2 md:border-b-0 md:border-r-2 border-red-400/20">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold shadow-md">
            ✕
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-red-300">
            Mito
          </span>
        </div>
        <p className="text-slate-100 font-medium leading-snug">{item.mito}</p>
      </div>

      {/* ── Realidad ── */}
      <div className="bg-emerald-500/10 backdrop-blur-md p-5 md:p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold shadow-md">
            ✓
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
            Realidad
          </span>
        </div>
        <p className="text-slate-100 leading-snug">{item.realidad}</p>
      </div>
    </motion.article>
  )
}