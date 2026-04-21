import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const pains = ['pain1', 'pain2', 'pain3', 'pain4']

export default function Problem() {
  const { t } = useTranslation()
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="section-padding bg-[#0A0A0A] border-t border-[#111]">
      <div className="max-w-7xl mx-auto">
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
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
              className="p-8 border-r border-[#1a1a1a] last:border-r-0 group hover:bg-[#0f0f0f] transition-colors duration-300"
            >
              <div className="w-1 h-8 bg-[#6E1F28] mb-6 group-hover:h-12 transition-all duration-300" />
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
