import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollProgress from '../components/ScrollProgress'

export default function Terms({ theme, onToggleTheme, menuOpen, onToggleMenu, onCloseMenu, scrolled }) {
  const { t } = useTranslation()

  useEffect(() => {
    window.scrollTo(0, 0)
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    const timer = setTimeout(() => {
      document.querySelectorAll('.scroll-animate').forEach(el => io.observe(el))
    }, 100)
    return () => { clearTimeout(timer); io.disconnect() }
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
      <main id="main-content" className="policy-main">
        <div className="policy-container">
          <h1 className="policy-title">{t('terms.title')}</h1>
          <p className="policy-updated">{t('terms.updated')}</p>
          <div className="policy-content">
            <h3>{t('terms.s1title')}</h3><p>{t('terms.s1body')}</p>
            <h3>{t('terms.s2title')}</h3><p>{t('terms.s2body')}</p>
            <h3>{t('terms.s3title')}</h3><p>{t('terms.s3body')}</p>
            <h3>{t('terms.s4title')}</h3><p>{t('terms.s4body')}</p>
            <h3>{t('terms.s5title')}</h3><p>{t('terms.s5body')}</p>
            <h3>{t('terms.s6title')}</h3>
            <p>
              {t('terms.s6body')}{' '}
              <a href="/contact" className="policy-link">{t('terms.s6link')}</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}