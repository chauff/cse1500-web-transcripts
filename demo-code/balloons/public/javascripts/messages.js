/* Code shared between client and server: messages exchanged via WebSockets 
    - T .... type
    - O .... object
    - S .... string version of the object
*/

(function(exports){

    exports.T_GAME_WON_BY = "GAME-WON-BY";             /* Client to server: game is complete, the winner is ... */
    exports.O_GAME_WON_BY = {
        type: exports.T_GAME_WON_BY,
        data: null
    };

    exports.O_GAME_ABORTED = {                          /* Server to client: abort game (e.g. if second player exited the game) */
        type: "GAME-ABORTED"
    };
    exports.S_GAME_ABORTED = JSON.stringify(exports.O_GAME_ABORTED);

    exports.O_CHOOSE = { type: "CHOOSE-WORD" };        /* Server to client: choose target word */
    exports.S_CHOOSE = JSON.stringify(exports.O_CHOOSE);

    exports.T_PLAYER_TYPE = "PLAYER-TYPE";
    exports.O_PLAYER_A = {                            /* Server to client: set as player A */
        type: exports.T_PLAYER_TYPE,
        data: "A"
    };
    exports.S_PLAYER_A = JSON.stringify(exports.O_PLAYER_A);

    exports.O_PLAYER_B = {                            /* Server to client: set as player B */
        type: exports.T_PLAYER_TYPE,
        data: "B"
    };
    exports.S_PLAYER_B = JSON.stringify(exports.O_PLAYER_B);

    exports.T_TARGET_WORD = "SET-TARGET-WORD";
    exports.O_TARGET_WORD = {                         /* Player A to server OR server to Player B: this is the target word */
        type: exports.T_TARGET_WORD,
        data: null
    };
    //exports.S_TARGET_WORD does not exist, as we always need to fill the data property

    exports.T_MAKE_A_GUESS = "MAKE-A-GUESS";         /* Player B to server OR server to Player A: guessed character */
    exports.O_MAKE_A_GUESS = {
        type: exports.T_MAKE_A_GUESS,
        data: null
    };
    //exports.S_MAKE_A_GUESS does not exist, as data needs to be set

    exports.T_GAME_OVER = "GAME-OVER";              /* Server to Player A & B: game over with result won/loss */
    exports.O_GAME_OVER = {
        type: exports.T_GAME_OVER,
        data: null
    };


}(typeof exports === "undefined" ? this.Messages = {} : exports));
//if exports is undefined, we are on the client; else the server