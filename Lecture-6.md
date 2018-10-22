# Taking a closer look at Node.js <!-- omit in toc -->

In this lecture, we cover different aspects of Node.js that are important to be a productive web engineer.

## Table of Content <!-- omit in toc -->
- [Learning goals](#learning-goals)
- [Organization and reusability of Node.js code](#organization-and-reusability-of-nodejs-code)
    - [A file-based module system](#a-file-based-module-system)
    - [A first module example](#a-first-module-example)
- [Creating and using a (useful) module](#creating-and-using-a-useful-module)
- [Middleware in Express](#middleware-in-express)
    - [Logger component example](#logger-component-example)
    - [Authorisation component example](#authorisation-component-example)
    - [Components are configurable](#components-are-configurable)
- [Routing](#routing)
    - [Routing paths and regular expressions](#routing-paths-and-regular-expressions)
    - [Routing parameters](#routing-parameters)
- [Templating with EJS](#templating-with-ejs)
    - [A first EJS example](#a-first-ejs-example)
    - [EJS and user-defined functions](#ejs-and-user-defined-functions)
    - [JavaScript within EJS templates](#javascript-within-ejs-templates)
    - [Express and templates](#express-and-templates)
- [Self-check](#self-check)

## Learning goals

- Organize Node.js code into modules.
- Understand and employ the concept of *middleware*.
- Employ routing.
- Employ templating.

## Organization and reusability of Node.js code

So far, we have organized all server-side code in a single file, which is only a feasible solution for small projects. In larger projects, this quickly ends in unmaintainable code, as:

- Debugging is cumbersome.
- Team-work is cumbersome.
- Programming is cumbersome.

These issues were recognized early on by the creators of Node.js and they introduced the concept of **modules**. **A Node.js module is a single file and all code contained in it**.

By default, *no code in a module is accessible to other modules*. Any variable or method that should be visible to other modules has to be **explicitly** marked as such - you will learn shortly how exactly. Node.js modules can be published to [npmjs.com](https://www.npmjs.com/), the most important portal to discover and share modules with other developers. This is Express' page on npm:

![Express npm](img/L6-express.png)

You see here that modules often depend on a number of other modules (in this case: 30 dependencies). As Express is a very popular module, it is listed as dependency in more than 27,000 other modules.

 You already know how to install modules, e.g. `npm install —save alexa-sdk`. You can also use the command line to search for modules to install, e.g. `npm search alexa`.

While it is beyond the scope of this course to dive into the details of the npm registry, it should be mentioned that it is not without issues; the story of how 17 lines of code - a single npm module - nearly broke much of the modern web for half a day can be found [here](http://arstechnica.com/information-technology/2016/03/rage-quit-coder-unpublished-17-lines-of-javascript-and-broke-the-internet/).

### A file-based module system

In Node.js each file is its own module. This means that the code we write in a file does not pollute the *global namespace*. In Node.js we get this ability for free. When we write client-side JavaScript, we have to work hard to achieve the same effect (recall the module pattern covered in [Lecture 3](Lecture-3.md)).

The module system works as follows: each Node.js file can access its so-called module definition through the module variable. The module variable is your entry point to modularize your code. To make something available from a module to the outside world, `module.exports` or its alias `exports` is used as we will see in a second:

```javascript
module {
  id: '.',
  exports: {},
  parent: null,
  filename: '/path/to/nodejs-file.js',
  loaded: false,
  children: [],
  paths:
   [ '/Users/path/path2/node_modules',
    '/Users/path/node_modules',
     '/Users/node_modules' ]
}
```

 Finally, once you have defined your own module, the globally available `require` function is used to import a module. At this stage, you should recognize that you have been using Node.js modules since your first attempts with Node.js.

Here is a graphical overview of the connection between `require` and `module.exports`:

![Modules](img/L6-module.png)

An application uses the `require` function to import module code. The module itself populates the `module.exports` variable to make certain parts of the code base in the module available to the outside world. Whatever was assigned to `module.exports` (or `exports`) is then returned to the application when the application calls `require()`.

### A first module example

Since we work with modules, let's consider files `foo.js`:

```javascript
var fooA = 1;
module.exports = "Hello!";
module.exports = function() {
    console.log("Hi from foo!");
};
```

and `bar.js`:

```javascript
var foo = require('./foo');
foo();
require('./foo')(); //Hi from foo!
console.log(foo); //[Function]
console.log(foo.toString()); //function () {console.log("Hi from foo!");}
console.log(fooA); //ReferenceError
console.log(module.exports); //{}

```

Here, `foo.js` is our `foo` module and `bar.js` is our application that imports the module to make use of the module's functionality. In our `foo` module, we define a variable `fooA` in line 1. In lines 2 and 3, you can see how a module uses `module.exports` to make parts of its code available: in line 2, we assign a string to `module.exports`, in line 3 we make a new assignment to `module.exports` and define a function that prints out *Hi from foo!* on the console. Which of the two assignments will our application bar end up with? In `bar.js` the first line calls the `require()` function and assigns the returned value to the variable `foo`. In line 1 we used as argument `./foo` instead of `./foo.js`; you can use both variants. The dot-slash indicates that `foo.js` resides in the current directory.

Node.js runs the referenced JavaScript file (here `foo.js`) in a **new scope** and **returns the final value** of `module.exports`. What then is the final value after executing foo.js? It is the function we defined in line 3. As you can see in lines 2 and beyond of `bar.js` there are several ways to access whatever `require` returned. We can call the returned function and this results in *Hi from foo!* as you would expect. We can also combine lines 1 and 2 into a single line, as seen in line 3 with the same result. If we print out the variable `foo`, we learn that it is a function. Using the `toString()` function prints out the content of the function. Next, we try to access `fooA` - a variable defined in `foo.js`. Remember that Node.js runs each file in a new scope and only what is assigned to `module.exports` is available. Accordingly, `fooA` is not available in `bar.js` and we end up with a reference error. Finally, we can also look at the `module.exports` variable of `bar.js` - remember this is always available to a file in Node.js. In `bar.js` we have not assigned anything to `module.exports` and thus it is an empty object.

This setup also explains why **`require` is blocking**, i.e. once a call to `require()` is made, the referenced file's code is executed and only once that is done, does `require()` return; this is in contrast to the usual *asynchronous* nature of Node.js functions.

Here is another example:

```javascript
var t1 = new Date().getTime();
var foo1 = require('./foo');
console.log(new Date().getTime() - t1); // > 0

var t2 = new Date().getTime();
var foo2 = require('./foo');
console.log(new Date().getTime() - t2); // approx 0
```

For this example, it is also important to know that `module.exports` is **cached**. The first time an application calls `require(foo.js)` the file `foo.js` is read from disk, but in subsequent calls to `require(foo.js)` the **in-memory object is returned**. What does this mean in practice? We call require twice for the file `foo.js`, storing the return value in `foo1` and `foo2` respectively. We also log how long require blocks further code execution. The first time we `require(foo)`, this will take a few milliseconds as the file is actually read from disk. The second time we call `require(foo)` though, this time will drop to near zero, as the cached in-memory object is returned.

As mentioned before, every Node.js file has access to `module.exports`. If a file does not assign anything to it, it will be an empty object, but it is **always** present.
We also stated before that instead of `module.exports` we can also use `exports`. If you look up what the difference between the two is, you will find a lot of articles and questions on the web. Do not be confused, it is rather simple: `exports` is just an **alias** of `module.exports`. This means that the following two code snippets are equivalent:

```javascript
module.exports.foo = function () {
    console.log('foo called');
};

module.exports.bar = function () {
    console.log('bar called');
};
```

```javascript
exports.foo = function () {
    console.log('foo called');
};

exports.bar = function () {
    console.log('bar called');
};
```

In the first snippet, we use `module.exports` to make two functions (`foo` and `bar`) accessible to the outside world. In the second snippet, we use `exports` to do exactly the same. Note that in these two examples, we do **not** *assign* something to `exports` directly, i.e. we do not write `exports = function ....`. This is in fact not possible, if you directly assign a function or object to `exports`, then its reference to `module.exports` will be **broken**. Thus, you can only assign directly to `module.exports`, for instance if you only want to make a single function accessible to the outside world.

## Creating and using a (useful) module

In the example above, `foo.js` is a module we created. Not a very sensible one, but still, it is a module. Modules can be either:

- a single file, or,
- a directory of files, one of which is `index.js`.

A module can contain other modules (that's what `require` is for) and should have a specific purpose. For instance, we can create a grade rounding module whose functionality is the rounding of grades in the Dutch grading system:

```javascript
/* not exposed */
function roundGrade(grade) {
    return Math.round(grade);
}

/* not exposed */
function roundGradeUp(grade) {
    return Math.round(0.5+parseFloat(grade));
}

/* exposed */
exports.maxGrade = 10;
exports.roundGradeUp = roundGradeUp;
exports.roundGradeDown = function(grade) {
    return Math.round(grade-0.5);
}
 ```

We can use the grading module in an Express application as follows:

```javascript
var express = require("express");
var url = require("url");
var http = require("http");
var grading = require("./grades"); // our module file resides in the current directory
var app;

var port = process.argv[2];
app = express();
http.createServer(app).listen(port);

app.get("/round", function (req, res) {
    var query = url.parse(req.url, true).query;
    var grade = ( query["grade"]!=undefined) ? query["grade"] : "0";

    //accessing module functions
    res.send("Rounding up: " + grading.roundGradeUp(grade) +", and down: "+ grading.roundGradeDown(grade));
});
```

## Middleware in Express

Middleware components are small, self-contained and reusable code pieces across applications. Imagine you have written an Express application with tens of different routes and now decide to log every single HTTP request coming in. You could add 2-3 lines of code to every route to achieve this logging OR you write a middleware logging component that gets called before any other route is called. How exactly this works in Express is discussed here.

Middleware components have **three parameters**:

- an HTTP request object,
- an HTTP response object, and,
- an optional callback function (`next()`) to indicate that the component is finished and the dispatcher (which orchestrates the order of middleware components) can move on to the next component.

Middleware components have a number of abilities:

- Execute code.
- Change the request and response objects.
- End the request-response cycle.
- Call the next middleware function in the middleware stack.

As a concrete example, imagine an Express application with a POST route `/user/addHabit`:

![Middleware components](img/L6-middleware.png)

The first middleware to be called is the logging component, followed by the bodyParser component which parses the HTTP request body; next, the static component is probed (is there a static resource that should be served to the user?) and if no static resource exists, a final custom component is called. When an HTTP response is sent (`res.end`), the middleware call chain is complete.

### Logger component example

Here is a first concrete code example of a simple logger component. Our goal is to create a logger that records every single HTTP request made to our application as well as the URL of the request. We need to write a function that accepts the HTTP request and response objects as arguments and next as callback function. Here, we actually write two functions to showcase the use of several middleware components:

```javascript
var express = require('express');

//a middleware logger component
function logger(request, response, next) {
    console.log('%s\t%s\t%s', new Date(), request.method, request.url);
    next(); //control shifts to next middleware function
}

//a middleware delimiter component
function delimiter(request, response, next){
    console.log("-----------------");
    next();
}

var app = express();
app.use(logger); //register middleware component
app.use(delimiter);
app.listen(3001);
```

Importantly, `next()` enables us to move on to the next middleware component while `app.use(...)` registers the middleware component with the dispatcher. Try out this code for yourself and see what happens if:

- `app.use` is removed;
- the order of the middleware components is switched, i.e. we first add `app.use(delimiter)` and then `app.use(logger)`;
- in one or both of the middleware components the `next()` call is removed.

You will observe different behaviours of the application when testing it in the browser that make clear how the middleware components interact with each other and how they should be used in an Express application.

In the example above we did not actually sent an HTTP response back, but you know how to write such a code snippet yourself. So far, none of our routes have contained `next` for a simple reason: all our routes ended with an HTTP response being sent and this completes the request-response cycle; there is no need for a `next()` call.

### Authorisation component example

In the [second application example](demo-code/node-component-ex), we add an authorisation component to a simple Todo application back-end: only clients with the **correct username and password** (i.e. authorised users) should be able to receive the list of todos when requesting them. We achieve this by adding a middleware component that is activated for every single HTTP request and determines whether the HTTP request contains an authorization header (if not, access is denied) and if the provided username and password combination is the desired one. Before we dive into the code details, let's first install and start the application:

```
git clone ...
npm install
npm start
```

Once the server is started, open another terminal and use `curl` (a command line tool that provides us with a convenient way to include username and password as you will see in a second):

- Request the list of todos without authorisation, i.e. `curl http://localhost:3000/todos` - you should see an `Unauthorized access` error.
- Request the list of todos with the correct username and password (as hardcoded in our demonstration code): `curl --user user:password http://localhost:3000/todos`. The option `--user` allows us to specify the username and password to use for authentication in the `[USER]:[PASSWORD]` format. This request should work and you should receive the list of todos.
- Request the list of todos with an incorrect username/password combination: `curl --user test:test http://localhost:3000/todos`. You should receive a `Wrong username/password combination` error.

Having found out who our code works, let us look at the authorization component, it is just a few lines of code (here we define an anynymous function directly as argument to `app.use`):

```javascript
app.use(function (req, res, next) {
    var auth = req.headers.authorization;
    if (!auth) {
        return next(new Error("Unauthorized access!"));
    }
    var parts = auth.split(' ');
    var buf = new Buffer(parts[1], 'base64');
    var login = buf.toString().split(':');
    var user = login[0];
    var password = login[1];

    //hardcoded for demonstration purposes
    if (user === "user" && password === "password") {
        next();
    }
    else {
        return next(new Error("Wrong username/password combination!"));
    }
});
```

This code snippet first determines whether an authorization header was included in the HTTP request (accessible at `req.headers.authorization`). If no header was sent, we pass an error to the `next()` function, for Express to catch and process, i.e. sending the appropriate HTTP response. If an authorization header is present, we now manually parse out the username and password and determine whether they match `user` and `password` respectively. If they match, `next()` is called and the next middleware component processes the request, which in our `app.js` file is `app.get("/todos",...)`.

### Components are configurable

One of the design goals of middleware is **reusability** across applications: once we define a logger or an authorization component, we should be able to use it in a wide range of applications without additional engineering effort. Reusable code usually has parameters that can be set. To make this happen, we can wrap the original middleware function in a *setup function* which takes the function parameters as input:

```javascript
function setup(options) {
    // setup logic
    return function(req, res, next) {
        // middleware logic
    }
}
app.use( setup({ param1 : 'value1' }) );
```

## Routing

Routing is the mechanism by which requests are routed to the code that handles them. The routes are specified by a URL and HTTP method (most often `GET` or `POST`). You have employed routes already - every time you wrote `app.get()` you specified a so-called **route handler** and wrote code that should be executed when that route (or URL) is called.

This routing paradigm is a significant departure from the past, where **file-based** routing was commonly employed. In file-file based routing, we access files on the server by their actual name, e.g. if you have a web application with your contact details, you typically would write those details in a file `contact.html` and a client would access that information through a URL that ends in `contact.html`. Modern web applications are not based on file-based routing, as is evident by the fact URLs these days do not contain file endings anymore (such as `.html` or `.asp`).

In terms of routes, we distinguish between request types (`GET /user` differs from `POST /user`) and request routes (`GET /user` differs from `GET /users`).

**Route handlers are middleware**. So far, we have not introduced routes that include `next` as third argument, but since they *are* middleware, we can indeed add `next` as third argument.

But when does it make sense? Let's look at the following code snippet:

```javascript
//clients requests todos
app.get("/todos", function (req, res, next) {
    //hardcoded “A-B” testing
    if (Math.random() < 0.5) {
        return next();
    }
    console.log("Todos in schema A returned");
    res.json(todosA);
});

app.get("/todos", function (req, res,next) {
    console.log("Todos in schema B returned");
    res.json(todosB);
});
```

Here, we define two route handlers for the same route `/todos`. Both anonymous functions passed as arguments to `app.get()` include the `next` argument. The first route handler generates a random number between 0 and 1 and if that generated number is below 0.5, it calls `next()` in the return statement. If the generated number is >=0.5, `next()` is not called, and instead a response is sent to the client making the request.
If `next` was used, the dispatcher will move on to the second route handler and here, we do not call `next`, but instead simply send a response to the client.
What we have done here is to hardcode so-called *A/B testing*. Imagine you have an application and two data schemas and you aim to learn which schema your users prefer. Half of the clients making requests will receive schema A and half will receive schema B.

We can also provide multiple handlers in a single `app.get()` call as you see here:

```javascript
//A-B-C testing
app.get('/todos',
    function(req,res, next){
        if (Math.random() < 0.33) {
            return next();
        }
        console.log("Todos in schema A returned");
        res.json(todosA);
    },
    function(req,res, next){
        if (Math.random() < 0.5) {
            return next();
        }
        console.log("Todos in schema B returned");
        res.json(todosB);
    },
    function(req,res){
        console.log("Todos in schema C returned");
        res.json(todosC);
    }
);
```

This code snippet contains three handlers - and each handler will be used for about one third of all clients requesting `/todos`. While this may not seem particularly useful at first, it allows you to create generic functions that can be used in any of your routes, by dropping them into the list of functions passed into `app.get()`. What is important here to understand when to call `next` and why in this setting we have to use a return statement - without a return statement, the function's code would be continued to be executed.

### Routing paths and regular expressions

When you specify a path (like `/todos`) in your route, the path is eventually converted into a **regular expression** by Express. A regular expression is a sequence of chars Regular expressions are very powerful. They allow you to specify matching patterns instead of hard-code all potential routes. Unfortunately, Express only supports a subset of the standard regex meta-characters: `+ ? * ( ) []` which are used as follows:

| Character | Description                                      | Regex    | Matched expressions |
|-----------|--------------------------------------------------|----------|---------------------|
| +         | one or more occurrences                          | ab+cd    | abcd, abbcd, …      |
| ?         | zero or one occurrence                           | ab?cd    | acd, abcd           |
| *         | zero or more occurrences of any char (wildcard)  | ab*cd    | abcd, ab1234cd, …   |
| […]       | match anything inside for one character position | ab[cd]?e | abe, abce, abde     |
| (…)       | boundaries                                       | ab(cd)?e | abe, abcde          |

### Routing parameters

Apart from regular expressions, routing parameters can be employed to enable **variable input** as part of the route. Consider the following code snippet:

```javascript
var todoTypes = {
    important: ["TI1506","OOP","Calculus"],
    urgent: ["Dentist","Hotel booking"],
    unimportant: ["Groceries"],
};

app.get('/todos/:type', function (req, res, next) {
    var todos = todoTypes[req.params.type];
    if (!todos) {
        return next(); // will eventually fall through to 404
    }
    res.send(todos);
});
```

We here have defined an object `todoTypes` which contains `important`, `urgent` and `unimportant` todos. We can hardcode routes, for example `/todos/important` to return only the important todos, `/todos/urgent` to return the urgent todos only and `/todos/unimportant` to return the unimportant todos. This is not a maintainable solution though (think about objects with hundreds of properties...).

Instead, we would like to write a single route that, dependent on a **routing parameter**, serves different todos. This is achieved in the code snippet shown here. The routing parameter type (indicated with a starting colon `:`) will match any string that does not contain a slash. The routing parameter is available to us in the `req.params` object. Since the route parameter is called `type`, we access it with `req.params.type`. What this piece of code is doing is to check whether the route parameter matches a proprty of the `todoTypes` object and if it is, the correct todo list is returned to the client. If the parameter does not match any property of our `todoTypes` object, we make a call to next and move on the next route handler - e.g. a 404 page specific to your application.

Routing parameters can have various levels of nesting as shown next:

```javascript
var todoTypes = {
    important: {
        today: ["TI1506"],
        tomorrow: ["OOP", "Calculus"]
    },
    urgent: {
        today: ["Dentist", "Hotel booking"],
        tomorrow: []
    },
    unimportant: {
        today: ["Groceries"],
        tomorrow: []
    }
};
app.get('/todos/:type/:level', function (req, res, next) {
    var todos = todoTypes[req.params.type][req.params.level];
    if (!todos) {return next();}
    res.send(todos);
});
```

We here do not only use the importance type for our todos, but also partition them according to their due date (today/tomorrow). Our route handler now contains two routing parameters, `:type` and `:level`. Both are accessible through the HTTP request object. And as in the previous example, we use the two parameters to access the contents of the `todoTypes` object. If the two parameters do not match any properties of the `todoTypes` object, we call `next()` and otherwise, we send the requested response.

Lastly, a word on how to organize your routes. Adding routes to the main application file becomes unwieldy as the codebase grows. Based on the knowledge of this lecture, you can now move routes into a separate module. All you need to do is to pass the `app` instance into the module (here: `routes.js`) as an argument:

```javascript
/* routes.js */
module.exports = function(app){
    .get('/', function(req,res){
        res.send(...);
    }))
    //...
};
```

```javascript
/* app.js */
//...
require('./routes.js')(app);
//...
```

`routes.js` is our route module where we assign a function to `module.exports` which contains the routes. In our application `app.js` we add the routes to our application through the `require` function and passing `app` in as an argument.

## Templating with EJS

When we started our journey with Node.js and Express, you learned that writing HTML in this manner:

![HTML mixed-in](img/L6-html-manually.png)

is a poor choice, as the code quickly becomes unmaintainable, hard to debug and generally a pain to work with. One approach to solve this problem is the use of Ajax: our HTML code is *blank* in the sense that it does not contain any user-specific data. The HTML and JavaScript (and other resources) are sent to the client and the client makes an Ajax request to retrieve the user-specific data from the server-side. With **templating we are able to directly send HTML with user-specific data to the client** and thus removing one request-response cycle.

![templating](img/L6-templating.png)

With templates, our goal is to write as little HTML by hand as possible. Instead, we create an HTML template void of any data, add data and from that generate a rendered HTML view in the end. This approach keeps the code clean and separates the logic from the presentation markup.

This concept exists in several languages and even for Node.js alone, several template engines exist. In this course, you will learn the basics of **EJS** - *Embedded JavaScript* - a relatively straightforward template engine and language. Different incompatible versions of EJS exist, we are using [version 2](https://github.com/mde/ejs), the most recent one, in this course. Templates fit naturally into the *Model-View-Controller* paradigm which is designed to keep logic, data and presentation separate.

### A first EJS example

```javascript
var ejs = require('ejs');
var template = '<%= message %>'; //<%= outputs the value into the template (HTML escaped)
var context = {message: 'Hello template!'};
console.log(ejs.render(template, context));
```

Let's take a first look at EJS. For this exercise, we will use Node's **REPL** (*Read-Eval-Print Loop*). It is the **Node.js shell**; any valid JavaScript which can be written in a script can be passed to the REPL as well. It useful for experimenting with Node.js, and figuring out some of JavaScript's more eccentric behaviors. To start the REPL, simply type `node` in the terminal and the Node shell becomes available, indicated by `>`. Try it out for yourself and type each of the JavaScript code lines above into the shell, ending each line with `<ENTER>`.

If after the `var ejs = require('ejs');` line you receive an `Error: Cannot find module 'ejs'` error, exit the shell (to do so, type `.exit`). You need to install the `ejs` module. To do this, run `npm install ejs` and then go back to the REPL.

Let's walk through the code: we first make the EJS object available to us via `require()`. Next, we define our template string. In this template we aim to replace the message with the actual data. Our `context` variable holds an object with a property `message` and value `Hello template!`. Lastly, we have to bring the template and the data together by calling `ejs.render()`. The output will be the **rendered view**. The template contains `<%=`, a so-called *scriptlet tag* to indicate the start of an element to be replaced with data and an ending tag `%>`.

Ther are two types of scriptlet tags that output values:

- `<%= ... %>` outputs the value into the template in **HTML escaped** form.
- `<%- ... %>` outputs the value into the template in **unescaped** form. This enables cross-site scripting attacks, which we will discuss in [Lecture 8](Lecture-8.md).

In order to see the difference between the two types of tags, go back to Node's REPL and try out the following code snippet, with the two variants of the `template` string:

```javascript
var ejs = require('ejs');
var template = ‘<%- message %>';
//var template = ‘<%= message %>';
var context = {message: "<script>alert('hi!');</script>"};
console.log(ejs.render(template, context));
```

The HTML-escaped variant produces the output `&lt;script&gt;alert(&#39;hi&#39;);&lt;/script&gt;` while the un-escaped `template` variant produces `<script>alert('hi');</script>`. In the latter case, this is code that the browser will execute.

### EJS and user-defined functions

In order to make templates maintainable, it is possible to provide user-defined functions to a template as follows:

```javascript
var ejs = require('ejs');
var people = ['wolverine', 'paul', 'picard'];

var transformUpper = function (inputString) { return inputString.toUpperCase();}

var template = '<%= helperFunc(input.join(", ")); %>';
var context = {
    input: people,
    helperFunc: transformUpper //user-defined function
};
console.log(ejs.render(template, context));
```

In this example, `transformUpper` is our user-defined function that expects a string as input and transforms it to uppercase. The `context` object has a property `helperFunc` which is assigned our user-defined function as value. In the template, we use the properties of the `context` object and `ejs.render` brings template and data together.

### JavaScript within EJS templates

To make templates even more flexible, we can incorporate JavaScript in the template, using the `<%` scriptlet tag. In this example:

![EJS and JavaScript](img/L6-ejs-js.png)

 our context is an array of objects, each movie with a title and release date. In our template, we use [`Array.prototype.foreach`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) (it executes a provided function once per array element) to pass over the array and print out the title and release data. The `<%` scriptlet tags are used for **control-flow purposes**.

### Express and templates

 How do templates tie in with the Express framework? So far, we have used the REPL to show off some of EJS' capabilities. It turns out that so-called **views** can be easily configured with Express. Not only that, an application can also make use of several template engines at the same time.

Three steps are involved:

1. We set the *views directory* - the directory containing all templates. Templates are essentially HTML files with EJS scriptlet tags embedded and file ending `.ejs`:

 ```javascript
 app.set('views', __dirname + '/views');
 ```

2. We define the template engine of our choosing:

```javascript
app.set('view engine', 'ejs');
```

3. We create template files.

An EJS demo can be found at [demo-code/node-ejs-ex]. Let's first consider `app.js`:

```javascript
var express = require("express");
var url = require("url");
var http = require("http");
var app;

var port = process.argv[2];
app = express();
http.createServer(app).listen(port, function () {
  console.log("Ready on port " + port);
});

var todos = [];
todos.push({ message: 'Final exam', dueDate: 'January 2016'  });
todos.push({ message: 'Prepare for assignment 6', dueDate: '05/01/2016' });
todos.push({ message: 'Sign up for final exam', dueDate: '06/01/2016' });

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/todos", function (req, res) {
  res.render('todos', { title: 'My list of TODOs', todo_array: todos });
});
```

As described beforehand, we first set the views directory, then the view engine and finally we use Express' [`res.render`](https://expressjs.com/en/api.html#res.render) in order to render a view and send the rendered HTML to the client. Important to realize in this example is, that the first argument of `res.render` is a view stored in `views/todos.ejs` that the Express framework retrieves for us. The second argument is an object that holds the variables of the template, here `title` and `todo_array`. To confirm this, let's look at the template file itself, `todos.ejs` which contains the corresponding variable names:

```html
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
</head>
<body>
    <h1>TODOs</h1>
    <div>
        <% todo_array.forEach(function(todo) { %>
        <div>
            <h3><%=todo.dueDate%></h3>
            <p><%=todo.message%></p>
        </div>
        <% }) %>
    </div>
</body>
</html>
```

## Self-check

Here are a few questions you should be able to answer after having followed the lecture and having worked through the required readings:

1. Does `require()` use synchronous or asynchronous access?
2. Consider these two files, `constants.js` and `bar.js`. What is the console output of `node bar.js`?

```javascript
module.exports.pi = 3.1415;
module.exports.password = "root";
```

```javascript
var constants1 = require('./constants');
constants1.password = "admin";
var constants2 = require('./constants');
console.log(constants2.password);
var constants3 = require('./constants');
constants2.pi = 3;
console.log(constants3.pi);
```

3. Consider these two files, `constants.js` and `bar.js`. What is the console output of `node bar.js`?

```javascript
module.exports = function() {
    return {
        pi: 3.1415,
        one: 1,
        login: "root",
        password: "root"
    }
}(); //pay attention to the final bracket pair!
```

```javascript
var constants1 = require('./constants');
constants1["password"] = "admin";
var constants2 = require('./constants');
console.log(constants2["password"]);
var constants3 = require('./constants');
constants2["pi"] = 3;
console.log(constants3["pi"]);
```

4. Name three different routes that this handler matches.

```javascript
app.get('/user(name)?s+', function(req,res){
    res.send(…)
});
```

5. Name three different routes that this handler matches.

```javascript
app.get('/whaa+[dt]s+upp*', function(req,res){
    res.send(…)
});
```

5. What is the console output after executing this code snippet?

```javascript
var ejs = require('ejs');
var people = ['Wolverine', 'paul', 'picard'];
var X = function (input) {
        if(input){
            return input[0];
        }
        return "";
    }
var template = '<%= helperFunc(input); %>';
var context = {
    input: people,
    helperFunc: X
};
console.log(ejs.render(template, context));
```

6. What is the console output after executing this code snippet?

```javascript
var ejs = require('ejs');
var template = '<% if(user) {
    console.log("Hi "+user);
    if(user.age>=18){
        console.log("(adult)");
    }
    else {console.log("(minor)");}
} %>';
var context = {user: 'Tom', age:26, address:'Mekelweg 4'};
ejs.render(template, context);
```
