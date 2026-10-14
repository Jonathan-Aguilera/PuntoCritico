import { Suspense, lazy } from 'react'
import type { FavaloroData } from '../../data/services/historias.service'
import favaloroRetrato from '../../assets/favaloro-retrato.jpg'
import bypassDiagrama from '../../assets/bypass-diagrama.jpg'

const HeartModel = lazy(() => import('./HeartModel'))

interface FavaloroHeroProps {
  data: FavaloroData
}

export default function FavaloroHero({ data }: FavaloroHeroProps) {
  return (
    <section className="relative rounded-2xl overflow-hidden shadow-2xl mb-12 border border-[#C4A3FF]/25">
      {/* ── Capa 1: fondo profundo ── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(180deg, #0E0A1F 0%, #241058 45%, #441EBD 100%)',
        }}
      />

      {/* ── Capa 2: aura radial dorada ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 30%, rgba(255, 201, 60, 0.14) 0%, rgba(196, 163, 255, 0.06) 40%, transparent 75%)',
        }}
      />

      {/* ── Capa 3: textura de puntos ── */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)',
          backgroundSize: '40px 40px, 60px 60px',
        }}
      />

      {/* ── Capa 4: contenido ── */}
      <div className="relative z-10 px-6 md:px-12 py-14 md:py-20">
        {/* ────── Header: In Memoriam → Corazón → Nombre ────── */}
        <div className="text-center mb-12">
          {/* Etiqueta "In Memoriam" */}
          <div className="inline-flex items-center gap-3 text-[#FFC93C]/85 mb-6">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-[#FFC93C]/70" />
            <span className="text-xs md:text-sm uppercase tracking-[0.35em] font-semibold">
              In Memoriam
            </span>
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-[#FFC93C]/70" />
          </div>

          {/* ── Corazón con espacio dedicado ── */}
          <div className="relative flex justify-center my-4">
            {/* Aura difusa detrás del corazón (decorativa) */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                         w-[min(75vw,420px)] h-[min(75vw,420px)] rounded-full blur-3xl
                         pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(196, 48, 227, 0.28) 0%, rgba(232, 93, 117, 0.15) 45%, transparent 78%)',
              }}
            />

            {/* Modelo 3D */}
            <div className="relative w-[min(60vw,320px)] h-[min(60vw,320px)] opacity-90">
              <Suspense fallback={null}>
                <HeartModel scale={1} />
              </Suspense>
            </div>
          </div>

          {/* Nombre y datos */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.05] tracking-tight mt-2">
            {data.nombre_completo}
          </h2>

          <p className="text-[#FFC93C]/85 text-sm md:text-base mt-4 italic">
            {data.nacimiento.split(',')[0]} — {data.fallecimiento.split(',')[0]}
          </p>
          <p className="text-[#A5F3EA]/75 text-sm md:text-base mt-1.5">
            {data.profesion}
          </p>
        </div>

        {/* ────── Retrato central ────── */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div
              className="absolute -inset-6 rounded-full blur-2xl opacity-40"
              style={{
                background:
                  'radial-gradient(circle, rgba(255, 201, 60, 0.5) 0%, rgba(196, 163, 255, 0.25) 50%, transparent 75%)',
              }}
            />
            <div
              className="absolute -inset-1 rounded-lg blur-sm opacity-70"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255, 201, 60, 0.6) 0%, rgba(196, 163, 255, 0.35) 50%, rgba(78, 205, 196, 0.35) 100%)',
              }}
            />
            <div className="relative bg-[#0E0A1F] p-2 rounded-lg shadow-2xl ring-1 ring-[#FFC93C]/30">
              <img
                src={favaloroRetrato}
                alt={data.imagen_retrato.titulo}
                className="w-56 md:w-72 rounded object-cover grayscale-[15%]"
              />
            </div>
          </div>
        </div>

        {/* Hito principal */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-base md:text-xl text-[#A5F3EA] leading-relaxed font-light">
            {data.hito_principal}
          </p>
        </div>

        {/* Diagrama del bypass */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto bg-[#0E0A1F]/60 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-[#C4A3FF]/20">
          <div>
            <img
              src={bypassDiagrama}
              alt={data.imagen_hito.titulo}
              className="w-full rounded-lg shadow-lg bg-white/95 p-2"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#FFC93C]/85 font-semibold mb-3">
              El procedimiento
            </p>
            <h3 className="text-xl md:text-2xl font-bold text-[#A5F3EA] mb-4">
              Bypass aortocoronario
            </h3>
            <p className="text-sm md:text-base text-[#A5F3EA]/80 leading-relaxed">
              {data.imagen_hito.descripcion}
            </p>
          </div>
        </div>

        {/* Créditos */}
        <div className="text-center text-[10px] text-[#A5F3EA]/40 mt-8 space-y-1">
          <p>
            Retrato: {data.imagen_retrato.credito} — {data.imagen_retrato.licencia}
          </p>
          <p>
            Diagrama: {data.imagen_hito.credito} — {data.imagen_hito.licencia}
          </p>
        </div>
      </div>
    </section>
  )
}