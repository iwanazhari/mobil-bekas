import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Pisahkan vendor libraries ke chunk terpisah
          'react-vendor': ['react', 'react-dom'],
          'animation-vendor': ['gsap'],
          'lottie-vendor': ['lottie-web'],
          'icons-vendor': ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Tingkatkan limit warning untuk chunk besar
  },
})

