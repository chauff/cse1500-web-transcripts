"use strict"; //not necessary, flags up a few more potential errors

const USED = -1; //letter has been used, not available anymore
const AVAIL = 1; //letter has not been used yet
const MAX_ALLOWED_GUESSES = 5; //maximum number of guesses allowed

//the following lines are a placeholder until the data is delivered from the server
var targetWord = "MUMMYRETURNSMMS"; 
var visibleWord = new Array(targetWord.length);
visibleWord.fill('#');

var wrongGuesses = 0;


var letters = {
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
}

//is the argument a valid letter?
function isLetter(letter){
    if( letters.hasOwnProperty(letter) ){
        return true;
    }
    return false; //not a valid letter
}

//is this an available letter?
function isLetterAvailable(letter){
    if( isLetter(letter) && letters[letter] == AVAIL){
        return true;
    }
    return false;
}

//make the letter unavailable for future use
function makeLetterUnAvailable(letter){
    if( isLetter(letter) ){
        letters[letter] = USED;
    }
}

//is this a letter that is in the target word (and has not been revealed yet)?
function isLetterInTarget(letter){
    if( !isLetter(letter) || !isLetterAvailable(letter)){
        return false;
    }

    if(targetWord.indexOf(letter)>=0){
        return true;
    }
}

//expects as input the letter indices in the target word
function updateGameStats(res){
    if(res.length == 0){
        wrongGuesses++;
    }
}

//returns the letter indices in the target word
function getLetterInTargetIndices(letter){

    var res = [];

    if(!isLetterInTarget(letter)){
        console.log("Letter is not in target word!");
        return res;
    }

    for(let i=0; i<targetWord.length; i++){
        if(targetWord.charAt(i) == letter){
            res.push(i);
        }
    }
    return res;
}

//set hidden word in the correct div element
function setHiddenWord(){
    document.getElementById('hiddenWord').innerHTML = visibleWord.join('');
};

function setGameStats(){
    console.log("Wrong guesses: "+wrongGuesses);
}

//reveal letters to the player
function revealLetters(letter){

    var indices = getLetterInTargetIndices(letter);
    for(let i=0; i<indices.length; i++){
        visibleWord[ indices[i] ] = letter;
    }
    setHiddenWord();
};

//the game is lost if the number of wrong guesses is over the max.
function isGameLost(){
    return (wrongGuesses>MAX_ALLOWED_GUESSES)
}


//every letter needs to react to a click
(function setup(){

    //initially all letters are hidden
    setHiddenWord(); 

    var elements = document.querySelectorAll(".alphabet");
    
    Array.from(elements).forEach( function(el){

        el.addEventListener('click', function(e){

            //hint: to determine how exactly object e looks like, use the WebConsole of your browser
            var clickedLetter = e.originalTarget.id;

            //testing ...
            console.log(clickedLetter); 

            var res = getLetterInTargetIndices(clickedLetter);
            updateGameStats(res);
            revealLetters(clickedLetter);
            makeLetterUnAvailable(clickedLetter);
            setGameStats();

            if( isGameLost()){
                console.log(" +++ GAME LOST +++");
            }
        });
    });
})(); //execute the setup immediately



