import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    __BRAND_NAME__: JSON.stringify('Kelu'),
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.alphacode.ch',
        changeOrigin: true,
      }
    }
  }
})
