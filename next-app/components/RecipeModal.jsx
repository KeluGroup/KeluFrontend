import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

const COUNTRY_FLAG = { venezuela: '🇻🇪', colombia: '🇨🇴' }

export default function RecipeModal({ recipe, onClose }) {
  const t = useTranslations()
  const [closing, setClosing] = useState(false)

  const handleClose = () => {
    setClosing(true)
    setTimeout(onClose, 260)
  }

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [])

  if (!recipe) return null

  const name        = t(`recetas.${recipe.key}_title`)
  const ingredients = t.raw(`recetas.${recipe.key}_ingredients`) || []
  const steps       = t.raw(`recetas.${recipe.key}_steps`) || []

  const ox = recipe.originX ?? 0
  const oy = recipe.originY ?? 0

  return (
    <div
      className={`modal-overlay${closing ? ' modal-overlay--closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={name}
      onClick={handleClose}
    >
      <div
        className={`modal-card${closing ? ' modal-card--closing' : ''}`}
        style={{ '--origin-x': `${ox}px`, '--origin-y': `${oy}px` }}
        onClick={e => e.stopPropagation()}
      >

        <div className="modal-hero">
          <img src={recipe.img} alt={name} className="modal-hero-img" />
          <div className="modal-hero-gradient" />
          <span className="modal-recipe-country" aria-hidden="true">
            {COUNTRY_FLAG[recipe.country]} {t(`recetas.country${recipe.country === 'venezuela' ? 'Venezuela' : 'Colombia'}`)}
          </span>
          <h2 className="modal-product-name">{name}</h2>
        </div>

        <button
          className="modal-close-btn"
          onClick={handleClose}
          aria-label={t('recetas.modalClose')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="modal-content">
          <div className="modal-recipe-meta">
            <span><strong>{t('recetas.timeLabel')}:</strong> {recipe.time}</span>
            <span className="modal-recipe-meta-sep">·</span>
            <span><strong>{t('recetas.difficultyLabel')}:</strong> {t(`recetas.difficulty_${recipe.difficulty}`)}</span>
          </div>

          {ingredients.length > 0 && (
            <div className="modal-section">
              <h3 className="modal-section-title">{t('recetas.ingredientsTitle')}</h3>
              <ul className="modal-list">
                {ingredients.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}

          {steps.length > 0 && (
            <div className="modal-section">
              <h3 className="modal-section-title">{t('recetas.stepsTitle')}</h3>
              <ol className="modal-list modal-list--steps">
                {steps.map((item, i) => <li key={i}>{item}</li>)}
              </ol>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
