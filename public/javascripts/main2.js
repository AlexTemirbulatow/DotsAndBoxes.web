import { gameboard } from './gameboardVue.js'
import { gameBar } from './gameBarVue.js'

const app = Vue.createApp({})
app.component('game-board', gameboard)
app.component('game-bar-nav', gameBar)
app.mount('#app')
