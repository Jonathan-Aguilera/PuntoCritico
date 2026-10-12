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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-xl overflow-hidden flex flex-col h-full hover:bg-white/8 hover:border-white/20 transition-all duration-300"
    >
      {/* ── Imagen (llena los bordes del card) ── */}
      <div className="relative aspect-[4/3] bg-slate-900/50 overflow-hidden">
        <img
          src={imagenSrc}
          alt={item.imagen.titulo}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Badge con el año sobre la imagen */}
        <span className="absolute top-2 left-2 px-2.5 py-1 text-[10px] md:text-xs font-bold text-white bg-blue-700/90 backdrop-blur-sm rounded-full shadow-md">
          {item.anio}
        </span>
      </div>

      {/* ── Contenido (debajo de la imagen, con margen interno) ── */}
      <div className="p-3 md:p-4 flex-1 flex flex-col">
        <h3 className="text-sm md:text-base font-bold text-amber-300 leading-tight mb-2">
          {item.titulo}
        </h3>

        <p className="text-xs md:text-[13px] text-slate-200 leading-snug mb-2">
          {item.dato}
        </p>

        <p className="text-[11px] md:text-xs text-slate-400 italic leading-snug mt-auto pt-2 border-t border-white/10">
          {item.contexto}
        </p>
      </div>
    </motion.article>
  )
}