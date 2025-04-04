import { defineConfig } from 'vite'

export default defineConfig({
  base: '/project3/',  // Le chemin relatif de ton projet sur GitHub Pages
  build: {
    outDir: 'dist',  // Dossier de sortie pour ton build
  },
})
