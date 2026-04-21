import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Button from '../../ui/Button'

const base = '/kardra'

export default function FeaturedProducts() {
  const { t } = useTranslation()
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const items = t('home.featuredProducts.items', { returnObjects: true })

  return (
    <section ref={ref} className="section-padding bg-[#0d0d0d] border-t border-[#111]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="inline-block text-[10px] font-['Barlow'] font-600 tracking-[0.3em] uppercase text-[#6E1F28] border border-[#6E1F28]/40 px-3 py-1 mb-6">
            PRODUCTOS
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,4.5rem)] max-w-4xl">
            {t('home.featuredProducts.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-[#1a1a1a] mb-10">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="p-8 border-r border-b border-[#1a1a1a] last:border-r-0 [&:nth-child(n+3)]:border-b-0 sm:[&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r lg:[&:nth-child(n+3)]:border-b group hover:bg-[#0f0f0f] transition-colors duration-300"
            >
              <div className="font-display text-4xl text-[#333434] mb-4 group-hover:text-[#6E1F28] transition-colors duration-300">
                0{i + 1}
              </div>
              <h4 className="font-display text-xl mb-3 text-[#D1CBC2]">{item.name}</h4>
              <p className="text-[#555656] text-sm leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <Link to={`${base}/products`}>
            <Button variant="primary">{t('home.featuredProducts.cta')}</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
