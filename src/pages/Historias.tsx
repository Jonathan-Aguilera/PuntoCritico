import ViewContainer from '../components/ui/ViewContainer'
import FavaloroHero from '../components/historias/FavaloroHero'
import FavaloroTimeline from '../components/historias/FavaloroTimeline'
import FavaloroLegado from '../components/historias/FavaloroLegado'
import TestimonioCard from '../components/historias/TestimonioCard'
import { getFavaloro, getTestimonios } from '../data/services/historias.service'

interface HistoriasProps {
  preview?: boolean
}

// En preview mostramos solo esta cantidad de testimonios.
const PREVIEW_TESTIMONIOS = 3

export default function Historias({ preview = false }: HistoriasProps) {
  const favaloro = getFavaloro()
  const testimonios = getTestimonios()

  const testimoniosAMostrar = preview
    ? testimonios.slice(0, PREVIEW_TESTIMONIOS)
    : testimonios

  return (
    <ViewContainer>
      <section className="text-center mb-6">
        <h1
          className={`font-bold leading-[1.1] tracking-tight bg-linear-to-r from-[#7BA8D9] to-[#C8E0FF] bg-clip-text text-transparent ${
            preview
              ? 'text-3xl sm:text-4xl md:text-5xl'
              : 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl'
          }`}
        >
          {/* Título*/}
          Vidas detrás del dato
        </h1>
      </section>

      <p className="text-center text-base md:text-lg text-[#A5F3EA] max-w-3xl mx-auto mb-16 leading-relaxed">
        {/* Subtítulo*/}
        Detrás de cada estadística hay una vida. Y detrás de cada vida, una historia que vale contar.
      </p>

      {/* Favaloro completo solo en la vista dedicada */}
      {!preview && (
        <>
          <FavaloroHero data={favaloro} />
          <FavaloroTimeline biografia={favaloro.biografia_resumida} />
          <FavaloroLegado legado={favaloro.legado} />
        </>
      )}

      <section className={preview ? '' : 'pt-10 border-t border-[#4ECDC4]/20'}>
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[#4ECDC4] mb-3">
            Voces reales
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#A5F3EA] leading-tight">
            Lo que la gente vivió
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimoniosAMostrar.map((t, i) => (
            <TestimonioCard key={t.id} testimonio={t} index={i} />
          ))}
        </div>
      </section>

      {preview && (
        <div className="text-center mt-12">
          <a
            href="/historias"
            className="inline-block px-6 py-3 border border-[#7BA8D9]/40 text-[#7BA8D9] font-semibold rounded-lg hover:bg-[#7BA8D9]/10 transition"
          >
            Ver el homenaje completo y más testimonios →
          </a>
        </div>
      )}
    </ViewContainer>
  )
}