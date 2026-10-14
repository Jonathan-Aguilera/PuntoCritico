import ConsejoCard from './ConsejoCard'
import CategoriaIcon from './CategoriaIcon'
import type { Categoria } from '../../data/services/soluciones.service'

interface CategoriaBloqueProps {
  categoria: Categoria
  limite?: number
}

// Paletas alineadas al sitio (translúcidas sobre fondo violeta/rosa)
const paletas: Record<
  string,
  {
    headerBg: string
    iconBg: string
    iconText: string
    border: string
    text: string
    bgSoft: string
    chipBg: string
    chipText: string
  }
> = {
  comidas: {
    headerBg: 'bg-[#FFC93C]/10 border border-[#FFC93C]/20',
    iconBg: 'bg-[#FFC93C]',
    iconText: 'text-[#0E2B28]',
    border: 'border-[#FFC93C]',
    text: 'text-[#FFD766]',
    bgSoft: 'bg-[#FFC93C]/10',
    chipBg: 'bg-[#FFC93C]/15',
    chipText: 'text-[#FFD766]',
  },
  ejercicio: {
    headerBg: 'bg-[#5DD9A8]/10 border border-[#5DD9A8]/20',
    iconBg: 'bg-[#5DD9A8]',
    iconText: 'text-[#0E2B28]',
    border: 'border-[#5DD9A8]',
    text: 'text-[#7FE4BD]',
    bgSoft: 'bg-[#5DD9A8]/10',
    chipBg: 'bg-[#5DD9A8]/15',
    chipText: 'text-[#7FE4BD]',
  },
  habitos: {
    headerBg: 'bg-[#C4A3FF]/10 border border-[#C4A3FF]/20',
    iconBg: 'bg-[#C4A3FF]',
    iconText: 'text-[#0E2B28]',
    border: 'border-[#C4A3FF]',
    text: 'text-[#D4B8FF]',
    bgSoft: 'bg-[#C4A3FF]/10',
    chipBg: 'bg-[#C4A3FF]/15',
    chipText: 'text-[#D4B8FF]',
  },
}

export default function CategoriaBloque({
  categoria,
  limite,
}: CategoriaBloqueProps) {
  const p = paletas[categoria.id] ?? paletas.comidas

  const consejos = limite
    ? categoria.consejos.slice(0, limite)
    : categoria.consejos

  const total = consejos.length
  const esImpar = total % 2 === 1

  return (
    <section className="mb-12">
      {/* ── Header de la categoría ── */}
      <div
        className={`${p.headerBg} backdrop-blur-md rounded-xl p-5 mb-6 flex items-center gap-4`}
      >
        <div
          className={`${p.iconBg} ${p.iconText} w-12 h-12 rounded-xl flex items-center justify-center shadow-md shrink-0`}
        >
          <CategoriaIcon name={categoria.icono} className="w-6 h-6" />
        </div>
        <div>
          <h2 className={`text-2xl md:text-3xl font-bold ${p.text}`}>
            {categoria.titulo}
          </h2>
          <p className="text-sm text-[#A5F3EA]/70 mt-0.5">
            {consejos.length}{' '}
            {consejos.length === 1 ? 'consejo' : 'consejos'} avalados por
            instituciones
          </p>
        </div>
      </div>

      {/* ── Grid de consejos ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {consejos.map((consejo, i) => {
          const esUltimo = i === total - 1
          const centrarUltimo = esUltimo && esImpar

          return (
            <div
              key={consejo.id}
              className={
                centrarUltimo
                  ? 'md:col-span-2 md:max-w-[calc(50%-0.5rem)] md:mx-auto w-full'
                  : ''
              }
            >
              <ConsejoCard
                consejo={consejo}
                numero={i + 1}
                index={i}
                accent={{
                  text: p.text,
                  bgSoft: p.bgSoft,
                  border: p.border,
                  chipBg: p.chipBg,
                  chipText: p.chipText,
                }}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}