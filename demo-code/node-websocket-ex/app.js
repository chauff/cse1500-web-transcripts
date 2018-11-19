const express = require("express");
const http = require("http");
const websocket = require("ws");

const port = process.argv[2];
const app = express();

app.use("/", (req, res) => {
    res.sendFile("client/index.html", { root: "./" });
});

const server = http.createServer(app);

const wss = new websocket.Server({ server });

wss.on("connection", (ws) => {
    // let's slow down the server response time a bit to make the change visible on the client side
    setTimeout(() => {
        console.log(`Connection state: ${ws.readyState}`);
        ws.send("Thanks for the message. --Your server.");
        ws.close();
        console.log(`Connection state: ${ws.readyState}`);
    }, 2000);

    ws.on("message", (message) => {
        console.log(`[LOG] ${message}`);
    });
});

server.listen(port);
