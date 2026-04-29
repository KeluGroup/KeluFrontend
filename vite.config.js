import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'  // ← new

export default defineConfig({
  plugins: [
    react(),
    vitePrerenderPlugin({
      additionalPrerenderRoutes: [
        '/',
        '/products',
        '/about',
        '/contact',
        '/faq',
      ],
    }),
  ],
})