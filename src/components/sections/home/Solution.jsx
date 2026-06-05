import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function Solution() {
  const { t } = useTranslation()
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const clipPath = useTransform(scrollYProgress, [0, 0.5], ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.0])

  const metrics = [
    { symbol: '−', key: 'metric_time' },
    { symbol: '+', key: 'metric_control' },
    { symbol: '↑', key: 'metric_scale' },
  ]

  return (
    <section ref={ref} className="bg-[#19171b] relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">

        {/* Left: image (scroll reveal from right) */}
        <div className="relative overflow-hidden min-h-[360px] lg:min-h-0">
          <motion.div style={{ clipPath }} className="absolute inset-0">
            <motion.img
              src="/kardra/assets/ai/solution_section.png"
              alt=""
              style={{ scale: imgScale }}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#19171b]/70" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#19171b]/60" />
          </motion.div>

          {/* Floating metrics on image */}
          <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-0">
            {metrics.map(({ symbol, key }) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="border border-[#2e2c30] bg-[#19171b]/80 backdrop-blur-sm p-4 text-center"
              >
                <div className="font-display text-3xl text-[#d29f22] mb-1">{symbol}</div>
                <div className="text-[9px] font-['Space_Grotesk'] font-600 tracking-[0.2em] text-[#6a6868] uppercase">
                  {t(`home.solution.${key}`)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: content */}
        <div className="px-8 md:px-12 lg:px-16 py-20 md:py-28 flex flex-col justify-center">

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Index + label */}
            <div className="flex items-center gap-4 mb-10">
              <span className="font-mono text-[#d29f22] text-xs tracking-widest">02</span>
              <div className="flex-1 h-px bg-[#2e2c30]" />
              <span className="text-[10px] tracking-[0.3em] text-[#6a6868] uppercase">{t('ui.labels.solution')}</span>
            </div>

            <h2 className="font-display text-[clamp(2.5rem,5vw,6rem)] mb-8 leading-[0.9]">
              {t('home.solution.title')}
            </h2>
            <p className="text-[#6a6868] text-base md:text-lg leading-relaxed mb-6 max-w-md">
              {t('home.solution.text')}
            </p>

            {/* Accent blockquote */}
            <div className="flex items-start gap-4 mt-8">
              <div className="w-1 h-full min-h-[3rem] bg-[#d29f22] flex-shrink-0" />
              <p className="text-[#f0ede8] text-base font-['Space_Grotesk'] font-600 leading-relaxed">
                {t('home.solution.support')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
