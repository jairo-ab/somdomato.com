<script setup>
const search = ref('')
const result = ref('')

// const { data: count } = await useFetch('/api/count')

async function submit() {
  const { data } = await $fetch('http://127.0.0.1:5000/pesquisa', {
    method: 'POST',
    body: JSON.stringify(search.value)
  })
  result.value = data
}
</script>
<template>
  <div>
    <input type="text" v-model="search" v-on:keyup.enter="submit">
  </div>
  <div ref="results">
    <div v-for="item in result">
      {{ item.artist }}
    </div>
  </div>
</template>
<style scoped>
div {
  width: 100%;
  font-size: 2rem;
  color: #fff;
  background-color: rgba(0, 0, 0, .51);
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, .72);
  border-radius: 5px;
  border-color: transparent;
  padding: 10px;
}

input {
  display: flex;
  width: 100%;
  height: 60px;
  font-size: 2rem;
  color: #fff;
  background-color: rgba(0, 0, 0, .51);
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, .72);
  border-radius: 5px;
  border-color: transparent;
  padding: 10px;
}

input:focus{
    outline: none;   
}
</style>