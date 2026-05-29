// GA4 Measurement ID — replace with your real ID from analytics.google.com
const GA_ID = 'G-XR2YDWHQWQ'

function gtag(...args) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args)
  }
}

// ── Page views ─────────────────────────────────────────────────────────────
export function trackPageView(path, title) {
  gtag('event', 'page_view', {
    page_path:  path,
    page_title: title,
    send_to:    GA_ID,
  })
}

// ── CTA clicks ─────────────────────────────────────────────────────────────
export function trackCTAClick(buttonId, location = '') {
  gtag('event', 'cta_click', {
    button_id: buttonId,
    location,
  })
}

// ── Product interactions ────────────────────────────────────────────────────
export function trackProductView(productKey, productName) {
  gtag('event', 'view_item', {
    item_id:   productKey,
    item_name: productName,
  })
}

// ── Contact form ────────────────────────────────────────────────────────────
export function trackFormSubmit(success = true) {
  gtag('event', success ? 'form_submit_success' : 'form_submit_error', {
    form_id: 'contact',
  })
}

// ── WhatsApp click ──────────────────────────────────────────────────────────
export function trackWhatsAppClick() {
  gtag('event', 'whatsapp_click', {
    category: 'engagement',
  })
}

// ── Catalogue request ───────────────────────────────────────────────────────
export function trackCatalogueRequest() {
  gtag('event', 'catalogue_request', {
    category: 'lead',
  })
}
