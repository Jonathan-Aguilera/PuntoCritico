import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { useSound as useSoundControl } from '../../contexts/SoundContext'
import { playSfx } from '../../lib/audio'

interface LoadingScreenProps {
  onComplete: () => void
}

// Cada celda vale 5% (20 celdas en total)
const CELLS = 20

// Segmentos de la curva de carga (no lineal, con pausas)
const SEGMENTS = [
  { end: 0.15, duration: 800 },   // arranque rápido
  { end: 0.18, duration: 700 },   // pausa corta
  { end: 0.35, duration: 900 },   // avance rápido
  { end: 0.42, duration: 1100 },  // pausa larga
  { end: 0.60, duration: 900 },   // avance normal
  { end: 0.66, duration: 600 },   // micro-pausa
  { end: 0.85, duration: 1000 },  // avance
  { end: 0.90, duration: 900 },   // pausa
  { end: 1.00, duration: 900 },   // cierre
]

// Duración total = suma de segmentos
const TOTAL_DURATION = SEGMENTS.reduce((acc, s) => acc + s.duration, 0)

// Mensajes que aparecen durante la carga (por umbral de progreso)
const MESSAGES = [
  { at: 0.15, text: 'Inicializando sistema…' },
  { at: 0.45, text: 'Cargando datos cardiovasculares…' },
  { at: 0.75, text: 'Personalizando experiencia…' },
]

/**
 * Convierte el tiempo transcurrido en un progreso (0–1) usando la curva
 * de segmentos. Esto permite avanzar rápido en unos tramos y "detenerse"
 * en otros, simulando cargas de componentes reales.
 */
function computeProgress(elapsed: number): number {
  let accTime = 0
  let prevEnd = 0

  for (const seg of SEGMENTS) {
    const segStart = accTime
    const segEnd = accTime + seg.duration
    if (elapsed < segEnd) {
      const segProgress = (elapsed - segStart) / seg.duration
      return prevEnd + (seg.end - prevEnd) * segProgress
    }
    accTime = segEnd
    prevEnd = seg.end
  }
  return 1
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const { sfxEnabled } = useSoundControl()
  const lastTickRef = useRef(0)
  const hasCompletedRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  const sfxEnabledRef = useRef(sfxEnabled)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    sfxEnabledRef.current = sfxEnabled
  }, [sfxEnabled])

  // Sonido "boot" al montar
  useEffect(() => {
    const t = setTimeout(() => {
      if (sfxEnabledRef.current) playSfx('/sounds/sfx/boot.mp3', 0.9)
    }, 150)
    return () => clearTimeout(t)
  }, [])

  // Animación de la barra
  useEffect(() => {
    let rafId: number
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const value = Math.min(1, computeProgress(elapsed))
      setProgress(value)

      // Tick cada 5% (una celda)
      const currentTick = Math.floor(value * CELLS)
      if (currentTick > lastTickRef.current && currentTick <= CELLS) {
        lastTickRef.current = currentTick
        if (currentTick < CELLS && sfxEnabledRef.current) {
          playSfx('/sounds/sfx/load-tick.mp3', 0.6)
        }
      }

      // Fin de la carga
      if (value >= 1) {
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true
          if (sfxEnabledRef.current) {
            playSfx('/sounds/sfx/load-complete.mp3', 1.0)
          }
          setTimeout(() => onCompleteRef.current(), 400)
        }
        return
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  // Determina qué mensaje mostrar según el progreso
  const currentMessage = [...MESSAGES]
    .reverse()
    .find((m) => progress >= m.at)?.text ?? 'Cargando…'

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(45deg, #0F0A33 0%, #1C2070 50%, #0F0A33 100%)',
          opacity: 0.5,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 100% 100%, rgba(190, 124, 45, 0.25) 0%, transparent 60%)',
        }}
      />

      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative text-3xl md:text-4xl font-bold text-white tracking-tight mb-12"
      >
        Punto Crítico
      </motion.h1>

      {/* Barra de celdas */}
      <div className="relative w-[320px] flex gap-[3px]">
        {Array.from({ length: CELLS }).map((_, i) => {
          const cellStart = i / CELLS
          const cellEnd = (i + 1) / CELLS
          const fill = Math.max(
            0,
            Math.min(1, (progress - cellStart) / (cellEnd - cellStart))
          )
          return (
            <div
              key={i}
              className="relative flex-1 h-2 bg-white/10 overflow-hidden"
            >
              <div
                className="absolute inset-y-0 left-0 bg-[#7BA8D9] shadow-[0_0_8px_rgba(123,168,217,0.8)]"
                style={{
                  width: `${fill * 100}%`,
                  transition: 'width 120ms linear',
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Mensaje de estado */}
      <div className="relative h-6 mt-6 overflow-hidden">
        <motion.p
          key={currentMessage}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="text-xs text-slate-400 font-mono tracking-wider text-center"
        >
          {currentMessage}
        </motion.p>
      </div>

      {/* Porcentaje */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative text-[10px] text-slate-500 mt-2 font-mono tracking-[0.2em]"
      >
        {String(Math.round(progress * 100)).padStart(2, '0')}%
      </motion.p>
    </motion.div>
  )
}