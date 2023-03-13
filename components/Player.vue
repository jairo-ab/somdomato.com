<script setup>
const base = 'https://radio.somdomato.com'
const mount = 'principal'
const song = ref('Rádio Som do Mato')
const source = ref(`${base}/${mount}`)
const app_url = location.href

const player = ref(null)
const volume = ref(100)
const open = ref(false)
const paused = ref(true)
const speakerIcon = ref('speaker') 

function toggle() {
  if (player.value.paused) {
    reload()
  } else {
    refresh()
    player.value.pause()
  }

  paused.value = player.value.paused
}

function refresh() {
  player.value.currentTime = 0;
  source.value = `${base}/${mount}?ts=` + ~~(Date.now() / 1000)
}

function reload() {
  refresh()
  player.value.load()
  player.value.play()
  paused.value = player.value.paused
}

onMounted(() => {
  refresh()

  player.value.onpause = _ => { refresh() }
  player.value.volume = .8

  setInterval(async () => {
    const { icestats: { source: { title, server_description } } } = await (await fetch(`${base}/json`)).json()
    const titles = title.split('-')

    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: titles[1].trim(),
        artist: titles[0],
        album: server_description,
        artwork: [
          { src: `${app_url}/img/album/96x96.png`,   sizes: '96x96',   type: 'image/png' },
          { src: `${app_url}/img/album/128x128.png`, sizes: '128x128', type: 'image/png' },
          { src: `${app_url}/img/album/192x192.png`, sizes: '192x192', type: 'image/png' },
          { src: `${app_url}/img/album/256x256.png`, sizes: '256x256', type: 'image/png' },
          { src: `${app_url}/img/album/384x384.png`, sizes: '384x384', type: 'image/png' },
          { src: `${app_url}/img/album/512x512.png`, sizes: '512x512', type: 'image/png' },
        ]
      })
    }
    song.value = title
  }, 5000)
})

watch(volume, (newVal) => {
  speakerIcon.value = 'speaker'
  if (newVal === 0) speakerIcon.value = 'speaker-mute'
  player.value.volume = (newVal / 100)
})
</script>
<template>
  <div class="player-container">
    <div class="audio-player">
      <Transition mode="out-in">
        <div class="play-btn" v-if="paused">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 24" @click="toggle">
            <path d="M8.5 8.64L13.77 12L8.5 15.36V8.64M6.5 5v14l11-7" />
          </svg>
        </div>
        <div class="pause-btn" v-else>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 24" @click="toggle">
            <path d="M14 19h4V5h-4M6 19h4V5H6v14Z" />
          </svg>
        </div>
      </Transition>
      <div class="refresh-btn" @click="reload">
        <Icon name="refresh" />
      </div>
      <Transition mode="out-in">
        <div class="text-truncate" v-if="!open">
          {{ song }}
        </div>
        <div class="volume" v-else>
          <input class="pin" type="range" min="0" max="100" v-model="volume" style="margin-right: 10px;">
          {{ volume }}%
        </div>
      </Transition>
      <div class="volume-btn" @click="open = !open">
        <Icon :name="speakerIcon" />
      </div>
      <audio ref="player" crossorigin>
        <source :src="source" type="audio/mpeg">
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

* {
  box-sizing: border-box;
}

.player-container {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100vw;
  min-width: 0;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.audio-player {
  --foreground-color: rgba(255, 255, 255, 0.62);
  --background-color: rgba(0, 0, 0, 0.72);
  --border-color: rgba(255, 255, 255, 0.72);
  display: flex;
  height: 46px;
  width: 100%;
  max-width: 600px;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  -webkit-user-select: none;
  color: var(--foreground-color);
  border-radius: 5px;
  background-color: #FBAB7E;
  background-image: linear-gradient(90deg, #FBAB7E 0%, #c4a24d 100%);
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.72);
  padding: 0 10px;
  border: 3px solid var(--border-color);

  .hidden {
    display: none;
  }

  div {
    display: flex;
    align-items: center;
    margin-right: .7rem;
  }

  div:last-of-type {
    margin-right: 0;    
  }

  .title,
  .play-btn,
  .pause-btn,
  .refresh-btn,
  .volume-btn {
    cursor: pointer;
  }

  .volume {
    display: flex;
    align-items: center;
    font-size: 1.1em;
    font-weight: bold;
  }

  svg {
    display: block;
    fill: var(--foreground-color);
    width: 20px;
    height: 20px;
  }

  .play-btn svg,
  .pause-btn svg {
    height: 28px;
  }

  input {
    max-width: 80px;
    min-width: 0px;
  }
}

input[type="range"] {
  color: rgba(0, 0, 0, 0.23);
  // color: #f07167;
  font-size: 1.5rem;
  width: 12.5em;
  --border-radius: 0;
  --thumb-height: 1.125em;
  --track-color: rgba(255, 255, 255, 0.1);
  --track-sel-color: rgba(255, 255, 255, 0.2);
  --track-height: 0.125em;
  --brightness-hover: 180%;
  --brightness-down: 80%;
  --clip-edges: 0.125em;
}

/* === range commons === */
input[type="range"] {
  position: relative;
  background: transparent;
  overflow: hidden;
}

/* === WebKit specific styles === */
input[type="range"],
input[type="range"]::-webkit-slider-runnable-track,
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  transition: all ease 100ms;
  height: var(--thumb-height);
}

input[type="range"]::-webkit-slider-runnable-track,
input[type="range"]::-webkit-slider-thumb {
  position: relative;
}

input[type="range"]::-webkit-slider-thumb {
  --clip-top: calc((var(--thumb-height) - var(--track-height)) * 0.5 - 0.5px);
  --clip-bottom: calc(var(--thumb-height) - var(--clip-top));
  --clip-further: calc(100% + 1px);
  --box-fill: calc(-100vmax - var(--thumb-width, var(--thumb-height))) 0 0 100vmax currentColor;

  width: var(--thumb-width, var(--thumb-height));
  background: linear-gradient(currentColor 0 0) scroll no-repeat left center / 50% calc(var(--track-height) + 1px);
  background-color: currentColor;
  box-shadow: var(--box-fill);
  border-radius: var(--box-radius);

  filter: brightness(100%);
  clip-path: polygon(100% -1px,
      var(--clip-edges) -1px,
      0 var(--clip-top),
      -100vmax var(--clip-top),
      -100vmax var(--clip-bottom),
      0 var(--clip-bottom),
      var(--clip-edges) 100%,
      var(--clip-further) var(--clip-further));
}

input[type="range"]::-webkit-slider-runnable-track {
  background: linear-gradient(var(--track-color) 0 0) scroll no-repeat center 100% calc(var(--track-height) + 1px);
}

input[type="range"]:disabled::-webkit-slider-thumb {
  cursor: not-allowed;
}

/* === Firefox specific styles === */
input[type="range"],
input[type="range"]::-moz-range-track,
input[type="range"]::-moz-range-thumb {
  appearance: none;
  transition: all ease 100ms;
  height: var(--thumb-height);
}

input[type="range"]::-moz-range-track,
input[type="range"]::-moz-range-thumb,
input[type="range"]::-moz-range-progress {
  background: var(--track-color);
}

input[type="range"]::-moz-range-thumb {
  opacity: 0;
  background: currentColor;
  border: 0;
  width: var(--thumb-width, var(--thumb-height));
  border-radius: var(--thumb-width, var(--thumb-height));
  cursor: ponter;
}

input[type="range"]:active::-moz-range-thumb {
  cursor: pointer;
}

input[type="range"]::-moz-range-track {
  width: 100%;
  background: var(--track-color);
}

input[type="range"]::-moz-range-progress {
  appearance: none;
  background: currentColor;
  transition-delay: 40ms;
}

input[type="range"]::-moz-range-track,
input[type="range"]::-moz-range-progress {
  height: calc(var(--track-height) + 1px);
  border-radius: var(--track-height);
  // background: ;
}

// input[type="range"]::-moz-range-thumb,
// input[type="range"]::-moz-range-progress {
//   filter: brightness(100%);
// }
</style>