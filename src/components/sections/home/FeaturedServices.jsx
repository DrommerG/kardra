import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Button from '../../ui/Button'

const WA = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`

export default function FeaturedServices() {
  const { t } = useTranslation()
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const items = t('home.featuredServices.items', { returnObjects: true })

  return (
    <section ref={ref} className="bg-[#252628] relative overflow-hidden">

      {/* Decorative large "02" background */}
      <div className="absolute right-0 top-0 select-none pointer-events-none overflow-hidden">
        <span className="font-display text-[20vw] text-[#2e2c30]/40 leading-none">02</span>
      </div>

      <div className="relative px-6 md:px-12 lg:px-20 py-20 md:py-28">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[#d29f22] text-xs tracking-widest">05</span>
            <div className="flex-1 h-px bg-[#2e2c30]" />
            <span className="text-[10px] tracking-[0.3em] text-[#6a6868] uppercase">{t('ui.labels.services')}</span>
          </div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,5.5rem)] max-w-3xl leading-[0.9]">
            {t('home.featuredServices.title')}
          </h2>
        </motion.div>

        {/* 2×2 grid — 3D card flip reveal */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#2e2c30]"
          style={{ perspective: '900px' }}
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, rotateY: -18, scale: 0.96 }}
              animate={inView ? { opacity: 1, rotateY: 0, scale: 1 } : {}}
              transition={{ delay: 0.08 + i * 0.12, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="group p-8 md:p-10 border-b border-r border-[#2e2c30] last:border-r-0 md:[&:nth-child(2n)]:border-r-0 md:[&:nth-last-child(-n+2)]:border-b-0 hover:bg-[#2e2c30]/40 transition-colors duration-300 relative overflow-hidden"
            >
              {/* Number */}
              <div className="font-display text-[5rem] text-[#2e2c30] group-hover:text-[#d29f22]/20 transition-colors duration-400 leading-none select-none mb-4">
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Gold accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                style={{ originX: 0 }}
                className="w-8 h-[2px] bg-[#d29f22] mb-5"
              />

              <h4 className="font-display text-[clamp(1.2rem,2vw,1.8rem)] text-[#f0ede8] mb-3 leading-[0.95] group-hover:text-[#d29f22] transition-colors duration-300">
                {item.name}
              </h4>
              <p className="text-[#6a6868] text-sm leading-relaxed">
                {item.text}
              </p>

              {/* Bottom fill on hover */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#d29f22] group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <Button variant="cream" href={WA} target="_blank">
            {t('home.featuredServices.cta')}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
