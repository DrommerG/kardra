export default function Marquee({ items, speed = 32, className = '' }) {
  const repeated = [...items, ...items, ...items, ...items, ...items, ...items]
  return (
    <div className={`overflow-hidden border-t border-b border-[#2e2c30] bg-[#252628] py-4 ${className}`}>
      <div className="marquee-track">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="text-[11px] font-['Space_Grotesk'] font-600 tracking-[0.28em] uppercase text-[#6a6868] pr-10 whitespace-nowrap"
          >
            {item}
            <span className="text-[#d29f22] mx-4">—</span>
          </span>
        ))}
      </div>
    </div>
  )
}
