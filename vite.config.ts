import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',  // Remplace "project3" par le nom de ton repository
  plugins: [react()],
});
