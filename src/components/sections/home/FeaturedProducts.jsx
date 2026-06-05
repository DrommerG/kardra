import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Button from '../../ui/Button'

const base = '/kardra'

export default function FeaturedProducts() {
  const { t } = useTranslation()
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const items = t('home.featuredProducts.items', { returnObjects: true })

  // Scroll-based reveal from right — same style as Solution image
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 0.45], ['10%', '0%'])
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1])

  return (
    <section ref={ref} className="bg-[#19171b] relative overflow-hidden">
      <motion.div style={{ x, opacity }}>
        <div className="px-6 md:px-12 lg:px-20 py-20 md:py-28">

          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-0">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-[#d29f22] text-xs tracking-widest">04</span>
                <div className="flex-1 h-px bg-[#2e2c30]" />
                <span className="text-[10px] tracking-[0.3em] text-[#6a6868] uppercase">{t('ui.labels.products')}</span>
              </div>
              <h2 className="font-display text-[clamp(2rem,4.5vw,5.5rem)] max-w-3xl leading-[0.9]">
                {t('home.featuredProducts.title')}
              </h2>
            </div>
          </div>

          {/* Editorial list */}
          <div className="mt-12 border-t border-[#d29f22]/30">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 6 }}
                style={{ transition: 'transform 0.2s ease' }}
                className="group grid grid-cols-12 items-start py-8 md:py-10 border-b border-[#2e2c30] cursor-default"
              >
                {/* Number */}
                <div className="col-span-2 md:col-span-1 font-display text-[clamp(3rem,5vw,6rem)] text-[#2e2c30] group-hover:text-[#d29f22]/30 transition-colors duration-400 leading-none select-none">
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Content */}
                <div className="col-span-9 md:col-span-10 pl-4 md:pl-8">
                  <h4 className="font-display text-[clamp(1.4rem,2.5vw,2.2rem)] text-[#f0ede8] mb-2 group-hover:text-[#d29f22] transition-colors duration-300 leading-[0.95]">
                    {item.name}
                  </h4>
                  <p className="text-[#6a6868] text-sm leading-relaxed max-w-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-1 group-hover:translate-y-0" style={{ transition: 'opacity 0.3s ease, transform 0.3s ease' }}>
                    {item.text}
                  </p>
                </div>

                {/* Arrow */}
                <div className="col-span-1 flex justify-end items-center">
                  <span className="text-[#d29f22] text-lg opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <Link to={`${base}/products`}>
              <Button variant="primary">{t('home.featuredProducts.cta')}</Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
