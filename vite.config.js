import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    watch: {
      usePolling: true,
      interval: 300,
    },
    proxy: {
      '/api': {
        target: 'https://api.kelugroup.ch',
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
  define: {
    __BRAND_NAME__: JSON.stringify('Kelu'),
  },
})

