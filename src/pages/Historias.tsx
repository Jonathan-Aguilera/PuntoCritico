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
    <ViewContainer>
      {/* ── Título grande con degradado ── */}
      <section className="text-center mb-6">
        <h1 className="font-bold leading-[1.1] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-[#7BA8D9] to-[#C8E0FF] bg-clip-text text-transparent">
          Historias
        </h1>
      </section>

      {/* ── Intro ── */}
      <p className="text-center text-base md:text-lg text-slate-200 max-w-3xl mx-auto mb-16 leading-relaxed">
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

      <section className="pt-10 border-t border-white/15">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-300 mb-3">
            Voces reales
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
            Lo que la gente vivió
          </h2>
          <p className="text-slate-300 mt-3 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Testimonios anónimos de personas que atravesaron problemas
            cardiovasculares. Sus palabras, en primera persona.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonios.map((t, i) => (
            <TestimonioCard key={t.id} testimonio={t} index={i} />
          ))}
        </div>

        {/* Nota de la fuente */}
        <p className="text-center text-xs text-slate-400 italic mt-10">
          Testimonios compartidos por la{' '}
          <a
            href="https://www.fac.org.ar/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-amber-300 transition"
          >
            Federación Argentina de Cardiología
          </a>
        </p>
      </section>
    </ViewContainer>
  )
}