import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = createRoot(document.getElementById('root')!)

// Ocultamos el splash estático cuando React empieza a montar
const splash = document.getElementById('boot-splash')
if (splash) {
  requestAnimationFrame(() => {
    splash.classList.add('hidden')
    // Lo removemos del DOM después de la transición
    setTimeout(() => splash.remove(), 500)
  })
}

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)