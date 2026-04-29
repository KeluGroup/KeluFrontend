import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'

export default defineConfig({
  plugins: [
    react(),
    vitePrerenderPlugin({
      prerenderScript: './src/main.jsx',   // ← add this
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