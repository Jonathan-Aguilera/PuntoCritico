import TimelineCard from './TimelineCard'
import TimelineVertical from './TimelineVertical'
import {
  imagenPorId,
  type LineaTiempoItem,
} from '../../data/services/acceso.service'

interface TimelineHorizontalProps {
  items: LineaTiempoItem[]
}

// Si hay más de este número de items, la línea horizontal deja de ser
// legible y se cae al layout vertical (lista) automáticamente.
const MAX_HORIZONTAL_ITEMS = 7

export default function TimelineHorizontal({ items }: TimelineHorizontalProps) {
  // Fallback: demasiados items → usar layout vertical
  if (items.length > MAX_HORIZONTAL_ITEMS) {
    return <TimelineVertical items={items} />
  }

  return (
    <div className="py-4">
      <div
        className="grid gap-x-4"
        style={{
          gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
        }}
      >
        {/* ────────── Fila 1: cards ARRIBA (índices pares) ────────── */}
        {items.map((item, i) => (
          <div
            key={`top-${item.id}`}
            className="flex flex-col justify-end items-center pb-2 min-h-[300px]"
          >
            {i % 2 === 0 && (
              <>
                <div className="w-full">
                  <TimelineCard
                    item={item}
                    imagenSrc={imagenPorId[item.id]}
                    index={i}
                  />
                </div>
                {/* Flecha apuntando a la barra */}
                <span
                  className="text-xl font-bold leading-none mt-2"
                  style={{ color: '#441ebd' }}
                  aria-hidden="true"
                >
                  ↓
                </span>
              </>
            )}
          </div>
        ))}

        {/* ────────── Fila 2: la BARRA + dots alineados ────────── */}
        <div className="relative" style={{ gridColumn: '1 / -1' }}>
          {/* Barra horizontal gruesa */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 bg-white/25 rounded-full z-0" />

          {/* Dots: uno por columna, alineados con los cards */}
          <div
            className="relative grid gap-x-4 z-10"
            style={{
              gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
            }}
          >
            {items.map((item, i) => {
              const dotColor = i % 2 === 0 ? '#441ebd' : '#c430e3'
              return (
                <div
                  key={`dot-${item.id}`}
                  className="flex justify-center py-3"
                >
                  <div
                    className="w-6 h-6 rounded-full bg-white border-[3px]"
                    style={{
                      borderColor: dotColor,
                      boxShadow: `0 0 14px ${dotColor}77`,
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* ────────── Fila 3: cards ABAJO (índices impares) ────────── */}
        {items.map((item, i) => (
          <div
            key={`bot-${item.id}`}
            className="flex flex-col justify-start items-center pt-2 min-h-[300px]"
          >
            {i % 2 === 1 && (
              <>
                {/* Flecha apuntando a la barra */}
                <span
                  className="text-xl font-bold leading-none mb-2"
                  style={{ color: '#c430e3' }}
                  aria-hidden="true"
                >
                  ↑
                </span>
                <div className="w-full">
                  <TimelineCard
                    item={item}
                    imagenSrc={imagenPorId[item.id]}
                    index={i}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}