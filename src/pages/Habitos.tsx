import ViewContainer from '../components/ui/ViewContainer'
import EncuestaHabitos from '../components/habitos/EncuestaHabitos'
import MitoRealidadCard from '../components/habitos/MitoRealidadCard'
import { getMitosRealidades } from '../data/services/habitos.service'

interface HabitosProps {
  preview?: boolean
}

export default function Habitos({ preview = false }: HabitosProps) {
  const mitos = getMitosRealidades()
  // En preview mostramos 4 mitos; en la vista completa, todos.
  const PREVIEW_MITOS = 4
  const mitosAMostrar = preview ? mitos.slice(0, PREVIEW_MITOS) : mitos

  return (
    <ViewContainer>
      <section className="text-center mb-6">
        <h1
          className={`font-bold leading-[1.1] tracking-tight bg-gradient-to-r from-[#7BA8D9] to-[#C8E0FF] bg-clip-text text-transparent ${preview
              ? 'text-3xl sm:text-4xl md:text-5xl'
              : 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl'
            }`}
        >
          {/* Título */}
          Creer o saber
        </h1>
      </section>

      <p className="text-center text-base md:text-lg text-[#A5F3EA] max-w-3xl mx-auto mb-16 leading-relaxed">
        {/* Subtítulo*/}
        No todo lo que se repite sobre el corazón es cierto. Tampoco todo es falso. Vale la pena distinguirlo.
      </p>

      {/* La encuesta solo se muestra en la vista completa */}
      {!preview && <EncuestaHabitos />}

      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#4ECDC4] mb-2 text-center">
          Mitos y realidades
        </h2>
        <p className="text-[#A5F3EA]/80 mb-10 leading-relaxed text-center max-w-3xl mx-auto">
          Algunas creencias populares que conviene revisar.
        </p>

        <div className="space-y-5">
          {mitosAMostrar.map((item, i) => (
            <MitoRealidadCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* ── Conclusión (se muestra en preview y en la vista completa) ──
          Opciones de cierre, elegí una y borrá el resto:
            A) "Estos mitos circulan en consultorios, en mesas familiares, en redes.
                Algunos tienen parte de razón. Otros no. La diferencia importa."
            B) "Lo que se repite no siempre se sostiene. Lo que se sostiene no siempre se repite."
            C) "¿Cuántas de estas las tenías como ciertas?"
      */}
      <section className="mt-20 max-w-3xl mx-auto">
        <div className="h-px bg-[#4ECDC4]/20 mb-10 mx-auto w-24" />
        <p className="text-base md:text-lg text-[#A5F3EA] leading-relaxed text-justify mb-4">
          Estos mitos circulan en consultorios, en mesas familiares, en redes.
          Algunos tienen parte de razón. Otros no. La diferencia importa.
        </p>
        <p className="text-base md:text-lg text-[#4ECDC4] font-semibold text-center mt-6">
          ¿Cuántas de estas las tenías como ciertas?
        </p>
      </section>

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