---
layout: default
permalink: /rubric/
linkname: Assignment rubric
ordering: 4
---

# Rubric web technology assignments <!-- omit in toc -->

This is an overview of the rubric the teaching assistants use to assess the web technology assignments.

A single assessment session is held per group for the three web assignments. Every web assignment is assessed as either passing or non-passing. Although groups of two students are assessed, the passing/non-passing grades are handed out per student. It is thus possible for one team member to pass all three assignments and for the other to fail all three assignments.

The rubric below contains example questions/tasks for each assignment **as well as an overview of the requirements** to achieve a pass. To answer the questions, students can always consult their notes and code. 

*Note: any required Brightspace uploads that did not happen before the assessment session can still be executed during the assessment session.*

## Table of Contents <!-- omit in toc -->
- [Assignment HTTP+Design](#assignment-httpdesign)
  - [Possible questions / tasks](#possible-questions--tasks)
  - [Passing requirements](#passing-requirements)
- [Assignment JS+Node](#assignment-jsnode)
  - [Possible questions / tasks](#possible-questions--tasks-1)
  - [Passing requirements](#passing-requirements-1)
- [Assignment CSS+Node](#assignment-cssnode)
  - [Possible questions / tasks](#possible-questions--tasks-2)
  - [Passing requirements](#passing-requirements-2)

## Assignment HTTP+Design 

### Possible questions / tasks

- Show off a `HEAD` and `GET` request via telnet. What is the difference between the two?
- Execute the `PUT` request.
- What is the difference between authentication using telnet vs. a browser?
- Show off the board game design.
- Show off the four board game examples and discuss a positive and negative feature.
- Show off the HTML. How did you decide to use 'those tags' for your board game?

### Passing requirements

- The student is able to answer most of the TA's questions correctly.
- The board game design is available on TUD's Stack Overflow instance. The deliverables are uploaded to Brightspace.
- The splash / board game design fulfils the board game requirements (listed in the first web technology assignment).

## Assignment JS+Node

### Possible questions / tasks

- Show off the application's `package.json` and explain its purpose.
- Start the server and open the browser to play the game (splash screen has a play button, N players are randomly paired to play the game, the players can execute moves).
- Explain randomly chosen functions in your code.
- Explain the data structure(s) used to keep track of the game state on the server.
- How was it made possible for several players to play games at the same time?
- Discuss the design pattern(s) chosen for the game.
- Show off the messages client and server exchange to communicate the game state and discuss advantages/disadvantages.

### Passing requirements

- The student is able to answer most of the TA's questions correctly.
- The required client-side and server-side components are implemented with the languages/frameworks (i.e. JavaScript and Node.js) introduced in the course. The usage of other languages/frameworks is not allowed. The only exception is the verification of players' moves as indicated in the assignment text.
- The communication is based on WebSockets.
- One of the three design patterns discussed in class is used at least once.
- The deliverables are uploaded to Brightspace.
- The game works as intended: players are randomly paired, valid moves can be executed.


## Assignment CSS+Node

### Possible questions / tasks

- Start the server and open the browser to play the game (splash screen has a play button, N players are randomly paired to play the game, the players can execute moves, **invalid moves are rejected**).
- Show off the implemented CSS animation and explain the code.
- Show off the use of templating and explain the code.
- Show off the use of the `display:grid` and `position:absolute`.
- How are the board game tiles styled with CSS? How are the movements of game elements implemented?
- Show off the employed media query and explain its use.

### Passing requirements

- The student is able to answer most of the TA's questions correctly.
- The deliverables are uploaded to Brightspace.
- The implementation contains the necessary CSS elements.
- The splash and game screen have a consistent design.
- Templating (EJS) has been used.
- The game forbids players to make at least some invalid moves.
- Beyond CSS, the required components are implemented with the languages/frameworks (i.e. JavaScript and Node.js) introduced in the course. The usage of other languages/frameworks is not allowed.
