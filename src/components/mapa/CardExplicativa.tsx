import { motion, AnimatePresence } from 'motion/react'

export interface CardContenido {
  titulo: string
  texto: string
}

interface Props {
  card: CardContenido | null
  onClose: () => void
}

export default function CardExplicativa({ card, onClose }: Props) {
  return (
    <AnimatePresence>
      {card && (
        <motion.aside
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-20 right-6 z-50 w-85 max-w-[calc(100vw-3rem)]"
        >
          <div className="rounded-xl border border-[#4ECDC4]/30 bg-[#1A0B3D]/90 backdrop-blur-xl shadow-2xl overflow-hidden">
            <header className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
              <h3 className="flex-1 text-xs font-bold uppercase tracking-[0.2em] text-[#A5F3EA]">
                {card.titulo}
              </h3>
              <button type="button" onClick={onClose} aria-label="Cerrar"
                className="text-[#A5F3EA]/60 hover:text-[#A5F3EA] transition p-1">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </header>
            <div className="px-4 py-4 text-xs leading-relaxed text-[#A5F3EA]/85 whitespace-pre-line">
              {card.texto}
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}