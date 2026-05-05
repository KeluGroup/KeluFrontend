const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

export const UNSPLASH_QUERIES = {
  p1: 'arepa venezuelan colombian stuffed corn flatbread',
  p2: 'tequeños cheese fingers fried dough snack',
  p3: 'empanada latin fried pastry golden crispy',
  p4: 'cassava yuca fries golden fried sticks',
  p5: 'pan de bono cheese bread colombia baked rolls',
  p6: 'chocolate tequeños churros dark cocoa dessert',
  p7: 'tropical passion fruit mango pulp colorful smoothie',
  p8: 'guacamole chimichurri salsa verde bowl fresh',
}

export const SERVICE_QUERIES = {
  one:   'food wholesale distribution warehouse fresh produce restaurant supply',
  two:   'elegant catering buffet professional event food service plated',
  three: 'street food festival outdoor market gastronomy crowd pop-up',
  four:  'chef restaurant consulting kitchen menu culinary professional',
}

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

export async function fetchAllServiceImages() {
  if (!ACCESS_KEY) return {}
  const entries = await Promise.all(
    Object.entries(SERVICE_QUERIES).map(async ([key, query]) => {
      const url = await fetchUnsplashPhoto(query)
      return [key, url]
    })
  )
  return Object.fromEntries(entries.filter(([, url]) => url))
}
