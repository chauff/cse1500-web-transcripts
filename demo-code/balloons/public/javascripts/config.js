/* Code shared between client and server: game setup */

(function (exports) {
    
    exports.MAX_ALLOWED_GUESSES = 6;                /* Maximum number of guesses; TODO: based on it, set number of balloons */
    exports.MIN_WORD_LENGTH = 5;                    /* Minimum allowed word length */
    exports.MAX_WORD_LENGTH = 15;                   /* Maximum allowed word length */
    exports.WEB_SOCKET_URL = "ws://localhost:3000"; /* WebSocket URL */

}(typeof exports === 'undefined' ? this.Setup = {} : exports));
//if exports is undefined, we are on the client; else the server