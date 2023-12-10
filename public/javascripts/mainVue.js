import { gameBar } from './gameBarVue.js'
import { gameboard } from './gameboardVue.js'
import { gameFooter } from './gameFooterVue.js'

const app = Vue.createApp({})
app.component('game-board', gameboard)
app.component('game-bar-nav', gameBar)
app.component('game-footer', gameFooter)
app.mount('#app')
