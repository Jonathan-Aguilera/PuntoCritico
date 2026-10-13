import { motion } from 'motion/react'
import { playSfx } from '../../lib/audio'

interface WelcomeScreenProps {
  onStart: () => void
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const handleStart = () => {
    // Reproducimos el "click" (o cualquier sonido corto) para desbloquear
    // el AudioContext del navegador en un gesto válido del usuario.
    playSfx('/sounds/sfx/click.mp3', 0.5)

    // Pequeño delay para que el gesto se registre antes de cambiar de fase
    setTimeout(() => {
      onStart()
    }, 200)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[210] bg-black flex flex-col items-center justify-center"
    >
      {/* Fondo espacial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(45deg, #0F0A33 0%, #1C2070 50%, #0F0A33 100%)',
          opacity: 0.5,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 100% 100%, rgba(190, 124, 45, 0.25) 0%, transparent 60%)',
        }}
      />

      {/* Contenido */}
      <div className="relative flex flex-col items-center px-6 text-center">
        {/* Ícono de corazón */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h-10 text-red-500"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </motion.div>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4"
        >
          Punto Crítico
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-slate-300 text-sm md:text-base max-w-md mb-12 leading-relaxed"
        >
          Un recorrido visual por la salud cardiovascular argentina.
        </motion.p>

        {/* Botón */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleStart}
          className="group relative px-8 py-3 bg-[#7BA8D9] text-slate-900 font-bold rounded-lg hover:bg-[#C8E0FF] transition shadow-[0_0_24px_rgba(123,168,217,0.4)] hover:shadow-[0_0_32px_rgba(123,168,217,0.6)]"
        >
          Iniciar experiencia
        </motion.button>

        {/* Nota de sonido */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="text-slate-500 text-[11px] mt-6 font-mono tracking-wider"
        >
          · Con sonido ·
        </motion.p>
      </div>
    </motion.div>
  )
}