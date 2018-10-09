# Taking a closer look at node.js

In this lecture, we cover different aspects of node.js that are important to be a productive Web developer.

## Learning goals

- Organize node.js code into modules.
- Understand and employ the concept of *middleware*.
- Employ routing.
- Employ templating.

## Organization and reusability of node.js code

So far, we have used a rather simple way to write node.js code: all server-side code is organized in a single file, which is only a feasible solution for very small projects. In larger projects this quickly ends in unmaintainable code:

- Debugging is cumbersome.
- Team-work is cumbersome.
- Programming is cumbersome.

These issues were recognized early on by the creators of node.js and they introduced the concept of **modules**. A node.js module is a single file and all code contained in it. 

By default, *no code in a module is accessible to other modules*. Any variable or method that should be visible to other modules has to be **explicitly** marked as such - you will learn shortly how exactly. node.js modules can be published to [npmjs.com](https://www.npmjs.com/), the most important portal to discover and share modules with other developers. When you look at npm modules, such as Express:

![Express npm](img/L6-express.png)

you will see that modules often dependent on a number of other modules (in this case: 30 dependencies). As Express is a very popular module, it is listed as dependency in more than 27,000 other modules.

 You already know how to install such modules, e.g. `npm install —save alexa-sdk`. You can also use the command line to search for modules to install, e.g. `npm search alexa`.

While it is beyond the scope of this course to dive into the details of the npm registry, it should be mentioned that it is not without issues; the story of how 17 lines of code - a single npm module - nearly broke much of the modern Web for half a day or so can be found [here](http://arstechnica.com/information-technology/2016/03/rage-quit-coder-unpublished-17-lines-of-javascript-and-broke-the-internet/).

### A file-based module system

In node.js each file is its own module. This means that the code we write in a file does not pollute the *global namespace*. In node.js we get this ability for free. When we write client-side JavaScript, we have to work hard to achieve the same effect (recall the module pattern covered in [Lecture 3](Lecture-3.md)).

The module system works as follows: each node.js file can access its so-called module definition through the module variable. The module variable is your entry point to modularize your code. To make something available from a module to the outside world, `module.exports` or its alias `exports` is used as we will see in a second:

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

 Finally, once you have defined your own module, the globally available `require` function is used to import a module. At this stage, you should recognize that you have been using node.js modules since your first attempts with node.js.

Here is a graphical overview of the connection between `require` and `module.exports`: 

![Modules](img/L6-module.png)

An application uses the `require` function to import module code. The module itself populates the `module.exports` variable to make certain parts of the code base in the module available to the outside world. Whatever was assigned to `module.exports` (or `exports`) is then returned to the application when the application calls `require()`.

### A first example

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

Node.js runs the referenced JavaScript file (here `foo.js`) in a **new scope** and **returns the final value** of `module.exports`. What then is the final value after executing foo.js? It is the function we defined in line 3. As you can see in lines 2 and beyond of `bar.js` there are several ways to access whatever `require` returned. We can call the returned function and this results in *Hi from foo!* as you would expect. We can also combine lines 1 and 2 into a single line, as seen in line 3 with the same result. If we print out the variable `foo`, we learn that it is a function. Using the `toString()` function prints out the content of the function. Next, we try to access `fooA` - a variable defined in `foo.js`. Remember that node.js runs each file in a new scope and only what is assigned to `module.exports` is available. Accordingly, `fooA` is not available in `bar.js` and we end up with a reference error. Finally, we can also look at the `module.exports` variable of `bar.js` - remember this is always available to a file in node.js. In `bar.js` we have not assigned anything to `module.exports` and thus it is an empty object.

This setup also explains why **`require` is blocking**, i.e. once a call to `require()` is made, the referenced file's code is executed and only once that is done, does `require()` return; this is in contrast to the usual *asynchronous* nature of node.js functions. 

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




