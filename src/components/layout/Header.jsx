import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import LanguageToggle from '../ui/LanguageToggle'

const base = '/kardra'

export default function Header() {
  const { t } = useTranslation()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  const links = [
    { key: 'home', to: `${base}/` },
    { key: 'products', to: `${base}/products` },
    { key: 'services', to: `${base}/services` },
    { key: 'usecases', to: `${base}/use-cases` },
    { key: 'about', to: `${base}/about` },
    { key: 'contact', to: `${base}/contact` },
    { key: 'faq', to: `${base}/faq` },
  ]

  const isActive = (to) => {
    if (to === `${base}/`) return location.pathname === to || location.pathname === `${base}`
    return location.pathname.startsWith(to)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-[#1a1a1a]' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-10 h-16">
        {/* Logo */}
        <Link to={`${base}/`} className="flex items-center">
          <img
            src={`${base}/assets/logo.png`}
            alt="KARDRA"
            className="h-7 brightness-0 invert"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map(({ key, to }) => (
            <Link
              key={key}
              to={to}
              className={`text-[11px] font-['Barlow'] font-600 tracking-[0.15em] uppercase transition-colors duration-150 ${
                isActive(to) ? 'text-[#F5F3EF]' : 'text-[#555656] hover:text-[#D1CBC2]'
              }`}
            >
              {t(`nav.${key}`)}
            </Link>
          ))}
        </nav>

        {/* Right: language + hamburger */}
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span className={`block w-5 h-px bg-[#F5F3EF] transition-all duration-200 origin-center ${open ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-5 h-px bg-[#F5F3EF] transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-[#F5F3EF] transition-all duration-200 origin-center ${open ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#0A0A0A] border-b border-[#1a1a1a] px-6 py-6 flex flex-col gap-4"
          >
            {links.map(({ key, to }) => (
              <Link
                key={key}
                to={to}
                className={`text-sm font-['Barlow'] font-600 tracking-[0.15em] uppercase py-2 border-b border-[#111] transition-colors ${
                  isActive(to) ? 'text-[#F5F3EF]' : 'text-[#555656]'
                }`}
              >
                {t(`nav.${key}`)}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
