import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { BRAND_NAME, SECTIONS } from '../config'

const SunIcon = () => (
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
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
  </svg>
)

export default function Navbar({
  theme, onToggleTheme,
  menuOpen, onToggleMenu, onCloseMenu,
  activeSection, isAboutPage,
}) {
  const { t, i18n } = useTranslation()
  const location = useLocation()

  const NAV_LINKS = [
    ...SECTIONS.map(id => ({ href: `#${id}`, label: t(`nav.${id}`), id, isRoute: false })),
    { href: '/about', label: t('nav.about'), id: 'about', isRoute: true },
  ]

  const toggleLang = () => {
    const cycle = { en: 'de', de: 'es', es: 'en' }
    i18n.changeLanguage(cycle[i18n.language] ?? 'en')
  }

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const homePath = isAboutPage ? '/' : '#home'

  return (
    <>
      {/* ── Floating logo (top-left) — hidden when menu open ── */}
      <a
        href={homePath}
        className={`nav-float-logo ${menuOpen ? 'nav-float-logo--hide' : ''}`}
        aria-label={`${BRAND_NAME} — Home`}
      >
        <img src="/logo.svg" alt={BRAND_NAME} width="36" height="36" aria-hidden="true" />
        <span className="logo-wordmark">{BRAND_NAME}</span>
      </a>

      {/* ── Floating hamburger (top-right) — always on top ── */}
      <button
        className={`nav-hamburger ${menuOpen ? 'nav-hamburger--open' : ''}`}
        onClick={onToggleMenu}
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuOpen}
      >
        <span /><span /><span />
      </button>

      {/* ── Full-screen paint-slide overlay ── */}
      <div
        className={`fullmenu ${menuOpen ? 'fullmenu--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navegación principal"
      >
        {/* Logo inside overlay */}
        <a
          href={homePath}
          className="fullmenu-brand"
          onClick={onCloseMenu}
        >
          <img src="/logo.svg" alt={BRAND_NAME} width="40" height="40" aria-hidden="true" />
          <span className="logo-wordmark">{BRAND_NAME}</span>
        </a>

        {/* Nav links */}
        <nav className="fullmenu-nav" aria-label="Menú principal">
          {NAV_LINKS.map(({ href, label, id, isRoute }, i) => {
            const isActive = isRoute
              ? location.pathname === href
              : activeSection === id

            return isRoute ? (
              <Link
                key={href}
                to={href}
                className={`fullmenu-link ${isActive ? 'fullmenu-link--active' : ''}`}
                style={{ '--i': i }}
                onClick={onCloseMenu}
              >
                <span className="fullmenu-link-inner">{label}</span>
              </Link>
            ) : (
              <a
                key={href}
                href={isAboutPage ? `/${href}` : href}
                className={`fullmenu-link ${isActive ? 'fullmenu-link--active' : ''}`}
                style={{ '--i': i }}
                onClick={onCloseMenu}
              >
                <span className="fullmenu-link-inner">{label}</span>
              </a>
            )
          })}
        </nav>

        {/* Bottom bar: lang + theme + socials */}
        <div className="fullmenu-bottom">
          <button className="fullmenu-lang" onClick={toggleLang} aria-label="Cambiar idioma">
            {{ en: 'DE', de: 'ES', es: 'EN' }[i18n.language] ?? 'DE'}
          </button>
          <button className="fullmenu-theme-btn" onClick={onToggleTheme} aria-label="Cambiar tema">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <div className="fullmenu-socials">
            <a href="https://www.instagram.com/kelugroup" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="https://www.tiktok.com/@kelugmbh" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <TikTokIcon />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
