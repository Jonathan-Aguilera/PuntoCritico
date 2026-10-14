import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { useSound as useSoundControl } from '../../contexts/SoundContext'
import { playSfx } from '../../lib/audio'

interface HudExitProps {
  onComplete: () => void
}

// Mismos valores que HudIntro para que el HUD coincida píxel a píxel
const NOTCH = 24
const LINE = 2
const HUD_MARGIN = 20
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

export default function HudExit({ onComplete }: HudExitProps) {
  const [phase, setPhase] = useState<'shrink' | 'fade'>('shrink')
  const { sfxEnabled } = useSoundControl()

  useEffect(() => {
    // 1) El HUD se comprime durante ~900ms
    const t1 = setTimeout(() => {
      setPhase('fade')
      // Sonido de "compresión". Si no existe el archivo, playSfx lo ignora silenciosamente.
      if (sfxEnabled) playSfx('/sounds/sfx/hud-compress.mp3', 0.9)
    }, 900)

    // 2) Todo se funde a negro
    const t2 = setTimeout(() => onComplete(), 1400)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[190] pointer-events-none flex items-center justify-center">
      {/* Fondo negro que se intensifica */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'fade' ? 1 : 0.7 }}
        transition={{ duration: 0.5 }}
      />

      {/* Marco del HUD que se comprime hacia el centro */}
      <motion.div
        className="relative"
        initial={{ width: HUD_WIDTH, height: HUD_HEIGHT, opacity: 1 }}
        animate={{
          width: 200,
          height: 60,
          opacity: phase === 'fade' ? 0 : 1,
        }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* Capa 1: marco blanco con clip-path diagonal */}
        <div
          className="absolute inset-0 bg-white"
          style={{ clipPath: clipPolygon(NOTCH) }}
        />
        {/* Capa 2: interior negro con clip-path más adentro */}
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