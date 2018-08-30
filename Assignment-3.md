# Assignment 3

In the first part of this assignment, you will finally employ *CSS* to make your splash and game screen look good.

In the second part of this assignment, you will implement a number of smaller items, that each do not take a lot of time, but round off your application and showcase additional abilities of the modern browser.

## 0. Preliminaries

Remember that this is a group assignment! Work efficiently as a team! Both team members must contribute to the code and both team members must understand all parts of the code. The group interviews will focus on having the required functionality and showing off your understanding of the code.

### Overview of deliverables and upload procedure

| **Task** | **Deliverables**                               |
|------|----------------------------------------------------|
| 1.1  | Splash screen CSS                                  |
| 1.2  | Game screen CSS                                    |
| 1.3  |→→→ *upload 1.1 / 1.2 to Brightspace*               |
| 2.1  | Plan of action (bullet points are sufficient)      |
| 2.2  | Use of design patterns (bullet points are sufficient)      |
| 2.3  | Source code                                        |
| 3.1  | -                                                  |
| 3.2  | -                                                  |
| 3.3  | WebSocket-based communication pattern between clients and server  |
| 3.4  | -                                                  |
| 3.5  | Source code                                        |

- take a concrete website and let students determine number of cookies sent; number of third-party cookies

Deliverables 2.1, 2.2 and 3.3 must be included in a single PDF file. The first page of this PDF must contain the names and student numbers of the two team members as well as the team name. The PDF has to be uploaded by one of the team members to Brightspace **before** the assessment with the TAs. **[TODO: some info on where to upload]**

Submit your code either in the form of a link to a repository (on GitHub, BitBucket, etc. - make sure it is publicly accessible) or a zip file. Make sure that your code contains the necessary `package.json` file to install/run the code, i.e. it should be sufficient to run `npm install` and `npm start` to start the server. Any specific configuration parameters your code requires should be described in an accompanying `README` file.

Use heroku??

## 1. CSS

Now that we (finally) covered CSS, you will continue to work on your splash and game screens and style them with CSS.
You are **not allowed** to use external libraries or preprocessing tools. Your application should have a modern look and feel (that is, use sufficient CSS styling).

As you might have already guessed, your CSS should reside in `myapp/public/stylesheets`. That folder already contains a `style.css` file by default. In order to keep your code maintainable, you can for instance place all CSS that applies to both screens in `style.css` and in addition create separate `splash.css` and `game.css` stylesheets for CSS rules specific to each screen. Note that stylesheets [can contain other stylesheets](https://developer.mozilla.org/en-US/docs/Web/CSS/@import).

### 1.1)

First, work on your **splash screen** and style the page with CSS according to the design you produced in Assignment 1. You can deviate from your initial design (check out 1.3 to see what to do if you did so significantly). To ensure that everyone learns the basics of CSS, we provide a list of **must-have** CSS properties, i.e. your code must include at least one instance of each of the following:

- Pseudo-classes `:hover` and `:active`
- Pseudo-elements: `::after` and `::before`
- Box model: margin, padding, border
- At least two different position attributes, e.g. `position:relative` and `position:absolute`.
- At least one CSS animation and one CSS transition

You are of course welcome to use more CSS properties to style your splash screen.

A few hints:

- CSS examples are plentiful on the Web; you can adapt them to your own needs. Make sure though, that you **understand** the different CSS rules you are adding and are able to **explain** their effect. If in doubt, go for simpler CSS rules, often the same effect can be achieved in a myriad of ways.
- If you are looking at [CSS examples from CodePen](https://codepen.io/tag/css/#) or similar platforms for inspiration, be aware of the fact that CSS extensions such as Sass exist. Do not use those, in this course we make use of *plain CSS*.

### 1.2)

Next, tackle the CSS for your **game screen**. The look of the game screen should be coherent with the splash screen. The two are likely to share basic CSS settings (colors, fonts, etc.) - make sure that you are efficient and do not duplicate existing CSS code. Check out the CSS imports mentioned above.

Your code for the game screen must have at least one instance of each of the requirements listed in 1.1).

A few hints:

- In a board game, you may want to assign elements (tiles, cards, etc.) a different status depending on player actions, e.g. a game token moves from tile A to B. A simple but effect manner to achieve this effect is to assign different CSS `classes` depending on a tile's state. In JavaScript, `document.getElementById(id).className += " anotherClass";` adds a CSS `class` to an element.

### 1.3)

Once you have completed the CSS of your app, head over to CSE1500's Brightspace, go to *Discussions* and then once more the forum **BOARD GAME APP DESIGNS**. **Find the thread you uploaded your wireframes too.** Add your implemented design screenshots to your Brightspace discussion forum thread. *Does your implementation deviate significantly from your initial design?* If so, write a paragraph comparing the two.

*Feel free to browse your colleagues designs and implementations and comment on them!*

## 2. Templating

When you started out and generated the boilerplate code (A2), you were asked to use the `ejs` view engine. Lets now make use of templating: the splash screen

So far, when you access your application's URL for the first time, an empty habit list is returned (unless you already added code to mitigate this effect). In a subsequent Ajax request, the existing habits are sent from the server to the client.
Templates allow us to change this setup and immediately send the existing habits. In this exercise you are asked to use EJS for templating. To get started, follow the EJS procedure outlined in the lecture.

*Note: this exercise requires you (once again) to rewrite parts of the code you have already written. This is not a mistake; it is intended and one of the goals of the lab: we want you to realise the different manners in which the same result can be achieved.*

## 2. Code refactoring: modularization

We finally covered the topic of node.js modules. Based on your understanding of node.js modules,
modularize your code and organize the different functionalities into separate modules (e.g. one module to keep track of all configuration settings, one module for routes, etc.).



## 5. Third-party authentication

We finally make use of the application's splash screen. Implement a third-party authentication of your own choice (e.g. Twitter [as covered in class] or Facebook). Use the passport middleware for this task: [http://passportjs.org/]](http://passportjs.org/).

The habits of each user using your application should only be visible to him/her. Note that you will have to install passport via npm (don't forget to update your `package.json`, i.e. use the `–save` option).



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

## 1. CSS
