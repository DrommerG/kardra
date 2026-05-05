import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function UseCasesPreview() {
  const { t } = useTranslation()
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const items = t('home.usecases.items', { returnObjects: true })

  return (
    <section ref={ref} className="bg-[#252628] relative overflow-hidden">

      <div className="px-6 md:px-12 lg:px-20 py-20 md:py-28">

        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-[#d29f22] text-xs tracking-widest">07</span>
          <div className="flex-1 h-px bg-[#2e2c30]" />
          <span className="text-[10px] tracking-[0.3em] text-[#6a6868] uppercase">IMPACTO</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="font-display text-[clamp(2.5rem,6vw,7.5rem)] mb-16 leading-[0.88] max-w-5xl"
        >
          {t('home.usecases.title')}
        </motion.h2>

        {/* Use case rows — full-width bands */}
        <div className="border-t border-[#2e2c30]">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.7 }}
              whileHover={{ x: i % 2 === 0 ? 8 : -8 }}
              style={{ transition: 'transform 0.25s ease' }}
              className="group flex items-center gap-6 md:gap-12 py-7 md:py-9 border-b border-[#2e2c30] cursor-default"
            >
              {/* Number */}
              <span className="font-mono text-[#d29f22] text-xs tracking-widest flex-shrink-0 w-8">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Diamond accent */}
              <div className="w-2.5 h-2.5 border-2 border-[#5d0018] rotate-45 flex-shrink-0 group-hover:bg-[#5d0018] transition-colors duration-300" />

              {/* Text */}
              <p className="text-[#6a6868] text-base md:text-lg leading-relaxed group-hover:text-[#f0ede8] transition-colors duration-300 flex-1">
                {item}
              </p>

              {/* Arrow */}
              <span className="text-[#d29f22] text-xl flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
