# Assignment 2

In this assignment you will build the backbone of your application. In the first part of this assignment, you will add **client-­side JavaScript** code to your application to make it interactive. In part two, you will write server-side code in **node.js** and use WebSockets to enable clients to communicate with each other (via the server).

## 0. Preliminaries

Remember that this is a group assignment! Work efficiently as a team! Both team members must contribute to the code and both team members must understand all parts of the code. The group interviews will focus on having the required functionality and showing off your understanding of the code. If you have not programmed as a team before, read up on our introduction to [Visual Studio Code](How-to-use-VSC.md).

### Overview of deliverables and upload procedure

If you get lost in the assignment, use this overview of deliverables to get back on track!

| **Task** | **Deliverables**                               |
|------|----------------------------------------------------|
| 2.1  | Plan of action (bullet points are sufficient)      |
| 2.2  | Use of design patterns (bullet points are sufficient)      |
| 2.3  | Source code                                        |
| 3.1  | -                                                  |
| 3.2  | -                                                  |
| 3.3  | Communication between clients and server (bullet points are sufficient; a diagram is possible too)|
| 3.4  | Source code                                        |

Deliverables 2.1, 2.2 and 3.3 must be included in a single PDF file. The first page of this PDF must contain the names and student numbers of the two team members as well as the team name. The PDF has to be uploaded by one of the team members to Brightspace **before** the assessment with the TAs. **[TODO: some info on where to upload]**

Submit your code either in the form of a link to a repository (on GitHub, BitBucket, etc. - make sure it is publicly accessible) or a zip file. Make sure that your code contains the necessary `package.json` file to install/run the code, i.e. it should be sufficient to run `npm install` and `npm start` to start the server. Any specific configuration parameters your code requires should be described in an accompanying `README` file.

## 1. Boilerplate code

Web application tend to have specific file and folder structures, which today are often generated automatically - you can consider those to be current best practices of how to set up a Web application project with your chosen set of libraries and frameworks. In this course we [Express](https://expressjs.com/), a "fast, unopionated, minimalist Web framework for node.js". Express comes with its own [application generator tool](https://expressjs.com/en/starter/generator.html).

We will use it to set up the basic code structur of our game application. 

First of all, create a directory for this course and `cd` into it.

Then, install the necessary npm package `express-generator`:

```
npm install express-generator
```

Think of a name for your application, e.g. `myapp` and then generate the boilerplate code as follows:

```
express --view=ejs myapp
```

Your terminal should show something like this: 
```bash
   create : myapp/
   create : myapp/public/
   create : myapp/public/javascripts/
   create : myapp/public/images/
   create : myapp/public/stylesheets/
   create : myapp/public/stylesheets/style.css
   create : myapp/routes/
   create : myapp/routes/index.js
   create : myapp/routes/users.js
   create : myapp/views/
   create : myapp/views/error.ejs
   create : myapp/views/index.ejs
   create : myapp/app.js
   create : myapp/package.json
   create : myapp/bin/
   create : myapp/bin/www
```

We use `ejs` as our view engine (you will hear more about it later). When you now look at your working directory, you should see a folder `myapp` that contains the boilerplate setup. As part of it, a `package.json` file was generated, which contains a list of dependencies that your project requires. You will not yet find a `node_modules` folder with the npm packages the project requires.

In order to install those, `cd` into the `myapp` directory and execute `npm install`. Now, `node_modules` is there and populated with the required packages.

Place the `game.html` and `splash.html` documents created in assignment 1 in the folder `myapp/public/`.

Node.js has become a hugely popular way of server-side programming; here is a good overview of [best practices](https://github.com/i0natan/nodebestpractices). Visual Studio Code comes with a good debugging support for node.js by default. If you are more of a command line person, you find [here](https://www.clarkio.com/2017/04/25/debugging-in-nodejs/) a good tutorial of how to debug in the shell.

## 2. Client-side JavaScript

### 2.1)

Before you start coding, you need to have a *plan* of what needs to be done. Here, focus on your `game.html` page (we deal with `splash.html` in the next assignment). Make a list of *all* responsive UI elements and their functionality. Here are example items for the demo code introduced in the lecture to help you get started:

- mouse click on a letter in the `div` element with `id=alphabet`: first, check whether the letter is still available (enabled); if so, check whether the letter occurs in the target string (the hidden word); if yes, reveal the letter, if not, remove a balloon; disable the letter; if the guessed letter was wrong, check wether the game is lost.

The plan should include all actions possible in the game interface.

### 2.2)

Think about the design of your JavaScript code – which aspects of your action plan can you translate into objects? It will make sense to separate the game logic from the game interface. For example, you might want to model the current game state as an object, as well as the game board, the game items (e.g. an alphabet or a dice) and the specific UI elements that correspond to them.

Choose at **least one of the object design patterns introduced in the lecture and implement your objects accordingly** (the introduced basic constructor pattern is the simplest one to implement, the module pattern is more complex but preferrable for code maintainability). Feel free to try more than one design pattern.

### 2.3)

Now that you have made your plan and decided on the use of the design patterns, start coding! Be mindful of the following requirements:

- Players play the game with the mouse (*as stated in assignment 1*).
- Once a player makes a move, the validity of the move is checked and invalid moves are rejected (*as stated in assignment 1*).
- Reduce the redundancy in the code as much as possible (improves code maintainability).
- Create as few global variables as possible (this improves code maintainability).
- Achieve a separation between content and interaction: the client-side JavaScript must not be present in `game.html` but instead in the corresponding `[appname]/public/javascripts` folder.

A few hints:

- JavaScript is a dynamic language, important to remember when debugging.
- The browser development tools are extremely helpful to debug client-side JavaScript. Use them.
- Don't be afraid to use place-holders (e.g. in our word guessing game, we start off with a fixed string to guess).
- You will have to refactor/rework your code a few times as the server-side and other client-side components are added; this is expected. For instance, here you may want to check the validity of players' moves on the client-side (which is fine), but you may later decide to move this functionality to the server-side.
- If you are using `console.log`, familiarize yourself with the other abilities of the `Console` object as well, they are useful for client-side JavaScript debugging in the browser. The [MDN documentation is availab here](https://developer.mozilla.org/en-US/docs/Web/API/Console), `console.table` makes the output more readable. `console.assert` is good for sanity checks of your code: e.g. if you have functions that expect an array, you can add an assert statement to check whether the argument is indeed of the expected type.
- **[TODO: describe how to use eslint, why; node code vs browser code - we need two variants; check what the difference is between the npm module and the VSC extension]** [ESLint](https://eslint.org/docs/user-guide/getting-started)

*Note: do not have to incorporate style elements yet (CSS), we will cover the style in the next assignment. If you choose to incorporate CSS, be aware that the TAs will ignore the CSS during the assessment.*

## 3. node.js

### 3.1) Your first server

Now it is time, to start your first server. Make sure you have (1) generated the boilerplate code, (2) executed `npm install` after step (1) and copied `game.html` and `splash.html` in the `myapp/public` directory.

Now, open the generated `app.js` file, delete its current content (which is an elaborate version of what we will add here) and add the following:

```javascript
var express = require("express");
var http = require("http");

var port = process.argv[2];
var app = express();

app.use(express.static(__dirname + "/public"));
http.createServer(app).listen(port);
```

This is all the code you need for your server-side (for now). Save the file, and start the server in the terminal:
**[TODO: describe how to start the server in VSC]**

```
node app.js 3000
```

Here, `3000` is the port number, you can use any above 1024 safely. Then, open your browser and use the following URLs:
`http://localhost:3000/game.html` and `http://localhost:3000/splash.html` (change the port number if you used a different one) - if you see the two HTML files, then, congratulations, you have successfully "implemented" your first node.js server!

You can also use `npm start` **[TODO: explain what needs to be done in package.json and why it is a good idea]**

### 3.2) Your first routes

In the next step, lets get a first taste of routes:

URLs ending in  `*.html` are considered old-fashioned, modern Web frameworks avoid this and use *routes* insetad. Add a route (i.e. `app.get("/",...)`) so that `splash.html` is served for the URL `http://localhost:3000/`. You can make use of `res.sendFile("splash.html", {root: "./public"});`. A click on the `Play` button (or your equivalent) in the splash screen will return the `game.html` content. (Hint: if you are using the HTML `<button>` element here, you can simply enclose it in an HTML `<form>` with an appropriate `action` attribute.).

### 3.3) WebSockets: communication between client and server

Before you are implementing the client-server communication via WebSockets, it is important to work out which entity communicates what.

For example, your game may have different types of players (in our example game, we have a *word creator* and a *word guessers*) and the type of player a client corresponds to, should be communicated to each client. The moves need to be communicated between clients (the *word guesser* messages the char guessed to the *word creator*). Who won the game may be important for the server to log and here one player type may be responsible for communicating this to the server; in this case, all game logic and game validity checks can be done by the clients.

Create a list of message types (e.g. game-start, game-move, player-type, abort-game, ...) and work out who (server, client-A, client-B) communicates it to whom. How many and what types of messages you need depends on your chosen game to implement.

### 3.4) WebSockets implementation

Lets now connect our two (or more - depending on the game you chose) gamers, to play together. Time for the [WebScoket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API). We use [ws](https://github.com/websockets/ws) one of the most popular WebSocket implementations for node.js. First, lets install it via `npm`:

````
npm install --save ws
````

**[TODO: example of a very simple ping/pong websocket with ws]**

Here is what we want to achieve:

- Upon pressing "Play" button the user will enter the **game screen** and wait for a sufficient number of other gamers to start playing. It is clear for the player that s/he is waiting for more players to enter the game (*as stated in assignment 1*).
- Once there are sufficiently many players, the game automatically starts and the players play against each other. Multiple games can take place at the same time (*as stated in assignment 1*). Some games require a setup phase (e.g. [Battleship](https://en.wikipedia.org/wiki/Battleship_(game))) which may differ between players (e.g. in [Mastermind](https://en.wikipedia.org/wiki/Mastermind_(board_game)) one player is the codemaker and one is the codebreaker).
- Once a player drops out of an ongoing game, the other players are alerted and the game is aborted.
- Once a game is finished, the winner(s) and loser(s) receive a status update.
- The server keeps track of certain game statistics (as stated in assignment 1: pick three statistics you want to report).
- The players communicate with each other (i.e. their moves) via WebSockets.

A few hints:

- You may want to share code between the client and server - the message types described above are a good candidate for code you do not want to duplicate. The solution is a particular design pattern, [described here](https://medium.com/@ShamreshKhan/how-to-share-client-side-and-server-side-js-code-cc04c3422497). If you add for instance `messages.js` to `myapp/public/javascripts` following that particular design pattern, you can add the following line to `app.js` to access it in node as well: `var messages = require("./public/javascripts/messages");`.

- The server has to keep track of all ongoing games in order to facilitate the broadcasting of messages to the correct clients. There are many ways to do this, one option is to create a `game` object that keeps track of the WebSocket objects belonging to the game's players; each WebSocket object receives an `id` and a `Map` object with WebSocket `id` as key and `game` object as values ensures that the server can determine quickly for which WebSockets the received messages are meant.

- The game status on the server can be implemented as an in-memory object; we do not require you to store the game status in a database (will happen in a later assignment) or on file.
