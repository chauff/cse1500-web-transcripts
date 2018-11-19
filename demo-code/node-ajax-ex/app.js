/* global Buffer */
/* global __dirname */
const express = require("express");
const url = require("url");
const http = require("http");

const port = 3000;
const app = express();
app.use(express.static(`${__dirname}/client`));
http.createServer(app).listen(port);

const todos = [];
const t1 = { message: "Maths homework due", type: 1, deadline: "12/12/2015" };
const t2 = { message: "English homework due", type: 3, deadline: "20/12/2015" };
todos.push(t1);
todos.push(t2);

// clients requests todos
app.get("/todos", (req, res) => {
    console.log("todos requested!");
    res.json(todos);
});

// add todo to the server
app.get("/addtodo", (req, res) => {
    const { query } = url.parse(req.url, true);

    if (query.message !== undefined) {
        const tx = {
            message: query.message,
            type: query.type,
            deadline: query.deadline,
        };
        todos.push(tx);
        console.log(`Added ${tx.message}`);
        res.end("Todo added successfully");
    } else {
        res.end("Error: missing message parameter");
    }
});
