const express = require("express");
const url = require("url");
const http = require("http");

const port = 3000;
const app = express();
http.createServer(app).listen(port);

const htmlPrefix = "<!DOCTYPE html><html><head></head><body><h1>";
const htmlSuffix = "</h1></body></html>";

app.get("/greetme", (req, res) => {
    const { query } = url.parse(req.url, true);

    const name = (query.name !== undefined) ? query.name : "Anonymous";

    res.send(`${htmlPrefix}Greetings ${name}${htmlSuffix}`);
});

app.get("/goodbye", (req, res) => {
    res.send(`${htmlPrefix}Goodbye to you too!${htmlSuffix}`);
});

app.get("/*", (req, res) => {
    res.send("Not a valid route ...");
});
