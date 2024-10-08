// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url';

// @ts-ignore
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    apiSecret: process.env.NUXT_API_SECRET || '', // can be overridden by NUXT_API_SECRET environment variable
    public: {
      // 也可在执行命令的时候使用 --dotenv 指定.env文件
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://api.example.prod.com', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    },
  },
  alias: {
    '@/': fileURLToPath(new URL('./', import.meta.url)),
  },
  modules: ['@pinia/nuxt', '@nuxt/ui'],

  components: [
    {
      // components中的vue文件自动注册为全局组件，以文件名为组件名称
      path: '~/components',
      extensions: ['.vue'],
      pathPrefix: false,
    },
  ],

  ui: {
    icons: ['heroicons'],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          //  Nuxt 组件/页面样式中全局插入语句
          additionalData: '@use "@/assets/styles/index.scss" as *;',
        },
      },
    },
  },
  nitro: {
    devProxy: {
      '/proxyApi': {
        target: process.env.NUXT_PUBLIC_API_BASE,
        changeOrigin: true,
      },
    },
  },
  devServer: {
    port: 3001,
    host: 'localhost',
  },
});
