import { Link, NavLink } from 'react-router'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { preloadablePages } from '../../App'

const navItems = [
  { to: '/', label: 'Inicio' },
  { to: '/riesgos', label: 'Riesgos' },
  { to: '/impacto', label: 'Impacto' },
  { to: '/acceso', label: 'Acceso' },
  { to: '/habitos', label: 'Hábitos' },
  { to: '/soluciones', label: 'Soluciones' },
  { to: '/historias', label: 'Historias' },
  { to: '/mapa', label: 'Mapa' },
]

const dropdownItems = navItems.filter((i) => i.to !== '/' && i.to !== '/mapa')

interface HeaderProps {
  progress: number
}

export default function Header({ progress }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  void progress

  const handlePreload = (path: string) => {
    const PageComponent = preloadablePages[path]
    if (PageComponent && typeof PageComponent.preload === 'function') {
      PageComponent.preload()
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setNavOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="relative z-50 shrink-0 text-white">

      {/* ─── DESKTOP (lg+) ─── */}
      <div className="hidden lg:flex items-stretch h-10">

        {/* Bloque blanco: ícono + nombre + líneas superior e inferior */}
        <div className="flex items-center gap-2 bg-white text-slate-900 pl-8 pr-5 shrink-0
                        border-t border-b border-white/50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-3.5 h-3.5 text-red-500"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-xs font-bold tracking-tight text-slate-900 hover:text-red-600 transition"
          >
            Punto Crítico
          </Link>
        </div>

        {/* Línea vertical divisoria izquierda */}
        <div className="w-px bg-white/50" />

        {/* GAP central: reservado para la figura del HUD */}
        <div className="flex-1" />

        {/* Línea vertical divisoria derecha */}
        <div className="w-px bg-white/50" />

        {/* Botones de navegación con líneas superior e inferior */}
        <div className="flex items-center gap-1 px-3 shrink-0
                        border-t border-b border-white/50">

          <NavLink
            to="/"
            onMouseEnter={() => handlePreload('/')}
            className={({ isActive }) =>
              `px-2 py-0.5 text-[10px] rounded transition ${isActive
                ? 'bg-blue-800 text-white font-semibold'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            Inicio
          </NavLink>

          <div ref={navRef} className="relative">
            <button
              type="button"
              onClick={() => setNavOpen((p) => !p)}
              onMouseEnter={() => setNavOpen(true)}
              className="px-2 py-0.5 text-[10px] rounded transition text-white/80 hover:bg-white/10 hover:text-white flex items-center gap-1"
            >
              Navegación
              <svg
                className={`w-2.5 h-2.5 transition-transform ${navOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <AnimatePresence>
              {navOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-3 w-44 rounded-lg shadow-2xl overflow-hidden
                             bg-slate-900/95 backdrop-blur-md border border-white/15 z-[70]"
                >
                  {dropdownItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setNavOpen(false)}
                      onMouseEnter={() => handlePreload(item.to)}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm transition ${isActive
                          ? 'bg-blue-800 text-white font-semibold'
                          : 'text-white/85 hover:bg-white/10 hover:text-white'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink
            to="/mapa"
            onMouseEnter={() => handlePreload('/mapa')}
            className={({ isActive }) =>
              `px-2 py-0.5 text-[10px] rounded transition ${isActive
                ? 'bg-blue-800 text-white font-semibold'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            Mapa
          </NavLink>
        </div>
      </div>

      {/* ─── MÓVIL (< lg) ─── */}
      <div className="lg:hidden flex items-center justify-between px-4 py-1">
        <div className="flex items-center gap-2 ml-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-3.5 h-3.5 text-red-500"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-xs font-bold tracking-tight text-white hover:text-amber-300 transition truncate max-w-[30vw]"
          >
            Punto Crítico
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          className="p-2 mr-1 rounded hover:bg-white/10 transition"
        >
          <div className="grid grid-cols-3 gap-[3px]">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="block w-[4px] h-[4px] rounded-full bg-white" />
            ))}
          </div>
        </button>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-nav"
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden absolute top-full right-3 mt-2 w-56 rounded-lg shadow-2xl overflow-hidden
                       bg-slate-900/95 backdrop-blur-md border border-white/15 z-[70]"
          >
            <ul className="flex flex-col py-1">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    onTouchStart={() => handlePreload(item.to)}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm transition ${isActive
                        ? 'bg-blue-800 text-white font-semibold'
                        : 'text-white/85 hover:bg-white/10 hover:text-white'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}