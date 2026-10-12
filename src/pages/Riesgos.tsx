import ViewContainer from '../components/ui/ViewContainer'
import RiesgoCard from '../components/riesgo/RiesgoCard'
import { getFactores } from '../data/services/riesgos.service'

export default function Riesgos() {
  const todos = getFactores()
  const factores = todos

  return (
    <ViewContainer>
      {/* ── Título grande con degradado ── */}
      <section className="text-center mb-6">
        <h1 className="font-bold leading-[1.1] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-[#7BA8D9] to-[#C8E0FF] bg-clip-text text-transparent">
          Riesgos
        </h1>
      </section>

      {/* ── Subtítulo ── */}
      <p className="text-center text-base md:text-lg text-slate-200 max-w-3xl mx-auto mb-16 leading-relaxed">
        ¿Sabías que la mayoría de los problemas del corazón se desarrollan en
        silencio? Estos son los factores que más influyen en la salud
        cardiovascular de los argentinos.
      </p>

      {/* ── Lista de tarjetas intercaladas ── */}
      <div className="space-y-8">
        {factores.map((factor, i) => (
          <RiesgoCard
            key={factor.id}
            factor={factor}
            accentColor="#dc2626"
            offset={i % 2 === 0 ? 'left' : 'right'}
            index={i}
          />
        ))}
      </div>
    </ViewContainer>
  )
}