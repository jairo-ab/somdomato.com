<<<<<<< HEAD
<script setup>
const configs = useRuntimeConfig()
</script>
<template>
    <div class="fixed-top">

    
    <nav class="py-2 bg-light border-bottom">
        <div class="container d-flex flex-wrap">
            <div class="nav me-auto">
                <ClientOnly>
                    <Player />
                </ClientOnly>
            </div>
            <ul class="nav">
                <li class="nav-item"><a href="#" class="nav-link link-dark px-2">Sign up</a></li>
            </ul>
        </div>
    </nav>

    <header class="py-3 mb-4 border-bottom bg-light">
        <div class="container d-flex flex-wrap justify-content-center">
            <NuxtLink class="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none" to="/">
                <img src="/img/logotipo.svg" :alt="configs.public.appName" height="32" class="bi me-2" />
                <span class="fs-4">Som do Mato</span>
            </NuxtLink>

            <form class="col-12 col-lg-auto mb-3 mb-lg-0" role="search">
                <input type="search" class="form-control" placeholder="Search..." aria-label="Search">
            </form>
        </div>
    </header>
</div>


    <!-- <header>
        <div class="fixed-top">
            <div class="container d-flex flex-column flex-md-row align-items-center my-1">
                <NuxtLink class="py-0 d-flex align-items-center fs-3 text-white text-decoration-none text-nowrap" to="/">
                    <img src="/img/logotipo.svg" :alt="configs.public.appName" height="32"
                        class="d-inline-block align-middle me-1" />
                    Som do Mato
                </NuxtLink>

                <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                    <div class="d-flex flex-column flex-md-row align-items-center">

                    </div>
                </nav>
            </div>
        </div>
    </header> -->
</template>
<style scoped>
svg {
    filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.9));
}
</style>
=======
<script setup>
const configs = useRuntimeConfig()
const title = ref('')
const whatsapp = ref('')
const facebook = ref('')
const twitter = ref('')

const emit = defineEmits(['listeners'])

function songChange(songData) {
  title.value = songData.title
  emit('listeners', songData.listeners)

  whatsapp.value = 'https://wa.me/?text=' + encodeURIComponent(songData.title) + ' na Rádio Som do Mato! https://somdomato.com'

  // https://wa.me/?text=Gostaria%20de%20saber%20sobre%20o%20preço%20do%20apartamento


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
              <a href="#" class="underline-none disabled" style="color: #6c757d;">
                {{ title }}
              </a>
              <a :href="whatsapp"><Icon name="whatsapp" /></a>
              <a href=""><Icon name="twitter" /></a>
              <a href=""><Icon name="facebook" /></a>
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
        <form class="col-12 col-lg-auto mb-3 mb-lg-0" role="search" @submit.prevent="">
          <input type="search" class="form-control shadow-none bg-dark text-white" placeholder="Pesquise a música ou artista" aria-label="Pesquisa">
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
>>>>>>> ab59641305e05b2dbed293882ff4bec478f24c30
