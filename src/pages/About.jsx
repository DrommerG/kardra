import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const base = '/kardra'

export default function About() {
  const { t } = useTranslation()
  const ref = useRef()
  const inView = useInView(ref, { once: true })

  return (
    <div className="bg-[#0A0A0A]">
      <section ref={ref} className="section-padding min-h-screen flex items-center border-b border-[#111] relative overflow-hidden">
        {/* Large K background */}
        <div className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none select-none overflow-hidden">
          <span className="font-display text-[30vw] text-[#0d0d0d] leading-none">K</span>
        </div>

        <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="inline-block text-[10px] font-['Barlow'] font-600 tracking-[0.3em] uppercase text-[#6E1F28] border border-[#6E1F28]/40 px-3 py-1 mb-8"
            >
              NOSOTROS
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="font-display text-[clamp(4rem,10vw,10rem)] mb-10"
            >
              {t('about.title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="text-[#8F8A84] text-lg leading-relaxed mb-6 max-w-lg"
            >
              {t('about.text1')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-[#555656] text-base leading-relaxed mb-12 max-w-lg"
            >
              {t('about.text2')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.65 }}
            >
              <Link to={`${base}/contact`}>
                <Button variant="primary">{t('about.cta')}</Button>
              </Link>
            </motion.div>
          </div>

          {/* Right: pillars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="grid grid-cols-1 gap-0 border border-[#1a1a1a]"
          >
            {[
              { label: 'TIEMPO', desc: 'Automatizamos para que recuperes horas operativas.' },
              { label: 'CONTROL', desc: 'Tus datos y procesos funcionan con claridad.' },
              { label: 'ESCALA', desc: 'Crecer sin multiplicar el caos operativo.' },
            ].map(({ label, desc }) => (
              <div key={label} className="p-8 border-b border-[#1a1a1a] last:border-b-0 flex gap-6 items-start group hover:bg-[#0d0d0d] transition-colors">
                <div className="flex-shrink-0 font-display text-sm text-[#6E1F28] tracking-widest mt-1">{label}</div>
                <p className="text-[#555656] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
