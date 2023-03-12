// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: { shim: false },
  css: ['~/assets/scss/main.scss'],
  runtimeConfig: {
    public: {
      appName: process.env.NUXT_APP_NAME,
      apiUrl: process.env.NUXT_API_URL,
      streamUrl: process.env.NUXT_STREAM_URL
    }
  }
})
