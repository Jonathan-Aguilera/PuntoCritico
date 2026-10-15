const STOPS: { t: number; rgb: [number, number, number] }[] = [
  { t: 0,    rgb: [64, 100, 200] },
  { t: 0.35, rgb: [96, 170, 220] },
  { t: 0.65, rgb: [240, 180, 60] },
  { t: 1,    rgb: [220, 60, 60] },
]

export function colorFromT(t: number): [number, number, number] {
  const c = Math.max(0, Math.min(1, t))
  for (let i = 0; i < STOPS.length - 1; i++) {
    const a = STOPS[i], b = STOPS[i + 1]
    if (c >= a.t && c <= b.t) {
      const k = (c - a.t) / (b.t - a.t)
      return [
        a.rgb[0] + (b.rgb[0] - a.rgb[0]) * k,
        a.rgb[1] + (b.rgb[1] - a.rgb[1]) * k,
        a.rgb[2] + (b.rgb[2] - a.rgb[2]) * k,
      ]
    }
  }
  return STOPS[STOPS.length - 1].rgb
}

export function colorFromTHex(t: number): string {
  const [r, g, b] = colorFromT(t)
  const h = (n: number) => Math.round(n).toString(16).padStart(2, '0')
  return `#${h(r)}${h(g)}${h(b)}`
}