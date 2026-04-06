import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BRAND_PHONE, BRAND_EMAIL } from '../config'

const API_BASE = import.meta.env.VITE_API_BASE ?? ''
const API_KEY  = import.meta.env.VITE_API_KEY  ?? ''
const INITIAL  = { name: '', email: '', company: '', message: '' }

export default function Contact() {
  const { t } = useTranslation()
  const [fields, setFields] = useState(INITIAL)
  const [status, setStatus] = useState('idle')
  const [errMsg, setErrMsg] = useState('')

  function handleChange(e) {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setErrMsg('')
    try {
      const res = await fetch(`${API_BASE}/api/formsubmit`, {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key':    API_KEY,            // ← add this
        },
        body: JSON.stringify({ ...fields, company: fields.company || null }),
      })
      if (!res.ok) throw new Error(`Server error: ${res.status}`)
      setStatus('success')
      setFields(INITIAL)
    } catch (err) {
      setStatus('error')
      setErrMsg(err.message)
    }
  }

  return (
    <section id="contact" className="section" aria-label="Contact">
      <div className="section-inner">

        <div className="section-header">
          <span className="section-tag">{t('contact.tag')}</span>
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="section-sub">{t('contact.subtitle')}</p>
        </div>

        <div className="contact-layout">

          {/* ── Phone + Email above the form ── */}
          <div className="contact-info-row">
            <div className="contact-item">
              <div className="contact-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.4 2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
               <div>
                <p className="contact-item-label">{t('contact.phone')}</p>
                <a href={`tel:${BRAND_PHONE}`} className="contact-value">{BRAND_PHONE}</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <p className="contact-item-label">{t('contact.email')}</p>
                <a href={`mailto:${BRAND_EMAIL}`} className="contact-value">{BRAND_EMAIL}</a>
              </div>
            </div>
          </div>

          {/* ── Form below ── */}
          <form className="form-ph" onSubmit={handleSubmit} noValidate>

            <div className="form-row-2">
              <div className="form-field">
                <label className="form-label" htmlFor="name">{t('contact.form.name')}</label>
                <input
                  id="name" name="name" type="text"
                  className="form-input"
                  value={fields.name}
                  onChange={handleChange}
                  required
                  placeholder={t('contact.form.namePlaceholder')}
                />
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="email">{t('contact.form.email')}</label>
                <input
                  id="email" name="email" type="email"
                  className="form-input"
                  value={fields.email}
                  onChange={handleChange}
                  required
                  placeholder={t('contact.form.emailPlaceholder')}
                />
              </div>
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="company">{t('contact.form.company')}</label>
              <input
                id="company" name="company" type="text"
                className="form-input"
                value={fields.company}
                onChange={handleChange}
                placeholder={t('contact.form.companyPlaceholder')}
              />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="message">{t('contact.form.message')}</label>
              <textarea
                id="message" name="message"
                className="form-input form-textarea"
                value={fields.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder={t('contact.form.messagePlaceholder')}
              />
            </div>

            {status === 'success' && (
              <p className="form-feedback form-feedback--success">
                ✓ {t('contact.form.success')}
              </p>
            )}
            {status === 'error' && (
              <p className="form-feedback form-feedback--error">
                ✕ {t('contact.form.error')} {errMsg && `(${errMsg})`}
              </p>
            )}

            <button
              type="submit"
              className="form-submit-btn"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? t('contact.form.sending') : t('contact.form.send')}
            </button>

          </form>

        </div>
      </div>
    </section>
  )
}