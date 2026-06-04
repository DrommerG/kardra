import { useEffect, useRef } from 'react'
import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
  const glowRef = useRef(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return
    let raf
    const onMove = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        glow.style.left = e.clientX + 'px'
        glow.style.top  = e.clientY + 'px'
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <div className="min-h-screen bg-[#19171b] flex flex-col">
      {/* Subtle golden cursor glow */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-[9996] w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(210,159,34,0.055) 0%, transparent 60%)' }}
      />
      <Header />
      <main className="flex-1 pt-[108px]">
        {children}
      </main>
      <Footer />
    </div>
  )
}
