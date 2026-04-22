import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import PageHero from '../components/ui/PageHero'
import CTASection from '../components/ui/CTASection'
import { WA_URL, EMAIL_URL } from '../config/constants'

const USECASE_IMAGES = [
  '/kardra/assets/ai/usecase_whatsapp.png',
  '/kardra/assets/ai/usecase_processes.png',
  '/kardra/assets/ai/usecase_data.png',
  '/kardra/assets/ai/usecase_reports.png',
]

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
          <UseCaseRow key={i} item={item} index={i} image={USECASE_IMAGES[i]} />
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

function UseCaseRow({ item, index, image }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1, duration: 0.65 }}
      className="py-16 border-b border-[#111] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group"
    >
      <div className={`lg:col-span-1 ${isEven ? '' : 'lg:order-last'}`}>
        <span className="font-display text-5xl text-[#1a1a1a] group-hover:text-[#6E1F28]/20 transition-colors duration-400">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="lg:col-span-3">
        <h3 className="font-display text-[clamp(1.8rem,3vw,3rem)] text-[#F5F3EF] mb-4">
          {item.title}
        </h3>
        <p className="text-[#8F8A84] text-sm leading-relaxed">{item.text}</p>
      </div>
      <div className={`lg:col-span-7 ${isEven ? 'lg:col-start-6' : 'lg:col-start-5'} relative overflow-hidden aspect-[16/7]`}>
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </div>
    </motion.div>
  )
}
