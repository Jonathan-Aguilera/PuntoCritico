import ViewContainer from '../components/ui/ViewContainer'
import TimelineHorizontal from '../components/acceso/TimelineHorizontal'
import TimelineVertical from '../components/acceso/TimelineVertical'
import { getAcceso } from '../data/services/acceso.service'

export default function Acceso() {
  const data = getAcceso()

  return (
    <ViewContainer title="Acceso" color="blue">
      {/* ── Intro ── */}
      <div className="mb-10 md:mb-14">
        <p className="text-base md:text-lg font-medium text-slate-900 leading-relaxed">
          {data.intro}
        </p>
        <p className="text-sm md:text-base text-slate-700 mt-4 leading-relaxed">
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
      <div className="text-center pt-8 border-t border-blue-300">
        <p className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">
          {data.cierre.frase}
        </p>
        <p className="text-sm md:text-base text-slate-700 mt-3 max-w-2xl mx-auto">
          {data.cierre.subtexto}
        </p>
      </div>
    </ViewContainer>
  )
}