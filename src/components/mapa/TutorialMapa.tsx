import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

/* ═══════════════════════════════════════════════════════════
   STORAGE KEY — sessionStorage se limpia al cerrar el tab.
   Si querés que se muestre UNA SOLA VEZ y nunca más,
   cambiá sessionStorage por localStorage acá y abajo.
   ═══════════════════════════════════════════════════════════ */
const STORAGE_KEY = 'mapa_tutorial_shown'

/* ═══════════════════════════════════════════════════════════
   ICONOS
   ═══════════════════════════════════════════════════════════ */

const IconRotate = ({ className = 'w-10 h-10' }: { className?: string }) => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {/* Flecha circular */}
        <path d="M21 12a9 9 0 1 1-3-6.7" />
        <polyline points="21 3 21 9 15 9" />
        {/* Punto central (pivote) */}
        <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </svg>
)

const IconPan = ({ className = 'w-10 h-10' }: { className?: string }) => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {/* Cruz de flechas */}
        <polyline points="5 9 2 12 5 15" />
        <polyline points="9 5 12 2 15 5" />
        <polyline points="15 19 12 22 9 19" />
        <polyline points="19 9 22 12 19 15" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="12" y1="2" x2="12" y2="22" />
    </svg>
)

const IconWheel = ({ className = 'w-10 h-10' }: { className?: string }) => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {/* Cuerpo del mouse */}
        <rect x="7" y="3" width="10" height="18" rx="5" />
        {/* Rueda */}
        <line x1="12" y1="7" x2="12" y2="10.5" />
        {/* Pequeñas flechas arriba/abajo */}
        <polyline points="9.5 5 12 2.5 14.5 5" opacity="0.5" />
        <polyline points="9.5 19 12 21.5 14.5 19" opacity="0.5" />
    </svg>
)

const IconClickProvincia = ({ className = 'w-4 h-4' }: { className?: string }) => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M9 3v18l4-4 3 7 3-1.5-3-7h6L9 3Z" />
    </svg>
)

/* ═══════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
   ═══════════════════════════════════════════════════════════ */

export default function TutorialMapa() {
    const [isOpen, setIsOpen] = useState(false)

    /* ── Auto-open la primera vez (solo lg+) ── */
    useEffect(() => {
        if (window.innerWidth < 1024) return

        const shown = sessionStorage.getItem(STORAGE_KEY)
        if (shown) return

        const t = setTimeout(() => setIsOpen(true), 1000)
        return () => clearTimeout(t)
    }, [])

    /* ── Listener para re-abrir desde el header ── */
    useEffect(() => {
        const handler = () => {
            if (window.innerWidth >= 1024) setIsOpen(true)
        }
        window.addEventListener('mapa-tutorial-open', handler)
        return () => window.removeEventListener('mapa-tutorial-open', handler)
    }, [])

    const handleClose = () => {
        setIsOpen(false)
        sessionStorage.setItem(STORAGE_KEY, 'true')
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={handleClose}
                    className="fixed inset-0 z-[80] hidden lg:flex items-center justify-center
                     bg-[#0E0A1F]/85 backdrop-blur-md px-6"
                >
                    <motion.div
                        initial={{ scale: 0.94, y: 24, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.94, y: 24, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-3xl w-full rounded-2xl overflow-hidden
                       bg-[#1A0B3D]/95 backdrop-blur-xl
                       border border-[#4ECDC4]/30 shadow-2xl"
                    >
                        {/* Glow decorativo */}
                        <div
                            className="pointer-events-none absolute inset-0 opacity-40"
                            style={{
                                background:
                                    'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(78, 205, 196, 0.25) 0%, transparent 70%)',
                            }}
                        />

                        <div className="relative p-8 md:p-10">
                            {/* ── Header ── */}
                            <div className="text-center mb-8">
                                <p className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#FFC93C] mb-3">
                                    Antes de empezar
                                </p>
                                <h2 className="text-2xl md:text-3xl font-bold text-[#A5F3EA] leading-tight">
                                    Cómo explorar el mapa
                                </h2>
                                <p className="text-sm text-[#A5F3EA]/70 mt-2">
                                    Tres gestos simples para moverte por el territorio.
                                </p>
                            </div>

                            {/* ── 3 Cards ── */}
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                <CardInstruccion
                                    icon={<IconRotate className="w-10 h-10" />}
                                    titulo="Click izquierdo"
                                    descripcion="Girar la vista"
                                />
                                <CardInstruccion
                                    icon={<IconPan className="w-10 h-10" />}
                                    titulo="Click derecho"
                                    descripcion="Desplazar el mapa"
                                />
                                <CardInstruccion
                                    icon={<IconWheel className="w-10 h-10" />}
                                    titulo="Rueda"
                                    descripcion="Acercar o alejar"
                                />
                            </div>

                            {/* ── Nota provincia ── */}
                            <div className="flex items-center justify-center gap-2 mb-8
                              text-sm text-[#A5F3EA]/80">
                                <span className="text-[#4ECDC4]">
                                    <IconClickProvincia />
                                </span>
                                <span>
                                    <span className="font-semibold text-[#A5F3EA]">Click</span> sobre una
                                    provincia para seleccionarla.
                                </span>
                            </div>

                            {/* ── Botón grande ── */}
                            <div className="flex justify-center">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="px-10 py-3.5 rounded-lg
                             bg-[#4ECDC4] text-[#0E2B28]
                             font-bold text-base tracking-wide
                             hover:bg-[#5FDFD6] hover:scale-[1.02]
                             active:scale-[0.98]
                             transition-all duration-200
                             shadow-[0_0_28px_rgba(78,205,196,0.45)]
                             hover:shadow-[0_0_40px_rgba(78,205,196,0.65)]"
                                >
                                    Entendido, ¡vamos!
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

/* ═══════════════════════════════════════════════════════════
   SUB-COMPONENTE: CARD DE INSTRUCCIÓN
   ═══════════════════════════════════════════════════════════ */

function CardInstruccion({
    icon,
    titulo,
    descripcion,
}: {
    icon: React.ReactNode
    titulo: string
    descripcion: string
}) {
    return (
        <div className="flex flex-col items-center text-center gap-3
                    p-5 rounded-xl
                    bg-white/5 border border-[#4ECDC4]/20
                    hover:bg-white/[0.07] hover:border-[#4ECDC4]/40
                    transition-colors duration-200">
            <span className="text-[#4ECDC4]">{icon}</span>
            <div>
                <p className="text-sm font-bold text-[#A5F3EA] leading-tight">
                    {titulo}
                </p>
                <p className="text-xs text-[#A5F3EA]/60 mt-1 leading-snug">
                    {descripcion}
                </p>
            </div>
        </div>
    )
}