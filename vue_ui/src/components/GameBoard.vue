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


<style scoped>

#board {
  width: 562px;
  height: 462px;
  background-color: rgba(158, 145, 133, 0.956);
  border: 6px solid #5b554f;
  border-radius: 10px;
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
}

.preBorderHor {
  background: none;
  width: 120px;
  height: 30px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 -25px;
  z-index: 0;
}

.preBorderHor:hover {
  background-color: #5959594a;
  box-shadow: 2px 7px 0px #5b5b5b;
  width: 120px;
  height: 30px;
  border: none;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 -25px;
}

.preBorderHor:hover .preLineHor {
  display: none;
}

.preLineHor {
  background-color: #4c4c4c66;
  width: 70px;
  height: 4px;
  justify-content: center;
  align-items: center;
}

.takenLineHor {
  background-color: #b5b5b5;
  box-shadow: 2px 7px 0px #5b5b5b;
  width: 120px;
  height: 30px;
  border: none;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 -25px;
  z-index: 2;
}

.preBorderVer {
  background: none;
  width: 30px;
  height: 120px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -25px 0;
  z-index: 0;
}

.preBorderVerHovered {
  background-color: #5959594a;
  box-shadow: 7px 0px 0px #5b5b5b;
  width: 30px;
  height: 120px;
  border: none;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -25px 0;

  .preLineVer {
    display: none;
  }
}

.preLineVer {
  background-color: #4c4c4c66;
  width: 4px;
  height: 70px;
  justify-content: center;
  align-items: center;
}

.preBorderVer:hover {
  background-color: #5959594a;
  box-shadow: 7px 0px 0px #5b5b5b;
  width: 30px;
  height: 120px;
  border: none;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -25px 0;
}

.preBorderVer:hover .preLineVer {
  display: none;
}

.takenLineVer {
  background-color: #b5b5b5;
  box-shadow: 7px 0px 0px #5b5b5b;
  width: 30px;
  height: 120px;
  border: none;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -25px 0;
  z-index: 2;
}

.verline {
  background-color: #4c4c4c66;
  width: 4px;
  height: 70px;
  justify-content: center;
  align-items: center;
}

.playerTurn {
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
}

.playerTurnImg {
  background: none;
  font-family: "Comic Sans MS", cursive;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: right;
  grid-gap: 15px;
}

.playerWonImg {
  background: none;
  font-family: "Comic Sans MS", cursive;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: right;
  grid-gap: 15px;
}

.square- {
  background: none;
  width: 70px;
  height: 70px;
}

.squareB {
  background-color: #69a3bc;
  width: 70px;
  height: 70px;
}

.squareR {
  background-color: #bc6969;
  width: 70px;
  height: 70px;
}

.squareG {
  background-color: #73bc69;
  width: 70px;
  height: 70px;
}

.squareY {
  background-color: #bbbc69;
  width: 70px;
  height: 70px;
}

#scoreboard {
  padding-top: 20px;
  display: flex;
  justify-content: center;
  margin-bottom: 150px;
}

.player {
  background-color: rgba(101, 101, 101, 0.274);
  border-radius: 10px;
  border-style: solid;
  border-width: 2px;
  border-color: #d4d4d415;
  border-left: 0px;
  padding-right: 15px;
  height: 45px;
  display: flex;
  align-items: center;
  margin: 0 40px;
}

.player img {
  margin-right: 10px;
  height: 50px;
}

</style>
