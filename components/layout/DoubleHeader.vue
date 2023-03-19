<script setup>
const configs = useRuntimeConfig()
const title = ref('')
const search = ref('')

const whatsapp = ref('')
// const facebook = ref('')
// const twitter = ref('')

const emit = defineEmits(['listeners', 'searchResults'])

function songChange(songData) {
  title.value = songData.title
  emit('listeners', songData.listeners)
  whatsapp.value = 'https://wa.me/?text=' + encodeURIComponent(`Ouça agora *${songData.title}* na _Rádio Som do Mato_!\n\nhttps://somdomato.com`)
}

async function doSearch() {
  const { songs } = await $fetch(`http://localhost:4000/songs/?q=${search.value}`)
  emit('searchResults', songs)
}
</script>
<template>
  <div class="fixed-top py-0 border-4 border-danger">
    <nav class="py-2 bg-dark">
      <div class="container d-flex flex-wrap">
        <div class="nav me-auto">
          <ClientOnly>
            <Player @song="songChange" />
          </ClientOnly>
        </div>
        <ul class="nav">
          <li class="nav-item">
            <span class="nav-link px-2" style="color: #6c757d;">
              <a href="#" class="text-decoration-none me-1 disabled" style="color: #6c757d;">
                {{ title }}
              </a>
              <a :href="whatsapp"><Icon name="whatsapp" /></a>
              <!-- <a href=""><Icon name="twitter" /></a> -->
              <!-- <a href=""><Icon name="facebook" /></a> -->
            </span>
          </li>
        </ul>
      </div>
    </nav>
    <header class="py-3 mb-4 bg-dark border-shadow">
      <div class="container d-flex flex-wrap justify-content-center">
        <NuxtLink class="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none" to="/">
          <img src="/img/logotipo.svg" :alt="configs.public.appName" height="32" class="bi me-2" />
          <span class="fs-4 text-white">Som do Mato</span>
        </NuxtLink>
        <form class="col-12 col-lg-auto mb-3 mb-lg-0" role="search" @submit.prevent="doSearch">
          <input v-model="search" type="search" class="form-control shadow-none bg-dark text-white" placeholder="Pesquise a música ou artista" aria-label="Pesquisa">
        </form>
      </div>
    </header>
  </div>
</template>
<style scoped>
a {
  color: #6c757d;
}

.border-shadow {
  border-bottom: 3px solid rgba(0, 0, 0, .72);
  box-shadow: 0 5px 5px rgba(0, 0, 0, .5);
}

.form-control,
.form-control:focus {
  border: 2px solid #ced4da !important;
  outline: none !important;
  box-shadow: none !important;
} 
</style>
