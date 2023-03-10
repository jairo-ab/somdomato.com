<script setup lang="ts">
const config = useRuntimeConfig()
</script>
<template>
  <img src="/img/logo.svg" class="img-fluid" :alt="config.appName" />
</template>
