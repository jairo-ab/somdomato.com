<script setup>
const search = ref('')
const result = ref(null)
const configs = useRuntimeConfig()

async function submit() {
  const { data } = await $fetch(`${configs.public.apiUrl}/pesquisa`, {
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
  <Table :data="result" v-if="result" />
</template>
<style scoped>
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

input:focus { outline: none; }
</style>