import ViewContainer from '../components/ui/ViewContainer'
import TimelineHorizontal from '../components/acceso/TimelineHorizontal'
import TimelineVertical from '../components/acceso/TimelineVertical'
import { getAcceso } from '../data/services/acceso.service'

export default function Acceso() {
  const data = getAcceso()

  return (
    <ViewContainer>
      {/* ── Título grande con degradado ── */}
      <section className="text-center mb-6">
        <h1 className="font-bold leading-[1.1] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-[#7BA8D9] to-[#C8E0FF] bg-clip-text text-transparent">
          Acceso
        </h1>
      </section>

      {/* ── Subtítulo ── */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-base md:text-lg text-slate-200 leading-relaxed mb-4">
          {data.intro}
        </p>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Durante el último siglo, la forma en que las personas accedían a la
          información sobre salud cardiovascular cambió por completo. Lo que
          antes era un privilegio de pocos, hoy está al alcance de casi todos.
          Pero el número de muertes no bajó.
        </p>
      </div>

      {/* ── Línea de tiempo: horizontal en desktop, vertical en móvil ── */}
      <div className="mb-12 md:mb-16">
        <div className="hidden lg:block">
          <TimelineHorizontal items={data.linea_tiempo} />
        </div>
        <div className="lg:hidden">
          <TimelineVertical items={data.linea_tiempo} />
        </div>
      </div>

      {/* ── Cierre ── */}
      <div className="text-center pt-8 border-t border-white/15">
        <p className="text-xl md:text-2xl font-bold text-amber-300 leading-tight">
          {data.cierre.frase}
        </p>
        <p className="text-sm md:text-base text-slate-300 mt-3 max-w-2xl mx-auto leading-relaxed">
          {data.cierre.subtexto}
        </p>
      </div>
    </ViewContainer>
  )
}