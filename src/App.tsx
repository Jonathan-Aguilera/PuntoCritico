import { BrowserRouter, Routes, Route, useLocation } from 'react-router'
import { AnimatePresence } from 'motion/react'
import { Suspense, useEffect } from 'react'
import { lazyWithPreload } from 'react-lazy-with-preload'

import MainLayout from './layouts/MainLayout'
import PageTransition from './components/ui/PageTransition'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
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

function AnimatedRoutes() {
  const location = useLocation()

  useEffect(() => {
    const idleCallback = window.requestIdleCallback(
      () => {
        Object.values(preloadablePages).forEach((Page) => Page.preload())
      },
      { timeout: 3000 }
    )
    return () => window.cancelIdleCallback(idleCallback)
  }, [])

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/riesgos" element={<PageTransition><Riesgos /></PageTransition>} />
          <Route path="/impacto" element={<PageTransition><Impacto /></PageTransition>} />
          <Route path="/acceso" element={<PageTransition><Acceso /></PageTransition>} />
          <Route path="/habitos" element={<PageTransition><Habitos /></PageTransition>} />
          <Route path="/soluciones" element={<PageTransition><Soluciones /></PageTransition>} />
          <Route path="/historias" element={<PageTransition><Historias /></PageTransition>} />
          <Route path="/mapa" element={<PageTransition><Mapa /></PageTransition>} />
          {/* Catch-all: cualquier ruta no listada arriba cae aquí */}
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  useEffect(() => {
    checkDatabaseConnectionOnce()
  }, [])

  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <AnimatedRoutes />
      </Suspense>
    </BrowserRouter>
  )
}