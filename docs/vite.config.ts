import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  root: decodeURIComponent(new URL('.', import.meta.url).pathname).replace(/^\/(?=[A-Za-z]:\/)/, ''),
  plugins: [tailwindcss(), react()],
  build: {
    outDir: 'dist',
  },
});
