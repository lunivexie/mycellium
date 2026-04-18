import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/mycelium/', // Cambiado de '/' a '/mycelium/' para que funcione en la URL de GitHub por defecto
})
