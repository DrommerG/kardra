import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

/* ── Particles ─────────────────────────────────────────────── */

function FloatingParticles({ count = 100 }) {
  const ref = useRef()
  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const siz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const radius = 2.4 + Math.random() * 1.6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i*3]   = radius * Math.sin(phi) * Math.cos(theta)
      pos[i*3+1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i*3+2] = radius * Math.cos(phi)
      siz[i] = Math.random() * 0.022 + 0.006
    }
    return { positions: pos, sizes: siz }
  }, [count])

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.035
    ref.current.rotation.x += delta * 0.012
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length/3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size"     count={sizes.length}       array={sizes}     itemSize={1} />
      </bufferGeometry>
      <pointsMaterial color="#d29f22" size={0.028} transparent opacity={0.45} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

/* ── Glow halo ─────────────────────────────────────────────── */

function GlowHalo() {
  const ref = useRef()
  const tex = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 256; c.height = 256
    const ctx = c.getContext('2d')
    const g = ctx.createRadialGradient(128,128,0,128,128,128)
    g.addColorStop(0,   'rgba(210,159,34,0.4)')
    g.addColorStop(0.4, 'rgba(93,0,24,0.12)')
    g.addColorStop(1,   'rgba(25,23,27,0)')
    ctx.fillStyle = g
    ctx.fillRect(0,0,256,256)
    const t = new THREE.CanvasTexture(c)
    t.needsUpdate = true
    return t
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const p = 1 + Math.sin(state.clock.elapsedTime * 0.7) * 0.05
    ref.current.scale.set(p, p, p)
  })

  return (
    <sprite ref={ref} scale={[4.5, 4.5, 1]}>
      <spriteMaterial map={tex} transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.9} />
    </sprite>
  )
}

/* ── Floating Cube with real image textures ─────────────────── */

function FloatingCube({ mouse }) {
  const meshRef     = useRef()
  const edgesRef    = useRef()
  const edgeGlowRef = useRef()
  const time        = useRef(0)
  const targetRot   = useRef({ x: 0, y: 0 })

  // Load real photorealistic images for each face
  const textures = useLoader(THREE.TextureLoader, [
    '/kardra/assets/cube/face_1.png',
    '/kardra/assets/cube/face_2.png',
    '/kardra/assets/cube/face_3.png',
    '/kardra/assets/cube/face_4.png',
    '/kardra/assets/cube/face_5.png',
    '/kardra/assets/cube/face_6.png',
  ])

  const cubeMaterials = useMemo(() =>
    textures.map(tex => new THREE.MeshStandardMaterial({
      map: tex,
      metalness: 0.15,
      roughness: 0.65,
      emissive: new THREE.Color('#050304'),
      emissiveIntensity: 0.1,
    }))
  , [textures])

  const edgeGeometry     = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(2.0,2.0,2.0)), [])
  const edgeGlowGeometry = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(2.06,2.06,2.06)), [])

  useFrame((_, delta) => {
    time.current += delta
    if (!meshRef.current) return

    // Continuous auto-rotation on Y axis — fast enough to show all 6 faces
    meshRef.current.rotation.y += delta * 0.28

    // Gentle floating bob
    meshRef.current.position.y = Math.sin(time.current * 0.5) * 0.12

    // Subtle organic X oscillation
    const baseX = Math.sin(time.current * 0.28) * 0.12

    // Mouse influence — responsive enough to see different faces
    if (mouse.current) {
      targetRot.current.x += (mouse.current.y * 0.9 - targetRot.current.x) * 0.08
      targetRot.current.y += (mouse.current.x * 0.9 - targetRot.current.y) * 0.08
    }

    meshRef.current.rotation.x = baseX + targetRot.current.x
    meshRef.current.rotation.y += targetRot.current.y * 0.04

    if (edgesRef.current) {
      edgesRef.current.rotation.copy(meshRef.current.rotation)
      edgesRef.current.position.copy(meshRef.current.position)
    }
    if (edgeGlowRef.current) {
      edgeGlowRef.current.rotation.copy(meshRef.current.rotation)
      edgeGlowRef.current.position.copy(meshRef.current.position)
      edgeGlowRef.current.material.opacity = 0.5 + Math.sin(time.current * 1.4) * 0.18
    }
  })

  return (
    <group>
      <mesh ref={meshRef} material={cubeMaterials}>
        <boxGeometry args={[2.0, 2.0, 2.0]} />
      </mesh>

      {/* Gold edge lines */}
      <lineSegments ref={edgesRef} geometry={edgeGeometry}>
        <lineBasicMaterial color="#d29f22" transparent opacity={0.9} toneMapped={false} />
      </lineSegments>

      {/* Pulsing gold edge glow */}
      <lineSegments ref={edgeGlowRef} geometry={edgeGlowGeometry}>
        <lineBasicMaterial color="#d29f22" transparent opacity={0.5} blending={THREE.AdditiveBlending} toneMapped={false} depthWrite={false} />
      </lineSegments>
    </group>
  )
}

/* ── Scene ─────────────────────────────────────────────────── */

function Scene({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5,5,5]}   intensity={1.4} color="#f0ede8" />
      <directionalLight position={[-5,-3,-2]} intensity={0.5} color="#d29f22" />
      <pointLight position={[0,0,4]} intensity={0.6} color="#5d0018" />
      <pointLight position={[-2,2,2]} intensity={0.4} color="#d29f22" distance={8} />
      <GlowHalo />
      <FloatingParticles count={120} />
      <FloatingCube mouse={mouse} />
    </>
  )
}

export default function KubeScene({ mouse }) {
  return (
    <Canvas camera={{ position: [0,0,4.8], fov: 44 }} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
      <Scene mouse={mouse} />
    </Canvas>
  )
}
