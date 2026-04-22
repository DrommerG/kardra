import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageToggle from '../ui/LanguageToggle'
import { BASE as base, WA_URL as WA, EMAIL_URL as EMAIL } from '../../config/constants'

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
                className="group relative text-[#555656] text-sm hover:text-[#D1CBC2] transition-colors duration-200 flex items-center"
              >
                <span className="inline-block w-0 overflow-hidden opacity-0 -translate-x-1 transition-all duration-300 ease-out group-hover:w-4 group-hover:opacity-100 group-hover:translate-x-0 text-[#6E1F28]">
                  →
                </span>
                <span className="transition-transform duration-300 ease-out">
                  {t(`nav.${key}`)}
                </span>
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
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="group text-[#555656] text-sm hover:text-[#D1CBC2] transition-colors duration-200 flex items-center gap-2"
            >
              <span className="w-1 h-1 bg-[#6E1F28] rounded-full transition-all duration-300 group-hover:w-2" />
              <span className="inline-block w-0 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:w-4 group-hover:opacity-100 text-[#6E1F28]">
                →
              </span>
              WhatsApp: +593 98 418 7556
            </a>
            <a
              href={EMAIL}
              className="group text-[#555656] text-sm hover:text-[#D1CBC2] transition-colors duration-200 flex items-center gap-2"
            >
              <span className="w-1 h-1 bg-[#6E1F28] rounded-full transition-all duration-300 group-hover:w-2" />
              <span className="inline-block w-0 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:w-4 group-hover:opacity-100 text-[#6E1F28]">
                →
              </span>
              daesgaar@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Decorative gradient divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-[#6E1F28]/40 to-transparent" />
      </div>

      <div className="px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-[#333434] text-[10px] font-['Barlow'] tracking-[0.25em] uppercase">
          © {year} KARDRA — {t('footer.rights')}
        </span>
        <span className="text-[#222] text-[10px] tracking-[0.25em] uppercase">N8N · MAKE · AUTOMATION</span>
      </div>
    </footer>
  )
}
