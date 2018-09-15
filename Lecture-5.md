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

You know that in the code snippet above, `body` is a **selector**, `background-color` is a **property** and `#ffff00` is a **value**. You know the difference between a `class` and an `id` attribute and how to style both.

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

Here you can see that it is possible to combine pseudo-classes, in this case we use `button:enabled:active` and define a style that an enabled **and** active button should have. Once the button is disabled, its style will not change anymore, no matter the mouse movements.

`:not(X)` is a pseudo-class that matches all elements that are not represented by selector X. Let's look at this example:

```html
<!DOCTYPE html>
<html>
	<head>
		<style>
			main :not(.todo){
				color: orange;
			}
		</style>
	</head>
	<body>
		<main>
			<h2>Todos</h2>
			<p class="firsttodo">Today's todos</p>
			<p class="todo">Tomorrow's todos</p>
			<p class="todo">Saturday's todos</p>
			<p>Sunday's todos</p>
		</main>
	</body>
</html>
```

Important to know here is, that the selector `e1 e2` selects all `<e2>` elements inside `<e1>` elements. The `:not` selector is a short form for `*:not` with `*` being the universal selector (selecting all elements). Altogether our CSS rule says that any element within `<main>` that does not have class attribute `.todo` is assigned an orange font color.

`e1 e2` is not the only possible element combination as selector. Most commonly used are:

| Selector | Despcription                                            |
|----------|---------------------------------------------------------|
| e1       | Selects all `<e1>` elements                               |
| e1 e2    | Selects all `<e2>` elements within `<e1>`                   |
| e1,e2    | Selects all `<e1>` elements and all `<e2>` elements         |
| e1>e2    | Selects all `<e2>` elements that have `<e1>` as parent      |
| e1+e2    | Selects all `<e2>` elements that follow `<e1>` immmediately |

An example should make the differences between them clear:

```html
<!DOCTYPE html>
<html>
	<head>
		<style>

    		div p {
				background-color:black;
				color: white;
			}
			
			main, footer {
				background-color:yellow;
			}

			div > p {
				font-weight: bold;
			}

			div + p {
				color: red;
			}

		</style>
	</head>
	<body>
		<main>
			<div class="today">
				<div class="urgent">
					<p>Shopping</p>
					<p>Sports</p>
				</div>
				<p>Go to class</p>
			</div>
			<div class="tomorrow">
				<p>Go to class</p>

				<div class="urgent">
					<p>Organising the holidays</p>
				</div>
			</div>
		</main>
		<footer>
			CSS example 2018.
		</footer>
	</body>
</html>
```

Note, that your browser's *style editor* does not only allow you to inspect the CSS rules, but also see which rules apply to what part of the page (when hovering over a rule). You can edit the rules on the fly as well, which makes it a very useful tool for debugging your CSS. Here is a screenshot from Firefox's style editor:

![Firefox's style editor](img/L5-style-editor.png)

Let's move on to four more pseudo-classes, that are particularly useful for the styling of HTML forms: `:in-range` and `:out-of-range` as well as `:valid` and `:invalid`. The latter two can be employed for any `<input>` element, while `:in-range` and `:out-of-range` apply specifically to `<input type="number">`. Input elements are valid if their value adheres to the input type (a number for `type=number`, an email for [`type=email`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email), etc.) and potential additional limitations due to attribute settings (e.g. `min`, `max` and `maxlength`).

Here is an example:

```html
<!DOCTYPE html>
<html>
	<head>
		<style>
			input[type=text] {
				border: 0px;
				width: 150px;
			}

			input[type=number]{
				width: 100px;
			}

			input:in-range {
				background-color: rgba(0, 255, 0, 0.25);
  				border: 2px solid green;
			}

			input:out-of-range {
				background-color: rgba(255, 0, 0, 0.25);
  				border: 2px solid red;
			}

			input:in-range + label::after {
				content: "\2714";
				color: green;
			}

			input:out-of-range + label::after {
				content: " (invalid)";
				color: red;
			}
		</style>
	</head>
	<body>
		<main>
			<input type="text" placeholder="add your todo" />
			<input id="dl" type="number" min="1" max="30" placeholder="Days to deadline" />
			<label for="deadline1"> </label>
		</main>
	</body>
</html>
```

This example does not only show off these four pseudo-classes, but also a number of other CSS features:
- **Attribute selectors** (e.g. `input[type=number]`) allow us to select specific types of `<input>` elements.
- The [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) element can be associated with an `<input>` element when the latter's `id` attribute is the same as the `<label>`'s `for` attribute. This is particularly useful when labels are used as captions for a user interface elements: a click on the label text will then activate the interface element (e.g. a checkbox). Here, we make use of the label to signal a valid or invalid input.
- We see here how to include **unicode characters**: when the deadline number is valid, we choose to display a checkmark. This checkmark could be an image, but here we chose to use a character, specifically unicode character [U+2714](http://graphemica.com/%E2%9C%94).
- The pseudo-element `::after` makes a first appearance, together with the `content` property. We discuss those next.

### Popular pseudo-elements

A **pseudo-element** creates an abstractions about the document tree *beyond* those specified by the document language; it provides access to an element's sub-part.

In order to distinguish pseudo-classes and pseudo-elements, the `::` notation was introduced in the specification, though browsers also accept the one-colon notation.

So, what are abstractions that go beyond what is specified in the document language? Two popular examples are the `::first-letter` and the `::first-line` pseudo-elements; they do exactly what the names suggests, enabling you to style the first letter and line respectively without sticking a `<span>` around them:


```html
<!DOCTYPE html>
<html>
	<head>
		<style>
		p::first-line {
			color: gray;
			font-size: 125%;
		}

		p::first-letter {
			font-size: 200%;
		}
		</style>
	</head>
	<body>
		<p>
			To be or not to be, that is the question -
		</p>

		<p>
			Whether 'tis nobler in the mind to suffer <br>
			The slings and arrows of outrageous fortune, <br>
			Or to take arms against a sea of troubles, <br>
			...
		</p>
	</body>
</html>
```
The example also showcases the percent unit for the `font-size` property. The base font-size of the document equates to `100%` and thus this unit allows you to scale you font-size in relation to the initial size. This is especially helpful when you design Web applications for different device sizes - no additional "tuning" for different devices is required.

Adding (cosmetic) content right before and after an element is achieved (not surprisingly) through:
- `::after`
- `::before`
in combination with the `content` property.

Here is one extreme example of this concept, where all document *content* is delegated to the stylesheet:

```html
<!DOCTYPE html>
<html>
	<head>
		<style>
		cite::before {
			content: "\201CTo be, or ";
		}

		cite::after {
			content: "not to be ... \201D";
		}
		</style>
	</head>
	<body>
		<cite></cite>
	</body>
</html>
```

This is a poor choice admittedly as [accessibility](https://www.w3.org/standards/webdesign/accessibility) is close to zero. The document for appears as content-less to a screen reader, a form of assistive technology that most commonly makes use of a text-to-speech engine to translate a HTML document into speech.

Let's dive into the idea of storing data in CSS in the next section in more detail.

## Data in CSS

CSS does not only describe the style, it *can* carry data too. There are issues though:
- Data is distributed across HTML and CSS files.
- CSS is conventionally not used to store data.
- Content is not part of the DOM (leading to the just described accessibility problem).

Here is another example of storing data in CSS:

```html
<!DOCTYPE html>
<html>
	<head>
		<style>
		p::after {
			background-color: gold;
			border: 1px solid;
			font-size: 70%;
			padding: 2px;
			margin-left: 50px;
		}

		p#t1::after {
			content: "due 10/12/2018";
		}

		p#t2::after {
			content: "due 12/12/2018";
		}

		p#t3::after {
			content: "due 13/12/2018";
		}
		</style>
	</head>
	<body>
		<main>
			<h2>Todos</h2>
			<p id="t1">Walk the dogs </p>
			<p id="t2">Wash the fiat </p>
			<p id="t3">House cleaning</p>
		</main>
	</body>
</html>
```

A better way ... [p. 37]


## Self-check

Here are a few questions you should be able to answer after having followed the lecture and having worked through the required readings:
