import ConsejoCard from './ConsejoCard'
import CategoriaIcon from './CategoriaIcon'
import type { Categoria } from '../../data/services/soluciones.service'

interface CategoriaBloqueProps {
  categoria: Categoria
}

// Paletas translúcidas para el fondo oscuro
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
    headerBg: 'bg-amber-500/10 border border-amber-400/20',
    iconBg: 'bg-amber-500',
    iconText: 'text-white',
    border: 'border-amber-400',
    text: 'text-amber-300',
    bgSoft: 'bg-amber-500/10',
    chipBg: 'bg-amber-500/15',
    chipText: 'text-amber-300',
  },
  ejercicio: {
    headerBg: 'bg-cyan-500/10 border border-cyan-400/20',
    iconBg: 'bg-cyan-500',
    iconText: 'text-white',
    border: 'border-cyan-400',
    text: 'text-cyan-300',
    bgSoft: 'bg-cyan-500/10',
    chipBg: 'bg-cyan-500/15',
    chipText: 'text-cyan-300',
  },
  habitos: {
    headerBg: 'bg-emerald-500/10 border border-emerald-400/20',
    iconBg: 'bg-emerald-500',
    iconText: 'text-white',
    border: 'border-emerald-400',
    text: 'text-emerald-300',
    bgSoft: 'bg-emerald-500/10',
    chipBg: 'bg-emerald-500/15',
    chipText: 'text-emerald-300',
  },
}

export default function CategoriaBloque({ categoria }: CategoriaBloqueProps) {
  const p = paletas[categoria.id] ?? paletas.comidas

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
          <p className="text-sm text-slate-300 mt-0.5">
            {categoria.consejos.length}{' '}
            {categoria.consejos.length === 1 ? 'consejo' : 'consejos'} avalados
            por instituciones
          </p>
        </div>
      </div>

      {/* ── Grid de consejos ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categoria.consejos.map((consejo, i) => (
          <ConsejoCard
            key={consejo.id}
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
        ))}
      </div>
    </section>
  )
}