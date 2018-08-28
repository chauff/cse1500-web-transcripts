/* Code shared between client and server: messages exchanged via WebSockets 
    - T .... type
    - O .... object
    - S .... string version of the object
*/

(function(exports){

    exports.O_CHOOSE = { type: "CHOOSE-WORD" }        /* Player selects a word */
    exports.S_CHOOSE = JSON.stringify(this.O_CHOOSE);

    exports.T_PLAYER_TYPE = "PLAYER-TYPE"
    exports.O_PLAYER_A = {                            /* Player A */
        type: exports.T_PLAYER_TYPE,
        data: "A"
    }
    exports.S_PLAYER_A = JSON.stringify(exports.O_PLAYER_A)

    exports.O_PLAYER_B = {                            /* Player B */
        type: exports.T_PLAYER_TYPE,
        data: "B"
    }
    exports.S_PLAYER_B = JSON.stringify(exports.O_PLAYER_B);

    exports.T_TARGET_WORD = "TARGET-WORD"
    exports.O_TARGET_WORD = {                         /* Target word */
        type: exports.T_TARGET_WORD,
        data: null
    }
    exports.S_TARGET_WORD = JSON.stringify(exports.O_TARGET_WORD)


}(typeof exports === 'undefined' ? this.Messages = {} : exports));
//if exports is undefined, we are on the client; else the server