import { useTranslation } from 'react-i18next'

export default function LanguageToggle({ className = '' }) {
  const { i18n } = useTranslation()
  const current = i18n.language?.startsWith('en') ? 'en' : 'es'

  const toggle = (lang) => {
    if (lang !== current) i18n.changeLanguage(lang)
  }

  return (
    <div className={`flex items-center gap-1 text-xs font-['Barlow'] font-600 tracking-widest ${className}`}>
      <button
        onClick={() => toggle('es')}
        className={`px-1.5 py-0.5 transition-colors duration-150 ${current === 'es' ? 'text-[#F5F3EF]' : 'text-[#555656] hover:text-[#8F8A84]'}`}
      >
        ES
      </button>
      <span className="text-[#333434]">|</span>
      <button
        onClick={() => toggle('en')}
        className={`px-1.5 py-0.5 transition-colors duration-150 ${current === 'en' ? 'text-[#F5F3EF]' : 'text-[#555656] hover:text-[#8F8A84]'}`}
      >
        EN
      </button>
    </div>
  )
}
