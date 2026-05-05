const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

// Specific search query per product key for best results
export const UNSPLASH_QUERIES = {
  p1: 'arepas venezolanas colombianas corn cake filled',
  p2: 'tequenos cheese sticks fried bread venezuelan',
  p3: 'empanadas colombianas latin fried pastry',
  p4: 'yuca frita cassava fries fried sticks',
  p5: 'pan de bono colombian cheese bread rolls',
  p6: 'chocolate churros dessert pastry dark chocolate',
  p7: 'tropical fruit pulp passion fruit mango colorful',
  p8: 'salsa guacamole chimichurri latin sauce bowls',
}

// Returns the Unsplash regular image URL for a given query, or null if unavailable
export async function fetchUnsplashPhoto(query) {
  if (!ACCESS_KEY) return null
  try {
    const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=squarish&content_filter=high&client_id=${ACCESS_KEY}`
    const res = await fetch(url)
    if (!res.ok) return null
    const data = await res.json()
    return data.urls?.regular ?? null
  } catch {
    return null
  }
}

// Fetches all product images in parallel — returns a map of { key: url }
export async function fetchAllProductImages() {
  if (!ACCESS_KEY) return {}
  const entries = await Promise.all(
    Object.entries(UNSPLASH_QUERIES).map(async ([key, query]) => {
      const url = await fetchUnsplashPhoto(query)
      return [key, url]
    })
  )
  return Object.fromEntries(entries.filter(([, url]) => url))
}
