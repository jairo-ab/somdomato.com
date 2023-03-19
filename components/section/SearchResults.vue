<script setup>
defineProps(['searchResults'])
</script>
<template>
  <div class="row align-items-md-stretch">
    <div class="col-12">
      <div class="h-100 p-3 text-bg-dark rounded-3">
        <h2>Resultados</h2>
        <li v-for="item in searchResults">
          {{ item.artist }} - {{ item.title }}
        </li>
      </div>
    </div>
  </div>
</template>