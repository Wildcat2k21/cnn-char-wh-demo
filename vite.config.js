import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    resolve: {
    alias: {
        //eslint-disable-next-line
        '@': path.resolve(__dirname, 'src'),
        //eslint-disable-next-line
        '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
});
