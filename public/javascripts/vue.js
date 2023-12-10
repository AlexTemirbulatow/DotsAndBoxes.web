const gameboard = Vue.createApp({
  data() {
    return {
      websocket: new WebSocket("ws://localhost:9000/websocket"),
      rowSize: 0,
      colSize: 0,
      playerSize: 0,
      currentPlayer: 0,
      playerList: [],
      rows: [],
      cols: [],
      status: [],
      gameEnded: false,
      winner: 'undefined',
      statusValue: 'undefined'
    }
  },
  mounted() {
    $.get("/game/json", function(data) {
      gameboard.rowSize = data.field.rowSize
      gameboard.colSize = data.field.colSize
      gameboard.playerSize = data.field.playerSize
      gameboard.currentPlayer = data.field.currentPlayer
      gameboard.playerList = data.field.playerList
      gameboard.gameEnded = data.field.gameEnded
      gameboard.winner = data.field.winner
      gameboard.rows = data.field.rows
      gameboard.cols = data.field.cols
      gameboard.status = data.field.status
    })
  },
  created() {
    this.connectWebSocket()
  },
  methods: {
    connectWebSocket() {
      this.websocket.onopen = () => console.log("Successfully connected to WebSocket")
      this.websocket.onclose = () => console.log("Connection with WebSocket2 closed!")
      this.websocket.onerror = (error) => console.log("Error in WebSocket occurred: " + error)
      this.websocket.onmessage = function(msg) {
        if (typeof msg.data === "string") {
          const data = JSON.parse(msg.data)
          //TODO
        }
      }
    },
    matchingValue(direction, row, col) {
      return !!((direction === 'hor' ? this.rows : this.cols)
        .find(item => item.row === row && item.col === col && item.value === true));
    },
    matchingStatus(row, col) {
      return (this.status.find((item) => item.row === row && item.col === col)).value
    },
    matchingWinner() {
      return this.winner.split(" ")[1]
    },
    matchingPlayer(index) {
      return {0:"Blue",1:"Red",2:"Green",3:"Yellow"}[index]
    },
    doMove(index, x, y) {
      console.log(`move: ${index}${x}${y}`)
      $.get(`/game/move/${index}${x}${y}`, function() {
        let direction = index === 1 ? "#preHor" : "#preVer"
        $(`${direction}${x}${y}`).replaceWith(`<div class='takenLine${index === 1 ? "Hor" : "Ver"}'></div>`)
        gameboard.updateBoard()
      })
    },
    updateBoard() {
      $.get("/game/json", data => {
        const statusMapping = { "-": "square-", "B": "squareB", "R": "squareR", "G": "squareG", "Y": "squareY" }
        const playerMapping = { 
          0: "/assets/images/playerBlue.png",
          1: "/assets/images/playerRed.png",
          2: "/assets/images/playerGreen.png",
          3: "/assets/images/playerYellow.png"
        }
        $.each(data.field.status, (_, element) =>
          $(`#cell-${element.row}${element.col}`).html(`<div class='${statusMapping[element.value]}'></div>`)
        )
        if (!data.field.gameEnded) {
          $("#turn").html($(`<img src='${playerMapping[data.field.currentPlayer]}'>`).clone()).append("<h1>Turn</h1>")
        } else {
          const winner = data.field.winner
          if (winner === "It's a draw!") {
            $("#turn").html(`<h1>${winner}</h1>`)
            console.log("It's a draw!")
          } else {
            const winnerColor = winner.split(" ")[1].toLowerCase()
            const winnerIndex = {"blue":0,"red":1,"green":2,"yellow":3}[winnerColor]
            $("#turn").html($(`<img src='${playerMapping[winnerIndex]}'>`).clone()).append("<h1>wins!</h1>")
            console.log(`Player ${winnerColor} wins!`)
          }
        }
      })
    }
  },
  template:
  `
    <div class="containerh pt-5 pb-3">
      <template v-if="!gameEnded">
        <div class="playerTurnImg" id="turn">
          <img v-if="currentPlayer === 0" src='/assets/images/playerBlue.png'>
          <img v-else-if="currentPlayer === 1" src='/assets/images/playerRed.png'>
          <img v-else-if="currentPlayer === 2" src='/assets/images/playerGreen.png'>
          <img v-else-if="currentPlayer === 3" src='/assets/images/playerYellow.png'>
          <h1>Turn</h1>
        </div>
      </template>
      <template v-else>
        <div class="playerWonImg">
          <template v-if="winner === 'It\\'s a draw!'">
            <h1>It's a draw!</h1>
          </template>
          <template v-else>
            <img :src="'/assets/images/player' + matchingWinner() + '.png'">
            <h1>wins!</h1>
          </template>
        </div>
      </template>
    </div>

    <div id="board">
      <template v-for="row in colSize">
        <template v-for="col in rowSize">
          <div class="dot"></div>
          <div v-if="matchingValue('hor', (row-1), (col-1)) === true" class="takenLineHor"></div>
          <button @click='doMove(1, (row-1), (col-1))' v-else class="preBorderHor" :id="'preHor' + (row-1) + (col-1)">
            <div class="preLineHor"></div>
          </button>
        </template>
        <div class="dot"></div>

        <template v-for="col in rowSize+1">
          <div v-if="matchingValue('ver', (row-1), (col-1)) === true" class="takenLineVer"></div>
          <button @click='doMove(2, (row-1), (col-1))' v-else class="preBorderVer" :id="'preVer' + (row-1) + (col-1)">
            <div class="preLineVer"></div>
          </button>
          <template v-if="col !== rowSize+1">
            <div :class="'square' + matchingStatus((row-1), (col-1))" :id="'cell' + matchingStatus((row-1), (col-1)) + (row-1) + (col-1)"></div>
          </template>
        </template>
      </template>

      <template v-for="col in rowSize">
        <div class="dot"></div>
        <div v-if="matchingValue('hor', colSize, (col-1)) === true" class="takenLineHor"></div>
        <button @click='doMove(1, colSize, (col-1))' v-else class="preBorderHor" :id="'preHor' + colSize + (col-1)">
          <div class="preLineHor"></div>
        </button>
      </template>
      <div class="dot"></div> 
    </div>

  	<div class="container3 mb-5">
      <div id="scoreboard">
        <template v-for="player in playerList">
        <div class="player">
          <img :src="'/assets/images/player' + matchingPlayer(player.index) + '.png'">
          <h2>{{ player.points }}</h2>
        </div>
        </template>
      </div>
    </div>
  `
}).mount('#gameboard')
