---
layout: default
permalink: /nodejs2/
linkname: Node.js II
ordering: 6
warning: true
---

# Advanced Node.js <!-- omit in toc -->

{% include_relative explanation.md %}

## Table of Contents <!-- omit in toc -->

- [Required & recommended readings and activities](#required--recommended-readings-and-activities)
- [:scroll: Learning goals](#scroll-learning-goals)
- [Organization and reusability of Node.js code](#organization-and-reusability-of-nodejs-code)
  - [A file-based module system](#a-file-based-module-system)
  - [:bangbang: A first module example](#bangbang-a-first-module-example)
  - [:bangbang: `require` is blocking](#bangbang-require-is-blocking)
  - [:bangbang: module.exports vs. exports](#bangbang-moduleexports-vs-exports)
- [Creating and using a (useful) module](#creating-and-using-a-useful-module)
- [Middleware in Express](#middleware-in-express)
  - [:bangbang: Logger example](#bangbang-logger-example)
  - [:bangbang: Authorization component example](#bangbang-authorization-component-example)
  - [Components are configurable](#components-are-configurable)
- [Routing](#routing)
  - [Routing paths and string patterns](#routing-paths-and-string-patterns)
  - [Routing parameters](#routing-parameters)
  - [Organizing routes](#organizing-routes)
- [Templating with EJS](#templating-with-ejs)
  - [:bangbang: A first EJS example](#bangbang-a-first-ejs-example)
  - [:bangbang: EJS and user-defined functions](#bangbang-ejs-and-user-defined-functions)
  - [:bangbang: JavaScript within EJS templates](#bangbang-javascript-within-ejs-templates)
  - [:bangbang: Express and templates](#bangbang-express-and-templates)
- [Node.js in production](#nodejs-in-production)
- [Self-check](#self-check)

## Required & recommended readings and activities

- Required readings: _none_
- Recommended activities:
  - An interactive ejs playground can be found [here](https://ionicabizau.github.io/ejs-playground/).
- Recommended readings:
  - Chapters 10, 14 and 20 of the [Web Development with Node & Express book](https://www.oreilly.com/library/view/web-development-with/9781492053507/).
  - To learn more about ejs, take a look at its [GitHub repository](https://github.com/mde/ejs).
  - To learn more about middleware and Express, take a look at the [Express documentation](http://expressjs.com/en/guide/using-middleware.html).
  - An overview of [best practices in Node.js](https://github.com/i0natan/nodebestpractices).
  - [Slide deck on High Performance JS in V8](https://docs.google.com/presentation/d/1KCcA-WAyhGs0SEOrfU21fjaTWTxvNxYLwmNlGIbuZFw/edit?usp=sharing).
- Relevant scientific publications:
  - Fard, Amin Milani, and Ali Mesbah. [JSNose: Detecting javascript code smells](https://www.computer.org/csdl/proceedings-article/2013/scam/12OmNylsZKu/12OmNwHhoWN). 13th International Working Conference on Source Code Analysis and Manipulation (SCAM). IEEE, 2013.
  - Nasehi, Seyed Mehdi, et al. [What makes a good code example?: A study of programming Q&A in StackOverflow](https://pdfs.semanticscholar.org/8b8d/4c0284f26d5e4ce08c85f98fd453762ab26d.pdf). 28th IEEE International Conference on Software Maintenance (ICSM). IEEE, 2012.

## :scroll: Learning goals

- Organize Node.js code into modules.
- Understand and employ the concept of _middleware_.
- Employ routing.
- Employ templating.

## Organization and reusability of Node.js code

So far, we have organized all server-side code in a single file, which is only a feasible solution for small projects. In larger projects, this quickly ends in unmaintainable code, especially when working in a team.

These issues were recognized early on by the creators of Node.js. For this reason, they introduced the concept of **modules**. **A Node.js module is (1) a single file or (2) a directory of files and all code contained in it**.

By default, _no code in a module is accessible to other modules_. Any property or method that should be visible to other modules has to be **explicitly** marked as such - you will learn shortly how exactly. Node.js modules can be published to [npmjs.com](https://www.npmjs.com/), the most important portal to discover and share modules with other developers. This is [Express' page on npm](https://www.npmjs.com/package/express):

![Express npm](../img/node2-express.png)

<sup>Screenshot taken September 19, 2020.</sup>

:point_up: You see here that modules often depend on a number of other modules (in this case: 30 dependencies). As Express is a very popular module, it is listed as dependency in more than 46,000 other modules.

You already know how to install modules, e.g. `npm install winston` installs one of the more popular [Node logging libraries](https://www.npmjs.com/package/winston). You can also use the command line to search for modules to install, e.g. `npm search winston`.

While it is beyond the scope of this course to dive into the details of the npm registry, it should be mentioned that it is not without issues; the story of how 17 lines of code - a single npm module - nearly broke much of the modern web for half a day can be found [here](http://arstechnica.com/information-technology/2016/03/rage-quit-coder-unpublished-17-lines-of-javascript-and-broke-the-internet/).

### A file-based module system

In Node.js each file is its own module. This means that the code we write in a file does not pollute the _global namespace_. In Node.js we get this setup "for free". When we write client-side JavaScript, we have to work hard to achieve the same effect (recall the module pattern covered in the [JavaScript lecture](https://chauff.github.io/Web-Teaching/js/#javascript-design-patterns)).

The module system works as follows: each Node.js file can access its so-called **module definition** through the `module` object. The module object is your entry point to modularize your code. To make something available from a module to the outside world, `module.exports` or `exports` is used as we will see in a moment. The `module` object looks as follows (depending on the Node version and underlying operating system the property values will vary) :point_down::

```javascript
Module {
  id: '.',
  path: '/Users/Node/Web-Teaching',
  exports: {},
  parent: null,
  filename: '/Users/Node/Web-Teaching/myfile.js',
  loaded: false,
  children: [],
  paths: [
    '/Users/Node/GitHub/Web-Teaching/node_modules',
    '/Users/Node/GitHub/node_modules',
    '/Users/Node/node_modules',
    '/Users/node_modules',
    '/node_modules'
  ]
}
```

To see for yourself how the `module` object looks on your machine you can do one of two things:

1. Create a Node.js script containing only the line `console.log(module);` and run it.
2. Start the node REPL (just type `node` into the terminal) and then type `console.log(module);`.

We see that in our module object above :point*up: nothing is currently being \_exported* as the `exports` property has an empty object (`{}`) as value.

Once you have defined your own module, the globally available `require` function is used to import a module. At this stage, you should recognize that you have been using Node.js modules since your first attempts with Node.js.

Here is a graphical overview of the connection between `require` and `module.exports`:

![Modules](../img/node2-module.png)

:point_up: An application uses the `require` function to import module code. The module itself populates the `module.exports` variable to make certain parts of the code base in the module available to the outside world. Whatever was assigned to `module.exports` (or `exports` - we will get to it) is then returned to the application when the application calls `require()`.

### :bangbang: A first module example

Let's consider files `foo.js` :point_down::

```javascript
var fooA = 1; //LINE 1
module.exports = "Hello!"; //LINE 2
module.exports = function () {
  //LINE 3
  console.log("Hi from foo!"); //LINE 4
}; //LINE 5
```

and `bar.js` :point_down::

```javascript
var foo = require("./foo");
foo(); //CASE 1: Hi from foo!
require("./foo")(); //CASE 2: Hi from foo!
console.log(foo); //CASE 3: [Function]
console.log(foo.toString()); //CASE 4: function () {console.log("Hi from foo!");}
console.log(fooA); //CASE 5: ReferenceError (you will have to remove this line to reach the next one)
console.log(module.exports); //CASE 6: {}
```

:point*up: Here, `foo.js` is our `foo` module and `bar.js` is our application that imports the module to make use of the module's functionality (you can run the script as usual with `node bar.js`). In the `foo` module, we define a variable `fooA` in line 1. In lines 2 and 3, you can see how a module uses `module.exports` to make parts of its code available: in line 2, we assign a string to `module.exports`, in line 3 we make a new assignment to `module.exports` and define a function that prints out \_Hi from foo!* on the console. Which of the two assignments will our application `bar` end up with? In `bar.js` the first line calls the `require()` function and assigns the returned value to the variable `foo`. In line 1 we used as argument `./foo` instead of `./foo.js` - you can use both variants. The dot-slash indicates that `foo.js` resides in the current directory.

Node.js runs the referenced JavaScript file :point_up: (here: `foo.js`) in a **new scope** and **returns the final value** of `module.exports`. What then is the final value after executing `foo.js`? It is the function we defined in line 3.

:point_up: As you can see in lines 2 and beyond of `bar.js` there are several ways to access whatever `require` returned:

- **CASE 1** We can call the returned function and this results in _Hi from foo!_ as you would expect.
- **CASE 2** We can also combine lines 1 and 2 into a single line with the same result.
- **CASE 3** If we print out the variable `foo`, we learn that it is a function.
- **CASE 4** Using the `toString()` function prints out the content of the function.
- **CASE 5** Next, we try to access `fooA` - a variable defined in `foo.js`. Remember that Node.js runs each file in a new scope and only what is assigned to `module.exports` is available. Accordingly, `fooA` is not available in `bar.js` and we end up with a reference error. Note, that Visual Studio Code flags up this error (`fooA is not defined`) already at the code writing stage.
- **CASE 6** Finally, we can also look at the `module.exports` variable of `bar.js` - this is always available to a file in Node.js. In `bar.js` we have not assigned anything to `module.exports` and thus it is an empty object.

### :bangbang: `require` is blocking

This module setup also explains why `require` is **blocking**: once a call to `require()` is made, the referenced file's code is executed and only once that is done, does `require()` return. This is in contrast to the usual _asynchronous_ nature of Node.js functions.

Let's now consider what happens if a module is imported more than once. Keep `foo.js` intact; `bar.js` now becomes :point_down::

```javascript
var t1 = process.hrtime()[1]; //returns an array with [seconds, nanoseconds]
var foo1 = require("./foo");
console.log(process.hrtime()[1] - t1); //303914

var t2 = process.hrtime()[1];
var foo2 = require("./foo");
console.log(process.hrtime()[1] - t2); //35012
```

Run `node bar.js` and observe the execution times logged to the terminal. :point_up: Here, we execute `require('./foo')` twice and log both times the time it takes for `require` to return. The first time the line `require(foo.js)` is executed, the file `foo.js` is read from disk (this takes some time). In subsequent calls to `require(foo.js)`, however, the **in-memory object is returned**. Thus, **`module.exports` is cached**.

:point*up: We here resort to using `process.hrtime()` which returns an array whose first value is the time in seconds and the second is the time in nanoseconds relative to *"an arbitrary time in the past"\_ ([Node documentation](https://nodejs.org/api/process.html#process_process_hrtime_time)). While it is not possible to compute an absolute time in this manner, we can accurately measure the duration of code as seen in the above example. Depending on your machine, the reported nanoseconds intervals will differ, though the first `require()` statement will always take significantly (10x-100x) longer than the second `require()` statement.

_Note: if you are already familiar with JavaScript you may ask yourself why we do not rely on [`Date.now()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now) to measure time differences. It returns the number of **milliseconds** that have passed since January 1, 1970 00:00:00 UTC (why this particular time? Because that is the [Unix time](https://en.wikipedia.org/wiki/Unix_time)!). On modern machines, a millisecond-based time resolution does not offer a high enough resolution to detect this difference in loading time._

### :bangbang: module.exports vs. exports

Every Node.js file has access to `module.exports`. If a file does not assign anything to it, it will be an empty object, but it is **always** present. Instead of `module.exports` we can use `exports` as `exports` is an **alias** of `module.exports`. This means that the following two code snippets are equivalent :point_down::

```javascript
//SNIPPET 1
module.exports.foo = function () {
  console.log("foo called");
};

module.exports.bar = function () {
  console.log("bar called");
};
```

```javascript
//SNIPPET 2
exports.foo = function () {
  console.log("foo called");
};

exports.bar = function () {
  console.log("bar called");
};
```

:point_up: In the first snippet, we use `module.exports` to make two functions (`foo` and `bar`) accessible to the outside world. In the second snippet, we use `exports` to do exactly the same. Note that in these two examples, **we do not assign something to `exports` directly**, i.e. we do not write `exports = function ....`. This is in fact **not possible** as `exports` is only a reference (a short hand if you will) to `module.exports`: if you directly assign a function or object to `exports`, then its reference to `module.exports` will be **broken**. You can only **assign directly** to `module.exports`, for instance, if you only want to make a single function accessible.

## Creating and using a (useful) module

In the example above :point_up:, `foo.js` is a module we created. Not a very sensible one, but still, it is a module. Modules can be either:

- a **single file**, or,
- a **directory of files**, one of which is `index.js`.

A module can contain other modules (that's what `require` is for) and should have a specific purpose. For instance, we can create a _grade rounding module_ whose functionality is the rounding of grades in the Dutch grading system. Any argument that is not a number between 1 and 10 is rejected :point_down::

```javascript
/* not exposed */
var errorString = "Grades must be a number between 1 and 10.";

function roundGradeUp(grade) {
  if (isValidNumber(grade) == false) {
    throw errorString;
  }
  return Math.ceil(grade) > 10 ? 10 : Math.ceil(grade); //max. is always 10
}

function isValidNumber(grade) {
  if (
    isNaN(grade) == true ||
    grade < exports.minGrade ||
    grade > exports.maxGrade
  ) {
    return false;
  }
  return true;
}

/* exposed */
exports.maxGrade = 10;
exports.minGrade = 1;
exports.roundGradeUp = roundGradeUp;
exports.roundGradeDown = function (grade) {
  if (isValidNumber(grade) == false) {
    throw errorString;
  }
  return Math.floor(grade);
};
```

We can use the grading module in an Express application as follows :point_down::

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
  var grade = query["grade"] != undefined ? query["grade"] : "0";

  //accessing module functions
  res.send(
    "UP: " +
      grading.roundGradeUp(grade) +
      ", DOWN: " +
      grading.roundGradeDown(grade)
  );
});
```

Assuming the Node script is started on `localhost` and port `3000`, we can then test our application with several valid and invalid queries:

- `http://localhost:3000/round?grade=2.1a`
- `http://localhost:3000/round?grade=2.1`
- `http://localhost:3000/round?grade=`
- `http://localhost:3000/round?grade=10`

## Middleware in Express

**Middleware components are small, self-contained and reusable code pieces across applications**. Imagine you have written an Express application with tens of different routes and now decide to log every single HTTP request coming in. You could add 2-3 lines of code to every route to achieve this logging (which leads to code duplication, generally a bad idea) or you write a middleware logging component that gets called before any other route is called (code is written only once!). How exactly the latter works in Express is discussed now.

Middleware components have **three parameters**:

- an HTTP request object;
- an HTTP response object;
- an optional callback function—`next()`—to indicate that the component is finished; the **dispatcher** which orchestrates the order of middleware components can now move on to the next component.

Middleware components have a number of abilities. They can:

- execute code;
- change the request and response objects;
- end the request-response cycle;
- call the next middleware function in the middleware stack.

As a concrete example, imagine an Express application with a POST route `/user/moveMade` :point_down::

![Middleware components](../img/node2-middleware.png)

:point_up: The first middleware to be called is the logger component, followed by the bodyParser component which parses the HTTP request body; next, the static component is probed (is there a static resource that should be served to the user?) and if no static resource exists, a final custom component is called. **When an HTTP response is sent (`res.end`), the middleware call chain is complete.** Once the call chain is complete, it cannot be activated again. It is thus not possible to send two or more responses for a given HTTP request: for each request, at most one response can be generated.

### :bangbang: Logger example

Our goal is to create a logger that records every single HTTP request made to our application as well as the URL of the request. We need to write a function that accepts the HTTP request and response objects as arguments and `next` as callback function. Here, we write two functions to showcase the use of several middleware components :point_down::

```javascript
var express = require("express");

//a middleware logger component
function logger(request, response, next) {
  console.log("%s\t%s\t%s", new Date(), request.method, request.url);
  next(); //control shifts to next middleware function
}

//a middleware delimiter component
function delimiter(request, response, next) {
  console.log("-----------------");
  next();
}

var app = express();
app.use(logger); //register middleware component
app.use(delimiter);
app.listen(3001);
```

If you start the script and then make the following HTTP requests:

- http://localhost:3001/first
- http://localhost:3001/second
- http://localhost:3001/

your output on the terminal will look something like this:

```
2020-01-14T19:17:16.577Z        GET     /first
-----------------
2020-01-14T19:17:19.111Z        GET     /second
-----------------
2020-01-14T19:17:21.159Z        GET     /
-----------------
```

:point_up: Importantly, `next()` enables us to move on to the next middleware component while **`app.use(...)` registers the middleware component with the dispatcher**. Try out this code for yourself and see what happens if:

- `app.use` is removed <spoiler-info>(the component is not available to the dispatcher)</spoiler-info>;
- the order of the middleware components is switched, i.e. we first add `app.use(delimiter)` and then `app.use(logger)`;
- in one or both of the middleware components the `next()` call is removed.

You will observe different behaviors of the application that make clear how the middleware components interact with each other and how they should be used in an Express application.

In the example above we did not actually sent an HTTP response back, but you know how to write such a code snippet yourself. Up to this point, none of our routes had contained `next` for a simple reason: all our routes ended with an HTTP response being sent and this completes the request-response cycle; in this case there is no need for a `next()` call.

### :bangbang: Authorization component example

In the [node-component-ex](https://github.com/chauff/demo-code/tree/master/node-component-ex) example application, we add an authorization component to a simple wishlist application back-end: only clients with the **correct username and password** (i.e. authorized users) should be able to receive their wishlist when requesting it. We achieve this by adding a middleware component that is activated for every single HTTP request and determines:

- whether the HTTP request contains an authorization header (if not, access is denied);
- and whether the provided username and password combination is the correct one.

Before we dive into the code details, install and start the server as explained [here](https://github.com/chauff/demo-code#node-component-ex). Take a look at `app.js` before proceeding.

Once the server is started, open another terminal and use [curl](https://github.com/curl/curl), a command line tool that provides us with a convenient way to include username and password as you will see:

- Request the list of wishes without authorization, i.e. `curl http://localhost:3000/wishlist` - you should see an `Unauthorized access` error.
- Request the list of wishes with the correct username and password (as hard-coded in our demonstration code): `curl --user user:password http://localhost:3000/wishlist`. The option `--user` allows us to specify the username and password to use for authentication in the `[USER]:[PASSWORD]` format. This request should work.
- Request the list of wishes with an incorrect username/password combination: `curl --user test:test http://localhost:3000/wishlist`. You should receive a `Wrong username/password combination` error.
- Add a wish to the wishlist: `curl --user user:password 'http://localhost:3000/addWish?type=board%20game&name=Treasure%20Hunt&priority=low'` (note that whitespaces are replaced by `%20` in URLs and the URL has to appear within quotes due to the special characters `&` in it). Did it work? If so, another execution of `curl --user user:password http://localhost:3000/wishlist` should result in a wishlist with now three wishes.

Having found out how the code _behaves_, let us look at the authorization component. We here define it as an anynymous function as argument to `app.use` :point_down::

```javascript
app.use(function (req, res, next) {
  var auth = req.headers.authorization;
  if (!auth) {
    return next(new Error("Unauthorized access!"));
  }

  //extract username and password
  var parts = auth.split(" ");
  var buf = new Buffer(parts[1], "base64");
  var login = buf.toString().split(":");
  var user = login[0];
  var password = login[1];

  //compare to 'correct' username/password combination
  //hardcoded for demonstration purposes
  if (user === "user" && password === "password") {
    next();
  } else {
    return next(new Error("Wrong username/password combination!"));
  }
});
```

:point_up: This code snippet first determines whether an authorization header was included in the HTTP request (accessible at `req.headers.authorization`). If no header was sent, we pass an error to the `next()` function, for Express to catch and process, i.e. sending the appropriate HTTP response. If an authorization header is present, we now extract the username and password (it is base64 encoded!) and determine whether they match `user` and `password` respectively. If they match, `next()` is called and the next middleware component processes the request, which in our `app.js` file is `app.get("/wishlist",...)`.

### Components are configurable

One of the design goals of middleware is **reusability across applications**: once we define a logger or an authorization component, we should be able to use it in a wide range of applications without additional engineering effort. Reusable code usually has parameters that can be set. To make this happen, we can wrap the original middleware function in a _setup function_ which takes the function parameters as input :point_down::

```javascript
function setup(options) {
  // setup logic
  return function (req, res, next) {
    // middleware logic
  };
}
app.use(setup({ param1: "value1" }));
```

## Routing

Routing is the mechanism by which requests are routed to the code that handles them. The routes are [specified by a URL and HTTP method](https://expressjs.com/en/api.html#app.METHOD) (most often `GET` or `POST`). You have employed routes already - every time you wrote `app.get()` you specified a so-called **route handler** for HTTP method GET and wrote code that should be executed when that route (or URL) is called.

This routing paradigm is a significant departure from the past, where **file-based** routing was commonly employed. In file-based routing, we access files on the server by their actual name, e.g. if you have a web application with your contact details, you typically would write those details in a file `contact.html` and a client would access that information through a URL that ends in `contact.html`. Modern web applications are not based on file-based routing, as is evident by the fact URLs these days do not contain file endings (such as `.html` or `.asp`) anymore.

In terms of routes, we distinguish between request **types** (`GET /user` differs from `POST /user`) and request **routes** (`GET /user` differs from `GET /users`).

**Route handlers are middleware**. So far, we have not introduced routes that include `next` as third argument, but since they _are_ middleware, we can indeed add `next` as third argument.

Let's look at an example where this makes sense :point_down::

```javascript
//clients request their wishlists
app.get("/wishlist", function (req, res, next) {
  //hardcoded “A-B” testing
  if (Math.random() < 0.5) {
    return next();
  }
  console.log("Wishlist in schema A returned");
  res.json(wishlist_A);
});

app.get("/wishlist", function (req, res, next) {
  console.log("Wishlist in schema B returned");
  res.json(wishlist_B);
});
```

:point*up: We define two route handlers for the same route `/wishlist`. Both anonymous functions passed as arguments to `app.get()` include the `next` argument. The first route handler generates a random number between 0 and 1 and if that generated number is below 0.5, it calls `next()` in the return statement. If the generated number is >=0.5, `next()` is not called, and instead a response is sent to the client making the request.
If `next` was used, the dispatcher will move on to the second route handler and here, we do not call `next`, but instead send a response to the client.
What we have done here is to hardcode so-called \_A/B testing*. Imagine you have an application and two data schemas and you aim to learn which schema your users prefer. Half of the clients making requests will receive schema A and half will receive schema B.

We can also provide multiple handlers in a single `app.get()` call :point_down::

```javascript
//A-B-C testing
app.get(
  "/wishlist",
  function (req, res, next) {
    if (Math.random() > 0.33) {
      return next();
    }
    console.log("Wishlist in schema A returned");
    res.json(wishlist_A);
  },
  function (req, res, next) {
    if (Math.random() < 0.5) {
      return next();
    }
    console.log("Wishlist in schema B returned");
    res.json(wishlist_B);
  },
  function (req, res) {
    console.log("Wishlist in schema C returned");
    res.json(wishlist_C);
  }
);
```

:point*up: This code snippet contains three handlers - and each handler will be used for about one third of all clients requesting `/wishlist`. While this may not seem particularly useful at first, it allows you to create generic functions that can be used in any of your routes, by dropping them into the list of functions passed into `app.get()`. What is important to understand \_when* to call `next` and _why_ in this setting we have to use a `return` statement - without it, the function's code would be continued to be executed.

### Routing paths and string patterns

When we specify a path (like `/wishlist`) in a route, the path is eventually converted into a **regular expression** (short: regex) by Express. Regular expressions are patterns to match character combinations in strings. They are very powerful and allow us to specify **matching patterns** instead of hard-coding all potential routes. For example, we may want to allow users to access wishlists via a number of similar looking routes (such as `/wishlist`, `/whishlist`, `/wishlists`). Instead of duplicating code three times for three routes, we can employ a regular expression to capture all of those similarly looking routes in one expression.

Express distinguishes three different types of route paths:

- strings;
- string patterns; and
- regular expressions.

So far, we have employed just strings to set route paths. **String patterns** are routes defined with strings and a subset of the standard regex meta-characters, namely: `+ ? * ( ) []`. Regular expressions contain the full range of common regex functionalities (routes defined through regular expressions are enclosed in `/ /` instead of `' '`), allowing you to create arbitrarily complex patterns. If you are curious how complex regular expressions can become, take a look at the size of regular expressions to [validate email addresses](https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression). Let's zoom in on string patterns (the full regex functionalities are beyond the scope of this class).

Express' **string pattern meta-characters** have the following interpretations:

| Character | Description                                      | Regex    | Matched expressions |
| --------- | ------------------------------------------------ | -------- | ------------------- |
| +         | one or more occurrences                          | ab+cd    | abcd, abbcd, …      |
| ?         | zero or one occurrence                           | ab?cd    | acd, abcd           |
| \*        | zero or more occurrences of any char (wildcard)  | ab\*cd   | abcd, ab1234cd, …   |
| […]       | match anything inside for one character position | ab[cd]?e | abe, abce, abde     |
| (…)       | boundaries                                       | ab(cd)?e | abe, abcde          |

It is important to realize that the use of `*` in Express' string patterns is somewhat unique. In most other languages/frameworks, whenever `*` is mentioned in relation to regular expressions, it refers to zero or more occurrences of the preceding element. In Express' string patterns, `*` is a wildcard.

These meta-characters can be combined as seen here :point_down::

```javascript
app.get('/user(name)?s+', function(req,res){
	res.send(…)
});
```

:point_up: The string pattern can be deciphered by parsing the pattern from left to right. It matches all routes that:

- start with `user`,
- are followed by `name` or '', and
- end with one or more occurrences of `s`.

And thus `/user` or `/names` do _not_ match this pattern, but `/users` or `/usernames` do indeed match.

In order to test your own string patterns, you can set up a simple server-side script such as the following :point_down:

```javascript
const express = require("express");

const app = express();

app.get("/user(name)?s+", function (req, res) {
  res.send("Yes!");
});

app.get("*", function (req, res) {
  res.send("No!");
});

app.listen(3001);
```

Once a string pattern is coded, you can open your browser at `http://localhost:3001/`, and test different routes, receiving a _Yes!_ for a matching route and a _No!_ for a non-matching route.

### Routing parameters

Apart from regular expressions, routing parameters can be employed to enable **variable input** as part of the route. Consider the following code snippet :point_down::

```javascript
const express = require("express");
const app = express();

var wishlistPriorities = {
  high: ["Wingspan", "Settlers of Catan", "Azul"],
  medium: ["Munchkin"],
  low: ["Uno", "Scrabble"],
};

app.get("/wishlist/:priority", function (req, res, next) {
  let list = wishlistPriorities[req.params.priority];
  if (!list) {
    return next();
  }
  res.send(list);
});

app.get("*", function (req, res) {
  res.send("No wishlist to return");
});

app.listen(3002);
```

:point_up: We have defined an object `wishlistPriorities` which contains `high`, `medium` and `low` priority wishes. We can hardcode routes, for example `/wishlist/high` to return only the high priority wishes, `/wishlist/medium` to return the medium priority wishes and `/wishlist/low` to return the low priority wishes. This is not a maintainable solution though (just think about objects with hundreds of properties). Instead, we create a single route that, dependent on a **routing parameter**, serves different wishlists. This is achieved in the code snippet shown here. The routing parameter `priority` (indicated with a starting colon `:`) will match any string that does **not** contain a slash. The routing parameter is available to us in the `req.params` object. Since the route parameter is called `priority` (what name we give this parameter is up to us), we access it as `req.params.priority`. The code snippet checks whether the route parameter matches a property of the `wishlistPriorities` object and if it does, the corresponding wishlist is returned in an HTTP response. If the parameter does not match any property of the `wishlistPriorities` object, we make a call to next and move on the next route handler.

Routing parameters can have various levels of nesting :point_down::

```javascript
var wishlistPriorities = {
  high: {
    partyGame: [],
    gameNightGame: ["Wingspan", "Settlers of Catan", "Azul"],
  },
  medium: {
    partyGame: ["Munchkin"],
    gameNightGame: [],
  },
  low: {
    partyGame: ["Uno"],
    gameNightGame: ["Scrabble"],
  },
};

app.get("/wishlist/:priority/:gameType", function (req, res, next) {
  let list = wishlistPriorities[req.params.priority][req.params.gameType];
  if (!list) {
    return next(); // will eventually fall through to 404
  }
  res.send(list);
});
```

:point_up: We do not only use the priorities for our wishlist, but also partition them according to whether the wanted games are party games or rather something for a long game night. The route handler now contains two routing parameters, `:priority` and `:gameType`. Both are accessible through the HTTP request object. If our corresponding Node.js script runs on our own machine, we can access high priority games for a game night via `http://localhost:3002/wishlist/high/gameNightGame`. We use the two parameters to access the contents of the `wishlistPriorities` object. If the two parameters do not match properties of `wishlistPriorities`, we call `next()` and otherwise, send the requested response.

<debug-info markdown="block">
### Organizing routes

Lastly, a word on how to organize your routes. Adding routes to the main application file becomes unwieldy as the codebase grows. Based on the knowledge of this lecture, you can move routes into a separate module. All you need to do is to pass the `app` instance into the module (here: `routes.js`) as an argument :point_down::

```javascript
/* routes.js */
module.exports = function(app){

    /* Route 1 */
    app.get('/', function(req,res){
        res.send(...);
    }))

    /* Route 2, ... */
};
```

```javascript
/* app.js */
//...
require("./routes.js")(app);
//...
```

:point_up: `routes.js` is a route module in which we assign a function to `module.exports` which contains the routes. In `app.js` we add the routes to our application through the `require` function and passing `app` in as an argument.
</debug-info>

## Templating with EJS

When we started our journey with Node.js and Express, we discussed that writing HTML in this manner (i.e. as part of our server-side script) :point_down::

```javascript
const express = require("express");
const url = require("url");
const http = require("http");

const port = process.argv[2];
const app = express();
http.createServer(app).listen(port);

const htmlPrefix = "<html><head></head><body><h2>";
const htmlSuffix = "</h2></body></html>";
app.get("/greetme", function (req, res) {
  let query = url.parse(req.url, true).query;
  let name = query["name"] != undefined ? query["name"] : "Anonymous";
  res.send(`${htmlPrefix}Greetings ${name}!${htmlSuffix}`);
});

app.get("*", function (req, res) {
  res.send(`${htmlPrefix}Goodbye!${htmlSuffix}`);
});
```

is a poor choice, as the code quickly becomes unmaintainable, hard to debug and generally a pain to work with.

One approach to solve this problem is the use of **Ajax**: the HTML code is _blank_ in the sense that it does not contain any user-specific data. The HTML and JavaScript (and other resources) are sent to the client and the client makes an Ajax request to retrieve the user-specific data from the server-side.

An alternative to Ajax is **templating**. With **templating, we are able to directly send HTML with user-specific data to the client** and thus remove the extra request-response cycle that Ajax requires:

![templating](../img/node2-templating.png)

With templates, our goal is to write as little HTML by hand as possible. Instead:

- we create a **HTML template** void of any data,
- add data, and
- from template+data generate a rendered HTML view.

This approach keeps the code clean and separates the coding logic from the presentation markup. Templates fit naturally into the _Model-View-Controller_ paradigm which is designed to keep logic, data and presentation separate.

This concept exists in several languages and even for Node.js alone, several template engines exist. In this course, we teach the basics of [**EJS**](https://github.com/mde/ejs)—_Embedded JavaScript_—a relatively straightforward template engine and language.

### :bangbang: A first EJS example

Let's take a first look at EJS. For this exercise, we will use Node's **REPL** (_Read-Eval-Print Loop_). It is the **Node.js shell**; any valid JavaScript which can be written in a script can be passed to the REPL as well. It useful for experimenting with Node.js, and playing around with some of JavaScript's more eccentric behaviors.

To start the REPL, type `node` in the terminal. The Node shell becomes available, indicated by the `>` prompt. Start your REPL and try a few things (declare a variable, define a function, etc.) by typing into the shell, ending each line with <kbd>Enter</kbd>. You should see something like this :point_down::

```
○ → node
Welcome to Node.js v14.11.0.
Type ".help" for more information.
> const s = "hello CSE1500!"
undefined
> s
'hello CSE1500!'
>
```

:point_up: If you want to avoid the constant `undefined` messages on the REPL (which are simply the return values of the commands entered), start the REPL as follows:

```
node -e "require('repl').start({ignoreUndefined:true})"
```

Back to EJS. Before we can use the EJS module, we need to install it as it is not part of core Node.js modules. You already know how to do this: `npm install ejs`. Then, you can start the REPL and type out the following EJS snippet :point_down::

```javascript
var ejs = require("ejs");
var template = "<%= message %>"; //<%= outputs the value into the template
var context = { message: "Hello CSE1500!" };
console.log(ejs.render(template, context));
```

:point*up: Here, we first make the EJS object available via `require()`. Next, we define our template string. In this template we aim to replace the message with the actual data. Our `context` variable holds an object with a property `message` and value `Hello CSE1500!`. Lastly, we have to bring the template and the data together by calling `ejs.render()`. The output will be the **rendered view**. The template contains `<%=`, a so-called \_scriptlet tag* to indicate the start of an element to be replaced with data as well as an ending tag `%>`.

There are two types of scriptlet tags that **output values**:

- `<%= ... %>` output the value into the template in **HTML escaped** form. This means that the characters that are indicating the start/end of markup sequences (such as `<script>` and `</script>`) are converted in such a way that they are rendered as content instead of being interpreted as markup.
- `<%- ... %>` output the value into the template in **unescaped** form. This means that a value such as `<script>` remains as-is. This enables cross-site scripting attacks, which we will discuss in the [security lecture](https://chauff.github.io/Web-Teaching/security/).

In order to see the difference between the two types of tags, go back to Node's REPL and try out the following code snippet :point_down::

```javascript
var ejs = require("ejs");
var unescapedTemplate = "<%- message %>";
var escapedTemplate = "<%= message %>";
var context = { message: "<script>alert('Hello CSE1500!');</script>" };

console.log("[UNESCAPED] " + ejs.render(unescapedTemplate, context));
console.log("[ESCAPED] " + ejs.render(escapedTemplate, context));
```

:point_up: The HTML-escaped variant produces the output

```
&lt;script&gt;alert(&#39;Hello CSE1500!&#39;);&lt;/script&gt;
```

:point*up: Here, we observe that the special characters in HTML are replaced by so-called [HTML entities](https://developer.mozilla.org/en-US/docs/Glossary/Entity), each one being a string starting with `&` and ending with `;`. The opening tag bracket `<` becomes `&lt;`, a single quotation mark `'` becomes `&#39;`. The browser's rendering engine \_renders* these HTML entities as special characters. Try it out for yourself! Save in a `*.html` file and open it in your browser :point_down::

```html
<html>
  <head></head>
  <body>
    &lt;script&gt;alert(&#39;Hello CSE1500!&#39;);&lt;/script&gt;
  </body>
</html>
```

In contrast, un-escaped variant produces `<script>alert('Hello CSE1500!');</script>` as output. In the latter case, this is code that the browser will execute. Once more, try it out yourself by replacing the escaped output in the HTML document above with the unescaped output. Loading the page should now result in a popup appearing in the browser.

### :bangbang: EJS and user-defined functions

In order to make templates maintainable, it is possible to provide user-defined functions to a template as follows :point_down::

```javascript
var ejs = require("ejs");
var people = ["wolverine", "paul", "picard"];

var transformUpper = function (inputString) {
  return inputString.toUpperCase();
};

var template = '<%= helperFunc(input.join(", ")); %>';
var context = {
  input: people,
  helperFunc: transformUpper, //user-defined function
};
console.log(ejs.render(template, context));
```

:point_up: `transformUpper` is a user-defined function that expects a string as input and transforms it to uppercase. The `context` object has a property `helperFunc` which is assigned a user-defined function as value. In the template, we use the properties of the `context` object; `ejs.render` brings template and data together.

### :bangbang: JavaScript within EJS templates

To make templates even more flexible, we can incorporate JavaScript in the template, using the `<%` scriptlet tag :point_down::

```javascript
var ejs = require("ejs");

var template =
  "<% if(movies.length>2){movies.forEach(function(m){console.log(m.title)})} %>";

var context = {
  movies: [
    { title: "The Hobbit", release: 2014 },
    { title: "X-Men", release: 2016 },
    { title: "Superman V", release: 2014 },
  ],
};

ejs.render(template, context);
```

:point_up: The context is an array of objects, each movie with a title and release date. In the template, we use [`Array.prototype.forEach`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) (it executes a provided function once per array element) to iterate over the array and print out the title and release date if our array has more than two elements (admittedly, not a very sensible example but it shows off the main principle). The `<%` scriptlet tags are used for **control-flow purposes**. If you replace the opening scriptlet tag with `<%-` or `<%=` (try it!), you will end up with an error.

### :bangbang: Express and templates

By now you might be asking why we are doing this. So far, we have only used Node's REPL to show off some of EJS' capabilities. The REPL though is only for playing around with short code snippets, it does not bring us closer to a server-side script with templating enabled. For that, we need Express. _How do templates tie in with the Express framework?_ It turns out that so-called **views** can be easily configured with Express. Not only that, an application can also make use of several template engines at the same time.

Three steps are involved:

:one: We set up the _views directory_ - the directory containing all templates. Templates are essentially HTML files with EJS scriptlet tags embedded and file ending `.ejs`:

```javascript
app.set("views", __dirname + "/views");
```

:two: We define the template engine of our choosing:

```javascript
app.set("view engine", "ejs");
```

:three: We create template files.

An functioning Express/EJS demo can be found [here](<[demo-code/node-ejs-ex](https://github.com/chauff/demo-code/tree/master/node-ejs-ex)>). Try it out yourself by installing and running it. Let's consider the application's `app.js` :point_down::

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

var wishlist = [];
wishlist.push({ name: "Wingspan", type: "game night" });
wishlist.push({ name: "Munchkin", type: "party game" });
wishlist.push({ name: "Scrabble", type: "game night" });
wishlist.push({ name: "Uno", type: "party game" });

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/wishlist", function (req, res) {
  res.render("wishlist", { title: "Game wishlist", input: wishlist });
});
```

:point_up: We first set up the views directory, then the view engine and finally we use Express' [`res.render`](https://expressjs.com/en/api.html#res.render) in order to render a view and send the rendered HTML to the client. Important to realize in this example is, that the first argument of `res.render` is a view stored in `views/wishlist.ejs` which the Express framework retrieves for us. The second argument is an object that holds the variables of the template, here `title` and `input` (an array). To confirm this, let's look at the template file itself, `wishlist.ejs` which contains the corresponding variable names :point_down::

```html
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
  </head>
  <body>
    <h1>Wishlist</h1>
    <div>
      <% input.forEach(function(w) { %>
      <div>
        <h3><%=w.name%></h3>
        <p><%=w.type%></p>
      </div>
      <% }) %>
    </div>
  </body>
</html>
```

:point_up: This is mostly HTML, with a few scriptlet tags sprinkled in. While EJS has more capabilities than we present here, for the purposes of our board game project, this excursion into EJS is sufficient.

<optional-info markdown="block">
## Node.js in production

When deploying a web app in production, there is usually more to it than we can describe in the two Node.js lectures. Testing is a vital aspect we have not yet covered (there will be a whole course on testing later on in your BSc), but also how to reliably run Node.js in production. One tool to help here is [PM2](https://github.com/Unitech/pm2), a popular production process manager with a built-in load balancer.
</optional-info>

## Self-check

Here are a few questions you should be able to answer after having followed the lecture and having worked through the required readings:

<details> 
  <summary>True or False? Node.js has a file-based module system.</summary>
  True.
</details>

<details> 
  <summary>True or False? Node.js runs each module in a separate scope and only returns the final value of <span markdown="span">module.exports</span>.</summary>
  True.
</details>

<details> 
  <summary>True or False? The <span markdown="span">require</span> module runs asynchronously.</summary>
  False.
</details>

<details> 
  <summary>True or False? <span markdown="span">module.exports</span> and <span markdown="span">exports</span> can be used in exactly the same way.</summary>
  False.
</details>

<details> 
  <summary>True or False? Middleware components can execute code.</summary>
  True.
</details>

<details> 
  <summary>True or False? Middleware components can change the request and response objects.</summary>
  True.
</details>

<details> 
  <summary>True or False? Middleware components can start the request-response cycle.</summary>
  False.
</details>

<details> 
  <summary>True or False? Middleware components can call any middleware function in the middleware stack.</summary>
  False.
</details>

<details> 
  <summary>Name three different routes, the following handler matches.
  <div markdown="1">
  ```javascript
  app.get('/whaa+[dt]s+upp*', function(req,res){
      res.send(…)
  });
```
  </div>
  </summary>
  <div markdown="1">
  ```
  /whaatsuppper
  /whaaadssuppp
  /whaaaaaadssuppthisisme
  ```
  </div>
</details>

<details> 
  <summary>What is the output of the code snippet above?
  <div markdown="1">
  ```javascript
  var ejs = require("ejs");
  var people = ["Wolverine", "paul", "picard"];
  var X = function (input) {
    if (input) {
      return input[0];
    }
    return "";
  };
  var template = "<%= helperFunc(input); %>";
  var context = {
    input: people,
    helperFunc: X,
  };
  console.log(ejs.render(template, context));
  ```
  </div>
  </summary>
  <span markdown="span">Wolverine</span>
</details>

<details> 
  <summary>Consider the following two files, <span markdown="span">constants.js</span> and <span markdown="span">bar.js</span>. What is the console output of <span markdown="span">node bar.js</span>?
  
  <div markdown="1">
```javascript
//constants.js
module.exports.pi = 3.1415;
module.exports.password = "root";
```

```javascript
//bar.js
var constants1 = require("./constants");
constants1.password = "admin";
var constants2 = require("./constants");
console.log(constants2.password);
var constants3 = require("./constants");
constants2.pi = 3;
console.log(constants3.pi);
```

  </div>
  </summary>
  <div markdown="1">
  ```
  admin
  3
  ```
  </div>
</details>
