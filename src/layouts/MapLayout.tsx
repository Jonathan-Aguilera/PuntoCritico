import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'motion/react'
import HudFrame from '../components/ui/HudFrame'
import ShieldBar from '../components/ui/ShieldBar'
import Footer from '../components/ui/Footer'
import AnimatedOutlet from '../components/ui/AnimatedOutlet'
import { useIntro } from '../contexts/IntroContext'
import { useSound as useSoundControl } from '../contexts/SoundContext'
import { useMapTransition } from '../contexts/MapTransitionContext'
import { playSfx } from '../lib/audio'
import logo from '../assets/logo.png'

export default function MapLayout() {
  const scrollRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const { introDone } = useIntro()
  const { startMapReturn } = useMapTransition()
  const { sfxEnabled } = useSoundControl()
  const navigate = useNavigate() // ya no se usa directo, pero por si acaso

  void navigate // evitar warning mientras no lo usemos

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const update = () => {
      const max = el.scrollHeight - el.clientHeight
      const value = max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0
      setProgress(value)
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', update)
      ro.disconnect()
    }
  }, [])

  /* ── Volver al inicio (con animación) ── */
  const handleBack = () => {
    if (sfxEnabled) playSfx('/sounds/sfx/click.mp3', 0.5)
    startMapReturn()
  }

  /* ── Re-abrir el tutorial de controles ── */
  const handleHelp = () => {
    if (sfxEnabled) playSfx('/sounds/sfx/click.mp3', 0.5)
    window.dispatchEvent(new Event('mapa-tutorial-open'))
  }

  const t = (delay: number) => ({
    duration: 0.7,
    delay: introDone ? delay : 0,
    ease: [0.16, 1, 0.3, 1] as const,
  })

  return (
    <div className="h-dvh w-full overflow-hidden relative bg-black">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(135deg, #131585 0%, #441EBD 21%, #6616C4 45%, #C430E3 75%, #E37FDC 100%)',
        }}
      />

      <div className="relative z-10 w-full h-full">
        <HudFrame
          topCenterSlot={
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : -20 }}
              transition={t(0.3)}
              className="w-full h-full"
            >
              <ShieldBar progress={progress} />
            </motion.div>
          }
        >
          <div className="w-full h-full flex flex-col relative">
            {/* ─── Header: logo + Ayuda + Volver ─── */}
            <motion.div
              className="relative shrink-0 z-60"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : -10 }}
              transition={t(0.4)}
            >
              <header className="text-white font-['Orbitron'] flex items-stretch h-10">
                {/* Bloque blanco: logo (ahora botón) */}
                <div className="flex items-center bg-white shrink-0 border-b border-white/50 pl-8 pr-6 py-1">
                  <button
                    type="button"
                    onClick={handleBack}
                    onMouseEnter={() => {
                      if (sfxEnabled) playSfx('/sounds/sfx/hover.mp3', 0.7)
                    }}
                    className="flex items-center gap-2"
                  >
                    <img
                      src={logo}
                      alt="Punto Crítico"
                      className="h-8 w-auto object-contain"
                    />
                    <div className="h-5 w-px bg-slate-300" />
                    <span className="font-['Orbitron'] text-sm font-bold tracking-tight text-slate-900 lowercase">
                      punto critico
                    </span>
                  </button>
                </div>

                <div className="w-px bg-white/50" />
                <div className="flex-1" />
                <div className="w-px bg-white/50" />

                {/* Botones: Ayuda + Volver */}
                <div className="flex items-center gap-2 pl-3 pr-6 shrink-0 border-b border-white/50">
                  {/* Ayuda */}
                  <button
                    type="button"
                    onClick={handleHelp}
                    onMouseEnter={() => {
                      if (sfxEnabled) playSfx('/sounds/sfx/hover.mp3', 0.7)
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 text-[10px] rounded border border-transparent text-white/80 hover:border-white/20 hover:bg-[#A855F7]/20 hover:text-white transition-all duration-200"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    Ayuda
                  </button>

                  {/* Volver */}
                  <button
                    type="button"
                    onClick={handleBack}
                    onMouseEnter={() => {
                      if (sfxEnabled) playSfx('/sounds/sfx/hover.mp3', 0.7)
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 text-[10px] rounded border border-transparent text-white/80 hover:border-white/20 hover:bg-[#A855F7]/20 hover:text-white transition-all duration-200"
                  >
                    <svg
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="19" y1="12" x2="5" y2="12" />
                      <polyline points="12 19 5 12 12 5" />
                    </svg>
                    Volver
                  </button>
                </div>
              </header>
            </motion.div>

            {/* Sombra bajo el header */}
            <div
              className="pointer-events-none absolute left-0 right-0 h-12 z-55"
              style={{
                top: '40px',
                background:
                  'linear-gradient(to bottom, rgba(20, 8, 30, 0.85) 0%, rgba(20, 8, 30, 0.4) 50%, transparent 100%)',
              }}
            />

            {/* Contenido del mapa */}
            <motion.main
              ref={scrollRef}
              className="flex-1 relative overflow-hidden w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: introDone ? 1 : 0 }}
              transition={t(0.6)}
            >
              <AnimatedOutlet />
            </motion.main>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: introDone ? 1 : 0 }}
              transition={t(0.7)}
            >
              <Footer />
            </motion.div>
          </div>
        </HudFrame>
      </div>
    </div>
  )
}