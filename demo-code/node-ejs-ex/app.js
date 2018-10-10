/* global __dirname */
/* global process */
var express = require("express");
var url = require("url");
var http = require("http");
var app;

var port = process.argv[2];
app = express();
http.createServer(app).listen(port, function () {
  console.log("Ready on port " + port);
});

var todos = [];
todos.push({ message: 'Final exam', dueDate: 'January 2016'  });
todos.push({ message: 'Prepare for assignment 6', dueDate: '05/01/2016' });
todos.push({ message: 'Sign up for final exam', dueDate: '06/01/2016' });
 
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/todos", function (req, res) {
  res.render('todos', { title: 'My list of TODOs', todo_array: todos });
});
