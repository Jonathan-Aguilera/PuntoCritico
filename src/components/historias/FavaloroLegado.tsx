import { motion } from 'motion/react'
import type { FavaloroData } from '../../data/services/historias.service'

interface FavaloroLegadoProps {
  legado: FavaloroData['legado']
}

export default function FavaloroLegado({ legado }: FavaloroLegadoProps) {
  return (
    <section className="mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ── Impacto ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="bg-amber-500/10 backdrop-blur-md border border-amber-400/20 rounded-2xl p-6 md:p-8 border-l-4 border-l-amber-400 shadow-xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🌍</span>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-amber-300">
              Impacto mundial
            </h4>
          </div>
          <p className="text-slate-100 leading-relaxed text-sm md:text-base">
            {legado.impacto}
          </p>
        </motion.div>

        {/* ── Prevención ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="bg-purple-500/10 backdrop-blur-md border border-purple-400/20 rounded-2xl p-6 md:p-8 border-l-4 border-l-purple-400 shadow-xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">❤️</span>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-purple-300">
              Su mensaje
            </h4>
          </div>
          <p className="text-slate-100 leading-relaxed text-sm md:text-base">
            {legado.prevencion}
          </p>
        </motion.div>
      </div>
    </section>
  )
}