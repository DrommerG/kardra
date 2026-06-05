import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-[#5d0018] text-[#f0ede8] border-2 border-[#5d0018] hover:bg-[#d29f22] hover:border-[#d29f22] hover:text-[#19171b]',
  gold:    'bg-[#d29f22] text-[#19171b] border-2 border-[#d29f22] hover:bg-transparent hover:text-[#d29f22]',
  outline: 'bg-transparent text-[#f0ede8] border-2 border-[#f0ede8]/50 hover:border-[#d29f22] hover:text-[#d29f22]',
  ghost:   'bg-transparent text-[#6a6868] border-2 border-[#2e2c30] hover:text-[#f0ede8] hover:border-[#f0ede8]/50',
  cream:   'bg-transparent text-[#f0ede8] border-2 border-[#f0ede8]/50 hover:bg-[#f0ede8] hover:text-[#19171b] hover:border-[#f0ede8]',
}

export default function Button({ children, variant = 'primary', href, onClick, className = '', target }) {
  const base = `inline-flex items-center gap-3 px-8 py-4 font-['Space_Grotesk'] font-600 text-[12px] tracking-[0.22em] uppercase transition-all duration-200 cursor-pointer select-none ${variants[variant]} ${className}`

  const content = (
    <motion.span
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      className={base}
    >
      {children}
    </motion.span>
  )

  if (href) return <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>{content}</a>
  return <button onClick={onClick}>{content}</button>
}
