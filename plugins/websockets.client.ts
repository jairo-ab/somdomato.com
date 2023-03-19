import WebSocket from 'ws'
const ws = new WebSocket('ws://localhost:4000')

export default defineNuxtPlugin(nuxtApp => {
  ws.addEventListener('message', (event: { data: any }) => {
    console.log('Message from server ', event.data)
  })
  // nuxtApp.provide('bootstrap', bootstrap)
})
