var express = require("express");
var http = require("http");
var websocket = require("ws");

var indexRouter = require("./routes/index");

var port = process.argv[2];
var app = express();

/* keep track of the game status */
var gameStatus = {
    since : Date.now(),     /* since we keep it simple and in-memory, keep track of when this object was created */
    gamesStarted : 0,       /* number of games started */
    gamesAborted : 0,       /* number of games aborted */
    gamesCompleted : 0      /* number of games successfully completed */
};

/* every game has two players, identified by their connection */
var Game = function(){
    this.playerA = null;
    this.playerB = null;
    this.id = gameStatus.gamesStarted++;
    this.wordToGuess = null; //first player to join the game, can set the word

    this.isFull = function(){
        if(this.playerA != null && this.playerB != null){
            return true;
        }
        return false;
    };

    this.addPlayer = function(p){
        if(this.isFull()){
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
    }
};

var games = [];

var currentGame = new Game();
var connectionID = 0;//ID given to each client

app.use(express.static(__dirname + "/public"));
app.use("/", indexRouter);
app.use("/play", indexRouter);

var server = http.createServer(app);

const wss = new websocket.Server({ server }); //pre-created node.js http server as argument
wss.on("connection", function connection(ws, req) {

    /* Two-player game: every two players are added to the same game  ... */
    var con = ws; 
    con.id = connectionID++;
    var playerType = currentGame.addPlayer(con);
    games[con.id] = currentGame;
    console.log("Player with ID %s placed in game %s as type %s", con.id, currentGame.id, playerType);

    //when the currentGame has sufficient players, start a new game
    if(currentGame.isFull() == true){
        currentGame = new Game();
    }

    //if the playerType is 'A', the player gets to choose the next word
    if(playerType == "A"){
        ws.send("CHOOSE-WORD");
    }

    /* When a player from a game sends a message, determine the other game player and send the message to him */
    ws.on("message", function incoming(message) {

        console.log("received: %s from id %s", message, ws.id);
        
        //game instance of the player
        var gameObj = games[ws.id];
        
        //walk over the list of games and determine the correct one
        for(let i=0; i<games.length; i++){
            
            //if the correct game was found and it is indeed active, send the message
            if( games[i] == gameObj && gameObj.isFull()==true){
                //which player - A or B - should receive the message?
                if(ws == games[i].playerA){
                    games[i].playerB.send(message);
                }
                else {
                    games[i].playerA.send(message);
                }
            }
        }
    });
});

server.listen(port);