import ViewContainer from '../components/ui/ViewContainer'
import EncuestaHabitos from '../components/habitos/EncuestaHabitos'
import MitoRealidadCard from '../components/habitos/MitoRealidadCard'
import { getMitosRealidades } from '../data/services/habitos.service'

export default function Habitos() {
  const mitos = getMitosRealidades()

  return (
    <ViewContainer>
      {/* ── Título grande con degradado ── */}
      <section className="text-center mb-6">
        <h1 className="font-bold leading-[1.1] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-[#7BA8D9] to-[#C8E0FF] bg-clip-text text-transparent">
          Hábitos
        </h1>
      </section>

      {/* ── Subtítulo ── */}
      <p className="text-center text-base md:text-lg text-slate-200 max-w-3xl mx-auto mb-16 leading-relaxed">
        Mucho de lo que creemos saber sobre el corazón es falso. Empecemos por
        medir qué tanto sabemos, y después desarmemos los mitos más comunes.
      </p>

      {/* ── Encuesta ── */}
      <EncuestaHabitos />

      {/* ── Mitos y realidades ── */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-amber-300 mb-2 text-center">
          Mitos y realidades
        </h2>
        <p className="text-slate-300 mb-10 leading-relaxed text-center max-w-3xl mx-auto">
          Siete creencias populares que conviene revisar. Del lado izquierdo, lo
          que se dice. Del derecho, lo que dice la evidencia.
        </p>

        <div className="space-y-5">
          {mitos.map((item, i) => (
            <MitoRealidadCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </ViewContainer>
  )
}