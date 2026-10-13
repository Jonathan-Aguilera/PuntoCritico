import { Link, useLocation } from 'react-router'
import { useSound as useSoundControl } from '../../contexts/SoundContext'

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
  const { musicEnabled, sfxEnabled, toggleMusic, toggleSfx } = useSoundControl()

  const vistaActual = ROUTE_LABELS[location.pathname] ?? 'Página no encontrada'

  const handleRestart = () => {
    window.dispatchEvent(new Event('trigger-intro'))
  }

  return (
    <footer className="relative shrink-0 z-[60] text-white">
      <div className="h-px bg-white/50" />

      <div id="tutorial-footer"
        className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between gap-4">

        {/* ─── Zona izquierda: música + sfx + separador + vista ─── */}
        <div className="flex items-center gap-3">

          {/* Botón música */}
          <button
            type="button"
            onClick={toggleMusic}
            aria-label={musicEnabled ? 'Apagar música' : 'Encender música'}
            title={musicEnabled ? 'Apagar música' : 'Encender música'}
            className="p-1.5 rounded hover:bg-white/10 transition text-white/70 hover:text-white"
          >
            {musicEnabled ? (
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
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            ) : (
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
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
                <line x1="2" y1="2" x2="22" y2="22" />
              </svg>
            )}
          </button>

          {/* Botón efectos de sonido */}
          <button
            type="button"
            onClick={toggleSfx}
            aria-label={sfxEnabled ? 'Apagar sonidos' : 'Encender sonidos'}
            title={sfxEnabled ? 'Apagar sonidos' : 'Encender sonidos'}
            className="p-1.5 rounded hover:bg-white/10 transition text-white/70 hover:text-white"
          >
            {sfxEnabled ? (
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

          {/* Separador vertical */}
          <div className="h-5 w-px bg-white/30" />

          {/* Vista actual */}
          <div className="text-[11px] md:text-xs">
            <span className="text-white/50 uppercase tracking-wider">· </span>
            <span className="font-semibold text-white/90">{vistaActual}</span>
          </div>
        </div>

        {/* ─── Zona derecha: reiniciar + fuentes ─── */}
        <div className="flex items-center gap-3">
          {/* Botón reiniciar experiencia */}
          <button
            id="tutorial-restart"
            type="button"
            onClick={handleRestart}
            aria-label="Reiniciar experiencia"
            title="Volver a ver la intro"
            className="flex items-center gap-1.5 text-[11px] md:text-xs font-medium text-white/70 hover:text-amber-300 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            <span className="hidden sm:inline">Reiniciar</span>
          </button>

          <div className="h-5 w-px bg-white/30" />

          <Link
            to="/fuentes"
            className="text-[11px] md:text-xs font-medium text-white/70 hover:text-amber-300 transition underline-offset-4 hover:underline"
          >
            Revisar fuentes →
          </Link>
        </div>

      </div>
    </footer>
  )
}