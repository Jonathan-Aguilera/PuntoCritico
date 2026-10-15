// No encontrado
import { Canvas, useFrame } from '@react-three/fiber'
import type { ThreeEvent } from '@react-three/fiber'
import { OrbitControls, Center, Html } from '@react-three/drei'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { geoMercator } from 'd3-geo'
import type { FiltrosMapa } from './PanelControl'
// [ERROR DEPLOY VERCEL: Línea 8, Columna 25 en el commit remoto]
// En el repositorio remoto en Vercel, esta línea estaba declarada como:
// import type { MapaData, Provincia } from '../../data/types/mapa'
// El compilador de TypeScript (tsc) falla con error TS6133 porque 'Provincia' (columna 25)
// se importaba pero nunca se utilizaba en el archivo.
import type { MapaData } from '../../data/types/mapa'
import {
  calcularValorAnios,
  formatearValor,
  nombreCanonico,
} from '../../data/services/mapaService'
import { colorFromT } from '../../lib/colorScale'

interface GeoFeature {
  type: string
  properties: {
    nombre: string
    id: string | number
    centroide?: { lon: number; lat: number }
  }
  geometry:
    | { type: 'Polygon'; coordinates: number[][][] }
    | { type: 'MultiPolygon'; coordinates: number[][][][] }
}
interface GeoJSONData { type: 'FeatureCollection'; features: GeoFeature[] }

interface Mapa3DProps {
  filtros: FiltrosMapa
  data: MapaData
}

type RGB = [number, number, number]

const PROFUNDIDAD = 0.75
const COLOR_BORDE = '#000000'
const LATITUD_MINIMA = -56
const ALTURA_CLICK = 0.6

const COLOR_CIELO = '#2A1A5A'
const COLOR_MAR = '#3A6EA5'
const COLOR_MAR_EMISSIVE = '#2A5585'
const RADIO_MAR = 500
const ALTURA_MAR = -0.05
const FOG_NEAR = 30
const FOG_FAR = 90

/* Colores de provincias (RGB 0-255, sRGB) */
const COLOR_BASE: RGB = [74, 84, 176]        // provincia fuera del filtro
const COLOR_NEUTRO: RGB = [124, 132, 184]    // provincia en modo barras (para que resalte el azul)
const COLOR_SIN_DATO: RGB = [90, 95, 134]    // provincia sin valor para el indicador

/* Barras */
const BAR_ANCHO = 0.4          // antes 1.6: más delgadas
const BAR_MIN_ALTURA = 0.1
const BAR_MAX_ALTURA = 2.5     // la altura no cambia
const BAR_LIFT = 0.6           // cuánto se eleva SOLO la barra bajo el cursor
const COLOR_BARRA_BAJO: RGB = [120, 190, 255]
const COLOR_BARRA_ALTO: RGB = [20, 70, 235]

const lerpRGB = (a: RGB, b: RGB, t: number): RGB => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
]
const colorBarra = (t: number): RGB =>
  lerpRGB(COLOR_BARRA_BAJO, COLOR_BARRA_ALTO, Math.max(0, Math.min(1, t)))

/** Convierte RGB 0-255 (sRGB) al espacio de trabajo de three.js. */
const toColor = ([r, g, b]: RGB) =>
  new THREE.Color().setRGB(r / 255, g / 255, b / 255, THREE.SRGBColorSpace)

/** null = sin filtro (todas activas). */
const estaActiva = (activas: Set<string> | null, nombre: string) =>
  !activas || activas.has(nombre)

function Mar() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, ALTURA_MAR, 0]}>
      <circleGeometry args={[RADIO_MAR, 128]} />
      <meshStandardMaterial color={COLOR_MAR} emissive={COLOR_MAR_EMISSIVE} emissiveIntensity={0.3} roughness={0.9} metalness={0.05} />
    </mesh>
  )
}

/* ═══════════════════ Escena ═══════════════════ */

function ProvinciasScene({ geojson, filtros, data }: {
  geojson: GeoJSONData; filtros: FiltrosMapa; data: MapaData
}) {
  // Hover y selección por NOMBRE de provincia (una provincia puede tener
  // varios polígonos: islas, etc.), no por índice de mesh.
  const [hoveredNombre, setHoveredNombre] = useState<string | null>(null)
  const [elevatedNombre, setElevatedNombre] = useState<string | null>(null)
  const barRefs = useRef<Map<string, THREE.Mesh>>(new Map())

  /* ── Valores por provincia (uno o varios años) ── */
  const valores = useMemo(() => {
    const anios = filtros.anios.length ? filtros.anios : [2022]
    const vals = new Map<string, number | null>()
    data.provincias.forEach((p) => {
      vals.set(p.nombre, calcularValorAnios(p, filtros.indicador, anios))
    })
    return vals
  }, [data, filtros.indicador, filtros.anios])

  /* ── Normalización 0..1: una para el color y otra (lineal) para la altura ── */
  const { normCalor, normBarra } = useMemo(() => {
    const calor = new Map<string, number | null>()
    const barra = new Map<string, number>()
    const finitos = [...valores.values()].filter((v): v is number => v != null && isFinite(v))

    if (finitos.length === 0) {
      valores.forEach((_, n) => { calor.set(n, null); barra.set(n, 0) })
      return { normCalor: calor, normBarra: barra }
    }

    const mn = Math.min(...finitos)
    const mx = Math.max(...finitos)
    // Las muertes absolutas están muy sesgadas (Buenos Aires ≈ 158.000, el
    // resto < 36.000): con escala lineal casi todo el mapa quedaba del mismo
    // azul. Para el COLOR se usa raíz cuadrada; la ALTURA sigue siendo
    // proporcional al valor real.
    const f = filtros.indicador === 'Muertes absolutas'
      ? (v: number) => Math.sqrt(Math.max(v, 0))
      : (v: number) => v
    const fmn = f(mn)
    const span = Math.max(1e-9, f(mx) - fmn)
    const spanLineal = Math.max(1e-9, mx - mn)

    valores.forEach((v, n) => {
      if (v == null || !isFinite(v)) { calor.set(n, null); barra.set(n, 0); return }
      calor.set(n, (f(v) - fmn) / span)
      barra.set(n, mn >= 0 ? (mx > 0 ? v / mx : 0) : (v - mn) / spanLineal)
    })
    return { normCalor: calor, normBarra: barra }
  }, [valores, filtros.indicador])

  /* ── Provincias activas según Región / Provincias del panel (null = todas) ── */
  const activas = useMemo<Set<string> | null>(() => {
    if (filtros.provincias.length > 0) return new Set(filtros.provincias)
    if (filtros.region !== 'Todas') {
      return new Set(data.provincias.filter((p) => p.region === filtros.region).map((p) => p.nombre))
    }
    return null
  }, [filtros.provincias, filtros.region, data.provincias])

  /* ── Geometrías: solo dependen del GeoJSON (no se rehacen al cambiar filtros) ── */
  const { meshes, centroidByProv } = useMemo(() => {
    const filteredFeatures = geojson.features
      .map((f) => {
        if (f.geometry.type === 'Polygon') return f
        const filteredCoords = f.geometry.coordinates.filter((poly) => {
          let minLat = Infinity
          poly[0].forEach(([, lat]) => { if (lat < minLat) minLat = lat })
          return minLat > LATITUD_MINIMA
        })
        return { ...f, geometry: { ...f.geometry, coordinates: filteredCoords } }
      })
      .filter((f) => f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates.length > 0 : true)

    const projection = geoMercator().fitSize([100, 100], {
      ...geojson, features: filteredFeatures,
    } as unknown as GeoJSON.FeatureCollection)

    const result: THREE.Mesh[] = []
    const centroids = new Map<string, THREE.Vector2>()

    filteredFeatures.forEach((feature) => {
      // Nombre unificado con mapa.json (Buenos Aires y Tierra del Fuego difieren)
      const nombre = nombreCanonico(feature.properties.nombre)
      const polygons = feature.geometry.type === 'Polygon'
        ? [feature.geometry.coordinates]
        : feature.geometry.coordinates

      // Polígono más grande (por caja envolvente): sirve de respaldo para el centroide
      const mayor = { area: -1, pts: [] as THREE.Vector2[] }

      polygons.forEach((polygon) => {
        polygon.forEach((ring, ringIndex) => {
          if (ringIndex !== 0) return
          const points: THREE.Vector2[] = []
          ring.forEach(([lng, lat]) => {
            if (typeof lng !== 'number' || typeof lat !== 'number' || !isFinite(lng) || !isFinite(lat)) return
            const proj = projection([lng, lat]); if (!proj) return
            const [x, y] = proj
            if (!isFinite(x) || !isFinite(y)) return
            points.push(new THREE.Vector2(x, -y))
          })
          if (points.length < 3) return

          let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
          points.forEach((p) => {
            if (p.x < minX) minX = p.x
            if (p.x > maxX) maxX = p.x
            if (p.y < minY) minY = p.y
            if (p.y > maxY) maxY = p.y
          })
          const area = (maxX - minX) * (maxY - minY)
          if (area > mayor.area) { mayor.area = area; mayor.pts = points }

          const shape = new THREE.Shape(points)
          const geometry = new THREE.ExtrudeGeometry(shape, { depth: PROFUNDIDAD, bevelEnabled: false })
          const material = new THREE.MeshStandardMaterial({
            color: toColor(COLOR_BASE), metalness: 0.2, roughness: 0.6,
          })
          const mesh = new THREE.Mesh(geometry, material)
          mesh.userData = { nombre, id: feature.properties.id }

          const outlinePts = points.map((p) => new THREE.Vector3(p.x, p.y, PROFUNDIDAD + 0.01))
          if (outlinePts.length > 0) outlinePts.push(outlinePts[0].clone())
          const outline = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(outlinePts),
            new THREE.LineBasicMaterial({ color: COLOR_BORDE, transparent: true, opacity: 0.75 })
          )
          outline.userData.tipo = 'borde'
          outline.raycast = () => {}
          mesh.add(outline)
          result.push(mesh)
        })
      })

      // Centroide: el que trae el GeoJSON (si cae en territorio válido; el de
      // Tierra del Fuego cae en la Antártida) o, si no, el promedio de los
      // vértices del polígono más grande.
      let centro: THREE.Vector2 | null = null
      const c = feature.properties.centroide
      if (c && isFinite(c.lon) && isFinite(c.lat) && c.lat > LATITUD_MINIMA) {
        const pr = projection([c.lon, c.lat])
        if (pr && isFinite(pr[0]) && isFinite(pr[1])) centro = new THREE.Vector2(pr[0], -pr[1])
      }
      if (!centro && mayor.pts.length > 0) {
        const acc = new THREE.Vector2()
        mayor.pts.forEach((p) => acc.add(p))
        acc.divideScalar(mayor.pts.length)
        centro = acc
      }
      if (centro) centroids.set(nombre, centro)
    })

    return { meshes: result, centroidByProv: centroids }
  }, [geojson])

  /* Liberar memoria de la GPU si se reconstruyen las geometrías */
  useEffect(() => {
    return () => {
      meshes.forEach((mesh) => {
        mesh.geometry.dispose()
        ;(mesh.material as THREE.Material).dispose()
        mesh.children.forEach((child) => {
          if (child instanceof THREE.Line) {
            child.geometry.dispose()
            ;(child.material as THREE.Material).dispose()
          }
        })
      })
    }
  }, [meshes])

  const mostrarBarras = filtros.viz === 'barras'
  const mostrarValores = filtros.viz === 'comparacion'

  /* Color objetivo de cada provincia (useFrame lo anima suavemente) */
  useEffect(() => {
    meshes.forEach((mesh) => {
      const nombre = mesh.userData.nombre as string
      const activa = estaActiva(activas, nombre)
      const t = normCalor.get(nombre) ?? null

      let color: RGB
      let emisivo: RGB | null
      if (!activa) {
        color = COLOR_BASE; emisivo = null
      } else if (mostrarBarras) {
        color = COLOR_NEUTRO; emisivo = COLOR_NEUTRO
      } else if (t == null) {
        color = COLOR_SIN_DATO; emisivo = COLOR_SIN_DATO
      } else {
        color = colorFromT(t); emisivo = color
      }

      mesh.userData.colorObjetivo = toColor(color)
      mesh.userData.emisivoObjetivo = emisivo ? toColor(emisivo) : new THREE.Color(0, 0, 0)

      const mat = mesh.material as THREE.MeshStandardMaterial
      mat.transparent = !activa
      mat.needsUpdate = true
    })
  }, [meshes, normCalor, activas, mostrarBarras])

  /* Animación continua (color, hover, elevación, opacidad, barras) */
  useFrame(() => {
    meshes.forEach((mesh) => {
      const nombre = mesh.userData.nombre as string
      const isActive = estaActiva(activas, nombre)
      const isHovered = hoveredNombre === nombre
      const isElevated = elevatedNombre === nombre

      const targetZ = isElevated ? ALTURA_CLICK : 0
      mesh.position.z += (targetZ - mesh.position.z) * 0.12

      const mat = mesh.material as THREE.MeshStandardMaterial
      const colorObj = mesh.userData.colorObjetivo as THREE.Color | undefined
      const emisivoObj = mesh.userData.emisivoObjetivo as THREE.Color | undefined
      if (colorObj) mat.color.lerp(colorObj, 0.15)
      if (emisivoObj) mat.emissive.lerp(emisivoObj, 0.15)

      let targetEmissive = 0
      if (isActive) targetEmissive = isElevated ? 0.9 : isHovered ? 0.7 : 0.2
      mat.emissiveIntensity += (targetEmissive - mat.emissiveIntensity) * 0.15
      const targetOpacity = isActive ? 1 : 0.35
      mat.opacity += (targetOpacity - mat.opacity) * 0.15

      mesh.children.forEach((child) => {
        if (child instanceof THREE.Line && child.userData.tipo === 'borde') {
          const lm = child.material as THREE.LineBasicMaterial
          let target = 0.75
          if (!isActive) target = 0.35
          else if (isElevated || isHovered) target = 1
          lm.opacity += (target - lm.opacity) * 0.15
          lm.needsUpdate = true
        }
      })
    })

    // Barras: la geometría mide 1 de alto en Z (Z local = "arriba" por la
    // rotación del grupo). La altura real sale de scale.z y la base queda
    // siempre apoyada sobre la provincia.
    barRefs.current.forEach((bar, nombre) => {
      const tb = normBarra.get(nombre) ?? 0
      const alturaObj = BAR_MIN_ALTURA + tb * BAR_MAX_ALTURA
      const h0: number = bar.userData.h ?? 0.001
      const h = h0 + (alturaObj - h0) * 0.12
      bar.userData.h = h
      bar.scale.z = h

      // Solo sube la barra de la provincia bajo el cursor (o la seleccionada)
      const isHovered = hoveredNombre === nombre
      const liftObj = (isHovered ? BAR_LIFT : 0) + (elevatedNombre === nombre ? ALTURA_CLICK : 0)
      const l0: number = bar.userData.lift ?? 0
      const lift = l0 + (liftObj - l0) * 0.18
      bar.userData.lift = lift
      bar.position.z = PROFUNDIDAD + lift + h / 2

      const col = toColor(colorBarra(tb))
      const m = bar.material as THREE.MeshStandardMaterial
      m.color.copy(col)
      m.emissive.copy(col)
      m.emissiveIntensity += ((isHovered ? 0.8 : 0.25) - m.emissiveIntensity) * 0.2
    })
  })

  /* Barras: solo para provincias activas que tengan valor. Al filtrar o
     cambiar de visualización se desmontan (antes quedaban en pantalla). */
  const barras = useMemo(() => {
    if (!mostrarBarras) return []
    return Array.from(centroidByProv.entries()).filter(
      ([nombre]) => estaActiva(activas, nombre) && valores.get(nombre) != null
    )
  }, [mostrarBarras, centroidByProv, activas, valores])

  const hoverCentro = hoveredNombre ? centroidByProv.get(hoveredNombre) : undefined
  const hoverValor = hoveredNombre ? valores.get(hoveredNombre) ?? null : null
  const hoverConBarra = mostrarBarras && !!hoverCentro && hoverValor != null
    && estaActiva(activas, hoveredNombre!)

  return (
    <>
      <Mar />
      <Center>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={0.4}>
          {meshes.map((mesh, i) => {
            const nombre = mesh.userData.nombre as string
            return (
              <primitive key={i} object={mesh}
                onPointerOver={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); setHoveredNombre(nombre) }}
                onPointerOut={() => setHoveredNombre((p) => (p === nombre ? null : p))}
                onClick={(e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); setElevatedNombre((p) => (p === nombre ? null : nombre)) }}
              />
            )
          })}

          {/* Barras 3D sobre cada provincia */}
          {barras.map(([nombre, c]) => (
            <mesh
              key={`bar-${nombre}`}
              position={[c.x, c.y, PROFUNDIDAD]}
              ref={(el) => {
                if (!el) { barRefs.current.delete(nombre); return }
                if (el.userData.h === undefined) {
                  // primera vez: arranca plana y crece con la animación
                  el.userData.h = 0.001
                  el.scale.set(1, 1, 0.001)
                }
                barRefs.current.set(nombre, el)
              }}
              onPointerOver={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); setHoveredNombre(nombre) }}
              onPointerOut={() => setHoveredNombre((p) => (p === nombre ? null : p))}
              onClick={(e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); setElevatedNombre((p) => (p === nombre ? null : nombre)) }}
            >
              {/* altura 1 en Z: la altura real sale de scale.z */}
              <boxGeometry args={[BAR_ANCHO, BAR_ANCHO, 1]} />
              <meshStandardMaterial metalness={0.2} roughness={0.5} emissiveIntensity={0.25} />
            </mesh>
          ))}

          {/* Cartel de la barra bajo el cursor */}
          {hoverConBarra && hoverCentro && (
            <Html
              position={[
                hoverCentro.x,
                hoverCentro.y,
                PROFUNDIDAD + BAR_MIN_ALTURA + (normBarra.get(hoveredNombre!) ?? 0) * BAR_MAX_ALTURA + BAR_LIFT + 0.9,
              ]}
              center
              distanceFactor={30}
              style={{ pointerEvents: 'none' }}
            >
              <div
                style={{
                  color: '#fff',
                  background: 'rgba(15,10,51,0.92)',
                  border: '1px solid rgba(78,205,196,0.6)',
                  borderRadius: 4,
                  padding: '2px 5px',
                  fontSize: 8,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                <div style={{ opacity: 0.75 }}>{hoveredNombre}</div>
                <div style={{ fontWeight: 700 }}>{formatearValor(hoverValor, filtros.indicador)}</div>
              </div>
            </Html>
          )}

          {/* Etiquetas numéricas flotantes (solo provincias activas con dato) */}
          {mostrarValores && (
            Array.from(centroidByProv.entries()).map(([nombre, c]) => {
              const v = valores.get(nombre) ?? null
              if (v == null || !estaActiva(activas, nombre)) return null
              return (
                <Html
                  key={`lbl-${nombre}`}
                  position={[c.x, c.y, PROFUNDIDAD + 0.02]}
                  center
                  distanceFactor={30}
                  style={{ pointerEvents: 'none' }}
                >
                  <div
                    style={{
                      color: '#102A43',
                      background: '#7FE7F2',
                      border: 'none',
                      borderRadius: 0,
                      padding: '2px 5px',
                      fontSize: 8,
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {formatearValor(v, filtros.indicador)}
                  </div>
                </Html>
              )
            })
          )}
        </group>
      </Center>
    </>
  )
}

/* ═══════════════════ Componente principal ═══════════════════ */

export default function Mapa3D({ filtros, data }: Mapa3DProps) {
  const [geojson, setGeojson] = useState<GeoJSONData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/models/provincias.geojson')
      .then((res) => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json() })
      .then((d: GeoJSONData) => setGeojson(d))
      .catch((e) => { console.error('[Mapa3D]', e); setError(e.message ?? 'Error') })
  }, [])

  if (error) return <div className="flex h-full items-center justify-center text-[#FF8A8A] text-sm"><p>Error: {error}</p></div>
  if (!geojson) return <div className="flex h-full items-center justify-center text-[#A5F3EA]/50 text-sm"><p>Cargando provincias…</p></div>

  return (
    <Canvas
      camera={{ position: [0, 5, 8], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true }}
      onCreated={({ scene }) => {
        scene.background = new THREE.Color(COLOR_CIELO)
        scene.fog = new THREE.Fog(COLOR_CIELO, FOG_NEAR, FOG_FAR)
      }}
    >
      <hemisphereLight args={[COLOR_CIELO, COLOR_MAR, 0.7]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[10, 15, 10]} intensity={1.0} />
      <directionalLight position={[-10, -5, -10]} intensity={0.3} />

      <Suspense fallback={null}>
        <ProvinciasScene geojson={geojson} filtros={filtros} data={data} />
      </Suspense>

      <OrbitControls enablePan enableZoom enableRotate maxPolarAngle={Math.PI / 2.2} minDistance={3} maxDistance={20} />
    </Canvas>
  )
}