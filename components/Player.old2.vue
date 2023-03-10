<script setup>
const base = 'https://radio.somdomato.com'
const song = ref('Carregando...')
const source = ref(null)

const playPauseBtn = ref('M8.5 8.64L13.77 12L8.5 15.36V8.64M6.5 5v14l11-7')
const slider = ref(null)
const volumeProgress = ref(null)
const player = ref(null)
const speaker = ref(null)
const volume = ref(null)
const volumeOpen = ref(false)
const loading = ref(false)

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

function toggle(event) {
  if (player.value.paused) {
    playPauseBtn.value = 'M14 19h4V5h-4M6 19h4V5H6v14Z'
    player.value.play()
  } else {
    playPauseBtn.value = 'M8.5 8.64L13.77 12L8.5 15.36V8.64M6.5 5v14l11-7'
    player.value.pause()
  }
}

function refresh() { source.value.src = `${base}/principal?ts=` + ~~(Date.now() / 1000) }

function reload() {
  refresh()
  player.value.load()
  player.value.play()
}

onMounted(() => {
  setInterval(async () => {
    const {
      icestats: { source: { title } }
    } = await (await fetch(`${base}/json`)).json()
    song.value = title
  }, 1000)

  refresh()

  player.value.onpause = () => { refresh() }
})
</script>
<template>
  <div class="holder">
    <div class="audio green-audio-player" ref="audio-player">
      <div class="loading" :class="{ 'hidden': !loading }">
        <div class="spinner"></div>
      </div>

      <div class="play-pause-btn" @click="toggle" :class="{ 'hidden': loading }">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
          <path fill="#566574" :d="playPauseBtn" />
        </svg>
      </div>

      <!-- <div class="refresh-btn" @click="reload">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="#566574"
            d="M17.65 6.35A7.958 7.958 0 0 0 12 4a8 8 0 0 0-8 8a8 8 0 0 0 8 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18a6 6 0 0 1-6-6a6 6 0 0 1 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35Z" />
        </svg>
      </div> -->

      <div class="controls">
        <span class="current-time">0:00</span>
        <div class="slider" data-direction="horizontal">
          <div class="progress">
            <div class="pin" id="progress-pin" data-method="rewind"></div>
          </div>
        </div>
        <span class="total-time">0:00</span>
      </div>

      <div class="volume">
        <div class="volume-btn" @click="volumeOpen = !volumeOpen">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="#566574" fill-rule="evenodd"
              d="M14.667 0v2.747c3.853 1.146 6.666 4.72 6.666 8.946 0 4.227-2.813 7.787-6.666 8.934v2.76C20 22.173 24 17.4 24 11.693 24 5.987 20 1.213 14.667 0zM18 11.693c0-2.36-1.333-4.386-3.333-5.373v10.707c2-.947 3.333-2.987 3.333-5.334zm-18-4v8h5.333L12 22.36V1.027L5.333 7.693H0z"
              id="speaker" />
          </svg>
        </div>

        <div ref="volume-controls" class="volume-controls" :class="{ 'hidden': !volumeOpen }">
          <div class="slider" data-direction="vertical" ref="slider">
            <input class="pin" type="range" orient="vertical" min="0" max="100" step="1" @mouseup="volumeOpen = false">
          </div>
        </div>
      </div>

      <audio ref="player" crossorigin="true" preload="none">
        <source ref="source" src="https://radio.somdomato.com/principal" type="audio/mpeg">
      </audio>
    </div>
  </div>
</template>
<style lang="scss" scoped>
html,
body {
  height: 100%;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}

svg,
img {
  display: block;
}

.audio.green-audio-player {
  max-width: 380px;
  min-width: 300px;
  height: 42px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, .07);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 14px;
  padding-right: 14px;
  border-radius: 3px;
  user-select: none;
  -webkit-user-select: none;
  background-color: #fff;

  .hidden {
    display: none;
  }

  .play-pause-btn {
    cursor: pointer;
  }

  .refresh-btn {
    cursor: pointer;
  }

  .spinner {
    width: 18px;
    height: 18px;
    background-image: url('@/assets/img/loading.png');
    background-size: cover;
    background-repeat: no-repeat;
    animation: spin 0.2s linear infinite;
  }

  .slider {
    flex-grow: 1;
    background-color: #D8D8D8;
    cursor: pointer;
    position: relative;
    .progress {
      width: 50px;
      background-color: #44BFA3;
      border-radius: inherit;
      position: absolute;
      pointer-events: none;
      .pin {
        height: 16px;
        width: 16px;
        border-radius: 8px;
        background-color: red;
        position: absolute;
        pointer-events: all;
        box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.32);
      }
    }
  }

  .controls {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    line-height: 18px;
    color: #55606E;
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    align-items: center;
    margin-left: 24px;
    margin-right: 24px;
    .slider {
      margin-left: 16px;
      margin-right: 16px;
      border-radius: 2px;
      height: 4px;
      .progress {        
        width: 0;
        height: 100%;
        .pin {
          right: -8px;
          top: -6px;
        }
      }
    }
    span {
      cursor: default;
    }
  }

  .volume {
    position: relative;

    .volume-btn {
      cursor: pointer;

      &.open path {
        fill: #44BFA3;
      }
    }
  }
}

@keyframes spin {
  from {
    transform: rotateZ(0);
  }

  to {
    transform: rotateZ(1turn);
  }
}</style>