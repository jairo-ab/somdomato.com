
import { listeners } from 'process';

<script setup>
defineProps(['listeners'])
</script>
<template>
  <footer class="footer mt-auto py-3">
    <div class="container text-center">
      <span class="text-muted">&copy; 2012-{{ new Date().getFullYear() }} Rádio Som do Mato</span><br />
      <span class="text-muted fst-italic fs-6">Ouvintes: {{ listeners }}</span>
    </div>
  </footer>
</template>
