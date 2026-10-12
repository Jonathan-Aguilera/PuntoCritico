import { motion } from 'motion/react'
import type { Consejo } from '../../data/services/soluciones.service'

interface ConsejoCardProps {
  consejo: Consejo
  numero: number
  index?: number
  accent: {
    text: string
    bgSoft: string
    border: string
    chipBg: string
    chipText: string
  }
}

export default function ConsejoCard({
  consejo,
  numero,
  index = 0,
  accent,
}: ConsejoCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 md:p-6 shadow-xl border-l-4 ${accent.border} hover:bg-white/8 hover:border-white/20 transition-all duration-300`}
    >
      {/* Número decorativo grande, semitransparente */}
      <span
        className={`absolute top-3 right-4 text-4xl md:text-5xl font-black ${accent.text} opacity-20 select-none pointer-events-none`}
      >
        {String(numero).padStart(2, '0')}
      </span>

      {/* Consejo principal */}
      <p className="text-base md:text-lg font-semibold text-white leading-snug pr-10 mb-3">
        {consejo.texto}
      </p>

      {/* Evidencia */}
      <p className="text-sm text-slate-300 leading-relaxed mb-4">
        {consejo.evidencia}
      </p>

      {/* Chip de fuente */}
      <span
        className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${accent.chipBg} ${accent.chipText} border-white/10`}
      >
        {consejo.fuente}
      </span>
    </motion.article>
  )
}