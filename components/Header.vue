<script setup lang="ts">
const config = useRuntimeConfig()
</script>
<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top">
      <div class="container">
        <NuxtLink class="navbar-brand py-0" to="/">
          <img src="/img/logotipo.svg" :alt="config.appName" height="32" class="d-inline-block align-middle me-1" />
          Som do Mato
        </NuxtLink>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarCollapse">
          <!-- <Navbar /> -->
          <div class="me-auto"></div>
          <ClientOnly>
            <Plyr />
          </ClientOnly>
        </div>
      </div>
    </nav>
  </header>
</template>
