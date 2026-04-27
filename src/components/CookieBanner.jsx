import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const BLOCKED_ROUTES = ['/admin', '/dashboard']

export default function CookieBanner() {
  const { t } = useTranslation()
  const location = useLocation()
  const [visible, setVisible] = useState(false)

  const isBlocked = BLOCKED_ROUTES.some(r =>
    location.pathname.startsWith(r)
  )

  // Watch footer and set --footer-clearance CSS var
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return

    const update = () => {
      const footerRect = footer.getBoundingClientRect()
      const viewportH  = window.innerHeight
      const visible    = Math.max(0, viewportH - footerRect.top)
      document.documentElement.style.setProperty(
        '--footer-clearance',
        `${visible + 12}px`
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
    if (!consent) setVisible(true)
  }, [isBlocked])

  const pushConsent = (granted) => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event:                 'cookie_consent_update',
      analytics_storage:     granted ? 'granted' : 'denied',
      ad_storage:            'denied',
      ad_user_data:          'denied',
      ad_personalization:    'denied',
      functionality_storage: granted ? 'granted' : 'denied',
      security_storage:      'granted',
    })

    if (granted) {
      window.dataLayer.push({
        event:      'consent_pageview',
        page_path:  window.location.pathname,
        page_title: document.title,
      })
    }
  }

  const clearGACookies = () => {
    const cookies = ['_ga', '_gid', '_gat']
    const domains = [window.location.hostname, `.${window.location.hostname}`]
    cookies.forEach(name => {
      domains.forEach(domain => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`
      })
    })
    document.cookie.split(';').forEach(cookie => {
      const name = cookie.trim().split('=')[0]
      if (name.startsWith('_ga_')) {
        domains.forEach(domain => {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`
        })
      }
    })
  }

  const handleAccept = () => {
    localStorage.setItem('kelu-cookie-consent', 'granted')
    pushConsent(true)
    setVisible(false)
  }

  const handleDecline = () => {
    const wasGranted = localStorage.getItem('kelu-cookie-consent') === 'granted'
    localStorage.setItem('kelu-cookie-consent', 'denied')
    pushConsent(false)
    if (wasGranted) clearGACookies()
    setVisible(false)
  }

  if (!visible || isBlocked) return null

  return (
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
  )
}