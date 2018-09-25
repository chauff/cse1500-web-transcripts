var main = function () {
	"use strict";

	var addTodosToList = function (todos) {
		console.log("Loading todos from server");
		var todolist = document.getElementById("todo-list");
		for (var key in todos) {
			var li = document.createElement("li");
			li.innerHTML = "TODO: " + todos[key].message;
			todolist.appendChild(li);
		}
	};

	/*
	 * This request retrieves the todo list once, to make this a regular
	 * "event", make use of setInterval() 
	 */ 
	$.getJSON("../todos", addTodosToList)
		.done( function(){ console.log("Ajax request successful.");})
		.fail( function(){ console.log("Ajax request failed.");});
};
$(document).ready(main);