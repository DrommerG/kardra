import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import PageHero from '../components/ui/PageHero'
import CTASection from '../components/ui/CTASection'
import { WA_URL, EMAIL_URL } from '../config/constants'

export default function UseCases() {
  const { t } = useTranslation()
  const items = t('usecases.items', { returnObjects: true })

  return (
    <div className="bg-[#0A0A0A]">
      <PageHero
        label={t('usecases.title')}
        title={t('usecases.subtitle')}
        minHeight="50vh"
        showGrid={false}
        titleSize="clamp(3rem,7vw,7rem)"
      />

      {/* Cases */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-0">
        {items.map((item, i) => (
          <UseCaseRow key={i} item={item} index={i} />
        ))}
      </section>

      <CTASection
        title={t('usecases.cta.title')}
        subtitle={t('usecases.cta.text')}
        buttons={[
          { variant: 'primary', href: WA_URL, target: '_blank', label: t('usecases.cta.btn1') },
          { variant: 'outline', href: EMAIL_URL, label: t('usecases.cta.btn2') },
        ]}
      />
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
