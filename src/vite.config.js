// src/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [ tailwindcss(),react()],
  base: process.env.NODE_ENV === 'development' ? '/' : './', // Important for Electron production build
  build: {
    outDir: '../electron/dist', // Output build to a dist folder inside electron for easier packaging
  }
})
