/*
 * Object representing the (un)hidden word.
 */

// eslint-disable-next-line no-unused-vars
function VisibleWordBoard() {
  //set hidden word in the correct div element
  this.setWord = function(visibleWord) {
    console.assert(
      Array.isArray(visibleWord) || typeof visibleWord == "string",
      "Expecting an array, got a %s instead"
    );

    if (Array.isArray(visibleWord)) {
      document.getElementById("hiddenWord").innerHTML = visibleWord.join("");
    } else {
      document.getElementById("hiddenWord").innerHTML = visibleWord;
    }
  };
}

/*
 * Function creating the necessary balloons;
 * a number between 1 and 8 is expected in config.js
 */

// eslint-disable-next-line no-unused-vars
function createBalloons() {
  let div = document.getElementById("balloons");
  let colorStart = 111;
  //add balloon elements, starting at the highest id (in sync with other code pieces)
  // eslint-disable-next-line no-undef
  for (let i = Setup.MAX_ALLOWED_GUESSES; i >= 1; i--) {
    let b = document.createElement("div");
    b.className = "balloon";
    b.setAttribute("id", "b" + i);
    b.style.backgroundColor = "#" + colorStart;
    colorStart += 111;
    div.appendChild(b);
  }
}

/*
 * Object representing the status bar.
 */

// eslint-disable-next-line no-unused-vars
function StatusBar() {
  this.setStatus = function(status) {
    document.getElementById("statusbar").innerHTML = status;
  };
}
