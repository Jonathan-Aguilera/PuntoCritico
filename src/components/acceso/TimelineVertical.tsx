import TimelineCard from './TimelineCard'
import {
  imagenPorId,
  type LineaTiempoItem,
} from '../../data/services/acceso.service'

interface TimelineVerticalProps {
  items: LineaTiempoItem[]
}

export default function TimelineVertical({ items }: TimelineVerticalProps) {
  return (
    <div className="relative pl-9">
      {/* Línea vertical continua */}
      <div className="absolute left-[10px] top-2 bottom-2 w-0.5 bg-white/20" />

      <div className="space-y-6">
        {items.map((item, i) => (
          <div key={item.id} className="relative">
            {/* Punto sobre la línea */}
            <div className="absolute -left-[28px] top-3 w-5 h-5 rounded-full bg-[#7BA8D9] border-[3px] border-slate-900 shadow-md shadow-[#7BA8D9]/50 z-10" />
            {/* Tarjeta */}
            <TimelineCard
              item={item}
              imagenSrc={imagenPorId[item.id]}
              index={i}
            />
          </div>
        ))}
      </div>
    </div>
  )
}