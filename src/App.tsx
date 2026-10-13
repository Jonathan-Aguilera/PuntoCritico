import { BrowserRouter, Routes, Route } from 'react-router'
import { Suspense, useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { lazyWithPreload } from 'react-lazy-with-preload'

import MainLayout from './layouts/MainLayout'
import WelcomeScreen from './components/ui/WelcomeScreen'
import LoadingScreen from './components/ui/LoadingScreen'
import HudIntro from './components/ui/HudIntro'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Fuentes from './pages/Fuentes'
import { SoundProvider } from './contexts/SoundContext'
import BackgroundMusic from './components/audio/BackgroundMusic'
import { IntroContext } from './contexts/IntroContext'
import { checkDatabaseConnectionOnce } from './services/dbTest'

const Riesgos = lazyWithPreload(() => import('./pages/Riesgos'))
const Impacto = lazyWithPreload(() => import('./pages/Impacto'))
const Acceso = lazyWithPreload(() => import('./pages/Acceso'))
const Habitos = lazyWithPreload(() => import('./pages/Habitos'))
const Soluciones = lazyWithPreload(() => import('./pages/Soluciones'))
const Historias = lazyWithPreload(() => import('./pages/Historias'))
const Mapa = lazyWithPreload(() => import('./pages/Mapa'))

export const preloadablePages: Record<string, ReturnType<typeof lazyWithPreload>> = {
  '/riesgos': Riesgos,
  '/impacto': Impacto,
  '/acceso': Acceso,
  '/habitos': Habitos,
  '/soluciones': Soluciones,
  '/historias': Historias,
  '/mapa': Mapa,
}

/**
 * Precarga de páginas. Se dispara:
 *  1. Apenas monta la app (en paralelo con la intro).
 *  2. Cuando termina la intro (por si algo quedó pendiente).
 *
 * Usamos setTimeout(0) en lugar de requestIdleCallback porque
 * durante la intro el navegador nunca se considera "idle".
 */
function usePreloadPages(trigger: boolean) {
  useEffect(() => {
    if (!trigger) return
    // Pequeño delay para no competir con la animación en curso
    const t = setTimeout(() => {
      Object.values(preloadablePages).forEach((Page) => {
        try {
          Page.preload()
        } catch (err) {
          console.warn('[preload] Error precargando página:', err)
        }
      })
    }, 300)
    return () => clearTimeout(t)
  }, [trigger])
}

type Phase = 'welcome' | 'loading' | 'hudIntro' | 'done'

export default function App() {
  const [phase, setPhase] = useState<Phase>(() => {
    if (typeof window === 'undefined') return 'done'
    return sessionStorage.getItem('intro_shown') === 'true' ? 'done' : 'welcome'
  })

  useEffect(() => {
    checkDatabaseConnectionOnce()
  }, [])

  // Listener para reiniciar la intro (desde el footer)
  useEffect(() => {
    const handler = () => {
      sessionStorage.removeItem('intro_shown')
      setPhase('welcome')
    }
    window.addEventListener('trigger-intro', handler)
    return () => window.removeEventListener('trigger-intro', handler)
  }, [])

  // Precarga las páginas en paralelo con la intro
  // (la intro son ~10s, tiempo de sobra para descargar todo)
  usePreloadPages(true)

  const handleStart = () => setPhase('loading')
  const handleLoadingComplete = () => setPhase('hudIntro')
  const handleIntroComplete = () => {
    sessionStorage.setItem('intro_shown', 'true')
    setPhase('done')
  }

  const introDone = phase === 'done'

  return (
    <SoundProvider>
      <IntroContext.Provider value={{ introDone }}>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route
                path="/riesgos"
                element={
                  <Suspense fallback={null}>
                    <Riesgos />
                  </Suspense>
                }
              />
              <Route
                path="/impacto"
                element={
                  <Suspense fallback={null}>
                    <Impacto />
                  </Suspense>
                }
              />
              <Route
                path="/acceso"
                element={
                  <Suspense fallback={null}>
                    <Acceso />
                  </Suspense>
                }
              />
              <Route
                path="/habitos"
                element={
                  <Suspense fallback={null}>
                    <Habitos />
                  </Suspense>
                }
              />
              <Route
                path="/soluciones"
                element={
                  <Suspense fallback={null}>
                    <Soluciones />
                  </Suspense>
                }
              />
              <Route
                path="/historias"
                element={
                  <Suspense fallback={null}>
                    <Historias />
                  </Suspense>
                }
              />
              <Route
                path="/mapa"
                element={
                  <Suspense fallback={null}>
                    <Mapa />
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense fallback={null}>
                    <NotFound />
                  </Suspense>
                }
              />
              <Route
                path="/fuentes"
                element={
                  <Suspense fallback={null}>
                    <Fuentes />
                  </Suspense>
                }
              />
            </Route>
          </Routes>

          <BackgroundMusic />

          <AnimatePresence>
            {phase === 'welcome' && (
              <WelcomeScreen key="welcome" onStart={handleStart} />
            )}
            {phase === 'loading' && (
              <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
            )}
            {phase === 'hudIntro' && (
              <HudIntro key="hudIntro" onComplete={handleIntroComplete} />
            )}
          </AnimatePresence>
        </BrowserRouter>
      </IntroContext.Provider>
    </SoundProvider>
  )
}