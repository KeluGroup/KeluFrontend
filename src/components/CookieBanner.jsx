import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const BLOCKED_ROUTES = ['/admin', '/dashboard']

export default function CookieBanner() {
  const { t } = useTranslation()
  const location = useLocation()
  const [visible, setVisible] = useState(false)
  const [settled, setSettled] = useState(false)

  const isBlocked = BLOCKED_ROUTES.some(r =>
    location.pathname.startsWith(r)
  )

  // ── Watch footer and set --footer-clearance CSS var ──
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return

    const update = () => {
      const footerRect = footer.getBoundingClientRect()
      const viewportH  = window.innerHeight
      // How many px of the footer are currently visible
      const visible    = Math.max(0, viewportH - footerRect.top)
      document.documentElement.style.setProperty(
        '--footer-clearance',
        `${visible + 12}px`   // 12px extra breathing room
      )
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [location.pathname])

  useEffect(() => {
    if (isBlocked) return
    const consent = localStorage.getItem('kelu-cookie-consent')
    if (!consent) {
      setVisible(true)
    } else {
      setSettled(true)
    }
  }, [isBlocked])

  const pushConsent = (granted) => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'cookie_consent_update',
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: 'denied',
    })
  }

  const handleAccept = () => {
    localStorage.setItem('kelu-cookie-consent', 'granted')
    pushConsent(true)
    setVisible(false)
    setSettled(true)
  }

  const handleDecline = () => {
    localStorage.setItem('kelu-cookie-consent', 'denied')
    pushConsent(false)
    setVisible(false)
    setSettled(true)
  }

  const handleReopen = () => {
    setVisible(true)
    setSettled(false)
  }

  if (isBlocked) return null

  return (
    <>
      {/* ── Floating cookie settings button ── */}
      {settled && !visible && (
        <button
          className="cookie-settings-btn"
          onClick={handleReopen}
          aria-label={t('cookies.settingsLabel')}
          title={t('cookies.settingsLabel')}
        >
          🍪
        </button>
      )}

      {/* ── Banner ── */}
      {visible && (
        <div className="cookie-banner" role="dialog" aria-live="polite"
          aria-label={t('cookies.bannerLabel')}>
          <div className="cookie-banner-inner">
            <div className="cookie-banner-text">
              <p>
                {t('cookies.bannerText')}{' '}
                <Link to="/cookies" className="cookie-banner-link">
                  {t('cookies.bannerLinkLabel')}
                </Link>.
              </p>
            </div>
            <div className="cookie-banner-actions">
              <button className="cookie-btn cookie-btn--decline" onClick={handleDecline}>
                {t('cookies.decline')}
              </button>
              <button className="cookie-btn cookie-btn--accept" onClick={handleAccept}>
                {t('cookies.accept')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}