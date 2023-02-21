// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: { shim: false },
  css: ['~/assets/scss/main.scss'],
  plugins: [{ src: '~/plugins/plyr.client.js', mode: 'client' }],
  runtimeConfig: {
    public: {
      appName: process.env.NUXT_APP_NAME
    }
  }
})
