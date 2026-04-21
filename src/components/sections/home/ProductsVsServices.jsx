import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Button from '../../ui/Button'

const base = '/kardra'

export default function ProductsVsServices() {
  const { t } = useTranslation()
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const leftList = t('home.split.left_list', { returnObjects: true })
  const rightList = t('home.split.right_list', { returnObjects: true })

  return (
    <section ref={ref} className="section-padding bg-[#0A0A0A] border-t border-[#111]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-[10px] font-['Barlow'] font-600 tracking-[0.3em] uppercase text-[#555656]">
            PRODUCTOS VS SERVICIOS
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left — Products */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="p-10 lg:p-14 border border-[#1a1a1a] border-r-0 lg:border-r border-b lg:border-b-0 group hover:bg-[#0d0d0d] transition-colors duration-400"
          >
            <div className="w-8 h-px bg-[#6E1F28] mb-8" />
            <h3 className="font-display text-[clamp(2rem,3.5vw,3.5rem)] mb-6">
              {t('home.split.left_title')}
            </h3>
            <p className="text-[#8F8A84] text-base mb-8 leading-relaxed">
              {t('home.split.left_text')}
            </p>
            <ul className="flex flex-col gap-3 mb-10">
              {leftList.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#D1CBC2] text-sm">
                  <span className="mt-1.5 w-1 h-1 bg-[#6E1F28] rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to={`${base}/products`}>
              <Button variant="primary">{t('home.split.left_cta')}</Button>
            </Link>
          </motion.div>

          {/* Right — Services */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="p-10 lg:p-14 border border-[#1a1a1a] group hover:bg-[#0d0d0d] transition-colors duration-400"
          >
            <div className="w-8 h-px bg-[#81766C] mb-8" />
            <h3 className="font-display text-[clamp(2rem,3.5vw,3.5rem)] mb-6">
              {t('home.split.right_title')}
            </h3>
            <p className="text-[#8F8A84] text-base mb-8 leading-relaxed">
              {t('home.split.right_text')}
            </p>
            <ul className="flex flex-col gap-3 mb-10">
              {rightList.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#D1CBC2] text-sm">
                  <span className="mt-1.5 w-1 h-1 bg-[#81766C] rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to={`${base}/services`}>
              <Button variant="outline">{t('home.split.right_cta')}</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
