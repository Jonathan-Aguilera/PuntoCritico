import { motion } from 'motion/react'
import type { Testimonio } from '../../data/services/historias.service'

interface TestimonioCardProps {
  testimonio: Testimonio
  index?: number
}

export default function TestimonioCard({
  testimonio,
  index = 0,
}: TestimonioCardProps) {
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
      className="relative bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/10 hover:bg-white/8 hover:border-purple-400/30 transition-all flex flex-col h-full"
    >
      {/* Comillas decorativas */}
      <span
        className="absolute top-2 left-4 text-6xl text-purple-400/30 font-serif leading-none select-none pointer-events-none"
        aria-hidden="true"
      >
        "
      </span>

      {/* Fragmento */}
      <p className="relative text-slate-100 leading-relaxed text-sm md:text-base italic mb-5 pt-6">
        {testimonio.fragmento}
      </p>

      {/* Separador */}
      <div className="border-t border-white/10 pt-4 mt-auto">
        {/* Título de la historia */}
        <h4 className="text-xs uppercase tracking-wider font-bold text-amber-300 mb-2">
          {testimonio.titulo}
        </h4>

        {/* Nombre y edad */}
        <p className="text-sm font-semibold text-white">
          {testimonio.nombre}, {testimonio.edad} años
        </p>

        {/* Recomendación */}
        <p className="text-xs text-slate-400 italic mt-2 leading-snug">
          "{testimonio.recomendacion}"
        </p>
      </div>
    </motion.article>
  )
}