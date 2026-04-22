import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'
import PageHero from '../components/ui/PageHero'
import CTASection from '../components/ui/CTASection'
import { WA_URL, EMAIL_URL } from '../config/constants'

function ProductCard({ item, index }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="border border-[#1a1a1a] p-6 md:p-10 lg:p-14 group hover:border-[#6E1F28]/40 transition-colors duration-400 relative overflow-hidden"
    >
      {/* Micro-badge PRODUCTO */}
      <div className="absolute top-6 left-6 text-[9px] font-['Barlow'] font-600 tracking-[0.3em] text-[#6E1F28] border border-[#6E1F28]/40 px-2 py-0.5">
        PRODUCTO
      </div>

      {/* Hover horizontal line */}
      <span className="absolute bottom-0 left-0 h-px bg-[#6E1F28] w-0 group-hover:w-full transition-all duration-700 ease-out" />

      <div className="flex flex-col lg:flex-row lg:gap-16 mt-6 lg:mt-4">
        <div className="lg:w-1/3 mb-6 lg:mb-0 min-w-0">
          <div className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#111] group-hover:text-[#1a0808] transition-colors mb-4 leading-[0.85] tracking-tight break-all">
            0{index + 1}
          </div>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] text-[#F5F3EF] mb-4">
            {item.title}
          </h2>
          <p className="text-[#8F8A84] text-base leading-relaxed">
            {item.text}
          </p>
        </div>

        <div className="lg:flex-1 min-w-0">
          <div className="mb-8">
            <p className="text-[10px] font-['Barlow'] font-600 tracking-[0.25em] uppercase text-[#555656] mb-4">
              BENEFICIOS
            </p>
            <ul className="flex flex-col gap-2">
              {item.benefits.map((b, i) => (
                <li key={i} className="flex items-center gap-3 text-[#D1CBC2] text-sm">
                  <span className="w-4 h-px bg-[#6E1F28]" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative border-l-2 border-[#6E1F28] pl-6 sm:pl-8 pt-6 pr-2 sm:pr-4">
            <span className="absolute -top-2 left-2 sm:left-4 font-display text-6xl sm:text-7xl lg:text-8xl leading-none text-[#6E1F28]/20 select-none pointer-events-none">
              &ldquo;
            </span>
            <p className="relative text-[#D1CBC2] text-base sm:text-lg lg:text-xl italic leading-relaxed">
              {item.impact}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Products() {
  const { t } = useTranslation()
  const items = t('products.items', { returnObjects: true })

  return (
    <div className="bg-[#0A0A0A]">
      <PageHero
        label="PRODUCTOS"
        title={t('products.hero.title')}
        subtitle={t('products.hero.subtitle')}
        support={t('products.hero.support')}
      >
        <Button variant="primary" href={WA_URL} target="_blank" className="w-full sm:w-auto justify-center">{t('products.hero.cta1')}</Button>
        <Button variant="outline" href={EMAIL_URL} className="w-full sm:w-auto justify-center">{t('products.hero.cta2')}</Button>
      </PageHero>

      {/* Concept block */}
      <section className="section-padding border-b border-[#111]">
        <div className="max-w-7xl mx-auto">
          <p className="font-display text-[clamp(1.8rem,3.5vw,3.5rem)] text-[#555656] max-w-3xl whitespace-pre-line leading-[1.1]">
            {t('products.concept')}
          </p>
        </div>
      </section>

      {/* Products list */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-0 flex flex-col gap-0">
        {items.map((item, i) => (
          <ProductCard key={i} item={item} index={i} />
        ))}
      </section>

      <CTASection
        title={t('products.cta.title')}
        buttons={[
          { variant: 'primary', href: WA_URL, target: '_blank', label: t('products.cta.btn1') },
          { variant: 'outline', href: EMAIL_URL, label: t('products.cta.btn2') },
        ]}
      />
    </div>
  )
}
