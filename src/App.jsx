import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar    from './components/Navbar'
import SideDots  from './components/SideDots'
import Home      from './components/Home'
import Problem   from './components/Problem'
import Solution  from './components/Solution'
import Process   from './components/Process'
import Stats     from './components/Stats'
import CtaBanner from './components/CtaBanner'
import Contact   from './components/Contact'
import About       from './pages/About'
import Products    from './pages/Products'
import ContactPage from './pages/ContactPage'
import Footer    from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollProgress from './components/ScrollProgress'
import Privacy  from './pages/Privacy'
import Terms    from './pages/Terms'
import CookiePolicy from './pages/CookiePolicy'
import Admin    from './pages/Admin'
import ScrollToHash from './components/ScrollToHash'
import CursorTrail  from './components/CursorTrail'
import { SECTIONS } from './config'


function MainLayout({ theme, onToggleTheme, menuOpen, onToggleMenu, onCloseMenu, activeSection, scrolled }) {
  return (
    <>
      <ScrollProgress />
      <Navbar
        theme={theme}
        onToggleTheme={onToggleTheme}
        menuOpen={menuOpen}
        onToggleMenu={onToggleMenu}
        onCloseMenu={onCloseMenu}
        activeSection={activeSection}
        scrolled={scrolled}
      />
      <SideDots activeSection={activeSection} />
      <main id="main-content">
        <Home />

        <Solution />
        <Stats />
        <Process />
        <Contact />
      </main>
      <Footer />
      
    </>
  )
}


export default function App() {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('theme') ??
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  )
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled,      setScrolled]      = useState(false)

  const location = useLocation()

  // Disable browser scroll restoration so reloads always start at the top
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll to top on every route change (except hash-only navigation)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])

  // Re-attach scroll-animate observer whenever the route changes.
  // MainLayout re-mounts on navigation so all .scroll-animate elements lose
  // their 'visible' class and start at opacity:0.  We need to:
  //   1. Immediately mark any element already in the viewport as visible
  //      (IntersectionObserver only fires on *changes*, so elements that are
  //       fully in view the moment they are observed may not get a callback in
  //       all browsers — we handle those imperatively instead).
  //   2. Let the observer handle everything that scrolls into view later.
  // Using threshold:0 and rootMargin:'0px' (no clipping) ensures nothing is
  // missed at the top or bottom of the fold.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0, rootMargin: '0px' }
    )

    const timer = setTimeout(() => {
      document.querySelectorAll('.scroll-animate').forEach(el => {
        // If the element's top edge is already above the bottom of the
        // viewport, it is in view — make it visible right away instead of
        // waiting for an observer callback that might never come.
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('visible')
        } else {
          io.observe(el)
        }
      })
    }, 250)

    return () => { clearTimeout(timer); io.disconnect() }
  }, [location.pathname])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Re-runs every time the path changes so the IO re-attaches
  // to sections when navigating back to /
  useEffect(() => {
    if (location.pathname !== '/') return

    setActiveSection('home')

    const ids = SECTIONS
    const io  = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }),
      { threshold: 0.45 }
    )

    // Small delay so the DOM is ready after React re-renders MainLayout
    const timer = setTimeout(() => {
      ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el) })
    }, 50)

    return () => { clearTimeout(timer); io.disconnect() }
  }, [location.pathname])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  const toggleMenu  = () => setMenuOpen(o => !o)
  const closeMenu   = () => setMenuOpen(false)

  const sharedProps = { theme, onToggleTheme: toggleTheme, menuOpen, onToggleMenu: toggleMenu, onCloseMenu: closeMenu, activeSection, scrolled }

  return (
    <>
      <ScrollToHash />
      <CursorTrail />
      <Routes>
        <Route path="/"        element={<MainLayout    {...sharedProps} />} />
        <Route path="/about"   element={<About         {...sharedProps} />} />
        <Route path="/products" element={<Products     {...sharedProps} />} />
        <Route path="/contact"  element={<ContactPage  {...sharedProps} />} />
        <Route path="/privacy"  element={<Privacy      {...sharedProps} />} />
        <Route path="/terms"    element={<Terms        {...sharedProps} />} />
        <Route path="/cookies" element={<CookiePolicy {...sharedProps} />} />
        <Route path="/admin"    element={<Admin />} />
      </Routes>
    </>
  )
}