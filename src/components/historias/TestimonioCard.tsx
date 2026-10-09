import type { Testimonio } from '../../data/services/historias.service'

interface TestimonioCardProps {
  testimonio: Testimonio
}

export default function TestimonioCard({ testimonio }: TestimonioCardProps) {
  return (
    <article className="relative bg-white rounded-xl p-6 shadow-md border border-purple-100 hover:shadow-lg hover:border-purple-300 transition-all flex flex-col h-full">

      {/* Comillas decorativas */}
      <span
        className="absolute top-2 left-4 text-6xl text-purple-200 font-serif leading-none select-none pointer-events-none"
        aria-hidden="true"
      >
        "
      </span>

      {/* Fragmento */}
      <p className="relative text-slate-800 leading-relaxed text-sm md:text-base italic mb-5 pt-6">
        {testimonio.fragmento}
      </p>

      {/* Separador */}
      <div className="border-t border-purple-100 pt-4 mt-auto">
        {/* Título de la historia */}
        <h4 className="text-xs uppercase tracking-wider font-bold text-purple-700 mb-2">
          {testimonio.titulo}
        </h4>

        {/* Nombre y edad */}
        <p className="text-sm font-semibold text-slate-900">
          {testimonio.nombre}, {testimonio.edad} años
        </p>

        {/* Recomendación */}
        <p className="text-xs text-slate-500 italic mt-2 leading-snug">
          "{testimonio.recomendacion}"
        </p>
      </div>
    </article>
  )
}