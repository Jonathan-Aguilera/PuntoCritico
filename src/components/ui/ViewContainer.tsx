import { type ReactNode } from 'react'

// Mapa de colores: cada clave define el fondo, el card y el borde.
// Agregar un nuevo color es tan simple como añadir una entrada aquí.
const colorMap = {
  slate:   { bg: 'bg-slate-900',   card: 'bg-slate-300',   border: 'border-slate-300'   },
  red:     { bg: 'bg-red-900',     card: 'bg-red-200',     border: 'border-red-300'     },
  orange:  { bg: 'bg-orange-900',  card: 'bg-orange-100',  border: 'border-orange-300'  },
  blue:    { bg: 'bg-blue-900',    card: 'bg-blue-100',    border: 'border-blue-300'    },
  emerald: { bg: 'bg-emerald-900', card: 'bg-emerald-100', border: 'border-emerald-300' },
  cyan:    { bg: 'bg-cyan-900',    card: 'bg-cyan-100',    border: 'border-cyan-300'    },
  purple:  { bg: 'bg-purple-900',  card: 'bg-purple-200',  border: 'border-purple-300'  },
  indigo:  { bg: 'bg-indigo-900',  card: 'bg-indigo-200',  border: 'border-indigo-300'  },
  zinc:    { bg: 'bg-zinc-900',    card: 'bg-zinc-300',    border: 'border-zinc-300'    },
} as const

export type ViewColor = keyof typeof colorMap

interface ViewContainerProps {
  title: string
  color: ViewColor
  children?: ReactNode
}

export default function ViewContainer({
  title,
  color,
  children,
}: ViewContainerProps) {
  const { bg, card, border } = colorMap[color]

  return (
    <div className={`size-full ${bg} overflow-auto`}>
      <div className="max-w-7xl mx-auto px-6 py-8 md:px-9 md:py-12 xl:px-6">
        <div className={`${card} rounded-xl shadow-lg p-6 md:p-10`}>
          <h1 className="text-3xl md:text-4xl font-bold text-center text-slate-900">
            {title}
          </h1>

          {/* Línea horizontal: usa el borde del color para integrarse mejor */}
          <hr className={`my-6 md:my-8 ${border}`} />

          <div className="text-slate-900 leading-relaxed space-y-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}