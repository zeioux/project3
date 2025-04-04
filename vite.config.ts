import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '<script type="module" src="/project3/src/main.tsx"></script>',  // Remplace "project3" par le nom de ton repository
  plugins: [react()],
});
