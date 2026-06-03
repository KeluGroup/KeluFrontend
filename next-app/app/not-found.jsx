'use client'

import Link from 'next/link'
import './styles/globals.css'
import './styles/index.css'


export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <main className="not-found-main">
          <div className="not-found-inner">
            <span className="not-found-code">404</span>
            <h1 className="not-found-title">Page not found</h1>
            <p className="not-found-body">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="not-found-actions">
              <Link href="/de" className="not-found-btn not-found-btn--primary">
                Back to Home
              </Link>
              <Link href="/de/products" className="not-found-btn not-found-btn--ghost">
                Our Products
              </Link>
              <Link href="/de/contact" className="not-found-btn not-found-btn--ghost">
                Contact Us
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}