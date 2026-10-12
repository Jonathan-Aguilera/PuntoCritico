import ViewContainer from '../components/ui/ViewContainer'
import CategoriaBloque from '../components/soluciones/CategoriaBloque'
import { getSoluciones } from '../data/services/soluciones.service'

export default function Soluciones() {
  const data = getSoluciones()

  return (
    <ViewContainer>
      {/* ── Título grande con degradado ── */}
      <section className="text-center mb-6">
        <h1 className="font-bold leading-[1.1] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-[#7BA8D9] to-[#C8E0FF] bg-clip-text text-transparent">
          Soluciones
        </h1>
      </section>

      {/* ── Intro ── */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-base md:text-lg text-slate-200 leading-relaxed">
          {data.intro}
        </p>
      </div>

      {/* ── Categorías ── */}
      {data.categorias.map((categoria) => (
        <CategoriaBloque key={categoria.id} categoria={categoria} />
      ))}

      {/* ── Cierre ── */}
      <div className="text-center pt-10 mt-8 border-t border-white/15">
        <p className="text-2xl md:text-3xl font-bold text-amber-300 leading-tight">
          {data.cierre.frase}
        </p>
        <p className="text-sm md:text-base text-slate-300 mt-4 max-w-2xl mx-auto leading-relaxed">
          {data.cierre.subtexto}
        </p>
      </div>
    </ViewContainer>
  )
}