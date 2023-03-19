<script setup>
const configs = useRuntimeConfig()
const listen = ref('')
const songs = ref(null)

function getListeners(listeners) {
  listen.value = listeners
}

function getSearchSongResults(songsResults) {
  songs.value = songsResults
}
</script>
<template>
  <LayoutDoubleHeader @listeners="getListeners" @search-song-results="getSearchSongResults" />
  <main class="flex-shrink-0">
    <div class="container">

      <div class="row d-flex align-items-center h-100">
        <div class="col-md-8 mx-auto">
          <img src="/img/logo.svg" class="img-fluid" :alt="configs.public.appName" />
        </div>
      </div>

      <!-- <SectionChat /> -->
      <SectionSearchResults :search-results="songs" />
      <SectionMusicas />

      <slot />
    </div>
  </main>
  <LayoutFooter :listeners="listen" />
</template>
