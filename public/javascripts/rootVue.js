export const root = {
  data() {
    return {
      show: sessionStorage.getItem('show') || 'index'
    }
  },
  methods: {
    showIndex() {
      this.show = 'index'
      sessionStorage.setItem('show', 'index')
    },
    showGame() {
      this.show = 'game'
      sessionStorage.setItem('show', 'game')
    },
    scrollTo(id) {
      this.show = 'index'
      this.$nextTick(() => {
        const element = document.getElementById(id)
        if (element) {element.scrollIntoView({ behavior: 'smooth' })}
      })
    }
  },
  template:
  ` 
    <template v-if="show === 'index'">
      <index-page @display-game='showGame' @scroll-to="scrollTo"></index-page>
      <game-footer></game-footer>
    </template>

    <template v-else-if="show === 'game'">
      <game-bar @display-index='showIndex' @scroll-to="scrollTo"></game-bar>
      <game-board></game-board>
      <game-footer></game-footer>
    </template>
  `
}
  