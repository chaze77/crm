import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias для папки src
      '@components': path.resolve(__dirname, './src/components'), // Alias для компонентов
      '@store': path.resolve(__dirname, './src/store'), // Alias для хранилищ
      '@utils': path.resolve(__dirname, './src/utils'),
      '@appwrite': path.resolve(__dirname, './src/appwrite'), // Alias для утилит
    },
  },
});
