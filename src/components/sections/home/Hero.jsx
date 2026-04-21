import { useRef, useEffect, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Button from '../../ui/Button'

const KubeScene = lazy(() => import('../../3d/KubeScene'))

const base = '/kardra'
const WA = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`

const wordVariant = {
  hidden: { x: -60, opacity: 0 },
  visible: (i) => ({
    x: 0,
    opacity: 1,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Hero() {
  const { t } = useTranslation()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const titleWords = t('home.hero.title').split(' ')

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0A0A]">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(#F5F3EF 1px, transparent 1px), linear-gradient(90deg, #F5F3EF 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Red accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#6E1F28] to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-24 lg:py-0 min-h-screen">

        {/* Left: Copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[10px] font-['Barlow'] font-600 tracking-[0.3em] uppercase text-[#6E1F28] border border-[#6E1F28]/40 px-3 py-1 mb-8"
          >
            KARDRA — AUTOMATIZACIÓN
          </motion.div>

          <h1 className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.9] mb-8 overflow-hidden">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariant}
                initial="hidden"
                animate="visible"
                className="inline-block mr-4 last:mr-0"
              >
                {word === 'TIEMPO' ? (
                  <span className="text-[#6E1F28]">{word}</span>
                ) : word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-[#8F8A84] text-lg md:text-xl leading-relaxed mb-4 max-w-lg"
          >
            {t('home.hero.subtitle')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-[#555656] text-sm tracking-wide mb-10"
          >
            {t('home.hero.support')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <Link to={`${base}/products`}>
              <Button variant="primary">{t('home.hero.cta1')}</Button>
            </Link>
            <Link to={`${base}/services`}>
              <Button variant="outline">{t('home.hero.cta2')}</Button>
            </Link>
            <Button variant="ghost" href={WA} target="_blank">
              {t('home.hero.cta3')}
            </Button>
          </motion.div>
        </div>

        {/* Right: 3D */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.2 }}
          className="relative h-[400px] lg:h-[560px] w-full"
        >
          <Suspense fallback={<div className="w-full h-full" />}>
            <KubeScene mouse={mouse} />
          </Suspense>

          {/* Floating labels */}
          {[
            { text: 'SYSTEM', pos: 'top-8 right-12', delay: 1.4 },
            { text: 'DATA', pos: 'bottom-16 left-8', delay: 1.6 },
            { text: 'FLOW', pos: 'top-1/2 right-4', delay: 1.8 },
          ].map(({ text, pos, delay }) => (
            <motion.span
              key={text}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay, duration: 0.6 }}
              className={`absolute ${pos} text-[10px] font-['Barlow'] font-600 tracking-[0.3em] text-[#333434] uppercase pointer-events-none`}
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
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-[#333434] to-transparent"
        />
      </motion.div>
    </section>
  )
}
