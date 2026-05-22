'use client'

import '../i18n/index'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
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

// ── Language data ──────────────────────────────────────────────────────────
const LANGS = [
  { code: 'de', label: 'Deutsch',  iso: 'de' },
  { code: 'en', label: 'English',  iso: 'gb' },
  { code: 'es', label: 'Español',  iso: 'es' },
  { code: 'fr', label: 'Français', iso: 'fr' },
  { code: 'it', label: 'Italiano', iso: 'it' },
]

const VALID_LOCALES = ['de', 'en', 'es', 'fr', 'it']
const ITEM_H   = 52
const CLOSED_W = 52
const OPEN_W   = 165

// ── LangDropdown ──────────────────────────────────────────────────────────
function LangDropdown() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const pathname = usePathname()
  const router = useRouter()

  const urlLocale = pathname?.split('/')[1]
  const currentCode = VALID_LOCALES.includes(urlLocale) ? urlLocale : 'de'
  const current = LANGS.find(l => l.code === currentCode) ?? LANGS[0]

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSelect = (code) => {
    setOpen(false)
    const segments = pathname.split('/')
    segments[1] = code
    router.push(segments.join('/') || `/${code}`)
  }

  return (
    <div ref={ref} className="lp-wrapper">
      <div
        className="lp-pill"
        style={{
          width:        open ? OPEN_W : CLOSED_W,
          height:       open ? ITEM_H * LANGS.length : ITEM_H,
          borderRadius: open ? '16px' : '9999px',
        }}
      >
        <button
          className="lp-trigger"
          onClick={() => setOpen(true)}
          aria-label="Cambiar idioma"
          style={{
            opacity:       open ? 0 : 1,
            pointerEvents: open ? 'none' : 'auto',
          }}
        >
          <span className={`fi fi-${current.iso} lp-flag-sm`} />
          <span className="lp-code">{current.code.toUpperCase()}</span>
        </button>

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
                <span className="lp-label" style={{ fontWeight: isCurrent ? 700 : 500 }}>
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
  const { t, i18n } = useTranslation()
  const pathname = usePathname()
  const router = useRouter()

  // ── derive before hooks that depend on it ──
  const urlLocale = pathname?.split('/')[1]
  const locale = VALID_LOCALES.includes(urlLocale) ? urlLocale : 'de'

  // ── ALL hooks before any early return ──
  //const [mounted, setMounted] = useState(false)
  //useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (VALID_LOCALES.includes(urlLocale) && i18n.language !== urlLocale) {
      if (typeof i18n.changeLanguage === 'function') {
        i18n.changeLanguage(urlLocale)
      }
    }
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // ── safe to return early now ──
  //if (!mounted) return null

  const isHomePage = pathname === '/' || /^\/[a-z]{2}(\/)?$/.test(pathname)

  const NAV_LINKS = [
    { href: `/${locale}`,          label: t('nav.home'),     id: 'home',     isRoute: false },
    { href: `/${locale}/products`, label: t('nav.products'), id: 'products', isRoute: true  },
    { href: `/${locale}/services`, label: t('nav.services'), id: 'services', isRoute: true  },
    { href: `/${locale}/contact`,  label: t('nav.contact'),  id: 'contact',  isRoute: true  },
    { href: `/${locale}/about`,    label: t('nav.about'),    id: 'about',    isRoute: true  },
    { href: `/${locale}/faq`,      label: 'FAQ',             id: 'faq',      isRoute: true  },
  ]

  const handleHomeClick = (e) => {
    e.preventDefault()
    if (isHomePage) {
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push(`/${locale}`)
    }
    onCloseMenu?.()
  }

  return (
    <>
      {/* ── Floating logo ── */}
      <Link
        href={`/${locale}`}
        onClick={handleHomeClick}
        className={`nav-float-logo ${menuOpen ? 'nav-float-logo--hide' : ''}`}
        aria-label={`${BRAND_NAME} — Home`}
      >
        <img src="/logo-color.svg" alt={BRAND_NAME} width="52" height="52" aria-hidden="true" />
      </Link>

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
          <Link
            href={`/${locale}`}
            onClick={handleHomeClick}
            className="fullmenu-brand"
          >
            <div className="fullmenu-logo-wrap">
              <div className="fullmenu-logo-glow" aria-hidden="true" />
              <img src="/logo-color.svg" alt={BRAND_NAME} width="100" height="100" className="fullmenu-logo-img" />
            </div>
            <span className="fullmenu-wordmark">{BRAND_NAME}</span>
          </Link>
        </div>

        <nav className="fullmenu-nav" aria-label="Menú principal">
          {NAV_LINKS.map(({ href, label, id, isRoute }, i) => {
            const isActive = isRoute ? pathname.includes(`/${id}`) : activeSection === id
            return isRoute ? (
              <Link
                key={href}
                href={href}
                className={`fullmenu-link ${isActive ? 'fullmenu-link--active' : ''}`}
                style={{ '--i': i }}
                onClick={onCloseMenu}
              >
                <span className="fullmenu-link-inner">{label}</span>
              </Link>
            ) : (
              <Link
                key={href}
                href={isHomePage ? href : `/${locale}`}
                className={`fullmenu-link ${isActive ? 'fullmenu-link--active' : ''}`}
                style={{ '--i': i }}
                onClick={handleHomeClick}
              >
                <span className="fullmenu-link-inner">{label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="fullmenu-bottom">
          <div className="fullmenu-bottom-left">
            <Link href={`/${locale}/privacy`} className="fullmenu-small-link" onClick={onCloseMenu}>Privacy</Link>
            <span className="fullmenu-sep-dot">·</span>
            <Link href={`/${locale}/terms`} className="fullmenu-small-link" onClick={onCloseMenu}>Terms</Link>
          </div>
          <div className="fullmenu-bottom-right" />
        </div>
      </div>
    </>
  )
}