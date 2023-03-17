<script setup>
const configs = useRuntimeConfig()
</script>
<template>
  <header>
    <div class="fixed-top">
      <div class="container d-flex flex-column flex-md-row align-items-center my-1">
        <NuxtLink class="py-0 d-flex align-items-center fs-3 text-white text-decoration-none text-nowrap" to="/">
          <img src="/img/logotipo.svg" :alt="configs.public.appName" height="32" class="d-inline-block align-middle me-1" />
          Som do Mato
        </NuxtLink>

        <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
          <div class="d-flex flex-column flex-md-row align-items-center">
            <ClientOnly>
              <Player />
            </ClientOnly>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>
<style scoped>
svg {
  filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.9));
}
</style>
