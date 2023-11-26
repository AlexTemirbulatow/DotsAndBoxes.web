function move(index, row, col) {
  let move = index + row + col;
  sendRequest(
    'GET',
    'http://localhost:9000/game/move/' + move,
    function() {
        location.reload()
    }
  );
}

function undo() {
  sendRequest(
    'GET',
    'http://localhost:9000/game/move/undo',
    function() {
        location.reload()
    }
  );
}

function redo() {
  sendRequest(
    'GET',
    'http://localhost:9000/game/move/redo',
    function() {
      location.reload()
    }
  );
}

function save() {
  sendRequest(
    'GET',
    'http://localhost:9000/game/save',
    function () {
      location.reload();
    }
  );
}

function load() {
  sendRequest(
    'GET',
    'http://localhost:9000/game/load',
    function () {
      location.reload();
    }
  );
}


function sendRequest(method, url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status == 200) {
        callback(xhr.responseText);
      }
  };
  xhr.send();
}
