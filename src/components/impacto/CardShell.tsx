import { motion } from 'motion/react'
import { type ReactNode } from 'react'

interface CardShellProps {
  titulo: string
  subtitulo: string
  descripcion: string
  children: ReactNode
  index?: number
}

export default function CardShell({
  titulo,
  subtitulo,
  descripcion,
  children,
  index = 0,
}: CardShellProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-xl p-6 md:p-10"
    >
      <header className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-amber-300 mb-1">
          {titulo}
        </h2>
        <p className="text-xs md:text-sm font-medium text-slate-300">
          {subtitulo}
        </p>
        <p className="text-slate-200 mt-4 leading-relaxed text-sm md:text-base">
          {descripcion}
        </p>
      </header>
      <div>{children}</div>
    </motion.article>
  )
}