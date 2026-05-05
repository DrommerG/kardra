import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function PageHero({
  label,
  title,
  subtitle,
  support,
  children,
  minHeight = '55vh',
  titleSize = 'clamp(3rem,8vw,10rem)',
  maxWidthTitle = 'max-w-5xl',
  labelColor = '#d29f22',
  sectionNum = '',
}) {
  const ref = useRef()
  const inView = useInView(ref, { once: true })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#19171b] border-b-2 border-[#d29f22]"
      style={{ minHeight }}
    >
      {/* Left gold accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d29f22]" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#f0ede8 1px, transparent 1px), linear-gradient(90deg, #f0ede8 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative flex flex-col justify-end px-6 md:px-12 lg:px-20 py-20 md:py-28 h-full" style={{ minHeight }}>

        {/* Index + label */}
        {label && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="flex items-center gap-4 mb-8"
          >
            {sectionNum && <span className="font-mono text-xs tracking-widest" style={{ color: labelColor }}>{sectionNum}</span>}
            {sectionNum && <div className="w-12 h-px bg-[#2e2c30]" />}
            <span
              className="text-[10px] font-['Barlow'] font-600 tracking-[0.3em] uppercase border px-3 py-1 inline-flex items-center gap-2"
              style={{ color: labelColor, borderColor: `${labelColor}44` }}
            >
              <span className="w-1.5 h-1.5 bg-current" />
              {label}
            </span>
          </motion.div>
        )}

        {title && (
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`font-display ${maxWidthTitle} leading-[0.88] mb-8`}
            style={{ fontSize: titleSize }}
          >
            {title}
          </motion.h1>
        )}

        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-[#6a6868] text-lg max-w-xl mb-4 leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        {support && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-[#f0ede8]/40 text-sm mb-10"
          >
            {support}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row sm:flex-wrap gap-3 [&>*]:w-full [&>*]:sm:w-auto"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
