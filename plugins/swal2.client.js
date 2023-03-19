import Swal from 'sweetalert2'
import '@sweetalert2/theme-dark'

const options = {
  reverseButtons: true,
  confirmButtonText: 'OK',
  cancelButtonText: 'Cancelar'
}

const $swal = {
  install: (Vue, options) => {
    Vue.provide("$swal", Swal.mixin(options))
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use($swal, options)
})