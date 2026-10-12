import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  getPreguntas,
  shuffle,
  type Pregunta,
} from '../../data/services/habitos.service'

type Fase =
  | 'intro'
  | 'pregunta'
  | 'resultado'
  | 'compartir'
  | 'gracias'
  | 'rechazado'

const TOTAL_PREGUNTAS = 5

export default function EncuestaHabitos() {
  const [fase, setFase] = useState<Fase>('intro')
  const [preguntas, setPreguntas] = useState<Pregunta[]>([])
  const [indice, setIndice] = useState(0)
  const [seleccion, setSeleccion] = useState<number | null>(null)
  const [respuestasCorrectas, setRespuestasCorrectas] = useState(0)

  const iniciar = () => {
    const seleccionadas = shuffle(getPreguntas()).slice(0, TOTAL_PREGUNTAS)
    setPreguntas(seleccionadas)
    setIndice(0)
    setSeleccion(null)
    setRespuestasCorrectas(0)
    setFase('pregunta')
  }

  const responder = (i: number) => {
    if (seleccion !== null) return
    setSeleccion(i)
    if (i === preguntas[indice].correcta) {
      setRespuestasCorrectas((prev) => prev + 1)
    }
  }

  const siguiente = () => {
    if (indice + 1 < preguntas.length) {
      setIndice(indice + 1)
      setSeleccion(null)
    } else {
      setFase('resultado')
    }
  }

  const porcentaje = Math.round(
    (respuestasCorrectas / TOTAL_PREGUNTAS) * 100
  )

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl overflow-hidden mb-16">
      {/* Barra superior con título */}
      <div className="bg-emerald-500/15 border-b border-emerald-400/20 px-6 py-4 flex items-center justify-between">
        <h2 className="font-bold text-lg text-amber-300">
          ¿Cuánto sabés sobre tu corazón?
        </h2>
        {fase === 'pregunta' && (
          <span className="text-sm font-medium text-slate-300">
            {indice + 1} / {TOTAL_PREGUNTAS}
          </span>
        )}
      </div>

      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          {/* ─── INTRO ─── */}
          {fase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="text-center"
            >
              <p className="text-slate-200 mb-6 leading-relaxed">
                5 preguntas rápidas. Sin registros, sin datos personales. Solo
                para saber cuánto sabés sobre prevención cardiovascular.
              </p>
              <button
                onClick={iniciar}
                className="px-8 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-400 transition shadow-md"
              >
                Comenzar encuesta
              </button>
            </motion.div>
          )}

          {/* ─── PREGUNTA ─── */}
          {fase === 'pregunta' && preguntas[indice] && (
            <motion.div
              key={`pregunta-${indice}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-lg md:text-xl font-semibold text-white mb-6">
                {preguntas[indice].pregunta}
              </p>

              <div className="space-y-3 mb-5">
                {preguntas[indice].opciones.map((opcion, i) => {
                  const esCorrecta = i === preguntas[indice].correcta
                  const esSeleccionada = seleccion === i
                  const mostrar = seleccion !== null

                  let clase =
                    'w-full text-left px-4 py-3 rounded-lg border-2 transition font-medium text-sm md:text-base '

                  if (!mostrar) {
                    clase +=
                      'border-white/15 hover:border-emerald-400 hover:bg-emerald-500/10 text-slate-200'
                  } else if (esCorrecta) {
                    clase +=
                      'border-emerald-400 bg-emerald-500/15 text-emerald-200'
                  } else if (esSeleccionada) {
                    clase += 'border-red-400 bg-red-500/15 text-red-200'
                  } else {
                    clase += 'border-white/10 text-slate-500 opacity-60'
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => responder(i)}
                      disabled={mostrar}
                      className={clase}
                    >
                      {opcion}
                    </button>
                  )
                })}
              </div>

              {seleccion !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 border-l-4 border-emerald-400 p-4 rounded mb-5"
                >
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {preguntas[indice].explicacion}
                  </p>
                </motion.div>
              )}

              {seleccion !== null && (
                <div className="text-right">
                  <button
                    onClick={siguiente}
                    className="px-6 py-2.5 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-400 transition"
                  >
                    {indice + 1 < TOTAL_PREGUNTAS
                      ? 'Siguiente →'
                      : 'Ver resultado'}
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* ─── RESULTADO ─── */}
          {fase === 'resultado' && (
            <motion.div
              key="resultado"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <p className="text-sm uppercase tracking-wider text-slate-400 mb-2">
                Tu resultado
              </p>
              <p className="text-6xl md:text-7xl font-bold text-emerald-300 mb-3">
                {porcentaje}%
              </p>
              <p className="text-slate-200 mb-2">
                Respondiste correctamente{' '}
                <span className="font-bold text-white">
                  {respuestasCorrectas}
                </span>{' '}
                de{' '}
                <span className="font-bold text-white">{TOTAL_PREGUNTAS}</span>.
              </p>
              <p className="text-sm text-slate-400 italic mb-6 max-w-md mx-auto">
                No es una evaluación. Es una excusa para hablar de lo que
                importa.
              </p>
              <button
                onClick={() => setFase('compartir')}
                className="px-6 py-2.5 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-400 transition"
              >
                Continuar
              </button>
            </motion.div>
          )}

          {/* ─── COMPARTIR ─── */}
          {fase === 'compartir' && (
            <motion.div
              key="compartir"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <p className="text-white font-semibold text-lg mb-3">
                ¿Nos compartís tus respuestas?
              </p>
              <p className="text-sm text-slate-300 mb-6 max-w-md mx-auto leading-relaxed">
                Son 100% anónimas. Solo nos ayudan a entender cuánto se sabe
                sobre prevención cardiovascular en Argentina.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setFase('gracias')}
                  className="px-6 py-2.5 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-400 transition"
                >
                  Sí, compartir
                </button>
                <button
                  onClick={() => setFase('rechazado')}
                  className="px-6 py-2.5 border-2 border-white/20 text-slate-200 font-semibold rounded-lg hover:bg-white/10 transition"
                >
                  No, gracias
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── GRACIAS ─── */}
          {fase === 'gracias' && (
            <motion.div
              key="gracias"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <p className="text-2xl mb-2">❤️</p>
              <p className="text-lg font-semibold text-emerald-300">
                Gracias por participar
              </p>
              <p className="text-sm text-slate-400 mt-2">
                Tus respuestas fueron registradas de forma anónima.
              </p>
            </motion.div>
          )}

          {/* ─── RECHAZADO ─── */}
          {fase === 'rechazado' && (
            <motion.div
              key="rechazado"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <p className="text-lg font-semibold text-slate-200">
                No te preocupes
              </p>
              <p className="text-sm text-slate-400 mt-2">
                Tus respuestas no fueron guardadas. Podés seguir explorando.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}