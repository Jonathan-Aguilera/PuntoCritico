interface ShieldBarProps {
  progress: number
}

const INSET = 20

export default function ShieldBar({ progress }: ShieldBarProps) {
  const clamped = Math.max(0, Math.min(1, progress))

  return (
    <svg
      viewBox="0 0 500 40"
      preserveAspectRatio="none"
      className="w-full h-full"
    >
      <defs>
        {/* ─── Forma interna del shield (por dónde se recorta el relleno) ─── */}
        <clipPath id="shield-fill-clip">
          <polygon
            points={`
              ${INSET + 1},3
              ${INSET * 2 + 1},37
              ${500 - INSET * 2 - 1},37
              ${500 - INSET - 1},3
            `}
          />
        </clipPath>

        {/* ─── Gradiente del relleno (sujeto al color pedido) ───
            El color base es #8B2FF7 (violeta fuerte).
            El gradiente va de más transparente a más opaco para que
            se vea "energía" avanzando de izquierda a derecha. */}
        <linearGradient id="shield-fill-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5109a5" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#B86BFF" stopOpacity="0.75" />
        </linearGradient>
      </defs>

      {/* ─── Relleno: crece de izquierda a derecha según progress ─── */}
      <g clipPath="url(#shield-fill-clip)">
        <rect
          x="0"
          y="0"
          width={500 * clamped}
          height="40"
          fill="url(#shield-fill-gradient)"
        />
      </g>

      {/* ─── Contorno del shield (líneas blancas) ─── */}
      <line
        x1={INSET} y1="1" x2={500 - INSET} y2="1"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1={INSET * 2} y1="39" x2={500 - INSET * 2} y2="39"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1={INSET} y1="1" x2={INSET * 2} y2="39"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1={500 - INSET} y1="1" x2={500 - INSET * 2} y2="39"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}