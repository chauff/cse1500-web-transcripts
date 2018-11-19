/* ESLint global variables information */
/* global Setup, Status, Messages, englishDict */

/* basic constructor of game state */
function GameState(visibleWordBoard, sb, socket) {
    this.playerType = null;
    this.MAX_ALLOWED = Setup.MAX_ALLOWED_GUESSES;
    this.wrongGuesses = 0;
    this.visibleWordArray = null;
    this.alphabet = new Alphabet();
    this.alphabet.initialize();
    this.visibleWordBoard = visibleWordBoard;
    this.targetWord = null;
    this.statusBar = sb;

    this.initializeVisibleWordArray = function () {
        this.visibleWordArray = new Array(this.targetWord.length);
        this.visibleWordArray.fill(Setup.HIDDEN_CHAR);
    };

    this.getPlayerType = function () {
        return this.playerType;
    };

    this.setPlayerType = function (p) {
        console.assert(typeof p === "string", "setPlayerType: Expecting a string, got a %s", typeof p);
        this.playerType = p;
    };

    this.setTargetWord = function (w) {
        console.assert(typeof w === "string", "setTargetWord: Expecting a string, got a %s", typeof w);
        this.targetWord = w;
    };

    this.getVisibleWordArray = function () {
        return this.visibleWordArray;
    };

    this.incrWrongGuess = function () {
        this.wrongGuesses++;

        if (this.whoWon() === null) {
            // kill a balloon
            const id = `b${this.wrongGuesses}`;
            document.getElementById(id).className += " balloonGone";
            setTimeout(() => {
                new Audio("../data/pop.wav").play();
            }, 500);
        }
    };

    this.whoWon = function () {
        // too many wrong guesses? Player A (who set the word) won
        if (this.wrongGuesses > Setup.MAX_ALLOWED_GUESSES) {
            return "A";
        }
        // word solved? Player B won
        if (this.visibleWordArray.indexOf("#") < 0) {
            return "B";
        }
        return null; // nobody won yet
    };

    this.revealLetters = function (letter, indices) {
        console.assert(typeof letter === "string", "revealLetters: Expecting a string, got a %s", typeof letter);
        console.assert(indices instanceof Array, "revealLetters: Expecting an array");

        for (let i = 0; i < indices.length; i++) {
            this.visibleWordArray[indices[i]] = letter;
        }
    };

    this.revealAll = function () {
        this.visibleWordBoard.setWord(this.targetWord);
    };

    this.updateGame = function (clickedLetter) {
        console.assert(typeof clickedLetter === "string", "updateGame: Expecting a string, got a %s", typeof clickedLetter);

        const res = this.alphabet.getLetterInWordIndices(clickedLetter, this.targetWord);

        // wrong guess
        if (res.length === 0) {
            this.incrWrongGuess();
        } else {
            this.revealLetters(clickedLetter, res);
        }

        this.alphabet.makeLetterUnAvailable(clickedLetter);
        this.visibleWordBoard.setWord(this.visibleWordArray);

        const outgoingMsg = Messages.O_MAKE_A_GUESS;
        outgoingMsg.data = clickedLetter;
        socket.send(JSON.stringify(outgoingMsg));

        // is the game complete?
        const winner = this.whoWon();

        if (winner !== null) {
            this.revealAll();

            /* disable further clicks by cloning each alphabet
             * letter and not adding an event listener; then
             * replace the original node through some DOM logic
             */
            const elements = document.querySelectorAll(".alphabet");
            Array.from(elements).forEach((e) => {
                const cloned = e.cloneNode(true);
                e.parentNode.replaceChild(cloned, e);
            });

            let alertString;
            if (winner === this.playerType) {
                alertString = Status.gameWon;
            } else {
                alertString = Status.gameLost;
            }
            alertString += Status.playAgain;
            sb.setStatus(alertString);

            // player B sends final message
            if (this.playerType === "B") {
                const finalMsg = Messages.O_GAME_WON_BY;
                finalMsg.data = winner;
                socket.send(JSON.stringify(finalMsg));
            }
            socket.close();
        }
    };
}

function AlphabetBoard(gs) {
    // only initialize for player that should actually be able to use the board
    this.initialize = function () {
        const elements = document.querySelectorAll(".alphabet");
        Array.from(elements).forEach((el) => {
            el.addEventListener("click", function singleClick(e) {
                const clickedLetter = e.target.id;
                new Audio("../data/click.wav").play();
                gs.updateGame(clickedLetter);

                /*
                 * every letter can only be selected once; handling this within
                 * JS is one option, here simply remove the event listener when a click happened
                 */
                el.removeEventListener("click", singleClick, false);
            });
        });
    };
}

// set everything up, including the WebSocket
(function setup() {
    const socket = new WebSocket(Setup.WEB_SOCKET_URL);

    /*
     * initialize all UI elements of the game:
     * - visible word board (i.e. place where the hidden/unhidden word is shown)
     * - status bar
     * - alphabet board
     *
     * the GameState object coordinates everything
     */
    const vw = new VisibleWordBoard();
    const sb = new StatusBar();

    // no object, just a function
    createBalloons();

    const gs = new GameState(vw, sb, socket);
    const ab = new AlphabetBoard(gs);

    socket.onmessage = function (event) {
        const incomingMsg = JSON.parse(event.data);

        // set player type
        if (incomingMsg.type === Messages.T_PLAYER_TYPE) {
            gs.setPlayerType(incomingMsg.data);// should be "A" or "B"

            // if player type is A, (1) pick a word, and (2) sent it to the server
            if (gs.getPlayerType() === "A") {
                sb.setStatus(Status.player1Intro);
                let validWord = -1;
                let promptString = Status.prompt;
                let res = null;

                while (validWord < 0) {
                    res = prompt(promptString);

                    if (res === null) {
                        promptString = Status.prompt;
                    } else {
                        res = res.toUpperCase();

                        if (res.length < Setup.MIN_WORD_LENGTH || res.length > Setup.MAX_WORD_LENGTH) {
                            promptString = Status.promptAgainLength;
                        } else if (/^[a-zA-Z]+$/.test(res) === false) {
                            promptString = Status.promptChars;
                        } else if (englishDict.hasOwnProperty(res.toLocaleLowerCase()) === false) { // dictionary has only lowercase entries
                            promptString = Status.promptEnglish;
                        } else {
                            validWord = 1;
                        }
                    }
                }
                sb.setStatus(Status.chosen + res);
                gs.setTargetWord(res);
                gs.initializeVisibleWordArray(); // initialize the word array, now that we have the word
                vw.setWord(gs.getVisibleWordArray());

                const outgoingMsg = Messages.O_TARGET_WORD;
                outgoingMsg.data = res;
                socket.send(JSON.stringify(outgoingMsg));
            } else {
                sb.setStatus(Status.player2IntroNoTargetYet);
            }
        }

        // Player B: wait for target word and then start guessing ...
        if (incomingMsg.type === Messages.T_TARGET_WORD && gs.getPlayerType() === "B") {
            gs.setTargetWord(incomingMsg.data);

            sb.setStatus(Status.player2Intro);
            gs.initializeVisibleWordArray(); // initialize the word array, now that we have the word
            ab.initialize();
            vw.setWord(gs.getVisibleWordArray());
        }

        // Player A: wait for guesses and update the board ...
        if (incomingMsg.type === Messages.T_MAKE_A_GUESS && gs.getPlayerType() === "A") {
            sb.setStatus(Status.guessed + incomingMsg.data);
            gs.updateGame(incomingMsg.data);
        }
    };

    socket.onopen = function () {
        socket.send("{}");
    };

    // server sends a close event only if the game was aborted from some side
    socket.onclose = function () {
        if (gs.whoWon() === null) {
            sb.setStatus(Status.aborted);
        }
    };

    socket.onerror = function () {
    };
}()); // execute immediately
