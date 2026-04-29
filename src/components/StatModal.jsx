import { useEffect } from 'react'
import { createPortal } from 'react-dom'

function ModalContent({ title, subtitle, ariaLabel, children, onClose, panelClass }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  return (
    <div
      className="smap-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      <div className={`smap-panel${panelClass ? ` ${panelClass}` : ''}`} onClick={e => e.stopPropagation()}>

        <div className="smap-header">
          <div style={{ flex: 1, textAlign: 'center' }}>
            <h2 className="smap-title">{title}</h2>
            {subtitle && <p className="smap-subtitle">{subtitle}</p>}
          </div>
          <button className="smap-close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="smap-map-wrap">
          {children}
        </div>

      </div>
    </div>
  )
}

export default function StatModal(props) {
  return createPortal(<ModalContent {...props} />, document.body)
}
