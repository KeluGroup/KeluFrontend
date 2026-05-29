'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

const BLOCKED_ROUTES = ['/admin', '/dashboard']

export default function CookieBanner() {
  const t        = useTranslations()
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  const isBlocked = BLOCKED_ROUTES.some(r => pathname.startsWith(r))

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return

    const update = () => {
      const footerRect = footer.getBoundingClientRect()
      const viewportH  = window.innerHeight
      const overlap    = Math.max(0, viewportH - footerRect.top)
      document.documentElement.style.setProperty('--footer-clearance', `${overlap + 12}px`)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [pathname])

  useEffect(() => {
    if (isBlocked) return
    try {
      const consent = localStorage.getItem('kelu-cookie-consent')
      if (!consent) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [isBlocked])

  const pushConsent = (granted) => {
    window.dataLayer = window.dataLayer || []
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments) }

    const consentState = {
      analytics_storage:     granted ? 'granted' : 'denied',
      ad_storage:            'denied',
      ad_user_data:          'denied',
      ad_personalization:    'denied',
      functionality_storage: granted ? 'granted' : 'denied',
      security_storage:      'granted',
    }

    window.gtag('consent', 'update', consentState)
    window.dataLayer.push({ event: 'cookie_consent_update', ...consentState })

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
    try { localStorage.setItem('kelu-cookie-consent', 'granted') } catch {}
    pushConsent(true)
    setVisible(false)
  }

  const handleDecline = () => {
    let wasGranted = false
    try {
      wasGranted = localStorage.getItem('kelu-cookie-consent') === 'granted'
      localStorage.setItem('kelu-cookie-consent', 'denied')
    } catch {}
    pushConsent(false)
    if (wasGranted) clearGACookies()
    setVisible(false)
  }

  if (!visible || isBlocked) return null

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-live="polite"
      aria-label={t('cookies.bannerLabel')}
    >
      <div className="cookie-banner-inner">
        <div className="cookie-banner-text">
          <p>
            {t('cookies.bannerText')}{' '}
            <Link href="/cookies" className="cookie-banner-link">
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