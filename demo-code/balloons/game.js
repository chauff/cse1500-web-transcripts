/* every game has two players, identified by their connection */
var game = function(gameID){
    this.playerA = null;
    this.playerB = null;
    this.id = gameID;
    this.wordToGuess = null; //first player to join the game, can set the word
    this.finalStatus = null; //"A" means A won, "B" means B won, "ABORTED" means the game was aborted

    this.setFinalStatus = function(w){
        this.finalStatus = w;
    };

    this.setWord = function (w) {
        /* TODO: server-side check whether this is a valid word (according to our rules) */
        this.wordToGuess = w;
        console.log("Game %s has target word set to %s!", this.id, this.wordToGuess);
    };

    this.getWord = function(){
        return this.wordToGuess;
    };

    //issue: if player A signs up, then disconnects and then B signs up. B will not get a new game
    this.hasTwoConnectedPlayers = function(){
        if(this.playerA != null && this.playerB != null){
            return true;
        }
        return false;
    };

    this.addPlayer = function(p){
        if(this.hasTwoConnectedPlayers()){
            return null;
        }

        if(this.playerA == null){
            this.playerA = p;
            return "A";
        }
        else {
            this.playerB = p;
            return "B";
        }
    };
};

module.exports = game;