import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Button from '../../ui/Button'

const WA = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`
const EMAIL = `mailto:${import.meta.env.VITE_EMAIL}`

export default function HomeCTA() {
  const { t } = useTranslation()
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative section-padding bg-[#0d0d0d] border-t border-[#1a1a1a] overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#6E1F28]/5 blur-3xl" />
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#4A0F1C]/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-[clamp(2.5rem,5.5vw,6rem)] mb-6 max-w-5xl mx-auto">
            {t('home.cta.title')}
          </h2>
          <p className="text-[#8F8A84] text-lg mb-12 max-w-xl mx-auto">
            {t('home.cta.text')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" href={WA} target="_blank">
              {t('home.cta.btn1')}
            </Button>
            <Button variant="outline" href={EMAIL}>
              {t('home.cta.btn2')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
