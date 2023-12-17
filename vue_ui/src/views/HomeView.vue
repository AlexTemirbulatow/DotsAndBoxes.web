<template>
  <router-link to="/">Home</router-link> |
  <router-link to="/game">Game</router-link>
  <h1>This is homeview</h1>

  <section id="rules" class="pt-4">
    <div class="container">
      <div class="d-flex justify-content-center">
        <h1 class="mt-5 mb-5 text-center">How To Play</h1>
      </div>
      <div class="row justify-content-md-center text-md-start text-center">
        <div class="col-md-6 mb-3 d-flex align-items-center justify-content-center">
          <img class="img-fluid w-75"
          src="../assets/rulesEg.png"
          alt="GUI Bild">
        </div>
        <div class="col-md-6 d-flex justify-content-center flex-column">
          <h2 class="navbar-nav">Rules</h2>
          <p class="lead text-white">
            You move by taking a horizontal or vertical line
            between two dots. When you place the last line that
            forms a box, the box and its content are yours. The
            players move in turn, but whenever a player takes a
            box, they must move again. One box is one point.

            The game ends when all boxes have been taken.

            The player with the highest score wins.
            It's a tie if two players got the same highest score.

            2-4 player mode.
          </p>
          <h2 class="navbar-nav">Strategy</h2>
          <p class="lead text-white">
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
  
  <section id="rules" style="padding-top: 4rem;">
    <div style="max-width: 800px; margin: 0 auto;">
      <div style="display: flex; justify-content: center;">
        <h1 style="margin-top: 5rem; margin-bottom: 5rem; text-align: center;">How To Play</h1>
      </div>
      <div style="display: flex; justify-content: center; text-align: start;">
        <div style="flex: 1; margin-bottom: 3rem; display: flex; align-items: center; justify-content: center;">
          <img style="max-width: 75%;" src="../assets/rulesEg.png" alt="GUI Bild">
        </div>
        <div style="flex: 1; display: flex; justify-content: center; flex-direction: column;">
          <h2 style="font-family: Arial, sans-serif;">Rules</h2>
          <p style="font-size: 1.25rem; color: #fff;">
            You move by taking a horizontal or vertical line between two dots. When you place the last line that forms a box, the box and its content are yours. The players move in turn, but whenever a player takes a box, they must move again. One box is one point.

            The game ends when all boxes have been taken.

            The player with the highest score wins.
            It's a tie if two players get the same highest score.

            2-4 player mode.
          </p>
          <h2 style="font-family: Arial, sans-serif;">Strategy</h2>
          <p style="font-size: 1.25rem; color: #fff;">
            Most novice players always claim a box if they can, but expert players take time to consider double crossing their opponent. A double cross is when you give a short chain of boxes to your opponent and then leave them with no choice but to create a long chain for you on the next turn. It is the key to winning!
          </p>
        </div>
      </div>
    </div>
  </section>

</template>


<style>

body h1, 
body h2,
body h5 {
    font-family: "Agbalumo";
    color: #d8d8d8;
}

</style>


<script>

</script>
