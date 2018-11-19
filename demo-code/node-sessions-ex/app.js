const express = require("express");
const http = require("http");
const cookies = require("cookie-parser");
const sessions = require("express-session");
const credentials = require("./credentials");

const app = express();

app.use(cookies(credentials.cookieSecret));
app.use(sessions(credentials.cookieSecret));
http.createServer(app).listen(3001);

app.get("/countMe", (req, res) => {
    const { session } = req;
    if (session.views) {
        session.views++;
        res.send(`You have been here ${session.views} times (last visit: ${session.lastVisit})`);
        session.lastVisit = new Date().toLocaleDateString();
    } else {
        session.views = 1;
        session.lastVisit = new Date().toLocaleDateString();
        res.send("This is your first visit!");
    }
});
