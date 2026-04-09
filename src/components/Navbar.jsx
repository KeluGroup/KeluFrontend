import { useTranslation } from 'react-i18next'
import { BRAND_NAME, SECTIONS } from '../config'

const SunIcon  = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/>
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>
)
const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

export default function Navbar({ theme, onToggleTheme, menuOpen, onToggleMenu, onCloseMenu, activeSection, scrolled }) {
  const { t, i18n } = useTranslation()

  const NAV_LINKS = SECTIONS.map(id => ({
    href:  `#${id}`,
    label: t(`nav.${id}`),
  }))

  const toggleLang = () => {
    const cycle = { en: 'de', de: 'es', es: 'en' }
    i18n.changeLanguage(cycle[i18n.language] ?? 'en')
  }

  return (
    <>
      <header className={['navbar', scrolled ? 'scrolled' : ''].join(' ')} role="banner" id="navbar">
        <div className="navbar-inner">

          <a href="#home" className="navbar-logo" aria-label={`${BRAND_NAME} — Home`}>
            <img
              src="/logo.svg"
              alt={BRAND_NAME}
              width="34"
              height="34"
              aria-hidden="true"
            />
            <span className="logo-wordmark">{BRAND_NAME}</span>
          </a>

          <nav aria-label="Primary navigation">
            <ul className="navbar-nav" role="list">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className={activeSection === href.slice(1) ? 'active' : ''}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="navbar-actions">

            {/* Language switcher */}
            <button
              className="lang-switcher"
              onClick={toggleLang}
              aria-label="Switch language"
              title="Switch language"
            >
              {{ en: 'DE', de: 'ES', es: 'EN' }[i18n.language] ?? 'DE'}
            </button>

            {/* Theme toggle */}
            <button
              className="icon-btn"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title="Toggle theme"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            <button
              className={['hamburger', 'icon-btn', menuOpen ? 'open' : ''].join(' ')}
              id="hamburger"
              onClick={onToggleMenu}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>

        </div>
      </header>

      <div
        className={['mobile-drawer', menuOpen ? 'open' : ''].join(' ')}
        role="navigation"
        aria-label="Mobile navigation"
      >
        {NAV_LINKS.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className={activeSection === href.slice(1) ? 'active' : ''}
            onClick={onCloseMenu}
          >
            {label}
          </a>
        ))}
      </div>
    </>
  )
}
