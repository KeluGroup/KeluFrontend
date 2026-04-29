import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'

export default defineConfig({
  server: {
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
  plugins: [
    react(),
    vitePrerenderPlugin({
      prerenderScript: './src/main.jsx',
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