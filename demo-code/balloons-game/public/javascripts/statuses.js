/* ESLint global variables information */
/* global Setup */
var Status = {};
Status["gameWon"] = "Congratulations! You won!";
Status["gameLost"] = "Game over. You lost!";
Status["playAgain"] = " <a href='/play'>Play again!</a>";
Status["player1Intro"] =
  "Player 1. Pick the English word to guess (5-15 [A-Z] chars)!";
Status["prompt"] = "Word to guess";
Status["promptAgainLength"] = "Try again! 5-15 [A-Z] characters please!";
Status["promptChars"] = "Try again! A-Z only!";
Status["promptEnglish"] = "Try again, it has to be a valid English word!";
Status["chosen"] = "Your chosen word: ";
Status["player2Intro"] =
  "Player 2. You win if you can guess the word within " +
  Setup.MAX_ALLOWED_GUESSES +
  " tries.";
Status["player2IntroNoTargetYet"] =
  "Player 2. Waiting for word to guess. You win if you can guess it within " +
  Setup.MAX_ALLOWED_GUESSES +
  " tries.";
Status["guessed"] = "Player 2 guessed letter ";
Status["aborted"] =
  "Your gaming partner is no longer available, game aborted. " +
  Status["playAgain"];
