import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      '@shared': `${process.cwd()}/src/shared`,
      '@/features': `${process.cwd()}/src/features`,
      '@/pages': `${process.cwd()}/src/pages`,
      '@/hooks': `${process.cwd()}/src/hooks`,
      '@/utils': `${process.cwd()}/src/utils`,
      '@/types': `${process.cwd()}/src/types`,
      '@/api': `${process.cwd()}/src/api`
    }
  },
  server: {
    port: 3000,
    open: true
  }
})