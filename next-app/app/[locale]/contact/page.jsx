'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
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

              <form onSubmit={handleSubmit} noValidate>

                <div className="form-row-2">
                  <div className="form-field">
                    <label className="form-label" htmlFor="cp-name">{t('contact.form.name')}</label>
                    <input
                      id="cp-name" name="name" type="text"
                      className={`form-input${errors.name && touched.name ? ' form-input--error' : ''}`}
                      value={fields.name} onChange={handleChange} onBlur={handleBlur}
                    />
                    {errors.name && touched.name && <span className="form-error">{errors.name}</span>}
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="cp-email">{t('contact.form.email')}</label>
                    <input
                      id="cp-email" name="email" type="email"
                      className={`form-input${errors.email && touched.email ? ' form-input--error' : ''}`}
                      value={fields.email} onChange={handleChange} onBlur={handleBlur}
                    />
                    {errors.email && touched.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="cp-company">{t('contact.form.company')}</label>
                  <input
                    id="cp-company" name="company" type="text"
                    className="form-input"
                    value={fields.company} onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="cp-service">{t('contact.form.service')}</label>
                  <select
                    id="cp-service" name="service"
                    className={`form-input form-select${errors.service && touched.service ? ' form-input--error' : ''}`}
                    value={fields.service} onChange={handleChange} onBlur={handleBlur}
                  >
                    <option value="">{t('contact.form.servicePlaceholder')}</option>
                    <option value="B2B">{t('contact.form.serviceOne')}</option>
                    <option value="Catering">{t('contact.form.serviceTwo')}</option>
                    <option value="Events">{t('contact.form.serviceThree')}</option>
                    <option value="Consulting">{t('contact.form.serviceFour')}</option>
                    <option value="Retail and Major Chains">{t('contact.form.serviceFive')}</option>
                  </select>
                  {errors.service && touched.service && <span className="form-error">{errors.service}</span>}
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="cp-message">{t('contact.form.message')}</label>
                  <textarea
                    id="cp-message" name="message"
                    className={`form-input form-textarea${errors.message && touched.message ? ' form-input--error' : ''}`}
                    value={fields.message} onChange={handleChange} onBlur={handleBlur}
                    rows={5}
                  />
                  {errors.message && touched.message && <span className="form-error">{errors.message}</span>}
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
        </div>
      </div>
    </main>
  )
}