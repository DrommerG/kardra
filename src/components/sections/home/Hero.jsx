import { useRef, useEffect, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Button from '../../ui/Button'

const KubeScene = lazy(() => import('../../3d/KubeScene'))

const base = '/kardra'
const WA = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`

function RevealLine({ children, delay = 0, className = '' }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.1, delay, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default function Hero() {
  const { t } = useTranslation()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth  - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const words = t('home.hero.title').split(' ')
  const line1 = words.slice(0, 1)   // AUTOMATIZA
  const line2 = words.slice(1, 5)   // LO QUE TE HACE
  const line3 = words.slice(5)      // PERDER TIEMPO

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#19171b]">

      {/* Left gold vertical accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d29f22] z-10" />

      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#f0ede8 1px, transparent 1px), linear-gradient(90deg, #f0ede8 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Section index */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="absolute top-8 right-6 md:right-12 lg:right-20 font-mono text-[10px] text-[#6a6868] tracking-[0.3em] uppercase select-none z-10"
      >
        00 / INICIO
      </motion.div>

      {/* Main 2-column grid — fills viewport */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[55fr_45fr] min-h-screen">

        {/* ── LEFT: Label + Title + Subtitle + CTAs ── */}
        <div className="flex flex-col justify-center px-8 md:px-14 lg:px-20 pt-28 pb-16 lg:pt-0 lg:pb-0">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-3 mb-10"
          >
            <span className="w-10 h-[2px] bg-[#d29f22]" />
            <span className="text-[10px] font-['Space_Grotesk'] font-600 tracking-[0.35em] uppercase text-[#d29f22]">
              KARDRA — AUTOMATIZACIÓN
            </span>
          </motion.div>

          {/* Massive title — Bebas Neue, 3 lines */}
          <div className="font-display text-[clamp(4rem,8vw,12rem)] leading-[0.92] mb-10">
            <RevealLine delay={0.15}>
              <span className="block">{line1.join(' ')}</span>
            </RevealLine>
            <RevealLine delay={0.28} className="ml-[4%]">
              <span className="block">{line2.join(' ')}</span>
            </RevealLine>
            <RevealLine delay={0.41} className="ml-[10%]">
              <span className="block">
                {line3.slice(0, -1).join(' ')}{' '}
                <span className="text-[#d29f22]">{line3[line3.length - 1]}</span>
              </span>
            </RevealLine>
          </div>

          {/* Gold divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
            className="h-[2px] bg-gradient-to-r from-[#d29f22] via-[#d29f22]/50 to-transparent mb-10"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="text-[#6a6868] text-base md:text-lg leading-relaxed mb-3 max-w-md"
          >
            {t('home.hero.subtitle')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.15, duration: 0.6 }}
            className="text-[#f0ede8]/35 text-sm mb-10 tracking-wide"
          >
            {t('home.hero.support')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 flex-wrap"
          >
            <Link to={`${base}/products`} className="w-full sm:w-auto">
              <Button variant="primary" className="w-full sm:w-auto justify-center">
                {t('home.hero.cta1')}
              </Button>
            </Link>
            <Link to={`${base}/services`} className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto justify-center">
                {t('home.hero.cta2')}
              </Button>
            </Link>
            <Button variant="ghost" href={WA} target="_blank" className="w-full sm:w-auto justify-center">
              {t('home.hero.cta3')}
            </Button>
          </motion.div>
        </div>

        {/* ── RIGHT: 3D Cube ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.6 }}
          className="relative hidden lg:flex items-center justify-center border-l border-[#2e2c30]"
        >
          {/* Subtle corner marks */}
          <div className="absolute top-8 left-8 w-5 h-5 border-l-2 border-t-2 border-[#d29f22]/30" />
          <div className="absolute top-8 right-8 w-5 h-5 border-r-2 border-t-2 border-[#d29f22]/30" />
          <div className="absolute bottom-8 left-8 w-5 h-5 border-l-2 border-b-2 border-[#d29f22]/30" />
          <div className="absolute bottom-8 right-8 w-5 h-5 border-r-2 border-b-2 border-[#d29f22]/30" />

          <div className="w-full h-[480px] xl:h-[560px]">
            <Suspense fallback={<div className="w-full h-full" />}>
              <KubeScene mouse={mouse} />
            </Suspense>
          </div>

          {/* Floating keyword labels */}
          {[
            { text: 'SISTEMA', pos: 'top-16 right-12',   delay: 1.6 },
            { text: 'DATOS',   pos: 'bottom-20 left-12', delay: 1.8 },
            { text: 'FLUJO',   pos: 'top-1/2 right-6',   delay: 2.0 },
          ].map(({ text, pos, delay }) => (
            <motion.span
              key={text}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay, duration: 0.7 }}
              className={`absolute ${pos} text-[9px] font-['Space_Grotesk'] font-600 tracking-[0.35em] text-[#d29f22]/50 uppercase pointer-events-none`}
            >
              {text}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.6 }}
        className="absolute bottom-6 left-8 md:left-14 lg:left-20 flex items-center gap-3"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="w-[2px] h-8 bg-gradient-to-b from-[#d29f22] to-transparent"
        />
        <span className="text-[9px] font-['Space_Grotesk'] tracking-[0.35em] uppercase text-[#6a6868]">SCROLL</span>
      </motion.div>
    </section>
  )
}
