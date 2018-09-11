# node.js: JavaScript on the server

## Learning goals

- Explain the main ideas behind node.js. 
- Implement basic network functionality with node.js.
- Explain the difference between node.js, NPM & Express.
- Create a fully working Web application that has client- and server-side interactivity.
- Implement client/server bidirectional communication through WebSocketes.

## Introduction to node.js

Node.js in its own words:

```
“Node.js is a platform built on Google Chrome's JavaScript runtime for easily building fast, scalable network applications.
Node.js uses an event-driven, non-blocking  I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices."
```

The keywords in this description are `scalable`, `event-driven` and `non-blocking`.

Node.js is by now a well-established platform, here are the most important milestones:

- Google's JavaScript execution engine (**V8**) was open-sourced in 2008 (if you are interested what happened in the 10 years since then, [check out this blog post from the V8 team](https://v8project.blogspot.com/2018/09/10-years.html)).
- node.js builds on V8 and was released in **2009**.
- node.js' package manager (npm) was released in **2011**.
- December 2014: node.js developers were unhappy with the stewardship of the project and forked io.js.
- May 2015: io.js merged back with node.js. The [Node.js Foundation](https://foundation.nodejs.org/) was set up and is steering node's development to this day.
- 2017: node becomes a **first-class citizen of V8**, i.e. no V8 commit (code changes) is allowed to break node.

Node.js is widely used today, in [Stack Overflow's 2017 developer survey](https://insights.stackoverflow.com/survey/2017) Node.js was the most popular framework in the *Frameworks, Libraries, and Other Technologies* section.

If you want to know more about how the V8 engine and node.js fit together, check out [this keynote by Franziska Hinkelmann](https://www.youtube.com/watch?v=PsDqH_RKvyc), a Googler who works on the V8 engine.









## Take-aways of book chapter 4

If you have already read Chapter 4 of the course book, you should know:
- the basics of JavaScript, 
- how to include Javascript in your Web application, 
- how to declare variables and functions and so on.

You should have also learnt about `jQuery` - a cross-platform JavaScript library designed to simplify the client-side scripting of HTML. It provides a lower-level API to simplify working with the DOM across browsers. `jQuery` is still one of the most popular JavaScript libraries in use today (despite the rise of alternatives, newer frameworks that incorporate a lot of `jQuery` functionality), with more than half of the most trafficked Web sites in the world relying on a variant of `jQuery`. Its strength is its ability to simplify tedious tasks.

## JavaScript's reputation

Until fairly recently JavaScript was considered more of a toy language. Today though, it is the most important language of the modern Web stack. On GitHub, one of the most popular social coding platforms world-wide, [JavaScript has taken the number 1 language spot in 2017](https://octoverse.github.com/). Over the past decade, the tooling, frameworks and libraries that have become available for JavaScript (browser built-in dev tools, build tools, testing frameworks, UI frameworks, ...) have vastly improved. In addition, the **JavaScript runtime environments** are highly efficient and a number of them co-exist: [V8](https://developers.google.com/v8/) is Google's JavaScript engine, [SpiderMonkey](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey) is Mozilla's engine (used in Firefox) and [Chakra](https://github.com/Microsoft/ChakraCore) is Microsoft's JavaScript runtime.

JavaScript tracks ECMAScript, the scripting-language specification standardized by Ecma International. While JavaScript is the most popular implementation of the standard, other implementations (or dialects) exist as well, e.g. ActionScript.

JavaScript is a language in flux.

One of the confusing aspects about JavaScript today are the naming conventions, you may come across terms such as **ES6**, **ES7**, **ES2015**, **EcmaScript 2017**, etc. These names refer to different version of EcmaScript (ES for short) which is currently in continuous development. Most often, you are likely to encounter **ES6** (also referred to as **ES2015**) which added a host of new features to the standard required a long-standing effort: "the completion of the sixth edition is the culmination of a fifteen year effort" ([source](https://tc39.github.io/ecma262/)). Starting with **ES2016** (also known as **ES7**), ECMAScript is updated in a yearly cycle.

Similar to HTML5, after a number of years with hardly any development, we are currently in a phase of continous updates and changes.

In this course we do include very few **ES6** features, as we have only a few lectures to cover the material. If you want to dive into the depth of JavaScript, check out the free [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS) series!

In this course we cover *plain JavaScript*, but it is also worthwhile to know that [MANY](https://github.com/jashkenas/coffeescript/wiki/list-of-languages-that-compile-to-js) languages compile into JavaScript.
The three most well-known of such languages are [CoffeeScript](https://coffeescript.org/), [TypeScript](https://www.typescriptlang.org/) and [Dart](https://www.dartlang.org/), all three fill one or more gaps of the original JavaScript language. Once you work on complex projects in collaboration, these higher-level languages can make a differences, especially when it comes to debugging.

Here is one example of what TypeScript (the 11th most popular language on GitHub as of [2017](https://octoverse.github.com/)) offers: JavaScript is a **dynamic languages**, this means that you have no way of enforcing a certain type on a variable. Instead, a variable can hold any type, a String, a Number, an Array ... but of course often you know what you want the type to be (for instance function parameters), so it is good to give this knowledge to the compiler to avoid errors. TypeScript (as the name suggests, TypeScript enables static type checking) allows you to do that, so you can catch errors early on!

## Scripting overview

### Server-side scripting

Source code is private, result of script execution is returned (in HTML), not the script itself
HTML can be rendered by any browser
Server-side scripts can access additional resources (including databases)
Server-side scripts can use non-standard language features (you know your server’s software)







## Self-check

Here are a few questions you should be able to answer after having followed the lecture and having worked through the required readings:
