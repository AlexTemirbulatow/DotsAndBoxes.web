const app = Vue.createApp({
  data() {
    return {
      websocket: new WebSocket("ws://localhost:9000/websocket"),
      rowSize: 0,
      colSize: 0,
      playerSize: 0,
      currentPlayer: 0,
      playerList: [],
      gameEnded: false,
      winner: '',
      rows: [],
      cols: [],
      status: [],
      statusValue: 'undefined'
    }
  },
  created() {
    this.connectWebSocket2()
  },
  methods: {
    connectWebSocket2() {
      this.websocket.onopen = () => console.log("Successfully connected to WebSocket2");
      this.websocket.onclose = () => console.log("Connection with WebSocket2 closed!");
      this.websocket.onerror = (error) => console.log("Error in WebSocket occurred: " + error);

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
    }
  },
  mounted() {
    $.get("/game/json", function(data) {
      app.rowSize = data.field.rowSize
      app.colSize = data.field.colSize
      app.playerSize = data.field.playerSize
      app.currentPlayer = data.field.currentPlayer
      app.playerList = data.field.playerList
      app.gameEnded = data.field.gameEnded
      app.winner = data.field.winner
      app.rows = data.field.rows
      app.cols = data.field.cols
      app.status = data.field.status
    })
  },
  template: `
    <div id="board">
      <template v-for="row in colSize">
        <template v-for="col in rowSize">
          <div class="dot"></div>
          <div v-if="matchingValue('hor', (row-1), (col-1)) === true" class="takenLineHor" :id="'takenHor' + (row-1) + (col-1)"></div>
          <button v-else class="preBorderHor" :id="'preHor' + (row-1) + (col-1)">
            <div class="preLineHor"></div>
          </button>
        </template>
        <div class="dot"></div>

        <template v-for="col in rowSize+1">
          <div v-if="matchingValue('ver', (row-1), (col-1)) === true" class="takenLineVer" :id="'takenVer' + (row-1) + (col-1)"></div>
          <button v-else class="preBorderVer" :id="'preVer' + (row-1) + (col-1)">
            <div class="preLineVer"></div>
          </button>
          <template v-if="col !== rowSize+1">
            <div :class="'square' + matchingStatus((row-1), (col-1))"></div>
          </template>
        </template>
      </template>

      <template v-for="col in rowSize">
        <div class="dot"></div>
        <div v-if="matchingValue('hor', colSize, (col-1)) === true" class="takenLineHor" :id="'takenHor' + colSize + (col-1)"></div>
        <button v-else class="preBorderHor" :id="'preHor' + colSize + (col-1)">
          <div class="preLineHor"></div>
        </button>
      </template>
      <div class="dot"></div> 
    </div>
  `
}).mount('#app')
