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
          className="bg-[#FFC93C]/8 backdrop-blur-md border border-[#FFC93C]/20 rounded-2xl p-6 md:p-8 border-l-4 border-l-[#FFC93C] shadow-xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🌍</span>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#FFD766]">
              Impacto mundial
            </h4>
          </div>
          <p className="text-[#A5F3EA] leading-relaxed text-sm md:text-base">
            {legado.impacto}
          </p>
        </motion.div>

        {/* ── Prevención ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#C4A3FF]/8 backdrop-blur-md border border-[#C4A3FF]/20 rounded-2xl p-6 md:p-8 border-l-4 border-l-[#C4A3FF] shadow-xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">❤️</span>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#D4B8FF]">
              Su mensaje
            </h4>
          </div>
          <p className="text-[#A5F3EA] leading-relaxed text-sm md:text-base">
            {legado.prevencion}
          </p>
        </motion.div>
      </div>
    </section>
  )
}