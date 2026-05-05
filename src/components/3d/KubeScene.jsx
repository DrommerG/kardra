import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ── Canvas texture helpers ───────────────────────────────── */

function makeTex(drawFn) {
  const S = 512
  const c = document.createElement('canvas')
  c.width = S; c.height = S
  const ctx = c.getContext('2d')

  // Base
  ctx.fillStyle = '#19171b'
  ctx.fillRect(0, 0, S, S)

  // Gold outer border
  ctx.strokeStyle = '#d29f22'
  ctx.lineWidth = 10
  ctx.strokeRect(5, 5, S - 10, S - 10)

  // Inner subtle border
  ctx.strokeStyle = '#2e2c30'
  ctx.lineWidth = 1
  ctx.strokeRect(20, 20, S - 40, S - 40)

  drawFn(ctx, S)

  const tex = new THREE.CanvasTexture(c)
  tex.needsUpdate = true
  return tex
}

/* Face 0 — KPI bar chart */
function faceKPI(ctx, S) {
  const bars = [0.88, 0.72, 0.95, 0.63, 0.81]
  bars.forEach((r, i) => {
    const y = S * 0.12 + i * S * 0.155
    const w = r * S * 0.72
    ctx.fillStyle = '#252628'
    ctx.fillRect(S * 0.14, y, S * 0.72, S * 0.09)
    ctx.fillStyle = '#d29f22'
    ctx.fillRect(S * 0.14, y, w, S * 0.09)
    ctx.fillStyle = '#5d0018'
    ctx.fillRect(S * 0.14 + w - 5, y, 5, S * 0.09)
    ctx.fillStyle = '#6a6868'
    ctx.fillRect(S * 0.14, y + S * 0.095, S * 0.15, 2)
  })
  // Value dots right side
  bars.forEach((r, i) => {
    const y = S * 0.12 + i * S * 0.155 + S * 0.045
    ctx.fillStyle = r > 0.8 ? '#d29f22' : '#2e2c30'
    ctx.beginPath()
    ctx.arc(S * 0.91, y, 7, 0, Math.PI * 2)
    ctx.fill()
  })
}

/* Face 1 — network dots */
function faceNetwork(ctx, S) {
  const cols = 7, rows = 7
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const x = S * 0.13 + (c / (cols - 1)) * S * 0.74
      const y = S * 0.13 + (r / (rows - 1)) * S * 0.74
      const hi = (c * 3 + r * 2) % 5 === 0
      ctx.fillStyle = hi ? '#d29f22' : '#2e2c30'
      ctx.beginPath()
      ctx.arc(x, y, hi ? 7 : 3.5, 0, Math.PI * 2)
      ctx.fill()
    }
  }
  // Connecting lines
  ctx.strokeStyle = '#d29f22'
  ctx.lineWidth = 1.5
  ctx.globalAlpha = 0.35
  const pairs = [[0,0,2,2],[2,2,4,0],[4,0,6,2],[1,3,3,5],[3,5,5,3],[5,3,6,5]]
  pairs.forEach(([c1,r1,c2,r2]) => {
    const x1 = S * 0.13 + (c1 / 6) * S * 0.74
    const y1 = S * 0.13 + (r1 / 6) * S * 0.74
    const x2 = S * 0.13 + (c2 / 6) * S * 0.74
    const y2 = S * 0.13 + (r2 / 6) * S * 0.74
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
  })
  ctx.globalAlpha = 1
}

/* Face 2 — flow: INPUT → KARDRA → OUTPUT */
function faceFlow(ctx, S) {
  const boxes = [
    { label: 'INPUT',   y: 0.08 },
    { label: 'KARDRA',  y: 0.40, accent: true },
    { label: 'OUTPUT',  y: 0.72 },
  ]
  boxes.forEach(({ y, accent }, i) => {
    ctx.strokeStyle = accent ? '#d29f22' : '#2e2c30'
    ctx.lineWidth = accent ? 3 : 1.5
    ctx.strokeRect(S * 0.12, S * y, S * 0.76, S * 0.22)
    if (accent) {
      ctx.fillStyle = '#d29f22'
      ctx.globalAlpha = 0.08
      ctx.fillRect(S * 0.12, S * y, S * 0.76, S * 0.22)
      ctx.globalAlpha = 1
    }
    // Arrow to next
    if (i < 2) {
      ctx.strokeStyle = '#d29f22'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(S * 0.5, S * (y + 0.22))
      ctx.lineTo(S * 0.5, S * (y + 0.31))
      ctx.stroke()
      ctx.fillStyle = '#d29f22'
      ctx.beginPath()
      ctx.moveTo(S * 0.5, S * (y + 0.33))
      ctx.lineTo(S * 0.45, S * (y + 0.27))
      ctx.lineTo(S * 0.55, S * (y + 0.27))
      ctx.fill()
    }
  })
  // Red accent dot on KARDRA box
  ctx.fillStyle = '#5d0018'
  ctx.beginPath()
  ctx.arc(S * 0.85, S * 0.51, 9, 0, Math.PI * 2)
  ctx.fill()
}

/* Face 3 — data table rows */
function faceData(ctx, S) {
  const rows = 6
  for (let i = 0; i < rows; i++) {
    const y = S * 0.1 + i * S * 0.14
    const hi = i === 2
    if (hi) {
      ctx.fillStyle = '#252628'
      ctx.fillRect(S * 0.08, y, S * 0.84, S * 0.11)
    }
    ctx.strokeStyle = '#2e2c30'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(S * 0.08, y + S * 0.11)
    ctx.lineTo(S * 0.92, y + S * 0.11)
    ctx.stroke()
    // Index
    ctx.fillStyle = '#d29f22'
    ctx.fillRect(S * 0.08, y + S * 0.03, S * 0.06, S * 0.05)
    // Content bar
    const widths = [0.45, 0.32, 0.62, 0.38, 0.52, 0.28]
    ctx.fillStyle = hi ? '#d29f22' : '#2e2c30'
    ctx.fillRect(S * 0.19, y + S * 0.03, S * widths[i], S * 0.05)
    // Value
    ctx.fillStyle = hi ? '#f0ede8' : '#6a6868'
    ctx.fillRect(S * 0.82, y + S * 0.03, S * 0.1, S * 0.05)
  }
}

/* Face 4 — circuit traces */
function faceCircuit(ctx, S) {
  ctx.strokeStyle = '#d29f22'
  ctx.lineWidth = 2
  ctx.globalAlpha = 0.5
  const traces = [
    [0.12,0.22, 0.55,0.22], [0.55,0.22, 0.55,0.52],
    [0.55,0.52, 0.88,0.52], [0.12,0.52, 0.32,0.52],
    [0.32,0.52, 0.32,0.78], [0.32,0.78, 0.72,0.78],
    [0.72,0.33, 0.72,0.52], [0.42,0.22, 0.42,0.38],
    [0.42,0.38, 0.72,0.38],
  ]
  traces.forEach(([x1,y1,x2,y2]) => {
    ctx.beginPath(); ctx.moveTo(x1*S,y1*S); ctx.lineTo(x2*S,y2*S); ctx.stroke()
  })
  ctx.globalAlpha = 1
  const nodes = [
    [0.12,0.22],[0.55,0.22],[0.55,0.52],[0.88,0.52],
    [0.12,0.52],[0.32,0.52],[0.32,0.78],[0.72,0.78],
    [0.42,0.22],[0.42,0.38],[0.72,0.38],[0.72,0.52],
  ]
  nodes.forEach(([x,y], i) => {
    ctx.fillStyle = i % 4 === 0 ? '#5d0018' : '#d29f22'
    ctx.beginPath()
    ctx.arc(x*S, y*S, i % 4 === 0 ? 9 : 6, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#19171b'
    ctx.beginPath()
    ctx.arc(x*S, y*S, i % 4 === 0 ? 4.5 : 2.5, 0, Math.PI * 2)
    ctx.fill()
  })
}

/* Face 5 — diamond / abstract geometry */
function faceDiamond(ctx, S) {
  // Diagonal stripes background
  ctx.strokeStyle = '#d29f22'
  ctx.lineWidth = 1.5
  ctx.globalAlpha = 0.18
  for (let i = -S; i < S * 2; i += 38) {
    ctx.beginPath()
    ctx.moveTo(i, 0); ctx.lineTo(i + S, S); ctx.stroke()
  }
  ctx.globalAlpha = 1

  // Outer diamond
  ctx.strokeStyle = '#d29f22'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(S*0.5, S*0.14)
  ctx.lineTo(S*0.82, S*0.5)
  ctx.lineTo(S*0.5, S*0.86)
  ctx.lineTo(S*0.18, S*0.5)
  ctx.closePath()
  ctx.stroke()

  // Inner diamond (red)
  ctx.strokeStyle = '#5d0018'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(S*0.5, S*0.32)
  ctx.lineTo(S*0.65, S*0.5)
  ctx.lineTo(S*0.5, S*0.68)
  ctx.lineTo(S*0.35, S*0.5)
  ctx.closePath()
  ctx.stroke()

  // Center
  ctx.fillStyle = '#d29f22'
  ctx.beginPath()
  ctx.arc(S*0.5, S*0.5, 10, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#19171b'
  ctx.beginPath()
  ctx.arc(S*0.5, S*0.5, 5, 0, Math.PI * 2)
  ctx.fill()
}

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

/* ── Glow halo (gold) ───────────────────────────────────────── */

function GlowHalo() {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const p = 1 + Math.sin(state.clock.elapsedTime * 0.7) * 0.05
    ref.current.scale.set(p, p, p)
  })
  return (
    <sprite ref={ref} scale={[4.5, 4.5, 1]}>
      <spriteMaterial
        map={useMemo(() => {
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
        }, [])}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.9}
      />
    </sprite>
  )
}

/* ── Floating Cube with textured faces ─────────────────────── */

function FloatingCube({ mouse }) {
  const meshRef  = useRef()
  const edgesRef = useRef()
  const edgeGlowRef = useRef()
  const time = useRef(0)
  const targetRot = useRef({ x: 0, y: 0 })

  const cubeMaterials = useMemo(() => {
    const faces = [faceKPI, faceNetwork, faceFlow, faceData, faceCircuit, faceDiamond]
    return faces.map(fn => new THREE.MeshStandardMaterial({
      map: makeTex(fn),
      metalness: 0.1,
      roughness: 0.75,
      emissive: new THREE.Color('#0a0809'),
      emissiveIntensity: 0.2,
    }))
  }, [])

  const edgeGeometry     = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(2.0,2.0,2.0)), [])
  const edgeGlowGeometry = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(2.04,2.04,2.04)), [])

  useFrame((_, delta) => {
    time.current += delta
    if (!meshRef.current) return
    meshRef.current.rotation.y += delta * 0.16
    meshRef.current.position.y = Math.sin(time.current * 0.5) * 0.1
    const baseX = Math.sin(time.current * 0.28) * 0.1
    if (mouse.current) {
      targetRot.current.x += (mouse.current.y * 0.2 - targetRot.current.x) * 0.06
      targetRot.current.y += (mouse.current.x * 0.2 - targetRot.current.y) * 0.06
    }
    meshRef.current.rotation.x = baseX + targetRot.current.x
    meshRef.current.rotation.y += targetRot.current.y * 0.01
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

      <lineSegments ref={edgesRef} geometry={edgeGeometry}>
        <lineBasicMaterial color="#d29f22" transparent opacity={0.85} toneMapped={false} />
      </lineSegments>

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
      <ambientLight intensity={0.4} />
      <directionalLight position={[5,5,5]}   intensity={1.2} color="#f0ede8" />
      <directionalLight position={[-5,-3,-2]} intensity={0.4} color="#d29f22" />
      <pointLight position={[0,0,4]} intensity={0.5} color="#5d0018" />
      <pointLight position={[-2,2,2]} intensity={0.3} color="#d29f22" distance={8} />
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
