import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BRAND_PHONE, BRAND_EMAIL } from '../config'

const API_BASE = import.meta.env.VITE_API_BASE ?? ''
const API_KEY  = import.meta.env.VITE_API_KEY  ?? ''
const INITIAL  = { name: '', email: '', company: '', message: '' }
const INITIAL_ERRORS = { name: '', email: '' }

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
  </svg>
)

function validateName(v)  {
  if (!v.trim()) return 'Name is required'
  if (v.trim().length < 3) return 'Name must be at least 3 characters'
  if (!/^[\p{L}\s'\-\.]+$/u.test(v.trim())) return 'Name contains invalid characters'
  return ''
}
function validateEmail(v) {
  if (!v.trim()) return 'Email is required'
  if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,10}$/.test(v.trim())) return 'Enter a valid email address'
  return ''
}

export default function Contact() {
  const { t } = useTranslation()
  const [fields, setFields]   = useState(INITIAL)
  const [errors, setErrors]   = useState(INITIAL_ERRORS)
  const [touched, setTouched] = useState({ name: false, email: false })
  const [status, setStatus]   = useState('idle')
  const [errMsg, setErrMsg]   = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setFields(p => ({ ...p, [name]: value }))
    if (name === 'name'  && touched.name)  setErrors(p => ({ ...p, name:  validateName(value) }))
    if (name === 'email' && touched.email) setErrors(p => ({ ...p, email: validateEmail(value) }))
  }
  function handleBlur(e) {
    const { name, value } = e.target
    setTouched(p => ({ ...p, [name]: true }))
    if (name === 'name')  setErrors(p => ({ ...p, name:  validateName(value) }))
    if (name === 'email') setErrors(p => ({ ...p, email: validateEmail(value) }))
  }
  function validate() {
    const ne = validateName(fields.name)
    const ee = validateEmail(fields.email)
    setErrors({ name: ne, email: ee })
    setTouched({ name: true, email: true })
    return !ne && !ee
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading'); setErrMsg('')
    try {
      const res = await fetch(`${API_BASE}/api/formsubmit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
        body: JSON.stringify({ ...fields, company: fields.company || null }),
      })
      if (!res.ok) throw new Error(`Server error: ${res.status}`)
      setStatus('success')
      setFields(INITIAL)
      setTouched({ name: false, email: false })
      setErrors(INITIAL_ERRORS)
    } catch (err) {
      setStatus('error'); setErrMsg(err.message)
    }
  }

  return (
    <section id="contact" className="section contact-section" aria-label="Contact">
      <div className="section-inner">

        <div className="section-header">
          <span className="section-tag">{t('contact.tag')}</span>
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="section-sub">{t('contact.subtitle')}</p>
        </div>

        {/* ── Contact info chips ── */}
        <div className="contact-chips-row">
          <a href={`tel:${BRAND_PHONE}`} className="contact-chip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.4 2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>{BRAND_PHONE}</span>
          </a>
          <a href={`mailto:${BRAND_EMAIL}`} className="contact-chip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span>{BRAND_EMAIL}</span>
          </a>
          <div className="contact-chip contact-chip--plain">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>Zürich, Switzerland</span>
          </div>
        </div>

        {/* ── Social buttons ── */}
        <div className="contact-socials-center">
          <p className="contact-socials-label">{t('contact.followUs')}</p>
          <div className="contact-socials-row contact-socials-row--center">
            <a href="https://www.instagram.com/kelugroup" target="_blank" rel="noopener noreferrer"
               className="social-btn social-btn--ig" aria-label="Instagram @kelugroup">
              <InstagramIcon /><span>@kelugroup</span>
            </a>
            <a href="https://www.tiktok.com/@kelugmbh" target="_blank" rel="noopener noreferrer"
               className="social-btn social-btn--tt" aria-label="TikTok @kelugmbh">
              <TikTokIcon /><span>@kelugmbh</span>
            </a>
          </div>
        </div>

        {/* ── Form ── */}
        <div className="contact-form-card scroll-animate">
          <h3 className="contact-form-title">{t('contact.formTitle')}</h3>

          <form onSubmit={handleSubmit} noValidate>

            <div className="form-row-2">
              <div className="form-field">
                <label className="form-label" htmlFor="name">{t('contact.form.name')}</label>
                <input
                  id="name" name="name" type="text"
                  className={`form-input${errors.name && touched.name ? ' form-input--error' : ''}`}
                  value={fields.name} onChange={handleChange} onBlur={handleBlur}
                  placeholder={t('contact.form.namePlaceholder')}
                />
                {errors.name && touched.name && <span className="form-error">{errors.name}</span>}
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="email">{t('contact.form.email')}</label>
                <input
                  id="email" name="email" type="email"
                  className={`form-input${errors.email && touched.email ? ' form-input--error' : ''}`}
                  value={fields.email} onChange={handleChange} onBlur={handleBlur}
                  placeholder={t('contact.form.emailPlaceholder')}
                />
                {errors.email && touched.email && <span className="form-error">{errors.email}</span>}
              </div>
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="company">{t('contact.form.company')}</label>
              <input
                id="company" name="company" type="text"
                className="form-input"
                value={fields.company} onChange={handleChange}
                placeholder={t('contact.form.companyPlaceholder')}
              />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="message">{t('contact.form.message')}</label>
              <textarea
                id="message" name="message"
                className="form-input form-textarea"
                value={fields.message} onChange={handleChange}
                rows={4}
                placeholder={t('contact.form.messagePlaceholder')}
              />
            </div>

            {status === 'success' && (
              <p className="form-feedback form-feedback--success">✓ {t('contact.form.success')}</p>
            )}
            {status === 'error' && (
              <p className="form-feedback form-feedback--error">✕ {t('contact.form.error')} {errMsg && `(${errMsg})`}</p>
            )}

            <button type="submit" className="form-submit-btn" disabled={status === 'loading'}>
              {status === 'loading' ? t('contact.form.sending') : t('contact.form.send')}
            </button>

          </form>
        </div>

      </div>
    </section>
  )
}
