---
layout: default
permalink: /
---

Web technology course information <!-- omit in toc -->
==

CSE1500 is the [Web and Database Technology course](https://studiegids.tudelft.nl/a101_displayCourse.do?course_id=51307), that first-year Bachelor students of the Bachelor Computer Science and Engineering take at [TU Delft](https://www.tudelft.nl/).

This website contains **all materials of the web technology part** of the course. We opted to not distribute the materials via Brightspace due to the many code examples that are much more easily maintained and updated on GitHub. 

**The transcripts are extensive. Video lectures covering each transcript will not be provided in the course 2020/21 edition. Instead, each week an online Q&A session will be held where every student is invited to participate. Smaller videos discussing specific aspects (e.g. how to approach the assignments) will be provided.**

We cover the following languages and technologies: HTTP, HTML, JavaScript, CSS, Node.js and Express. In the five weeks of the web technology lectures we can only cover the web programming fundamentals. If you want to get an overview of the set of languages, technologies and frameworks a frontend or backend web engineer should be familiar with in 2020, take a look at the [web developer roadmap - 2020](https://github.com/kamranahmedse/developer-roadmap).

:warning: **The materials are in the process of being updated for the 2020/21 edition.**

## Table of contents <!-- omit in toc -->
- [Web technology instructor](#web-technology-instructor)
- [Book](#book)
- [Tooling](#tooling)
  - [Recommended](#recommended)
  - [Required](#required)
- [Course grading](#course-grading)
- [Web technology topics](#web-technology-topics)
- [Web technology assignments](#web-technology-assignments)
- [Generating PDFs from the transcripts](#generating-pdfs-from-the-transcripts)
- [Web development resources](#web-development-resources)
- [Lecture material types](#lecture-material-types)
- [University courses with a web focus elsewhere](#university-courses-with-a-web-focus-elsewhere)

## Web technology instructor

The responsible instructor of the web technology part is Associate Professor [Claudia Hauff](https://chauff.github.io/). Inquires about the course content, exams and so on should be emailed to `cse1500-ewi@tudelft.nl`. 

## Book 

The one book we *recommend* for this part of the course is [Web Development with Node and Express, 2nd Edition](https://www.oreilly.com/library/view/web-development-with/9781492053507/). *It is not required though* - there are no required readings from this book and we do not even come close to covering the majority of the book's content. We recommend it as it shows where and how Node.js/Express (two key frameworks we introduce in this course) can be employed in production settings.

There is not one recommended book to cover the basics of HTML, CSS or JavaScript. Instead, we point you to a number of very good introductory resources that cover the basics of each of these technologies. The lecture materials go beyond those basics.

## Tooling

### Recommended

[Visual Studio Code](https://code.visualstudio.com/) (VSC) is our recommended development environment for the assignments. It is a free and open-source Integrated Development Environment (IDE) available for all major operating systems. It is also [the most popular IDE](https://insights.stackoverflow.com/survey/2019#development-environments-and-tools) for web developers today. It was originally designed to support Node.js programmers (the server-­side JavaScript framework we introduce in this course), but now has extensions for many programming languages. Best of all, **Visual Studio Code itself is written in JavaScript**!

![Visual Studio Code](img/RME-vsc.png)

VSC offers **many extensions**. You can find a guide on how to browse and install them [here](https://code.visualstudio.com/docs/editor/extension-gallery). A list with all kinds of "delightful" extensions can be found [here](https://github.com/viatsko/awesome-vscode). Since this may be a bit overwhelming, we made a short list of the extensions we recommend to install for this course. For the programming assignments we recommend the **VS Live Share** extension for those students that do not want to dive into `git` yet! 

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), a popular *linting utility* for JavaScript (a linter is a tool that analyzes source code to flag potentially poor code such as unused variables) - use it to improve your code.
- [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer) does what the name suggests.
- [Quokka.js](https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode) - a great tool to try out JavaScript snippets without hassle.
- [VS Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare) - a collaborative real-time coding extension (especially useful if a student team works mostly remotely).
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) to make finding the file you are after in your app directory a bit easier.
- If you like to add TODOs to your code, try [Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree), it makes sure you don't overlook any of your TODOs!
- Finally, a good [theme](https://code.visualstudio.com/docs/getstarted/themes) for your IDE to make coding more enjoyable is also not a bad idea. [Dracula](https://marketplace.visualstudio.com/items?itemName=dracula-theme.theme-dracula) is a popular one. [Cobalt2](https://marketplace.visualstudio.com/items?itemName=wesbos.theme-cobalt2) is also nice. If you want to pick based on visuals, head over to [https://vscodethemes.com/](https://vscodethemes.com/).

If you are new to team programming, and want to use VSC's features efficiently, [read our VSC guide](How-to-use-VSC.md).

**Browser developer tools** are integrated in all modern browsers; familiarize yourself with the developer tools of your favorite browser. In our lectures, we will showcase [Firefox's](https://developer.mozilla.org/en-US/docs/Tools) and [Chrome's](https://developers.google.com/web/tools/chrome-devtools) developer tools.

### Required 

The latest stable version of [Node.js](https://nodejs.org/en/). 

Two modern web browsers such as Chrome, Firefox, Edge, etc. to test your project code across browser implementations.

Telnet (for your first web technology assignment).

## Course grading

The entire course (covering both database and web technoloogy topics) is graded as follows:

![grading](img/RME-grading.png)

**Passing requirements**: the overall grade must be **5.8** or higher AND the midterm grade must be at least a **5** AND the final exam grade must be at least a **5** in accordance with TU Delft's exam regulations.

Each exam (midterm, final) covers one of the two course topics completely.

Assignments are done in **pairs of two students** and are graded by student assistants in a binary manner (pass or fail). There are six assignments in total, three cover database topics and three cover web technology topics. While the assignments together make up only 20% of the final grade **and are not required**, we strongly recommend to tackle the assignments - they cover a lot of exam materials in a practical manner!

We have two assessment moments: one for the database assignments and one for the web technology assignments. The assessment is interview-based; the interview with one of our teaching assistants will last 20-25 minutes. Each assessment moment can yield anything between 3x pass and 3x no-pass. While each team of two students is interviewed together, they receive passes individually.

The table below shows how the number of passes (maximum 6: 3x database and 3x web) are converted to the assignment grade:

| Number of passes | Grade |
|------------------|-------|
| 6                | 10.0  |
| 5                | 8.3   |
| 4                | 6.7   |
| 3                | 5.0   |
| 2                | 3.3   |
| 1                | 1.7   |
| 0                | 0.0   |

Frequently Asked Questions:
- **Are all web technology exam questions multiple-choice questions?** Yes.
- **Can assignment passes be carried over to the next year?** No, while assignment passes are valid for this year's resit, next year all assignments have to be tackled again.
- **Is there a resit option for the assignments?** No.
- **How does the resit look like?** Not yet known due to the COVID situation. In past years, we had a single 3-hour exam which covered both the database and web technology topics and each student could choose which part (or both) of the exam to resit.
- **What happens if my grade for one of the exams is worse in the resit?** We grade according to TU Delft's grading policy and thus *the better grade counts*. If the resit exam grade is lower than the original exam grade, we keep the higher grade in the grade books.
- **Can more than 2 students work in a team?** No.
- **Can a student work alone on the assignments?** Generally: no. If you think you have a very good reason for an exception, please email the instructor.

## Web technology topics

The web technology topics we cover (in this order) are the following:

- HTTP
- HTML5 and web design
- JavaScript
- Node.js
- CSS
- Node.js (advanced)
- Cookies and sessions
- Web security

The order may strike you as odd, as typically CSS is introduced before JavaScript. Here, we introduce JavaScript as early as possible, to give you the chance to practice it a longer period of time before the exam moment.

## Web technology assignments

There are three web technology assignments:

- [Assignment on HTTP and web design](_practicals/assignment-http-design.md),
- [Assignment on client-side and server-side JavaScript (i.e. Node.js)](_practicals/assignment-js-node.md), and
- [Assignment on server-side JavaScript and CSS](_practicals/assignment-css-node.md).

The three assignments build on each other - over the course of them you are tasked with implementing a small multi-player game. In previous years, roughly 90% of groups passed one assignment, 60% passed two web technology assignments and 30% of groups passed all three web technology assignments.

## Generating PDFs from the transcripts

//TODO: VSC Markdown details to add

## Web development resources

The practical assignments of this work often require looking up Web development specifics. Two good resources, in general, for Web engineering are [Mozilla's MDN portal](https://developer.mozilla.org/en-US/) and [Google's Web Fundamentals](https://developers.google.com/web/fundamentals/).

If you want to hear the latest and greatest about the web stack, Twitter is a good source of information.
Here is a list of accounts to follow:

- [Franziska Hinkelmann](https://twitter.com/fhinkel), working on Node.js at Google
- [Lin Clark](https://twitter.com/linclark) makes technical challenges accessible to the wider public for Mozilla
- [V8](https://twitter.com/v8js), Google's JavaScript engine
- [JavaScript Daily](https://twitter.com/JavaScriptDaily), does exactly as the name suggests
- [AmsterdamJS](https://twitter.com/amsterdamjs), local JavaScript community
- [Node.js](https://twitter.com/nodejs) (of course)
- [Axel Rauschmeyer](https://twitter.com/rauschma), an author of popular JavaScript books
- [Addy Osmani](https://twitter.com/addyosmani), working on Google Chrome and well known for his JavaScript design patterns book
- [Wes Bos](https://twitter.com/wesbos), a popular teacher of the web stack
- [Mozilla Hacks](https://twitter.com/mozhacks), official Mozilla account for web developers
- [Visual Studio Code](https://twitter.com/code) (of course)
- [JavaScript Conference Series](https://twitter.com/jsconf) - look out for their conference talks, usually posted on YouTube
- [Chrome DevTools](https://twitter.com/ChromeDevTools), tips and tricks of the dev tool trade
- [Syntax](https://twitter.com/syntaxfm), podcasts for web developers

## Lecture material types

![materials](img/RME-materials.png)

For each lecture we provide a range of materials:

- **Required readings**: please read the required readings **before** tackling the lecture, especially if you are starting out in web technology. The required readings are typically introductions to the different languages we cover. The lecture materials go beyond the contents of the required readings.
- **Recommended activities**: activities that we think will help you get a better grasp of the different web technologies. Activities are either programming exercises or podcasts (there are some great ones out there!). Don't see those as a complete list to work through, that is impossible given the time!
- **Recommended readings**: these may be tweets, blog posts or book chapters that help you understand some of the introduced concepts better; again, do not attempt to read all of the materials.
- **Relevant scientific publications**: we are often asked why this kind of course is part of the computer science curriculum. Isn't this *just* programming? To showcase how web technologies are researched, we here list a number of scientific publications that contribute to our understanding of (the use of) web technologies.

## University courses with a web focus elsewhere

Lastly, the materials we present here are only one way of introducing the fundamentals of the web to undergraduate students. A number of other universities offer publicly accessible teaching materials:

- [Deep Dive Into Modern Web Development /U Helsinki](https://fullstackopen.com/en)
- [Design and Implementation of Software for the Web /GMU](https://cs.gmu.edu/~tlatoza/teaching/swe432f17/home.html)
- [Web Applications /Stanford](http://web.stanford.edu/class/cs142/)
- [Web Security /Stanford](https://web.stanford.edu/class/cs253/)
- [Creating Modern Web Applications /Brown](https://cs.brown.edu/courses/csci1320/index.html)
- [Web Security /NUS](http://www.comp.nus.edu.sg/~prateeks/teaching/sp15/cs5331-sp15.html)
- [Programming Languages for Web Applications /Virginia](http://www.cs.virginia.edu/~up3f/cs4640/schedule.html)
- [Web Development /MIT](http://webdevelopment.mit.edu/)
- [Cutting-edge Web Technologies /Berkeley (2015)](https://inst.eecs.berkeley.edu/~cs294-101/sp15/)
- [Web Technologies /U Texas (2015)](http://www.cs.utsa.edu/~cs4413/)
- [Web Programming /U Washington](https://courses.cs.washington.edu/courses/cse154/20su/)
- [Web and Mobile Systems /U Virginia](http://cs4720.cs.virginia.edu/f14/)
- [Javascript /UPenn](http://www.seas.upenn.edu/~cis197/)

