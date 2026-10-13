import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { useSound as useSoundControl } from '../../contexts/SoundContext'
import { playSfx } from '../../lib/audio'

interface HudIntroProps {
  onComplete: () => void
}

// Tamaño de las esquinas diagonales en px
const NOTCH = 24
// Grosor de la línea
const LINE = 2

// Posición del HUD: 20px de padding + 24px de notch en los bordes
const HUD_MARGIN = 20 // px-5 = 20px
// Cuánto debe crecer el marco para tocar los bordes del HUD
const HUD_WIDTH = `calc(100vw - ${HUD_MARGIN * 2}px)`
const HUD_HEIGHT = `calc(100vh - ${HUD_MARGIN * 2}px)`

const clipPolygon = (notch: number) => `polygon(
  ${notch}px 0,
  calc(100% - ${notch}px) 0,
  100% ${notch}px,
  100% calc(100% - ${notch}px),
  calc(100% - ${notch}px) 100%,
  ${notch}px 100%,
  0 calc(100% - ${notch}px),
  0 ${notch}px
)`

export default function HudIntro({ onComplete }: HudIntroProps) {
  const [phase, setPhase] = useState<'appear' | 'expand' | 'fade'>('appear')
  const { sfxEnabled } = useSoundControl()

  useEffect(() => {
    const t1 = setTimeout(() => {
      setPhase('expand')
      if (sfxEnabled) playSfx('/sounds/sfx/hud-expand.mp3', 1.0)
    }, 300)
    const t2 = setTimeout(() => {
      setPhase('fade')
      if (sfxEnabled) playSfx('/sounds/sfx/reveal.mp3', 0.9)
    }, 1400)
    const t3 = setTimeout(() => onComplete(), 1900)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onComplete])

  // Tamaños iniciales (bloque chico en el centro)
  const initialSize = { width: 200, height: 60 }

  // Tamaño final (marco que toca los bordes del HUD)
  const finalSize = { width: HUD_WIDTH, height: HUD_HEIGHT }

  const size = phase === 'appear' ? initialSize : finalSize

  return (
    <div className="fixed inset-0 z-[190] pointer-events-none flex items-center justify-center">
      {/* Fondo negro detrás */}
      <motion.div
        className="absolute inset-0 bg-black"
        animate={{ opacity: phase === 'fade' ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Marco con línea delgada */}
      <motion.div
        className="relative"
        initial={{ width: initialSize.width, height: initialSize.height, opacity: 0 }}
        animate={{
          width: size.width,
          height: size.height,
          opacity: phase === 'fade' ? 0 : 1,
        }}
        transition={{
          duration: phase === 'expand' ? 0.9 : 0.3,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* Capa 1: marco blanco con clip-path diagonal */}
        <div
          className="absolute inset-0 bg-white"
          style={{ clipPath: clipPolygon(NOTCH) }}
        />

        {/* Capa 2: interior negro con clip-path más adentro (deja solo la línea visible) */}
        <div
          className="absolute"
          style={{
            inset: `${LINE}px`,
            clipPath: clipPolygon(NOTCH - LINE),
            background: 'black',
          }}
        />
      </motion.div>
    </div>
  )
}