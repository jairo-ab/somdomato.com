<script setup>
const configs = useRuntimeConfig()
const listen = ref('')

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

      <slot />
    </div>
  </main>
  <LayoutFooter :listeners="listen" />
</template>
