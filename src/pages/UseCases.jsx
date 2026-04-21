import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'

const WA = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`
const EMAIL = `mailto:${import.meta.env.VITE_EMAIL}`

export default function UseCases() {
  const { t } = useTranslation()
  const heroRef = useRef()
  const heroInView = useInView(heroRef, { once: true })
  const ctaRef = useRef()
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' })
  const items = t('usecases.items', { returnObjects: true })

  return (
    <div className="bg-[#0A0A0A]">
      {/* Hero */}
      <section ref={heroRef} className="min-h-[50vh] flex items-end section-padding border-b border-[#111]">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            className="inline-block text-[10px] font-['Barlow'] font-600 tracking-[0.3em] uppercase text-[#6E1F28] border border-[#6E1F28]/40 px-3 py-1 mb-8"
          >
            {t('usecases.title')}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="font-display text-[clamp(3rem,7vw,7rem)]"
          >
            {t('usecases.subtitle')}
          </motion.h1>
        </div>
      </section>

      {/* Cases */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-0">
        {items.map((item, i) => (
          <UseCaseRow key={i} item={item} index={i} />
        ))}
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="section-padding border-t border-[#111]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          className="max-w-7xl mx-auto text-center"
        >
          <h2 className="font-display text-[clamp(2rem,4vw,4.5rem)] mb-4 max-w-3xl mx-auto">
            {t('usecases.cta.title')}
          </h2>
          <p className="text-[#8F8A84] mb-10">{t('usecases.cta.text')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" href={WA} target="_blank">{t('usecases.cta.btn1')}</Button>
            <Button variant="outline" href={EMAIL}>{t('usecases.cta.btn2')}</Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

function UseCaseRow({ item, index }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1, duration: 0.65 }}
      className="py-16 border-b border-[#111] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start group"
    >
      <div className={`lg:col-span-1 ${isEven ? '' : 'lg:order-last'}`}>
        <span className="font-display text-5xl text-[#1a1a1a] group-hover:text-[#6E1F28]/20 transition-colors duration-400">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="lg:col-span-4">
        <h3 className="font-display text-[clamp(1.8rem,3vw,3rem)] text-[#F5F3EF]">
          {item.title}
        </h3>
      </div>
      <div className="lg:col-span-6 lg:col-start-7">
        <p className="text-[#8F8A84] text-base leading-relaxed">{item.text}</p>
      </div>
    </motion.div>
  )
}
