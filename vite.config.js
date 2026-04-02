import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    port: 3000,
    proxy: {
      '/vapr_agent':      { target: 'http://localhost:5000', changeOrigin: true },
      '/get_suggestions': { target: 'http://localhost:5000', changeOrigin: true },
      '/chat_history':    { target: 'http://localhost:5000', changeOrigin: true },
      '/get_titles':      { target: 'http://localhost:5000', changeOrigin: true },
    }
  }
})
