import { useEffect, useState } from 'react'

interface NavigatorWithConnection extends Navigator {
  connection?: {
    effectiveType?: string
    saveData?: boolean
    addEventListener?: (type: string, listener: () => void) => void
    removeEventListener?: (type: string, listener: () => void) => void
  }
}

// Función pura que evalúa las tres condiciones.
// Se llama una sola vez en el inicializador del useState.
function evaluateShouldReduce(): boolean {
  if (typeof window === 'undefined') return false

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  const nav = navigator as NavigatorWithConnection
  const conn = nav.connection

  return (
    motionQuery.matches ||
    conn?.effectiveType === '2g' ||
    conn?.effectiveType === 'slow-2g' ||
    conn?.saveData === true
  )
}

export function useShouldReduceMotion(): boolean {
  // Inicialización sincrónica: el primer render ya tiene el valor correcto.
  const [shouldReduce, setShouldReduce] = useState<boolean>(evaluateShouldReduce)

  useEffect(() => {
    // Solo nos suscribimos a cambios futuros (por ejemplo, si el usuario
    // activa "reducir movimiento" en su SO sin recargar la página).
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const nav = navigator as NavigatorWithConnection
    const conn = nav.connection

    const handleChange = () => setShouldReduce(evaluateShouldReduce())

    motionQuery.addEventListener('change', handleChange)
    conn?.addEventListener?.('change', handleChange)

    return () => {
      motionQuery.removeEventListener('change', handleChange)
      conn?.removeEventListener?.('change', handleChange)
    }
  }, [])

  return shouldReduce
}