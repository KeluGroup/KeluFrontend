import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './i18n/index.js'
import './styles/styles.css'
import App from './App'


// Normal client-side render (unchanged)
if (typeof window !== 'undefined') {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}

// Prerender export — used at build time only
export async function prerender(data) {
  const html = renderToString(
    <StrictMode>
      <App url={data.url} />
    </StrictMode>
  )
  return { html }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
