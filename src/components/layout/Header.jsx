import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import LanguageToggle from '../ui/LanguageToggle'
import { BASE as base } from '../../config/constants'

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
    { key: 'home',     to: `${base}/` },
    { key: 'products', to: `${base}/products` },
    { key: 'services', to: `${base}/services` },
    { key: 'usecases', to: `${base}/use-cases` },
    { key: 'about',    to: `${base}/about` },
    { key: 'faq',      to: `${base}/faq` },
  ]

  const isActive = (to) => {
    if (to === `${base}/`) return location.pathname === to || location.pathname === `${base}`
    return location.pathname.startsWith(to)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
      scrolled ? 'bg-[#19171b]/96 backdrop-blur-sm' : 'bg-[#19171b]'
    }`}>

      {/* Gold top line — appears on scroll */}
      <motion.div
        initial={false}
        animate={{ scaleX: scrolled ? 1 : 0, opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'left' }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-[#d29f22] z-10"
      />

      <div className="flex items-stretch h-[72px] border-b border-[#2e2c30]">

        {/* Logo block */}
        <Link
          to={`${base}/`}
          className="flex items-center px-6 md:px-8 border-r border-[#2e2c30] group flex-shrink-0"
        >
          <img
            src={`${base}/assets/logo.png`}
            alt="KARDRA"
            className="h-10 brightness-0 invert transition-opacity duration-300 group-hover:opacity-70"
          />
        </Link>

        {/* Desktop nav — each item is its own block */}
        <nav className="hidden lg:flex flex-1">
          {links.map(({ key, to }) => {
            const active = isActive(to)
            return (
              <Link
                key={key}
                to={to}
                className={`relative flex items-center gap-2 px-5 xl:px-6 border-r border-[#2e2c30] text-[10px] font-['Barlow'] font-600 tracking-[0.18em] uppercase transition-all duration-200 ${
                  active
                    ? 'text-[#d29f22] bg-[#252628]'
                    : 'text-[#6a6868] hover:text-[#f0ede8] hover:bg-[#252628]/70'
                }`}
              >
                {t(`nav.${key}`)}
                {active && <span className="w-1.5 h-1.5 bg-[#d29f22] flex-shrink-0" />}
              </Link>
            )
          })}
        </nav>

        {/* Right block: contact link + language + hamburger */}
        <div className="flex items-center ml-auto">
          <Link
            to={`${base}/contact`}
            className={`hidden lg:flex items-center h-full px-6 border-l border-[#2e2c30] text-[10px] font-['Barlow'] font-600 tracking-[0.18em] uppercase transition-all duration-200 ${
              isActive(`${base}/contact`) ? 'bg-[#d29f22] text-[#19171b]' : 'text-[#6a6868] hover:text-[#d29f22] hover:bg-[#252628]'
            }`}
          >
            {t('nav.contact')}
          </Link>

          <div className="flex items-center border-l border-[#2e2c30] px-5 h-full gap-4">
            <LanguageToggle />
            <button
              className="lg:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              <span className={`block w-5 h-[2px] bg-[#f0ede8] transition-all duration-200 origin-center ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block w-5 h-[2px] bg-[#f0ede8] transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-[2px] bg-[#f0ede8] transition-all duration-200 origin-center ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#19171b] border-b border-[#2e2c30]"
          >
            {[...links, { key: 'contact', to: `${base}/contact` }].map(({ key, to }) => (
              <Link
                key={key}
                to={to}
                className={`flex items-center justify-between px-6 py-4 border-b border-[#2e2c30] text-[11px] font-['Barlow'] font-600 tracking-[0.2em] uppercase transition-colors ${
                  isActive(to) ? 'text-[#d29f22] bg-[#252628]' : 'text-[#6a6868]'
                }`}
              >
                {t(`nav.${key}`)}
                {isActive(to) && <span className="w-1.5 h-1.5 bg-[#d29f22]" />}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
