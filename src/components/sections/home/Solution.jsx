import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function Solution() {
  const { t } = useTranslation()
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="section-padding bg-[#0d0d0d] border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: decorative number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9 }}
          className="hidden lg:block relative overflow-hidden aspect-[4/3]"
        >
          <img
            src="/kardra/assets/ai/solution_section.png"
            alt=""
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
        </motion.div>

        {/* Right: content */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-[10px] font-['Barlow'] font-600 tracking-[0.3em] uppercase text-[#6E1F28] border border-[#6E1F28]/40 px-3 py-1 mb-8">
              SOLUCIÓN
            </span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] mb-8">
              {t('home.solution.title')}
            </h2>
            <p className="text-[#8F8A84] text-lg leading-relaxed mb-6 max-w-md">
              {t('home.solution.text')}
            </p>
            <p className="text-[#D1CBC2] text-base font-['Barlow'] font-600">
              {t('home.solution.support')}
            </p>
          </motion.div>

          {/* Metrics row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 grid grid-cols-3 gap-0 border border-[#1a1a1a]"
          >
            {[
              { label: 'TIEMPO', value: '−' },
              { label: 'CONTROL', value: '+' },
              { label: 'ESCALA', value: '↑' },
            ].map(({ label, value }) => (
              <div key={label} className="p-6 border-r border-[#1a1a1a] last:border-r-0 text-center">
                <div className="font-display text-4xl text-[#6E1F28] mb-2">{value}</div>
                <div className="text-[10px] font-['Barlow'] font-600 tracking-[0.25em] text-[#555656] uppercase">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
