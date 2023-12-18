<template>
  <q-page>
    <div class="containerh">
      <template v-if="!gameEnded">
        <div class="playerTurnImg" id="turn">
          <img v-if="currentPlayer === 0" src='images/playerBlue.png'>
          <img v-else-if="currentPlayer === 1" src='images/playerRed.png'>
          <img v-else-if="currentPlayer === 2" src='images/playerGreen.png'>
          <img v-else-if="currentPlayer === 3" src='images/playerYellow.png'>
          <h3>Turn</h3>
        </div>
      </template>
      <template v-else>
        <div class="playerWonImg">
          <template v-if="winner === 'It\'s a draw!'">
            <h1>It's a draw!</h1>
          </template>
          <template v-else>
            <img :src="'images/player' + matchingWinner() + '.png'">
            <h3>wins!</h3>
          </template>
        </div>
      </template>
    </div>

    <div id="board">
      <template v-for="row in colSize" :key="row">
        <template v-for="col in rowSize" :key="col">
          <game-dot/>
          <div v-if="matchingValue('hor', (row - 1), (col - 1)) === true" class="takenLineHor"
            :id="'takenHor' + (row - 1) + (col - 1)">
          </div>
          <button @click='doMove(1, (row - 1), (col - 1))' v-else class="preBorderHor"
            :id="'preHor' + (row - 1) + (col - 1)">
            <div class="preLineHor"></div>
          </button>
        </template>
        <game-dot/>

        <template v-for="col in (rowSize + 1)" :key="col">
          <div v-if="matchingValue('ver', (row - 1), (col - 1)) === true" class="takenLineVer"
            :id="'takenVer' + (row - 1) + (col - 1)">
          </div>
          <button @click='doMove(2, (row - 1), (col - 1))' v-else class="preBorderVer"
            :id="'preVer' + (row - 1) + (col - 1)">
            <div class="preLineVer"></div>
          </button>
          <template v-if="col !== (rowSize + 1)">
            <div :class="'square' + matchingStatus((row - 1), (col - 1))" :id="'cell' + (row - 1) + (col - 1)"></div>
          </template>
        </template>
      </template>

      <template v-for="col in rowSize" :key="col">
        <game-dot/>
        <div v-if="matchingValue('hor', colSize, (col - 1)) === true" class="takenLineHor"
          :id="'takenHor' + (row - 1) + (col - 1)">
        </div>
        <button @click='doMove(1, colSize, (col - 1))' v-else class="preBorderHor" :id="'preHor' + colSize + (col - 1)">
          <div class="preLineHor"></div>
        </button>
      </template>
      <game-dot/>
    </div>

    <div class="container3 mb-5">
      <div id="scoreboard">
        <template v-for="player in playerList" :key="player">
          <div class="player" :id="'player' + player.index">
            <img :src="'images/player' + matchingPlayer(player.index) + '.png'">
            <h4>{{ player.points }}</h4>
          </div>
        </template>
      </div>
    </div>
  </q-page>
</template>


<script>
import { dotsandboxes } from '@/game/dotsandboxes'
import GameDot from '@/components/GameDot.vue';

export default {
  name: 'GameBoard',
  components: {
    'game-dot': GameDot
  },
  mixins: [dotsandboxes],
  created() {
    this.initData()
    this.connectWebSocket()
  }
}
</script>


<style></style>
