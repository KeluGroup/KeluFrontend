'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { trackFormSubmit } from '../../../utils/analytics'

/* ── Form config ── */
const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? ''
const API_KEY  = process.env.NEXT_PUBLIC_API_KEY  ?? ''
const INITIAL  = { name: '', email: '', company: '', service: '', message: '' }
const INITIAL_ERRORS = { name: '', email: '', service: '', message: '' }
const VALID_SERVICES = ['B2B', 'Catering', 'Events', 'Consulting', 'Retail and Major Chains']

function validateName(v) {
  if (!v.trim()) return 'Name is required'
  if (v.trim().length < 3) return 'At least 3 characters'
  if (!/^[\p{L}\s'\-\.]+$/u.test(v.trim())) return 'Invalid characters'
  return ''
}
function validateEmail(v) {
  if (!v.trim()) return 'Email is required'
  if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,10}$/.test(v.trim())) return 'Enter a valid email'
  return ''
}
function validateService(v) {
  if (!v || !VALID_SERVICES.includes(v)) return 'Please select a service'
  return ''
}
function validateMessage(v) {
  if (!v.trim()) return 'Message is required'
  if (v.trim().length < 10) return 'At least 10 characters'
  return ''
}

export default function ContactPage() {
  const t = useTranslations()
  const [fields, setFields]   = useState(INITIAL)
  const [errors, setErrors]   = useState(INITIAL_ERRORS)
  const [touched, setTouched] = useState({ name: false, email: false, service: false, message: false })
  const [status, setStatus]   = useState('idle')
  const [errMsg, setErrMsg]   = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    const timer = setTimeout(() => {
      document.querySelectorAll('.scroll-animate').forEach(el => io.observe(el))
    }, 100)
    return () => { clearTimeout(timer); io.disconnect() }
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setFields(p => ({ ...p, [name]: value }))
    if (name === 'name'    && touched.name)    setErrors(p => ({ ...p, name:    validateName(value) }))
    if (name === 'email'   && touched.email)   setErrors(p => ({ ...p, email:   validateEmail(value) }))
    if (name === 'service')                    setErrors(p => ({ ...p, service: validateService(value) }))
    if (name === 'message' && touched.message) setErrors(p => ({ ...p, message: validateMessage(value) }))
  }

  function handleBlur(e) {
    const { name, value } = e.target
    setTouched(p => ({ ...p, [name]: true }))
    if (name === 'name')    setErrors(p => ({ ...p, name:    validateName(value) }))
    if (name === 'email')   setErrors(p => ({ ...p, email:   validateEmail(value) }))
    if (name === 'service') setErrors(p => ({ ...p, service: validateService(value) }))
    if (name === 'message') setErrors(p => ({ ...p, message: validateMessage(value) }))
  }

  function validate() {
    const ne = validateName(fields.name)
    const ee = validateEmail(fields.email)
    const se = validateService(fields.service)
    const me = validateMessage(fields.message)
    setErrors({ name: ne, email: ee, service: se, message: me })
    setTouched({ name: true, email: true, service: true, message: true })
    return !ne && !ee && !se && !me
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    setErrMsg('')
    try {
      const res = await fetch(`/api/formsubmit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
        body: JSON.stringify({
          ...fields,
          company: fields.company || null,
          service: fields.service || null,
        }),
      })
      if (!res.ok) throw new Error(`Server error: ${res.status}`)
      trackFormSubmit(true)
      setStatus('success')
      setFields(INITIAL)
      setTouched({ name: false, email: false, service: false, message: false })
      setErrors(INITIAL_ERRORS)
    } catch (err) {
      trackFormSubmit(false)
      setStatus('error')
      setErrMsg(err.message)
    }
  }

  return (
    <main className="contact-page-main">
      <div className="contact-page-bg" aria-hidden="true" />

      <div className="contact-page-inner">

        <div className="contact-page-header scroll-animate">
          <h1 className="section-title">{t('contact.title')}</h1>
          <p className="section-sub">{t('contact.subtitle')}</p>
        </div>

        <div className="contact-page-layout">
          <div className="contact-page-form scroll-animate">
            <div className="contact-form-card">
              <h2 className="contact-form-heading">{t('contact.formTitle')}</h2>

              <form onSubmit={handleSubmit} noValidate className="cp-form">

                <div className="form-row-2">
                  <div className="form-field">
                    <label className="form-label" htmlFor="cp-name">{t('contact.form.name')}</label>
                    <div className="form-input-wrap">
                      <svg className="form-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                      <input
                        id="cp-name" name="name" type="text"
                        className={`form-input form-input--icon${errors.name && touched.name ? ' form-input--error' : ''}`}
                        value={fields.name} onChange={handleChange} onBlur={handleBlur}
                        placeholder="Jane Doe"
                      />
                    </div>
                    {errors.name && touched.name && <span className="form-error">{errors.name}</span>}
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="cp-email">{t('contact.form.email')}</label>
                    <div className="form-input-wrap">
                      <svg className="form-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                      </svg>
                      <input
                        id="cp-email" name="email" type="email"
                        className={`form-input form-input--icon${errors.email && touched.email ? ' form-input--error' : ''}`}
                        value={fields.email} onChange={handleChange} onBlur={handleBlur}
                        placeholder="jane@company.com"
                      />
                    </div>
                    {errors.email && touched.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="cp-company">{t('contact.form.company')}</label>
                  <div className="form-input-wrap">
                    <svg className="form-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                    <input
                      id="cp-company" name="company" type="text"
                      className="form-input form-input--icon"
                      value={fields.company} onChange={handleChange}
                      placeholder={t('contact.form.companyPlaceholder') ?? 'Optional'}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="cp-service">{t('contact.form.service')}</label>
                  <div className="form-input-wrap">
                    <svg className="form-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    </svg>
                    <select
                      id="cp-service" name="service"
                      className={`form-input form-select form-input--icon${errors.service && touched.service ? ' form-input--error' : ''}`}
                      value={fields.service} onChange={handleChange} onBlur={handleBlur}
                    >
                      <option value="">{t('contact.form.servicePlaceholder')}</option>
                      <option value="B2B">{t('contact.form.serviceOne')}</option>
                      <option value="Catering">{t('contact.form.serviceTwo')}</option>
                      <option value="Events">{t('contact.form.serviceThree')}</option>
                      <option value="Consulting">{t('contact.form.serviceFour')}</option>
                      <option value="Retail and Major Chains">{t('contact.form.serviceFive')}</option>
                    </select>
                  </div>
                  {errors.service && touched.service && <span className="form-error">{errors.service}</span>}
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="cp-message">{t('contact.form.message')}</label>
                  <div className="form-input-wrap form-input-wrap--textarea">
                    <svg className="form-input-icon form-input-icon--top" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    <textarea
                      id="cp-message" name="message"
                      className={`form-input form-textarea form-input--icon${errors.message && touched.message ? ' form-input--error' : ''}`}
                      value={fields.message} onChange={handleChange} onBlur={handleBlur}
                      rows={5}
                      placeholder={t('contact.form.messagePlaceholder') ?? 'Tell us how we can help…'}
                    />
                  </div>
                  {errors.message && touched.message && <span className="form-error">{errors.message}</span>}
                </div>

                {status === 'success' && (
                  <p className="form-feedback form-feedback--success">✓ {t('contact.form.success')}</p>
                )}
                {status === 'error' && (
                  <p className="form-feedback form-feedback--error">✕ {t('contact.form.error')}{errMsg && ` (${errMsg})`}</p>
                )}

                <button type="submit" className="form-submit-btn" disabled={status === 'loading'}>
                  <span>{status === 'loading' ? t('contact.form.sending') : t('contact.form.send')}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}