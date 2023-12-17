import $ from 'jquery'

export const dotsandboxes = {
    data() {
        return {
            websocket: new WebSocket("ws://localhost:9000/websocket"),
            rowSize: 8,
            colSize: 0,
            currentPlayer: 0,
            playerList: [],
            rows: [],
            cols: [],
            status: [],
            gameEnded: false,
            winner: 'undefined'
        }
    },
    methods: {
        initData() {
            $.get("/game/json", data => { Object.assign(this, data.field) })
        },
        connectWebSocket() {
            this.websocket.onopen = () => console.log("Successfully connected to WebSocket")
            this.websocket.onclose = () => console.log("Connection with WebSocket closed!")
            this.websocket.onerror = (error) => console.log("Error in WebSocket occurred: " + error)
            this.websocket.onmessage = msg => { if (typeof msg.data === "string") { this.updateBoard() } }
        },
        matchingValue(direction, row, col) {
            return !!((direction === 'hor' ? this.rows : this.cols)
                .find(item => item.row === row && item.col === col && item.value === true))
        },
        matchingStatus(row, col) {
            return (this.status.find((item) => item.row === row && item.col === col)).value
        },
        matchingWinner() {
            return this.winner.split(" ")[1]
        },
        matchingPlayer(index) {
            return { 0: "Blue", 1: "Red", 2: "Green", 3: "Yellow" }[index]
        },
        doMove(index, x, y) {
            console.log(`move: ${index}${x}${y}`)
            $.get(`/game/move/${index}${x}${y}`, () => { this.updateBoard() })
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
                data.field.playerList.forEach((element, playerIndex) => $(`#player${playerIndex}`).find('h2').html(element.points))
                data.field.status.forEach(element => {
                    const [value, row, col] = [element.value, element.row, element.col]
                    $(`#cell${row}${col}`).replaceWith(`<div class='${statusMapping[value]}' id='cell${row}${col}'></div>`)
                })
                if (!data.field.gameEnded) {
                    $("#turn").html($(`<img src='${playerMapping[data.field.currentPlayer]}'>`)).append("<h1>Turn</h1>")
                } else {
                    const winner = data.field.winner
                    if (winner === "It's a draw!") {
                        $("#turn").html(`<h1>${winner}</h1>`)
                        console.log("It's a draw!")
                    } else {
                        const winnerColor = winner.split(" ")[1].toLowerCase()
                        const winnerIndex = { "blue": 0, "red": 1, "green": 2, "yellow": 3 }[winnerColor]
                        $("#turn").html($(`<img src='${playerMapping[winnerIndex]}'>`)).append("<h1>wins!</h1>")
                        console.log(`Player ${winnerColor} wins!`)
                    }
                }
                data.field.rows.forEach(element => {
                    const [x, y] = [element.row, element.col]
                    if (!element.value) {
                        $(`#takenHor${x}${y}`).replaceWith(
                            $(`<button class="preBorderHor" id="preHor${x}${y}">
                    <div class="preLineHor"></div>
                  </button>`).click(() => this.doMove(1, x, y))
                        )
                    } else {
                        $(`#preHor${x}${y}`).replaceWith(`<div class='takenLineHor' id='takenHor${x}${y}'></div>`)
                    }
                })
                data.field.cols.forEach(element => {
                    const [x, y] = [element.row, element.col]
                    if (!element.value) {
                        $(`#takenVer${x}${y}`).replaceWith(
                            $(`<button class="preBorderVer" id="preVer${x}${y}">
                    <div class="preLineVer"></div>
                  </button>`).click(() => this.doMove(2, x, y))
                        )
                    } else {
                        $(`#preVer${x}${y}`).replaceWith(`<div class='takenLineVer' id='takenVer${x}${y}'></div>`)
                    }
                })
            })
        }
    }
}
