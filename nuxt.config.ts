// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', '@nuxt/test-utils'],
});
