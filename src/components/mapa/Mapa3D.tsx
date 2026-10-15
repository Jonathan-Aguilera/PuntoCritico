import { Canvas, useFrame } from '@react-three/fiber'
import type { ThreeEvent } from '@react-three/fiber'
import { OrbitControls, Center, Html } from '@react-three/drei'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { geoMercator } from 'd3-geo'
import type { FiltrosMapa } from './PanelControl'
import type { MapaData, Provincia } from '../../data/types/mapa'
import { calcularValor, formatearValor } from '../../data/services/mapaService'
import { colorFromT } from '../../lib/colorScale'

interface GeoFeature {
  type: string
  properties: { nombre: string; id: string | number }
  geometry:
    | { type: 'Polygon'; coordinates: number[][][] }
    | { type: 'MultiPolygon'; coordinates: number[][][][] }
}
interface GeoJSONData { type: 'FeatureCollection'; features: GeoFeature[] }

interface Mapa3DProps {
  filtros: FiltrosMapa
  data: MapaData
}

const PROFUNDIDAD = 0.75
const COLOR_BASE = '#4A54B0'
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

const BAR_MAX_ALTURA = 3.5
const BAR_ANCHO = 1.6

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [elevatedIndex, setElevatedIndex] = useState<number | null>(null)
  const barRefs = useRef<Map<string, THREE.Mesh>>(new Map())

  const anio = filtros.anios[0] ?? 2022

  /* Valores + min/max por provincia */
  const { valores, min, max } = useMemo(() => {
    const vals = new Map<string, number | null>()
    let mn = Infinity, mx = -Infinity
    data.provincias.forEach((p) => {
      const v = calcularValor(p, filtros.indicador, anio)
      vals.set(p.nombre, v)
      if (v != null && isFinite(v)) { if (v < mn) mn = v; if (v > mx) mx = v }
    })
    return { valores: vals, min: mn, max: mx }
  }, [data, filtros.indicador, anio])

  /* Geometrías de las provincias */
  const { meshes, centroidByProv, normByProv } = useMemo(() => {
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
    const norms = new Map<string, number>()

    filteredFeatures.forEach((feature) => {
      const polygons = feature.geometry.type === 'Polygon'
        ? [feature.geometry.coordinates]
        : feature.geometry.coordinates

      const allPoints: THREE.Vector2[] = []

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
            allPoints.push(new THREE.Vector2(x, -y))
          })
          if (points.length < 3) return

          const shape = new THREE.Shape(points)
          const geometry = new THREE.ExtrudeGeometry(shape, { depth: PROFUNDIDAD, bevelEnabled: false })
          const material = new THREE.MeshStandardMaterial({ color: COLOR_BASE, metalness: 0.2, roughness: 0.6 })
          const mesh = new THREE.Mesh(geometry, material)
          mesh.userData = { nombre: feature.properties.nombre, id: feature.properties.id }

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

      // Centroide aproximado = promedio de todos los puntos
      if (allPoints.length > 0) {
        const c = new THREE.Vector2()
        allPoints.forEach((p) => c.add(p))
        c.divideScalar(allPoints.length)
        centroids.set(feature.properties.nombre, c)
      }
    })

    // Normalizar valores 0..1 por provincia
    const span = Math.max(1e-9, (max - min))
    valores.forEach((v, nombre) => {
      if (v == null || !isFinite(v)) { norms.set(nombre, 0); return }
      norms.set(nombre, (v - min) / span)
    })

    return { meshes: result, centroidByProv: centroids, normByProv: norms }
  }, [geojson, valores, min, max])

  /* Actualizar color de cada mesh según valor */
  useEffect(() => {
    const activas = new Set(filtros.provincias)
    const haySeleccion = activas.size > 0

    meshes.forEach((mesh) => {
      const nombre = mesh.userData.nombre as string
      const isActive = !haySeleccion || activas.has(nombre)
      const t = normByProv.get(nombre) ?? 0
      const [r, g, b] = colorFromT(t)
      const mat = mesh.material as THREE.MeshStandardMaterial
      if (isActive) {
        mat.color.setRGB(r / 255, g / 255, b / 255)
        mat.emissive.setRGB(r / 255, g / 255, b / 255)
      } else {
        mat.color.set(COLOR_BASE); mat.emissive.set('#000000')
      }
      mat.transparent = !isActive
      mat.needsUpdate = true
    })
  }, [meshes, normByProv, filtros.provincias])

  /* Animación continua (hover, elevación, opacidad) */
  useFrame(() => {
    const activas = new Set(filtros.provincias)
    const haySeleccion = activas.size > 0
    meshes.forEach((mesh, i) => {
      const nombre = mesh.userData.nombre as string
      const isActive = !haySeleccion || activas.has(nombre)
      const isHovered = hoveredIndex === i
      const isElevated = elevatedIndex === i
      const targetZ = isElevated ? ALTURA_CLICK : 0
      mesh.position.z += (targetZ - mesh.position.z) * 0.12
      const mat = mesh.material as THREE.MeshStandardMaterial
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

    // Animar barras
    barRefs.current.forEach((bar, nombre) => {
      const target = normByProv.get(nombre) ?? 0
      const current = bar.userData.currentHeight ?? 0
      const next = current + (target - current) * 0.12
      bar.userData.currentHeight = next
      bar.scale.y = Math.max(0.001, next)
      const t = normByProv.get(nombre) ?? 0
      const [r, g, b] = colorFromT(t)
      const m = bar.material as THREE.MeshStandardMaterial
      m.color.setRGB(r / 255, g / 255, b / 255)
      m.emissive.setRGB(r / 255, g / 255, b / 255)
    })
  })

  const mostrarBarras = filtros.viz === 'barras'
  const mostrarValores = filtros.viz === 'comparacion'

  return (
    <>
      <Mar />
      <Center>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={0.4}>
          {meshes.map((mesh, i) => (
            <primitive key={i} object={mesh}
              onPointerOver={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); setHoveredIndex(i) }}
              onPointerOut={() => setHoveredIndex(null)}
              onClick={(e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); setElevatedIndex((p) => (p === i ? null : i)) }}
            />
          ))}

          {/* Barras 3D sobre cada provincia */}
          {mostrarBarras && (
            Array.from(centroidByProv.entries()).map(([nombre, c]) => {
              const t = normByProv.get(nombre) ?? 0
              const altura = 0.1 + t * BAR_MAX_ALTURA
              const [r, g, b] = colorFromT(t)
              return (
                <mesh
                  key={`bar-${nombre}`}
                  position={[c.x, c.y, PROFUNDIDAD + altura / 2]}
                  ref={(el) => {
                    if (!el) return
                    el.userData.currentHeight = 1
                    el.scale.y = 1
                    barRefs.current.set(nombre, el)
                  }}
                >
                  <boxGeometry args={[BAR_ANCHO, BAR_ANCHO, altura]} />
                  <meshStandardMaterial
                    color={`rgb(${r}, ${g}, ${b})`}
                    emissive={`rgb(${r}, ${g}, ${b})`}
                    emissiveIntensity={0.4}
                    metalness={0.2}
                    roughness={0.5}
                  />
                </mesh>
              )
            })
          )}

          {/* Etiquetas numéricas flotantes */}
          {mostrarValores && (
            Array.from(centroidByProv.entries()).map(([nombre, c]) => {
              const v = valores.get(nombre) ?? null
              if (v == null) return null
              return (
                <Html
                  key={`lbl-${nombre}`}
                  position={[c.x, c.y, PROFUNDIDAD + 1.5]}
                  center
                  distanceFactor={30}
                  style={{ pointerEvents: 'none' }}
                >
                  <div
                    style={{
                      color: '#fff',
                      background: 'rgba(15,10,51,0.85)',
                      border: '1px solid rgba(78,205,196,0.5)',
                      borderRadius: 6,
                      padding: '2px 6px',
                      fontSize: 10,
                      fontWeight: 700,
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