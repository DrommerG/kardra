import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/kardra/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three'
            }
            if (id.includes('react-dom') || id.includes('react-router') || id.includes('scheduler') || /[\\/]react[\\/]/.test(id)) {
              return 'react'
            }
            if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) {
              return 'framer'
            }
            if (id.includes('i18next') || id.includes('react-i18next')) {
              return 'i18n'
            }
          }
        },
      },
    },
  },
})
