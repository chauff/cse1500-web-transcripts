var express = require("express");
var http = require("http");
var websocket = require("ws");

var indexRouter = require("./routes/index");
var messages = require("./public/javascripts/messages");

var port = process.argv[2];
var app = express();

app.set('view engine', 'ejs')
app.use(express.static(__dirname + "/public"));

app.get("/play", indexRouter);

app.get('/', (req, res) => {
    res.render('splash.ejs', { gamesInitialized: gameStatus.gamesInitialized, gamesCompleted: gameStatus.gamesCompleted });
})

/* keep track of the games' finalStatus in memory */
var gameStatus = {
    since : Date.now(),     /* since we keep it simple and in-memory, keep track of when this object was created */
    gamesInitialized : 0,   /* number of games initialized */
    gamesAborted : 0,       /* number of games aborted */
    gamesCompleted : 0      /* number of games successfully completed */
};

/* every game has two players, identified by their connection */
var Game = function(){
    this.playerA = null;
    this.playerB = null;
    this.id = gameStatus.gamesInitialized++;
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

    this.hasSufficientPlayers = function(){
        if(this.playerA != null && this.playerB != null){
            return true;
        }
        return false;
    };

    this.addPlayer = function(p){
        if(this.hasSufficientPlayers()){
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

var websockets = {};//key: websocket, value: game

//regularly clean up the websockets object
setInterval(function() {

    console.log("Cleaning up websockets object ...");

    for(let i in websockets){
        if(websockets.hasOwnProperty(i)){
            let gameObj = websockets[i];
            if(gameObj.finalStatus!=null){
                console.log("\tDeleting element "+i);
                delete websockets[i];
            }
        }
    }
}, 50000);

//game stats make a regular appearance in the console log ...
setInterval(function() {
    console.table(gameStatus)}, 10000);

var currentGame = new Game();
var connectionID = 0;//ID given to each client

var server = http.createServer(app);

const wss = new websocket.Server({ server }); //pre-created node.js http server as argument

wss.on("connection", function connection(ws, req) {

    /* Two-player game: every two players are added to the same game  ... */
    let con = ws; 
    con.id = connectionID++;
    let playerType = currentGame.addPlayer(con);
    websockets[con.id] = currentGame;

    console.log("Player with ID %s placed in game %s as type %s", con.id, currentGame.id, playerType);

    //inform the player about its assigned player type
    con.send((playerType == "A") ? messages.S_PLAYER_A : messages.S_PLAYER_B);

    //if it is player B, check whether we have a target word already, if so, send it
    if(playerType == "B" && currentGame.getWord()!=null){
        let msg = messages.O_TARGET_WORD;
        msg.data = currentGame.getWord();
        con.send(JSON.stringify(msg));
    }

    //when the currentGame has sufficient players, start a new game
    if(currentGame.hasSufficientPlayers() == true){
        currentGame = new Game();
    }

    /* When a player from a game sends a message, determine the other game player and broadcast the message to him */
    con.on("message", function incoming(message) {

        let oMsg = JSON.parse(message);
 
        //game instance of the player
        let gameObj = websockets[con.id];
        let isPlayerA = (gameObj.playerA == con) ? true : false;

        //Player A can set the target word - if we have a player B, send it to him
        if( oMsg.type!=undefined && oMsg.type == messages.T_TARGET_WORD && isPlayerA==true) {
            gameObj.setWord(oMsg.data);

            if(gameObj.hasSufficientPlayers()){
                let msg = messages.O_TARGET_WORD;
                msg.data = gameObj.getWord();
                gameObj.playerB.send(JSON.stringify(msg)); 
            }
        }

        //Player B can make a guess, which is forwarded to player A
        if( oMsg.type!=undefined && oMsg.type == messages.T_MAKE_A_GUESS && isPlayerA==false){
            gameObj.playerA.send(message);
        }

        //Player B has the right to claim who won/lost
        if( oMsg.type!=undefined && oMsg.type == messages.T_GAME_WON_BY && isPlayerA==false){

            console.log("Game over ...");
            gameObj.setFinalStatus(oMsg.data);

            //game was won by somebody, update statistics
            gameStatus.gamesCompleted++;
        }
    });

    con.on("close", function(){
       
        //lets wait a few seconds before reacting ... if the game status has changed, no need to deal with this

        //alternative explanation of a close event is one websocket being closed (e.g. browser tab closes), inform the other player
        console.log(con.id + " disconnected ...");

        setTimeout(function() {

            if(websockets.hasOwnProperty(con.id)){

                let gameObj = websockets[con.id];

                if(gameObj.finalStatus == null){

                    gameObj.finalStatus="ABORTED";
                    gameStatus.gamesAborted++;

                    try {
                        gameObj.playerA.close();
                    }
                    catch(e){
                        console.log("Player A closing: "+ e);
                    }

                    try {
                        gameObj.playerB.close();                        
                    }
                    catch(e){
                        console.log("Player B closing: "+ e);
                    }
                }
            }

        }, 2000);
    });
});

server.listen(port);

