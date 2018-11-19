const main = function () {
    const addTodosToList = function (todos) {
        console.log("Loading todos from server");
        const todolist = document.getElementById("todo-list");
        for (const key in todos) {
            const li = document.createElement("li");
            li.innerHTML = `TODO: ${todos[key].message}`;
            todolist.appendChild(li);
        }
    };

    /*
  * This request retrieves the todo list once, to make this a regular
  * "event", make use of setInterval()
  */
    $.getJSON("../todos", addTodosToList)
        .done(() => { console.log("Ajax request successful."); })
        .fail(() => { console.log("Ajax request failed."); });
};
$(document).ready(main);
