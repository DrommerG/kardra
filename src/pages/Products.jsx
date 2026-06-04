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
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="border border-[#2e2c30] p-8 md:p-12 lg:p-16 group hover:border-[#d29f22]/30 transition-colors duration-400 relative overflow-hidden bg-[#19171b]"
    >
      {/* PRODUCTO badge */}
      <div className="absolute top-6 left-6 text-[9px] font-['Space_Grotesk'] font-600 tracking-[0.3em] text-[#d29f22] border border-[#d29f22]/40 px-2 py-0.5">
        PRODUCTO
      </div>

      {/* Bottom hover line */}
      <span className="absolute bottom-0 left-0 h-[2px] bg-[#d29f22] w-0 group-hover:w-full transition-all duration-600 ease-out" />

      <div className="flex flex-col lg:flex-row lg:gap-16 mt-8">
        {/* Left: number + title */}
        <div className="lg:w-2/5 mb-8 lg:mb-0">
          <div className="font-display text-[8rem] md:text-[10rem] lg:text-[12rem] text-[#252628] group-hover:text-[#d29f22]/15 transition-colors duration-400 leading-[0.8] tracking-tight select-none">
            {String(index + 1).padStart(2, '0')}
          </div>
          <h2 className="font-display text-[clamp(1.8rem,3vw,3rem)] text-[#f0ede8] mb-4 leading-[0.9] -mt-4">
            {item.title}
          </h2>
          <p className="text-[#6a6868] text-base leading-relaxed">
            {item.text}
          </p>
        </div>

        {/* Right: benefits + impact */}
        <div className="lg:flex-1">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-[2px] bg-[#d29f22]" />
              <p className="text-[10px] font-['Space_Grotesk'] font-600 tracking-[0.25em] uppercase text-[#6a6868]">
                BENEFICIOS
              </p>
            </div>
            <ul className="flex flex-col gap-0 border-t border-[#2e2c30]">
              {item.benefits.map((b, i) => (
                <li key={i} className="flex items-center gap-4 py-4 border-b border-[#2e2c30] text-[#f0ede8]/80 text-sm">
                  <span className="w-4 h-[2px] bg-[#d29f22] flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative border-l-2 border-[#d29f22] pl-6 py-2">
            <p className="text-[#f0ede8] text-base md:text-lg leading-relaxed">
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
    <div className="bg-[#19171b]">
      <PageHero
        label="PRODUCTOS"
        title={t('products.hero.title')}
        subtitle={t('products.hero.subtitle')}
        support={t('products.hero.support')}
        sectionNum="—"
        minHeight="60vh"
      >
        <Button variant="primary" href={WA_URL} target="_blank" className="w-full sm:w-auto justify-center">{t('products.hero.cta1')}</Button>
        <Button variant="outline" href={EMAIL_URL} className="w-full sm:w-auto justify-center">{t('products.hero.cta2')}</Button>
      </PageHero>

      {/* Concept */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-20 border-b border-[#2e2c30] bg-[#252628]">
        <p className="font-display text-[clamp(1.8rem,3.5vw,4rem)] text-[#6a6868] max-w-3xl whitespace-pre-line leading-[0.95]">
          {t('products.concept')}
        </p>
      </section>

      {/* Products list */}
      <section className="flex flex-col gap-0">
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
