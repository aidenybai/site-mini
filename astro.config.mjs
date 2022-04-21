import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';

export default defineConfig({
  site: 'https://aidenybai.com',
  sitemap: true,
  integrations: [solid()],
  markdown: {
    remarkPlugins: [],
    shikiConfig: {
      theme: 'dracula',
      wrap: true,
    },
  },
});
