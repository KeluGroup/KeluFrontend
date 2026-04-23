import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

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

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={t(`solution.${product.key}`)}
      onClick={onClose}
    >
      <div className="modal-card" onClick={e => e.stopPropagation()}>

        {/* Blurred product background */}
        <div
          className="modal-bg-blur"
          style={{ backgroundImage: `url(${product.img})` }}
          aria-hidden="true"
        />

        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label={t('solution.modalClose')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <h2 className="modal-product-name">{t(`solution.${product.key}`)}</h2>

        <div className="modal-section">
          <div className="modal-section-header">
            <h3 className="modal-section-title">{t('solution.modalHistory')}</h3>
          </div>
          <p className="modal-body-text">{t(`solution.modal_${product.key}_history`)}</p>
        </div>

        <div className="modal-section">
          <div className="modal-section-header">
            <h3 className="modal-section-title">{t('solution.modalPairing')}</h3>
          </div>
          <p className="modal-body-text">{t(`solution.modal_${product.key}_pairing`)}</p>
        </div>

      </div>
    </div>
  )
}