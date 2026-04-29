import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { BRAND_NAME } from '../config'

// ── Icons ──────────────────────────────────────────────────────────────────
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

// ── Language data ──────────────────────────────────────────────────────────
const LANGS = [
  { code: 'de', label: 'Deutsch', iso: 'de' },
  { code: 'en', label: 'English', iso: 'gb' },
  { code: 'es', label: 'Español', iso: 'es' },
]

const ITEM_H   = 52
const CLOSED_W = 52
const OPEN_W   = 165

// ── LangDropdown ──────────────────────────────────────────────────────────
function LangDropdown() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const current = LANGS.find(l => l.code === i18n.language) ?? LANGS[0]

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSelect = (code) => {
    i18n.changeLanguage(code)
    localStorage.setItem('kelu-lang', code)
    setOpen(false)
  }

  return (
    <div ref={ref} className="lp-wrapper">
      {/* Pill — width/height/radius change with open state */}
      <div
        className="lp-pill"
        style={{
          width:        open ? OPEN_W : CLOSED_W,
          height:       open ? ITEM_H * LANGS.length : ITEM_H,
          borderRadius: open ? '16px' : '9999px',
        }}
      >
        {/* LAYER 1: Closed trigger */}
        <button
          className="lp-trigger"
          onClick={() => setOpen(true)}
          aria-label="Cambiar idioma"
          style={{
            opacity:      open ? 0 : 1,
            pointerEvents: open ? 'none' : 'auto',
          }}
        >
          <span className={`fi fi-${current.iso} lp-flag-sm`} />
          <span className="lp-code">{current.code.toUpperCase()}</span>
        </button>

        {/* LAYER 2: Open list — fixed order */}
        {LANGS.map((lang, idx) => {
          const isCurrent = lang.code === current.code
          return (
            <div
              key={lang.code}
              className="lp-item"
              style={{
                top:           idx * ITEM_H,
                opacity:       open ? 1 : 0,
                transform:     open ? 'translateY(0)' : 'translateY(-6px)',
                transition:    `opacity 0.2s ${idx * 0.05}s, transform 0.2s ${idx * 0.05}s`,
                pointerEvents: open ? 'auto' : 'none',
              }}
            >
              {idx > 0 && <div className="lp-sep" />}

              <button
                className="lp-row"
                onClick={() => isCurrent ? setOpen(false) : handleSelect(lang.code)}
                aria-label={lang.label}
                style={{
                  background: isCurrent ? 'var(--lp-hov)' : 'transparent',
                  color:      isCurrent ? 'var(--lp-color)' : 'var(--lp-dim)',
                }}
              >
                <span className={`fi fi-${lang.iso} lp-flag-lg`} />
                <span
                  className="lp-label"
                  style={{ fontWeight: isCurrent ? 700 : 500 }}
                >
                  {lang.label}
                </span>
                {isCurrent && (
                  <svg className="lp-check" width="13" height="13" viewBox="0 0 12 12" fill="none">
                    <path d="M1.5 6l3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Navbar ─────────────────────────────────────────────────────────────────
export default function Navbar({
  theme, onToggleTheme,
  menuOpen, onToggleMenu, onCloseMenu,
  activeSection, isAboutPage,
}) {
  const { t } = useTranslation()
  const location = useLocation()

  const NAV_LINKS = [
    { href: '#home',     label: t('nav.home'),     id: 'home',     isRoute: false },
    { href: '/products', label: t('nav.products'), id: 'products', isRoute: true  },
    { href: '/contact',  label: t('nav.contact'),  id: 'contact',  isRoute: true  },
    { href: '/about',    label: t('nav.about'),    id: 'about',    isRoute: true  },
    { href: '/faq',      label: 'FAQ',             id: 'faq',      isRoute: true  },
  ]

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const homePath = isAboutPage ? '/' : '#home'

  return (
    <>
      {/* ── Floating logo ── */}
      <a
        href={homePath}
        className={`nav-float-logo ${menuOpen ? 'nav-float-logo--hide' : ''}`}
        aria-label={`${BRAND_NAME} — Home`}
      >
        <img src="/logo-color.svg" alt={BRAND_NAME} width="52" height="52" aria-hidden="true" />
      </a>

      {/* ── Floating controls ── */}
      <div className="nav-controls">
        <LangDropdown />
        <button
          className="nav-ctrl-btn nav-ctrl-btn--icon"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>

      {/* ── Hamburger ── */}
      <button
        className={`nav-hamburger ${menuOpen ? 'nav-hamburger--open' : ''}`}
        onClick={onToggleMenu}
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuOpen}
      >
        <span /><span /><span />
      </button>

      {/* ── Full-screen overlay ── */}
      <div
        className={`fullmenu ${menuOpen ? 'fullmenu--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navegación principal"
      >
        <div className="fullmenu-top">
          <a href={homePath} className="fullmenu-brand" onClick={onCloseMenu}>
            <div className="fullmenu-logo-wrap">
              <div className="fullmenu-logo-glow" aria-hidden="true" />
              <img src="/logo.svg" alt={BRAND_NAME} width="100" height="100" className="fullmenu-logo-img" />
            </div>
            <span className="fullmenu-wordmark">{BRAND_NAME}</span>
          </a>
        </div>

        <nav className="fullmenu-nav" aria-label="Menú principal">
          {NAV_LINKS.map(({ href, label, id, isRoute }, i) => {
            const isActive = isRoute ? location.pathname === href : activeSection === id
            return isRoute ? (
              <Link
                key={href} to={href}
                className={`fullmenu-link ${isActive ? 'fullmenu-link--active' : ''}`}
                style={{ '--i': i }}          // ← CSS custom prop, must stay inline
                onClick={onCloseMenu}
              >
                <span className="fullmenu-link-inner">{label}</span>
              </Link>
            ) : (
              <a
                key={href} href={isAboutPage ? `/${href}` : href}
                className={`fullmenu-link ${isActive ? 'fullmenu-link--active' : ''}`}
                style={{ '--i': i }}
                onClick={onCloseMenu}
              >
                <span className="fullmenu-link-inner">{label}</span>
              </a>
            )
          })}
        </nav>

        <div className="fullmenu-bottom">
          <div className="fullmenu-bottom-left">
            <Link to="/privacy" className="fullmenu-small-link" onClick={onCloseMenu}>Privacy</Link>
            <span className="fullmenu-sep-dot">·</span>
            <Link to="/terms" className="fullmenu-small-link" onClick={onCloseMenu}>Terms</Link>
          </div>
          <div className="fullmenu-socials">
            <a href="https://www.instagram.com/kelugroup" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="https://www.tiktok.com/@kelugmbh" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <TikTokIcon />
            </a>
          </div>
          <div className="fullmenu-bottom-right" />
        </div>
      </div>
    </>
  )
}