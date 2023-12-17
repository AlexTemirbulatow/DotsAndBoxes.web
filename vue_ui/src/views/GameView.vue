<template>
  <router-link to="/">Home</router-link> |
  <router-link to="/game">Game</router-link>
  <h1>This is a game page</h1>

  <HelloWorld />

  <div class="containerh pt-5 pb-3">
    <template v-if="!gameEnded">
      <div class="playerTurnImg" id="turn">
        <img v-if="currentPlayer === 0" src='../assets/playerBlue.png'>
        <img v-else-if="currentPlayer === 1" src='../assets/playerRed.png'>
        <img v-else-if="currentPlayer === 2" src='../assets/playerGreen.png'>
        <img v-else-if="currentPlayer === 3" src='../assets/playerYellow.png'>
        <h1>Turn</h1>
        <img src='../assets/playerBlue.png'>
      </div>
    </template>
    <template v-else>
      <div class="playerWonImg">
        <template v-if="winner === 'It\'s a draw!'">
          <h1>It's a draw!</h1>
        </template>
        <template v-else>
          <img :src="'assets/images/player' + matchingWinner() + '.png'">
          <h1>wins!</h1>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  components: {
    HelloWorld
  }
}
</script>

<style>
.game {
  background-color: burlywood;
}
</style>
