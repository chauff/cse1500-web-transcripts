# Assignment 1 (2018/2019 edition)

The first part of this assignment gives you hands-­on experience in **http**. In the second part you will make a head-­start with the design of your **board game Web application**.

## 0. Preliminaries
Remember that this is a group assignment! Work efficiently as a team! Both team members must contribute to the code and both team members must understand all parts of the code. The group interviews will focus on having the required functionality and showing off your understanding of the code. If you have not programmed as a team before, read up on our introduction to [Visual Studio Code](How-to-use-VSC.md).

### Overview of deliverables and upload procedure

If you get lost in the assignment, use this overview of deliverables to get back on track!

| **Task** | **Deliverables**                               |
|------|----------------------------------------------------|
| 1.1  | HTTP requests                                      |
| 1.2  | Answer Q1.2                                        |
| 1.3  | Answer Q1.3                                        |
| 1.4  | Answer Q1.4                                        |
| 2.1  | Answer Q2.1                                        |
| 3.1  | Answer Q3.1                                        |
| 3.2  | Answer Q3.2                                        |
| 4.1  | Four annotated game screens (include the game URL) |
| 4.2  | Description of six game features                   |
| 5.1  | Splash screen design (wireframe)                   |
| 5.2  | Game screen design (wireframe)                     |
| 5.3  | →→→ *upload 5.1/5.2 to Brightspace*                |
| 6.1  | Two html files                                     |

All deliverable text/imagery (apart from 5.3 obviously) must be included in a single PDF file. The first page of this PDF must contain the names and student numbers of the two team members as well as the team name. The PDF has to be uploaded by one of the team members to Brightspace **before** the assessment with the TAs. **[TODO: some info on where to upload]**

## 1. HTTP request messages: GET/HEAD

---
Hints:

- To store `telnet`'s output to file (in addition to printing it on the console), you can use the command `tee`, e.g. `telnet www.microsoft.com 80|tee out` will save all output to a file called `out`.

- [carriage return](https://developer.mozilla.org/en-US/docs/Glossary/CRLF) in the code snippets below indicates when to press `<Enter>`.

---

This exercise requires you to use `telnet`. If you use a Linux derivative (e.g. Ubuntu, Mac OS), open a terminal and you are good to go. If you are a Windows user please use the Windows Subsystem for Linux or use the Virtual Machine provided to you in Q1.

Use `telnet` to request the contents of the bread section of the recipe website `myrecipes.com/bread-recipes`.

**[TODO: check if the URL is still accessible]**

Start your "conversation" with the Web server by typing the following into the terminal:

```
telnet myrecipes.com 80
```

### 1.1) 
Write down the HTTP requests you made, the returned responses (e.g. a page has moved or is faulty) until you receive the contents of the recipes Web page. Always use `HEAD` first to retrieve meta-­data about the resource.

### 1.2) 
Does the content correspond to what you see when accessing the page with your browser? To check, save the response to a file, use "html" as file ending and open it with your browser.

### 1.3) 
What is the purpose of the ETag in the header information?

### 1.4) 
What do the different `Cache-Control` directives mean?

---


## 2. HTTP request messages: PUT

While `GET` and `HEAD` are request methods accepted by virtually all Web servers, `PUT`, `POST` and `DELETE` are less often available, due to the implications these methods have on the server.

To test your skills in uploading, deleting and posting data, we will make use of [http://httpbin.org/](http://httpbin.org/), a service designed to test HTTP messages.

Below is an example of how to upload data to the server with `PUT`:

```
telnet httpbin.org 80

PUT /myfile HTTP/1.1
host:httpbin.org
Content-type:text/plain
Content-length:12
[carriage return]
[carriage return]
Hello World!
[carriage return]
```

With this code, we have just created a file on the server called `myfile` which contains the string `Hello World!`. The service sends back in the response the data just uploaded -­ the response
is of content-­type JSON; we are interested in the `data` field, which should contain `Hello World!` if everything worked correctly. Try it for yourself!

### 2.1) 
The `Content-­length` is exactly the number of characters (12) of `Hello World!`. What happens if the `Content-length` field is smaller or larger than the exact number of characters in the content?

---

## 3. Basic authentication

Lets now try to request a page, which is set up with HTTP basic authentication.

### 3.1) 
First, open [http://httpbin.org/basic-auth/user/passwd](http://httpbin.org/basic-auth/user/passwd) in your browser. You should see a dialogue, requesting username and password. Use `user` as username and `passwd` as password. Reload the Web page -­ what happens now?

### 3.2) 
Now let's see how this works with actual HTTP messages. Start off with a `HEAD` method to inspect the Web page and document all following steps (requests and responses):

```
telnet httpbin.org 80

HEAD /basic-auth/user/passwd HTTP/1.1
host:httpbin.org
[carriage return]
[carriage return]
```

Then, use the `Authorization` field to provide username and password to the server. To encode the username and password, you can use any of the freely available base-­64 en/decoders, e.g.[http://decodebase64.com](http://decodebase64.com). Remember that username and password should be combined as `username:password`. **[TODO: find a better decodebase link!]**

Now close the TCP connection and start a new one, using again:

````
telnet httpbin.org 80
````

Request the same page -­ what happens? Is the behavior the same as reloading the page in the browser?

---

## 4. Web programming project: board game app

In this, and the upcoming two assignments, you will complete a Web programming project. This year, this will be a traditional **board game** - you can choose between one of 9 games; at the end, your application will have the following functionalities (you can opt to do more of course):

- The game is for 2-4 players.
- It works well in a modern browser used on a laptop/desktop device, i.e. we are considering screen resolutions of 1366x768 or higher. In this project, we are **not** concerned about apps for mobile devices.
- Upon entering your Web application's URL, a *splash screen* will be shown that allows a user to see some statistics of the game (how many games are currently ongoing, how many users have started a game, etc.), an introduction of how-to-play on your platform and a "Play" button.
- Upon pressing "Play" the user will enter the **game screen** and wait for a sufficient number of other gamers to start playing. It is clear for the player when s/he is waiting for more players to enter the game.
- Once there are sufficiently many players, the game starts and the players play against each other. Many games can take place at the same time.
- The board needs to look sufficiently good; all required game elements need to be visible (e.g. if a game requires a dice, a dice element needs to be visible).
- Once a player makes a move, the validity of the move is checked and invalid moves are rejected. Once a player wins the game, this information is announced to all players in the game.
- Players see basic information about the ongoing game (at least time passed since the game started; depending on the game other basic information should be included, e.g. in chess, each player sees a list of lost pieces).
- Players are able to play the game in fullscreen mode.
- Players play the game with the mouse.
- Players receive notifications on their Desktop when it is their turn to move.
- Once a player drops out of a game, the game is aborted.
- Moves are animated and have sound effects.

The list above should tell you that you have considerable (artistic) freedom. In each assignment, you will be given a set of minimum requirements (e.g. here are the three types of CSS rules you need to have in your code); you can of course do more than required.

The only caveat is that no external libraries or frameworks are allowed, apart from [jQuery](https://jquery.com/). We allow `jQuery` as it is used in the Web course book; you can use it too, but are not required to.

**Optionally**: if you have incorporated the requirements listed above without any additional libraries/framework besides `jQuery` and you want to keep improving your application, you can indeed incorporate existing libraries/frameworks (make sure to document clearly where in your code you employ it). The obvious next step to improve the app is the inclusion of a semi-intelligent computer opponent - while for the game of battleship it would not be too hard to implement a computer opponent yourself that performs decently [based on a number of rules](http://www.slate.com/blogs/browbeat/2012/05/16/_battleship_how_to_win_the_classic_board_game_every_time.html), for chess this would not be possible in the time you have; here, a chess engine such as [Stockfish](https://github.com/nmrugg/stockfish.js/) helps. 

Here are your board game options to choose from:

1. [Ludo](https://en.wikipedia.org/wiki/Ludo_(board_game)): 2-4 players
2. [Draughts](https://en.wikipedia.org/wiki/Draughts): 2 players
3. Chess - there are many variants available besides the default, [pick one](https://en.wikipedia.org/wiki/List_of_chess_variants): 2-4 players depending on the variant
4. [Snakes and Ladders](https://en.wikipedia.org/wiki/Snakes_and_Ladders): 2-4 players
5. [Mastermind](https://en.wikipedia.org/wiki/Mastermind_(board_game)): 2 players
6. [Scrabble](https://en.wikipedia.org/wiki/Scrabble): 2-4 players
7. [Battleship](https://en.wikipedia.org/wiki/Battleship_(game)): 2 players
8. [Reversi](https://en.wikipedia.org/wiki/Reversi): 2 players
9. [Backgammon](https://en.wikipedia.org/wiki/Backgammon): 2 players

*If your team has a different idea and wants to implement another board game that has at least the functionalities listed above, please get explicit permission from the instructors before you start doing any work by emailing (XXX) your team ID and a short description of the game you have in mind.*

**First of all, settle on the game you will implement in your team.**

### 4.1) 
Find **four** examples of your chosen board game that can be played online in a modern browser (laptop or desktop, not a mobile device). Consider the Web application's design (focus on the game screen) based on the **Web design principles** covered in class. Which design aspects stand out positively and which stand out negatively? Make a screenshot of each example and annotate the good and the bad.

### 4.2) 
Which *game features* in the examples of 4.1) stand out positively and which stand out negatively? (e.g. particular animations, sounds, information conveyed about the game to the players ...). Why? Discuss **three** positive and **three** negative features.

---

## 5. Design your own board game app

Having looked at at least five existing implementations of your chosen board game, you are now in a position to design your own game interface. Similar to the wireframe example in the course book (check Chapter 2 if you have not done so yet), start designing your own application. As pointed out already, your Web application should be designed for the standard Desktop interface (i.e. not mobile). Use the software of your choice to create those wireframes. If you do not have any software installed on your machine that can be used for this purpose ... online platforms specifically for wireframe design are just a Web search away, e.g. the simple [wireframe.cc](https://wireframe.cc/) or the more elaborate [NinjaMock](https://ninjamock.com/) and [Gliffy](https://www.gliffy.com/).

### 5.1) 

Create a design for the splash screen (entry page): think of a name for your application, a short description & a logo. Feel free to use media (images, sound) with a Creative Commons license. [You can start your resource search here](https://search.creativecommons.org/). 

### 5.2) 

Create a design for the game screen, keeping the requirements listed above in mind as well as your findings in 4.2).

### 5.3) 

Once you have completed the design of your app, head over to CSE1500's Brightspace, go to *Discussions* and then the forum **BOARD GAME APP DESIGNS**. Create a thread with your team's name as subject/title (e.g. `CSE234`) and post your team's proposed splash screen and board screen. Feel free to also add a paragraph describing your choices.

---

## 6. Your own boad game app: HTML

**[TODO: provide a folder structure that resembles what is needed later]**

### 6.1) 
Similar to the course book, take your design as a starting point and create the respective **two HTML documents** (note that these documents should only contain HTML, no CSS or JavaScript).
