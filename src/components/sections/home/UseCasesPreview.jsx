import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function UseCasesPreview() {
  const { t } = useTranslation()
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const items = t('home.usecases.items', { returnObjects: true })

  return (
    <section ref={ref} className="section-padding bg-[#0A0A0A] border-t border-[#111]">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-display text-[clamp(2.5rem,5vw,5.5rem)] mb-16"
        >
          {t('home.usecases.title')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#1a1a1a]">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              className="p-6 md:p-10 border-b border-[#1a1a1a] md:border-r md:[&:nth-child(2n)]:border-r-0 md:[&:nth-last-child(-n+2)]:border-b-0 group hover:bg-[#0d0d0d] transition-colors duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1.5 w-2 h-2 bg-[#6E1F28] flex-shrink-0 rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                <p className="text-[#8F8A84] text-lg leading-relaxed group-hover:text-[#D1CBC2] transition-colors duration-300">
                  {item}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
