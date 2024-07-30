import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from the .env file in the parent directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log('VITE_API_BASE_URL:', process.env.VITE_API_BASE_URL);

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
