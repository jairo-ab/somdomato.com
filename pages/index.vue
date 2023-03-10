<script setup lang="ts">
const config = useRuntimeConfig()
</script>
<template>
  <div class="row d-flex align-items-center h-100">
    <div class="col-md-8 mx-auto">
      <img src="/img/logo.svg" class="img-fluid" :alt="config.appName" />
    </div>
  </div>
</template>
