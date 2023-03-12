export default defineNuxtPlugin(_ => {
  const configs = useRuntimeConfig()
  return { provide: { configs } }
})