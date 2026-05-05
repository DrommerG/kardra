import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import { BASE } from '../config/constants'

const pillars = [
  { label: 'TIEMPO',   desc: 'Automatizamos para que recuperes horas operativas cada semana.' },
  { label: 'CONTROL',  desc: 'Tus datos y procesos funcionan con claridad y sin errores manuales.' },
  { label: 'ESCALA',   desc: 'Crecimiento sin multiplicar el caos en tu operación.' },
]

export default function About() {
  const { t } = useTranslation()
  const ref = useRef()
  const inView = useInView(ref, { once: true })

  return (
    <div className="bg-[#19171b]">
      <section ref={ref} className="relative min-h-screen overflow-hidden border-b-2 border-[#d29f22]">

        {/* Background image right side */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none">
          <img src="/kardra/assets/ai/about_section.png" alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#19171b] via-[#19171b]/70 to-transparent" />
        </div>

        {/* Large "K" — background text */}
        <div className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none select-none overflow-hidden">
          <span className="font-display text-[30vw] text-[#252628] leading-none">K</span>
        </div>

        {/* Left gold accent */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d29f22]" />

        <div className="relative px-6 md:px-12 lg:px-20 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen">

          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-4 mb-10"
            >
              <div className="w-6 h-[2px] bg-[#d29f22]" />
              <span className="text-[10px] font-['Barlow'] font-600 tracking-[0.3em] uppercase text-[#d29f22] border border-[#d29f22]/40 px-3 py-1 inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#d29f22]" />
                NOSOTROS
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(5rem,12vw,13rem)] mb-10 leading-[0.85]"
            >
              {t('about.title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.35 }}
              className="text-[#6a6868] text-lg leading-relaxed mb-6 max-w-md"
            >
              {t('about.text1')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="text-[#6a6868]/70 text-base leading-relaxed mb-12 max-w-md"
            >
              {t('about.text2')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.65 }}
            >
              <Link to={`${BASE}/contact`}>
                <Button variant="primary">{t('about.cta')}</Button>
              </Link>
            </motion.div>
          </div>

          {/* Right: pillars */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="border border-[#2e2c30]"
          >
            {pillars.map(({ label, desc }, i) => (
              <div
                key={label}
                className="p-8 md:p-10 border-b border-[#2e2c30] last:border-b-0 flex gap-6 items-start group hover:bg-[#252628] transition-colors"
              >
                {/* Gold number */}
                <span className="font-mono text-[#d29f22] text-xs tracking-widest flex-shrink-0 mt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <div className="font-display text-[clamp(1.5rem,2vw,2rem)] text-[#d29f22] mb-2 leading-none group-hover:text-[#f0ede8] transition-colors">
                    {label}
                  </div>
                  <p className="text-[#6a6868] text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
