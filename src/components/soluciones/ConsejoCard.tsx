import type { Consejo } from '../../data/services/soluciones.service'

interface ConsejoCardProps {
  consejo: Consejo
  numero: number
  accent: {
    text: string
    bgSoft: string
    border: string
    chipBg: string
    chipText: string
  }
}

export default function ConsejoCard({ consejo, numero, accent }: ConsejoCardProps) {
  return (
    <article
      className={`relative bg-white rounded-xl p-5 md:p-6 shadow-sm border-l-4 ${accent.border} hover:shadow-md transition-shadow`}
    >
      {/* Número decorativo grande, semitransparente */}
      <span
        className={`absolute top-3 right-4 text-4xl md:text-5xl font-black ${accent.text} opacity-15 select-none pointer-events-none`}
      >
        {String(numero).padStart(2, '0')}
      </span>

      {/* Consejo principal */}
      <p className="text-base md:text-lg font-semibold text-slate-900 leading-snug pr-10 mb-3">
        {consejo.texto}
      </p>

      {/* Evidencia */}
      <p className="text-sm text-slate-600 leading-relaxed mb-4">
        {consejo.evidencia}
      </p>

      {/* Chip de fuente */}
      <span
        className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${accent.chipBg} ${accent.chipText}`}
      >
        {consejo.fuente}
      </span>
    </article>
  )
}