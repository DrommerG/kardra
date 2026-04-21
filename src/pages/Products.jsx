import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'

const WA = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`
const EMAIL = `mailto:${import.meta.env.VITE_EMAIL}`

function ProductCard({ item, index }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="border border-[#1a1a1a] p-10 lg:p-14 group hover:border-[#6E1F28]/40 transition-colors duration-400"
    >
      <div className="flex flex-col lg:flex-row lg:gap-16">
        <div className="lg:w-1/3 mb-6 lg:mb-0">
          <div className="font-display text-7xl text-[#111] group-hover:text-[#1a0808] transition-colors mb-4 leading-none">
            0{index + 1}
          </div>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] text-[#F5F3EF] mb-4">
            {item.title}
          </h2>
          <p className="text-[#8F8A84] text-base leading-relaxed">
            {item.text}
          </p>
        </div>

        <div className="lg:flex-1">
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

          <div className="border-l-2 border-[#6E1F28] pl-6">
            <p className="text-[#D1CBC2] text-base italic leading-relaxed">
              "{item.impact}"
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Products() {
  const { t } = useTranslation()
  const heroRef = useRef()
  const heroInView = useInView(heroRef, { once: true })
  const ctaRef = useRef()
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' })
  const items = t('products.items', { returnObjects: true })

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
            className="inline-block text-[10px] font-['Barlow'] font-600 tracking-[0.3em] uppercase text-[#6E1F28] border border-[#6E1F28]/40 px-3 py-1 mb-8"
          >
            PRODUCTOS
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="font-display text-[clamp(2.5rem,6vw,6.5rem)] max-w-5xl mb-6"
          >
            {t('products.hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.35 }}
            className="text-[#8F8A84] text-lg max-w-xl mb-4"
          >
            {t('products.hero.subtitle')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.45 }}
            className="text-[#555656] text-sm mb-10"
          >
            {t('products.hero.support')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.55 }}
            className="flex flex-wrap gap-3"
          >
            <Button variant="primary" href={WA} target="_blank">{t('products.hero.cta1')}</Button>
            <Button variant="outline" href={EMAIL}>{t('products.hero.cta2')}</Button>
          </motion.div>
        </div>
      </section>

      {/* Concept block */}
      <section className="section-padding border-b border-[#111]">
        <div className="max-w-7xl mx-auto">
          <p className="font-display text-[clamp(1.8rem,3.5vw,3.5rem)] text-[#555656] max-w-3xl whitespace-pre-line leading-[1.1]">
            {t('products.concept')}
          </p>
        </div>
      </section>

      {/* Products list */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-0 flex flex-col gap-0">
        {items.map((item, i) => (
          <ProductCard key={i} item={item} index={i} />
        ))}
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="section-padding border-t border-[#111] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#6E1F28]/5 blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          className="relative max-w-7xl mx-auto text-center"
        >
          <h2 className="font-display text-[clamp(2rem,4.5vw,5rem)] mb-10 max-w-4xl mx-auto">
            {t('products.cta.title')}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" href={WA} target="_blank">{t('products.cta.btn1')}</Button>
            <Button variant="outline" href={EMAIL}>{t('products.cta.btn2')}</Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
