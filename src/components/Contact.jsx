import { useTranslation } from 'react-i18next'

export default function Contact() {
  const { t } = useTranslation()

  const CONTACT_ITEMS = [
    {
      label: t('contact.address'),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      widths: [130, 100],
    },
    {
      label: t('contact.phone'),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.4 2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      widths: [110],
    },
    {
      label: t('contact.email'),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      widths: [150],
    },
  ]

  return (
    <section id="contact" className="section" aria-label="Contact">
      <div className="section-inner">

        <div className="section-header">
          <span className="section-tag">{t('contact.tag')}</span>
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="section-sub">{t('contact.subtitle')}</p>
        </div>

        <div className="contact-layout">
          <div className="contact-aside">
            {CONTACT_ITEMS.map(({ label, icon, widths }) => (
              <div key={label} className="contact-item">
                <div className="contact-icon" aria-hidden="true">{icon}</div>
                <div>
                  <p className="contact-item-label">{label}</p>
                  <div className="ph-contact-val">
                    {widths.map((w, i) => <div key={i} className="ph-cv" style={{ width: w }} />)}
                  </div>
                </div>
              </div>
            ))}
            <div className="ph-map" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
                <line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
              </svg>
              <span>{t('contact.map')}</span>
            </div>
          </div>

          <div className="form-ph" role="form" aria-label="Contact form (placeholder)">
            <div className="form-row-2">
              <div className="form-field"><div className="form-lbl" /><div className="form-inp" /></div>
              <div className="form-field"><div className="form-lbl" /><div className="form-inp" /></div>
            </div>
            <div className="form-field"><div className="form-lbl" /><div className="form-inp" /></div>
            <div className="form-field"><div className="form-lbl" /><div className="form-inp" /></div>
            <div className="form-field">
              <div className="form-lbl" style={{ width: 80 }} />
              <div className="form-inp tall" />
            </div>
            <div className="form-submit" aria-hidden="true" />
          </div>
        </div>

      </div>
    </section>
  )
}
