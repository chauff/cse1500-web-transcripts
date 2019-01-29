# Overview of interactive web programming exercises

One of the issues beginning web developers face is the deluge of materials that are "out there" on the web. It is easy to be overwhelmed, not just by the amount of material, but also the fast pace of new standards, new frameworks and new languages. In this course, we only have a few weeks to teach you the basics of web programming. For this reason, below we have listed a number of interactive exercises from a single source: [nodeschool.io](https://nodeschool.io/). These "exercise bundles" are themselves implemented as Node.js packages! So, you will use `node` to learn `node`!

Nodeschool offers a long list of self-guided tutorials and exercises; we have matched them up to our lectures. A ● indicates that this concept is taught in class, a ◐ indicates that this is useful knowledge (especially towards completing your assignments) but not required. If a row has no mark at all, then this exercise can safely be skipped.

A nice side effect of the nodeschool.io exercises is the fact that they all require you to use the terminal - in itself a useful exercise.

These are largely introductory exercises, each one takes no longer than 3-4 minutes to read up upon and solve (some less than a minute). They will help you to get started if you have never programmed in JavaScript and/or Node.js before this course. They do not only introduce language features, but also how to use the node package manger `npm`, how to debug Node.js programs and so on.

**Note**: _We do not require you to go through these exercises, they are supposed to help you get started on your assignments._

## Where to start

1. Make sure to have `node` and `npm` installed.
2. Access the GitHub repositories linked in the table.
3. Install each package as described in the GitHub README, e.g. `npm install --global javascripting` or `npm install learnyounode`. In the latter case (no `--global` option) the package will be installed in the current directory under `node_modules`. If you can choose, stick to the global installation of the package as described in the READMEs, as then you can directly follow the instructions in the respective repository and simply start the workshop with the command `javascripting` or `learnyounode`. If you cannot for some reason globally install the packages, your command will look something like this `node node_modules/javascripting/bin/javascripting`.
4. Run through the workshop exercises!

<center>

|   |                       |                           |        |         |              |           |       |              |                      |
|---|-----------------------|---------------------------|:--------:|:---------:|:--------------:|:-----------:|:-------:|:--------------:|:----------------------:|
|   |                       |                           | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|   |                       |                           | **HTTP** | **HTML** | **JavaScript** | **Node.js** | **CSS** | **Node.js II** | **Cookies & sessions** |
|   | [learnyouhtml](https://github.com/denysdovhan/learnyouhtml)         | **_all exercises_**           |        | ●        |             |           |       |              |                      |
|   | [javascripting](https://www.github.com/sethvincent/javascripting)         | **_all exercises_**           |        |         | ●            |           |       |              |                      |
|   | [learnyounode](https://www.github.com/workshopper/learnyounode)          | hello world               |        |         |              | ●         |       |              |                      |
|   |                       | baby steps                |        |         |              | ●         |       |              |                      |
|   |                       | my first I/O!             |        |         |              | ●         |       |              |                      |
|   |                       | my first async I/O!       |        |         |              | ●         |       |              |                      |
|   |                       | filtered ls               |        |         |              | ●         |       |              |                      |
|   |                       | make it modular           |        |         |              |           |       | ●            |                      |
|   |                       | HTTP client               |        |         |              |           |       |              |                      |
|   |                       | HTTP collect              |        |         |              |           |       |              |                      |
|   |                       | juggling async            |        |         |              |           |       |              |                      |
|   |                       | time server               |        |         |              | ●         |       |              |                      |
|   |                       | HTTP file server          |        |         |              | ●         |       |              |                      |
|   |                       | HTTP uppercaserer         |        |         |              |           |       |              |                      |
|   |                       | HTTP json api server      |        |         |              | ●         |       |              |                      |
|   |                       |                           |        |         |              |           |       |              |                      |
|   | [how-to-npm](https://github.com/workshopper/how-to-npm)            | install npm               |        |         |              | ●         |       |              |                      |
|   |                       | dev environment           |        |         |              | ◐         |       |              |                      |
|   |                       | login                     |        |         |              | ●         |       |              |                      |
|   |                       | start a project           |        |         |              | ●         |       |              |                      |
|   |                       | install a module          |        |         |              | ●         |       |              |                      |
|   |                       | listing dependencies      |        |         |              | ●         |       |              |                      |
|   |                       | npm test                  |        |         |              | ◐         |       |              |                      |
|   |                       | package niceties          |        |         |              |           |       |              |                      |
|   |                       | publish                   |        |         |              |           |       |              |                      |
|   |                       | version                   |        |         |              |           |       |              |                      |
|   |                       | publish again             |        |         |              |           |       |              |                      |
|   |                       | dist tag                  |        |         |              |           |       |              |                      |
|   |                       | dist tag removal          |        |         |              |           |       |              |                      |
|   |                       | outdated                  |        |         |              |           |       |              |                      |
|   |                       | update                    |        |         |              |           |       |              |                      |
|   |                       | rm                        |        |         |              |           |       |              |                      |
|   |                       | finale                    |        |         |              |           |       |              |                      |
|   |                       |                           |        |         |              |           |       |              |                      |
|   | [functional-javascript](https://github.com/timoxley/functional-javascript-workshop) | hello world               |        |         | ●            |           |       |              |                      |
|   |                       | higher order functions    |        |         | ●            |           |       |              |                      |
|   |                       | basic: map                |        |         |              | ●         |       |              |                      |
|   |                       | basic: filter             |        |         |              |           |       |              |                      |
|   |                       | basic: reduce             |        |         |              |           |       |              |                      |
|   |                       | basic: recursion          |        |         |              |           |       |              |                      |
|   |                       | basic: call               |        |         |              |           |       |              |                      |
|   |                       | partial app. without bind |        |         |              |           |       |              |                      |
|   |                       | partial app. with bind    |        |         |              |           |       |              |                      |
|   |                       | implement map with reduce |        |         |              |           |       |              |                      |
|   |                       | function spies            |        |         | ●            |           |       |              |                      |
|   |                       | blocking event loop       |        |         | ●            |           |       |              |                      |
|   |                       | trampoline                |        |         | ●            |           |       |              |                      |
|   |                       | async loops               |        |         |              |           |       |              |                      |
|   |                       | recursion                 |        |         |              |           |       |              |                      |
|   |                       | currying                  |        |         | ●            |           |       |              |                      |
|   |                       | function call             |        |         |              |           |       |              |                      |
|   |                       |                           |        |         |              |           |       |              |                      |
|   | [expressworks](https://github.com/azat-co/expressworks)          | hello world               |        |         |              | ●         |       |              |                      |
|   |                       | static                    |        |         |              | ●         |       |              |                      |
|   |                       | pug                       |        |         |              |           |       | ●            |                      |
|   |                       | good old form             |        |         |              |           |       | ●            |                      |
|   |                       | stylus css                |        |         |              |           |       |              |                      |
|   |                       | param pam pam             |        |         |              |           |       | ●            |                      |
|   |                       | What's in query           |        |         |              | ●         |       |              |                      |
|   |                       |                           |        |         |              |           |       |              |                      |
|   | [bug-clinic](https://github.com/othiym23/bug-clinic)            | intake                    |        |         |              |           |       |  ◐           |                      |
|   |                       | triage                    |        |         |              |           |       | ◐            |                      |
|   |                       | disinfect                 |        |         |              |           |       | ◐            |                      |
|   |                       | monitor                   |        |         |              |           |       | ◐            |                      |
|   |                       | traces                    |        |         |              |           |       |              |                      |
|   |                       | test                      |        |         |              |           |       |              |                      |
|   |                       | scan                      |        |         |              |           |       | ◐            |                      |
|   |                       | probe                     |        |         |              |           |       |              |                      |
|   |                       | observe                   |        |         |              |           |       |              |                      |
|   |                       | intervene                 |        |         |              |           |       |              |                      |
|   |                       | operate                   |        |         |              |           |       |              |                      |
|   |                       | biopsy                    |        |         |              |           |       |              |                      |
|   |                       | postmortem                |        |         |              |           |       |              |                      |
|   |                       |                           |        |         |              |           |       |              |                      |
|   | [count-to-6](https://github.com/domenic/count-to-6)            | hello es6                 |        |         | ◐            |           |       |              |                      |
|   |                       | template strings          |        |         | ◐            |           |       |              |                      |
|   |                       | arrow functions, part 1   |        |         | ◐            |           |       |              |                      |
|   |                       | arrow functions and this  |        |         | ◐            |           |       |              |                      |
|   |                       | destructuring             |        |         | ◐            |           |       |              |                      |
|   |                       | spread                    |        |         | ◐            |           |       |              |                      |
|   |                       | rest                      |        |         | ◐            |           |       |              |                      |
|   |                       | default arguments, part 1 |        |         | ◐            |           |       |              |                      |
|   |                       | default arguments, part 2 |        |         | ◐            |           |       |              |                      |
|   |                       | tagged template strings   |        |         | ◐            |           |       |              |                      |
|   |                       |                           |        |         |              |           |       |              |                      |
|   | [currying-workshopper](https://github.com/kishorsharma/currying-workshopper)  | identity                  |        |         | ●            |           |       |              |                      |
|   |                       | binary                    |        |         | ●            |           |       |              |                      |
|   |                       | delay invocation          |        |         | ●            |           |       |              |                      |
|   |                       | long_delay_invocation     |        |         | ●            |           |       |              |                      |
|   |                       | call and apply            |        |         | ●            |           |       |              |                      |
|   |                       | curry function            |        |         | ●            |           |       |              |                      |
|   |                       |                           |        |         |              |           |       |              |                      |
