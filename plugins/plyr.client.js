// eslint-disable-next-line import/no-unresolved,n/no-missing-import
import { defineNuxtPlugin } from '#app'

// eslint-disable-next-line import/no-unresolved,n/no-missing-import
import VuePlyr from '@skjnldsv/vue-plyr'
// eslint-disable-next-line import/no-unresolved,n/no-missing-import
import '@skjnldsv/vue-plyr/dist/vue-plyr.css'
import '~/assets/scss/plyr.scss'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(VuePlyr, { plyr: { controls: ['play', 'mute', 'volume'] } })	
})