# Wireframes

[Splash screen](https://wireframe.cc/uInPWd) and [game screen](https://wireframe.cc/z9NaMr).

# Creating the folder structure

It is of course possible to generate a suitable folder structure by hand, following a set of established guidelines. On the client-side, the separation of JavaScript code, HTML and CSS is important. On the server-side, routes are often placed in separate files.

There is though no point of reinventing the wheel multiple times. One tool to generate such a standard folder structure is the `express generator`, its documentation can be found [here](https://expressjs.com/en/starter/generator.html).

To use it, it first needs to be installed:

`npm install express-generator -g`

The `-g` option means it will be installed globally. If you get `EACCESS: permission denied` errors, prepend the command with `sudo`.

Move to the folder where you want to create the folder structure in and run (replace `balloons` with any name of your choice):

`express --view=ejs balloons`

This results in a folder structure that will be occuppied over the course of the assignments. Some default code is already placed in `app.js` and a few other files. What exactly this code means will become clear over the course of the next lectures.

# Assignment 1

Head to `[appname]/public` and create two HTML files: `game.html` and `splash.html`. Add the corresponding HTML.