'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
const Navbar = dynamic(() => import('../components/Navbar'), { ssr: false })
import Footer from '../components/Footer'
import CookieBanner from '../components/CookieBanner'
import CursorTrail from '../components/CursorTrail'
import ScrollToHash from '../components/ScrollToHash'
import { SECTIONS } from '../config'
import { trackPageView } from '../utils/analytics'
import { usePathname } from 'next/navigation'
import './globals.css'
import './modal.css'

const VALID_LOCALES = ['de', 'en', 'es', 'fr', 'it']

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const [theme, setTheme] = useState('light')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  const urlLocale = pathname?.split('/')[1]
  const lang = VALID_LOCALES.includes(urlLocale) ? urlLocale : 'de'
  const isAdmin = pathname === '/admin'

  // Theme init
  useEffect(() => {
    const saved = localStorage.getItem('theme') ?? 'light'
    setTheme(saved)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Scroll to top + track page view on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    trackPageView(pathname, document.title)
  }, [pathname])

  // Scroll progress listener
  useEffect(() => {
    if (isAdmin) return
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname, isAdmin])

  // Scroll animations
  useEffect(() => {
    if (isAdmin) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0, rootMargin: '0px' }
    )
    const timer = setTimeout(() => {
      document.querySelectorAll('.scroll-animate').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('visible')
        } else {
          io.observe(el)
        }
      })
    }, 250)
    return () => { clearTimeout(timer); io.disconnect() }
  }, [pathname, isAdmin])

  // Active section tracking (home only)
  useEffect(() => {
    if (isAdmin || !pathname.endsWith('/')) return
    setActiveSection('home')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }),
      { threshold: 0.45 }
    )
    const timer = setTimeout(() => {
      SECTIONS.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el) })
    }, 50)
    return () => { clearTimeout(timer); io.disconnect() }
  }, [pathname, isAdmin])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  const toggleMenu  = () => setMenuOpen(o => !o)
  const closeMenu   = () => setMenuOpen(false)

  const sharedProps = { theme, onToggleTheme: toggleTheme, menuOpen, onToggleMenu: toggleMenu, onCloseMenu: closeMenu, activeSection, scrolled }

  return (
    <html lang={lang} suppressHydrationWarning>
      <body>
        {!isAdmin && <ScrollToHash />}
        {!isAdmin && <CursorTrail />}
        {!isAdmin && <CookieBanner />}
        {!isAdmin && <Navbar {...sharedProps} />}
        <main id="main-content">
          {children}
        </main>
        {!isAdmin && <Footer />}
      </body>
    </html>
  )
}