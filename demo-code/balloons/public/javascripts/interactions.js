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
        this.visibleWordArray.fill(Setup.HIDDEN_CHAR);
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

        if(this.whoWon() == null){
            //kill a balloon
            let id = "b"+this.wrongGuesses;
            document.getElementById(id).className += " balloonGone";
            setTimeout(function () {
                new Audio('../data/pop.wav').play();
            }, 500);
        }
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

    this.revealAll = function(){
        this.visibleWordBoard.setWord(this.targetWord);
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
        
        if(winner != null){
            this.revealAll();

            let alertString;
            if( winner == this.playerType){
                alertString = Status["gameWon"];
            }
            else {
                alertString = Status["gameLost"];
            }
            alertString += Status["playAgain"];
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

            //visually switch off the UI element by simply adding a classname
            document.getElementById(letter).className += " alphabetUsed";
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
        console.assert(Array.isArray(visibleWord) || typeof visibleWord == "string", "Expecting an array, got a %s instead" );

        if(Array.isArray(visibleWord)){
            document.getElementById("hiddenWord").innerHTML = visibleWord.join("");
        }
        else {
            document.getElementById("hiddenWord").innerHTML = visibleWord;
        }
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
                var clickedLetter = e.target.id;
                new Audio('../data/click.wav').play();
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
                sb.setStatus(Status["player1Intro"]);
                let validWord = -1;
                let promptString = Status["prompt"];
                let res = null;

                while(validWord<0){
                    res = prompt(promptString).toUpperCase();
                    if(res.length<Setup.MIN_WORD_LENGTH || res.length>Setup.MAX_WORD_LENGTH){
                        promptString = Status["promptAgainLength"];
                    }
                    else if(/^[a-zA-Z]+$/.test(res) == false){
                        promptString = Status["promptChars"];
                    }
                    //dictionary has only lowercase entries
                    else if(englishDict.hasOwnProperty(res.toLocaleLowerCase())==false){
                        promptString = Status["promptEnglish"];
                    }
                    else {
                        validWord = 1;
                    }
                }
                sb.setStatus(Status["chosen"]+res);
                gs.setTargetWord(res);
                gs.initializeVisibleWordArray(); // initialize the word array, now that we have the word
                vw.setWord(gs.getVisibleWordArray());

                let outgoingMsg = Messages.O_TARGET_WORD;
                outgoingMsg.data = res;
                socket.send(JSON.stringify(outgoingMsg));
            }
            else {
                sb.setStatus(Status["player2IntroNoTargetYet"]);   
            }
        }

        //Player B: wait for target word and then start guessing ...
        if( incomingMsg.type == Messages.T_TARGET_WORD && gs.getPlayerType() == "B"){
            gs.setTargetWord(incomingMsg.data);

            sb.setStatus(Status["player2Intro"]);
            gs.initializeVisibleWordArray(); // initialize the word array, now that we have the word
            ab.initialize();
            vw.setWord(gs.getVisibleWordArray());
        }

        //Player A: wait for guesses and update the board ...
        if( incomingMsg.type == Messages.T_MAKE_A_GUESS && gs.getPlayerType()=="A"){
            sb.setStatus(Status["guessed"] + incomingMsg.data);
            gs.updateGame(incomingMsg.data);
        }


    };

    socket.onopen = function(){
        socket.send("{}");
    };
    
    //server sends a close event only if the game was aborted from some side
    socket.onclose = function(){
        if(gs.whoWon()==null){
            sb.setStatus(Status["aborted"]);
        }
    };

    socket.onerror = function(){
        
    };

})(); //execute immediately



