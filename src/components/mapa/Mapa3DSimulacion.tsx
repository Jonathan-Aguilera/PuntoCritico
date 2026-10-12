import { Canvas } from '@react-three/fiber'
import { OrbitControls, Center } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import * as THREE from 'three'
import { geoMercator } from 'd3-geo'

interface GeoFeature {
  type: string
  properties: { nombre: string; id: string | number }
  geometry:
  | { type: 'Polygon'; coordinates: number[][][] }
  | { type: 'MultiPolygon'; coordinates: number[][][][] }
}

function Mapa() {
  const [provincias, setProvincias] = useState<THREE.Mesh[]>([])

  useEffect(() => {
    fetch('/models/provincias.geojson')
      .then((res) => res.json())
      .then((geojson) => {
        // Proyección: adapta las coordenadas lng/lat a un área de 100x100
        const projection = geoMercator().fitSize([100, 100], geojson)
        const meshes: THREE.Mesh[] = []

        geojson.features.forEach((feature: GeoFeature) => {
          // Normalizamos a un array de polígonos
          const polygons =
            feature.geometry.type === 'Polygon'
              ? [feature.geometry.coordinates]
              : feature.geometry.coordinates

          polygons.forEach((polygon) => {
            polygon.forEach((ring, ringIndex) => {
              // Solo procesamos el anillo exterior (ringIndex 0)
              if (ringIndex !== 0) return

              const points: THREE.Vector2[] = []

              ring.forEach(([lng, lat]) => {
                // Validamos que las coordenadas sean números finitos
                if (
                  typeof lng !== 'number' ||
                  typeof lat !== 'number' ||
                  !isFinite(lng) ||
                  !isFinite(lat)
                ) {
                  return
                }

                const projected = projection([lng, lat])
                if (!projected) return

                const [x, y] = projected
                if (!isFinite(x) || !isFinite(y)) return

                points.push(new THREE.Vector2(x, -y))
              })

              // Necesitamos al menos 3 puntos para formar un polígono
              if (points.length < 3) return

              const shape = new THREE.Shape(points)
              const geometry = new THREE.ExtrudeGeometry(shape, {
                depth: 1.5,
                bevelEnabled: false,
              })

              const material = new THREE.MeshStandardMaterial({
                color: '#434DA8',
                metalness: 0.2,
                roughness: 0.6,
              })

              const mesh = new THREE.Mesh(geometry, material)
              mesh.userData = { nombre: feature.properties.nombre }
              meshes.push(mesh)
            })
          })
        })

        console.log(`Provincias cargadas: ${meshes.length}`)
        setProvincias(meshes)
      })
      .catch((err) => {
        console.error('Error cargando GeoJSON:', err)
      })
  }, [])

  if (provincias.length === 0) return null

  return (
    <Center>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.4}>
        {provincias.map((mesh, i) => (
          <primitive key={i} object={mesh} />
        ))}
      </group>
    </Center>
  )
}

export default function Mapa3DSimulacion() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [0, 5, 8], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 15, 10]} intensity={1.2} />

        <Suspense fallback={null}>
          <Mapa />
        </Suspense>

        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>
    </div>
  )
}