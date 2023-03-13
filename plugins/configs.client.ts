export default defineNuxtPlugin((NuxtApp) => {
  const configs = useRuntimeConfig()

  return { 
    provide: { 
      configs,
      injectionTest: 'test'
    } 
  }
})