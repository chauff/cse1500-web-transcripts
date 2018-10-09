/* global Buffer */
/* global __dirname */
var express = require("express");
var url = require("url");
var http = require("http");

var port = 3000; //hardcoded port

var app = express();
app.use(express.static(__dirname + "/client"));

//logger component
app.use(function (req, res, next) {
	console.log("[LOG] %s %s", new Date(), req.url);
	next();
});

//authorization component
app.use(function (req, res, next) {
	var auth = req.headers.authorization;
	if (!auth) {
		return next(new Error("Unauthorized access!"));
	}
	var parts = auth.split(' ');
	var buf = new Buffer(parts[1], 'base64');
	var login = buf.toString().split(':');
	var user = login[0];
    var password = login[1];
    
    //hardcoded for demonstration purposes
    if (user === "user" && password === "password") {
        next();
    }
	else {
		return next(new Error("Wrong username/password combination!"));
	}
});

http.createServer(app).listen(port);

var todos = [];
var t1 = { message : "Maths homework due", type  : 1, deadline : "12/12/2015"};
var t2 = { message : "English homework due", type : 3, deadline : "20/12/2015"};
todos.push(t1);
todos.push(t2);

//clients requests todos
app.get("/todos", function (req, res) {
	console.log("todos requested!");
	res.json(todos);
});

//add todo to the server
app.get("/addtodo", function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	
	if(query["message"]!==undefined) {
		var tx = { message : query["message"], 
			type: query["type"],
			deadline: query["deadline"]
		};
		todos.push(tx);
		console.log("Added " + tx.message);
		res.end("Todo added successfully");
	}
	else {
		res.end("Error: missing message parameter");
	}
});
