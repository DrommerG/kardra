import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageToggle from '../ui/LanguageToggle'
import { BASE as base, WA_URL as WA, EMAIL_URL as EMAIL } from '../../config/constants'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  const links = [
    { key: 'products',  to: `${base}/products` },
    { key: 'services',  to: `${base}/services` },
    { key: 'usecases',  to: `${base}/use-cases` },
    { key: 'about',     to: `${base}/about` },
    { key: 'faq',       to: `${base}/faq` },
    { key: 'contact',   to: `${base}/contact` },
  ]

  return (
    <footer className="bg-[#19171b] border-t-2 border-[#d29f22]">

      {/* Top band — massive brand statement */}
      <div className="px-6 md:px-12 lg:px-20 pt-16 pb-10 border-b border-[#2e2c30]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <img src={`${base}/assets/logo.png`} alt="KARDRA" className="h-12 brightness-0 invert" />
          <p className="text-[#6a6868] text-sm max-w-sm leading-relaxed">
            {t('footer.tagline')}
          </p>
        </div>
      </div>

      {/* Middle: nav + contact */}
      <div className="px-6 md:px-12 lg:px-20 py-12 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-[#2e2c30]">

        {/* Navigation */}
        <div>
          <p className="text-[10px] font-['Barlow'] font-600 tracking-[0.3em] uppercase text-[#d29f22] mb-6 flex items-center gap-2">
            <span className="w-4 h-[2px] bg-[#d29f22]" />
            {t('footer.nav_title')}
          </p>
          <nav className="flex flex-col gap-0">
            {links.map(({ key, to }) => (
              <Link
                key={key}
                to={to}
                className="group flex items-center justify-between py-2.5 border-b border-[#2e2c30] text-[#6a6868] text-sm hover:text-[#f0ede8] transition-colors duration-200"
              >
                {t(`nav.${key}`)}
                <span className="text-[#d29f22] opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs">→</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div>
          <p className="text-[10px] font-['Barlow'] font-600 tracking-[0.3em] uppercase text-[#d29f22] mb-6 flex items-center gap-2">
            <span className="w-4 h-[2px] bg-[#d29f22]" />
            {t('footer.contact_title')}
          </p>
          <div className="flex flex-col gap-4">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 py-3 border-b border-[#2e2c30] transition-all duration-200 hover:border-[#d29f22]/40"
            >
              <span className="w-1.5 h-1.5 bg-[#d29f22] flex-shrink-0 group-hover:scale-150 transition-transform" />
              <span className="text-[#6a6868] text-sm group-hover:text-[#f0ede8] transition-colors">WhatsApp</span>
            </a>
            <a
              href={EMAIL}
              className="group flex items-center gap-3 py-3 border-b border-[#2e2c30] transition-all duration-200 hover:border-[#d29f22]/40"
            >
              <span className="w-1.5 h-1.5 bg-[#d29f22] flex-shrink-0 group-hover:scale-150 transition-transform" />
              <span className="text-[#6a6868] text-sm group-hover:text-[#f0ede8] transition-colors">Email</span>
            </a>
          </div>
        </div>

        {/* Brand statement */}
        <div className="flex flex-col justify-between">
          <div>
            <p className="font-display text-[clamp(2rem,4vw,4.5rem)] text-[#2e2c30] leading-[0.9] select-none">
              KARDRA
            </p>
          </div>
          <LanguageToggle className="mt-6" />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-6 md:px-12 lg:px-20 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-[#2e2c30] text-[10px] font-['Barlow'] tracking-[0.25em] uppercase">
          © {year} KARDRA — {t('footer.rights')}
        </span>
        <span className="text-[#2e2c30] text-[10px] font-['Barlow'] tracking-[0.25em] uppercase">
          N8N · MAKE · AUTOMATION
        </span>
      </div>
    </footer>
  )
}
