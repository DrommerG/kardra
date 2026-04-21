import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'

const WA = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`
const EMAIL = `mailto:${import.meta.env.VITE_EMAIL}`

function ServiceCard({ item, index }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="border border-[#1a1a1a] p-10 lg:p-14 group hover:border-[#81766C]/40 transition-colors duration-400 relative"
    >
      {/* CUSTOM label */}
      <div className="absolute top-6 right-6 text-[9px] font-['Barlow'] font-600 tracking-[0.3em] text-[#81766C] border border-[#81766C]/40 px-2 py-0.5">
        {item.label}
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-16">
        <div className="lg:w-1/3 mb-6 lg:mb-0">
          <div className="font-display text-7xl text-[#111] mb-4 leading-none">0{index + 1}</div>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] text-[#F5F3EF] mb-4">
            {item.title}
          </h2>
          <p className="text-[#8F8A84] text-base leading-relaxed">{item.text}</p>
        </div>

        <div className="lg:flex-1">
          <div className="mb-8">
            <p className="text-[10px] font-['Barlow'] font-600 tracking-[0.25em] uppercase text-[#555656] mb-4">
              BENEFICIOS
            </p>
            <ul className="flex flex-col gap-2">
              {item.benefits.map((b, i) => (
                <li key={i} className="flex items-center gap-3 text-[#D1CBC2] text-sm">
                  <span className="w-4 h-px bg-[#81766C]" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {item.impact && (
            <div className="border-l-2 border-[#81766C] pl-6">
              <p className="text-[#D1CBC2] text-base italic">"{item.impact}"</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const { t } = useTranslation()
  const heroRef = useRef()
  const heroInView = useInView(heroRef, { once: true })
  const timeRef = useRef()
  const timeInView = useInView(timeRef, { once: true, margin: '-80px' })
  const ctaRef = useRef()
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' })
  const items = t('services.items', { returnObjects: true })
  const examples = t('services.timeBlock.examples', { returnObjects: true })

  return (
    <div className="bg-[#0A0A0A]">
      {/* Hero */}
      <section ref={heroRef} className="min-h-[60vh] flex items-end section-padding border-b border-[#111] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: 'linear-gradient(#F5F3EF 1px, transparent 1px), linear-gradient(90deg, #F5F3EF 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

        <div className="relative max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            className="inline-block text-[10px] font-['Barlow'] font-600 tracking-[0.3em] uppercase text-[#81766C] border border-[#81766C]/40 px-3 py-1 mb-8"
          >
            SERVICIOS
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="font-display text-[clamp(2.5rem,6vw,6.5rem)] max-w-5xl mb-6"
          >
            {t('services.hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.35 }}
            className="text-[#8F8A84] text-lg max-w-xl mb-4"
          >
            {t('services.hero.subtitle')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.45 }}
            className="text-[#555656] text-sm mb-10"
          >
            {t('services.hero.support')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.55 }}
            className="flex flex-wrap gap-3"
          >
            <Button variant="primary" href={WA} target="_blank">{t('services.hero.cta1')}</Button>
            <Button variant="outline" href={WA} target="_blank">{t('services.hero.cta2')}</Button>
            <Button variant="ghost" href={EMAIL}>{t('services.hero.cta3')}</Button>
          </motion.div>
        </div>
      </section>

      {/* Concept */}
      <section className="section-padding border-b border-[#111]">
        <div className="max-w-7xl mx-auto">
          <p className="font-display text-[clamp(1.8rem,3.5vw,3.5rem)] text-[#555656] max-w-3xl whitespace-pre-line leading-[1.1]">
            {t('services.concept')}
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-0 flex flex-col gap-0">
        {items.map((item, i) => (
          <ServiceCard key={i} item={item} index={i} />
        ))}
      </section>

      {/* Time recovery block */}
      <section ref={timeRef} className="section-padding border-t border-[#111] bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={timeInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-[clamp(2.5rem,4.5vw,5rem)] mb-6">
              {t('services.timeBlock.title')}
            </h2>
            <p className="text-[#8F8A84] text-lg mb-8 leading-relaxed">
              {t('services.timeBlock.text')}
            </p>
            <p className="text-[#D1CBC2] font-['Barlow'] font-600">
              {t('services.timeBlock.closing')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={timeInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-0 border border-[#1a1a1a]"
          >
            {examples.map((ex, i) => (
              <div key={i} className="p-6 border-b border-[#1a1a1a] last:border-b-0 flex items-center gap-4 group hover:bg-[#0f0f0f] transition-colors">
                <div className="w-2 h-2 bg-[#6E1F28] flex-shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-[#D1CBC2] text-sm">{ex}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="section-padding border-t border-[#111] relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#4A0F1C]/5 blur-3xl pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          className="relative max-w-7xl mx-auto text-center"
        >
          <h2 className="font-display text-[clamp(2rem,4.5vw,5rem)] mb-10 max-w-4xl mx-auto">
            {t('services.cta.title')}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" href={WA} target="_blank">{t('services.cta.btn1')}</Button>
            <Button variant="outline" href={WA} target="_blank">{t('services.cta.btn2')}</Button>
            <Button variant="ghost" href={EMAIL}>{t('services.cta.btn3')}</Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
