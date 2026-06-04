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
      transition={{ delay: index * 0.08, duration: 0.55 }}
      className="border-b border-[#2e2c30]"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 py-7 text-left group"
      >
        <span className="flex items-start gap-4">
          <span className="font-mono text-[#d29f22] text-xs tracking-widest mt-1 flex-shrink-0">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className={`font-display text-[clamp(1.2rem,2vw,1.8rem)] leading-[0.95] transition-colors duration-200 ${open ? 'text-[#d29f22]' : 'text-[#f0ede8] group-hover:text-[#d29f22]'}`}>
            {item.q}
          </span>
        </span>

        {/* Toggle indicator */}
        <div className={`flex-shrink-0 w-6 h-6 border flex items-center justify-center mt-0.5 transition-all duration-300 ${open ? 'border-[#d29f22] bg-[#d29f22]/10 rotate-45' : 'border-[#2e2c30] group-hover:border-[#d29f22]/50'}`}>
          <svg viewBox="0 0 10 10" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="5" y1="1" x2="5" y2="9" className={`transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
            <line x1="1" y1="5" x2="9" y2="5" />
          </svg>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-10 pr-4 border-l-2 border-[#d29f22] ml-9 mb-4">
              <p className="text-[#6a6868] text-base leading-relaxed">{item.a}</p>
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
    <div className="bg-[#19171b]">
      <section ref={heroRef} className="relative overflow-hidden border-b-2 border-[#d29f22]">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d29f22]" />
        <div className="px-6 md:px-12 lg:px-20 py-20 md:py-28">

          {/* Index + label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-6 h-[2px] bg-[#d29f22]" />
            <span className="text-[10px] font-['Space_Grotesk'] font-600 tracking-[0.3em] uppercase text-[#d29f22] border border-[#d29f22]/40 px-3 py-1 inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#d29f22]" />
              FAQ
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="font-display text-[clamp(3rem,8vw,10rem)] mb-20 leading-[0.88]"
          >
            {t('faq.title')}
          </motion.h1>

          <div className="max-w-4xl border-t border-[#2e2c30]">
            {items.map((item, i) => (
              <FAQItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
