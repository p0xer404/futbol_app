import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // exposa la IP de la Raspberry
    port: 5173,  // pots deixar el port per defecte
  },
});
