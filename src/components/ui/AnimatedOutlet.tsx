import { useState, useEffect } from 'react'
import { useLocation, useOutlet } from 'react-router'
import { AnimatePresence } from 'motion/react'
import PageTransition from './PageTransition'

/**
 * Congela el outlet durante la animación de salida.
 * Esto evita el "flash" de la nueva vista antes de que la vieja termine.
 */
export default function AnimatedOutlet() {
  const location = useLocation()
  const element = useOutlet()

  // El snapshot mantiene el elemento y el path actualmente mostrados
  const [snapshot, setSnapshot] = useState({
    path: location.pathname,
    element,
  })

  useEffect(() => {
    // Programamos la actualización para DESPUÉS del render.
    // Así AnimatePresence ya capturó el elemento viejo para animarlo.
    const id = setTimeout(() => {
      setSnapshot({ path: location.pathname, element })
    }, 0)
    return () => clearTimeout(id)
  }, [location.pathname, element])

  return (
    <AnimatePresence mode="wait" initial={false}>
      <PageTransition key={snapshot.path}>
        {snapshot.element}
      </PageTransition>
    </AnimatePresence>
  )
}