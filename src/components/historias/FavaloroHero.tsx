import type { FavaloroData } from '../../data/services/historias.service'
import favaloroRetrato from '../../assets/favaloro-retrato.jpg'
import bypassDiagrama from '../../assets/bypass-diagrama.jpg'

interface FavaloroHeroProps {
  data: FavaloroData
}

export default function FavaloroHero({ data }: FavaloroHeroProps) {
  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-purple-950 rounded-2xl overflow-hidden shadow-2xl mb-12 border border-white/10">

      {/* Textura sutil de fondo */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)',
          backgroundSize: '40px 40px, 60px 60px',
        }}
      />

      <div className="relative px-6 md:px-12 py-12 md:py-16">
        {/* ── Encabezado: "In Memoriam" ── */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 text-amber-300/80 mb-3">
            <span className="w-10 h-px bg-amber-300/60" />
            <span className="text-xs md:text-sm uppercase tracking-[0.3em] font-semibold">
              In Memoriam
            </span>
            <span className="w-10 h-px bg-amber-300/60" />
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
            {data.nombre_completo}
          </h2>
          <p className="text-amber-200/80 text-sm md:text-base mt-3 italic">
            {data.nacimiento.split(',')[0]} — {data.fallecimiento.split(',')[0]}
          </p>
          <p className="text-slate-300 text-sm md:text-base mt-2">
            {data.profesion}
          </p>
        </div>

        {/* ── Retrato central enmarcado ── */}
        <div className="flex justify-center mb-10">
          <div className="relative">
            <div className="absolute -inset-1.5 bg-gradient-to-br from-amber-300/40 via-amber-500/20 to-amber-300/40 rounded-lg blur-sm" />
            <div className="relative bg-slate-800 p-2 rounded-lg shadow-2xl">
              <img
                src={favaloroRetrato}
                alt={data.imagen_retrato.titulo}
                className="w-56 md:w-72 rounded object-cover grayscale-[15%]"
              />
            </div>
          </div>
        </div>

        {/* ── Hito principal ── */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-base md:text-xl text-slate-100 leading-relaxed font-light">
            {data.hito_principal}
          </p>
        </div>

        {/* ── Diagrama del bypass + descripción ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto bg-slate-900/60 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-slate-700/50">
          <div>
            <img
              src={bypassDiagrama}
              alt={data.imagen_hito.titulo}
              className="w-full rounded-lg shadow-lg bg-white/90 p-2"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-amber-300/80 font-semibold mb-3">
              El procedimiento
            </p>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
              Bypass aortocoronario
            </h3>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              {data.imagen_hito.descripcion}
            </p>
          </div>
        </div>

        {/* Créditos de las imágenes */}
        <div className="text-center text-[10px] text-slate-500 mt-8 space-y-1">
          <p>Retrato: {data.imagen_retrato.credito} — {data.imagen_retrato.licencia}</p>
          <p>Diagrama: {data.imagen_hito.credito} — {data.imagen_hito.licencia}</p>
        </div>
      </div>
    </section>
  )
}