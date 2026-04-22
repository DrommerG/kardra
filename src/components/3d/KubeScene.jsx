import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloatingParticles({ count = 120 }) {
  const pointsRef = useRef()

  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const siz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const radius = 2.2 + Math.random() * 1.8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = radius * Math.cos(phi)
      siz[i] = Math.random() * 0.025 + 0.008
    }
    return { positions: pos, sizes: siz }
  }, [count])

  useFrame((state, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += delta * 0.04
    pointsRef.current.rotation.x += delta * 0.015
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#6E1F28"
        size={0.035}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function GlowHalo() {
  const haloRef = useRef()

  useFrame((state) => {
    if (!haloRef.current) return
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.04
    haloRef.current.scale.set(pulse, pulse, pulse)
  })

  return (
    <sprite ref={haloRef} scale={[4.2, 4.2, 1]}>
      <spriteMaterial
        map={useMemo(() => {
          const canvas = document.createElement('canvas')
          canvas.width = 256
          canvas.height = 256
          const ctx = canvas.getContext('2d')
          const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
          gradient.addColorStop(0, 'rgba(110, 31, 40, 0.55)')
          gradient.addColorStop(0.4, 'rgba(74, 15, 28, 0.18)')
          gradient.addColorStop(1, 'rgba(10, 10, 10, 0)')
          ctx.fillStyle = gradient
          ctx.fillRect(0, 0, 256, 256)
          const tex = new THREE.CanvasTexture(canvas)
          tex.needsUpdate = true
          return tex
        }, [])}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </sprite>
  )
}

function FloatingCube({ mouse }) {
  const meshRef = useRef()
  const edgesRef = useRef()
  const edgesGlowRef = useRef()
  const time = useRef(0)
  const targetRot = useRef({ x: 0, y: 0 })

  const edgeGeometry = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(1.8, 1.8, 1.8)),
    []
  )
  const edgeGlowGeometry = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(1.82, 1.82, 1.82)),
    []
  )

  useFrame((state, delta) => {
    time.current += delta
    if (!meshRef.current) return

    meshRef.current.rotation.y += delta * 0.18
    const baseX = Math.sin(time.current * 0.3) * 0.12
    meshRef.current.position.y = Math.sin(time.current * 0.5) * 0.12

    if (mouse.current) {
      targetRot.current.x += (mouse.current.y * 0.25 - targetRot.current.x) * 0.06
      targetRot.current.y += (mouse.current.x * 0.25 - targetRot.current.y) * 0.06
    }
    meshRef.current.rotation.x = baseX + targetRot.current.x
    meshRef.current.rotation.y += targetRot.current.y * 0.01

    if (edgesRef.current) {
      edgesRef.current.rotation.copy(meshRef.current.rotation)
      edgesRef.current.position.copy(meshRef.current.position)
    }
    if (edgesGlowRef.current) {
      edgesGlowRef.current.rotation.copy(meshRef.current.rotation)
      edgesGlowRef.current.position.copy(meshRef.current.position)
      const flicker = 0.55 + Math.sin(time.current * 1.6) * 0.15
      edgesGlowRef.current.material.opacity = flicker
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.8, 1.8, 1.8]} />
        <meshStandardMaterial
          color="#0E0E10"
          metalness={1.0}
          roughness={0.22}
          envMapIntensity={1.5}
          emissive="#1A0509"
          emissiveIntensity={0.35}
        />
      </mesh>

      <lineSegments ref={edgesRef} geometry={edgeGeometry}>
        <lineBasicMaterial
          color="#C2303D"
          transparent
          opacity={0.95}
          toneMapped={false}
        />
      </lineSegments>

      <lineSegments ref={edgesGlowRef} geometry={edgeGlowGeometry}>
        <lineBasicMaterial
          color="#6E1F28"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  )
}

function Scene({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 5, 5]} intensity={1.1} color="#F5F3EF" />
      <directionalLight position={[-5, -3, -2]} intensity={0.55} color="#6E1F28" />
      <pointLight position={[0, 0, 4]} intensity={0.7} color="#4A0F1C" />
      <pointLight position={[-2, 2, 2]} intensity={0.4} color="#8A2632" distance={8} />
      <GlowHalo />
      <FloatingParticles count={140} />
      <FloatingCube mouse={mouse} />
    </>
  )
}

export default function KubeScene({ mouse }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Scene mouse={mouse} />
    </Canvas>
  )
}
