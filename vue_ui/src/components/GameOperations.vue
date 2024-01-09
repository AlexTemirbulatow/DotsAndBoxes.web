<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn v-on:click="undoredo('undo')" push class="op-btn" icon="undo" />
    <q-btn v-on:click="undoredo('redo')" push class="op-btn" icon="redo" />
    <q-btn v-on:click="saveload('save')" push class="op-btn" icon="save_alt" />
    <q-btn v-on:click="saveload('load')" push class="op-btn" icon="output" />
  </div>
</template>


<script>
import { dotsandboxes } from '@/game/dotsandboxes'

export default { 
  mixins: [dotsandboxes]
}
</script>

<style scoped>
.q-pa-md {
  display: flex;
  margin: 150px auto;
  flex-direction: column;
  position: absolute;
}
.op-btn {
  color: rgb(68, 60, 60);
  background: rgba(158, 145, 133, 0.956);
}

@media (max-width: 800px) {
  .q-pa-md {
    display: block;
    float: none;
    margin: auto;
    position: relative;
  }
}
</style>

