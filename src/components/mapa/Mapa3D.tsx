import { Canvas, useFrame } from '@react-three/fiber'
import type { ThreeEvent } from '@react-three/fiber'
import { OrbitControls, Center } from '@react-three/drei'
import { Suspense, useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { geoMercator } from 'd3-geo'
import type { FiltrosMapa } from './PanelControl'

/* ═══════════════════════════════════════════════════════════
   TIPOS
   ═══════════════════════════════════════════════════════════ */

interface GeoFeature {
  type: string
  properties: { nombre: string; id: string | number }
  geometry:
    | { type: 'Polygon'; coordinates: number[][][] }
    | { type: 'MultiPolygon'; coordinates: number[][][][] }
}

interface GeoJSONData {
  type: 'FeatureCollection'
  features: GeoFeature[]
}

interface Mapa3DProps {
  filtros: FiltrosMapa
  onProvinciasCargadas: (nombres: string[]) => void
}

/* ═══════════════════════════════════════════════════════════
   CONSTANTES
   ═══════════════════════════════════════════════════════════ */

const PROFUNDIDAD = 0.75
const COLOR_BASE = '#4A54B0'
const COLOR_ACTIVA = '#4ECDC4'
const COLOR_BORDE = '#000000'
const LATITUD_MINIMA = -56
const ALTURA_CLICK = 0.6      // Cuánto se eleva al hacer click (era 1.5)

/* ── Cielo, mar y niebla ── */
// ⚠️ Cambiá COLOR_CIELO acá para cambiar el fondo del mundo 3D
const COLOR_CIELO = '#2A1A5A'        // Dusk violeta (antes era '#B0D4E8')
const COLOR_MAR = '#3A6EA5'
const COLOR_MAR_EMISSIVE = '#2A5585'
const RADIO_MAR = 500
const ALTURA_MAR = -0.05
const FOG_NEAR = 30
const FOG_FAR = 90

/* ═══════════════════════════════════════════════════════════
   COMPONENTE: MAR
   ═══════════════════════════════════════════════════════════ */

function Mar() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, ALTURA_MAR, 0]}>
      <circleGeometry args={[RADIO_MAR, 128]} />
      <meshStandardMaterial
        color={COLOR_MAR}
        emissive={COLOR_MAR_EMISSIVE}
        emissiveIntensity={0.3}
        roughness={0.9}
        metalness={0.05}
      />
    </mesh>
  )
}

/* ═══════════════════════════════════════════════════════════
   ESCENA INTERNA
   ═══════════════════════════════════════════════════════════ */

function ProvinciasScene({
  geojson,
  filtros,
}: {
  geojson: GeoJSONData
  filtros: FiltrosMapa
}) {
  // hover: solo para iluminar
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  // click: para elevar la provincia (una a la vez)
  const [elevatedIndex, setElevatedIndex] = useState<number | null>(null)

  const meshes = useMemo(() => {
    /* ── 1) Filtrar Antártida ── */
    const filteredFeatures = geojson.features
      .map((feature) => {
        if (feature.geometry.type === 'Polygon') return feature

        const filteredCoords = feature.geometry.coordinates.filter(
          (polygon) => {
            let minLat = Infinity
            polygon[0].forEach(([, lat]) => {
              if (lat < minLat) minLat = lat
            })
            return minLat > LATITUD_MINIMA
          }
        )

        return {
          ...feature,
          geometry: {
            ...feature.geometry,
            coordinates: filteredCoords,
          },
        }
      })
      .filter((f) => {
        if (f.geometry.type === 'MultiPolygon') {
          return f.geometry.coordinates.length > 0
        }
        return true
      })

    /* ── 2) Proyección sobre datos filtrados ── */
    const projection = geoMercator().fitSize([100, 100], {
      ...geojson,
      features: filteredFeatures,
    } as unknown as GeoJSON.FeatureCollection)

    const result: THREE.Mesh[] = []

    filteredFeatures.forEach((feature) => {
      const polygons =
        feature.geometry.type === 'Polygon'
          ? [feature.geometry.coordinates]
          : feature.geometry.coordinates

      polygons.forEach((polygon) => {
        polygon.forEach((ring, ringIndex) => {
          if (ringIndex !== 0) return

          const points: THREE.Vector2[] = []
          ring.forEach(([lng, lat]) => {
            if (
              typeof lng !== 'number' ||
              typeof lat !== 'number' ||
              !isFinite(lng) ||
              !isFinite(lat)
            )
              return

            const projected = projection([lng, lat])
            if (!projected) return

            const [x, y] = projected
            if (!isFinite(x) || !isFinite(y)) return

            points.push(new THREE.Vector2(x, -y))
          })

          if (points.length < 3) return

          /* ── 3) Geometría extruida ── */
          const shape = new THREE.Shape(points)
          const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: PROFUNDIDAD,
            bevelEnabled: false,
          })

          const material = new THREE.MeshStandardMaterial({
            color: COLOR_BASE,
            metalness: 0.2,
            roughness: 0.6,
          })

          const mesh = new THREE.Mesh(geometry, material)
          mesh.userData = {
            nombre: feature.properties.nombre,
            id: feature.properties.id,
          }

          /* ── 4) Contorno negro (no clickeable) ── */
          const outlinePts = points.map(
            (p) => new THREE.Vector3(p.x, p.y, PROFUNDIDAD + 0.01)
          )
          if (outlinePts.length > 0) {
            outlinePts.push(outlinePts[0].clone())
          }

          const outlineGeo = new THREE.BufferGeometry().setFromPoints(
            outlinePts
          )
          const outlineMat = new THREE.LineBasicMaterial({
            color: COLOR_BORDE,
            transparent: true,
            opacity: 0.75,
          })
          const outline = new THREE.Line(outlineGeo, outlineMat)
          outline.userData.tipo = 'borde'
          outline.raycast = () => {}
          mesh.add(outline)

          result.push(mesh)
        })
      })
    })

    return result
  }, [geojson])

  /* ── Cambios discretos (color y transparencia) ── */
  useEffect(() => {
    const activas = new Set(filtros.provincias)
    const haySeleccion = activas.size > 0

    meshes.forEach((mesh) => {
      const nombre = mesh.userData.nombre as string
      const isActive = !haySeleccion || activas.has(nombre)

      const mat = mesh.material as THREE.MeshStandardMaterial
      mat.color.set(isActive ? COLOR_ACTIVA : COLOR_BASE)
      mat.emissive.set(isActive ? COLOR_ACTIVA : '#000000')
      mat.transparent = !isActive
      mat.needsUpdate = true
    })
  }, [meshes, filtros.provincias])

  /* ── Animación continua ── */
  useFrame(() => {
    const activas = new Set(filtros.provincias)
    const haySeleccion = activas.size > 0

    meshes.forEach((mesh, i) => {
      const nombre = mesh.userData.nombre as string
      const isActive = !haySeleccion || activas.has(nombre)
      const isHovered = hoveredIndex === i
      const isElevated = elevatedIndex === i

      /* ── Elevación: SOLO si está clickeada ── */
      const targetZ = isElevated ? ALTURA_CLICK : 0
      mesh.position.z += (targetZ - mesh.position.z) * 0.12

      const mat = mesh.material as THREE.MeshStandardMaterial

      /* ── Emissive: hover sube el brillo, click un poco más ── */
      // Base: 0.2 | Hover: 0.7 | Click: 0.9 | Inactiva: 0
      let targetEmissive = 0
      if (isActive) {
        if (isElevated) targetEmissive = 0.9
        else if (isHovered) targetEmissive = 0.7
        else targetEmissive = 0.2
      }
      mat.emissiveIntensity += (targetEmissive - mat.emissiveIntensity) * 0.15

      /* ── Opacidad ── */
      const targetOpacity = isActive ? 1 : 0.35
      mat.opacity += (targetOpacity - mat.opacity) * 0.15

      /* ── Bordes: hover ilumina, click deja brillante ── */
      mesh.children.forEach((child) => {
        if (child instanceof THREE.Line && child.userData.tipo === 'borde') {
          const lineMat = child.material as THREE.LineBasicMaterial
          let targetLineOpacity = 0.75
          if (!isActive) targetLineOpacity = 0.35
          else if (isElevated) targetLineOpacity = 1
          else if (isHovered) targetLineOpacity = 1
          lineMat.opacity += (targetLineOpacity - lineMat.opacity) * 0.15
          lineMat.needsUpdate = true
        }
      })
    })
  })

  return (
    <>
      <Mar />

      <Center>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={0.4}>
          {meshes.map((mesh, i) => (
            <primitive
              key={i}
              object={mesh}
              onPointerOver={(e: ThreeEvent<PointerEvent>) => {
                e.stopPropagation()
                setHoveredIndex(i)
              }}
              onPointerOut={() => {
                setHoveredIndex(null)
              }}
              onClick={(e: ThreeEvent<MouseEvent>) => {
                e.stopPropagation()
                // Toggle: si ya estaba elevada, la bajo. Si no, la subo.
                setElevatedIndex((prev) => (prev === i ? null : i))
              }}
            />
          ))}
        </group>
      </Center>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
   ═══════════════════════════════════════════════════════════ */

export default function Mapa3D({
  filtros,
  onProvinciasCargadas,
}: Mapa3DProps) {
  const [geojson, setGeojson] = useState<GeoJSONData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/models/provincias.geojson')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data: GeoJSONData) => {
        setGeojson(data)
        const nombres = data.features
          .map((f) => f.properties.nombre)
          .filter(Boolean)
          .sort()
        onProvinciasCargadas(nombres)
        console.log(`[Mapa3D] Provincias cargadas: ${nombres.length}`)
      })
      .catch((err) => {
        console.error('[Mapa3D] Error cargando GeoJSON:', err)
        setError(err.message ?? 'Error desconocido')
      })
  }, [onProvinciasCargadas])

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-[#FF8A8A] text-sm">
        <p>Error cargando el mapa: {error}</p>
      </div>
    )
  }

  if (!geojson) {
    return (
      <div className="flex items-center justify-center h-full text-[#A5F3EA]/50 text-sm">
        <p>Cargando provincias…</p>
      </div>
    )
  }

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
        <ProvinciasScene geojson={geojson} filtros={filtros} />
      </Suspense>

      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        maxPolarAngle={Math.PI / 2.2}
        minDistance={3}
        maxDistance={20}
      />
    </Canvas>
  )
}