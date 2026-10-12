import TimelineCard from './TimelineCard'
import {
  imagenPorId,
  type LineaTiempoItem,
} from '../../data/services/acceso.service'

interface TimelineHorizontalProps {
  items: LineaTiempoItem[]
}

export default function TimelineHorizontal({ items }: TimelineHorizontalProps) {
  return (
    <div className="relative">
      {/* Línea horizontal continua */}
      <div className="absolute left-0 right-0 top-[9px] h-0.5 bg-white/20 z-0" />

      <div className="grid grid-cols-5 gap-5 relative">
        {items.map((item, i) => (
          <div key={item.id} className="flex flex-col items-center">
            {/* Punto sobre la línea */}
            <div className="w-5 h-5 rounded-full bg-[#7BA8D9] border-[3px] border-slate-900 shadow-md shadow-[#7BA8D9]/50 relative z-10" />
            {/* Vástago (conector vertical) */}
            <div className="w-0.5 h-6 bg-white/20" />
            {/* Tarjeta */}
            <div className="w-full mt-1">
              <TimelineCard
                item={item}
                imagenSrc={imagenPorId[item.id]}
                index={i}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}