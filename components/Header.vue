<script setup lang="ts">
const config = useRuntimeConfig()
</script>
<template>
  <header>
    <div class="fixed-top">
      <div class="container d-flex flex-column flex-md-row align-items-center my-1">
        <NuxtLink class="py-0 d-flex align-items-center text-white text-decoration-none" to="/">
          <img src="/img/logotipo.svg" :alt="config.appName" height="32" class="d-inline-block align-middle me-1" />
          Som do Mato
        </NuxtLink>

        <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
          <ClientOnly>
            <Plyr />
          </ClientOnly>
        </nav>
      </div>
    </div>
  </header>
</template>
