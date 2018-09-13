# CSS: the language of Web design

## Learning goals

- Position and style HTML elements according to a given design of a Web page 
- Employ pseudo-classes and pseudo-elements
- Employ CSS variables and data access/creation facilities
- Write CSS media queries
- Create basic CSS-based animations 

## A word of warning ...

[A tweet.](https://twitter.com/iamdevloper/status/936199543099621376)

This tweet pretty much sums up CSS - some things are incredible easy with CSS (animations come to mind), while others, which intuitively should not be that hard to accomplish, will cost you a lot of time. CSS - or **Cascading Style Sheets** - is a very complex language as you will find out in a moment.


## A bit of context

In essence, CSS describes how elements in the DOM should be rendered.

As other Web technologies, CSS can be considered as a victim of the browser wars - which led to years of inactivity in the standards' development:
- **CSS 1** became a W3C recommendation in 1996. It had support for fonts, colors, alignment, margins ids and classes.
- Two years later, **CCS 2** became a W3C recommendation, adding support for media queries and element positioning (among others). The W3C was ready to get started on CSS 3. However, the browser support for CSS 2 remained inconsistent; the W3C decided to focus on fixing inconsistencies with CSS 2.1.
- In 2011, **CSS 2.1** became a W3C recommendation whcih fixed errors and added support for features already widely implemented in major browsers (standardization of features that the browser vendors by themselves had added without much coordination).
- Work on **CSS 3** began already in 1998, was put on hold, and is now back in full swing with browser vendors today eager to implement the newest standards. CSS became so complex and agreeing on a standard for the entire language became so tedious that after CSS 2 that the monolithic nature of the standard was given up. Instead, we now have **CSS modules**, which each progress at an individual pace. The current status of those modules is available at [https://www.w3.org/Style/CSS/current-work](https://www.w3.org/Style/CSS/current-work). Many of those modules are in *Working Draft* status, while some have already reached level 4 (the level number indicates how many revisions of the module have taken place). One of the modules in working draft status is [CSS Animations Level 1](https://www.w3.org/TR/css-animations-1/) which - not surprisingly - describes the standard for CSS-based animations. Despite this being a *Working Draft*, CSS animations are already supported by all major browsers - at least partially with at times vendor-specific CSS properties (instead of standardized ones). 

Any CSS module developed after CSS 2.1 can be considered CSS 3. There will not be a monolithic CSS 4, instead the different modules of the CSS specification will each continue to develop at their own pace. 

Today, it is not possible to make use of the latest CSS features and to expect them to work across all major browsers. Instead, which features to use should be based on
- the intended user base (will tell us something about the most popular browsers in use);
- the mode of usage (smartphone vs. touch screen vs ...);
- the type of Web application (are 3D animations necessary);

When building Web applications that should work across a range of browsers (old and new), you will come across the terms **shims**, **fallbacks** and **polyfills**. These are all terms used to provide HTML5 (that includes CSS3) functionality in browsers that do not natively support them. Even 


## Take-aways of book chapter 3

If you have already read Chapter 3 of the course book, you should be able to answer the following question.

What is the result of applying the CSS below?
- The text within the paragraph `<p class="last">...</p>` will appear green.
- The text within `<span>...</span>` appearing right after a paragraph `<p>...</p>` will appear grey.
- The text within `<span>...</span>` appearing within a paragraph `<p>...</p>` will appear grey.
- The background of the rendered page will appear yellow.

```css
body {
    background-color: #ffff00;
    width: 800px;
    margin: auto;
}
h1 {
    color: maroon;
}
p span {
    color: gray;
    border: 1px solid gray;
}
p#last {
    color: green;
}
```

You have read about the three types of style sheets:
- the browser's style sheet;
- the author's style sheet;
- the user's style sheet;
with the user's style sheet overriding the other two and the author's style sheet overriding the browser's.

Style sheets are processed in order: later declarations override earlier ones if they are on the same or a higher specificity level.

You know that in the code snippet above, `body` is a **selector**, `background-color` is a **property** and `#ffff00` is a **value**.

Lastly, you read about `!important` which overrides all other declarations.



## Pseudo-elements and pseudo-classes

A **pseudo-class** is a keyword added to a **selector** that indicates *a particular state or type* of the corresponding element. Pseudo-classes allow styling according to (among others) **document external** factors such as mouse movements and user browsing history.

They are used as follows:

```css
selector:pseudo-class {
    property: value;
    property: value;
}
```

### Popular pseudo-classes

- `nth-child(X)` is any element that is the Xth **child element** of its parent;
- `nth-of-type(X)` is any element that is the Xth **sibling** of its type.

In both cases, `X` can be an int or formula, e.g `2n+1`, where `n` represents a number starting at 0 and incrementing.	

In this example both pseudo-classes are showcased:

```html
<!DOCTYPE html>
<html>
    <head>
        <style>
            p:nth-child(2){
                color: red;
            }
            p:nth-of-type(2){
                background-color: #00ff00;
            }
            div {
                color: #00ff00;
            }
        </style>
    </head>
    <body>

        <main> <!-- parent of the <h2> and <p>'s -->
            <h2>Todos</h2>
            <p>Today's todos</p>    <!-- p sibling, also the second child of <main> -->
            <p>Tomorrow's todos</p> <!-- p sibling -->
            <p>Saturday's todos</p> <!-- p sibling -->
            <p>Sunday's todos</p>   <!-- p sibling -->
        </main>
    </body>
</html>
```

The rendering will show `Today's todos` with a red font (it is the 2. child of `<main>`) and `Tomorrow's todos` with a green background color (`#00ff00`) as that is the second element of type `<p>` among the sibling group.

If we are aiming at the first and/or last child or sibling element, we can also use a different set of pseudo-classes:

| Pseudo-class   | Equivalent to        |
|----------------|----------------------|
| :first-child   | :nth-child(1)        |
| :last-child    | :nth-last-child(1)   |
| :first-of-type | :nth-of-type(1)      |
| :last-of-type  | :nth-last-of-type(1) |


One of the often voiced complaints about CSS used to be the lack of variables support (and thus languages that compile into CSS were born, e.g. [Sass](https://sass-lang.com/)) - in the example above, we set the same value of `#00ff00;` on two properties. If we now decide to change that color value, we would have to manually walk over all style sheets and alter it. Clearly, variables (i.e. *entities containing specific values that can be reused*) would be very helpful.

In fact, since 2015/2016 (yes! it took that long), [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) are supported in today's major browsers. Here is how they work:

```html
<!DOCTYPE html>
<html>
    <head>
        <style>
            :root {
                --main-color: #00ff00;
            }
            p:nth-child(2){
                color: red;
            }
            p:nth-of-type(2){
                background-color: var(--main-color);
            }
            div {
                color: var(--main-color);
            }
        </style>
    </head>
    <body>

        <main> <!-- parent of the <h2> and <p>'s -->
            <h2>Todos</h2>
            <p>Today's todos</p>    <!-- p sibling, also the second child of <main> -->
            <p>Tomorrow's todos</p> <!-- p sibling -->
            <p>Saturday's todos</p> <!-- p sibling -->
            <p>Sunday's todos</p>   <!-- p sibling -->
        </main>
    </body>
</html>
```

In this example, we want to create a number of so-called global CSS variables, i.e. they should be available to all elements in the DOM tree. For this reason, we make use of the pseudo-element `:root` which represents the `<html>` element. Variables are defined with the custum prefix `--` and can be accessed using the `var()` functionality.

In the beginning we mentioned as one of the document external factors mouse movements that we can make our elements react to. Two popular pseudo-classes in this category are `:hover` and `:active`:
- `:hover` is a selector that becomes active when a mouseover on the element occurs
- `:active` is a selector that becomes active when the element is currently *being active* (usually that means clicked)

```html
<!DOCTYPE html>
<html>
    <head>
        <style>
            button {
                background: white;
                color: darkgray;
                width: 100px;
                padding: 5px;
                font-weight: bold;
                text-align: center;
                border: 1px solid darkgray;
            }

            button:hover {
                color: white;
                background: darkgray;
            }

            button:active {
                border: 1px dashed;
                border-color: black;
            }
        </style>
    </head>
    <body>
        <main>
            <button>Add Todo</button>
        </main>
    </body>
</html>
```

While this may seem not very impressive, `:hover` can also easily employed to create image galleries (preview vs. full image) as well as pure CSS dropdown menus (hide the menu items apart from the "header" and only reveal them when the mouse hovers over the header).

Particularly important for games may be the pseudo-classes `:enabled` and `:disabled`; imagine a game item that is only available sometimes (in our demo game for instance once a letter has been clicked once it is no longer possible to click/select it again). And of course this information should be visually conveyed to the user:
- `:enabled` is an element that can be clicked or selected
- `:disabled` is an element that cannot be clicked or selected

An example:

```html
<!DOCTYPE html>
<html>
    <head>
        <script>
            function disable(el){
                document.getElementById(el.id).disabled = true;
            }
        </script>
        <style>
            button {
                background: white;
                color: darkgray;
                width: 100px;
                padding: 5px;
                font-weight: bold;
                text-align: center;
                border: 1px solid darkgray;
            }

            button:enabled:hover {
                color: white;
                background: darkgray;
            }

            button:enabled:active {
                border: 1px dashed;
                border-color: black;
            }

            button:disabled {
                background: #ddd;
                color: #aaa;
                border: 1px solid #bbb;
            }
        </style>
    </head>
    <body>
        <main>
            <button id="b" onclick="disable(this)">Add Todo</button>
        </main>
    </body>
</html>
```

Here you can see that it is possible to combine pseudo-classes, in this case we use `button:enabled:active` and define a style that an enabled and active button should have. Once the button is disabled, its style will not change anymore, no matter the mouse movements.

[AT SLIDE 25]


## Self-check

Here are a few questions you should be able to answer after having followed the lecture and having worked through the required readings:
