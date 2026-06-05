import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Button from '../../ui/Button'

const WA    = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`
const EMAIL = `mailto:${import.meta.env.VITE_EMAIL}`

export default function HomeCTA() {
  const { t } = useTranslation()
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Expanding rectangle: section appears to grow from a smaller box into full width
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.85],
    ['inset(0% 7% 0% 7%)', 'inset(0% 0% 0% 0%)']
  )

  return (
    <section ref={ref} className="overflow-hidden bg-[#19171b]">
      <motion.div style={{ clipPath }} className="bg-[#5d0018] relative overflow-hidden">

        {/* Texture diagonal lines */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #f0ede8 0, #f0ede8 1px, transparent 0, transparent 50%)',
            backgroundSize: '18px 18px',
          }}
        />

        {/* Large "K" background */}
        <div className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none select-none overflow-hidden">
          <span className="font-display text-[35vw] text-[#4a0012] leading-none">K</span>
        </div>

        <div className="relative px-6 md:px-12 lg:px-20 py-24 md:py-36">

          {/* Index */}
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-[#d29f22] text-xs tracking-widest">08</span>
            <div className="w-12 h-[2px] bg-[#d29f22]" />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.8rem,6.5vw,8.5rem)] text-[#f0ede8] mb-8 max-w-5xl leading-[0.88]"
          >
            {t('home.cta.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-[#f0ede8]/60 text-lg mb-14 max-w-lg leading-relaxed"
          >
            {t('home.cta.text')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="gold" href={WA} target="_blank">
              {t('home.cta.btn1')}
            </Button>
            <Button variant="cream" href={EMAIL}>
              {t('home.cta.btn2')}
            </Button>
          </motion.div>

          {/* Bottom gold rule */}
          <div className="mt-16 h-[2px] bg-[#d29f22]/40" />
        </div>
      </motion.div>
    </section>
  )
}
