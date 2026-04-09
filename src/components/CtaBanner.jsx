import { useTranslation } from 'react-i18next'

export default function CtaBanner() {
  const { t } = useTranslation()

  return (
    <section className="cta-final" aria-label="Call to action">
      <div className="cta-final-inner">
        <h2 className="cta-final-title">{t('ctabanner.title')}</h2>
        <p className="cta-final-desc">{t('ctabanner.description')}</p>
        <a href="#contact" className="cta-final-btn">
          {t('ctabanner.button')}
        </a>
      </div>
    </section>
  )
}
