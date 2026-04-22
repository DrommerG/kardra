import { useRef, useEffect, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Button from '../../ui/Button'

const KubeScene = lazy(() => import('../../3d/KubeScene'))

const base = '/kardra'
const WA = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`

const wordVariant = {
  hidden: { y: '100%', opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
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
      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.07]"
        style={{ backgroundImage: 'url(/kardra/assets/ai/hero_bg.png)' }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/40" />

      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(#F5F3EF 1px, transparent 1px), linear-gradient(90deg, #F5F3EF 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Red accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#6E1F28] to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-24 lg:py-0 min-h-screen">

        {/* Left: Copy */}
        <div>
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block text-[10px] font-['Barlow'] font-600 tracking-[0.3em] uppercase text-[#6E1F28] border border-[#6E1F28]/40 px-3 py-1"
            >
              KARDRA — AUTOMATIZACIÓN
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0 }}
              className="mt-3 h-px w-40 bg-gradient-to-r from-[#6E1F28] via-[#6E1F28]/60 to-transparent"
            />
          </div>

          <h1 className="font-display text-[clamp(2.25rem,7vw,6.5rem)] leading-[0.9] mb-8">
            {titleWords.map((word, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden align-bottom mr-4 last:mr-0"
              >
                <motion.span
                  custom={i}
                  variants={wordVariant}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                >
                  {word === 'TIEMPO' ? (
                    <span className="text-[#6E1F28]">{word}</span>
                  ) : word}
                </motion.span>
              </span>
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
            className="flex flex-col sm:flex-row sm:flex-wrap gap-3"
          >
            <Link to={`${base}/products`} className="w-full sm:w-auto">
              <Button variant="primary" className="w-full sm:w-auto">{t('home.hero.cta1')}</Button>
            </Link>
            <Link to={`${base}/services`} className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto">{t('home.hero.cta2')}</Button>
            </Link>
            <Button variant="ghost" href={WA} target="_blank" className="w-full sm:w-auto">
              {t('home.hero.cta3')}
            </Button>
          </motion.div>
        </div>

        {/* Right: 3D */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.2 }}
          className="relative h-[280px] md:h-[400px] lg:h-[560px] w-full"
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
