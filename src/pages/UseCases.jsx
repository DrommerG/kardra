import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
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

function UseCaseRow({ item, index, image }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const clipPath = useTransform(scrollYProgress, [0, 0.5], ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)'])
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1, duration: 0.7 }}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-[#2e2c30] group ${index % 2 === 0 ? 'bg-[#19171b]' : 'bg-[#252628]'}`}
    >
      {/* Number */}
      <div className={`hidden lg:flex items-center justify-center lg:col-span-1 border-r border-[#2e2c30] ${isEven ? '' : 'lg:order-last lg:border-r-0 lg:border-l'}`}>
        <span className="font-display text-[4rem] text-[#2e2c30] group-hover:text-[#d29f22]/30 transition-colors duration-400 select-none">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Content */}
      <div className={`lg:col-span-4 p-8 md:p-12 flex flex-col justify-center border-r border-[#2e2c30] ${isEven ? '' : 'lg:order-2'}`}>
        <h3 className="font-display text-[clamp(2rem,3.5vw,3.5rem)] text-[#f0ede8] mb-4 leading-[0.9]">
          {item.title}
        </h3>
        <p className="text-[#6a6868] text-sm leading-relaxed">{item.text}</p>
      </div>

      {/* Image — scroll reveal */}
      <div className={`lg:col-span-7 overflow-hidden min-h-[240px] lg:min-h-0 ${isEven ? '' : 'lg:order-1'}`}>
        <motion.div style={{ clipPath }} className="h-full">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover opacity-50 group-hover:opacity-65 transition-opacity duration-500"
            style={{ minHeight: '240px' }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function UseCases() {
  const { t } = useTranslation()
  const items = t('usecases.items', { returnObjects: true })

  return (
    <div className="bg-[#19171b]">
      <PageHero
        label={t('usecases.title')}
        title={t('usecases.subtitle')}
        minHeight="50vh"
        titleSize="clamp(3rem,8vw,9rem)"
      />

      <section className="border-b border-[#2e2c30]">
        {items.map((item, i) => (
          <UseCaseRow key={i} item={item} index={i} image={USECASE_IMAGES[i]} />
        ))}
      </section>

      <CTASection
        title={t('usecases.cta.title')}
        subtitle={t('usecases.cta.text')}
        buttons={[
          { variant: 'primary', href: WA_URL, target: '_blank', label: t('usecases.cta.btn1') },
          { variant: 'outline', href: EMAIL_URL,                 label: t('usecases.cta.btn2') },
        ]}
      />
    </div>
  )
}
