import ViewContainer from '../components/ui/ViewContainer'
import TimelineHorizontal from '../components/acceso/TimelineHorizontal'
import TimelineVertical from '../components/acceso/TimelineVertical'
import { getAcceso } from '../data/services/acceso.service'

interface AccesoProps {
  preview?: boolean
}

export default function Acceso({ preview = false }: AccesoProps) {
  const data = getAcceso()

  // En preview, solo las primeras 3 etapas
  const items = preview ? data.linea_tiempo.slice(0, 3) : data.linea_tiempo

  return (
    <ViewContainer>
      <section className="text-center mb-6">
        <h1
          className={`font-bold leading-[1.1] tracking-tight bg-gradient-to-r from-[#7BA8D9] to-[#C8E0FF] bg-clip-text text-transparent ${
            preview
              ? 'text-3xl sm:text-4xl md:text-5xl'
              : 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl'
          }`}
        >
          Acceso
        </h1>
      </section>

      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-base md:text-lg text-slate-200 leading-relaxed">
          {data.intro}
        </p>
      </div>

      <div className="mb-12 md:mb-16">
        <div className="hidden lg:block">
          <TimelineHorizontal items={items} />
        </div>
        <div className="lg:hidden">
          <TimelineVertical items={items} />
        </div>
      </div>

      {!preview && (
        <div className="text-center pt-8 border-t border-white/15">
          <p className="text-xl md:text-2xl font-bold text-amber-300 leading-tight">
            {data.cierre.frase}
          </p>
          <p className="text-sm md:text-base text-slate-300 mt-3 max-w-2xl mx-auto leading-relaxed">
            {data.cierre.subtexto}
          </p>
        </div>
      )}

      {preview && (
        <div className="text-center mt-12">
          <a
            href="/acceso"
            className="inline-block px-6 py-3 border border-[#7BA8D9]/40 text-[#7BA8D9] font-semibold rounded-lg hover:bg-[#7BA8D9]/10 transition"
          >
            Ver la línea de tiempo completa →
          </a>
        </div>
      )}
    </ViewContainer>
  )
}