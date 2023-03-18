<script setup>
const configs = useRuntimeConfig()
</script>
<template>
  <img src="/img/logo.svg" class="img-fluid" :alt="configs.public.appName" />
</template>
