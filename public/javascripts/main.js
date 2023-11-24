document.addEventListener("DOMContentLoaded", function () {

    function toggleHorizontalClasses(button) {
      button.classList.toggle("preBorderHor");
      button.classList.toggle("takenLineHor");
      button.querySelector(".preLineHor").style.display = "none";
      button.disabled = true;
    }

    function toggleVerticalClasses(button) {
      button.classList.toggle("preBorderVer");
      button.classList.toggle("takenLineVer");
      button.querySelector(".preLineVer").style.display = "none";
      button.disabled = true;
    }

    let preBorderHorButtons = document.querySelectorAll(".preBorderHor");
    preBorderHorButtons.forEach(function(button) {
      button.addEventListener("click", function () {
        toggleHorizontalClasses(button);
      });
    });

    let preBorderVerButtons = document.querySelectorAll(".preBorderVer");
    preBorderVerButtons.forEach(function(button) {
      button.addEventListener("click", function () {
        toggleVerticalClasses(button);
      });
    });
});