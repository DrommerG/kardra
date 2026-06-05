import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function HowItWorks() {
  const { t } = useTranslation()
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const steps = t('home.howItWorks.steps', { returnObjects: true })

  return (
    <section ref={ref} className="bg-[#19171b] relative overflow-hidden">

      {/* Top gold line */}
      <div className="h-[2px] bg-gradient-to-r from-[#d29f22] to-transparent" />

      <div className="px-6 md:px-12 lg:px-20 py-20 md:py-28">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[#d29f22] text-xs tracking-widest">06</span>
            <div className="flex-1 h-px bg-[#2e2c30]" />
            <span className="text-[10px] tracking-[0.3em] text-[#6a6868] uppercase">{t('ui.labels.process')}</span>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5.5vw,7rem)] leading-[0.9]">
            {t('home.howItWorks.title')}
          </h2>
        </motion.div>

        {/* Steps — cards drop in with spring + perspective */}
        <div className="relative" style={{ perspective: '800px' }}>
          {/* Connecting gold line desktop */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
            className="hidden lg:block absolute top-[2.2rem] left-0 right-0 h-[2px] bg-gradient-to-r from-[#d29f22]/40 via-[#d29f22]/20 to-transparent pointer-events-none"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, rotateX: -22, y: 50 }}
                animate={inView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
                transition={{
                  delay: i * 0.15,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  rotateX: { type: 'spring', stiffness: 90, damping: 18, delay: i * 0.15 },
                }}
                className="group relative p-8 md:p-10 border border-[#2e2c30] lg:border-r-0 lg:last:border-r hover:bg-[#252628] hover:border-[#d29f22]/20 transition-all duration-300"
              >
                {/* Step indicator dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.15, duration: 0.4, type: 'spring' }}
                  className="relative z-10 w-3 h-3 bg-[#d29f22] mb-8"
                />

                {/* Big number */}
                <div className="font-display text-[7rem] text-[#252628] group-hover:text-[#d29f22]/10 transition-colors duration-400 leading-none select-none -mt-6 mb-4">
                  {step.num}
                </div>

                <h4 className="font-display text-[clamp(1.3rem,2vw,1.9rem)] mb-3 text-[#f0ede8] leading-[0.95]">
                  {step.title}
                </h4>
                <p className="text-[#6a6868] text-sm leading-relaxed">
                  {step.text}
                </p>

                {/* Gold bottom accent */}
                <div className="mt-8 w-6 h-[2px] bg-[#d29f22] group-hover:w-12 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
