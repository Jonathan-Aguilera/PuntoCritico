import TimelineCard from './TimelineCard'
import { imagenPorId, type LineaTiempoItem } from '../../data/services/acceso.service'

interface TimelineHorizontalProps {
  items: LineaTiempoItem[]
}

export default function TimelineHorizontal({ items }: TimelineHorizontalProps) {
  return (
    <div className="relative">
      {/* Línea horizontal continua */}
      <div className="absolute left-0 right-0 top-[9px] h-0.5 bg-blue-300 z-0" />

      <div className="grid grid-cols-5 gap-5 relative">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
            {/* Punto sobre la línea */}
            <div className="w-5 h-5 rounded-full bg-blue-600 border-[3px] border-white shadow-md relative z-10" />
            {/* Vástago (conector vertical) */}
            <div className="w-0.5 h-6 bg-blue-300" />
            {/* Tarjeta */}
            <div className="w-full mt-1">
              <TimelineCard item={item} imagenSrc={imagenPorId[item.id]} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}