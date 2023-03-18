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
