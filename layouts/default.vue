<script setup>
const configs = useRuntimeConfig()
const listen = ref('')

const { $ws } = useNuxtApp()

onMounted(() => {
  $ws.addEventListener('message', (event) => {
    console.log('Message from server(via component) ', event.data)
  })
})

function getListeners(listeners) {
  listen.value = listeners
}
</script>
<template>
  <LayoutDoubleHeader @listeners="getListeners" />
<main class="flex-shrink-0">
  <div class="container">
    <div class="row d-flex align-items-center h-100">
      <div class="col-md-8 mx-auto">
          <img src="/img/logo.svg" class="img-fluid" :alt="configs.public.appName" />
        </div>
      </div>

      <div class="row d-flex align-items-center h-100">
        <div class="col-12 mx-auto">
          <ChatContainer />
        </div>
      </div>

      <!-- <div class="row d-flex align-items-center h-100">
          <div class="col-12 mx-auto">
            Resultados
            <button type="button" class="btn btn-primary" id="liveToastBtn">Show live toast</button>
          </div>
        </div> -->

      <slot />
    </div>
  </main>
  <LayoutFooter :listeners="listen" />
</template>