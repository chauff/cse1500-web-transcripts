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

Think about the design of your JavaScript code – which aspects of your action plan can you translate into objects? For example, you might want to model the current game state as an object as well as the game statistics. Similarly, you can also think about modeling the list of all possible actions as an object and so on. Decide on the use of at least one of the introduced JavaScript design patterns.

### 1.3)

Now that you have made your plan and decided on the use of design patterns, start coding! Implement your plan of actions one action at a time with the following requirements:

- Reduce the redundancy in the code as much as possible.
- Create as few global variables as possible.
- Achieve a separation between content and interaction: the client-side JavaScript must not be present in `game.html` but instead in the corresponding `[appname]/public/javascripts` folder.

A few hints:

- JavaScript is a dynamic language, important to remember when debugging.
- The browser development tools are extremely helpful to debug client-side JavaScript. Use them.
- Don't be afraid to use place-holders (e.g. in our word guessing game, we start off with a fixed string to guess).
- You will have to refactor/rework your code a few times as the server-side and other client-side components are added; this is normal.
- If you are using `console.log`, familiarize yourself with the other abilities of the `Console` object as well, they are useful for client-side JavaScript debugging in the browser. The [MDN documentation is availab here](https://developer.mozilla.org/en-US/docs/Web/API/Console), `console.table` makes the output more readable and `console.assert` is good for sanity checks of your code.
- **[TODO: describe how to use eslint, why; node code vs browser code - we need two variants]** [ESLint](https://eslint.org/docs/user-guide/getting-started)

*Note: do not have to incorporate style elements yet (CSS), we will cover the style in the next assignment. If you choose to incorporate CSS, be aware that the TAs will ignore the CSS during the assessment.*

## 4. node.js

So far your application can handle basic interactions, through client-side JavaScript. Lets now
implement a first node.js script. Your script should be able to do the following:

- Keep a list of the habits in memory on the server.
- Allow the client (the browser) to retrieve the habits from the server; use the JSON format for this task.
- Allow the client to add a habit to the server.
- Allow the client to update a habit on the server.
- Allow the client to delete a habit from the server.

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