import { useTranslations } from 'next-intl'

const VALUE_ICONS = [
  // 100% B2B — briefcase
  <svg key="b2b" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>,
  // Curated catalogue — clipboard check
  <svg key="cat" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
    <rect x="9" y="3" width="6" height="4" rx="1"/>
    <path d="m9 14 2 2 4-4"/>
  </svg>,
  // Cold chain — snowflake
  <svg key="cold" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="12" y1="2" x2="12" y2="22"/>
    <line x1="4" y1="7" x2="20" y2="17"/>
    <line x1="20" y1="7" x2="4" y2="17"/>
    <path d="m12 2-2 3h4l-2-3zM12 22l-2-3h4l-2 3z"/>
  </svg>,
  // Fixed routes — truck
  <svg key="route" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 17h4V5H2v12h3"/>
    <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1"/>
    <circle cx="7.5" cy="17.5" r="2.5"/>
    <circle cx="17.5" cy="17.5" r="2.5"/>
  </svg>,
]

export default function Team() {
  const t = useTranslations()

  return (
    <section id="team" className="section team-section" aria-label="Team">

      {/* ── Story ─────────────────────────────────────────── */}
      <section id="story">
        <div className="story-grid">
          <div className="story-left">
            <h2 className="anim-fade">
              {t('team.storyHeadingLine1')}<br />
              {t('team.storyHeadingConnector')} <em>{t('team.storyHeadingEm')}</em>
            </h2>
            <p className="anim-fade">{t('team.storyP1')}</p>
            <p className="anim-fade">{t('team.storyP2')}</p>
            <p className="anim-fade">{t('team.storyP3')}</p>
          </div>
          <div className="story-right anim-right">
            <div className="founders-photo-wrap">
              <div className="founders-photo-inner">
                <img
                  src="https://an7cx1vpwwkxwbzr.public.blob.vercel-storage.com/teampic.JPG"
                  alt="Los tres fundadores de KELU frente a Swiss Leaders, Zürich"
                  className="founders-photo"
                  loading="lazy"
                />
              </div>
              <div className="founders-caption">
                <span>Kevin · Andrés · Luis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission quote band ───────────────────────────── */}
      <section className="mission-band" aria-label="Mission">
        <div className="mission-band-inner scroll-animate">
          <span className="mission-band-mark" aria-hidden="true">“</span>
          <blockquote className="mission-band-quote">
            {t('team.missionQuote')}
          </blockquote>
          <p className="mission-band-attribution">— {t('team.missionAttribution')}</p>
        </div>
      </section>

      {/* ── Differentiator values ────────────────────────── */}
      <section className="about-values" aria-label="Our commitments">
        <div className="about-values-inner">
          <div className="section-header scroll-animate">
            <span className="section-tag">{t('team.valuesTag')}</span>
            <h2 className="section-title">{t('team.valuesTitle')}</h2>
            <p className="section-sub">{t('team.valuesSub')}</p>
          </div>
          <div className="about-values-grid">
            {[1, 2, 3, 4].map((n, i) => (
              <article key={n} className="about-value-card scroll-animate" style={{ '--card-delay': `${i * 90}ms` }}>
                <div className="about-value-icon">{VALUE_ICONS[i]}</div>
                <h3 className="about-value-title">{t(`team.val${n}title`)}</h3>
                <p className="about-value-text">{t(`team.val${n}text`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

    </section>
  )
}
