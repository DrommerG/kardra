import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageToggle from '../ui/LanguageToggle'

const base = '/kardra'
const WA = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`
const EMAIL = `mailto:${import.meta.env.VITE_EMAIL}`

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  const links = [
    { key: 'home', to: `${base}/` },
    { key: 'products', to: `${base}/products` },
    { key: 'services', to: `${base}/services` },
    { key: 'usecases', to: `${base}/use-cases` },
    { key: 'about', to: `${base}/about` },
    { key: 'contact', to: `${base}/contact` },
    { key: 'faq', to: `${base}/faq` },
  ]

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1a1a1a] mt-0">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand */}
        <div>
          <img src={`${base}/assets/logo.png`} alt="KARDRA" className="h-6 brightness-0 invert mb-4" />
          <p className="text-[#555656] text-sm leading-relaxed max-w-xs">
            {t('footer.tagline')}
          </p>
          <LanguageToggle className="mt-6" />
        </div>

        {/* Navigation */}
        <div>
          <p className="text-[10px] font-['Barlow'] font-600 tracking-[0.25em] uppercase text-[#333434] mb-5">
            {t('footer.nav_title')}
          </p>
          <nav className="flex flex-col gap-2.5">
            {links.map(({ key, to }) => (
              <Link
                key={key}
                to={to}
                className="text-[#555656] text-sm hover:text-[#D1CBC2] transition-colors duration-150"
              >
                {t(`nav.${key}`)}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div>
          <p className="text-[10px] font-['Barlow'] font-600 tracking-[0.25em] uppercase text-[#333434] mb-5">
            {t('footer.contact_title')}
          </p>
          <div className="flex flex-col gap-3">
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="text-[#555656] text-sm hover:text-[#D1CBC2] transition-colors duration-150 flex items-center gap-2">
              <span className="w-1 h-1 bg-[#6E1F28] rounded-full" />
              WhatsApp: +593 98 418 7556
            </a>
            <a href={EMAIL}
              className="text-[#555656] text-sm hover:text-[#D1CBC2] transition-colors duration-150 flex items-center gap-2">
              <span className="w-1 h-1 bg-[#6E1F28] rounded-full" />
              daesgaar@gmail.com
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#111] px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="text-[#333434] text-xs font-['Barlow'] tracking-widest uppercase">
          © {year} KARDRA — {t('footer.rights')}
        </span>
        <span className="text-[#222] text-xs">N8N · MAKE · AUTOMATION</span>
      </div>
    </footer>
  )
}
