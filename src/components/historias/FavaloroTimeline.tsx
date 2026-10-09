import type { FavaloroData } from '../../data/services/historias.service'

interface FavaloroTimelineProps {
  biografia: FavaloroData['biografia_resumida']
}

export default function FavaloroTimeline({ biografia }: FavaloroTimelineProps) {
  return (
    <section className="mb-12">
      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 text-center">
        Su vida, en cuatro etapas
      </h3>
      <p className="text-slate-600 text-center mb-10 text-sm md:text-base">
        De un barrio obrero de La Plata a los quirófanos más importantes del mundo.
      </p>

      {/* ── Desktop: horizontal ── */}
      <div className="hidden lg:block relative">
        {/* Línea horizontal */}
        <div className="absolute left-0 right-0 top-[13px] h-0.5 bg-purple-300" />

        <div className="grid grid-cols-4 gap-6 relative">
          {biografia.map((etapa, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-purple-600 border-4 border-white shadow-md relative z-10 flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">{i + 1}</span>
              </div>
              <div className="w-0.5 h-6 bg-purple-300" />
              <div className="mt-2 bg-white rounded-xl p-5 shadow-sm border-t-4 border-purple-500 w-full">
                <h4 className="font-bold text-purple-900 text-sm md:text-base leading-snug mb-2">
                  {etapa.etapa}
                </h4>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  {etapa.texto}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Móvil/tablet: vertical ── */}
      <div className="lg:hidden relative pl-9">
        <div className="absolute left-[13px] top-3 bottom-3 w-0.5 bg-purple-300" />
        <div className="space-y-6">
          {biografia.map((etapa, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-[32px] top-2 w-7 h-7 rounded-full bg-purple-600 border-4 border-white shadow-md z-10 flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">{i + 1}</span>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-purple-500">
                <h4 className="font-bold text-purple-900 text-base mb-2">
                  {etapa.etapa}
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {etapa.texto}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}