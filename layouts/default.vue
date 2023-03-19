<script setup>
const configs = useRuntimeConfig()
const listen = ref('')
const searchResults = ref([])
const results = ref(null)
const requestResult = ref(null)

const { $ws } = useNuxtApp()

onMounted(() => {
  $ws.addEventListener('message', (event) => {
    console.log('Message from server(via component) ', event.data)
  })
})

function getListeners(listeners) {
  listen.value = listeners
}

function getSearchResults(songs) {
  const top = results.value.offsetTop
  window.scrollTo(0, top)
  searchResults.value = songs
}

async function addRequest(song) {
  const { data } = await useFetch('http://localhost:4000/request/' + song)
  requestResult.value = data.value.message
}
</script>
<template>
  <LayoutDoubleHeader @search-results="getSearchResults" @listeners="getListeners" />
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

      <div class="row d-flex align-items-center h-100">
        <div ref="results" class="col-12 mx-auto">
          <h2>Resultados</h2>

          <div class="alert alert-success fade show" role="alert" v-show="requestResult">
            {{ requestResult }}
            <!-- <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button> -->
          </div>

          <!-- <div>{{ requestResult }}</div> -->

          <table class="table table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Artista</th>
                <th scope="col">Música</th>
                <th scope="col">Pedir</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in searchResults.songs">
                <th scope="row">{{ item.id }}</th>
                <td>{{ item.artist }}</td>
                <td>{{ item.title }}</td>
                <td>
                  <a href="#" @click.prevent="addRequest(item.id)">
                    Pedir
                  </a>
                </td>
              </tr>
            </tbody>
          </table>

          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item"><a class="page-link" href="#">Previous</a></li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">Next</a></li>
            </ul>
          </nav>
          Total de resultados: {{ searchResults.total }}
        </div>
      </div>

      <slot />
    </div>
  </main>
  <LayoutFooter :listeners="listen" />
</template>
