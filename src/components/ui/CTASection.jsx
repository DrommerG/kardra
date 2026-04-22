import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Button from './Button'

export default function CTASection({
  title,
  subtitle,
  buttons = [],
  glowPosition = 'left',
  glowColor = '#6E1F28',
}) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const glowClass =
    glowPosition === 'right'
      ? 'absolute bottom-0 right-0 w-64 h-64 blur-3xl pointer-events-none'
      : 'absolute bottom-0 left-0 w-64 h-64 blur-3xl'

  return (
    <section
      ref={ref}
      className="section-padding border-t border-[#111] relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={glowClass}
          style={{ backgroundColor: `${glowColor}0D` }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="relative max-w-7xl mx-auto text-center"
      >
        {title && (
          <h2 className="font-display text-[clamp(2rem,4.5vw,5rem)] mb-4 max-w-4xl mx-auto">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-[#8F8A84] mb-10">{subtitle}</p>
        )}
        {!subtitle && title && <div className="mb-10" />}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {buttons.map((btn, i) => (
            <Button
              key={i}
              variant={btn.variant || 'primary'}
              href={btn.href}
              target={btn.target}
            >
              {btn.label}
            </Button>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
