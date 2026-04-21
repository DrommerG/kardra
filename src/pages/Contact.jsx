import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const WA = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`
const EMAIL = `mailto:${import.meta.env.VITE_EMAIL}`

export default function Contact() {
  const { t } = useTranslation()
  const ref = useRef()
  const inView = useInView(ref, { once: true })
  const [form, setForm] = useState({ name: '', company: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = encodeURIComponent(`Nombre: ${form.name}\nEmpresa: ${form.company}\n\n${form.message}`)
    const subject = encodeURIComponent('Consulta desde KARDRA')
    window.location.href = `mailto:${import.meta.env.VITE_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <div className="bg-[#0A0A0A]">
      <section ref={ref} className="section-padding min-h-screen border-b border-[#111]">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="inline-block text-[10px] font-['Barlow'] font-600 tracking-[0.3em] uppercase text-[#6E1F28] border border-[#6E1F28]/40 px-3 py-1 mb-8"
            >
              CONTACTO
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="font-display text-[clamp(3rem,6vw,6rem)] mb-6"
            >
              {t('contact.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.35 }}
              className="text-[#8F8A84] text-lg mb-12 max-w-sm leading-relaxed"
            >
              {t('contact.text')}
            </motion.p>

            {/* Direct contact buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-4"
            >
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 border border-[#1a1a1a] hover:border-[#6E1F28]/50 group transition-colors duration-300"
              >
                <div className="w-10 h-10 border border-[#6E1F28]/40 flex items-center justify-center flex-shrink-0 group-hover:bg-[#6E1F28]/10 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#6E1F28]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-['Barlow'] font-600 tracking-[0.2em] uppercase text-[#555656] mb-0.5">WhatsApp</p>
                  <p className="text-[#D1CBC2] text-sm">+593 98 418 7556</p>
                </div>
              </a>

              <a
                href={EMAIL}
                className="flex items-center gap-4 p-5 border border-[#1a1a1a] hover:border-[#6E1F28]/50 group transition-colors duration-300"
              >
                <div className="w-10 h-10 border border-[#6E1F28]/40 flex items-center justify-center flex-shrink-0 group-hover:bg-[#6E1F28]/10 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="#6E1F28" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-['Barlow'] font-600 tracking-[0.2em] uppercase text-[#555656] mb-0.5">Email</p>
                  <p className="text-[#D1CBC2] text-sm">daesgaar@gmail.com</p>
                </div>
              </a>
            </motion.div>
          </div>

          {/* Right: form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            {[
              { key: 'name', type: 'text' },
              { key: 'company', type: 'text' },
            ].map(({ key, type }) => (
              <div key={key} className="flex flex-col gap-2">
                <label className="text-[10px] font-['Barlow'] font-600 tracking-[0.2em] uppercase text-[#555656]">
                  {t(`contact.form.${key}`)}
                </label>
                <input
                  type={type}
                  value={form[key]}
                  onChange={(e) => setForm(p => ({ ...p, [key]: e.target.value }))}
                  className="bg-transparent border border-[#1a1a1a] px-4 py-3 text-[#F5F3EF] text-sm focus:outline-none focus:border-[#6E1F28] transition-colors placeholder:text-[#333434]"
                />
              </div>
            ))}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-['Barlow'] font-600 tracking-[0.2em] uppercase text-[#555656]">
                {t('contact.form.message')}
              </label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))}
                className="bg-transparent border border-[#1a1a1a] px-4 py-3 text-[#F5F3EF] text-sm focus:outline-none focus:border-[#6E1F28] transition-colors resize-none placeholder:text-[#333434]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#6E1F28] text-[#F5F3EF] px-8 py-4 font-['Barlow'] font-600 text-sm tracking-widest uppercase hover:bg-[#4A0F1C] transition-colors duration-200 self-start"
            >
              {t('contact.form.send')}
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  )
}
