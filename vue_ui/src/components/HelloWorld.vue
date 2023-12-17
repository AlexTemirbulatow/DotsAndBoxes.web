<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="../assets/logo.svg" style="width: 200px; height: 200px">
    <h1>{{ rowSize }}</h1>
  </q-page>
</template>

<style>
</style>

<script>
import { dotsandboxes } from '@/game/dotsandboxes';

export default {
  name: 'HelloWorld',
  mixins: [dotsandboxes],
  created() {
    this.initData()
    this.connectWebSocket()
  }
}
</script>
