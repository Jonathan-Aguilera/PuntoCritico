import ViewContainer from '../components/ui/ViewContainer'
import CategoriaBloque from '../components/soluciones/CategoriaBloque'
import { getSoluciones } from '../data/services/soluciones.service'

export default function Soluciones() {
  const data = getSoluciones()

  return (
    <ViewContainer title="Soluciones" color="cyan">
      {/* ── Intro ── */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <p className="text-lg md:text-xl font-medium text-slate-900 leading-relaxed">
          {data.intro}
        </p>
      </div>

      {/* ── Categorías ── */}
      {data.categorias.map((categoria) => (
        <CategoriaBloque key={categoria.id} categoria={categoria} />
      ))}

      {/* ── Cierre ── */}
      <div className="text-center pt-10 mt-8 border-t-2 border-cyan-200">
        <p className="text-2xl md:text-3xl font-bold text-cyan-800 leading-tight">
          {data.cierre.frase}
        </p>
        <p className="text-sm md:text-base text-slate-600 mt-4 max-w-2xl mx-auto leading-relaxed">
          {data.cierre.subtexto}
        </p>
      </div>
    </ViewContainer>
  )
}