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
                {/* Forma interna: la misma que el contorno, pero un poco más chica para que no tape las líneas */}
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

                {/* Gradiente con el nuevo color */}
                <linearGradient id="shield-fill-gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgba(67, 77, 168, 0.35)" />
                    <stop offset="100%" stopColor="rgba(67, 77, 168, 0.65)" />
                </linearGradient>
            </defs>

            {/* ─── Relleno (rect recortado por el clipPath de la forma interna) ─── */}
            <g clipPath="url(#shield-fill-clip)">
                <rect
                    x="0"
                    y="0"
                    width={500 * clamped}
                    height="40"
                    fill="url(#shield-fill-gradient)"
                />
            </g>

            {/* ─── Contorno (líneas) ─── */}
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