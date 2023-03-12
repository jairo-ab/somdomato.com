<template>
  <div class="iframe-container">
    <iframe src="https://chat.somdomato.com" allowfullscreen></iframe>
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
</style>