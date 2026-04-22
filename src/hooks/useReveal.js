import { useRef } from 'react'
import { useInView } from 'framer-motion'

const VARIANTS = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
}

export default function useReveal({
  variant = 'slideUp',
  once = true,
  margin = '-80px',
  amount = 0.2,
  duration = 0.7,
  delay = 0,
  ease = [0.16, 1, 0.3, 1],
} = {}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin, amount })

  const variants = VARIANTS[variant] || VARIANTS.slideUp

  const motionProps = {
    ref,
    initial: 'hidden',
    animate: inView ? 'visible' : 'hidden',
    variants,
    transition: { duration, delay, ease },
  }

  return { ref, inView, motionProps, variants }
}

export { VARIANTS }
