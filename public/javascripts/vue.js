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
          
        }
      }
    },
    matchingValue(direction, row, col) {
      if (direction === 'hor') {
        return !!(this.rows.find((item) => item.row === row && item.col === col && item.value === true))
      } else {
        return !!(this.cols.find((item) => item.row === row && item.col === col && item.value === true))
      }
    },
    matchingStatus(row, col) {
      return (this.status.find((item) => item.row === row && item.col === col)).value
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
        const currPlayerMapping = { 
          0: "/assets/images/playerBlue.png",
          1: "/assets/images/playerRed.png",
          2: "/assets/images/playerGreen.png",
          3: "/assets/images/playerYellow.png"
        }

        $.each(data.field.status, (_, element) =>
          $(`#cell-${element.row}${element.col}`).html(`<div class='${statusMapping[element.value]}'></div>`)
        )
        if (!data.field.gameEnded) {
          $("#turn").html($(`<img src='${currPlayerMapping[data.field.currentPlayer]}'>`).clone()).append("<h1>Turn</h1>")
        }

        /*else {
          const winner = data.field.winner
          if (winner === "It's a draw!b") {
            console.log("It's a draw!")
            $("#turn").html(`<h1>${winner}</h1>`)
          } else {
            const playerColor = winner.match(/Player (\w+) wins!/)[1]
            console.log(`${winner} wins!`)
            $("#turn").html($(`#img${playerColor}`).clone().add(`<h1>${winner} wins!b</h1>`))
          }
        }*/
          /*else {
            switch (data.field.winner) {
              case "Player Blue wins!":
                displayWinner("Player Blue", $("#imgBlue"))
                break
              case "Player Red wins!":
                displayWinner("Player Red", $("#imgRed"))
                break
              case "Player Green wins!":
                displayWinner("Player Green", $("#imgGreen"))
                break
              case "Player Yellow wins!":
                displayWinner("Player Yellow", $("#imgYellow"))
                break
              case "It's a draw!":
                console.log("It's a draw!")
                $("#turn").html("<h1>It's a draw!</h1>")
                break
              default:
            }
          }*/
        
        
      })
    }
  },
  template:
  `
    <div class="containerh pt-5 pb-3">
      <div class="playerTurnImg" id="turn">
        <img id="imgBlue" v-if="currentPlayer === 0" src='/assets/images/playerBlue.png'>
        <img id="imgRed" v-else-if="currentPlayer === 1" src='/assets/images/playerRed.png'>
        <img id="imgGreen" v-else-if="currentPlayer === 2" src='/assets/images/playerGreen.png'>
        <img id="imgYellow" v-else-if="currentPlayer === 3" src='/assets/images/playerYellow.png'>
        <h1>Turn</h1>
      </div>
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
  `
}).mount('#gameboard')
