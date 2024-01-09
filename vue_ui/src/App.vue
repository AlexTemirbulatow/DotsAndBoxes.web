<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="text-white" style="background-color: #483c6c;">
      <q-tabs align="left" style="padding-left: 50px;">
        <img src="images/0_Logo.png" alt="Logo" style="width: 50px;">
        <h5 style="margin-left: 10px;">Dots And Boxes</h5>
        <q-route-tab to="/" label="home" class="tabs" style="margin-left: 30%;" />
        <q-route-tab to="game" label="game" class="tabs" />
      </q-tabs>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'app',
  setup() {
    return {
      leftDrawerOpen: ref(false)
    }
  }
}
</script>

<style>
body {
  background-color: #100235;
  background-blend-mode: multiply;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

p {
  color: aliceblue;
  font-family: 'Segoe UI Light', sans-serif;
  font-size: 20.8px;
}

.header {
  background: url('../../public/images/header.png');
}

h1,
h3 {
  font-family: "Agbalumo";
  color: #d8d8d8;
}

h2,
h4,
h5 {
  font-family: "Lilita One", sans-serif;
  font-size: 5px;
  color: #d8d8d8;
}

.tabs {
  font-family: "Lilita One", sans-serif;
  color: #d8d8d8;
}

@media (max-width: 991px) {
  body .sidebar {
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
  }
}

</style>
