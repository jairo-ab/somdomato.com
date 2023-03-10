<script setup>
const reqResult = ref(null)
const config = useRuntimeConfig()
const requestUrl = `${config.apiUrl}/pedir`

defineProps({ data: Object })

async function submit(id) {
  const { data } = await fetch(`${requestUrl}/${id}`)
  reqResult.value = data
}
</script>
<template>
  <div v-if="reqResult">
    {{ reqResult }}
  </div>
  <table class="table table-dark table-striped" v-if="data && !reqResult">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Artista</th>
        <th scope="col">Título</th>
        <th scope="col">Pedir</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data">
        <th scope="row">{{ item.id }}</th>
        <td>{{ item.artist }}</td>
        <td>{{ item.title }}</td>
        <td>
          <button type="button" class="btn btn-sm btn-outline-light" @click="submit(item.id)">Pedir</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>