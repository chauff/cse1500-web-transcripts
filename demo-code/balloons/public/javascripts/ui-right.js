/*
 * Object representing the (un)hidden word.
 */ 
function VisibleWordBoard() {

    //set hidden word in the correct div element
    this.setWord = function(visibleWord){

        console.assert(Array.isArray(visibleWord) || typeof visibleWord == "string", "Expecting an array, got a %s instead" );

        if(Array.isArray(visibleWord)){
            document.getElementById("hiddenWord").innerHTML = visibleWord.join("");
        }
        else {
            document.getElementById("hiddenWord").innerHTML = visibleWord;
        }
    };
}

/*
 * Object representing the status bar.
 */  
function StatusBar(){
    this.setStatus = function(status){
        document.getElementById("statusbar").innerHTML = status;
    };
}