import { type ReactNode } from 'react'

interface CardShellProps {
  titulo: string
  subtitulo: string
  descripcion: string
  children: ReactNode
}

export default function CardShell({
  titulo,
  subtitulo,
  descripcion,
  children,
}: CardShellProps) {
  return (
    <article className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
      <header className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
          {titulo}
        </h2>
        <p className="text-sm md:text-base font-medium text-orange-600 mt-1">
          {subtitulo}
        </p>
        <p className="text-slate-700 mt-4 leading-relaxed">{descripcion}</p>
      </header>
      <div>{children}</div>
    </article>
  )
}