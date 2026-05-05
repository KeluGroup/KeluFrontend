import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import '../styles/modal.css'

export default function ProductModal({ product, onClose }) {
  const { t } = useTranslation()

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!product) return null

  // Translation key helpers
  const name    = t(`solution.${product.key}`, { defaultValue: product.label })
  const history = t(`solution.modal_${product.key}_history`, { defaultValue: '' })
  const pairing = t(`solution.modal_${product.key}_pairing`, { defaultValue: '' })

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={name}
      onClick={onClose}
    >
      <div className="modal-card" onClick={e => e.stopPropagation()}>

        {/* Hero: full-width image + gradient + title */}
        <div className="modal-hero">
          <img
            src={product.img}
            alt={name}
            className="modal-hero-img"
          />
          <div className="modal-hero-gradient" />
          <h2 className="modal-product-name">{name}</h2>
        </div>

        {/* Close button */}
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label={t('solution.modalClose', { defaultValue: 'Close' })}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Scrollable content */}
        <div className="modal-content">
          {history && (
            <div className="modal-section">
              <h3 className="modal-section-title">{t('solution.modalHistory')}</h3>
              <p className="modal-body-text">{history}</p>
            </div>
          )}
          {pairing && (
            <div className="modal-section">
              <h3 className="modal-section-title">{t('solution.modalPairing')}</h3>
              <p className="modal-body-text">{pairing}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}