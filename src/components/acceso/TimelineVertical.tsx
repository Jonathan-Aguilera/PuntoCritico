import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import TimelineCard from './TimelineCard'
import {
  imagenPorId,
  type LineaTiempoItem,
} from '../../data/services/acceso.service'

interface TimelineVerticalProps {
  items: LineaTiempoItem[]
}

export default function TimelineVertical({ items }: TimelineVerticalProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Cerrar al hacer click fuera del componente
  useEffect(() => {
    if (!openId) return
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpenId(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [openId])

  return (
    <div ref={containerRef} className="relative py-6">
      {/* ── Barra vertical GRUESA centrada ── */}
      <div className="absolute left-1/2 top-2 bottom-2 w-1.5 bg-white/25 -translate-x-1/2 z-0 rounded-full" />

      <div className="space-y-8">
        {items.map((item, i) => {
          const isRight = i % 2 === 1
          const dotColor = isRight ? '#c430e3' : '#441ebd'
          const isOpen = openId === item.id

          return (
            <div key={item.id} className="relative">
              {/* ── Fila: botón + año + flecha (la barra es absoluta al centro) ── */}
              <div className="flex items-center">
                {/* Columna izquierda: botón + flecha → (solo si NO es right) */}
                <div className="flex-1 flex justify-end items-center gap-2 pr-3">
                  {!isRight && (
                    <>
                      <div className="flex flex-col items-center">
                        <button
                          type="button"
                          onClick={() => setOpenId(isOpen ? null : item.id)}
                          aria-expanded={isOpen}
                          aria-label={`Ver detalle: ${item.titulo}`}
                          className="w-16 h-16 rounded-full overflow-hidden bg-white shadow-lg transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                          style={{
                            borderWidth: '3px',
                            borderStyle: 'solid',
                            borderColor: dotColor,
                            boxShadow: `0 0 16px ${dotColor}55`,
                          }}
                        >
                          <img
                            src={imagenPorId[item.id]}
                            alt={item.imagen.titulo}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </button>
                        <span className="text-[11px] font-semibold text-[#A5F3EA]/80 mt-1.5 tabular-nums">
                          {item.anio}
                        </span>
                      </div>
                      {/* Flecha apuntando a la barra */}
                      <span
                        className="text-xl font-bold leading-none"
                        style={{ color: dotColor }}
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </>
                  )}
                </div>

                {/* Centro: spacer (la barra pasa por acá) */}
                <div className="w-2 shrink-0" />

                {/* Columna derecha: flecha ← + botón (solo si es right) */}
                <div className="flex-1 flex justify-start items-center gap-2 pl-3">
                  {isRight && (
                    <>
                      <span
                        className="text-xl font-bold leading-none"
                        style={{ color: dotColor }}
                        aria-hidden="true"
                      >
                        ←
                      </span>
                      <div className="flex flex-col items-center">
                        <button
                          type="button"
                          onClick={() => setOpenId(isOpen ? null : item.id)}
                          aria-expanded={isOpen}
                          aria-label={`Ver detalle: ${item.titulo}`}
                          className="w-16 h-16 rounded-full overflow-hidden bg-white shadow-lg transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                          style={{
                            borderWidth: '3px',
                            borderStyle: 'solid',
                            borderColor: dotColor,
                            boxShadow: `0 0 16px ${dotColor}55`,
                          }}
                        >
                          <img
                            src={imagenPorId[item.id]}
                            alt={item.imagen.titulo}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </button>
                        <span className="text-[11px] font-semibold text-[#A5F3EA]/80 mt-1.5 tabular-nums">
                          {item.anio}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* ── Card expandible con animación suave ── */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, height: 0, y: -6 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -6 }}
                    transition={{
                      duration: 0.22,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4">
                      <TimelineCard
                        item={item}
                        imagenSrc={imagenPorId[item.id]}
                        index={i}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}