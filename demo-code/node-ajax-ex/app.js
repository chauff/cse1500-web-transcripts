/* global Buffer */
/* global __dirname */
var express = require("express");
var url = require("url");
var http = require("http");

var port = 3000;
var app = express();
app.use(express.static(__dirname + "/client"));
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
