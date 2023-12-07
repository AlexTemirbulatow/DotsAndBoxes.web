const app = Vue.createApp({
    data() {
        return {
            count: 4,
            players: ''

        
        }
    },
    methods: {
        sendAjax() {
            $.get("/game/json", function(data) {
                this.players = data.status
            })
        }
    }
}).mount('#app')
