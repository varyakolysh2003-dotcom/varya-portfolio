import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/varya-portfolio/',
  plugins: [react(), tailwindcss()],
  define: {
    'import.meta.env.VITE_BUILD_TIME': JSON.stringify(Date.now().toString()),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
