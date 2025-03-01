<template>
  <q-page class="text-header">
    <h1 class="main-title">
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
    <q-btn id="playbtn" @click="displayGame">
      Play Now
    </q-btn>
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
        <h3 style="text-align: center;">Open Source</h3>
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
  methods: {
    displayGame() {
      this.$router.push('/game')
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

.main-title {
  font-size: 4rem;
  margin-bottom: 20px;
}

.mini {
  font-family: "Lilita One", sans-serif;
  font-size: 3vh;
}

#playbtn {
  font-family: Lilita One, sans-serif;
  display: inline-block;
  position: relative;
  padding: 14px 40px;
  margin-top: 20px;
  color: #4a3e6dbc;
  background-color: #0CFFE1;
  box-shadow: 10px 10px 6px #4a3e6db6;
  border-radius: 10px;
  font-size: 30px;
  font-weight: 500px;
  letter-spacing: 3px;
  text-transform: capitalize;
  text-decoration: none;
  overflow: hidden;
  z-index: 1;
}

#playbtn span {
  display: block;
  width: 0px;
  height: 0px;
  background-color: #FF217C;
  position: absolute;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s ease 0s, height 0.6s ease 0s;
  z-index: -1;
}

#playbtn:hover span {
  width: 562px;
  height: 562px;
}

</style>
