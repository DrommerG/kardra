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
      transition={{ delay: index * 0.1, duration: 0.7 }}
      className="border border-[#2e2c30] p-8 md:p-12 lg:p-16 group hover:border-[#d29f22]/30 transition-colors duration-400 relative overflow-hidden bg-[#19171b]"
    >
      {/* CUSTOM badge */}
      <div className="absolute top-6 right-6 text-[9px] font-['Barlow'] font-600 tracking-[0.3em] text-[#6a6868] border border-[#6a6868]/40 px-2.5 py-1">
        {item.label}
      </div>
      <span className="absolute bottom-0 left-0 h-[2px] bg-[#d29f22] w-0 group-hover:w-full transition-all duration-600 ease-out" />

      <div className="flex flex-col lg:flex-row lg:gap-16 mt-4">
        <div className="lg:w-2/5 mb-8 lg:mb-0">
          <div className="font-display text-[8rem] md:text-[10rem] lg:text-[12rem] text-[#252628] group-hover:text-[#d29f22]/15 transition-colors duration-400 leading-[0.8] select-none">
            {String(index + 1).padStart(2, '0')}
          </div>
          <h2 className="font-display text-[clamp(1.8rem,3vw,3rem)] text-[#f0ede8] mb-4 leading-[0.9] -mt-4">
            {item.title}
          </h2>
          <p className="text-[#6a6868] text-base leading-relaxed">{item.text}</p>
        </div>

        <div className="lg:flex-1">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-[2px] bg-[#d29f22]" />
            <p className="text-[10px] font-['Barlow'] font-600 tracking-[0.25em] uppercase text-[#6a6868]">BENEFICIOS</p>
          </div>
          <ul className="flex flex-col gap-0 border-t border-[#2e2c30] mb-10">
            {item.benefits.map((b, i) => (
              <li key={i} className="flex items-center gap-4 py-4 border-b border-[#2e2c30] text-[#f0ede8]/80 text-sm">
                <span className="w-4 h-[2px] bg-[#6a6868] flex-shrink-0" />
                {b}
              </li>
            ))}
          </ul>
          {item.impact && (
            <div className="relative border-l-2 border-[#d29f22] pl-6 py-2">
              <p className="text-[#f0ede8] text-base md:text-lg leading-relaxed">{item.impact}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const { t } = useTranslation()
  const timeRef = useRef()
  const timeInView = useInView(timeRef, { once: true, margin: '-80px' })
  const items   = t('services.items',            { returnObjects: true })
  const examples = t('services.timeBlock.examples', { returnObjects: true })

  return (
    <div className="bg-[#19171b]">
      <PageHero
        label="SERVICIOS"
        title={t('services.hero.title')}
        subtitle={t('services.hero.subtitle')}
        support={t('services.hero.support')}
        minHeight="60vh"
      >
        <Button variant="primary" href={WA_URL} target="_blank" className="w-full sm:w-auto justify-center">{t('services.hero.cta1')}</Button>
        <Button variant="outline" href={WA_URL} target="_blank" className="w-full sm:w-auto justify-center">{t('services.hero.cta2')}</Button>
        <Button variant="ghost"   href={EMAIL_URL}              className="w-full sm:w-auto justify-center">{t('services.hero.cta3')}</Button>
      </PageHero>

      {/* Concept */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-20 border-b border-[#2e2c30] bg-[#252628]">
        <p className="font-display text-[clamp(1.8rem,3.5vw,4rem)] text-[#6a6868] max-w-3xl whitespace-pre-line leading-[0.95]">
          {t('services.concept')}
        </p>
      </section>

      <section className="flex flex-col gap-0">
        {items.map((item, i) => (
          <ServiceCard key={i} item={item} index={i} />
        ))}
      </section>

      {/* Time recovery block */}
      <section ref={timeRef} className="px-6 md:px-12 lg:px-20 py-20 md:py-28 bg-[#252628] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#d29f22]/[0.04] blur-3xl pointer-events-none" />
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={timeInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-6 h-[2px] bg-[#d29f22]" />
              <span className="text-[10px] font-['Barlow'] font-600 tracking-[0.3em] uppercase text-[#d29f22]">RECUPERA TIEMPO</span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,5vw,6rem)] mb-6 leading-[0.9]">
              {t('services.timeBlock.title')}
            </h2>
            <p className="text-[#6a6868] text-lg mb-8 leading-relaxed">{t('services.timeBlock.text')}</p>
            <div className="border-l-2 border-[#d29f22] pl-5">
              <p className="text-[#f0ede8] text-base leading-relaxed font-['Barlow'] font-600">
                {t('services.timeBlock.closing')}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={timeInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="border border-[#2e2c30]"
          >
            {examples.map((ex, i) => (
              <div key={i} className="flex items-center gap-4 p-6 border-b border-[#2e2c30] last:border-b-0 group hover:bg-[#2e2c30]/50 transition-colors">
                <div className="w-2 h-2 bg-[#d29f22] flex-shrink-0 group-hover:scale-125 transition-transform" />
                <span className="text-[#6a6868] text-sm group-hover:text-[#f0ede8] transition-colors">{ex}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection
        title={t('services.cta.title')}
        bg="dark"
        buttons={[
          { variant: 'primary', href: WA_URL, target: '_blank', label: t('services.cta.btn1') },
          { variant: 'outline', href: WA_URL, target: '_blank', label: t('services.cta.btn2') },
          { variant: 'ghost',   href: EMAIL_URL,                 label: t('services.cta.btn3') },
        ]}
      />
    </div>
  )
}
