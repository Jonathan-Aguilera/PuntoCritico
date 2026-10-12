import { Link } from 'react-router'
import ViewContainer from '../components/ui/ViewContainer'

export default function NotFound() {
  return (
    <ViewContainer>
      {/* ── Título grande con degradado ── */}
      <section className="text-center mb-6">
        <h1 className="font-bold leading-[1.1] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-[#7BA8D9] to-[#C8E0FF] bg-clip-text text-transparent">
          404
        </h1>
      </section>

      <p className="text-center text-base md:text-lg text-slate-200 max-w-xl mx-auto mb-4 leading-relaxed">
        La ruta a la que intentaste acceder no existe.
      </p>
      <p className="text-center text-sm md:text-base text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed">
        Puede que hayas escrito mal la dirección o que el enlace esté roto.
      </p>

      <div className="text-center">
        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-lg bg-amber-500 text-slate-900 font-semibold hover:bg-amber-400 transition shadow-lg"
        >
          ← Volver al inicio
        </Link>
      </div>
    </ViewContainer>
  )
}