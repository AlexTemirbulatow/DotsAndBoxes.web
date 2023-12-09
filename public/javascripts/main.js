$(document).ready(function() {
  $(".preBorderHor").hover(function() {
    $(this).addClass("preBorderHorHovered");
  }, function() {
    $(this).removeClass("preBorderHorHovered");
  });

  $(".preBorderVer").hover(function() {
    $(this).addClass("preBorderVerHovered");
  }, function() {
    $(this).removeClass("preBorderVerHovered");
  });

  $("#playbtn")
  .on("mouseenter", function(e) {
    let parentOffset = $(this).offset(),
    relX = e.pageX - parentOffset.left,
    relY = e.pageY - parentOffset.top;
    $(this).find("span").css({
      top: relY,
      left: relX,
    });
  })
  .on("mouseout", function(e) {
    let parentOffset = $(this).offset(),
    relX = e.pageX - parentOffset.left,
    relY = e.pageY - parentOffset.top;
    $(this).find("span").css({
      top:relY,
      left: relX,
    });
  });

  registerJson();
  connectWebSocket();

});

function registerJson() {
  $.get("/game/json", function(data) {
    registerStatus(data.field.status);
    registerLines(data.field.rows, "preHor", 1);
    registerLines(data.field.cols, "preVer", 2);
  });
}

function registerStatus(status) {
  $.each(status, function(_, element) {
    let x = element.row;
    let y = element.col;
    switch (element.value) {
      case "B":
        $(`#cellBlue${x}${y}`).html("<div class='squareBlue'></div>");
        break;
      case "R":
        $(`#cellRed${x}${y}`).html("<div class='squareRed'></div>");
        break;
      case "G":
        $(`#cellGreen${x}${y}`).html("<div class='squareGreen'></div>");
        break;
      case "Y":
        $(`#cellYellow${x}${y}`).html("<div class='squareYellow'></div>");
        break;
      case "-":
        $(`#cellEmpty${x}${y}`).html("<div class='squareEmpty'></div>");
        break;
    }
  });
}

function registerLines(moveDirections, prefix, vecIndex) {
  $.each(moveDirections, function(_, element) {
    let x = element.row;
    let y = element.col;
    if (!element.value) {
      $(`#${prefix}${x}${y}`).html(
        `<button class='preBorder${vecIndex === 1 ? "Hor" : "Ver"}' onclick='doMove(${vecIndex},${x},${y})'>
          <div class='preLine${vecIndex === 1 ? "Hor" : "Ver"}'></div>
        </button>`
      );
    } else {
      $(`#${prefix}${x}${y}`).html(`<div class='takenLine${vecIndex === 1 ? "Hor" : "Ver"}'></div>`);
    }
  });
}

function doMove(vecIndex, x, y) {
  let preLineDirections = vecIndex === 1 ? "#preHor" : "#preVer";
  $(`${preLineDirections}${x}${y}`).html(`<div class='takenLine${vecIndex === 1 ? "Hor" : "Ver"}'></div>`);

  moveOnServer(`${vecIndex}${x}${y}`, function() {
    updateStatus();
    updateTurn();
    updateScoreboard();
  });
}

function moveOnServer(move, callback) {
  $.get(`/game/move/${move}`, function() {
    console.log(`Move on server (${move})`);
  }).done(callback);
}

function updateStatus() {
  $.get("/game/json", data => {
    const classMapping = { "-": "square-", "B": "squareB", "R": "squareR", "G": "squareG", "Y": "squareY" };
    $.each(data.field.status, (_, element) => 
      $(`#cell-${element.row}${element.col}`).html(`<div class='${classMapping[element.value]}'></div>`));
  });;
}

function updateTurn() {
  $.get("/game/json", function(data) {
    if (!data.field.gameEnded) {
      switch (data.field.currentPlayer) {
        case 0:
          $("#turn").html($("#imgBlue").clone());
          break;
        case 1:
          $("#turn").html($("#imgRed").clone());
          break;
        case 2:
          $("#turn").html($("#imgGreen").clone());
          break;
        case 3:
          $("#turn").html($("#imgYellow").clone());
          break;
      }
      $("#turn").append("<h1>Turn</h1>");
    } else {
      switch (data.field.winner) {
        case "Player Blue wins!":
          displayWinner("Player Blue", $("#imgBlue"));
          break;
        case "Player Red wins!":
          displayWinner("Player Red", $("#imgRed"));
          break;
        case "Player Green wins!":
          displayWinner("Player Green", $("#imgGreen"));
          break;
        case "Player Yellow wins!":
          displayWinner("Player Yellow", $("#imgYellow"));
          break;
        case "It's a draw!":
          console.log("It's a draw!");
          $("#turn").html("<h1>It's a draw!</h1>");
          break;
      }
    }
  });
}

function displayWinner(winner, image) {
  console.log(`${winner} wins!`);
  $("#turn").html(image.clone());
  $("#turn").append("<h1>wins!</h1>");
}

function updateScoreboard() {
  $.get("/game/json", function(data) {
    $.each(data.field.playerList, function(playerIndex, element) {
      switch (element.index) {
        case 0:
          $(`#player${playerIndex}`).find('h2').html(element.points)
          break;
        case 1:
          $(`#player${playerIndex}`).find('h2').html(element.points)
          break;
        case 2:
          $(`#player${playerIndex}`).find('h2').html(element.points)
          break;
        case 3:
          $(`#player${playerIndex}`).find('h2').html(element.points)
          break;
      }
    });
  });
}

function undo() {
  moveOnServer("undo", function() {
    registerJson();
    updateTurn();
    updateScoreboard();
  });
}

function redo() {
  moveOnServer("redo", function() {
    registerJson();
    updateStatus();
    updateTurn();
    updateScoreboard();
  });
}

function save() {
  $.get("/game/save", function() {
    console.log("Saving current gamestate.");
  })
}

function load() {
  $.get("/game/load", function() {
    console.log("Loading last gamestate.");
    registerJson();
    updateStatus();
    updateTurn();
    updateScoreboard();
  })
}

function connectWebSocket() {
  var websocket = new WebSocket("ws://localhost:9000/websocket");

  websocket.onopen = function() {
    console.log("Successfully connected to WebSocket");
  }
  websocket.onclose = function() {
    console.log("Connection with WebSocket closed!");
  }
  websocket.onerror = function(error) {
    console.log("Error in WebSocket occured: " + error);
  }

  websocket.onmessage = function(msg) {
    if (typeof msg.data === "string") {
      registerJson();
      updateStatus();
      updateTurn();
      updateScoreboard();
    }
  }
}


/*
<div class="containerh pt-5 pb-3">
  @if(!controller.gameEnded) {
    <div class="playerTurnImg" id="turn">
      @controller.currentPlayer match {
        case "Blue" => {@playerBlue}
        case "Red" => {@playerRed}
        case "Green" => {@playerGreen}
        case "Yellow" => {@playerYellow}
      }
      <h1>Turn</h1>
    </div>
  } else {
    <div class="playerWonImg">
      @controller.winner.substring(7) match {
        case "Blue wins!" => {@playerBlue}
        case "Red wins!" => {@playerRed}
        case "Green wins!" => {@playerGreen>}
        case "Yellow wins!" => {@playerYellow}
        case _ => {<h1>It's a draw!</h1>}
      }
      @if(!controller.winner.equals("It's a draw!")) {
        <h1>wins!</h1>
      }
    </div>
  }
</div>

  <div class="container3 mb-5">
    <div id="scoreboard">
      @for(player <- 0 until controller.playerList.size) {
        <div class="player" id="player@player">
          @controller.playerList(player).playerId match {
            case "Blue" => {@playerBlue}
            case "Red" => {@playerRed}
            case "Green" => {@playerGreen}
            case "Yellow" => {@playerYellow}
          }
          <h2>@controller.playerList(player).points</h2>
        </div>
      }
    </div>
  </div>*/