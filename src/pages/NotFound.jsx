import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function NotFound({ theme, onToggleTheme, menuOpen, onToggleMenu, onCloseMenu, scrolled }) {
  const { t } = useTranslation()

  return (
    <>
      <Navbar
        theme={theme}
        onToggleTheme={onToggleTheme}
        menuOpen={menuOpen}
        onToggleMenu={onToggleMenu}
        onCloseMenu={onCloseMenu}
        activeSection=""
        scrolled={scrolled}
        isAboutPage
      />
      <main className="not-found-main">
        <div className="not-found-inner">
          <span className="not-found-code">404</span>
          <h1 className="not-found-title">Page not found</h1>
          <p className="not-found-body">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="not-found-actions">
            <Link to="/" className="not-found-btn not-found-btn--primary">Back to Home</Link>
            <Link to="/products" className="not-found-btn not-found-btn--ghost">Our Products</Link>
            <Link to="/contact" className="not-found-btn not-found-btn--ghost">Contact Us</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
