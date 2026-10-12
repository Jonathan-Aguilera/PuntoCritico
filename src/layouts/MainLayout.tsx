import { Outlet, useLocation } from 'react-router'
import { useRef, useState, useEffect } from 'react'
import Header from '../components/ui/Header'
import Footer from '../components/ui/Footer'
import HudFrame from '../components/ui/HudFrame'
import ShieldBar from '../components/ui/ShieldBar'

export default function MainLayout() {
  const scrollRef = useRef<HTMLElement>(null)
  const location = useLocation()
  const [progress, setProgress] = useState(0)

  // ── Reset al cambiar de ruta ──
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = 0
    setProgress(0)
  }, [location.pathname])

  // ── Medición del scroll ──
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

  return (
    <div className="h-dvh w-full overflow-hidden relative bg-black">

      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(45deg, #191154 0%, #1C2070 50%, #191154 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse at 100% 100%, rgba(190, 124, 45, 0.35) 0%, rgba(190, 124, 45, 0.15) 35%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full h-full">
        <HudFrame topCenterSlot={<ShieldBar progress={progress} />}>
          <div className="w-full h-full flex flex-col relative">

            {/* Header */}
            <div className="relative shrink-0 z-[60]">
              <Header progress={progress} />
            </div>

            {/* Degradado de transición entre header y vista */}
            <div
              className="pointer-events-none absolute left-0 right-0 h-12 z-[55]"
              style={{
                top: '40px', // altura exacta del header
                background:
                  'linear-gradient(to bottom, rgba(20, 8, 30, 0.85) 0%, rgba(20, 8, 30, 0.4) 50%, transparent 100%)',
              }}
            />

            <main
              ref={scrollRef}
              className="flex-1 relative overflow-y-auto w-full"
            >
              <div className="pt-8">
                <Outlet />
              </div>
            </main>

            <Footer />
          </div>
        </HudFrame>
      </div>
    </div>
  )
}