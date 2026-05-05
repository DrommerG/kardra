import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Button from './Button'

export default function CTASection({ title, subtitle, buttons = [], bg = 'dark' }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const bgClass = bg === 'red' ? 'bg-[#5d0018]' : bg === 'gray' ? 'bg-[#252628]' : 'bg-[#19171b]'
  const titleColor = bg === 'red' ? 'text-[#f0ede8]' : 'text-[#f0ede8]'

  return (
    <section ref={ref} className={`relative overflow-hidden ${bgClass} border-t border-[#2e2c30]`}>
      {/* Gold top rule */}
      <div className="h-[2px] bg-gradient-to-r from-[#d29f22] to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative px-6 md:px-12 lg:px-20 py-20 md:py-28"
      >
        {title && (
          <h2 className={`font-display text-[clamp(2.5rem,5.5vw,7rem)] mb-6 max-w-4xl leading-[0.88] ${titleColor}`}>
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-[#6a6868] text-lg mb-12 max-w-xl leading-relaxed">{subtitle}</p>
        )}
        {!subtitle && title && <div className="mb-12" />}

        <div className="flex flex-col sm:flex-row gap-4">
          {buttons.map((btn, i) => (
            <Button key={i} variant={btn.variant || 'primary'} href={btn.href} target={btn.target}>
              {btn.label}
            </Button>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
