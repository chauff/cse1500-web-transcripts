---
layout: default
permalink: /assignmentI/
linkname: Assignment HTTP+Design
ordering: 1
warning: false
---

# Assignment HTTP+Design

The first part of this assignment gives you hands-on experience with **HTTP**. In the second part you will make a head start with the design of your **board game web application** (which you will further develop the next two assignments).

## 0. Preliminaries

Remember that this is a group assignment! Work efficiently as a team! If you have not programmed as a team before, read up on our introduction to [Visual Studio Code](../_practicals/vsc-usage.md). Use this assignment to set up a collaborative coding environment within your team. The next assignment will require extensive JavaScript programming that both team members need to contribute to.

### Overview of deliverables and upload procedure

If you get lost within the assignment, use this overview of deliverables to get back on track!

| **Task** | **Deliverables**                               |
|------|----------------------------------------------------|
| 1.1  | HTTP requests                                      |
| 1.2  | Answer Q1.2                                        |
| 1.3  | Answer Q1.3                                        |
| 1.4  | Answer Q1.4                                        |
| 2.1  | Answer Q2.1                                        |
| 3.1  | Answer Q3.1                                        |
| 3.2  | Answer Q3.2                                        |
| 4.1  | Chosen game type                                   |
| 4.2  | Three game screens (include the game URL) |
| 4.3  | Description of six (three pos., three neg.) game features                   |
| 5.1  | Splash screen design (wireframe)                   |
| 5.2  | Game screen design (wireframe)                     |
| 5.3  | →→→ upload 5.1/5.2 to 💡 TUD's Stack Overflow community               |
| 6  | Two html files                                     |

All deliverable text/imagery (apart from 6. which are two html files) must be included in a single PDF file. The first page of this PDF must contain the names and student numbers of the two team members as well as the team id (the group you signed up for on Brightspace).

The PDF and code have to be uploaded by one of the team members to 💡 Brightspace under **CSE Web assessment** (find the category your group belongs too) before the assessment session with the teaching assistants and before the ultimate assessment deadline. This means that the outcomes of all web assignments are **all** uploaded to the same directory!

**To pass this assignment, you must have completed all tasks and be able to answer the questions of the TAs.** The [rubric](../_practicals/assignment-rubric.md) contains example questions for each assignment. During the assessment you can make use of your notes.

## 1. HTTP request messages: GET/HEAD

👉 Let us start with a few hints:

- This assignment requires you to work on the shell. If you are not familiar with this type of command line interface, take a look at this [MIT class](https://missing.csail.mit.edu/); it covers the *missing semester of computer science education* and introduces a range of practical tools, including in lesson 1 [the shell](https://missing.csail.mit.edu/2020/course-shell/).
- To store `telnet`'s output to file (in addition to printing it on the console), you can use the command `tee`, e.g. `telnet www.tudelft.nl 80|tee out` will save all output to a file called `out`.
- To exit a telnet session, first press <kbd>CTRL</kbd>+<kbd>]</kbd>. This brings you to a `telnet>` prompt and you can type `close` to end the session.
- telneting `www.domain.com` is usually not the same as telneting `domain.com`. Make sure your `host` header information matches exactly.
- A [carriage return](https://developer.mozilla.org/en-US/docs/Glossary/CRLF) in the code snippets below indicates when an empty line is expected. Press `<Enter>` to add it.
- Be aware of the **backspace key** when *telneting*: while on a normal command line a backspace deletes the last character typed, within the `telnet` environment this key may be forwarded to the server instead. Be aware!
- This exercise requires you to use `telnet`. If you use a Linux derivative (e.g. Ubuntu, older versions of Mac OS), open a terminal and you are good to go; for new Mac OS versions you may need to [install telnet](https://medium.com/ayuth/bring-telnet-back-on-macos-high-sierra-11de98de1544) yourself. 
- If you are a Windows user, use the Windows Subsystem for Linux. As an alternative (if you really do not want to use Linux), use [PuTTY](https://www.putty.org/) with the following settings:
  - Use the *Raw* connection type (not *Telnet*).
  - For *Close window on exit*, use *Never*.
  - It may be useful to write your commands inside an editor first, and paste them by clicking the right mouse button inside the PuTTY session (which you start using the *Open* button).

Use `telnet` to request the `/career` resource from the `mit.edu` domain. Start your *conversation* with the web server by typing the following into the terminal :point_down:, and then perform HTTP requests to fetch the `/career` resource:

```
telnet mit.edu 80
```

### 1.1)

Write down the HTTP requests you made, the returned responses (e.g. a page has temporarily/permanently moved or is faulty) until you receive the desired contents with status code `200 OK`. Always use `HEAD` first to retrieve meta-­data about the resource.

### 1.2)

Does the content you received correspond to what you see when accessing the resource `http://mit.edu/career` with your browser (and waiting a few seconds...)?

### 1.3)

Open your browser's developer tools and head to `http://mit.edu/career` once more (and wait a few seconds). Take a look at the response header of the first resource retrieved with status code `200 OK`: what does its `Expires` header field mean?

### 1.4)

Continuing our look at the response header, what do we learn about the server-side framework used to implement the web site? Is it useful to distribute this knowledge to the end user? Why or why not?

## 2. HTTP request messages: PUT

While `GET` and `HEAD` are request methods accepted by virtually all web servers, `PUT`, `POST` and `DELETE` are less often available, due to the implications these methods have on the server.

To test your skills in uploading data, we will make use of [http://httpbin.org/](http://httpbin.org/), a popular site designed to test HTTP messages.

Below is an example of how to upload data to the server with `PUT` (before you type it out, please read the explanations below):

```
telnet httpbin.org 80

PUT /put HTTP/1.1
host:httpbin.org
Content-type:text/plain
Content-length:12
<carriage return>
Hello World!
<carriage return>
```

*Reminder: [Carriage return](https://developer.mozilla.org/en-US/docs/Glossary/CRLF) in the code snippets indicates when an empty line is expected. Press `<Enter>` to add it.*

With this code, we have modified the resource accessible at `/put` to now hold the string `Hello World!`. **The httpbin server sends back in the response the data just uploaded** -­ the response is of content-­type JSON; we are interested in the `data` field, which should contain `Hello World!` if everything worked correctly. Try it for yourself!

`PUT` though is not only able to modify an existing resource, it can also **create** a resource on the server. The status code in the response tells us whether a resource was modified (`200 OK`) or created (`201 Create`). More information can be found on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT). What happens if you try to replace `/put` in this exercise with another resource (e.g. `/myfile`)? Does the httpbin.org server allow the creation of a new resource?

### 2.1)

The `Content-­length` is exactly the number of characters (12 - we count the whitespace as well!) of `Hello World!`. What happens if the `Content-length` field is smaller or larger than the exact number of characters in the content?


## 3. Basic authentication

Let us now try to request a page, that is set up with HTTP basic authentication.

### 3.1)

First, open http://httpbin.org/basic-auth/user/passwd in your browser. You should see a dialogue, requesting username and password. Use `user` as username and `passwd` as password (*it is just a coincidence that the actual username and password is the same as the URL path*). Reload the web page -­ do you have to fill in the login details again? Why or why not?

### 3.2)

Now let's see how this works with actual HTTP messages. Go back to telnet and start off with a `HEAD` method to inspect the web page; document all following steps (requests and responses):

```console
telnet httpbin.org 80

HEAD /basic-auth/user/passwd HTTP/1.1
host:httpbin.org
<carriage return>
```

Which status code do you receive now? 

Next, use the `Authorization: Basic [base-64 encoded username/password string]` header field (you can type it out right after the `host:httpbin.org` line above) to provide username and password to the server. To encode the username and password, you can use any of the freely available base-­64 en/decoders, e.g. https://codebeautify.org/base64-encode.
Remember that username and password need to be combined as `username:password` **before** they are encoded in base-64.

Now close the TCP connection and start a new one, using again:

````console
telnet httpbin.org 80
````

Request the same page without the `Authorization` header field - what happens? Is the behavior the same as reloading the page in the browser? Explain why / why not.

## 4. Web programming project: board game app

In this, and the upcoming two assignments, you will complete a web programming project. This year, this is the implementation of a classic **board game**.

You can choose from six games:

1. [Ludo](https://en.wikipedia.org/wiki/Ludo_(board_game)): 2-4 players. **It is sufficient if you implement a working game for two players.**
2. [Draughts](https://en.wikipedia.org/wiki/Draughts): 2 players
3. Chess - there are many variants available besides the default, [pick one](https://en.wikipedia.org/wiki/List_of_chess_variants): 2-4 players depending on the variant
4. [Mastermind](https://en.wikipedia.org/wiki/Mastermind_(board_game)): 2 players
5. [Hex](https://en.wikipedia.org/wiki/Hex_(board_game)): 2 players
6. [Reversi](https://en.wikipedia.org/wiki/Reversi): 2 players

At the end of the three web assignments, your board game application will have the following functionalities:

- The game is for 2+ players and in 2D.
- The game works 2+ modern browsers (e.g. Firefox and Chrome).
- It works well on a laptop/desktop device, i.e. we are considering screen resolutions of ~1366x768 or higher. In this project, we are **not** concerned about apps for mobile devices or apps with a responsive design.
- Upon entering your web application's URL, a **splash screen** is shown that allows a user to see some statistics of the game (how many games are currently ongoing, how many users have started a game, etc. - **pick three statistics you want to report**), a brief description of how-to-play on your platform and a *Play* button (or something to that effect).
- Upon pressing *Play*, the user enters the **game screen** and waits for a sufficient number of other gamers to start playing. It is clear for the player that s/he is waiting for more players to enter the game.
- Once there are sufficiently many players, the game automatically starts and the players play against each other. Multiple games can take place at the same time.
- The splash and game screens need to look good (we do realize that this is subjective and we handle this requirement very leniently!); all required game elements need to be visible (e.g. if a game requires a dice, a dice element needs to be visible).
- Once a player makes a move, the validity of the move is checked and invalid moves are rejected. Once a player wins the game, this information is announced to all players participating in the game.
- Players see basic information about the ongoing game, e.g. the time passed since starting the game or number of lost/won pieces.
- Players play the game with the mouse (i.e. you are mostly focusing on `click` events).
- Once a player drops out of a game, the game is aborted; this is announced to all players currently active in the game.
- The game has at least one sound effect (e.g. a *ping* every time a move is made).

The list above should tell you that you have considerable (artistic) freedom.

In this course you learn how to program in "plain" JavaScript. We **do not allow external libraries or frameworks** beyond those specified in the assignments and introduced in the lectures. Concretely, we **do allow** the use of a JavaScript library of your choice to determine whether a player makes a valid move as for some games (such as chess) this is considerably more difficult than for others!

We also allow small simplifications to the chosen games, e.g. for Ludo an implementation for 2 players is sufficient, for chess you can ignore the [pawn promotion rule](https://en.wikipedia.org/wiki/Promotion_(chess)). Be upfront about the simplifications made.

**Optionally**: when you have incorporated the requirements listed above without any additional libraries/framework besides those allowed and you want to keep improving your application by adding additional functionalities, you can indeed incorporate existing libraries/frameworks. Make sure to document clearly where in your code you employ them. The obvious next step to improve your app is the inclusion of a semi-intelligent computer opponent: while for the game of Ludo it would not be too difficult to come up with a number of rules to create a decent computer opponent, for chess this would not be possible in the time you have; here, a chess engine such as [Stockfish](https://github.com/nmrugg/stockfish.js/) helps.

### 4.1)

**First of all, settle on the game you will implement in your team.**

### 4.2)

Find **three** examples of your chosen board game (in 2D) that can be played online in a modern browser (laptop or desktop, not a mobile device). Consider the web application's design (focus on the game screen) based on the **web design principles** covered in class: to what extent do they fulfill them?. Record the game URLs. 

### 4.3)

Which *game features* in the game examples of 4.2) stand out positively and which stand out negatively? (e.g. particular animations, sounds, information conveyed about the game to the players ...). Why? Discuss **three** positive and **three** negative features.

## 5. Design your own board game app

Having looked at at least three existing implementations of your chosen board game (Exercise 4.2), you are now in a position to design your own game interface. 

Similar to the [splash](https://github.com/chauff/balloons-game/blob/master/wireframes/splash.png) and [game](https://github.com/chauff/balloons-game/blob/master/wireframes/game.png) screen wireframes of the demo game, start designing your own application. Create one **splash screen** and one **game screen**. Your web application should be designed for the standard Desktop interface. Use the software of your choice to create those wireframes. If you do not have any software installed on your machine that can be used for this purpose, online platforms specifically for wireframe design are just a web search away, e.g. the simple [wireframe.cc](https://wireframe.cc/), [excalidraw](https://excalidraw.com/) or the more elaborate [NinjaMock](https://ninjamock.com/) and [Gliffy](https://www.gliffy.com/).

### 5.1)

Create a design for the splash screen (also known as *entry page*): think of a name for your application, a short description & a logo. Feel free to use media (images, sound) with a Creative Commons license. [You can start your resource search here](https://search.creativecommons.org/). The [noun project](https://thenounproject.com/) can be a useful resource for game pieces.

If you are looking for a color scheme for your design, take a look at [Google's Material palette generator](https://material.io/design/color/the-color-system.html#tools-for-picking-colors), [colorhunt](https://colorhunt.co/), [maketintsandshades](https://maketintsandshades.com/) or [Adobe's Color theme generator](https://color.adobe.com/create/color-wheel). While it is beyond the scope of our course to discuss color design choices, we recommend those interested in building web/mobile apps to take a more in-depth look at Google's [Material Design Guide](https://material.io/): it provides not only a color palette generator but also discusses Google's view on modern web design.

### 5.2)

Create a design for the game screen, keeping the requirements listed above in mind as well as your findings in Exercise 4.3).
You have a lot of artistic freedom in designing the board and game information.

### 5.3)

Once you have completed the design of your app, head over to our TUD Stack Overflow community [https://stackoverflow.com/c/tud-cs](https://stackoverflow.com/c/tud-cs) and post your designs as an [**article**](https://stackoverflow.com/c/tud-cs/articles/create) (of type *knowledge article*) with tags `cse1500` and `game-design`. Include the splash and game screens in the article and add a paragraph describing your choices. Feel free to comment on the designs of your fellow study colleagues.

## 6. Your own board game app: HTML

Similar to the demo game, take your design as a starting point and create the respective **two HTML documents**. These documents should **only** contain HTML, no CSS or JavaScript. To get an idea of the expected amount of content (it is not a lot!), take a look at our demo game's [`game.html`](https://github.com/chauff/balloons-game/blob/master/public/game.html) and [`splash.html`](https://github.com/chauff/balloons-game/blob/master/public/splash.html). Ignore the few lines of code loading JavaScript and CSS files, these will be covered in the two later assignments.
