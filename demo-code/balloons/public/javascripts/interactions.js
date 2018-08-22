const USED = -1; //letter has been used, not available anymore
const AVAIL = 1; //letter has not been used yet

//placeholders ...
const PH_WORD = "THEMUMMY";
const PH_GUESSES = 3;

/* basic constructor of game state */
function GameState(MAX_ALLOWED, targetWord, visibleWordBoard){

    //dynamic language issues
    console.assert(Number.isInteger(MAX_ALLOWED), "Expecting an integer!");
    console.assert(MAX_ALLOWED>=0, "Expecting a non-negative integer!");
    console.assert(typeof targetWord === "string", "Expecting a string!");

    this.MAX_ALLOWED = MAX_ALLOWED;
    this.wrongGuesses = 0;
    this.targetWord = targetWord;
    this.visibleWordArray = new Array(targetWord.length);
    this.visibleWordArray.fill("#");
    this.alphabet = new Alphabet();
    this.alphabet.initialize();
    this.visibleWordBoard = visibleWordBoard;

    this.getVisibleWordArray = function(){
        return this.visibleWordArray;
    };

    this.incrWrongGuess = function(){
        this.wrongGuesses++;
    };

    this.isGameOver = function(){
        return (this.wrongGuesses>this.MAX_ALLOWED);
    };

    this.revealLetters = function(letter){
        var indices = this.alphabet.getLetterInWordIndices(letter, this.targetWord);
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

        //game over?
        if( this.isGameOver() ){
            console.log("Game lost!");
        }
        else {
            this.revealLetters(clickedLetter);
            this.alphabet.makeLetterUnAvailable(clickedLetter);
            this.visibleWordBoard.setWord(this.visibleWordArray);
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
            console.log("Letter is not in target word!");
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

function AlphabetBoard(gs){

    this.initialize = function(){

        var elements = document.querySelectorAll(".alphabet");
        Array.from(elements).forEach( function(el){

            el.addEventListener("click", function(e){
                var clickedLetter = e.originalTarget.id;
                gs.updateGame(clickedLetter);

                //"testing" ...
                console.log(clickedLetter); 
            });
        });
    };
}


//set everything up
(function setup(){
    var vw = new VisibleWordBoard();
    var gs = new GameState(PH_GUESSES, PH_WORD, vw);
    var ab = new AlphabetBoard(gs);
    ab.initialize();
    vw.setWord(gs.getVisibleWordArray());
})(); //execute immediately



