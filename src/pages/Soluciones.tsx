import ViewContainer from '../components/ui/ViewContainer'
import CategoriaBloque from '../components/soluciones/CategoriaBloque'
import { getSoluciones } from '../data/services/soluciones.service'

interface SolucionesProps {
  preview?: boolean
}

// En preview mostramos este límite de consejos por categoría.
const PREVIEW_CONSEJOS_POR_CATEGORIA = 2

export default function Soluciones({ preview = false }: SolucionesProps) {
  const data = getSoluciones()

  // En preview mostramos TODAS las categorías, pero limitamos los consejos.
  const categorias = data.categorias

  return (
    <ViewContainer>
      <section className="text-center mb-6">
        <h1
          className={`font-bold leading-[1.1] tracking-tight bg-linear-to-r from-[#7BA8D9] to-[#C8E0FF] bg-clip-text text-transparent ${
            preview
              ? 'text-3xl sm:text-4xl md:text-5xl'
              : 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl'
          }`}
        >
          {/* Título */}
          Qué ayuda, y que no
        </h1>
      </section>

      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-base md:text-lg text-[#A5F3EA] leading-relaxed">
          {/* Subtítulo
              Actualmente se toma de data.intro. */}
          {data.intro}
        </p>
      </div>

      {categorias.map((categoria) => (
        <CategoriaBloque
          key={categoria.id}
          categoria={categoria}
          limite={preview ? PREVIEW_CONSEJOS_POR_CATEGORIA : undefined}
        />
      ))}

      {/* ── Cierre (visible en vista completa Y en preview) ──
          Reemplaza el par "frase + subtexto" por una reflexión simple.
          Opciones (elegí una y borrá el resto):
            A) "No hace falta hacer todo. Alcanza con empezar por algo, y sostenerlo."
            B) "Las cosas que más ayudan suelen ser las menos espectaculares. Y las más difíciles de sostener."
            C) "Cambiar el pronóstico no depende de un solo gesto. Depende de muchos pequeños, repetidos en el tiempo."
            D) "Hay margen. Siempre hay margen. Y la mayoría está en lo cotidiano."
      */}
      <div className="text-center pt-10 mt-8 border-t border-white/15">
        <p className="text-lg md:text-xl text-[#A5F3EA] font-medium leading-relaxed max-w-2xl mx-auto">
          No hace falta hacer todo. Alcanza con empezar por algo, y sostenerlo.
        </p>
      </div>

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