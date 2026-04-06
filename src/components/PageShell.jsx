import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BRAND_NAME } from '../config'

export default function PageShell({ title, children, theme, onToggleTheme }) {
  const { t, i18n } = useTranslation()
  const toggleLang  = () => i18n.changeLanguage(i18n.language === 'en' ? 'de' : 'en')

  return (
    <>
      <header className="navbar" role="banner">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo" aria-label={`${BRAND_NAME} — Back to home`}>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
              <rect width="34" height="34" rx="9" fill="rgba(255,255,255,0.12)"/>
              <path d="M17 7C17 7 9 13 9 20C9 24.4 12.7 28 17 28C21.3 28 25 24.4 25 20C25 13 17 7 17 7Z" fill="#9DB59F"/>
              <path d="M17 11C17 11 11 16 11 21C11 24.3 13.7 27 17 27" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
              <circle cx="17" cy="20" r="2.5" fill="white"/>
            </svg>
            <span className="logo-wordmark">{BRAND_NAME}</span>
          </Link>

          <Link to="/" className="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            {t('shell.back')}
          </Link>

          <div className="navbar-actions">
            <button className="lang-switcher" onClick={toggleLang} aria-label="Switch language">
              {i18n.language === 'en' ? 'DE' : 'EN'}
            </button>
            <button className="icon-btn" onClick={onToggleTheme} aria-label="Toggle theme">
              {theme === 'dark'
                ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              }
            </button>
          </div>
        </div>
      </header>

      <main className="policy-main">
        <div className="policy-container">
          <h1 className="policy-title">{title}</h1>
          <div className="policy-content">{children}</div>
        </div>
      </main>
    </>
  )
}
