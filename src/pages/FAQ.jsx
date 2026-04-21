import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false)
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="border-b border-[#1a1a1a]"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 py-7 text-left group"
      >
        <span className="flex items-start gap-4">
          <span className="font-display text-sm text-[#333434] mt-0.5 flex-shrink-0">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-display text-[clamp(1.1rem,2vw,1.6rem)] text-[#D1CBC2] group-hover:text-[#F5F3EF] transition-colors">
            {item.q}
          </span>
        </span>
        <span className={`flex-shrink-0 w-5 h-5 border border-[#333434] flex items-center justify-center mt-1 transition-all duration-300 ${open ? 'border-[#6E1F28] rotate-45' : 'group-hover:border-[#555656]'}`}>
          <span className="block w-2 h-px bg-current" />
          <span className={`block absolute w-px h-2 bg-current transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-7 pl-9 pr-4">
              <p className="text-[#8F8A84] text-base leading-relaxed">{item.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const { t } = useTranslation()
  const heroRef = useRef()
  const heroInView = useInView(heroRef, { once: true })
  const items = t('faq.items', { returnObjects: true })

  return (
    <div className="bg-[#0A0A0A]">
      <section ref={heroRef} className="section-padding border-b border-[#111]">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            className="inline-block text-[10px] font-['Barlow'] font-600 tracking-[0.3em] uppercase text-[#6E1F28] border border-[#6E1F28]/40 px-3 py-1 mb-8"
          >
            FAQ
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="font-display text-[clamp(3rem,7vw,7rem)] mb-20"
          >
            {t('faq.title')}
          </motion.h1>

          <div className="border-t border-[#1a1a1a]">
            {items.map((item, i) => (
              <FAQItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
