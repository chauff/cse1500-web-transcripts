Table of Contents
==
- [Demo code](#demo-code)
    - [balloons-game](#balloons-game)
    - [node-file-watching-ex](#node-file-watching-ex)
    - [node-tcp-ex](#node-tcp-ex)
    - [node-web-ex](#node-web-ex)
    - [node-express-ex](#node-express-ex)
    - [node-websocket-ex](#node-websocket-ex)
    - [node-ajax-ex](#node-ajax-ex)
    - [node-component-ex](#node-component-ex)
    - [node-sessions-ex](#node-sessions-ex)
    - [node-cookies-ex](#node-cookies-ex)
    - [node-ejs-ex](#node-ejs-ex)

# Demo code

This directory contains the demo game (`balloons-game`) and wireframe examples (`balloons-wireframes`).

Each of the directories `node-XX-ex` contain a fully working toy example, showcasing a particular Node.js/Express concept. They are referred to and explained throughout the different web lectures. For each one, installation and usage instructions are provided.

Execute the following command in the terminal to download all source code examples (as well as all lecture materials) at once:

```console
git clone https://github.com/chauff/Web-Teaching.git
```

**The following instructions to install and run the different scripts assume you are currently in the directory where the above line was executed.**

## balloons-game

This game is a demo game. To start it, execute the following steps in the terminal:

```console
cd Web-Teaching/demo-code/balloons-game/
npm install
npm start
```

You can now access the game at [http://localhost:3000/](http://localhost:3000/) in the browser. Open another browser or a New Private Window for any other player.

If you want to change the port two actions are required: (1) alter `balloons-game/package.json` (change the line `node app.js 3000` and replace `3000` with your preferred port); (2) alter `balloons-game/public/javascripts/config.js` (the port of the Websocket URL).

A click on the "Play" button brings you to the game. If you are Player 1, you are asked to think of an English word to guess. If you are Player 2, you are asked to start guessing the word Player 1 thought of.

The demo code base also shows off how to execute **unit tests** with [Jest](https://jestjs.io/), a JavaScript testing library. If you want to see whether all tests pass, run (after installing it):

```
npm test
```

*Note: you will learn all about testing in a later course; Jest is included here for those that want to know how testing in JavaScript can be done.*

The code is mostly void of [ES6 features](http://es6-features.org/) - the exception being the use of `let`. This was a conscious choice due to the small amount of time we have to teach JavaScript. You can use ES6 features in your own code.

In alignment with A1, the wireframe designs for this game are: [Splash screen](https://wireframe.cc/uInPWd) and [game screen](https://wireframe.cc/z9NaMr).

The game required very few public resources. They are listed here:
- The English word list came from https://github.com/dwyl/english-words
- [Button click sound](http://www.pachd.com/button.html)
- [Balloon pop sound](https://bigsoundbank.com/detail-1023-explosion-far-away.html)

## node-file-watching-ex

This Node.js script *watches* a file and reports on the console, when a change occurred.

To run it, execute the following commands in your terminal:

```console
cd Web-Teaching/demo-code/node-file-watching-ex/
node watching.js todos.txt
```

If you now change the file `todos.txt` (which resides in the same folder as `watching.js`) in your favorite editor, you will see a `File changed!` message appear in the terminal.

## node-tcp-ex

This Node.js script (=server) watches a file and informs subscribed clients about file changes.

To run it, execute the following commands in your terminal:

```console
cd Web-Teaching/demo-code/node-tcp-ex/
node tcp.js todos.txt 3000
```

Of course you can change the port number at will (we use 3000 for all our examples). If everything runs as intended, you will see a `Listening to subscribers...` message.

Now open **another** terminal window (*while keeping the first one open*) and use `telnet` to subscribe **as a client** with the following command:

```console
telnet localhost 3000
```

If everything went as intended, your client now shows the message `Now watching todos.txt for changes` and your server shows `Subscriber connected`. Alter the `todos.txt` file and then disconnect the client and observe the message(s) that appear.

## node-web-ex

This Node.js script shows the most minimalistic web server possible: whatever the HTTP request, it will respond with `Hello World!`. To start it, execute the following command in your terminal:

```console
cd Web-Teaching/demo-code/node-web-ex/
node web.js 3000
```

Open your browser and use the following URL `http://localhost:3000/` to receive the server's `Hello World!` message.

## node-express-ex

This Node.js script makes use of the Express framework. It is a simple web server that has a route `/greetme` and sends a simple text message in the HTTP response. As Express is not a module installed by default, we first have to install the required modules as stated in `package.json`:

```console
cd Web-Teaching/demo-code/node-express-ex/
npm install
node web.js
```

Here, we actually do not provide a port number, as port `3000` is hard-coded into `web.js`. Now open your browser and try different URLs:

- http://localhost:3000/
- http://localhost:3000/greetme
- http://localhost:3000/greetme?name=Claudia
- http://localhost:3000/greetme?firstname=Claudia
- http://localhost:3000/greetme?location=Delft&name=Claudia
- http://localhost:3001/

## node-websocket-ex

This Node.js script makes use of the Express framework. It is a simple web server that has a route `/greetme` and sends a simple text message in the HTTP response. As Express is not a module installed by default, we first have to install the required modules as stated in `package.json` and then, the server can be started:

```console
cd Web-Teaching/demo-code/node-websocket-ex/
npm install
node app.js 3000
```

Now open your browser and access the following URL: http://localhost:3000/. The client initiates the WebSocket connection with the server and receives a corresponding response. You can see this happening clearly when opening the Network Monitor of the browser's web development tools.

*Note: in `package.json` we have defined a `start` script this time, we could have also started the application with `npm start` instead of `node app.js 3000`. Both options are valid and result in the same behavior.*

## node-ajax-ex

This Node.js script showcases the use of Ajax in the form of a toy todo application. The server has todo items stored in memory that can be retrieved by the client (`/todos`); the client can also send additional todo items to the server (`/addtodo`). Install and start the server as follows:

```console
cd Web-Teaching/demo-code/node-ajax-ex/
npm install
node app.js
```

Now open your browser and access the following URL: http://localhost:3000/. You will see a list of todos (retrieved through an Ajax request).

*Note: as in the previous example, we have defined a `start` script, so `node app.js` could have been replaced by `npm start`.*

## node-component-ex

Install and run the server (which sends todos to the client when the client requests them with the correct username/password combination):

```console
cd Web-Teaching/demo-code/node-component-ex/
npm install
npm start
```

Now open another terminal and use `curl`:

- Request the list of todos without authorization, i.e. `curl http://localhost:3000/todos` - you should see an `Unauthorized access` error.
- Request the list of todos with the correct username and password (as hard-coded in our demonstration code): `curl --user user:password http://localhost:3000/todos`. The option `--user` allows us to specify the username and password to use for authentication in the `[USER]:[PASSWORD]` format. This request should work and you should receive the list of todos.
- Request the list of todos with an incorrect username/password combination: `curl --user test:test http://localhost:3000/todos`. You should receive a `Wrong username/password combination` error.

## node-sessions-ex

In this toy example, we count how often a user access a route (`/countme`) in a session. Install and start the server as follows:

```console
cd Web-Teaching/demo-code/node-sessions-ex/
npm install
node app.js
```

Now open your browser and access the following URL: http://localhost:3001/. Refresh the page a few times and then restart the browser or use a private browser window to start another session (just opening a new browser tab or window will not result in another session).

## node-cookies-ex

In this toy example, we count how often a user access a route (`/countme`) in a session. Install and start the server as follows:

```console
cd Web-Teaching/demo-code/node-cookies-ex/
npm install
node app.js 3000
```

Now open your browser and access the following URLs:
- http://localhost:3000/sendMeCookies
- http://localhost:3000/listAllcookies

In order to see the cookies the browser receives, open the Network Monitor of the web development tools.

## node-ejs-ex

In this toy example, we use the view engine to send HTML templates with data in response to HTTP requests. Install and start the server:

```console
cd Web-Teaching/demo-code/node-ejs-ex/
npm install
node app.js 3000
```

Now open your browser and access the following URL: http://localhost:3000/todos.
