import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import components from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'
import { VarletImportResolver } from '@varlet/import-resolver'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import UnoCSS from 'unocss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Tower of Olympia: OrnaRPG',
        short_name: 'Orna Tower',
        description: 'Schedule for the Tower of Olympia',
        theme_color: '#ffffff',
        icons: [192, 256, 384, 512].map((x) => ({
            src: '/favicon.svg',
            sizes: `${x}x${x}`,
            type: 'image/svg+xml',
            purpose: 'any'
        }))
      },
      workbox: {
        navigateFallbackDenylist: [
          // cloudflare cdn trace
          /^\/cdn-cgi\/trace/
        ],
        runtimeCaching: [
          {
            urlPattern: new RegExp(`^https://playorna.com/static/`),
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 120 // <== 120 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    }),
    components({
      resolvers: [VarletImportResolver()]
    }),
    autoImport({
      imports: ['vue', 'vue-router'],
      eslintrc: { enabled: true },
      resolvers: [VarletImportResolver({ autoImport: true })]
    }),
    VueI18nPlugin({
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/i18n/locale.json')
    }),
    UnoCSS()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
