import { Link, useLocation } from 'react-router'
import { useState } from 'react'

const ROUTE_LABELS: Record<string, string> = {
  '/': 'Inicio',
  '/riesgos': 'Riesgos',
  '/impacto': 'Impacto',
  '/acceso': 'Acceso',
  '/habitos': 'Hábitos',
  '/soluciones': 'Soluciones',
  '/historias': 'Historias',
  '/mapa': 'Mapa',
}

export default function Footer() {
  const location = useLocation()
  const [audioOn, setAudioOn] = useState(false)

  const vistaActual = ROUTE_LABELS[location.pathname] ?? 'Página no encontrada'

  return (
    <footer className="relative shrink-0 z-[60] text-white">
      {/* Línea superior full-width */}
      <div className="h-px bg-white/50" />

      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between gap-4">

        {/* ─── Zona izquierda: audio + separador + vista ─── */}
        <div className="flex items-center gap-3">

          {/* Botón de audio */}
          <button
            type="button"
            onClick={() => setAudioOn((prev) => !prev)}
            aria-label={audioOn ? 'Apagar sonido' : 'Encender sonido'}
            title={audioOn ? 'Apagar sonido' : 'Encender sonido'}
            className="p-1.5 rounded hover:bg-white/10 transition text-white/70 hover:text-white"
          >
            {audioOn ? (
              // Ícono: sonido activado
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            ) : (
              // Ícono: sonido apagado
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="22" y1="9" x2="16" y2="15" />
                <line x1="16" y1="9" x2="22" y2="15" />
              </svg>
            )}
          </button>

          {/* Separador vertical (mismo alto que las líneas del HUD) */}
          <div className="h-5 w-px bg-white/30" />

          {/* Vista actual */}
          <div className="text-[11px] md:text-xs">
            <span className="text-white/50 uppercase tracking-wider">· </span>
            <span className="font-semibold text-white/90">{vistaActual}</span>
          </div>
        </div>

        {/* ─── Zona derecha: link a fuentes ─── */}
        <Link
          to="/fuentes"
          className="text-[11px] md:text-xs font-medium text-white/70 hover:text-amber-300 transition underline-offset-4 hover:underline"
        >
          Revisar fuentes →
        </Link>

      </div>
    </footer>
  )
}