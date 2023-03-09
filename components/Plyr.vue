<script setup>
const base = 'https://radio.somdomato.com'
const song = ref('Carregando...')
const player = ref(null)
const source = ref(null)

function refresh() {
  source.value.src = `${base}/principal?ts=` + ~~(Date.now() / 1000)
}

function reload() {
  refresh()
  player.value.load()
  player.value.play()
}

onMounted(() => {
  setInterval(async () => {
    const {
      icestats: {
        source: { title }
      }
    } = await (await fetch(`${base}/json`)).json()
    song.value = title
  }, 1000)

  refresh()

  player.value.onpause = function () {
    refresh()
  }
})
</script>
<template>
  <div class="d-flex flex-column flex-md-row align-items-center">
    {{ song }}

    <div class="mt-2 mt-md-0" style="display: inline-flex; align-items: center">
      <div class="plyr__controls">
        <button @click.prevent="reload()" class="plyr__controls__item plyr__control" type="button" data-plyr="play" aria-label="Pause">
          <svg class="icon--not-pressed" aria-hidden="true" focusable="false">
            <use xlink:href="#plyr-restart"></use>
          </svg>
          <span class="plyr__sr-only">Reload</span>
        </button>
      </div>

      <vue-plyr>
        <audio ref="player" crossorigin="true" controls>
          <source ref="source" src="https://radio.somdomato.com/principal" type="audio/mp3" />
        </audio>
      </vue-plyr>
    </div>
  </div>
</template>
<style scoped>
/* .plyr__controls>button,
.plyr__controls__item .plyr__control,
.plyr__control {
  color: #fff !important;
}

.plyr__control:hover,
.plyr--audio .plyr__control {
  background: #00b2ff;
  color: #fff;
} */
</style>
