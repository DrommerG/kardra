import { useRef, Suspense, lazy } from 'react'
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

  const titleLines = t('home.hero.titleLines', { returnObjects: true })
  const lineOffsets = ['', 'ml-[4%]', 'ml-[10%]']

  return (
    <section className="relative min-h-screen flex flex-col bg-[#19171b]">

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
        {t('ui.labels.intro')}
      </motion.div>

      {/* Main 2-column grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[55fr_45fr] min-h-screen">

        {/* ── LEFT: Title + Subtitle + CTAs ── */}
        <div className="flex flex-col justify-center px-12 md:px-16 lg:px-24 pt-32 pb-16 lg:pt-0 lg:pb-0">

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

          {/* Massive title — 3 lines with staggered offset */}
          <div className="font-display text-[clamp(3.8rem,7.5vw,11rem)] leading-[0.92] mb-10 pl-2">
            {titleLines.map((line, idx) => {
              const isLast = idx === titleLines.length - 1
              const words = line.split(' ')
              return (
                <RevealLine key={idx} delay={0.15 + idx * 0.13} className={lineOffsets[idx] || ''}>
                  <span className="block">
                    {isLast ? (
                      <>
                        {words.length > 1 && <>{words.slice(0, -1).join(' ')} </>}
                        <span className="text-[#d29f22]">{words[words.length - 1]}</span>
                      </>
                    ) : line}
                  </span>
                </RevealLine>
              )
            })}
          </div>

          {/* Gold divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
            className="h-[2px] bg-gradient-to-r from-[#d29f22] via-[#d29f22]/50 to-transparent mb-8"
          />

          {/* Subtitle — unified size */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="mb-10 max-w-lg"
          >
            <p className="text-[#6a6868] text-base md:text-lg leading-relaxed mb-0">
              {t('home.hero.subtitle')}
            </p>
            <div className="mt-4 pt-4 border-t border-[#2e2c30]">
              <p className="text-[#f0ede8]/40 text-base tracking-wide">
                {t('home.hero.support')}
              </p>
            </div>
          </motion.div>

          {/* CTAs — all with visible border */}
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
              <Button variant="cream" className="w-full sm:w-auto justify-center">
                {t('home.hero.cta2')}
              </Button>
            </Link>
            <Button variant="cream" href={WA} target="_blank" className="w-full sm:w-auto justify-center">
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
          {/* Corner marks */}
          <div className="absolute top-8 left-8 w-5 h-5 border-l-2 border-t-2 border-[#d29f22]/30" />
          <div className="absolute top-8 right-8 w-5 h-5 border-r-2 border-t-2 border-[#d29f22]/30" />
          <div className="absolute bottom-8 left-8 w-5 h-5 border-l-2 border-b-2 border-[#d29f22]/30" />
          <div className="absolute bottom-8 right-8 w-5 h-5 border-r-2 border-b-2 border-[#d29f22]/30" />

          <div className="w-full h-[480px] xl:h-[560px]">
            <Suspense fallback={<div className="w-full h-full" />}>
              <KubeScene mouse={mouse} />
            </Suspense>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
