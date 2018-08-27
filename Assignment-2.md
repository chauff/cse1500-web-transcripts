# Assignment 2

In this assignment you will build the backbone of your application. In the first part of this assignment, you will add **client-­side JavaScript** code to your application to make it interactive. In part two, you will write server-side code in **node.js** and use Ajax/JSON to enable the client and server to communicate with each other.

## 0. Preliminaries

Remember that this is a group assignment! Work efficiently as a team! Both team members must contribute to the code and both team members must understand all parts of the code. The group interviews will focus on having the required functionality and showing off your understanding of the code. If you have not programmed as a team before, read up on our introduction to [Visual Studio Code](How-to-use-VSC.md).

### Overview of deliverables and upload procedure

If you get lost in the assignment, use this overview of deliverables to get back on track!

| **Task** | **Deliverables**                               |
|------|----------------------------------------------------|
| 1.1  | Plan of action (bullet points are sufficient)      |
| 1.2  | Use of design patterns (bullet points are sufficient)      |
| 1.3  | Client-side JavaScript      |

All deliverable text/imagery must be included in a single PDF file. The first page of this PDF must contain the names and student numbers of the two team members as well as the team name. The PDF has to be uploaded by one of the team members to Brightspace **before** the assessment with the TAs. **[TODO: some info on where to upload]**

## 1. Client-side JavaScript

### 1.1)

Before you start coding, you need to have a *plan* of what needs to be done. Here, focus on your `game.html` page (we deal with `splash.html` in the next assignment). Make a list of *all* responsive UI elements and their functionality. Here are example items for the demo code introduced in the lecture to help you get started:

- mouse click on a letter in the `div` element with `id=alphabet`: first, check whether the letter is still available (enabled); if so, check whether the letter occurs in the target string (the hidden word); if yes, reveal the letter, if not, remove a balloon; disable the letter; if the guessed letter was wrong, check wether the game is lost.

The plan should include all actions possible in the game interface.

### 1.2)

Think about the design of your JavaScript code – which aspects of your action plan can you translate into objects? It will make sense to separate the game logic from the game interface. For example, you might want to model the current game state as an object, as well as the game board, the game items (e.g. an alphabet or a dice) and the specific UI elements that correspond to them.

Choose at **least one of the object design patterns introduced in the lecture and implement your objects accordingly** (the introduced basic constructor pattern is the simplest one to implement, the module pattern is more complex but preferrable for code maintainability). Feel free to try more than one design pattern.

### 1.3)

Now that you have made your plan and decided on the use of the design patterns, start coding! Be mindful of the following requirements:

- Reduce the redundancy in the code as much as possible (improves code maintainability).
- Create as few global variables as possible (improves code maintainability).
- Achieve a separation between content and interaction: the client-side JavaScript must not be present in `game.html` but instead in the corresponding `[appname]/public/javascripts` folder.

A few hints:

- JavaScript is a dynamic language, important to remember when debugging.
- The browser development tools are extremely helpful to debug client-side JavaScript. Use them.
- Don't be afraid to use place-holders (e.g. in our word guessing game, we start off with a fixed string to guess).
- You will have to refactor/rework your code a few times as the server-side and other client-side components are added; this is normal.
- If you are using `console.log`, familiarize yourself with the other abilities of the `Console` object as well, they are useful for client-side JavaScript debugging in the browser. The [MDN documentation is availab here](https://developer.mozilla.org/en-US/docs/Web/API/Console), `console.table` makes the output more readable. `console.assert` is good for sanity checks of your code: e.g. if you have functions that expect an array, you can add an assert statement to check whether the argument is indeed of the expected type. 
- **[TODO: describe how to use eslint, why; node code vs browser code - we need two variants; check what the difference is between the npm module and the VSC extension]** [ESLint](https://eslint.org/docs/user-guide/getting-started)

*Note: do not have to incorporate style elements yet (CSS), we will cover the style in the next assignment. If you choose to incorporate CSS, be aware that the TAs will ignore the CSS during the assessment.*

## 4. node.js

### 4.1) Your first server

First, install [express](https://www.npmjs.com/package/express), one of the most popular minimalist web frameworks for node.js. In the terminal, enter your top-level game folder (it contains already a `package.json` file). Run this command in the top level folder of your game app (it contains already a `package.json` file), using the `--save` option to ensure its appearance in `package.json` **[TODO: explain at some point what package.json is for ... ]**:

```
npm install express --save
```

Then, open `app.js`, delete its current content (which is an elaborate version of what we will add here) and add the following:

```javascript
var express = require("express");
var http = require("http");

var port = process.argv[2];
var app = express();

app.use(express.static(__dirname + "/public"));
http.createServer(app).listen(port);
```

This is all the code you need for your server-side (for now). Save the file, and start the server in the terminal:

```
node app.js 3000
```

Here, `3000` is the port number, you can use any above 1024 safely. Then, open your browser and use the following URLs:
`http://localhost:3000/game.html` and `http://localhost:3000/splash.html` (change the port number if you used a different one) - if you see the two HTML files, then, congratulations, you have successfully "implemented" your first node.js server!

You can also use `npm start` **[TODO: explain what needs to be done in package.json and why it is a good idea]**

### 4.2) Your first routes

In the next step, lets get a first taste of routes:

Typing out `splash.html` is pretty old-fashioned, usually there is no `.html` ending in URLs; add a route (i.e. `app.get("/",...)`) so that `splash.html` is served for the URL `http://localhost:3000/`. You can make use of `res.sendFile("splash.html", {root: "./public"});`. A click on the `Play` button (or your equivalent) in the splash screen will return the `game.html` content. (Hint: if you are using the HTML `<button>` element here, you can simply enclose it in an HTML `<form>` with an appropriate `action` attribute.).

### 4.3) WebSockets

Lets now connect our two (or more - depending on the game you chose) gamers, to play together. Time for the [WebScoket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API). We use [ws](https://github.com/websockets/ws) one of the most popular WebSocket implementations for node.js. First, lets install it via `npm`:

````
npm install --save ws
````


Here is what we want to achieve:

- If a player wants to play and sufficient other players are not available, the player should receive a status message to that effect. Once enough players are willing to play, the game starts.
- If a player wants to play and sufficient other players (or a single other player) are available, the game starts. Some games require a setup phase (e.g. [Battleship](https://en.wikipedia.org/wiki/Battleship_(game))) which may differ between players (e.g. in [Mastermind](https://en.wikipedia.org/wiki/Mastermind_(board_game)) one player is the codemaker and one is the codebreaker).
- Once a player drops out of an ongoing game, the other players are alerted and the game is aborted.
- Once a game is finished the winner and loser receive a status update.
- The server keeps track of the number of games started, the number of currently ongoing games and the number of successfully completed games.

A few hints:

- The game status on the server can be implemented as an in-memory object; we do not require you to store the game status in a database (will happen in a later assignment) or on file.
- 

Node.js has become a hugely popular way of server-side programming; here is a good overview of [best practices](https://github.com/i0natan/nodebestpractices). Visual Studio Code comes with a good debugging support for node.js by default. If you are more of a command line person, you find [here](https://www.clarkio.com/2017/04/25/debugging-in-nodejs/) a good tutorial of how to debug in the shell.

## 5. Ajax

Use Ajax to allow the dynamic updating of the habit page in the browser (i.e. without reloading of the complete page). Again, book chapters 5 & 6 of the Web course book will help you if you are stuck.

Note: Example 6 also contains a hint of how to enable repeated checking of the server (i.e. every X seconds the habit page polls the server for the habits). This can easily be achieved by wrapping this line into a timer function:

```javascript
setInterval(function () {
    console.log("Fetching the habit list from the server.");
    $.getJSON("habits", addHabitsToList);
}, 2000);
```

This piece of code will retrieve a list of habits from the server every 2 seconds (it is your job to check whether those habits differ from what is already there).