import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Button from '../../ui/Button'

const base = '/kardra'
const WA = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`

export default function FeaturedServices() {
  const { t } = useTranslation()
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const items = t('home.featuredServices.items', { returnObjects: true })

  return (
    <section ref={ref} className="section-padding bg-[#0A0A0A] border-t border-[#111]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="inline-block text-[10px] font-['Barlow'] font-600 tracking-[0.3em] uppercase text-[#81766C] border border-[#81766C]/40 px-3 py-1 mb-6">
            SERVICIOS
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,4.5rem)] max-w-3xl">
            {t('home.featuredServices.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[#1a1a1a] mb-10">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.55 }}
              className="p-6 md:p-10 border-b border-[#1a1a1a] lg:border-r lg:[&:nth-child(2n)]:border-r-0 lg:[&:nth-last-child(-n+2)]:border-b-0 group hover:bg-[#0d0d0d] transition-colors duration-300 flex gap-4 sm:gap-6 items-start"
            >
              <div className="flex-shrink-0 w-8 h-8 border border-[#6E1F28]/40 flex items-center justify-center mt-1">
                <span className="font-display text-sm text-[#6E1F28]">0{i + 1}</span>
              </div>
              <div>
                <h4 className="font-display text-xl mb-3 text-[#D1CBC2] group-hover:text-[#F5F3EF] transition-colors">{item.name}</h4>
                <p className="text-[#555656] text-sm leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <Button variant="outline" href={WA} target="_blank">
            {t('home.featuredServices.cta')}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
