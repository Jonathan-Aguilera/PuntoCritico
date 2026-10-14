import { BrowserRouter, Routes, Route, useNavigate } from 'react-router'
import { Suspense, useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { lazyWithPreload } from 'react-lazy-with-preload'

import MainLayout from './layouts/MainLayout'
import MapLayout from './layouts/MapLayout'
import WelcomeScreen from './components/ui/WelcomeScreen'
import LoadingScreen, { type PreloadTask } from './components/ui/LoadingScreen'
import HudIntro from './components/ui/HudIntro'
import HudExit from './components/ui/HudExit'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Fuentes from './pages/Fuentes'
import Mapa from './pages/Mapa'
import { SoundProvider } from './contexts/SoundContext'
import BackgroundMusic from './components/audio/BackgroundMusic'
import { IntroContext } from './contexts/IntroContext'
import { MapTransitionContext } from './contexts/MapTransitionContext'
import { checkDatabaseConnectionOnce } from './services/dbTest'

const Riesgos = lazyWithPreload(() => import('./pages/Riesgos'))
const Impacto = lazyWithPreload(() => import('./pages/Impacto'))
const Acceso = lazyWithPreload(() => import('./pages/Acceso'))
const Habitos = lazyWithPreload(() => import('./pages/Habitos'))
const Soluciones = lazyWithPreload(() => import('./pages/Soluciones'))
const Historias = lazyWithPreload(() => import('./pages/Historias'))

export const preloadablePages: Record<string, ReturnType<typeof lazyWithPreload>> = {
  '/riesgos': Riesgos,
  '/impacto': Impacto,
  '/acceso': Acceso,
  '/habitos': Habitos,
  '/soluciones': Soluciones,
  '/historias': Historias,
}

/* ══════════════════════════════════════════════════════════════
 *  Tareas de la pantalla de carga inicial (real)
 * ══════════════════════════════════════════════════════════════ */
const PRELOAD_TASKS: PreloadTask[] = [
  { id: 'core', label: 'Inicializando sistema…', run: () => {}, minDuration: 400 },
  { id: 'riesgos', label: 'Cargando factores de riesgo…', run: () => preloadablePages['/riesgos']?.preload?.(), minDuration: 300 },
  { id: 'impacto', label: 'Calculando impacto sanitario…', run: () => preloadablePages['/impacto']?.preload?.(), minDuration: 300 },
  { id: 'acceso', label: 'Armando línea de tiempo de acceso…', run: () => preloadablePages['/acceso']?.preload?.(), minDuration: 300 },
  { id: 'habitos', label: 'Revisando hábitos y mitos…', run: () => preloadablePages['/habitos']?.preload?.(), minDuration: 300 },
  { id: 'soluciones', label: 'Recopilando soluciones…', run: () => preloadablePages['/soluciones']?.preload?.(), minDuration: 300 },
  { id: 'historias', label: 'Cargando historias y testimonios…', run: () => preloadablePages['/historias']?.preload?.(), minDuration: 300 },
  {
    id: 'heart',
    label: 'Cargando corazón 3D…',
    run: async () => {
      const mod = await import('./components/historias/HeartModel')
      mod.preloadHeartModel()
    },
    minDuration: 1200,
  },
  { id: 'final', label: 'Últimos ajustes…', run: () => {}, minDuration: 400 },
]

/* ══════════════════════════════════════════════════════════════
 *  Tareas FICTICIAS del mapa
 * ══════════════════════════════════════════════════════════════ */
const MAP_LOADING_TASKS: PreloadTask[] = [
  { id: 'geo-init', label: 'Inicializando visor geoespacial…', run: () => {}, minDuration: 900 },
  { id: 'geo-parse', label: 'Interpretando datos geográficos…', run: () => {}, minDuration: 1100 },
  { id: 'geo-render', label: 'Renderizando capas base…', run: () => {}, minDuration: 900 },
  { id: 'centers', label: 'Ubicando centros de rehabilitación…', run: () => {}, minDuration: 1100 },
  { id: 'final', label: 'Preparando interfaz…', run: () => {}, minDuration: 800 },
]

type Phase =
  | 'welcome'
  | 'loading'
  | 'hudIntro'
  | 'done'
  | 'mapExit'
  | 'mapLoading'
  | 'mapEnter'
  | 'returnExit'
  | 'returnEnter'

function AppContent() {
  const navigate = useNavigate()

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

  /* ─── Transiciones iniciales ─── */
  const handleStart = () => setPhase('loading')
  const handleLoadingComplete = () => setPhase('hudIntro')
  const handleIntroComplete = () => {
    sessionStorage.setItem('intro_shown', 'true')
    setPhase('done')
  }

  /* ─── Transición hacia el mapa ─── */
  const startMapTransition = useCallback(() => {
    setPhase('mapExit')
  }, [])

  const handleMapExitComplete = () => setPhase('mapLoading')
  const handleMapLoadingComplete = () => setPhase('mapEnter')
  const handleMapEnterComplete = () => {
    navigate('/mapa')
    setPhase('done')
  }

  /* ─── Transición de vuelta al inicio ─── */
  const startMapReturn = useCallback(() => {
    setPhase('returnExit')
  }, [])

  const handleReturnExitComplete = () => {
    // Navegamos AHORA, mientras el HudIntro todavía tapa la pantalla.
    // Cuando el marco se expanda, el contenido detrás ya es la home.
    navigate('/')
    setPhase('returnEnter')
  }
  const handleReturnEnterComplete = () => {
    setPhase('done')
  }

  const introDone = phase === 'done'

  return (
    <IntroContext.Provider value={{ introDone }}>
      <MapTransitionContext.Provider value={{ startMapTransition, startMapReturn }}>
        <Routes>
          {/* Rutas normales: MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/riesgos" element={<Suspense fallback={null}><Riesgos /></Suspense>} />
            <Route path="/impacto" element={<Suspense fallback={null}><Impacto /></Suspense>} />
            <Route path="/acceso" element={<Suspense fallback={null}><Acceso /></Suspense>} />
            <Route path="/habitos" element={<Suspense fallback={null}><Habitos /></Suspense>} />
            <Route path="/soluciones" element={<Suspense fallback={null}><Soluciones /></Suspense>} />
            <Route path="/historias" element={<Suspense fallback={null}><Historias /></Suspense>} />
            <Route path="/fuentes" element={<Suspense fallback={null}><Fuentes /></Suspense>} />
            <Route path="*" element={<Suspense fallback={null}><NotFound /></Suspense>} />
          </Route>

          {/* Ruta del mapa: MapLayout dedicado */}
          <Route element={<MapLayout />}>
            <Route path="/mapa" element={<Mapa />} />
          </Route>
        </Routes>

        <BackgroundMusic />

        <AnimatePresence>
          {phase === 'welcome' && (
            <WelcomeScreen key="welcome" onStart={handleStart} />
          )}
          {phase === 'loading' && (
            <LoadingScreen
              key="loading"
              tasks={PRELOAD_TASKS}
              onComplete={handleLoadingComplete}
            />
          )}
          {phase === 'hudIntro' && (
            <HudIntro key="hudIntro" onComplete={handleIntroComplete} />
          )}
          {phase === 'mapExit' && (
            <HudExit key="mapExit" onComplete={handleMapExitComplete} />
          )}
          {phase === 'mapLoading' && (
            <LoadingScreen
              key="mapLoading"
              tasks={MAP_LOADING_TASKS}
              onComplete={handleMapLoadingComplete}
            />
          )}
          {phase === 'mapEnter' && (
            <HudIntro key="mapEnter" onComplete={handleMapEnterComplete} />
          )}
          {phase === 'returnExit' && (
            <HudExit key="returnExit" onComplete={handleReturnExitComplete} />
          )}
          {phase === 'returnEnter' && (
            <HudIntro key="returnEnter" onComplete={handleReturnEnterComplete} />
          )}
        </AnimatePresence>
      </MapTransitionContext.Provider>
    </IntroContext.Provider>
  )
}

export default function App() {
  return (
    <SoundProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </SoundProvider>
  )
}