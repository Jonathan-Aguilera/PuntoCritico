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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      whileHover={{ scale: 1.005 }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="bg-white/5 backdrop-blur-md border border-[#4ECDC4]/20 rounded-xl shadow-xl p-6 md:p-10
                 transition-[border-color,box-shadow] duration-300
                 hover:border-[#4ECDC4]/50 hover:shadow-[0_0_30px_rgba(78,205,196,0.15)]"
    >
      <header className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold mb-1 text-[#4ECDC4]">
          {titulo}
        </h2>
        <p className="text-xs md:text-sm font-medium text-[#A5F3EA]/80">
          {subtitulo}
        </p>
        <p className="text-[#A5F3EA] mt-4 leading-relaxed text-sm md:text-base">
          {descripcion}
        </p>
      </header>
      <div>{children}</div>
    </motion.article>
  )
}