import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy /api requests to the local API server (run `npm run start:api`)
    proxy: {
      '/api': {
        target: 'http://localhost:5176',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
