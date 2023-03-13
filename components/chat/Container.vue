<template>
  <div class="iframe-container">
    <iframe src="https://chat.somdomato.com" allow="camera; microphone" allowfullscreen></iframe>
  </div>
</template>
<style scoped>
/* iframe {
  width: 100%;
  min-height: 550px;
  max-height: 100%;
  border: none;
} */

.iframe-container {
  position: relative; /* 16:9 */
  padding-top: 56.25%;
  overflow: hidden;
}

.iframe-container iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 0;
}

@media (max-width: 768px){
  .iframe-container {
    height: calc(100vh - 300px);
  }
}

@media (min-width: 769px) and (max-width: 1024px){
  .iframe-container {
    height: calc(100vh - 270px);
  }
}

</style>