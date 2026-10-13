import ViewContainer from '../components/ui/ViewContainer'
import EncuestaHabitos from '../components/habitos/EncuestaHabitos'
import MitoRealidadCard from '../components/habitos/MitoRealidadCard'
import { getMitosRealidades } from '../data/services/habitos.service'

interface HabitosProps {
  preview?: boolean
}

export default function Habitos({ preview = false }: HabitosProps) {
  const mitos = getMitosRealidades()
  const mitosAMostrar = preview ? mitos.slice(0, 2) : mitos

  return (
    <ViewContainer>
      <section className="text-center mb-6">
        <h1
          className={`font-bold leading-[1.1] tracking-tight bg-gradient-to-r from-[#7BA8D9] to-[#C8E0FF] bg-clip-text text-transparent ${preview
              ? 'text-3xl sm:text-4xl md:text-5xl'
              : 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl'
            }`}
        >
          Hábitos
        </h1>
      </section>

      <p className="text-center text-base md:text-lg text-slate-200 max-w-3xl mx-auto mb-16 leading-relaxed">
        Mucho de lo que creemos saber sobre el corazón es falso.
      </p>

      {/* La encuesta solo se muestra en la vista completa */}
      {!preview && <EncuestaHabitos />}

      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-amber-300 mb-2 text-center">
          Mitos y realidades
        </h2>
        <p className="text-slate-300 mb-10 leading-relaxed text-center max-w-3xl mx-auto">
          Algunas creencias populares que conviene revisar.
        </p>

        <div className="space-y-5">
          {mitosAMostrar.map((item, i) => (
            <MitoRealidadCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>

      {preview && (
        <div className="text-center mt-12">
          <a
            href="/habitos"
            className="inline-block px-6 py-3 border border-[#7BA8D9]/40 text-[#7BA8D9] font-semibold rounded-lg hover:bg-[#7BA8D9]/10 transition"
          >
            Hacer la encuesta y ver todos los mitos →
          </a>
        </div>
      )}
    </ViewContainer>
  )
}