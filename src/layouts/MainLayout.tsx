import { useLocation } from 'react-router'
import { useRef, useState, useEffect } from 'react'
import { motion } from 'motion/react'
import Header from '../components/ui/Header'
import Footer from '../components/ui/Footer'
import HudFrame from '../components/ui/HudFrame'
import ShieldBar from '../components/ui/ShieldBar'
import AnimatedOutlet from '../components/ui/AnimatedOutlet'
import { useIntro } from '../contexts/IntroContext'
import Tutorial from '../components/ui/Tutorial'

export default function MainLayout() {
  const scrollRef = useRef<HTMLElement>(null)
  const location = useLocation()
  const [progress, setProgress] = useState(0)
  const { introDone } = useIntro()

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = 0
    setProgress(0)
  }, [location.pathname])

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
  }, [location.pathname])

  const t = (delay: number) => ({
    duration: 0.7,
    delay: introDone ? delay : 0,
    ease: [0.16, 1, 0.3, 1] as const,
  })

  return (
    <div className="h-dvh w-full overflow-hidden relative bg-black">

      {/* ═══════════════════════════════════════════════════
          FONDO PRINCIPAL — Degradado diagonal de 4 colores
          ═══════════════════════════════════════════════════
              · Ángulo: 210deg (de esquina superior-izquierda hacia abajo-derecha)
                - 0deg   = de abajo hacia arriba
                - 30deg  = diagonal suave hacia la derecha (versión anterior)
                - 45deg  = diagonal exacta
                - 90deg  = de izquierda a derecha
                - 180deg = de arriba hacia abajo
                - 210deg = diagonal hacia abajo-derecha  ← actual
                - 225deg = diagonal exacta hacia abajo-derecha

              · Stops:
                - 0%   → #1418A8  (azul profundo, arriba-izquierda)
                - 35%  → #5109a5  (violeta intenso)
                - 70%  → #C54EDE  (magenta suave)
                - 100% → #E386DC  (lila claro, abajo-derecha)
          */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(135deg, #131585 0%, #441EBD 21%, #6616C4 45%, #C430E3 75%, #E37FDC 100%)',
        }}
      />

      {/* ═══════════════════════════════════════════════════
          LUZ DORADA — Desactivada por ahora
      ═══════════════════════════════════════════════════
          La paleta nueva es violeta/rosa, así que el dorado
          puede no combinar. Si querés eliminarla del todo,
          borrá este bloque. Si querés probar cómo queda,
          descomentalo.
      */}
      {/* <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse at 100% 100%, rgba(190, 124, 45, 0.15) 0%, transparent 45%)',
        }}
      /> */}

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
            <motion.div
              className="relative shrink-0 z-60"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : -10 }}
              transition={t(0.4)}
            >
              <Header progress={progress} />
            </motion.div>

            <div
              className="pointer-events-none absolute left-0 right-0 h-12 z-55"
              style={{
                top: '40px',
                background:
                  'linear-gradient(to bottom, rgba(20, 8, 30, 0.85) 0%, rgba(20, 8, 30, 0.4) 50%, transparent 100%)',
              }}
            />

            <motion.main
              ref={scrollRef}
              className="flex-1 relative overflow-y-auto w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: introDone ? 1 : 0 }}
              transition={t(0.6)}
            >
              <div className="pt-8">
                <AnimatedOutlet />
              </div>
            </motion.main>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: introDone ? 1 : 0 }}
              transition={t(0.7)}
            >
              <Footer />
            </motion.div>
          </div>
        </HudFrame>
        <Tutorial />
      </div>
    </div>
  )
}