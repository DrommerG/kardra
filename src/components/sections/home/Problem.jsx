import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const pains = ['pain1', 'pain2', 'pain3', 'pain4']

export default function Problem() {
  const { t } = useTranslation()
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="section-padding bg-[#0A0A0A] border-t border-[#111] relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]"
        style={{ backgroundImage: 'url(/kardra/assets/ai/problem_section.png)' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 to-[#0A0A0A]" />
      <div className="relative max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="font-display text-[clamp(2rem,4.5vw,4rem)] text-[#D1CBC2] max-w-3xl mb-16 leading-[1]"
        >
          {t('home.problem.main')}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-[#1a1a1a]">
          {pains.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.18, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8 border-b border-[#1a1a1a] sm:border-r sm:last:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-last-child(-n+2)]:border-b lg:last:border-b-0 last:border-b-0 group hover:bg-[#0f0f0f] transition-colors duration-300"
            >
              <motion.div
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ delay: 0.35 + i * 0.18, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ originY: 0 }}
                className="w-1 h-8 bg-[#6E1F28] mb-6 group-hover:h-12 transition-all duration-300"
              />
              <p className="text-[#8F8A84] text-base leading-relaxed">
                {t(`home.problem.${key}`)}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="font-display text-[clamp(1.5rem,3vw,2.5rem)] text-[#555656] mt-12"
        >
          {t('home.problem.closing')}
        </motion.p>
      </div>
    </section>
  )
}
