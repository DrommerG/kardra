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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.55 }}
              className="relative p-8 border border-[#1a1a1a] border-r-0 last:border-r group hover:border-[#6E1F28]/30 transition-colors duration-400"
            >
              {/* Step number */}
              <div className="font-display text-6xl text-[#111] group-hover:text-[#1a0a0a] transition-colors duration-300 mb-6 leading-none">
                {step.num}
              </div>

              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 right-0 w-0 h-px bg-[#6E1F28]/30 group-hover:w-full transition-all duration-500" />
              )}

              <h4 className="font-display text-xl mb-3 text-[#F5F3EF]">{step.title}</h4>
              <p className="text-[#555656] text-sm leading-relaxed">{step.text}</p>

              <div className="mt-6 w-4 h-px bg-[#6E1F28]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
