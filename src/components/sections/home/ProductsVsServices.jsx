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
  const leftList  = t('home.split.left_list',  { returnObjects: true })
  const rightList = t('home.split.right_list', { returnObjects: true })

  return (
    <section ref={ref} className="bg-[#252628] relative overflow-hidden min-h-[700px] md:min-h-[750px]">

      {/* Top gold rule */}
      <div className="h-[2px] bg-[#d29f22]" />

      <div className="px-6 md:px-12 lg:px-20 py-20 md:py-28">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[#d29f22] text-xs tracking-widest">03</span>
            <div className="flex-1 h-px bg-[#2e2c30]" />
            <span className="text-[10px] tracking-[0.3em] text-[#6a6868] uppercase">{t('ui.labels.paths')}</span>
          </div>
          <h2 className="font-display text-[clamp(2rem,4vw,5rem)] leading-[0.9]">
            {t('home.split.header_title')}<br />
            <span className="text-[#d29f22]">{t('home.split.header_sub')}</span>
          </h2>
        </motion.div>

        {/* Split columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

          {/* LEFT — Productos */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="border-2 border-[#d29f22] p-8 md:p-12 lg:p-14 relative group"
            style={{ boxShadow: '6px 6px 0px #d29f22' }}
          >
            <div className="absolute top-6 left-6 text-[9px] font-['Space_Grotesk'] font-600 tracking-[0.3em] uppercase text-[#d29f22] border border-[#d29f22]/40 px-2 py-0.5">
              {t('ui.labels.products')} · {t('home.split.left_title')}
            </div>

            <div className="mt-10">
              <h3 className="font-display text-[clamp(2rem,3.5vw,3.5rem)] mb-6 text-[#f0ede8] leading-[0.9]">
                {t('home.split.left_title')}
              </h3>
              <p className="text-[#6a6868] text-base mb-8 leading-relaxed">
                {t('home.split.left_text')}
              </p>
              <ul className="flex flex-col gap-0 mb-10 border-t border-[#2e2c30]">
                {leftList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 py-3 border-b border-[#2e2c30] text-[#f0ede8]/70 text-sm">
                    <span className="mt-2 w-1.5 h-1.5 bg-[#d29f22] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to={`${base}/products`}>
                <Button variant="gold">{t('home.split.left_cta')}</Button>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT — Servicios */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="border-2 border-[#f0ede8]/20 p-8 md:p-12 lg:p-14 relative group hover:border-[#d29f22]/40 transition-colors duration-400 lg:-ml-[2px] lg:mt-8"
          >
            <div className="absolute top-6 left-6 text-[9px] font-['Space_Grotesk'] font-600 tracking-[0.3em] uppercase text-[#6a6868] border border-[#6a6868]/40 px-2 py-0.5">
              {t('ui.labels.services')} · {t('home.split.right_title')}
            </div>

            <div className="mt-10">
              <h3 className="font-display text-[clamp(2rem,3.5vw,3.5rem)] mb-6 text-[#f0ede8] leading-[0.9]">
                {t('home.split.right_title')}
              </h3>
              <p className="text-[#6a6868] text-base mb-8 leading-relaxed">
                {t('home.split.right_text')}
              </p>
              <ul className="flex flex-col gap-0 mb-10 border-t border-[#2e2c30]">
                {rightList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 py-3 border-b border-[#2e2c30] text-[#f0ede8]/70 text-sm">
                    <span className="mt-2 w-1.5 h-1.5 bg-[#6a6868] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to={`${base}/services`}>
                <Button variant="cream">{t('home.split.right_cta')}</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gold rule */}
      <div className="h-[2px] bg-gradient-to-r from-[#d29f22] to-transparent" />
    </section>
  )
}
