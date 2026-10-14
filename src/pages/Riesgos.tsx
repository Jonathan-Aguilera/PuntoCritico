import ViewContainer from '../components/ui/ViewContainer'
import RiesgoCard from '../components/riesgo/RiesgoCard'
import { getFactores } from '../data/services/riesgos.service'

interface RiesgosProps {
  preview?: boolean
}

export default function Riesgos({ preview = false }: RiesgosProps) {
  const todos = getFactores()
  const factores = preview ? todos.slice(0, 6) : todos

  return (
    <ViewContainer>
      {/* ── Título grande con degradado ── */}
      <section className="text-center mb-6">
        <h1
          className={`font-bold leading-[1.1] tracking-tight bg-gradient-to-r from-[#7BA8D9] to-[#C8E0FF] bg-clip-text text-transparent ${
            preview
              ? 'text-3xl sm:text-4xl md:text-5xl'
              : 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl'
          }`}
        >
          ¿Cuánto sabés del riesgo?
        </h1>
      </section>

      {/* ── Subtítulo ── */}
      <p className="text-center text-base md:text-lg text-slate-200 max-w-3xl mx-auto mb-16 leading-relaxed">
        La mayoría cree que los problemas del corazón aparecen por mala suerte o
        por la edad. Los datos cuentan otra historia: hay factores concretos,
        medibles, que están jugando en contra de millones de argentinos todos
        los días.
      </p>

      {/* ── Lista de tarjetas a todo el ancho ── */}
      <div className="space-y-8">
        {factores.map((factor, i) => (
          <RiesgoCard
            key={factor.id}
            factor={factor}
            accentColor="#7BA8D9"
            index={i}
          />
        ))}
      </div>

      {/* ── Cierre narrativo (puente al Impacto) ── */}
      <section className="mt-16 max-w-3xl mx-auto">
        <div className="h-px bg-white/10 mb-10 mx-auto w-24" />
        <p className="text-lg md:text-xl text-slate-100 leading-relaxed mb-4 text-justify">
          La enfermedad cardiovascular no es solo genética, ni solo edad, ni
          solo mala suerte. Es lo que comemos, cómo dormimos, cuánto nos
          movemos, cuánto nos estresamos, lo que creemos saber y lo que nunca
          nos contaron. Cada uno de esos factores tiene un peso. Y ese peso,
          cuando se suma, deja de ser invisible.
        </p>
        <p className="text-base md:text-lg text-amber-300 font-semibold mt-6 text-center">
          La pregunta ya no es quién corre riesgo. Es cuánto está costando.
        </p>
      </section>

      {/* ── CTA al final, solo en preview ── */}
      {preview && (
        <div className="text-center mt-12">
          <a
            href="/riesgos"
            className="inline-block px-6 py-3 border border-[#7BA8D9]/40 text-[#7BA8D9] font-semibold rounded-lg hover:bg-[#7BA8D9]/10 transition"
          >
            Ver todos los factores →
          </a>
        </div>
      )}
    </ViewContainer>
  )
}