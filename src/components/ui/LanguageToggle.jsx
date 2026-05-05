import { useTranslation } from 'react-i18next'

export default function LanguageToggle({ className = '' }) {
  const { i18n } = useTranslation()
  const current = i18n.language?.startsWith('en') ? 'en' : 'es'

  const toggle = (lang) => { if (lang !== current) i18n.changeLanguage(lang) }

  return (
    <div className={`flex items-center gap-0 text-[10px] font-['Barlow'] font-600 tracking-widest ${className}`}>
      <button
        onClick={() => toggle('es')}
        className={`px-2 py-1 transition-colors duration-150 border-r border-[#2e2c30] ${current === 'es' ? 'text-[#d29f22]' : 'text-[#6a6868] hover:text-[#f0ede8]'}`}
      >
        ES
      </button>
      <button
        onClick={() => toggle('en')}
        className={`px-2 py-1 transition-colors duration-150 ${current === 'en' ? 'text-[#d29f22]' : 'text-[#6a6868] hover:text-[#f0ede8]'}`}
      >
        EN
      </button>
    </div>
  )
}
