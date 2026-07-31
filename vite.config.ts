import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    cssCodeSplit: true,
    modulePreload: {
      resolveDependencies: (_filename, deps) =>
        // Don't preload every lazy chunk on first paint
        deps.filter((dep) => !dep.includes('pages/') && !dep.includes('PlatformShowcase') && !dep.includes('MobileShowcase')),
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'motion'
            if (id.includes('@tanstack')) return 'query'
            if (id.includes('react-router')) return 'router'
            if (id.includes('react-dom') || id.includes('/react/')) return 'react'
            if (id.includes('lucide-react')) return 'icons'
            if (id.includes('zustand')) return 'state'
          }
        },
      },
    },
  },
})
