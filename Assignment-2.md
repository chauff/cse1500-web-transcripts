# Assignment 2 (2018/2019 edition)

In this assignment you will build the backbone of your application. In the first part of this assignment, you will add **client-­side JavaScript** code to your application to make it interactive. In part two, you will write server-side code in **Node.js** and use WebSockets to enable clients to communicate with each other (via the server).

## 0. Preliminaries

Remember that this is a group assignment! Work efficiently as a team! Both team members must contribute to the code and both team members must understand all parts of the code.

### Overview of deliverables and upload procedure

| **Task** | **Deliverables**                               |
|------|----------------------------------------------------|
| 1    | -                                                  |
| 2.1  | Plan of action (bullet points are sufficient)      |
| 2.2  | Use of design patterns (bullet points are sufficient)      |
| 2.3  | Source code                                        |
| 3.1  | -                                                  |
| 3.2  | -                                                  |
| 3.3  | WebSocket-based communication pattern between clients and server  |
| 3.4  | -                                                  |
| 3.5  | Source code                                        |
| 4  | -                                        |

Deliverables 2.1, 2.2 and 3.3 must be included in a single PDF file. The first page of this PDF must contain the names and student numbers of the two team members as well as the team name.

Submit your code in the form of a zipped folder. Make sure that your code contains the necessary `package.json` file to install/run the code, i.e. it should be sufficient to run `npm install` and `npm start` to start the server. Any specific configuration parameters your code requires should be described in an accompanying `README` file.

*Note: we expect a single source code submission, **not** one code submission per task!*

The PDF and code has to be uploaded by one of the team members to Brightspace under **Assignment 2** before the assessment session with the TAs.

**To pass this assignment, you must have completed 2.1/2.2/3.3. Your application needs to include the required client/server components and client-server communication needs to be based on WebSockets. You pass if your app can deal with players executing the game as intended.** This means that it is ok, if your app does not [yet] deal with players aborting the game in the middle or making undesired moves. In addition, while it is strongly recommended to fix the issues ESLint (or any other linter you use) complains about, linter compliance (or non-compliance) does not impact your assessment.

## 1. Boilerplate code

Web application tend to have specific file and folder structures, which today are often generated automatically - you can consider those to be current best practices of how to set up a web application project with your chosen set of libraries and frameworks. In this course we will use [Express](https://expressjs.com/), a "fast, unopinionated, minimalist web framework for Node.js". Express comes with its own [application generator tool](https://expressjs.com/en/starter/generator.html).

We will use it to set up the basic code structure of our game application.

First of all, create a directory for this course and `cd` into it.

Then, install the necessary npm package `express-generator`:

```console
npm install express-generator
```

_Note: In Mac OS you might need to execute `sudo npm install -g express-generator`. In Ubuntu you may need to install also modules `commander` and `mkdirp`:_

```console
sudo npm install commander -g
sudo npm install mkdirp -g
```

Think of a name for your application, e.g. `myapp` and then generate the boilerplate code as follows:

```console
express --view=ejs myapp
```

_Note: if you already created a directory for your app in VSC, let's say 'myapp', and it is empty, you can still generate the boilerplate code as explained above._

Your terminal should show something like this:

```console
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

Node.js has become a hugely popular way of server-side programming; here is a good overview of [best practices](https://github.com/i0natan/nodebestpractices). Visual Studio Code comes with a good debugging support for Node.js by default. If you are more of a command line person, you find [here](https://www.clarkio.com/2017/04/25/debugging-in-nodejs/) a good tutorial of how to debug in the shell.

## 2. Client-side JavaScript

### 2.1)

Before you start coding, you need to have a *plan* of what needs to be done. Here, focus on your `game.html` page (we deal with `splash.html` in the next assignment). Make a list of *all* responsive UI elements and their functionality. Here are example items for the demo code introduced in the lecture to help you get started:

- mouse click on a letter in the `div` element with `id=alphabet`: first, check whether the letter is still available (enabled); if so, check whether the letter occurs in the target string (the hidden word); if yes, reveal the letter, if not, remove a balloon; disable the letter; if the guessed letter was wrong, check wether the game is lost.

The plan should include all actions possible in the game interface.

### 2.2)

Think about the design of your JavaScript code – which aspects of your action plan can you translate into objects? It will make sense to separate the game logic from the game interface. For example, you might want to model the current game state as an object, as well as the game board, the game items (e.g. an alphabet or a dice) and the specific UI elements that correspond to them.

Choose at **least one of the object design patterns introduced in the lecture and implement your objects accordingly** (the introduced basic constructor pattern is the simplest one to implement, the module pattern is more complex but preferrable for code maintainability). Feel free to try more than one design pattern.

### 2.3)

Now that you have made your plan and decided on the use of the design patterns, start coding! Be mindful of the following requirements (most you already encountered them in assignment 1):

- Besides `jQuery` (covered in the course book), no other library is allowed; use "plain" JavaScript.
- The game has to work in two major browsers.
- Players play the game with the mouse.
- Once a player makes a move, the validity of the move is checked and invalid moves are rejected.
- Reduce the redundancy in the code as much as possible (improves code maintainability).
- Create as few global variables as possible (this improves code maintainability).
- Achieve a separation between content and interaction: the client-side JavaScript must not be present in `game.html` but instead in the corresponding `[appname]/public/javascripts` folder.

---
Hints:

- You do not have to incorporate style elements yet (CSS), we will cover the style in the next assignment. If you choose to incorporate CSS (because it helps you be more productive by already having some nice visuals to look at), this is fine as well. Be aware though that we have certain requirements for CSS, so if you want to use CSS already, check out the requirements ([Assignment 3](Assignment-3.md)) to avoid duplicate work.
- You can, but do not have to use ES6 features. Check [http://es6-features.org](http://es6-features.org) if you are interested in what ES6 has to offer.
- Be mindful of the time you have for your implementation work. Go for the fast solution if one is available, and move on to the next item to implement instead of being hung up on one feature for too long. For example, the demo game requires player 1 to enter a word (that player 2 has to guess). There are different ways to ask the player to provide a word, the simplest is the use of [`Window.prompt`](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt). Unarguably there are visually more appealing solutions, however, this requires only one line of code, and is sufficient for our project. When you have time left, you can always go back to a feature and improve it.
- When you test your code's functionality, test it in two browsers. If it works in one, but not the other, check the browser's WebConsole output; you will learn quickly whether you used a feature in your code that only one of your chosen browsers supported.
- JavaScript is a dynamic language, important to remember when debugging.
- The browser development tools are extremely helpful to debug client-side JavaScript. Use them.
- Don't be afraid to use place-holders (e.g. in our word guessing game, we start off with a fixed string to guess).
- You will have to refactor/rework your code a few times as the server-side and other client-side components are added; this is expected. For instance, here you may want to check the validity of players' moves on the client-side (which is fine), but you may later decide to move this functionality to the server-side.
- If you are using `console.log`, familiarize yourself with the other abilities of the `Console` object as well, they are useful for client-side JavaScript debugging in the browser. The [MDN documentation is availab here](https://developer.mozilla.org/en-US/docs/Web/API/Console), `console.table` makes the output more readable. `console.assert` is good for sanity checks of your code: e.g. if you have functions that expect an array, you can add an assert statement to check whether the argument is indeed of the expected type.
- You can use ESLint to help you make a cleaner code. You can run it on the JavaScript files following [this guide](https://eslint.org/docs/user-guide/getting-started), or you can install it as an [extension of VSC](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), so you could see the problems in the code while you type (underlined in red). In both cases though you need to create a configuration file for the browser and another one for Node in the server. In the command line tool you can do that by typing `eslint --init`. In the VSC extension, open View::Command Palette and type `Create ESLint configuration`, once in the `myapp/public/javascript` folder for the browser code, and once in the root folder of the app for Node.js code.

---

## 3. Node.js

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

```console
node app.js 3000
```

Here, `3000` is the port number, you can use any above 1024 safely. Then, open your browser and use the following URLs:
`http://localhost:3000/game.html` and `http://localhost:3000/splash.html` (change the port number if you used a different one) - if you see the two HTML files, then, congratulations, you have successfully "implemented" your first Node.js server!

You can also use `npm start`. This command runs an arbitrary command specified in the package's start property ("start" property in `package.json`). By default this property contains `"start": "nodejs ./bin/www"`. Replace this line by `"start": "nodejs app.js"` in order to execute your program entry point which, in this case, is `app.js`.

Alternatively you can also start a server directly from VSC by installing [this extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer). Once started, you will be able to open any HTML file by right-clicking on the file and selecting "Open with Live Server".

### 3.2) Your first routes

In the next step, lets make our two html files available with modern web tech, i.e. routes:

URLs ending in  `*.html` are considered old-fashioned, modern web frameworks avoid this and use *routes* instead. Add a route (i.e. `app.get("/",...)`) so that `splash.html` is served for the URL `http://localhost:3000/`. You can make use of `res.sendFile("splash.html", {root: "./public"});`. A click on the `Play` button (or your equivalent) in the splash screen will return the `game.html` content (Hint: if you are using the HTML `<button>` element here, you can simply enclose it in an HTML `<form>` with an appropriate `action` attribute.). Together with the `app.use(express.static(__dirname + "/public"));` line in your server, this is sufficient to serve your HTML and client-side JavaScript.

**[TODO: mention to store the routes in routes/index.js]**

### 3.3) WebSockets: communication between client and server

Before you are implementing the client-server communication via WebSockets, it is important to work out which entity communicates what.

For example, your game may have different types of players (in our example game, we have a *word creator* and a *word guessers*) and the type of player a client corresponds to, should be communicated to each client. The moves need to be communicated between clients (the *word guesser* messages the char guessed to the *word creator*). Who won the game may be important for the server to log and here one player type may be responsible for communicating this to the server; in this case, all game logic and game validity checks can be done by the clients.

Create a list of message types (e.g. game-start, game-move, player-type, abort-game, ...) and work out who (server, client-A, client-B) communicates it to whom. How many and what types of messages you need depends on your chosen game to implement.

### 3.4) WebSockets: a minimum viable examples

Lets now connect our two (or more - depending on the game you chose) gamers, to play together. Time for the [WebScoket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API). We use [ws](https://github.com/websockets/ws) one of the most popular WebSocket implementations for Node.js.

First, lets install it via `npm`:

````console
npm install --save ws
````

Before you implement anything useful, try this [minimal example](demo-code/node-websocket-ex) of a WebSocket - **note, that it is completely independent of your board game application code!**. In this minimum viable example, a client establishes a WebSocket connection with a WebSocket handshake. It sends a *Hello from the client* message to the server, which responds with a *Hello to you too!* and logs the client's message. WebSocket programming thus requires both changes in the client-side and server-side code. Here is our minimal client code (`test.html`):

```html
<!DOCTYPE html>
<html>
    <head>
        <title>WebSocket test</title>
    </head>
    <body>
        <main>
            Waiting for a hello from the server: <span id="hello"></span>
        </main>

        <!-- Poor coding standard, only for demonstration purposes.
             JavaScript code should not be part of HTML documents.
        -->
        <script>
            var socket = new WebSocket("ws://localhost:3000");
            socket.onmessage = function(event){
                document.getElementById("hello").innerHTML = event.data;
            }

            socket.onopen = function(){
                socket.send("Hello from the client!");
            };
        </script>
    </body>
</html>
```

The server-side code (`app-test.js`) is equally short:

```javascript
var express = require("express");
var http = require("http");
var websocket = require("ws");

var port = process.argv[2];
var app = express();

app.use("/", function(req, res) {
    res.sendFile("test.html", {root: "./"});
});

var server = http.createServer(app).listen(port);

const wss = new websocket.Server({ server });

wss.on("connection", function connection(ws, req) {

    ws.send("Hello to you too!");

    ws.on("message", function incoming(message) {
        console.log("[LOG]: "+message);
    });
});
```

To check whether this minimal example works, place `test.html` and `app-test.js` in a single directory and run `node app-test.js 3000`. You will receive errors for missing Node packages, unless you have placed those two files in a directory with the correct Node packages already installed. That should not stop you, however, by now you know how to install Node packages (`npm install ...`). Once your `app-test` server is running, open the browser at `http://localhost:3000/` and you will see your first WebSocket in action.

### 3.5) WebSockets: implementing your game

Having seen and ran the minimal WebSocket example, it is now time to implement client-server communication in your game application via WebSockets. Here is what we want to achieve:

- Upon pressing "Play" button the user will enter the **game screen** and wait for a sufficient number of other gamers to start playing. It is clear for the player that s/he is waiting for more players to enter the game (*as stated in assignment 1*).
- Once there are sufficiently many players, the game automatically starts and the players play against each other. Multiple games can take place at the same time (*as stated in assignment 1*). Some games require a setup phase (e.g. [Battleship](https://en.wikipedia.org/wiki/Battleship_(game))) which may differ between players (e.g. in [Mastermind](https://en.wikipedia.org/wiki/Mastermind_(board_game)) one player is the codemaker and one is the codebreaker).
- Once a player drops out of an ongoing game, the other players are alerted and the game is aborted.
- Once a game is finished, the winner(s) and loser(s) receive a status update.
- The server keeps track of certain game statistics (as stated in assignment 1: pick three statistics you want to report).
- The players communicate with each other (i.e. their moves) via WebSockets.

---
Hints:

- You may want to share code between the client and server - the message types described above are a good candidate for code you do not want to duplicate. The solution is a particular design pattern, [described here](https://medium.com/@ShamreshKhan/how-to-share-client-side-and-server-side-js-code-cc04c3422497). If you add for instance `messages.js` to `myapp/public/javascripts` following that particular design pattern, you can add the following line to `app.js` to access it in Node as well: `var messages = require("./public/javascripts/messages");`.

- The server has to keep track of all ongoing games in order to facilitate the broadcasting of messages to the correct clients. There are many ways to do this, one option is to create a `game` object that keeps track of the WebSocket objects belonging to the game's players; each WebSocket object receives an `id` and a `Map` object with WebSocket `id` as key and `game` object as values ensures that the server can determine quickly for which WebSockets the received messages are meant. In order to clean up your WebSocket-Game map, you can use a `setInterval` function to regularly check and remove inactive/completed games from it.

- The game status on the server can be implemented as an in-memory object; we do not require you to store the game status in a database (will happen in a later assignment) or on file.

---

## 4. Cleaning up

Ensure that your app works as intended in two major browsers.

Check the ESLint (or any other linter) output: it should help you to spot easy-to-make mistakes (which in turn should help you write better code). We recommend that you fix them; though this is not required.

Ensure that your code contains the necessary `package.json` file content to install/run the code, i.e. it should be sufficient to take your `myapp` folder, and run `npm install` and `npm start` to start the server. Any specific configuration parameters your code requires should be described in an accompanying `README` file.
