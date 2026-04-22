import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function HowItWorks() {
  const { t } = useTranslation()
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const steps = t('home.howItWorks.steps', { returnObjects: true })

  return (
    <section ref={ref} className="section-padding bg-[#0d0d0d] border-t border-[#111]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <h2 className="font-display text-[clamp(2.5rem,5vw,5.5rem)]">
            {t('home.howItWorks.title')}
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {/* Horizontal connector line (desktop) */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
            className="hidden lg:block absolute top-14 left-8 right-8 h-px bg-gradient-to-r from-[#6E1F28]/60 via-[#6E1F28]/30 to-transparent pointer-events-none z-0"
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-6 sm:p-8 border border-[#1a1a1a] lg:border-r-0 lg:last:border-r group hover:border-[#6E1F28]/30 transition-colors duration-400 bg-[#0d0d0d]"
            >
              {/* Step number */}
              <div className="font-display text-6xl text-[#111] group-hover:text-[#1a0a0a] transition-colors duration-300 mb-6 leading-none">
                {step.num}
              </div>

              {/* Step connector dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:block absolute top-[3.25rem] left-8 w-2 h-2 rounded-full bg-[#6E1F28] z-10"
                aria-hidden="true"
              />

              <h4 className="font-display text-xl mb-3 text-[#F5F3EF]">{step.title}</h4>
              <p className="text-[#555656] text-sm leading-relaxed">{step.text}</p>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ originX: 0 }}
                className="mt-6 w-4 h-px bg-[#6E1F28]"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
