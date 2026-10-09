import type { LineaTiempoItem } from '../../data/services/acceso.service'

interface TimelineCardProps {
  item: LineaTiempoItem
  imagenSrc: string
}

export default function TimelineCard({ item, imagenSrc }: TimelineCardProps) {
  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
      {/* ── Imagen (llena los bordes del card) ── */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          src={imagenSrc}
          alt={item.imagen.titulo}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Badge con el año sobre la imagen */}
        <span className="absolute top-2 left-2 px-2.5 py-1 text-[10px] md:text-xs font-bold text-white bg-blue-700 rounded-full shadow-md">
          {item.anio}
        </span>
      </div>

      {/* ── Contenido (debajo de la imagen, con margen interno) ── */}
      <div className="p-3 md:p-4 flex-1 flex flex-col">
        <h3 className="text-sm md:text-base font-bold text-slate-900 leading-tight mb-2">
          {item.titulo}
        </h3>

        <p className="text-xs md:text-[13px] text-slate-700 leading-snug mb-2">
          {item.dato}
        </p>

        <p className="text-[11px] md:text-xs text-slate-500 italic leading-snug mt-auto pt-2 border-t border-slate-100">
          {item.contexto}
        </p>
      </div>
    </article>
  )
}