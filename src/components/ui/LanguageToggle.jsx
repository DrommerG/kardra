import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'

const LANGS = [
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'en', label: 'English', short: 'EN' },
]

export default function LanguageToggle({ className = '' }) {
  const { i18n } = useTranslation()
  const current = i18n.language?.startsWith('en') ? 'en' : 'es'
  const [open, setOpen] = useState(false)
  const timer = useRef(null)

  const open_  = () => { clearTimeout(timer.current); setOpen(true) }
  const close_ = () => { timer.current = setTimeout(() => setOpen(false), 120) }

  const select = (code) => { i18n.changeLanguage(code); setOpen(false) }

  const currentLang = LANGS.find(l => l.code === current)

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={open_}
      onMouseLeave={close_}
    >
      <button className="flex items-center gap-2 text-[11px] font-['Space_Grotesk'] font-600 tracking-[0.25em] uppercase text-[#6a6868] hover:text-[#f0ede8] transition-colors duration-150 px-2 py-1">
        {currentLang.short}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#d29f22] leading-none"
          style={{ fontSize: '7px' }}
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 bg-[#19171b] border border-[#2e2c30] z-50 min-w-[90px]"
            onMouseEnter={open_}
            onMouseLeave={close_}
          >
            {LANGS.map(({ code, label, short }) => (
              <button
                key={code}
                onClick={() => select(code)}
                className={`w-full text-left px-4 py-2.5 text-[11px] font-['Space_Grotesk'] font-600 tracking-[0.2em] uppercase transition-colors duration-150 flex items-center justify-between gap-3 ${
                  code === current
                    ? 'text-[#d29f22] bg-[#252628]'
                    : 'text-[#6a6868] hover:text-[#f0ede8] hover:bg-[#252628]/60'
                }`}
              >
                {short}
                {code === current && <span className="w-1 h-1 bg-[#d29f22]" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
