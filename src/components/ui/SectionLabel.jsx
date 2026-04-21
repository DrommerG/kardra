export default function SectionLabel({ children, className = '' }) {
  return (
    <span className={`inline-block text-[10px] font-['Barlow'] font-600 tracking-[0.25em] uppercase text-[#6E1F28] border border-[#6E1F28]/40 px-3 py-1 mb-6 ${className}`}>
      {children}
    </span>
  )
}
