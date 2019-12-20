const USED = -1; //letter has been used, not available anymore
const AVAIL = 1; //letter has not been used yet

// eslint-disable-next-line no-unused-vars
function Alphabet() {
  this.letters = undefined;

  this.initialize = function() {
    this.letters = {
      A: AVAIL,
      B: AVAIL,
      C: AVAIL,
      D: AVAIL,
      E: AVAIL,
      F: AVAIL,
      G: AVAIL,
      H: AVAIL,
      I: AVAIL,
      J: AVAIL,
      K: AVAIL,
      L: AVAIL,
      M: AVAIL,
      N: AVAIL,
      O: AVAIL,
      P: AVAIL,
      Q: AVAIL,
      R: AVAIL,
      S: AVAIL,
      T: AVAIL,
      U: AVAIL,
      V: AVAIL,
      W: AVAIL,
      X: AVAIL,
      Y: AVAIL,
      Z: AVAIL
    };
  };

  //is it a valid letter?
  this.isLetter = function(letter) {
    console.assert(typeof letter === "string", "Single string expected");
    return Object.prototype.hasOwnProperty.call(this.letters,letter);
  };

  //is it an available letter?
  this.isLetterAvailable = function(letter) {
    console.assert(typeof letter === "string", "Single string expected");
    return this.isLetter(letter) && this.letters[letter] == AVAIL;
  };

  this.makeLetterUnAvailable = function(letter) {
    console.assert(typeof letter === "string", "Single string expected");
    if (this.isLetter(letter)) {
      this.letters[letter] = USED;

      //visually switch off the UI element by simply adding a classname
      document.getElementById(letter).className += " alphabetUsed";
    }
  };

  //does the letter appear in the word?
  this.isLetterIn = function(letter, word) {
    console.assert(typeof letter === "string", "String expected");
    console.assert(typeof word === "string", "String expected");

    if (!this.isLetter(letter) || !this.isLetterAvailable(letter)) {
      return false;
    }
    return word.indexOf(letter) >= 0;
  };

  //letter locations in the word
  this.getLetterInWordIndices = function(letter, word) {
    console.assert(typeof letter === "string", "String expected");
    console.assert(typeof word === "string", "String expected");

    var res = [];

    if (!this.isLetterIn(letter, word)) {
      console.log("Letter [%s] is not in target word [%s]!", letter, word);
      return res;
    }

    for (let i = 0; i < word.length; i++) {
      if (word.charAt(i) == letter) {
        res.push(i);
      }
    }
    return res;
  };
}