var express = require("express");
var http = require("http");
var websocket = require("ws");

var port = process.argv[2];
var app = express();

app.use("/", function(req, res) {
    res.sendFile("game.html", {root: "./"});
});

var server = http.createServer(app);

const wss = new websocket.Server({ server });

wss.on("connection", function connection(ws, req) {

    ws.send("Hello to you too!");

    ws.on("message", function incoming(message) {
        console.log("[LOG]: "+message);
    });
});

server.listen(port);

