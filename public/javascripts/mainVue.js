import { root } from './rootVue.js'
import { index } from './indexVue.js'
import { gameBar } from './gameBarVue.js'
import { gameboard } from './gameboardVue.js'
import { gameFooter } from './gameFooterVue.js'

const app = Vue.createApp(root)
app.component('index-page', index)
.component('game-bar', gameBar)
.component('game-board', gameboard)
.component('game-footer', gameFooter)
.mount('#app')
