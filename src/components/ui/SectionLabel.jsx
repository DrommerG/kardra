export default function SectionLabel({ children, className = '', color = 'gold' }) {
  const colors = {
    gold:  'text-[#d29f22] border-[#d29f22]/40',
    red:   'text-[#5d0018] border-[#5d0018]/40',
    muted: 'text-[#6a6868] border-[#6a6868]/40',
    cream: 'text-[#f0ede8] border-[#f0ede8]/40',
  }
  return (
    <span className={`inline-flex items-center gap-2.5 text-[10px] font-['Space_Grotesk'] font-600 tracking-[0.35em] uppercase border px-3.5 py-1.5 mb-8 ${colors[color] ?? colors.gold} ${className}`}>
      <span className="w-1.5 h-1.5 bg-current" />
      {children}
    </span>
  )
}
