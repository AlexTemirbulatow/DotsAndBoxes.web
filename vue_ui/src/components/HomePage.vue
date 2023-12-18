<template>
  <q-page class="text-header">
    <h1 style="font-size: 4rem;">
      <span class="mini">Minigame</span><br>
      Dots And Boxes
    </h1>
    <div style="max-width: 570px;">
      <p>
        Dots and Boxes has classically been played on paper using
        pencils. It was first described by a French mathematician, Édouard
        Lucas, in the 19th century. Mr. Lucas called it La Pipopipette.
      </p>
    </div>
    <div id="playbtn" @click="displayGame" type="button">
      Play Now
      <span></span>
    </div>
  </q-page>


  <section id="rules" style="padding-top: 4rem;">
    <div style="max-width: 1300px; margin: 0 auto;">
      <div style="display: flex; justify-content: center;">
        <h3 style="margin-top: 5rem; margin-bottom: 5rem; text-align: center;">How To Play</h3>
      </div>
      <div style="display: flex; justify-content: center; text-align: start;">
        <div style="flex: 1; margin-bottom: 3rem; display: flex; align-items: center; justify-content: center;">
          <img style="max-width: 75%;" src="images/rulesEg.png" alt="GUI Bild">
        </div>
        <div style="flex: 1; display: flex; justify-content: center; flex-direction: column;">
          <h4>Rules</h4>
          <p style="font-size: 1.25rem; color: #fff;">
            You move by taking a horizontal or vertical line
            between two dots. When you place the last line that
            forms a box, the box and its content are yours. The
            players move in turn, but whenever a player takes a
            box, they must move again. One box is one point.

            The game ends when all boxes have been taken.

            The player with the highest score wins.
            It's a tie if two players get the same highest score.

            2-4 player mode.
          </p>
          <h4>Strategy</h4>
          <p style="font-size: 1.25rem; color: #fff;">
            Most novice players always claim a box if they can,
            but expert players take time to consider double crossing
            their opponent. A double cross is when you give a short
            chain of boxes to your opponent and then leave them with
            no choice but to create a long chain for you on the next
            turn. It is the key to winning!
          </p>
        </div>
      </div>
    </div>
  </section>

  <section id="github" style="padding-top: 4rem; margin-bottom: 100px;">
    <div style="max-width: 1300px; margin: 0 auto;">
      <div style="display: flex; justify-content: center;">
        <h3 style="text-align: center;">How To Play</h3>
      </div>
      <div style="display: flex; justify-content: center; text-align: start;">
        <div style="flex: 1; display: flex; align-items: center; justify-content: center;">
          <img style="max-width: 50%;" src="images/githubLogo.png" alt="GUI Bild">
        </div>
        <div style="flex: 1; display: flex; justify-content: center; flex-direction: column;">
          <h4>Get Your Own Version On GitHub</h4>
          <p>
            Get a free version of this game, written in scala 3. Feel
            free to contribute to an open-source project done for the
            class 'software engineering' at htwg constance using functional
            programming. Read the usage before trying the GUI and TUI. Have fun!
          </p>
          <q-btn align="between" class="btn" style="width: 25%;" color="primary"
            href="https://github.com/AlexTemirbulatow/de.htwg.se.DotsAndBoxes" label="Learn More" icon="arrow_right"
            target="_blank" />
        </div>
      </div>
    </div>
  </section>

  <div class="text-header" style="justify-content: center;">
    <p>Copyright &copy; 2023 DotsAndBoxes</p>
  </div>
</template>

<script>
export default {
  emits: ['display-game'],
  methods: {
    displayGame() {
      this.$emit('display-game')
    }
  }

}
</script>

<style scoped>
.text-header {
  background: url('../../public/images/header.png');
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

p {
  color: aliceblue;
  font-family: 'Segoe UI Light', sans-serif;
  font-size: 20.8px;
}
</style>