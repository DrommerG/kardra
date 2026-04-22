import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function PageHero({
  label,
  title,
  subtitle,
  support,
  children,
  minHeight = '60vh',
  titleSize = 'clamp(2.5rem,6vw,6.5rem)',
  showGrid = true,
  maxWidthTitle = 'max-w-5xl',
  labelColor = '#6E1F28',
}) {
  const ref = useRef()
  const inView = useInView(ref, { once: true })

  return (
    <section
      ref={ref}
      className="flex items-end section-padding border-b border-[#111] relative overflow-hidden"
      style={{ minHeight }}
    >
      {showGrid && (
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(#F5F3EF 1px, transparent 1px), linear-gradient(90deg, #F5F3EF 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      )}

      <div className="relative max-w-7xl mx-auto w-full">
        {label && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="inline-block text-[10px] font-['Barlow'] font-600 tracking-[0.3em] uppercase px-3 py-1 mb-8 border"
            style={{ color: labelColor, borderColor: `${labelColor}66` }}
          >
            {label}
          </motion.div>
        )}

        {title && (
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7 }}
            className={`font-display ${maxWidthTitle} mb-6`}
            style={{ fontSize: titleSize }}
          >
            {title}
          </motion.h1>
        )}

        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.35 }}
            className="text-[#8F8A84] text-lg max-w-xl mb-4"
          >
            {subtitle}
          </motion.p>
        )}

        {support && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.45 }}
            className="text-[#555656] text-sm mb-10"
          >
            {support}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.55 }}
            className="flex flex-col sm:flex-row sm:flex-wrap gap-3 [&>*]:w-full [&>*]:sm:w-auto"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
