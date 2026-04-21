import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-[#6E1F28] text-[#F5F3EF] border border-[#6E1F28] hover:bg-[#4A0F1C] hover:border-[#4A0F1C]',
  outline: 'bg-transparent text-[#F5F3EF] border border-[#555656] hover:border-[#F5F3EF]',
  ghost: 'bg-transparent text-[#8F8A84] border border-transparent hover:text-[#F5F3EF] hover:border-[#333434]',
}

export default function Button({ children, variant = 'primary', href, onClick, className = '', target }) {
  const base = `inline-flex items-center gap-2 px-6 py-3 font-['Barlow'] font-600 text-sm tracking-widest uppercase transition-all duration-200 cursor-pointer select-none ${variants[variant]} ${className}`

  const content = (
    <motion.span
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={base}
    >
      {children}
    </motion.span>
  )

  if (href) {
    return <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>{content}</a>
  }
  return <button onClick={onClick}>{content}</button>
}
