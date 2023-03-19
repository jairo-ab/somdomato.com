// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  plugins: [
    '~/plugins/configs.client.ts',
    '~/plugins/bootstrap.client.ts',
    '~/plugins/websockets.client.ts'
  ],
  typescript: { shim: false },
  css: ['~/assets/scss/main.scss'],
  runtimeConfig: {
    public: {
      appName: 'Rádio Som do Mato',
      appBase: 'http://localhost:3000',
      apiBase: 'http://localhost:4000',
      streamBase: 'https://radio.somdomato.com'
    }
  }
})
