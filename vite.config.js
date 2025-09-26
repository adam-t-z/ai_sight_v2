import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,               // Allows external access to dev server
    port: 5173,               // Runs frontend at http://localhost:5173
    proxy: {
      '/api': 'http://localhost:5001', // Proxies API requests to Express backend
    },
    allowedHosts: [
      'f968a45ngrok-free.app', // Allows requests from this external URL (ngrok etc.)
      '592e1e5e5889.ngrok-free.app',
      '3bd9f6a4d2a6.ngrok-free.app',
    ],
  },
})


