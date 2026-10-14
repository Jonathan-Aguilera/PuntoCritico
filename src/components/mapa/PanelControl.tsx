import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

/* ═══════════════════════════════════════════════════════════
   ICONOS INLINE (sin dependencias externas)
   ═══════════════════════════════════════════════════════════ */

const IconMapPin = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const IconCalendar = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const IconHeart = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
)

const IconBars = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="20" x2="6" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="18" y1="20" x2="18" y2="14" />
  </svg>
)

const IconHeatmap = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
)

const IconPercent = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="5" x2="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
)

const IconChevron = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const IconFilter = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
)

const IconReset = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 3-6.7" />
    <polyline points="3 4 3 10 9 10" />
  </svg>
)

/* ═══════════════════════════════════════════════════════════
   TIPOS — reflejan la estructura del panel
   ═══════════════════════════════════════════════════════════ */

export type Visualizacion = 'barras' | 'calor' | 'comparacion'

/** Filtros que el panel controla y notifica hacia afuera */
export interface FiltrosMapa {
  provincias: string[]
  region: string
  modoAnio: 'unico' | 'rango'
  anios: number[]
  comparar: boolean
  enfermedad: string
  indicador: string
  viz: Visualizacion
}

/** Opciones disponibles que el panel renderiza (vienen de afuera) */
export interface OpcionesPanel {
  provincias: string[]
  regiones: string[]
  anios: number[]
  enfermedades: string[]
  indicadores: string[]
}

interface PanelControlProps {
  /** Opciones a mostrar en cada filtro */
  opciones: OpcionesPanel
  /** Filtros actuales */
  filtros: FiltrosMapa
  /** Callback cuando cambia cualquier filtro */
  onChange: (filtros: FiltrosMapa) => void
}

/* ═══════════════════════════════════════════════════════════
   SUB-COMPONENTES INTERNOS
   ═══════════════════════════════════════════════════════════ */

function Seccion({
  titulo,
  icono,
  children,
  defaultOpen = false,
}: {
  titulo: string
  icono: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2.5 px-4 py-3 text-left hover:bg-white/5 transition"
      >
        <span className="text-[#FFC93C]">{icono}</span>
        <span className="flex-1 text-xs font-bold uppercase tracking-[0.15em] text-[#A5F3EA]">
          {titulo}
        </span>
        <span
          className={`text-[#A5F3EA]/60 transition-transform duration-200 ${open ? 'rotate-180' : ''
            }`}
        >
          <IconChevron />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Chip({
  label,
  active = false,
  onClick,
}: {
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all duration-150 ${active
        ? 'bg-[#4ECDC4]/20 border-[#4ECDC4]/60 text-[#A5F3EA]'
        : 'border-white/15 text-[#A5F3EA]/70 hover:border-[#4ECDC4]/40 hover:text-[#A5F3EA]'
        }`}
    >
      {label}
    </button>
  )
}

function Select({
  value,
  onChange,
  options,
  label,
}: {
  value: string
  onChange?: (v: string) => void
  options: string[]
  label?: string
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-[10px] uppercase tracking-wider text-[#A5F3EA]/60 font-semibold">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full appearance-none bg-white/5 border border-white/15 rounded-md
                     px-3 py-2 pr-8 text-xs text-[#A5F3EA]
                     focus:outline-none focus:border-[#4ECDC4]/60 focus:bg-white/10
                     transition cursor-pointer"
        >
          {options.map((o) => (
            <option key={o} value={o} className="bg-[#241058] text-[#A5F3EA]">
              {o}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A5F3EA]/50">
          <IconChevron className="w-3 h-3" />
        </span>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
   ═══════════════════════════════════════════════════════════ */

export default function PanelControl({
  opciones,
  filtros,
  onChange,
}: PanelControlProps) {
  const [panelOpen, setPanelOpen] = useState(true)

  /** Helper: actualiza un campo parcial de los filtros */
  const update = <K extends keyof FiltrosMapa>(key: K, value: FiltrosMapa[K]) => {
    onChange({ ...filtros, [key]: value })
  }

  const toggleProvincia = (p: string) => {
    const next = filtros.provincias.includes(p)
      ? filtros.provincias.filter((x) => x !== p)
      : [...filtros.provincias, p]
    update('provincias', next)
  }

  const toggleAnio = (a: number) => {
    if (filtros.modoAnio === 'unico') {
      update('anios', [a])
    } else {
      const next = filtros.anios.includes(a)
        ? filtros.anios.filter((x) => x !== a)
        : [...filtros.anios, a].sort()
      update('anios', next)
    }
  }

  const reset = () => {
    onChange({
      provincias: [],
      region: opciones.regiones[0] ?? '',
      modoAnio: 'unico',
      anios: [opciones.anios[opciones.anios.length - 1]],
      comparar: false,
      enfermedad: opciones.enfermedades[0] ?? '',
      indicador: opciones.indicadores[0] ?? '',
      viz: 'barras',
    })
  }

  return (
    <>
      {/* ── Botón flotante para reabrir cuando está cerrado ── */}
      <AnimatePresence>
        {!panelOpen && (
          <motion.button
            key="open-panel"
            type="button"
            onClick={() => setPanelOpen(true)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-14 z-40 flex items-center gap-2
                bg-[#241058]/85 backdrop-blur-md border border-[#4ECDC4]/30
                  rounded-lg px-3 py-2 text-[#A5F3EA] text-xs font-semibold
                hover:border-[#4ECDC4]/60 hover:bg-[#241058] transition shadow-xl"
          >
            <IconFilter />
            Panel de control
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Panel ── */}
      <AnimatePresence>
        {panelOpen && (
          <motion.aside
            key="panel"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 left-14 z-40
                        w-[320px] max-w-[calc(100vw-2rem)]
                        h-[calc(100vh-9rem)] max-h-[calc(100vh-9rem)]
                       flex flex-col rounded-xl overflow-hidden
                       bg-[#1A0B3D]/85 backdrop-blur-xl
                       border border-[#4ECDC4]/25 shadow-2xl"
          >
            {/* Header */}
            <header className="shrink-0 flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
              <span className="text-[#4ECDC4]">
                <IconFilter />
              </span>
              <h2 className="flex-1 text-xs font-bold uppercase tracking-[0.2em] text-[#A5F3EA]">
                Panel de control
              </h2>
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                aria-label="Cerrar panel"
                className="text-[#A5F3EA]/60 hover:text-[#A5F3EA] transition p-1"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </header>

            {/* Cuerpo scrolleable */}
            <div className="flex-1 min-h-0 overflow-y-auto">
              {/* ── Territorio ── */}
              <Seccion titulo="Territorio" icono={<IconMapPin />} defaultOpen>
                <div className="space-y-2 mt-1">
                  <label className="block text-[10px] uppercase tracking-wider text-[#A5F3EA]/60 font-semibold">
                    Región
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {opciones.regiones.map((r) => (
                      <Chip
                        key={r}
                        label={r}
                        active={filtros.region === r}
                        onClick={() => update('region', r)}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 pb-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] uppercase tracking-wider text-[#A5F3EA]/60 font-semibold">
                      Provincias
                    </label>
                    <button
                      type="button"
                      onClick={() => update('provincias', [])}
                      className="text-[10px] text-[#4ECDC4] hover:text-[#A5F3EA] transition"
                    >
                      Limpiar
                    </button>
                  </div>
                  <div className="max-h-44 overflow-y-auto rounded-md border border-white/10 bg-white/2 p-1">
                    {opciones.provincias.map((p) => {
                      const activa = filtros.provincias.includes(p)
                      return (
                        <label
                          key={p}
                          className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer text-xs transition
                            ${activa ? 'bg-[#4ECDC4]/10 text-[#A5F3EA]' : 'text-[#A5F3EA]/70 hover:bg-white/5'}`}
                        >
                          <span
                            className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center transition
                              ${activa ? 'bg-[#4ECDC4] border-[#4ECDC4]' : 'border-white/30'}`}
                          >
                            {activa && (
                              <svg className="w-2.5 h-2.5 text-[#0E2B28]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </span>
                          <input
                            type="checkbox"
                            checked={activa}
                            onChange={() => toggleProvincia(p)}
                            className="sr-only"
                          />
                          <span>{p}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              </Seccion>

              {/* ── Tiempo ── */}
              <Seccion titulo="Tiempo" icono={<IconCalendar />}>
                <div className="flex items-center gap-1 p-0.5 rounded-md bg-white/5 border border-white/10 mt-1">
                  {(['unico', 'rango'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        update('modoAnio', m)
                        if (m === 'unico') {
                          update('anios', [filtros.anios[0] ?? opciones.anios[0]])
                        }
                      }}
                      className={`flex-1 py-1.5 rounded text-[11px] font-semibold transition
                        ${filtros.modoAnio === m
                          ? 'bg-[#4ECDC4]/20 text-[#A5F3EA]'
                          : 'text-[#A5F3EA]/60 hover:text-[#A5F3EA]'}`}
                    >
                      {m === 'unico' ? 'Un año' : 'Rango'}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {opciones.anios.map((a) => (
                    <Chip
                      key={a}
                      label={String(a)}
                      active={filtros.anios.includes(a)}
                      onClick={() => toggleAnio(a)}
                    />
                  ))}
                </div>

                <label className="flex items-center gap-2 pt-2 pb-2 cursor-pointer text-xs text-[#A5F3EA]/80">
                  <span
                    className={`w-7 h-4 rounded-full p-0.5 transition
                      ${filtros.comparar ? 'bg-[#C430E3]' : 'bg-white/15'}`}
                  >
                    <span
                      className={`block w-3 h-3 rounded-full bg-white transition-transform
                        ${filtros.comparar ? 'translate-x-3' : 'translate-x-0'}`}
                    />
                  </span>
                  <input
                    type="checkbox"
                    checked={filtros.comparar}
                    onChange={(e) => update('comparar', e.target.checked)}
                    className="sr-only"
                  />
                  Modo comparación (A vs B)
                </label>
              </Seccion>

              {/* ── Tema ── */}
              <Seccion titulo="Tema" icono={<IconHeart />}>
                <div className="mt-1">
                  <Select
                    label="Tipo de enfermedad"
                    value={filtros.enfermedad}
                    onChange={(v) => update('enfermedad', v)}
                    options={opciones.enfermedades}
                  />
                </div>
                <div className="pb-2">
                  <Select
                    label="Indicador a mostrar"
                    value={filtros.indicador}
                    onChange={(v) => update('indicador', v)}
                    options={opciones.indicadores}
                  />
                </div>
              </Seccion>

              {/* ── Visualización (cerrada por defecto) ── */}
              <Seccion titulo="Visualización" icono={<IconBars />} defaultOpen={false}>
                <div className="grid grid-cols-3 gap-1.5 mt-1 pb-2">
                  {([
                    { id: 'barras', label: 'Barras', icon: <IconBars /> },
                    { id: 'calor', label: 'Calor', icon: <IconHeatmap /> },
                    { id: 'comparacion', label: 'Porcentaje', icon: <IconPercent /> },
                  ] as const).map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => update('viz', v.id)}
                      className={`flex flex-col items-center gap-1 py-2 rounded-md border transition-all duration-150
          ${filtros.viz === v.id
                          ? 'bg-[#4ECDC4]/15 border-[#4ECDC4]/60 text-[#A5F3EA]'
                          : 'border-white/10 text-[#A5F3EA]/60 hover:border-[#4ECDC4]/30 hover:text-[#A5F3EA]'}`}
                    >
                      {v.icon}
                      <span className="text-[10px] font-semibold">{v.label}</span>
                    </button>
                  ))}
                </div>
              </Seccion>

              {/* ── Reset ── */}
              <div className="p-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={reset}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-md
                             border border-white/10 text-[#A5F3EA]/70 text-xs font-semibold
                             hover:border-[#C430E3]/40 hover:text-[#A5F3EA] hover:bg-white/5 transition"
                >
                  <IconReset />
                  Restablecer filtros
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}