import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import './i18n/index.js'
import './styles/styles.css'
import App from './App'

// Normal client-side render
if (typeof window !== 'undefined') {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  )
}

// Prerender export — build time only
export async function prerender(data) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={data.url}>
        <App />
      </StaticRouter>
    </StrictMode>
  )
  return { html }
}