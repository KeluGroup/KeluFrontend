'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function PrivacyPage() {
  const t = useTranslations()

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
    <main id="main-content" className="policy-main">
      <div className="policy-container">
        <h1 className="policy-title">{t('privacy.title')}</h1>
        <p className="policy-updated">{t('privacy.updated')}</p>
        <div className="policy-content">
          <h3>{t('privacy.s1title')}</h3><p>{t('privacy.s1body')}</p>
          <h3>{t('privacy.s2title')}</h3><p>{t('privacy.s2body')}</p>
          <h3>{t('privacy.s3title')}</h3>
          <p>
            {t('privacy.s3body')}{' '}
            <Link href="/cookies" className="policy-link">{t('footer.cookies')}</Link>.
          </p>
          <h3>{t('privacy.s4title')}</h3><p>{t('privacy.s4body')}</p>
        </div>
      </div>
    </main>
  )
}