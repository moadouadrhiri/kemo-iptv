import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://kemo-iptv.pages.dev',
  output: 'static',
  build: {
    assets: 'assets',
    format: 'file'
  },
  compressHTML: true,
  i18n: {
    defaultLocale: 'en',
    locales: ["en"],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
