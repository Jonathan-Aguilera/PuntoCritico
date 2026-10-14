import { motion } from 'motion/react'
import type { LineaTiempoItem } from '../../data/services/acceso.service'

interface TimelineCardProps {
  item: LineaTiempoItem
  imagenSrc: string
  index?: number
}

export default function TimelineCard({
  item,
  imagenSrc,
  index = 0,
}: TimelineCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="bg-white/5 backdrop-blur-md border border-[#4ECDC4]/20 rounded-xl shadow-xl overflow-hidden flex flex-col h-full hover:border-[#4ECDC4]/50 hover:shadow-[0_0_30px_rgba(78,205,196,0.15)] transition-[border-color,box-shadow] duration-300"
    >
      {/* ── Imagen (formato más horizontal, 3:2) ── */}
      <div className="relative aspect-[3/2] bg-slate-900/50 overflow-hidden">
        <img
          src={imagenSrc}
          alt={item.imagen.titulo}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Badge con el año */}
        <span className="absolute top-2 left-2 px-2.5 py-1 text-[10px] md:text-xs font-bold text-white bg-[#7BA8D9]/90 backdrop-blur-sm rounded-full shadow-md">
          {item.anio}
        </span>
      </div>

      {/* ── Contenido ── */}
      <div className="p-3 md:p-3.5 flex-1 flex flex-col">
        <h3 className="text-sm md:text-[15px] font-bold text-[#4ECDC4] leading-tight mb-1.5">
          {item.titulo}
        </h3>

        <p className="text-xs md:text-[13px] text-[#A5F3EA] leading-snug mb-2">
          {item.dato}
        </p>

        <p className="text-[11px] md:text-xs text-[#A5F3EA]/60 italic leading-snug mt-auto pt-2 border-t border-white/10">
          {item.contexto}
        </p>
      </div>
    </motion.article>
  )
}