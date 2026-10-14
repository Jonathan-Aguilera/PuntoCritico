import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useSound as useSoundControl } from '../../contexts/SoundContext'
import { playSfx } from '../../lib/audio'

export interface PreloadTask {
  id: string
  label: string
  run: () => void | Promise<void>
  /** Duración mínima en ms para que la tarea se "vea" en la barra.
   *  Si la tarea real tarda menos, se estira hasta este valor.
   *  Si tarda más, la barra espera. */
  minDuration?: number
}

interface LoadingScreenProps {
  onComplete: () => void
  tasks: PreloadTask[]
}

// Cada celda vale 5% (20 celdas en total)
const CELLS = 20

/** EaseOutCubic para que la barra desacelere al final de cada tarea */
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

export default function LoadingScreen({ onComplete, tasks }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [label, setLabel] = useState('Iniciando sistema…')
  const { sfxEnabled } = useSoundControl()

  const lastTickRef = useRef(0)
  const completedRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  const sfxEnabledRef = useRef(sfxEnabled)

  // Refs para que los efectos no dependan de estas props
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])
  useEffect(() => { sfxEnabledRef.current = sfxEnabled }, [sfxEnabled])

  // Sonido "boot" al montar
  useEffect(() => {
    const t = setTimeout(() => {
      if (sfxEnabledRef.current) playSfx('/sounds/sfx/boot.mp3', 0.9)
    }, 150)
    return () => clearTimeout(t)
  }, [])

  // Tick de audio por celda completada
  useEffect(() => {
    const currentTick = Math.floor(progress * CELLS)
    if (currentTick > lastTickRef.current && currentTick <= CELLS) {
      lastTickRef.current = currentTick
      if (currentTick < CELLS && sfxEnabledRef.current) {
        playSfx('/sounds/sfx/load-tick.mp3', 0.6)
      }
      if (currentTick === CELLS && !completedRef.current) {
        completedRef.current = true
        if (sfxEnabledRef.current) playSfx('/sounds/sfx/load-complete.mp3', 1.0)
      }
    }
  }, [progress])

  // Runner principal: ejecuta las tareas en serie y actualiza la barra
  useEffect(() => {
    let cancelled = false
    let rafId = 0

    const run = async () => {
      const total = tasks.length

      // Sin tareas: pasamos directo a "listo"
      if (total === 0) {
        setProgress(1)
        setLabel('Todo listo')
        setTimeout(() => {
          if (!cancelled) onCompleteRef.current()
        }, 300)
        return
      }

      for (let i = 0; i < total; i++) {
        if (cancelled) return
        const task = tasks[i]
        setLabel(task.label)

        const minDur = task.minDuration ?? 400
        const startTime = performance.now()
        const baseProgress = i / total
        const nextProgress = (i + 1) / total

        // Ejecutamos la tarea real (los errores no detienen la carga)
        try {
          await Promise.resolve(task.run())
        } catch (err) {
          console.warn(`[preload] tarea "${task.id}" falló:`, err)
        }

        // Interpolamos la barra durante el resto del minDuration
        await new Promise<void>((resolve) => {
          const tick = () => {
            if (cancelled) { resolve(); return }
            const elapsed = performance.now() - startTime
            const t = Math.min(1, elapsed / minDur)
            const eased = easeOutCubic(t)
            setProgress(baseProgress + (nextProgress - baseProgress) * eased)
            if (t < 1) {
              rafId = requestAnimationFrame(tick)
            } else {
              setProgress(nextProgress)
              resolve()
            }
          }
          rafId = requestAnimationFrame(tick)
        })
      }

      if (cancelled) return
      setProgress(1)
      setLabel('Todo listo')
      setTimeout(() => {
        if (!cancelled) onCompleteRef.current()
      }, 400)
    }

    run()
    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
    }
  }, [tasks])

  const percent = Math.round(progress * 100)

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="fixed inset-0 z-200 bg-black flex flex-col items-center justify-center"
    >
      {/* Fondos */}
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
      <div className="relative w-[320px] flex gap-0.75">
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

      {/* Mensaje de la tarea actual */}
      <div className="relative h-6 mt-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-xs text-slate-300 font-mono tracking-wider text-center"
          >
            {label}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Porcentaje */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative text-[10px] text-slate-500 mt-2 font-mono tracking-[0.2em]"
      >
        {String(percent).padStart(2, '0')}%
      </motion.p>
    </motion.div>
  )
}