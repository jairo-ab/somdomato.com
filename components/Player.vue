<script setup>
const base = 'https://radio.somdomato.com'
const mount = '/principal'
const song = ref('Rádio Som do Mato')
const source = ref(`${base}/${mount}`)

const player = ref(null)
const volume = ref(100)
const open = ref(false)
const paused = ref(true)
const loading = ref(true)

// <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m5-2H7c-1.11 0-2 .89-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/></svg>
// <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M2 5.27L3.28 4L21 21.72L19.73 23l-1.46-1.46c-.34.29-.77.46-1.27.46H7a2 2 0 0 1-2-2V8.27l-3-3M12 18a3 3 0 0 1-3-3c0-.76.28-1.46.75-2l-1.42-1.4C7.5 12.5 7 13.69 7 15a5 5 0 0 0 5 5c1.31 0 2.5-.5 3.4-1.33L14 17.25c-.55.47-1.24.75-2 .75m5-3a5 5 0 0 0-5-5h-.18l-6.7-6.7C5.41 2.54 6.14 2 7 2h10a2 2 0 0 1 2 2v13.18l-2-2.01V15M12 4c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2Z"/></svg>

function toggle() {
  if (player.value.paused) {
    player.value.play()
  } else {
    player.value.pause()
  }
  paused.value = !paused.value
}

function refresh() {
  source.value = `${base}/principal?ts=` + ~~(Date.now() / 1000)
}

function reload() {
  refresh()
  player.value.load()
  player.value.play()
}

function syncVolume() {
  player.value.volume = (volume.value / 100)
}

onMounted(() => {
  refresh()

  setInterval(async () => {
    const {
      icestats: { source: { title } }
    } = await (await fetch(`${base}/json`)).json()
    song.value = title
  }, 1000)

  player.value.onpause = _ => { refresh() }
})

watch(volume, (newVal) => {
  player.value.volume = (newVal / 100)
}
)
</script>
<template>
  <div class="audio-player">
    <div class="loading" v-if="loading">
      <div class="spinner"></div>
    </div>
    <Transition mode="out-in">
      <div class="play-btn" v-if="paused">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 24" @click="toggle">
          <path fill-rule="evenodd" d="M8.5 8.64L13.77 12L8.5 15.36V8.64M6.5 5v14l11-7" />
        </svg>
      </div>
      <div class="pause-btn" v-else>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 24" @click="toggle">
          <path fill-rule="evenodd" d="M14 19h4V5h-4M6 19h4V5H6v14Z" />
        </svg>
      </div>
    </Transition>
    <div class="refresh-btn" @click="reload">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="currentColor"
          d="M2 12a9 9 0 0 0 9 9c2.39 0 4.68-.94 6.4-2.6l-1.5-1.5A6.706 6.706 0 0 1 11 19c-6.24 0-9.36-7.54-4.95-11.95C10.46 2.64 18 5.77 18 12h-3l4 4h.1l3.9-4h-3a9 9 0 0 0-18 0Z" />
      </svg>
    </div>
    <Transition mode="out-in">
      <div class="title truncate" v-if="!open">
        <div>
          {{ song }}
        </div>
      </div>
      <div class="volume" v-else>
        {{ volume }}%
        <input class="pin" type="range" min="0" max="100" v-model="volume">
      </div>
    </Transition>
    <div class="volume-btn" @click="open = !open">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="currentColor"
          d="m20.07 19.07l-1.41-1.41A7.955 7.955 0 0 0 21 12c0-2.22-.89-4.22-2.34-5.66l1.41-1.41A9.969 9.969 0 0 1 23 12c0 2.76-1.12 5.26-2.93 7.07m-2.83-2.83l-1.41-1.41A3.99 3.99 0 0 0 17 12c0-1.11-.45-2.11-1.17-2.83l1.41-1.41A5.98 5.98 0 0 1 19 12c0 1.65-.67 3.15-1.76 4.24M4 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m4 2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m0 6a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4m0 2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2Z" />
      </svg>
    </div>
    <audio ref="player" crossorigin>
      <source :src="source" type="audio/mpeg">
    </audio>
  </div>
</template>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.audio-player {
  display: flex;
  align-items: center;
  height: 46px;
  user-select: none;
  -webkit-user-select: none;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, .51);
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, .72);
  // padding: 10px 0;
  
  div {
    padding-right: 10px;
  }

  .title,
  .play-btn,
  .pause-btn,
  .refresh-btn,
  .volume-btn {
    cursor: pointer;
  }

  
  .title {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;

    /* or some value */
    div {
      // width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .volume {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    min-width: 0;
  }

  .pin {
    margin-left: 10px;
  }

  .spinner {
    display: none;
    width: 18px;
    height: 18px;
    background-image: url('@/assets/img/loading.png');
    background-size: cover;
    background-repeat: no-repeat;
    animation: spin 0.4s linear infinite;
  }
  
  .play-btn svg, .pause-btn svg {
    height: 28px;
  }

  svg {
    display: block;
    fill: #fff;
    height: 20px;
  }

  input {
    max-width: 80px;
  }
}

@keyframes spin {
  from {
    transform: rotateZ(0);
  }

  to {
    transform: rotateZ(1turn);
  }
}

// Input Range
/*********** Baseline, reset styles ***********/
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
}

/* Removes default focus */
input[type="range"]:focus {
  outline: none;
}

/******** Chrome, Safari, Opera and Edge Chromium styles ********/
/* slider track */
input[type="range"]::-webkit-slider-runnable-track {
  background-color: #fff;
  border-radius: 0.3rem;
  height: 0.35rem;
}

/* slider thumb */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  /* Override default look */
  appearance: none;
  margin-top: -4px;
  /* Centers thumb on the track */
  background-color: #ffffff;
  border-radius: 0.5rem;
  height: .88rem;
  width: .88rem;
}

input[type="range"]:focus::-webkit-slider-thumb {
  outline: none;
  // outline-offset: 0.125rem;
}

/*********** Firefox styles ***********/
/* slider track */
input[type="range"]::-moz-range-track {
  background-color: #fff;
  border-radius: 0.5rem;
  height: 0.35rem;
}

/* slider thumb */
input[type="range"]::-moz-range-thumb {
  background-color: #fff;
  border: none;
  /*Removes extra border that FF applies*/
  border-radius: 0.5rem;
  height: .88rem;
  width: .88rem;
}

input[type="range"]:focus::-moz-range-thumb {
  outline: none;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>