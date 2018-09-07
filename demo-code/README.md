# Exploding Balloons

## Demo code

This game is a demo game for the CSE1500 course. To start it, execute the following steps in the terminal:

```
git clone https://github.com/chauff/Web-Teaching.git
cd Web-Teaching/demo-code/balloons/
npm install
npm start
```

You can now access the game at [http://localhost:3000/](http://localhost:3000/) in the browser. Open another browser or a New Private Window for any other player.

If you want to change the port two actions are required: (1) alter `balloons/package.json` (change the line `node app.js 3000` and replace `3000` with your preferred port); (2) alter `balloons/public/javascripts/config.js` (the port of the Websocket URL).

A click on the "Play" button brings you to the game. If you are Player 1, you are asked to think of an English word to guess. If you are Player 2, you are asked to start guessing the word Player 1 thought of.

## Testing

The demo code base also shows off how to execute unit tests with [Jest](https://jestjs.io/), a JavaScript testing library. If you want to see whether all tests pass, run:

```
npm test
```

*Note: you will learn all about testing in a later course; Jest is included here for those that want to know how testing in JavaScript can be done.*

## What about ES6?

The code is mostly void of [ES6 features](http://es6-features.org/) (the exception being the use of `let`). This was a conscious choice due to the small amount of time we have to teach JavaScript. You can use ES6 features in your own code.

## Wireframes

In sync with A1, the wireframe designs for this game are: [Splash screen](https://wireframe.cc/uInPWd) and [game screen](https://wireframe.cc/z9NaMr).

## Resources

The game requires very few resources. They are listed here:
- The English word list came from [here](https://github.com/dwyl/english-words).
- [Button click](http://www.pachd.com/button.html)
- [Balloon pop](https://bigsoundbank.com/detail-1023-explosion-far-away.html)
