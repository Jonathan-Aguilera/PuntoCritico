import ViewContainer from '../components/ui/ViewContainer'
import CategoriaBloque from '../components/soluciones/CategoriaBloque'
import { getSoluciones } from '../data/services/soluciones.service'

interface SolucionesProps {
  preview?: boolean
}

export default function Soluciones({ preview = false }: SolucionesProps) {
  const data = getSoluciones()

  // En preview, solo la primera categoría
  const categorias = preview ? data.categorias.slice(0, 1) : data.categorias

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
          Soluciones
        </h1>
      </section>

      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-base md:text-lg text-slate-200 leading-relaxed">
          {data.intro}
        </p>
      </div>

      {categorias.map((categoria) => (
        <CategoriaBloque key={categoria.id} categoria={categoria} />
      ))}

      {!preview && (
        <div className="text-center pt-10 mt-8 border-t border-white/15">
          <p className="text-2xl md:text-3xl font-bold text-amber-300 leading-tight">
            {data.cierre.frase}
          </p>
          <p className="text-sm md:text-base text-slate-300 mt-4 max-w-2xl mx-auto leading-relaxed">
            {data.cierre.subtexto}
          </p>
        </div>
      )}

      {preview && (
        <div className="text-center mt-12">
          <a
            href="/soluciones"
            className="inline-block px-6 py-3 border border-[#7BA8D9]/40 text-[#7BA8D9] font-semibold rounded-lg hover:bg-[#7BA8D9]/10 transition"
          >
            Ver todas las soluciones →
          </a>
        </div>
      )}
    </ViewContainer>
  )
}