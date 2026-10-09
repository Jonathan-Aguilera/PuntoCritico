import TimelineCard from './TimelineCard'
import { imagenPorId, type LineaTiempoItem } from '../../data/services/acceso.service'

interface TimelineVerticalProps {
  items: LineaTiempoItem[]
}

export default function TimelineVertical({ items }: TimelineVerticalProps) {
  return (
    <div className="relative pl-9">
      {/* Línea vertical continua */}
      <div className="absolute left-[10px] top-2 bottom-2 w-0.5 bg-blue-300" />

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="relative">
            {/* Punto sobre la línea */}
            <div className="absolute -left-[28px] top-3 w-5 h-5 rounded-full bg-blue-600 border-[3px] border-white shadow-md z-10" />
            {/* Tarjeta */}
            <TimelineCard item={item} imagenSrc={imagenPorId[item.id]} />
          </div>
        ))}
      </div>
    </div>
  )
}