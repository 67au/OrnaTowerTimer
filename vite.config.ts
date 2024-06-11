import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import components from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'
import { VarletImportResolver } from '@varlet/import-resolver'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
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
        description: 'Schedule for the Tower of Olympi',
        theme_color: '#ffffff',
        icons: [192, 256, 384, 512].map((x) => ({
            src: '/favicon.svg',
            sizes: `${x}x${x}`,
            type: 'image/svg+xml',
            purpose: 'any'
        }))
      }
    }),
    components({
      resolvers: [VarletImportResolver()]
    }),
    autoImport({
      imports: ['vue'],
      resolvers: [VarletImportResolver({ autoImport: true })]
    }),
    VueI18nPlugin({
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/i18n/locale.json')
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
