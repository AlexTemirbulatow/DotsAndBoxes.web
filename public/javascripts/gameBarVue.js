import { gameboard } from './gameboardVue.js'

export const gameBar = {
  emits: ['display-index', 'scroll-to'],
  methods: {
    displayIndex() {
      this.$emit('display-index')
    },
    scrollHandler(toId) {
      this.$emit('scroll-to', toId)
    },
    undoredo(type) {
      console.log(`move: ${type}`)
      $.get(`/game/move/${type}`, () => {
        gameboard.methods.updateBoard.call(gameboard)
      })
    },
    synchronize(type) {
      console.log(type === "load" ? "loading last gamestate" : "saving current gamestate")
      $.get(`/game/${type}`, () => {
        gameboard.methods.updateBoard.call(gameboard)
      })
    }
  },
  template:
  `
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container">
        <a class="navbar-brand fs-4 my-2" @click="displayIndex" type="button">
          <img src="assets/images/0_Logo.png" width="13%" alt="Logo">
          <span class="logo p-3">Dots And Boxes</span>
        </a>
        <button 
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="sidebar offcanvas offcanvas-start"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header text-white border-bottom">
            <h5 class="offcanvas-title"
            id="offcanvasNavbarLabel">Menu</h5>
            <button
              type="button"
              class="btn-close btn-close-white shodow-none"
              data-bs-dismiss="offcanvas"
              aria-label="Close">
            </button>
          </div>
          <div class="offcanvas-body d-flex flex-column flex-lg-row p-4 p-lg-0">
            <ul class="navbar-nav justify-content-center
            align-items-center fs-5 flex-grow-1 pe-3">
              <li class="nav-item mx-2">
                <a class="nav-link" @click="displayIndex" type="button">Home</a>
              </li>
              <li class="nav-item mx-2">
                <a class="nav-link active" aria-current="page" type="button">Game</a>
              </li>
              <li class="nav-item mx-2">
                <a class="nav-link" @click="scrollHandler('rules')" type="button">Rules</a>
              </li>
              <li class="nav-item mx-2">
                <a class="nav-link" @click="scrollHandler('github')" type="button">GitHub</a>
              </li>
            </ul>
            <div class="d-flex justify-content-center align-items-center gap-3">
              <button class="operation" @click="undoredo('undo')"><h4><i class="bi bi-arrow-counterclockwise"></i></h4></button>
              <button class="operation" @click="undoredo('redo')"><h4><i class="bi bi-arrow-clockwise"></i></h4></button>
              <button class="operation" @click="synchronize('save')"><h5><i class="bi bi-plus-square"></i></h5></button>
              <button class="operation mt-1" @click="synchronize('load')"><h4><i class="bi bi-box-arrow-down"></i></h4></button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `
}
  