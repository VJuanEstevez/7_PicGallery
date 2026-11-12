import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  base: '/7_GalleryPic/',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  server: {
    port: 5173,
    strictPort: true
  }
})
