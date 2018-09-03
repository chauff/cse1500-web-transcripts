/* every game has two players, identified by their connection */
var game = function (gameID) {
    this.playerA = null;
    this.playerB = null;
    this.id = gameID;
    this.wordToGuess = null; //first player to join the game, can set the word
    this.finalStatus = null; //"A" means A won, "B" means B won, "ABORTED" means the game was aborted
}

game.prototype.setFinalStatus = function(w){
    this.finalStatus = w;
};

game.prototype.setWord = function (w) {
    this.wordToGuess = w;
    console.log("Game %s has target word set to %s!", this.id, this.wordToGuess);
};

game.prototype.getWord = function(){
    return this.wordToGuess;
};

game.prototype.hasTwoConnectedPlayers = function () {
    if (this.playerA != null && this.playerB != null) {
        return true;
    }
    return false;
};

game.prototype.addPlayer = function (p) {
    if (this.hasTwoConnectedPlayers()) {
        return null;
    }

    if (this.playerA == null) {
        this.playerA = p;
        return "A";
    }
    else {
        this.playerB = p;
        return "B";
    }
};

module.exports = game;