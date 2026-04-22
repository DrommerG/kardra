import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'
import PageHero from '../components/ui/PageHero'
import CTASection from '../components/ui/CTASection'
import { WA_URL, EMAIL_URL } from '../config/constants'

function ServiceCard({ item, index }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="border border-[#1a1a1a] p-6 md:p-10 lg:p-14 group hover:border-[#81766C]/40 transition-colors duration-400 relative overflow-hidden"
    >
      {/* CUSTOM label */}
      <div className="absolute top-6 right-6 text-[9px] font-['Barlow'] font-600 tracking-[0.3em] text-[#81766C] border border-[#81766C]/40 bg-[#0A0A0A]/80 backdrop-blur-sm px-2.5 py-1 z-10">
        {item.label}
      </div>

      {/* Hover horizontal line */}
      <span className="absolute bottom-0 left-0 h-px bg-[#6E1F28] w-0 group-hover:w-full transition-all duration-700 ease-out" />

      <div className="flex flex-col lg:flex-row lg:gap-16 mt-6 lg:mt-4">
        <div className="lg:w-1/3 mb-6 lg:mb-0 min-w-0">
          <div className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#111] group-hover:text-[#1a1613] transition-colors mb-4 leading-[0.85] tracking-tight break-all">
            0{index + 1}
          </div>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] text-[#F5F3EF] mb-4">
            {item.title}
          </h2>
          <p className="text-[#8F8A84] text-base leading-relaxed">{item.text}</p>
        </div>

        <div className="lg:flex-1 min-w-0">
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
            <div className="relative border-l-2 border-[#81766C] pl-6 sm:pl-8 pt-6 pr-2 sm:pr-4">
              <span className="absolute -top-2 left-2 sm:left-4 font-display text-6xl sm:text-7xl lg:text-8xl leading-none text-[#6E1F28]/20 select-none pointer-events-none">
                &ldquo;
              </span>
              <p className="relative text-[#D1CBC2] text-base sm:text-lg lg:text-xl italic leading-relaxed">{item.impact}</p>
            </div>
          )}

          {/* Expressive separator */}
          <div className="mt-10 flex items-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-[#81766C]/50 via-[#81766C]/20 to-transparent" />
            <span className="w-1.5 h-1.5 bg-[#6E1F28] rotate-45" />
            <span className="h-px w-12 bg-[#6E1F28]/40" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const { t } = useTranslation()
  const timeRef = useRef()
  const timeInView = useInView(timeRef, { once: true, margin: '-80px' })
  const items = t('services.items', { returnObjects: true })
  const examples = t('services.timeBlock.examples', { returnObjects: true })

  return (
    <div className="bg-[#0A0A0A]">
      <PageHero
        label="SERVICIOS"
        title={t('services.hero.title')}
        subtitle={t('services.hero.subtitle')}
        support={t('services.hero.support')}
        labelColor="#81766C"
      >
        <Button variant="primary" href={WA_URL} target="_blank" className="w-full sm:w-auto justify-center">{t('services.hero.cta1')}</Button>
        <Button variant="outline" href={WA_URL} target="_blank" className="w-full sm:w-auto justify-center">{t('services.hero.cta2')}</Button>
        <Button variant="ghost" href={EMAIL_URL} className="w-full sm:w-auto justify-center">{t('services.hero.cta3')}</Button>
      </PageHero>

      {/* Concept */}
      <section className="section-padding border-b border-[#111]">
        <div className="max-w-7xl mx-auto">
          <p className="font-display text-[clamp(1.8rem,3.5vw,3.5rem)] text-[#555656] max-w-3xl whitespace-pre-line leading-[1.1]">
            {t('services.concept')}
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-0 flex flex-col gap-0">
        {items.map((item, i) => (
          <ServiceCard key={i} item={item} index={i} />
        ))}
      </section>

      {/* Time recovery block */}
      <section ref={timeRef} className="section-padding border-t border-[#111] bg-[#0d0d0d] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#6E1F28]/[0.06] blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={timeInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#6E1F28]" />
              <span className="text-[10px] font-['Barlow'] font-600 tracking-[0.3em] uppercase text-[#6E1F28]">
                RECUPERA TIEMPO
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,4.5vw,5rem)] mb-6 leading-[0.95]">
              {t('services.timeBlock.title')}
            </h2>
            <p className="text-[#D1CBC2] text-lg mb-8 leading-relaxed">
              {t('services.timeBlock.text')}
            </p>
            <p className="text-[#F5F3EF] text-lg font-['Barlow'] font-600 border-l-2 border-[#6E1F28] pl-4">
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

      <CTASection
        title={t('services.cta.title')}
        glowPosition="right"
        glowColor="#4A0F1C"
        buttons={[
          { variant: 'primary', href: WA_URL, target: '_blank', label: t('services.cta.btn1') },
          { variant: 'outline', href: WA_URL, target: '_blank', label: t('services.cta.btn2') },
          { variant: 'ghost', href: EMAIL_URL, label: t('services.cta.btn3') },
        ]}
      />
    </div>
  )
}
