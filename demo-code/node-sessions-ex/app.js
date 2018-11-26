var express = require("express");
var http = require("http");
var credentials = require("./credentials");
var cookies = require("cookie-parser");
var sessions = require("express-session");
var app = express();

app.use(cookies(credentials.cookieSecret));
var sessionConfiguration = {
	// Code is slightly adjusted to avoid deprecation warnings when running the code.
	secret: credentials.cookieSecret,
	resave: false,
	saveUninitialized: true,
};
app.use(sessions(sessionConfiguration));
http.createServer(app).listen(3001);

app.get("/countMe", function (req, res) {
	var session = req.session;
	if (session.views) {
		session.views++;
		res.send("You have been here " + session.views + " times (last visit: " + session.lastVisit + ")");
		session.lastVisit = new Date().toLocaleDateString();
	}
	else {
		session.views = 1;
		session.lastVisit = new Date().toLocaleDateString();
		res.send("This is your first visit!");
	}
});