<script setup>
const base = 'https://radio.somdomato.com'
const song = ref('Carregando...')
const source = ref(null)

const volumeProgress = ref(null)
const player = ref(null)
const speaker = ref(null)

const progress = ref(null)
const pin = ref(null)

const movementX = ref(0)
const positionX = ref(0)

const volume = ref(null)
const loading = ref(false)
const open = ref(true)

const paused = ref(true)

function updateVolume() {
  volumeProgress.style.height = player.volume * 100 + '%';
  if (player.volume >= 0.5) {
    speaker.attributes.d.value = 'M14.667 0v2.747c3.853 1.146 6.666 4.72 6.666 8.946 0 4.227-2.813 7.787-6.666 8.934v2.76C20 22.173 24 17.4 24 11.693 24 5.987 20 1.213 14.667 0zM18 11.693c0-2.36-1.333-4.386-3.333-5.373v10.707c2-.947 3.333-2.987 3.333-5.334zm-18-4v8h5.333L12 22.36V1.027L5.333 7.693H0z';
  } else if (player.volume < 0.5 && player.volume > 0.05) {
    speaker.attributes.d.value = 'M0 7.667v8h5.333L12 22.333V1L5.333 7.667M17.333 11.373C17.333 9.013 16 6.987 14 6v10.707c2-.947 3.333-2.987 3.333-5.334z';
  } else if (player.volume <= 0.05) {
    speaker.attributes.d.value = 'M0 7.667v8h5.333L12 22.333V1L5.333 7.667';
  }
}

function toggle() {
  if (player.value.paused) {
    player.value.play()
  } else {
    player.value.pause()
  }
  paused.value = !paused.value
}

function refresh() { source.value.src = `${base}/principal?ts=` + ~~(Date.now() / 1000) }

function reload() {
  refresh()
  player.value.load()
  player.value.play()
}

function dragMouseDown (event) {
  console.log('First Value: ', event.clientX)
  positionX.value = event.clientX
  //positionX.value = pin.value.style.left

  document.onmousemove = event => { elementDrag(event) }
  document.onmouseup = event => { closeDragElement(event) }
}

function elementDrag(event) {
  console.log('clientX: ', event.clientX)
  console.log('movementX: ', movementX.value)

  movementX.value = positionX.value - event.clientX
  pin.value.style.left = (progress.value.offsetLeft - movementX.value) + 'px'
}

function closeDragElement () {
  document.onmouseup = null
  document.onmousemove = null
}

onMounted(() => {
  setInterval(async () => {
    const {
      icestats: { source: { title } }
    } = await (await fetch(`${base}/json`)).json()
    song.value = title
  }, 1000)

  // player.value.volume = 0.1

  refresh()

  player.value.onpause = _ => { refresh() }
})
</script>
<template>
  <div class="holder">
    <div class="audio green-audio-player">
      <div class="loading">
        <div class="spinner"></div>
      </div>

      <Transition mode="out-in">
        <div class="play-pause-btn" v-if="paused">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 18 24" @click="toggle">
            <path fill-rule="evenodd" d="M8.5 8.64L13.77 12L8.5 15.36V8.64M6.5 5v14l11-7" />
          </svg>
        </div>
        <div class="play-pause-btn" v-else>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 18 24" @click="toggle">
            <path fill-rule="evenodd" d="M14 19h4V5h-4M6 19h4V5H6v14Z" />
          </svg>
        </div>
      </Transition> 

      <Transition mode="out-in">        
        <div class="title" v-if="!open">
          Rádio Som do Mato
        </div>        
        <div class="controls" v-else>
          <span class="current-time">100%</span>
          <input type="range" min="0" max="100" value="100">
        </div>        
      </Transition>

      <div class="volume-btn" @click="open = !open">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M14.667 0v2.747c3.853 1.146 6.666 4.72 6.666 8.946 0 4.227-2.813 7.787-6.666 8.934v2.76C20 22.173 24 17.4 24 11.693 24 5.987 20 1.213 14.667 0zM18 11.693c0-2.36-1.333-4.386-3.333-5.373v10.707c2-.947 3.333-2.987 3.333-5.334zm-18-4v8h5.333L12 22.36V1.027L5.333 7.693H0z" />
        </svg>
      </div>

      <audio ref="player" crossorigin>
        <source ref="source" src="https://radio.somdomato.com/principal" type="audio/mpeg">
      </audio>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.holder {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.audio.green-audio-player {
  width: 300px;
  min-width: 250px;
  height: 48px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, .38);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 18px;
  padding-right: 18px;
  border-radius: 5px;
  user-select: none;
  -webkit-user-select: none;
  background-color: rgba(0, 0, 0, .51);

  .title, .controls {
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    align-items: center;

    align-items: center;
    margin-left: 14px;
    margin-right: 14px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .play-btn, .pause-btn, .volume-btn, .pin {
    // display: none;
    cursor: pointer;
  }

  .spinner {
    display: none;
    width: 18px;
    height: 18px;
    background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/loading.png);
    background-size: cover;
    background-repeat: no-repeat;
    animation: spin 0.4s linear infinite;
  }
}

svg,
img {
  display: block;
  fill: #a9b3bd;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F8FFAE;
  background: -webkit-linear-gradient(-65deg, #43C6AC, #F8FFAE);
  background: linear-gradient(-65deg, #43C6AC, #F8FFAE);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@keyframes spin {
  from {
    transform: rotateZ(0);
  }

  to {
    transform: rotateZ(1turn);
  }
}</style>