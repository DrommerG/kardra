import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

function FloatingCube({ mouse }) {
  const meshRef = useRef()
  const edgesRef = useRef()
  const time = useRef(0)

  const edgeGeometry = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(1.8, 1.8, 1.8)), [])

  useFrame((state, delta) => {
    time.current += delta
    if (!meshRef.current) return

    // Slow autonomous rotation
    meshRef.current.rotation.y += delta * 0.18
    meshRef.current.rotation.x = Math.sin(time.current * 0.3) * 0.12

    // Subtle float
    meshRef.current.position.y = Math.sin(time.current * 0.5) * 0.12

    // Mouse reaction
    if (mouse.current) {
      meshRef.current.rotation.x += (mouse.current.y * 0.08 - meshRef.current.rotation.x) * 0.04
      meshRef.current.rotation.y += (mouse.current.x * 0.08 - meshRef.current.rotation.y) * 0.04
    }

    if (edgesRef.current) {
      edgesRef.current.rotation.copy(meshRef.current.rotation)
      edgesRef.current.position.copy(meshRef.current.position)
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.8, 1.8, 1.8]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.15}
          envMapIntensity={1.2}
        />
      </mesh>
      <lineSegments ref={edgesRef} geometry={edgeGeometry}>
        <lineBasicMaterial color="#6E1F28" linewidth={1.5} />
      </lineSegments>
      {/* Inner glow planes on faces */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const rotations = [
          [0, 0, 0], [0, Math.PI, 0],
          [0, Math.PI / 2, 0], [0, -Math.PI / 2, 0],
          [Math.PI / 2, 0, 0], [-Math.PI / 2, 0, 0],
        ]
        return (
          <mesh key={i} ref={(el) => {}} position={[0, 0, 0]} rotation={rotations[i]}>
            <planeGeometry args={[1.79, 1.79]} />
            <meshBasicMaterial
              color={i % 3 === 0 ? '#6E1F28' : '#1a1a1a'}
              transparent
              opacity={0.04}
              side={THREE.FrontSide}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function Scene({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#F5F3EF" />
      <directionalLight position={[-5, -3, -2]} intensity={0.4} color="#6E1F28" />
      <pointLight position={[0, 0, 4]} intensity={0.6} color="#4A0F1C" />
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
