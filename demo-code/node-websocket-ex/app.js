var express = require("express");
var http = require("http");
var websocket = require("ws");

var port = process.argv[2];
var app = express();

app.use("/", function(req, res) {
    res.sendFile("client/index.html", {root: "./"});
});

var server = http.createServer(app);

const wss = new websocket.Server({ server });

wss.on("connection", function(ws) {


    //let's slow down the server response time a bit to make the change visible on the client side
    setTimeout(function() {
        console.log("Connection state: "+ ws.readyState);
        ws.send("Thanks for the message. --Your server.");
        ws.close();
        console.log("Connection state: "+ ws.readyState);
    }, 2000);
    
    ws.on("message", function incoming(message) {
        console.log("[LOG] " + message);
    });
});

server.listen(port);