import { Link, NavLink } from 'react-router'
import { useState, useEffect } from 'react'
import { preloadablePages } from '../../App'

const navItems = [
  { to: '/riesgos', label: 'Riesgos' },
  { to: '/impacto', label: 'Impacto' },
  { to: '/acceso', label: 'Acceso' },
  { to: '/habitos', label: 'Hábitos' },
  { to: '/soluciones', label: 'Soluciones' },
  { to: '/historias', label: 'Historias' },
  { to: '/mapa', label: 'Mapa' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

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

  return (
    <header className="bg-amber-950 text-amber-50 shadow-lg relative z-50 shrink-0">
      {/* Padding vertical aumenta con el tamaño de pantalla */}
      <div className="max-w-7xl mx-auto px-4 py-4 xl:py-5 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="text-lg xl:text-xl font-bold tracking-tight hover:text-amber-300 transition shrink-0"
        >
          Corazón Salado <span className="text-red-500">❤</span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden lg:flex flex-wrap items-center gap-1.5 xl:gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onMouseEnter={() => handlePreload(item.to)}
              onFocus={() => handlePreload(item.to)}
              className={({ isActive }) =>
                `px-3 py-2 text-sm rounded transition
                 xl:px-4 xl:py-2.5 xl:text-base
                 ${
                   isActive
                     ? 'bg-amber-700 text-white font-semibold'
                     : 'text-amber-100 hover:bg-amber-800'
                 }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Botón hamburguesa */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          className="lg:hidden p-2 rounded hover:bg-amber-800 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <nav
          id="mobile-nav"
          className="lg:hidden absolute top-full left-0 right-0 border-t border-amber-900 bg-amber-950 shadow-lg"
        >
          <ul className="flex flex-col py-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  onTouchStart={() => handlePreload(item.to)}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-base transition ${
                      isActive
                        ? 'bg-amber-700 text-white font-semibold'
                        : 'text-amber-100 hover:bg-amber-800'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}