import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const STORAGE_KEY = 'tutorial_seen'

interface Step {
    targetId: string
    title: string
    text: string
    position: 'top' | 'bottom'
}

const STEPS: Step[] = [
    {
        targetId: 'tutorial-navbar',
        title: 'Tu punto de partida',
        text: 'Esta es la navegación principal. Desde acá podés recorrer todas las secciones del proyecto. El botón "Mapa" te lleva al panel interactivo con datos por provincia.',
        position: 'bottom',
    },
    {
        targetId: 'tutorial-footer',
        title: 'Controlá tu experiencia',
        text: 'En la barra inferior podés activar o silenciar la música y los efectos de sonido. También ves en qué sección estás parado, en todo momento.',
        position: 'top',
    },
    {
        targetId: 'tutorial-restart',
        title: 'Volvé a empezar',
        text: 'Si en algún momento querés revivir la introducción, este botón reinicia la experiencia completa desde el inicio.',
        position: 'top',
    },
]

export default function Tutorial() {
    const [step, setStep] = useState(0)
    const [visible, setVisible] = useState(false)
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null)

    // Comprobamos en mount si hay que mostrar el tutorial
    useEffect(() => {
        if (typeof window === 'undefined') return
        if (localStorage.getItem(STORAGE_KEY) === 'true') return
        setVisible(true)
    }, [])

    // Cuando cambia el step, actualizamos la posición del target
    useEffect(() => {
        if (!visible) return
        const stepData = STEPS[step]
        const el = document.getElementById(stepData.targetId)
        if (!el) {
            // Si no existe (por ejemplo, no está en esa vista), saltamos el paso
            nextStep()
            return
        }
        setTargetRect(el.getBoundingClientRect())

        // Recalculamos si cambia el tamaño de la ventana
        const handleResize = () => setTargetRect(el.getBoundingClientRect())
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step, visible])

    const finish = () => {
        localStorage.setItem(STORAGE_KEY, 'true')
        setVisible(false)
    }

    const nextStep = () => {
        if (step + 1 >= STEPS.length) {
            finish()
        } else {
            setStep((s) => s + 1)
        }
    }

    if (!visible || !targetRect) return null

    const currentStep = STEPS[step]

    // Calculamos la posición de la tarjeta según el step
    const tooltipTop =
        currentStep.position === 'bottom'
            ? targetRect.bottom + 16
            : targetRect.top - 200 // 200px aprox de alto de la tarjeta

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="tutorial"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[300]"
                >
                    {/* Fondo oscuro (sin blur) */}
                    <div className="absolute inset-0 bg-black/70" />

                    {/* Spotlight sobre el elemento señalado */}
                    <motion.div
                        key={`spotlight-${step}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute rounded-lg pointer-events-none"
                        style={{
                            top: targetRect.top - 8,
                            left: targetRect.left - 8,
                            width: targetRect.width + 16,
                            height: targetRect.height + 16,
                            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7)',
                            border: '2px solid rgba(123, 168, 217, 0.6)',
                        }}
                    />

                    {/* Tarjeta del tutorial */}
                    <motion.div
                        key={`card-${step}`}
                        initial={{ opacity: 0, y: currentStep.position === 'bottom' ? -10 : 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute w-[340px] max-w-[calc(100vw-32px)] bg-slate-900/95 backdrop-blur-md rounded-xl border border-white/15 shadow-2xl p-5"
                        style={{
                            top: tooltipTop,
                            left: Math.max(
                                16,
                                Math.min(
                                    window.innerWidth - 356,
                                    targetRect.left + targetRect.width / 2 - 170
                                )
                            ),
                        }}
                    >
                        {/* Indicador de paso */}
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#7BA8D9] font-semibold mb-2">
                            Paso {step + 1} de {STEPS.length}
                        </p>

                        <h3 className="text-base font-bold text-white mb-2">
                            {currentStep.title}
                        </h3>

                        <p className="text-xs text-slate-300 leading-relaxed mb-5">
                            {currentStep.text}
                        </p>

                        {/* Botones */}
                        <div className="flex items-center justify-between">
                            <button
                                onClick={finish}
                                className="text-xs text-slate-400 hover:text-white transition"
                            >
                                Omitir
                            </button>
                            <button
                                onClick={nextStep}
                                className="px-4 py-1.5 bg-[#7BA8D9] text-slate-900 text-xs font-bold rounded-lg hover:bg-[#C8E0FF] transition"
                            >
                                {step + 1 === STEPS.length ? 'Listo' : 'Siguiente'}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}