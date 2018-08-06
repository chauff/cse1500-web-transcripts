# Web-Teaching

Overview of resources, notes and ideas for the upcoming edition of the [Web and Database Technology course](http://studiegids.tudelft.nl/a101_displayCourse.do?course_id=48438).
This overview focuses solely on the Web programming part of the course (8 out of 15 lectures).

## Required/recommended tools and frameworks 

- [Visual Studio Code](https://code.visualstudio.com/) (recommended IDE, TAs are familiar with it)
- [node.js](https://nodejs.org/en/) (required)
- Modern Web browser (Chrome, Firefox, Edge, ...)

## Grading

- Course grade:
  - 40% midterm
  - 40% final exam
  - 20% assignments
- Requirements: to pass, the overall grade must be 5.8 or higher and both the midterm and final exam grade must have been a 5 or higher; assignments are not required (though they count towards the final grade)
- Assignments are done in pairs of two students and graded by TAs in a pass/fail manner

## List of lectures (as of 2017/18)

- Lecture 1 ([PDF-1](https://chauff.github.io/documents/webdb-2017-18/web-http.pdf), [PDF-2](https://chauff.github.io/documents/webdb-2017-18/web-http-continued.pdf)) on **HTTP**: HTTP 1.1 request/response message, important HTTP headers, Web caches, HTTP methods, telnet, IP addresses
  - Required readings: *none*
  - Recommended readings:
    - Chapters 1, 2 and 3 of [HTTP: The Definite Guide (O'REILLY 2002)](http://shop.oreilly.com/product/9781565925090.do)
    - [MDN overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
    - Read up on the developer tools of your favourite Web browser (e.g. [Firefox](https://developer.mozilla.org/son/docs/Tools) or [Chrome](https://developer.chrome.com/devtools))
    - [A brief history of HTTP](https://hpbn.co/brief-history-of-http/)
  
- Lecture 2 ([PDF](https://chauff.github.io/documents/webdb-2017-18/web-html5.pdf)) on **HTML5**: Web sites vs. Web applications, Electron, Web design basics (*Don't make me think* by Steve Krug), usability testing, HTML5 history, Web standards, HTML forms, AppCache
  - Required readings: 
    - Chapter 2 of the [Web course book](http://shop.oreilly.com/product/0636920030621.do)
    - HTML form slides
  - Recommended readings:
    - Chapter 3 of the [Definite Guide to HTML5](https://www.apress.com/gp/book/9781430239604)
  
- Lecture 3 ([PDF](https://chauff.github.io/documents/webdb-2017-18/web-javascript.pdf)) on **JavaScript** (client-side): functions as first-class citizens, object creation, basic constructor, prototype-based constructor, module, WebConsole, scoping, events and the DOM
  - Required readings:
    - Chapter 4 of the [Web course book](http://shop.oreilly.com/product/0636920030621.do)
  - Recommended activities:
    - Follow the [CodeSchool Try jQuery](https://www.pluralsight.com/courses/code-school-try-jquery) course
    - Follow the [CodeCademy JavaScript](https://www.codecademy.com/learn/introduction-to-javascript) tutorial
  - Recommended readings:
    - [Learning JavaScript design patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/), in particular the sections on the [constructor pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#constructorpatternjavascript) and the [module pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript).
    - MDN's introduction to [JavaScript objects](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects)

- Lecture 4 ([PDF](https://chauff.github.io/documents/webdb-2017-18/web-nodejs.pdf)) on **node.js**: history, npm, event loop (single-threaded and highly parallel), watch a file for changes (`fs`), networking with node.js (`net`), web server creation (`http`), urls for routing (`url`), Express framework (`express`), JSON, Ajax
  - Required readings:
    - Chapters 5 & 6 of the [Web course book](http://shop.oreilly.com/product/0636920030621.do)
  - Recommended activities:
    - [learnyounode](https://github.com/workshopper/learnyounode) is an interactive tutorial of node.js
    ![alt text](learnyounode-lecture4.png "List of learnyounode exercises, relevant for the lecture")
    - [how-to-npm](https://github.com/npm/how-to-npm) is an interactive tutorial on the use of npm (node's package manager)
    - CodeSchool has a [node.js module](https://www.codeschool.com/courses/real-time-web-with-node-js) tutorial as well; free trial available
  - Recommended readings:
    - A [comprehensive list of node.js resources](https://github.com/sergtitov/NodeJS-Learning) is updated by Sergey Titov
    - The recommended IDE for this course is [Visual Studio Code](https://code.visualstudio.com/) (open-source, available for all major operating systems). [Here](https://vscodecandothat.com/) is a good overview of some of the very useful but less obvious features of VS.
  
- Lecture 5 ([PDF](https://chauff.github.io/documents/webdb-2017-18/web-css3.pdf)) on **CSS**: history, CSS3, pseudo-elements (`first-letter`,`after`,`before`) and pseudo-classes (`nth-child`,`nth-of-type`, `first-child`, `hover`, `enabled`, `not`, `in-range`), rendering engine, `content` attribute (data in CSS), CSS counters, browser-specific prefixes, element positioning (`float`, `position`, `display`), CSS coordinate system, CSS media queries, CSS animations and transitions
  - Required readings:
    - Chapter 3 of the [Web course book](http://shop.oreilly.com/product/0636920030621.do)
  - Recommended activities:
    - Take a look at the ["pens"](https://codepen.io/pens/#) showcased at [CodePen.io](https://codepen.io/#); it is a good platform to see what is possible in front-end Web development
  - Recommended readings
    - Chapters 1-4 and chapter 13 of [The Book of CSS3: A developer's guide to the future of Web design](https://nostarch.com/css3_2e) by Peter Gasston (2nd edition, 2014)
    - To make sense of CSS positioning, take a look [here](https://developer.mozilla.org/en-US/docs/Web/CSS/position_value) and [here](https://alistapart.com/article/css-positioning-101)

- Lecture 6 ([PDF](https://chauff.github.io/documents/webdb-2017-18/web-nodejs-continued.pdf)) on **advanced node.js**: Ajax in more detail, node.js modules (`module.exports`, `require`), middleware, routing, regular expressions, templating with EJS
  - Required readings: *none*
  - Recommended activities:
    - An interactive ejs playground can be found [here](https://ionicabizau.github.io/ejs-playground/).
    - An interactive playground for express routes and regular expression is available [here](http://forbeslindesay.github.io/express-route-tester/).
  - Recommended readings:
    - To learn more about ejs, take a look at its [GitHub repository](https://github.com/mde/ejs).
    - To learn more about middleware and Express, take a look at the [Express documentation](http://expressjs.com/en/guide/using-middleware.html).
    - An overview of [best practices in node.js](https://github.com/i0natan/nodebestpractices)

- Lecture 7 ([PDF](https://chauff.github.io/documents/webdb-2017-18/web-cookies-sessions.pdf)) on **cookies and sessions**: session vs persistent cookies, cookie fields, cookie flags/domain, cookies in Express (accessing and deleting them), evercookie, third-party cookies, client-side cookies (`document.cookie`), sessions in Express (memory stores), third-party authentication (OAuth 2.0, example authentication through Twitter via `passport`)
  - Required readings: *none*
  - Recommended activities: *none*
  - Recommended readings:
    - Chapter 9 of [Web Development with Node & Express](http://shop.oreilly.com/product/0636920032977.do) by Ethan Brown

- Lecture 8 ([PDF](https://chauff.github.io/documents/webdb-2017-18/web-security.pdf)) on **Web security**: Web application threats, attack due to a lack of data validation, OS command injection, SQL injection, broken session management, cross-site scripting (stored and reflected), insecure direct object references, security misconfiguration,  cross-site request forgery
  - Required readings: *none*
  - Recommended activities:
    - In a "star module" two years ago, two first-year students in TI1506 implemented [CrapStore](https://github.com/nielsdebruin/CrapStore), a node.js based Web app modeled after BadStore (discussed in class). Try it out if you want to test some basic Web security issues.
  - Recommended readings:
    - If you want to know everything there is about security, read Ross Anderson's [Security Engineering book](https://www.cl.cam.ac.uk/~rja14/book.html) (available for free). [Chapter 21](http://www.cl.cam.ac.uk/%7Erja14/Papers/SEv2-c21.pdf) is most pertinent to the Web security lecture (warning: this is an extensive read).
    - [Stanford's CS155](https://crypto.stanford.edu/cs155/): Computer and Network Security course has a number of lectures on Web security (PDFs: [here](https://crypto.stanford.edu/cs155/lectures/08-browser-sec-model.pdf), [here](https://crypto.stanford.edu/cs155/lectures/10-SessionMgmt.pdf), [here](https://crypto.stanford.edu/cs155/lectures/09-web-site-sec.pdf) and [here](https://crypto.stanford.edu/cs155/lectures/11-workers-sandbox-csp.pdf))
    - CERN's [Web security lecture](https://indico.cern.ch/event/242207/) contains a lot of the material covered in class
    - The [Open Web Application Security Project](https://www.owasp.org/index.php/Main_Page) (OWASP) provides an extensive list of practical tips, best practices and further readings on the topic.


## List of external university-level courses with a Web focus

- [Design and Implementation of Software for the Web /GMU](https://cs.gmu.edu/~tlatoza/teaching/swe432f17/home.html)
- [Research on Web Technologies /NTNU](https://www.ntnu.edu/studies/courses/IMT4308/#tab=omEmnet)
- [Web Applications /Stanford](http://web.stanford.edu/class/cs142/)
- [Web Programming Fundamentals /Stanford](http://web.stanford.edu/class/cs193x/)
- [Creating Modern Web Applications /Brown](https://cs.brown.edu/courses/csci1320/index.html)
- [Web Security /NUS](http://www.comp.nus.edu.sg/~prateeks/teaching/sp15/cs5331-sp15.html)
- [Programming Languages for Web Applications /Virginia](http://www.cs.virginia.edu/~up3f/cs4640/schedule.html)
- [Web Development /MIT](http://webdevelopment.mit.edu/2018/lectures)
- [Web Technologies /USC](http://cs-server.usc.edu:45678/lectures.html)
- [Web Development /NYU](https://cs.nyu.edu/courses/spring15/CSCI-UA.0061-002/syllabus/)
- [Cutting-edge Web Technologies /Berkeley](https://inst.eecs.berkeley.edu/~cs294-101/sp15/)
- [Web Technologies /U Texas](http://www.cs.utsa.edu/~cs4413/)
- [Web Programming /U Washington](https://courses.cs.washington.edu/courses/cse154/17au/lectures.shtml)
- [Web and Mobile Systems /U Virginia](http://cs4720.cs.virginia.edu/f14/)
- [Javascript /UPenn](http://www.seas.upenn.edu/~cis197/)

## Final project ideas

- [Long list of sample apps](https://flaviocopes.com/sample-app-ideas/)
- text2speech app that reads out any content pointed to by a URL
- bill tracker - take pics of bills, automatically recognize amount/time and provide visual feedback
