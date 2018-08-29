const USED = -1; //letter has been used, not available anymore
const AVAIL = 1; //letter has not been used yet

/* basic constructor of game state */
function GameState(visibleWordBoard, sb, socket){

    this.playerType = null;
    this.MAX_ALLOWED = Setup.MAX_ALLOWED_GUESSES;
    this.wrongGuesses = 0;
    this.visibleWordArray = null;
    this.alphabet = new Alphabet();
    this.alphabet.initialize();
    this.visibleWordBoard = visibleWordBoard;
    this.targetWord = null;
    this.statusBar = sb;

    this.initializeVisibleWordArray = function(){
        this.visibleWordArray = new Array(this.targetWord.length);
        this.visibleWordArray.fill("#");
    };

    this.getPlayerType = function () {
        return this.playerType;
    };

    this.setPlayerType = function (p) {
        this.playerType = p;
    };

    this.setTargetWord = function (w) {
        this.targetWord = w;
    };

    this.getVisibleWordArray = function(){
        return this.visibleWordArray;
    };

    this.incrWrongGuess = function(){
        this.wrongGuesses++;
    };

    this.whoWon = function(){
        //too many wrong guesses? Player A (who set the word) won
        if( this.wrongGuesses>Setup.MAX_ALLOWED_GUESSES){
            return "A";
        }
        //word solved? Player B won
        if( this.visibleWordArray.indexOf("#")<0){
            return "B";
        }
        return null; //nobody won yet
    };

    this.revealLetters = function(letter, indices){
        for(let i=0; i<indices.length; i++){
            this.visibleWordArray[ indices[i] ] = letter;
        }
    };

    this.updateGame = function(clickedLetter){

        var res = this.alphabet.getLetterInWordIndices(clickedLetter, this.targetWord);

        //wrong guess?
        if(res.length == 0){
            this.incrWrongGuess();
        }

        this.revealLetters(clickedLetter, res);
        this.alphabet.makeLetterUnAvailable(clickedLetter);
        this.visibleWordBoard.setWord(this.visibleWordArray);

        //TODO: both A and B do that ...
        var outgoingMsg = Messages.O_MAKE_A_GUESS;
        outgoingMsg.data = clickedLetter;
        socket.send(JSON.stringify(outgoingMsg));

        //is the game complete?
        let winner = this.whoWon();
        let alertString = "Game over. You ";
        if(winner != null){
            if( winner == this.playerType){
                alertString += "won!";
            }
            else {
                alertString += "lost!";
            }
            alertString += " <a href='/play'>Play again!</a>";
            sb.setStatus(alertString);

            //player B sends final message
            if(this.playerType == "B"){
                let finalMsg = Messages.O_GAME_WON_BY;
                finalMsg.data = winner;
                socket.send(JSON.stringify(finalMsg));
            }

            socket.close();
        }
    };
}

function Alphabet(){

    this.letters = undefined;

    this.initialize = function(){
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
    this.isLetter = function(letter){
        console.assert(typeof letter === "string", "Single string expected");
        return this.letters.hasOwnProperty(letter);
    };

    //is it an available letter?
    this.isLetterAvailable = function(letter){
        console.assert(typeof letter === "string", "Single string expected");
        return (this.isLetter(letter) && this.letters[letter]==AVAIL);
    };

    this.makeLetterUnAvailable = function(letter){
        console.assert(typeof letter === "string", "Single string expected");
        if( this.isLetter(letter)){
            this.letters[letter] = USED;
        }
    };

    //does the letter appear in the word?
    this.isLetterIn = function(letter, word){
        console.assert(typeof letter === "string", "String expected");
        console.assert(typeof word === "string", "String expected");

        if( !this.isLetter(letter) || !this.isLetterAvailable(letter)){
            return false;
        }
        return (word.indexOf(letter)>=0);
    };

    //letter locations in the word
    this.getLetterInWordIndices = function(letter, word){
        console.assert(typeof letter === "string", "String expected");
        console.assert(typeof word === "string", "String expected");

        var res = [];
        
        if(!this.isLetterIn(letter, word)){
            console.log("Letter [%s] is not in target word [%s]!", letter, word);
            return res;
        }
        
        for(let i=0; i<word.length; i++){
            if(word.charAt(i) == letter){
                res.push(i);
            }
        }
        return res;       
    };
}

function VisibleWordBoard(){

    //set hidden word in the correct div element
    this.setWord = function(visibleWord){

        //dynamic language issues ...
        console.assert(Array.isArray(visibleWord), "Expecting an array, got a %s instead" );

        document.getElementById("hiddenWord").innerHTML = visibleWord.join("");
    };
}

function StatusBar(){
    this.setStatus = function(status){
        document.getElementById("statusbar").innerHTML = status;
    }
}

function AlphabetBoard(gs){

    //only initialize for player that should actually be able to use the board
    this.initialize = function(){

        var elements = document.querySelectorAll(".alphabet");
        Array.from(elements).forEach( function(el){

            el.addEventListener("click", function singleClick(e){
                var clickedLetter = e.originalTarget.id;
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


//set everything up, including the WebSocket
(function setup(){

    console.log("Connecting to server WebSocket ...");
    var socket = new WebSocket(Setup.WEB_SOCKET_URL);

    var vw = new VisibleWordBoard();
    var sb = new StatusBar();

    var gs = new GameState(vw, sb, socket);
    var ab = new AlphabetBoard(gs);

    socket.onmessage = function (event) {

        let incomingMsg = JSON.parse(event.data);
 
        //set player type
        if (incomingMsg.type == Messages.T_PLAYER_TYPE) {
            
            gs.setPlayerType( incomingMsg.data );//should be "A" or "B"

            //if player type is A, (1) pick a word, and (2) sent it to the server
            if (gs.getPlayerType() == "A") {
                sb.setStatus("You are Player 1. Pick the word to guess (A-Z only)! If player 2 cannot guess your word, you won.");
                let res = prompt("Word to guess!").toUpperCase();
                sb.setStatus("Your chosen word: "+res);
                gs.setTargetWord(res);
                gs.initializeVisibleWordArray(); // initialize the word array, now that we have the word
                vw.setWord(gs.getVisibleWordArray());

                let outgoingMsg = Messages.O_TARGET_WORD;
                outgoingMsg.data = res;
                socket.send(JSON.stringify(outgoingMsg));
            }
            else {
                sb.setStatus("You are Player 2, the word guesser. You win if you can complete the word within " + Setup.MAX_ALLOWED_GUESSES +" attempts. Waiting for Player 1 to pick a word ...");
            }
        }

        //Player B: wait for target word and then start guessing ...
        if( incomingMsg.type == Messages.T_TARGET_WORD && gs.getPlayerType() == "B"){
            gs.setTargetWord(incomingMsg.data);
            console.log("Player B: target word set to %s.", incomingMsg.data);

            sb.setStatus("You are Player 2, the word guesser. You win if you can complete the word within " + Setup.MAX_ALLOWED_GUESSES+" attempts. Player 1 picked a word, start guessing!");
            gs.initializeVisibleWordArray(); // initialize the word array, now that we have the word
            ab.initialize();
            vw.setWord(gs.getVisibleWordArray());
        }

        //Player A: wait for guesses and update the board ...
        if( incomingMsg.type == Messages.T_MAKE_A_GUESS && gs.getPlayerType()=="A"){
            sb.setStatus("The other player guessed " + incomingMsg.data + ".");
            gs.updateGame(incomingMsg.data);
        }


    };

    socket.onopen = function(){
        socket.send("{}");
    };
    
    //server sends a close event only if the game was aborted from some side
    socket.onclose = function(){
        if(gs.whoWon()==null){
            sb.setStatus("Your gaming partner is no longer available, game aborted. <a href='/play'>Play again!</a>");
        }
    };

    socket.onerror = function(){
        
    };

})(); //execute immediately



