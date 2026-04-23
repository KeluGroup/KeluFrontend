import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollProgress from '../components/ScrollProgress'

export default function CookiePolicy({
  theme,
  onToggleTheme,
  menuOpen,
  onToggleMenu,
  onCloseMenu,
  scrolled,
}) {
  const { t } = useTranslation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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

      <main className="policy-main">
        <div className="policy-container">

          <p className="policy-updated">{t('cookiePolicy.lastUpdated')}</p>
          <h1 className="policy-title">{t('cookiePolicy.title')}</h1>

          <div className="policy-content">

            <h3>{t('cookiePolicy.whatAreTitle')}</h3>
            <p>{t('cookiePolicy.whatAreText')}</p>

            <h3>{t('cookiePolicy.howWeUseTitle')}</h3>
            <p>{t('cookiePolicy.howWeUseText')}</p>

            <h3>{t('cookiePolicy.typesTitle')}</h3>
            <p>
              <strong>{t('cookiePolicy.typesEssentialLabel')}</strong>
              {' — '}
              {t('cookiePolicy.typesEssentialText')}
            </p>
            <p>
              <strong>{t('cookiePolicy.typesAnalyticsLabel')}</strong>
              {' — '}
              {t('cookiePolicy.typesAnalyticsText')}
            </p>
            <p>
              <strong>{t('cookiePolicy.typesPreferenceLabel')}</strong>
              {' — '}
              {t('cookiePolicy.typesPreferenceText')}
            </p>

            <h3>{t('cookiePolicy.thirdPartyTitle')}</h3>
            <p>
              {t('cookiePolicy.thirdPartyText')}{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="policy-link"
              >
                {t('cookiePolicy.thirdPartyLinkLabel')}
              </a>.
            </p>

            <h3>{t('cookiePolicy.managingTitle')}</h3>
            <p>
              {t('cookiePolicy.managingText')}{' '}
              <a
                href="https://www.aboutcookies.org"
                target="_blank"
                rel="noopener noreferrer"
                className="policy-link"
              >
                aboutcookies.org
              </a>.
            </p>

            <h3>{t('cookiePolicy.rightsTitle')}</h3>
            <p>
              {t('cookiePolicy.rightsText')}{' '}
            </p>

            <h3>{t('cookiePolicy.changesTitle')}</h3>
            <p>{t('cookiePolicy.changesText')}</p>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}