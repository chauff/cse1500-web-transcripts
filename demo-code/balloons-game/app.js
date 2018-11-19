const express = require("express");
const http = require("http");
const websocket = require("ws");

const indexRouter = require("./routes/index");
const messages = require("./public/javascripts/messages");

const gameStatus = require("./statTracker");
const Game = require("./game");

const port = process.argv[2];
const app = express();

app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`));

app.get("/play", indexRouter);

// TODO: move to routes/index
app.get("/", (req, res) => {
    res.render("splash.ejs", { gamesInitialized: gameStatus.gamesInitialized, gamesCompleted: gameStatus.gamesCompleted });
});

const server = http.createServer(app);
const wss = new websocket.Server({ server });

const websockets = {};// property: websocket, value: game

/*
 * regularly clean up the websockets object
 */
setInterval(() => {
    for (const i in websockets) {
        if (websockets.hasOwnProperty(i)) {
            const gameObj = websockets[i];
            // if the gameObj has a final status, the game is complete/aborted
            if (gameObj.finalStatus !== null) {
                console.log(`\tDeleting element ${i}`);
                delete websockets[i];
            }
        }
    }
}, 50000);

let currentGame = new Game(gameStatus.gamesInitialized++);
let connectionID = 0;// each websocket receives a unique ID

wss.on("connection", (ws) => {
    /*
     * two-player game: every two players are added to the same game
     */
    const con = ws;
    con.id = connectionID++;
    const playerType = currentGame.addPlayer(con);
    websockets[con.id] = currentGame;

    console.log("Player %s placed in game %s as %s", con.id, currentGame.id, playerType);

    /*
     * inform the client about its assigned player type
     */
    con.send((playerType === "A") ? messages.S_PLAYER_A : messages.S_PLAYER_B);

    /*
     * client B receives the target word (if already available)
     */
    if (playerType === "B" && currentGame.getWord() !== null) {
        const msg = messages.O_TARGET_WORD;
        msg.data = currentGame.getWord();
        con.send(JSON.stringify(msg));
    }

    /*
     * once we have two players, there is no way back;
     * a new game object is created;
     * if a player now leaves, the game is aborted (player is not preplaced)
     */
    if (currentGame.hasTwoConnectedPlayers()) {
        currentGame = new Game(gameStatus.gamesInitialized++);
    }

    /*
     * message coming in from a player:
     *  1. determine the game object
     *  2. determine the opposing player OP
     *  3. send the message to OP
     */
    con.on("message", (message) => {
        const oMsg = JSON.parse(message);

        const gameObj = websockets[con.id];
        const isPlayerA = (gameObj.playerA === con);

        if (isPlayerA) {
            /*
             * player A cannot do a lot, just send the target word;
             * if player B is already available, send message to B
             */
            if (oMsg.type === messages.T_TARGET_WORD) {
                gameObj.setWord(oMsg.data);

                if (gameObj.hasTwoConnectedPlayers()) {
                    gameObj.playerB.send(message);
                }
            }
        } else {
            /*
             * player B can make a guess;
             * this guess is forwarded to A
             */
            if (oMsg.type === messages.T_MAKE_A_GUESS) {
                gameObj.playerA.send(message);
                gameObj.setStatus("CHAR GUESSED");
            }

            /*
             * player B can state who won/lost
             */
            if (oMsg.type === messages.T_GAME_WON_BY) {
                gameObj.setStatus(oMsg.data);
                // game was won by somebody, update statistics
                gameStatus.gamesCompleted++;
            }
        }
    });

    con.on("close", (code) => {
        /*
         * code 1001 means almost always closing initiated by the client;
         * source: https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
         */
        console.log(`${con.id} disconnected ...`);

        if (code === "1001") {
            /*
            * if possible, abort the game; if not, the game is already completed
            */
            const gameObj = websockets[con.id];

            if (gameObj.isValidTransition(gameObj.gameState, "ABORTED")) {
                gameObj.setStatus("ABORTED");
                gameStatus.gamesAborted++;

                /*
                 * determine whose connection remains open;
                 * close it
                 */
                try {
                    gameObj.playerA.close();
                    gameObj.playerA = null;
                } catch (e) {
                    console.log(`Player A closing: ${e}`);
                }

                try {
                    gameObj.playerB.close();
                    gameObj.playerB = null;
                } catch (e) {
                    console.log(`Player B closing: ${e}`);
                }
            }
        }
    });
});

server.listen(port);
