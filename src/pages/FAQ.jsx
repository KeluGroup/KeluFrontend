import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollProgress from '../components/ScrollProgress'

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item ${open ? 'faq-item--open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span>{question}</span>
        <svg className="faq-chevron" width="18" height="18" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && <div className="faq-answer"><p>{answer}</p></div>}
    </div>
  )
}

export default function FAQ({ theme, onToggleTheme, menuOpen, onToggleMenu, onCloseMenu, scrolled }) {
  const { t } = useTranslation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const items = [1, 2, 3, 4, 5, 6, 7, 8].map(n => ({
    q: t(`faq.q${n}`),
    a: t(`faq.a${n}`),
  }))

  return (
    <>
      <ScrollProgress />
      <Navbar
        theme={theme}
        onToggleTheme={onToggleTheme}
        menuOpen={menuOpen}
        onToggleMenu={onToggleMenu}
        onCloseMenu={onCloseMenu}
        activeSection=""
        scrolled={scrolled}
        isAboutPage
      />
      <main className="faq-main">
        <div className="faq-container">
          <div className="faq-header">
            <span className="section-tag">{t('faq.tag')}</span>
            <h1 className="section-title">{t('faq.title')}</h1>
            <p className="section-sub">{t('faq.subtitle')}</p>
          </div>

          <div className="faq-list">
            {items.map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>

          <div className="faq-cta">
            <p className="faq-cta-text">{t('faq.contactCta')}</p>
            <Link to="/contact" className="catalogue-cta-btn">
              {t('faq.contactBtn')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
