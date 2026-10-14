import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const MODEL_PATH = '/models/heart-low-poly.glb'

// ── Paleta del corazón ──
const HEART_COLOR = '#E85D75'
const HEART_EMISSIVE = '#C430E3'
const HEART_GLOW = 0.55

// ── Velocidad del latido (menor = más lento) ──
const BEAT_SPEED = 0.85

// ── Orientación del modelo ──
// Estrategia: probar en orden hasta que se vea "parado".
// Guardá, recargá con Ctrl+Shift+R, y mirá cómo queda.
//
//   Opción 1: sin rotación (orientación "cruda" del GLB)
//   Opción 2: corregir Z-up → Y-up (común en Blender)
//   Opción 3: rotación inversa
//   Opción 4: boca arriba
//
// 
// 
// 

// ← ACTIVA esta para empezar limpio:
const MODEL_ROTATION: [number, number, number] = [-Math.PI / 2, 0, 10]

function Heart({ scale = 1 }: { scale?: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF(MODEL_PATH)
  const [ready, setReady] = useState(false)

  const cloned = useMemo(() => scene.clone(true), [scene])

  useEffect(() => {
    // ── Aplicar rotación ANTES de medir el bounding box ──
    cloned.rotation.set(...MODEL_ROTATION)
    cloned.updateMatrixWorld(true)

    const box = new THREE.Box3().setFromObject(cloned)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())

    const maxDim = Math.max(size.x, size.y, size.z) || 1
    const factor = 2 / maxDim

    // Escalar + posicionar centrado (con offset escalado)
    cloned.scale.setScalar(factor)
    cloned.position.set(
      -center.x * factor,
      -center.y * factor,
      -center.z * factor
    )

    // Material adaptado al sitio
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(HEART_COLOR),
          emissive: new THREE.Color(HEART_EMISSIVE),
          emissiveIntensity: HEART_GLOW,
          roughness: 0.45,
          metalness: 0.1,
          flatShading: true,
          side: THREE.DoubleSide,
          vertexColors: false,
        })
      }
    })

    // Debug: dimensiones rotadas y factor de escala
    console.log('[Heart] size rotado:', size)
    console.log('[Heart] factor:', factor)

    setReady(true)
  }, [cloned])

  // Animación de latido "lub-dub" (fuerte + suave + pausa)
  useFrame((state) => {
    if (!groupRef.current || !ready) return
    const t = state.clock.elapsedTime * BEAT_SPEED
    const phase = t % 1

    let beat = 0
    if (phase < 0.12) beat = Math.sin((phase / 0.12) * Math.PI)
    else if (phase < 0.22) beat = 0
    else if (phase < 0.34)
      beat = 0.55 * Math.sin(((phase - 0.22) / 0.12) * Math.PI)

    const s = 1 + beat * 0.08
    groupRef.current.scale.setScalar(s * scale)
  })

  return (
    <group ref={groupRef}>
      <primitive object={cloned} />
    </group>
  )
}

useGLTF.preload(MODEL_PATH)

interface HeartModelProps {
  className?: string
  scale?: number
}

export default function HeartModel({
  className = '',
  scale = 1,
}: HeartModelProps) {
  return (
    <div
      className={className}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
        style={{ pointerEvents: 'none' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.6} />
        <directionalLight position={[-5, -3, -3]} intensity={0.6} />
        <pointLight position={[-3, 2, 2]} color="#C4A3FF" intensity={1.4} />
        <pointLight position={[3, -2, 1]} color="#4ECDC4" intensity={1.2} />

        <Suspense fallback={null}>
          <Heart scale={scale} />
        </Suspense>
      </Canvas>
    </div>
  )
}

/**
 * Precarga el modelo 3D disparando su descarga y parseo en background.
 * Es fire-and-forget: no bloquea ni devuelve promesa, pero cuando el
 * usuario navegue a Historias, el modelo ya está en la caché interna
 * de drei (useGLTF) y se muestra al instante.
 *
 * Se llama desde la pantalla de carga (App.tsx).
 */
export function preloadHeartModel() {
  useGLTF.preload(MODEL_PATH)
}