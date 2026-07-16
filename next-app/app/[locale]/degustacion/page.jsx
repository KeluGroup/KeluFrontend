'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

const WA_NUMBER = '41446880284'

const StepIcons = [
  // WhatsApp / message
  <svg key="s1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>,
  // Flame — hot tasting
  <svg key="s2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>,
  // Truck — first delivery
  <svg key="s3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 17h4V5H2v12h3"/>
    <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1"/>
    <circle cx="7.5" cy="17.5" r="2.5"/>
    <circle cx="17.5" cy="17.5" r="2.5"/>
  </svg>,
]

export default function TastingPage() {
  const t      = useTranslations()
  const locale = useLocale()

  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t('tasting.waText'))}`

  return (
    <main id="main-content" className="tasting-main">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="tasting-hero" aria-label="Tasting box follow-up">
        <div className="tasting-hero-inner">
          <span className="section-tag">{t('tasting.tag')}</span>
          <h1 className="tasting-title">{t('tasting.title')}</h1>
          <p className="tasting-sub">{t('tasting.sub')}</p>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="tasting-wa-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            {t('tasting.cta')}
          </a>
        </div>
      </section>

      {/* ── Steps ────────────────────────────────────────── */}
      <section className="tasting-steps" aria-label="Next steps">
        <div className="tasting-steps-inner">
          <h2 className="tasting-steps-title">{t('tasting.stepsTitle')}</h2>
          <div className="tasting-steps-grid">
            {[1, 2, 3].map((n, i) => (
              <article key={n} className="tasting-step-card">
                <div className="tasting-step-icon">{StepIcons[i]}</div>
                <span className="tasting-step-num">{n}</span>
                <h3 className="tasting-step-title">{t(`tasting.s${n}title`)}</h3>
                <p className="tasting-step-text">{t(`tasting.s${n}text`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing strip (reuses pricing translations) ──── */}
      <section className="tasting-pricing" aria-label="Pricing tiers">
        <div className="tasting-pricing-inner">
          <h2 className="tasting-pricing-title">{t('tasting.priceTitle')}</h2>
          <p className="tasting-pricing-sub">{t('tasting.priceSub')}</p>
          <div className="tasting-tiers">
            {[1, 2, 3].map(n => (
              <div key={n} className="tasting-tier">
                <span className="tasting-tier-discount">{t(`pricing.tier${n}discount`)}</span>
                <span className="tasting-tier-name">{t(`pricing.tier${n}name`)}</span>
                <span className="tasting-tier-threshold">
                  {t(`pricing.tier${n}threshold`)} / {t(`pricing.tier${n}period`)}
                </span>
              </div>
            ))}
          </div>
          <Link href={`/${locale}/services`} className="tasting-services-link">
            {t('tasting.pricesCta')} →
          </Link>
        </div>
      </section>

      {/* ── Trust line ───────────────────────────────────── */}
      <section className="tasting-trust" aria-label="Company details">
        <p>{t('tasting.trust')}</p>
      </section>

    </main>
  )
}
