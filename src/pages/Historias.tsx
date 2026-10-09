import ViewContainer from '../components/ui/ViewContainer'
import FavaloroHero from '../components/historias/FavaloroHero'
import FavaloroTimeline from '../components/historias/FavaloroTimeline'
import FavaloroLegado from '../components/historias/FavaloroLegado'
import TestimonioCard from '../components/historias/TestimonioCard'
import { getFavaloro, getTestimonios } from '../data/services/historias.service'

export default function Historias() {
  const favaloro = getFavaloro()
  const testimonios = getTestimonios()

  return (
    <ViewContainer title="Historias" color="purple">

      {/* ── Intro ── */}
      <p className="text-lg md:text-xl text-slate-900 leading-relaxed text-center max-w-3xl mx-auto mb-10">
        Detrás de cada estadística hay una vida. Detrás de cada vida, una
        historia. Y detrás de muchas de esas historias, alguien que decidió
        hacer la diferencia.
      </p>

      {/* ═══════════════════════════════════════════
          ACTO 1 — El homenaje a René Favaloro
      ═══════════════════════════════════════════ */}

      <FavaloroHero data={favaloro} />

      <FavaloroTimeline biografia={favaloro.biografia_resumida} />

      <FavaloroLegado legado={favaloro.legado} />

      {/* ═══════════════════════════════════════════
          ACTO 2 — Voces de pacientes
      ═══════════════════════════════════════════ */}

      <section className="pt-8 border-t-2 border-purple-200">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-purple-700 mb-3">
            Voces reales
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 leading-tight">
            Lo que la gente vivió
          </h2>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Testimonios anónimos de personas que atravesaron problemas
            cardiovasculares. Sus palabras, en primera persona.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonios.map((t) => (
            <TestimonioCard key={t.id} testimonio={t} />
          ))}
        </div>

        {/* Nota de la fuente */}
        <p className="text-center text-xs text-slate-500 italic mt-10">
          Testimonios compartidos por la{' '}
          <a
            href="https://www.fac.org.ar/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-purple-700 transition"
          >
            Federación Argentina de Cardiología
          </a>
        </p>
      </section>

    </ViewContainer>
  )
}