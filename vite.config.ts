import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import compress from 'vite-plugin-compress';

export default defineConfig({
  plugins: [compress({ brotli: false }), VitePWA()],
});
