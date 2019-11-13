/* Code shared between client and server: game setup.
 *
 * The different properties (MIN_WORD_LENGTH and so on) are game properties that
 * need to be shared between client and server (both the client and server need to
 * be in agreement of the game properties of course).
 * 
 * We can of course maintain two separate files (one for the Node.js env and one for the browser)
 * but it is less work and less error-prone to simply havea  single *.js file that contains the
 * properties both the client and server can use.
 * 
 * We can achieve this with the code snippet below: if the 'exports' is undefined, we are in the web 
 * browser environment and need to create a property ('Setup') for the 'this' object.
 * If 'exports' is defined, we are on the server and can simply return the exports object.
 * 
 * This is a common JavaScript construct to share code between the Node.js and web browser environments. 
 */
(function(exports) {
  exports.MAX_ALLOWED_GUESSES = 7; /* Maximum number of guesses; TODO: based on it, set number of balloons */
  exports.MIN_WORD_LENGTH = 5; /* Minimum allowed word length */
  exports.MAX_WORD_LENGTH = 15; /* Maximum allowed word length */
  exports.WEB_SOCKET_URL = "ws://localhost:3000"; /* WebSocket URL */
  exports.HIDDEN_CHAR = "#"; /* Hidden char of the UI */
})(typeof exports === "undefined" ? (this.Setup = {}) : exports);
