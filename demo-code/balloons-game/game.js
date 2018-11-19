/* every game has two players, identified by their WebSocket */
const game = function (gameID) {
    this.playerA = null;
    this.playerB = null;
    this.id = gameID;
    this.wordToGuess = null; // first player to join the game, can set the word
    this.gameState = "0 JOINT"; // "A" means A won, "B" means B won, "ABORTED" means the game was aborted
};

/*
 * The game can be in a number of different states.
 */
game.prototype.transitionStates = {};
game.prototype.transitionStates["0 JOINT"] = 0;
game.prototype.transitionStates["1 JOINT"] = 1;
game.prototype.transitionStates["2 JOINT"] = 2;
game.prototype.transitionStates["CHAR GUESSED"] = 3;
game.prototype.transitionStates.A = 4; // A won
game.prototype.transitionStates.B = 5; // B won
game.prototype.transitionStates.ABORTED = 6;

/*
 * Not all game states can be transformed into each other;
 * the matrix contains the valid transitions.
 * They are checked each time a state change is attempted.
 */
game.prototype.transitionMatrix = [
    [0, 1, 0, 0, 0, 0, 0], // 0 JOINT
    [1, 0, 1, 0, 0, 0, 0], // 1 JOINT
    [0, 0, 0, 1, 0, 0, 1], // 2 JOINT (note: once we have two players, there is no way back!)
    [0, 0, 0, 1, 1, 1, 1], // CHAR GUESSED
    [0, 0, 0, 0, 0, 0, 0], // A WON
    [0, 0, 0, 0, 0, 0, 0], // B WON
    [0, 0, 0, 0, 0, 0, 0], // ABORTED
];

game.prototype.isValidTransition = function (from, to) {
    console.assert(typeof from === "string", "isValidTransition: Expecting a string, got a %s", typeof from);
    console.assert(typeof to === "string", "isValidTransition: Expecting a string, got a %s", typeof to);
    console.assert(from in game.prototype.transitionStates === true, "isValidTransition: Expecting %s to be a valid transition state", from);
    console.assert(to in game.prototype.transitionStates === true, "isValidTransition: Expecting %s to be a valid transition state", to);

    if (!(from in game.prototype.transitionStates)) {
        return false;
    }

    const i = game.prototype.transitionStates[from];

    if (!(to in game.prototype.transitionStates)) {
        return false;
    }

    const j = game.prototype.transitionStates[to];

    return (game.prototype.transitionMatrix[i][j] > 0);
};

game.prototype.isValidState = function (s) {
    return (s in game.prototype.transitionStates);
};

game.prototype.setStatus = function (w) {
    console.assert(typeof w === "string", "setStatus: Expecting a string, got a %s", typeof w);

    if (game.prototype.isValidState(w) && game.prototype.isValidTransition(this.gameState, w)) {
        this.gameState = w;
        console.log("[STATUS] %s", this.gameState);
    } else {
        throw new Error("Impossible status change from %s to %s", this.gameState, w);
    }
};

game.prototype.setWord = function (w) {
    console.assert(typeof w === "string", "setWord: Expecting a string, got a %s", typeof w);

    // two possible options for the current game state:
    // 1 JOINT, 2 JOINT
    if (this.gameState !== "1 JOINT" && this.gameState !== "2 JOINT") {
        throw new Error("Trying to set word, but game status is %s", this.gameState);
    }
    this.wordToGuess = w;
};

game.prototype.getWord = function () {
    return this.wordToGuess;
};

game.prototype.hasTwoConnectedPlayers = function () {
    return (this.gameState === "2 JOINT");
};

game.prototype.addPlayer = function (p) {
    console.assert(p instanceof Object, "addPlayer: Expecting an object (WebSocket), got a %s", typeof p);

    if (this.gameState !== "0 JOINT" && this.gameState !== "1 JOINT") {
        throw new Error("Invalid call to addPlayer, current state is %s", this.gameState);
    }

    /*
     * revise the game state
     */
    const error = this.setStatus("1 JOINT");
    if (error instanceof Error) {
        this.setStatus("2 JOINT");
    }

    if (this.playerA === null) {
        this.playerA = p;
        return "A";
    }

    this.playerB = p;
    return "B";
};

module.exports = game;
