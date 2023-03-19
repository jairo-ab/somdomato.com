<script setup>
import { semver } from 'semver'
import pkg from '../package.json'

const repo = await (await fetch('https://raw.githubusercontent.com/sistematico/somdomato.com/main/package.json')).json()
const swal = inject("$swal")

onMounted(() => {
  if (semver.gt(repo.version, pkg.version)) {
    swal.fire({
      icon: 'warning',
      title: 'Considere atualizar a página!',
      timer: 20000
    })
  } else {
    swal.fire({
      icon: 'success',
      title: 'Bem Vindo a Rádio Som do Mato!',
      showConfirmButton: false,
      timer: 5000,
      width: '10rem',
    })
  }
})
</script>
<template>
</template>