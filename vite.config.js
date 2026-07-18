import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/przedmioty': 'http://127.0.0.1:8000',
      '/sciezka': 'http://127.0.0.1:8000',
      '/test': 'http://127.0.0.1:8000',
      '/ai': 'http://127.0.0.1:8000',
    }
  }
})
