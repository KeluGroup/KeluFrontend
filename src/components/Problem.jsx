import { useTranslation } from 'react-i18next'

const FOOD_STICKERS = [
  { emoji: '🫓', label: 'Arepa' },
  { emoji: '🧀', label: 'Tequeño' },
  { emoji: '🥟', label: 'Empanada' },
  { emoji: '🌶️', label: 'Ají' },
  { emoji: '🍌', label: 'Plátano' },
  { emoji: '🥑', label: 'Aguacate' },
  { emoji: '🫔', label: 'Yuca' },
  { emoji: '🥭', label: 'Mango' },
  { emoji: '🍹', label: 'Pulpa' },
  { emoji: '🌮', label: 'Latino' },
]

const CARDS = [
  {
    key: 'card1',
    color: 'var(--color-primary)',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <line x1="8" y1="11" x2="14" y2="11"/>
      </svg>
    ),
  },
  {
    key: 'card2',
    color: '#FFD23F',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <line x1="18" y1="8" x2="23" y2="13"/>
        <line x1="23" y1="8" x2="18" y2="13"/>
      </svg>
    ),
  },
  {
    key: 'card3',
    color: 'var(--color-accent-light)',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    key: 'card4',
    color: '#06D6A0',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2"/>
        <path d="M16 8h4l3 3v5h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
]

export default function Problem() {
  const { t } = useTranslation()

  return (
    <section id="problem" className="section problem-section" aria-label="Problem">

      {/* Scrolling food marquee */}
      <div className="problem-marquee" aria-hidden="true">
        <div className="problem-marquee-track">
          {[...FOOD_STICKERS, ...FOOD_STICKERS, ...FOOD_STICKERS].map((s, i) => (
            <div key={i} className="food-chip">
              <span className="food-chip-emoji">{s.emoji}</span>
              <span className="food-chip-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section-inner">

        <div className="section-header">
          <span className="section-tag">{t('problem.tag')}</span>
          <h2 className="section-title">{t('problem.title')}</h2>
          <p className="section-sub">{t('problem.subtitle')}</p>
        </div>

        <div className="problem-grid">
          {CARDS.map(({ key, icon, color }) => (
            <div key={key} className="problem-card scroll-animate" style={{ '--card-accent': color }}>
              <div className="problem-card-icon" aria-hidden="true">{icon}</div>
              <h3 className="problem-card-title">{t(`problem.${key}title`)}</h3>
              <p className="problem-card-text">{t(`problem.${key}text`)}</p>
            </div>
          ))}
        </div>

      </div>

      {/* Decorative background food emojis */}
      <div className="problem-bg-deco" aria-hidden="true">
        {['🫓','🧀','🌶️','🥑','🍌','🥟','🥭','🍹'].map((e, i) => (
          <span key={i} className={`problem-bg-emoji problem-bg-emoji--${i + 1}`}>{e}</span>
        ))}
      </div>

    </section>
  )
}
