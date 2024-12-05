import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    ssr: './server/server.jsx',  // Spécifie ton fichier d'entrée SSR
    outDir: 'dist',
  },
});
