# Assignment 3

In the first part of this assignment, you will finally employ *CSS* to make your splash and game screen look good.

In the second part of this assignment, you will implement a number of smaller items, that each do not take a lot of time, but round off your application and showcase additional abilities of node.js and the modern browser.

## 0. Preliminaries

Remember that this is a group assignment! Work efficiently as a team! Both team members must contribute to the code and both team members must understand all parts of the code. The group interviews will focus on having the required functionality and showing off your understanding of the code.

### Overview of deliverables and upload procedure

| **Task** | **Deliverables**                               |
|------|----------------------------------------------------|
| 1.1  | Splash screen CSS                                  |
| 1.2  | Game screen CSS                                    |
| 1.3  |→→→ *upload 1.1 / 1.2 to Brightspace*               |
| 2    | Source code                                        |
| 3    | Source code                                        |

This assignment requires you to finalize your application's source code and thus there is **no** PDF to submit.

Submit your application's **source code** either in the form of a link to a repository (on GitHub, BitBucket, etc. - make sure it is publicly accessible) or a zip file. Make sure that your submission contains the necessary `package.json` file to install/run the code, i.e. it should be sufficient to run `npm install` and `npm start` to start the server. Any specific configuration parameters your code requires should be described in an accompanying `README` file.

*Note: we expect a single source code submission, **not** one code submission per task!*

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

A hint:

- In a board game, you may want to assign elements (tiles, cards, etc.) a different status depending on player actions, e.g. a game token moves from tile A to B. A simple but effect manner to achieve this effect is to assign different CSS `classes` depending on a tile's state. In JavaScript, `document.getElementById(id).className += " anotherClass";` adds a CSS `class` to an element.

### 1.3)

Once you have completed the CSS of your app, head over to CSE1500's Brightspace, go to *Discussions* and then once more the forum **BOARD GAME APP DESIGNS**. **Find the thread you uploaded your wireframes too.** Add your implemented design screenshots to your Brightspace discussion forum thread. *Does your implementation deviate significantly from your initial design?* If so, write a paragraph comparing the two.

*Feel free to browse your colleagues designs and implementations and comment on them!*

## 2. Templating

When you started out and generated the boilerplate code (Assignmnent 2, task 1), we asked you to set as *view engine* ejs. Lets now make use of that view engine for the **splash screen**. So far, not a lot is going on with it (if you followed the instructions so far); it should visually look appealing and have a *Play* button, but that is about it.

One last requirement for the splash screen (outlined in *assignment 1*) is to show a number of statistics about the games played, games completed, etc. Templates offer us a simple way to "inject" those numbers into our splash screen.

There are many view engines available, `ejs` is one of the more common ones. All we have to do now is to (1) create a file `myapp/views/splash.ejs` file (this folder is the default one the view engine is looking into). `splash.ejs` is a copy of your `splash.html` file. Add a few template tags for the game statistics in the right place. Then, rewrite a few lines of `app.js` to incorporate the view engine and alter the route to `/`; it should now use the `res.render` call. This code snippet can help you:

```javascript
//code snippet, not a complete piece of code!
var app = express();
...
//only the route to / needs to be changed
app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    //example of data to render; here gameStatus is an object holding this information
    res.render('splash.ejs', { gamesInitialized: gameStatus.gamesInitialized, gamesCompleted: gameStatus.gamesCompleted });
})
```

*Note: in the lexture we covered Ajax, which is an alternative approach to templating for our use caes. Both technologies are relevant in practice, make sure to understand both of them.*

## 3. Desktop notifications

Desktop notificatons are becoming increasingly normal on the Web. If you don't know what exactly Desktop notificaitons are, head to []
https://developer.mozilla.org/en-US/docs/Web/API/notification
Lets tackle another requirement listed in *Assignment 1*: desktop notifications. 

## 4. Cookies - first and third party

- take a concrete website and let students determine number of cookies sent; number of third-party cookies

## 5. Performance metrics / Heroku

