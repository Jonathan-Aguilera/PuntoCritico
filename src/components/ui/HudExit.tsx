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

/**
 * HudExit — espejo exacto de HudIntro.
 *
 *  Intro (forward):
 *    1. Marco chico (200×60) aparece con fondo negro detrás
 *    2. El marco se expande hasta tocar los bordes del HUD
 *    3. Marco + negro se desvanecen → queda visible el contenido
 *
 *  Exit (reverse):
 *    1. Negro se funde sobre el contenido (contenido desaparece)
 *    2. Marco aparece a tamaño completo y se contrae hasta 200×60
 *    3. Marco se desvanece → solo queda pantalla negra
 */
export default function HudExit({ onComplete }: HudExitProps) {
  const [phase, setPhase] = useState<'reveal' | 'contract' | 'hide'>('reveal')
  const { sfxEnabled } = useSoundControl()

  useEffect(() => {
    // 1 → 2: cuando el marco + fondo negro ya están visibles por completo
    const t1 = setTimeout(() => {
      setPhase('contract')
      if (sfxEnabled) playSfx('/sounds/sfx/hud-compress.mp3', 0.9)
    }, 500)

    // 2 → 3: cuando el marco ya terminó de contraerse
    const t2 = setTimeout(() => setPhase('hide'), 1400)

    // Fin: cuando el marco ya se desvaneció
    const t3 = setTimeout(() => onComplete(), 1700)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-190 pointer-events-none flex items-center justify-center">
      {/* ─── Fondo negro: se funde sobre el contenido durante 'reveal' ─── */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ─── Marco ───
          Outer controla la opacidad (aparecer/desvanecerse).
          Inner controla el tamaño (expandirse/contraerse).
          Separarlos permite que cada animación tenga su propia duración
          sin pisarse entre sí. */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'hide' ? 0 : 1 }}
        transition={{
          duration: phase === 'hide' ? 0.3 : 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <motion.div
          className="relative"
          initial={{ width: HUD_WIDTH, height: HUD_HEIGHT }}
          animate={{
            width: phase === 'reveal' ? HUD_WIDTH : 200,
            height: phase === 'reveal' ? HUD_HEIGHT : 60,
          }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Capa 1: marco blanco con clip-path diagonal */}
          <div
            className="absolute inset-0 bg-white"
            style={{ clipPath: clipPolygon(NOTCH) }}
          />
          {/* Capa 2: interior negro, inset por el grosor de la línea */}
          <div
            className="absolute"
            style={{
              inset: `${LINE}px`,
              clipPath: clipPolygon(NOTCH - LINE),
              background: 'black',
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}