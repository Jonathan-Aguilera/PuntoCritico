import { Link, NavLink } from 'react-router'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { preloadablePages } from '../../App'
import { playSfx } from '../../lib/audio'
import { useSound as useSoundControl } from '../../contexts/SoundContext'
import logo from '../../assets/logo.png'

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
  const { sfxEnabled } = useSoundControl()

  void progress

  const handlePreload = (path: string) => {
    const PageComponent = preloadablePages[path]
    if (PageComponent && typeof PageComponent.preload === 'function') {
      PageComponent.preload()
    }
  }

  const handleHover = (path: string) => {
    if (sfxEnabled) playSfx('/sounds/sfx/hover.mp3', 0.7)
    handlePreload(path)
  }

  const handleClick = () => {
    if (sfxEnabled) playSfx('/sounds/sfx/click.mp3', 0.5)
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
    <header className="relative z-50 shrink-0 text-white font-['Orbitron']">

      {/* ─── DESKTOP (lg+) ─── */}
      <div id="tutorial-navbar" className="hidden lg:flex items-stretch h-10">

        {/* Bloque blanco: logo + separador + texto */}
        <div className="flex items-center bg-white shrink-0 border-b border-white/50 pl-8 pr-6 py-1">
          <Link
            to="/"
            onMouseEnter={() => {
              if (sfxEnabled) playSfx('/sounds/sfx/hover.mp3', 0.7)
            }}
            onClick={() => {
              handleClick()
              setIsOpen(false)
            }}
            className="flex items-center gap-2"
          >
            {/* Logo */}
            <img
              src={logo}
              alt="Punto Crítico"
              className="h-8 w-auto object-contain"
            />

            {/* Separador vertical */}
            <div className="h-5 w-px bg-slate-300" />

            {/* Texto */}
            <span className="font-['Orbitron'] text-sm font-bold tracking-tight text-slate-900 lowercase">
              punto critico
            </span>
          </Link>
        </div>

        <div className="w-px bg-white/50" />
        <div className="flex-1" />
        <div className="w-px bg-white/50" />

        {/* Botones de navegación */}
        <div className="flex items-center gap-1 px-3 shrink-0 border-b border-white/50">

          <NavLink
            to="/"
            onMouseEnter={() => handleHover('/')}
            onClick={handleClick}
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
              onClick={() => {
                handleClick()
                setNavOpen((p) => !p)
              }}
              onMouseEnter={() => {
                if (sfxEnabled) playSfx('/sounds/sfx/hover.mp3', 0.7)
                setNavOpen(true)
              }}
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
                      onMouseEnter={() => handleHover(item.to)}
                      onClick={() => {
                        handleClick()
                        setNavOpen(false)
                      }}
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
            onMouseEnter={() => handleHover('/mapa')}
            onClick={handleClick}
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

      {/* ─── MÓVIL / TABLET (< lg) ─── */}
      <div id="tutorial-navbar" className="lg:hidden flex items-center justify-between">

        {/* Bloque blanco: logo + separador + texto (misma forma que desktop) */}
        <div className="flex items-center bg-white shrink-0 border-b border-white/50 pl-8 pr-5 py-1">
          <Link
            to="/"
            onClick={() => {
              handleClick()
              setIsOpen(false)
            }}
            className="flex items-center gap-2"
          >
            {/* Logo */}
            <img
              src={logo}
              alt="Punto Crítico"
              className="h-8 w-auto object-contain"
            />

            {/* Separador vertical */}
            <div className="h-5 w-px bg-slate-300" />

            {/* Texto */}
            <span className="font-['Orbitron'] text-sm font-bold tracking-tight text-slate-900 lowercase">
              punto critico
            </span>
          </Link>
        </div>

        {/* Botón hamburguesa */}
        <button
          type="button"
          onClick={() => {
            handleClick()
            setIsOpen((prev) => !prev)
          }}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          className="p-2 mr-4 rounded hover:bg-white/10 transition"
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
                    onClick={() => {
                      handleClick()
                      setIsOpen(false)
                    }}
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