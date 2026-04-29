import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'

export default defineConfig({
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

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-i18n':  ['i18next', 'react-i18next'],
        },
      },
    },
  },
})