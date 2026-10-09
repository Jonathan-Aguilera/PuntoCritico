import ViewContainer from '../components/ui/ViewContainer'
import EncuestaHabitos from '../components/habitos/EncuestaHabitos'
import MitoRealidadCard from '../components/habitos/MitoRealidadCard'
import { getMitosRealidades } from '../data/services/habitos.service'

export default function Habitos() {
  const mitos = getMitosRealidades()

  return (
    <ViewContainer title="Hábitos" color="emerald">
      {/* ── Intro ── */}
      <p className="text-lg mb-8 text-slate-900 leading-relaxed">
        Mucho de lo que creemos saber sobre el corazón es falso. Empecemos por
        medir qué tanto sabemos, y después desarmemos los mitos más comunes.
      </p>

      {/* ── Encuesta ── */}
      <EncuestaHabitos />

      {/* ── Mitos y realidades ── */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          Mitos y realidades
        </h2>
        <p className="text-slate-700 mb-8 leading-relaxed">
          Siete creencias populares que conviene revisar. Del lado izquierdo, lo
          que se dice. Del derecho, lo que dice la evidencia.
        </p>

        <div className="space-y-5">
          {mitos.map((item) => (
            <MitoRealidadCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </ViewContainer>
  )
}