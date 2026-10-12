import { type ReactNode } from 'react'

interface HudFrameProps {
  children: ReactNode
  topCenterSlot?: ReactNode
}

export default function HudFrame({ children, topCenterSlot }: HudFrameProps) {
  return (
    <div className="relative w-full h-full px-5 py-4">

      {/* Contenido recortado con clip-path */}
      <div
        className="w-full h-full overflow-hidden"
        style={{
          clipPath: `polygon(
            24px 0,
            calc(100% - 24px) 0,
            100% 24px,
            100% calc(100% - 24px),
            calc(100% - 24px) 100%,
            24px 100%,
            0 calc(100% - 24px),
            0 24px
          )`,
        }}
      >
        {children}
      </div>

      {/* Overlay del HUD */}
      <div className="absolute inset-0 pointer-events-none z-[100]">

        {/* ─── Línea superior con tramo sólido + tramo punteado ─── */}
        {!topCenterSlot && (
          <div className="absolute top-[16px] left-[44px] right-[44px] h-px bg-white/50" />
        )}

        {topCenterSlot && (
          <>
            {/* Segmento izquierdo: sólida primero, punteada cerca del shield */}
            <div className="absolute top-[16px] left-[44px] right-[calc(50%+250px)] h-px flex">
              {/* Sólida: 70% del ancho */}
              <div className="flex-[7] bg-white/50" />
              {/* Punteada: 30% del ancho */}
              <div className="flex-[3] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.5)_0_2px,transparent_2px_6px)]" />
            </div>

            {/* Segmento derecho: punteada primero, sólida al final */}
            <div className="absolute top-[16px] left-[calc(50%+250px)] right-[44px] h-px flex">
              {/* Punteada: 30% del ancho */}
              <div className="flex-[3] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.5)_0_2px,transparent_2px_6px)]" />
              {/* Sólida: 70% del ancho */}
              <div className="flex-[7] bg-white/50" />
            </div>

            {/* Slot central (shield bar) */}
            <div className="absolute top-[16px] left-1/2 -translate-x-1/2 w-[clamp(180px,42vw,500px)] h-[40px]">
              {topCenterSlot}
            </div>
          </>
        )}

        {/* Línea inferior */}
        <div className="absolute bottom-[16px] left-[44px] right-[44px] h-px bg-white/50" />

        {/* Líneas verticales */}
        <div className="absolute left-[20px] top-[40px] bottom-[40px] w-px bg-white/50" />
        <div className="absolute right-[20px] top-[40px] bottom-[40px] w-px bg-white/50" />

        {/* Esquinas diagonales */}
        <svg className="absolute top-[16px] left-[20px] w-6 h-6" viewBox="0 0 24 24" fill="none">
          <line x1="0" y1="24" x2="24" y2="0" stroke="white" strokeOpacity="0.5" strokeWidth="1" />
        </svg>
        <svg className="absolute top-[16px] right-[20px] w-6 h-6" viewBox="0 0 24 24" fill="none">
          <line x1="0" y1="0" x2="24" y2="24" stroke="white" strokeOpacity="0.5" strokeWidth="1" />
        </svg>
        <svg className="absolute bottom-[16px] left-[20px] w-6 h-6" viewBox="0 0 24 24" fill="none">
          <line x1="0" y1="0" x2="24" y2="24" stroke="white" strokeOpacity="0.5" strokeWidth="1" />
        </svg>
        <svg className="absolute bottom-[16px] right-[20px] w-6 h-6" viewBox="0 0 24 24" fill="none">
          <line x1="0" y1="24" x2="24" y2="0" stroke="white" strokeOpacity="0.5" strokeWidth="1" />
        </svg>
      </div>
    </div>
  )
}