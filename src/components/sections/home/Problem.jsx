import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const pains = ['pain1', 'pain2', 'pain3', 'pain4']

export default function Problem() {
  const { t } = useTranslation()
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-[#252628] relative overflow-hidden">
      {/* Background image — very subtle */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.04]"
        style={{ backgroundImage: 'url(/kardra/assets/ai/problem_section.png)' }}
      />

      {/* Large decorative number — background */}
      <div className="absolute right-0 top-0 select-none pointer-events-none overflow-hidden">
        <span className="font-display text-[25vw] text-[#2e2c30]/50 leading-none">01</span>
      </div>

      <div className="relative px-6 md:px-12 lg:px-20 py-20 md:py-28 lg:py-36">

        {/* Section index + label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="font-mono text-[#d29f22] text-xs tracking-widest">01</span>
          <div className="flex-1 h-px bg-[#2e2c30]" />
          <span className="text-[10px] tracking-[0.3em] text-[#6a6868] uppercase">EL PROBLEMA</span>
        </motion.div>

        {/* Statement */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-display text-[clamp(2.2rem,5vw,5.5rem)] text-[#f0ede8] max-w-4xl mb-16 leading-[0.9]"
        >
          {t('home.problem.main')}
        </motion.p>

        {/* Pain points — editorial list */}
        <div className="border-t border-[#2e2c30]">
          {pains.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: 8 }}
              style={{ transition: 'transform 0.2s ease' }}
              className="group grid grid-cols-12 items-start py-7 md:py-9 border-b border-[#2e2c30] cursor-default"
            >
              {/* Number */}
              <div className="col-span-2 md:col-span-1 font-mono text-[#d29f22] text-xs tracking-widest pt-1">
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Red accent bar */}
              <div className="col-span-1 flex justify-center pt-2">
                <div className="w-[2px] h-5 bg-[#5d0018]" />
              </div>

              {/* Text */}
              <p className="col-span-9 md:col-span-10 text-[#6a6868] text-base md:text-lg leading-relaxed group-hover:text-[#f0ede8] transition-colors duration-300">
                {t(`home.problem.${key}`)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-16 flex items-start gap-6"
        >
          <div className="w-1 h-12 bg-[#5d0018] flex-shrink-0 mt-1" />
          <p className="font-display text-[clamp(1.8rem,3.5vw,4rem)] text-[#f0ede8]/60 max-w-2xl leading-[0.9]">
            {t('home.problem.closing')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
