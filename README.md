CSE1500: Web and Database Technology <!-- omit in toc -->
==

[![Build Status](https://travis-ci.org/chauff/Web-Teaching.svg?branch=master)](https://travis-ci.org/chauff/Web-Teaching)

The **Web technology materials and resources** of the 2018/19 [Web and Database Technology course](http://studiegids.tudelft.nl/a101_displayCourse.do?course_id=48438) at TU Delft are listed here.

The database materials are not included here!

## Table of Content <!-- omit in toc -->
- [Contact](#contact)
- [Web technology course book](#web-technology-course-book)
- [Tooling](#tooling)
  - [Recommended](#recommended)
  - [Required](#required)
- [Course grading](#course-grading)
- [Course topics](#course-topics)
- [Sample exams](#sample-exams)
- [Assignments](#assignments)
- [Demo application](#demo-application)
- [Interactive web technology exercises](#interactive-web-technology-exercises)
- [Web development resources](#web-development-resources)
- [Lecture material types](#lecture-material-types)
- [Web lectures](#web-lectures)

## Contact

The responsible instructors (A. Bozzon, C. Hauff) can be reached at `cse1500-ewi[at]tudelft.nl`. *Warning: the mailbox will note be active before November 2018.*

## Web technology course book 

The course book for the web technology part is [**Learning Web App Development**](https://www.oreilly.com/library/view/learning-web-app/9781449371388/) by Semmy Purewal. This book covers HTML, CSS, JavaScript and Node.js/Express - exactly the technologies we cover in this course. The book is written for learners without any prior knowledge in these technologies.

![Web course book](img/RME-book.png)

## Tooling

### Recommended

[Visual Studio Code](https://code.visualstudio.com/) is the strongly recommended development environment for this course. It is a free and open-source IDE available for all major operating systems. It was originally designed to support Node.js programmers (a server-­side JavaScript framework we use in this class), but now has extensions for many programming languages. Best of all, **Visual Studio Code itself is written in JavaScript**! It has [integrated source control](https://code.visualstudio.com/docs/editor/versioncontrol) with `git` support out of the box - making it easy to program in pairs. It als has a *Live Share* extension, which allows you to code in pairs without the need for tools like `git`. 

![Visual Studio Code](img/RME-vsc.png)

VS Code offers **many extensions**. You can find a guide on how to browse and install them [here](https://code.visualstudio.com/docs/editor/extension-gallery). A list with all kinds of "delightful" extensions can be found [here](https://github.com/viatsko/awesome-vscode). Since this may be a bit overwhelming, we made a short list of the extensions we recommend to install for this course:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), the most popular linting utility for JavaScript (a linter is a tool that analyzes source code to flag potentially poor code such as unused variables) - use it to improve your code;
- [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer) does what the name suggests;
- [Quokka.js](https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode) - a great tool to try out JavaScript snippets without hassle;
- [VS Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare) - a collaborative real-time coding extension (especially useful if a student team works mostly remotely);
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) to make finding the file you are after in your app directory a bit easier;
- finally, a good [theme](https://code.visualstudio.com/docs/getstarted/themes) for your IDE to make coding more enjoyable is also not a bad idea; [Dracula](https://marketplace.visualstudio.com/items?itemName=dracula-theme.theme-dracula) is a popular one. If you want to pick based on visuals, head over to [https://vscodethemes.com/](https://vscodethemes.com/).

If you need to be convinced abut why Visual Studio Code is a great IDE to use, check out [this podcast](https://syntax.fm/show/012/why-is-everyone-switching-to-vs-code) by Wes Bos and Scott Tolinski on this very topic.

**Browser developer tools**: they are built into all modern browsers; familiarize yourself with the developer tools of your favorite browser. For Firefox (my personal choice), you can find an elaborate description of the developer tools [at MDN](https://developer.mozilla.org/en-US/docs/Tools).

If you are new to team programming, and want to use VSC's features efficiently, [read our guide](How-to-use-VSC.md).

### Required 

[Node.js](https://nodejs.org/en/), version 8.12 or higher (i.e. the latest stable one). If you are a Windows user, you may want to use the virtual machine from the Q1 2018/19 Computer Organisation course and install Node.js yourself; the `root` password is `cse&(]]` (yes! those are not typos, this is the password).

Two modern web browsers such as Chrome, Firefox, Edge, etc. to test your project code across browser implementations.

Telnet (for Assignment 1): if you use a Linux derivative (e.g. Ubuntu, older versions of Mac OS), open a terminal and you are good to go; for new Mac OS versions you may need to [install telnet](https://medium.com/ayuth/bring-telnet-back-on-macos-high-sierra-11de98de1544) yourself. If you are a Windows user please use the Windows Subsystem for Linux or use the Virtual Machine provided to you in Q1 (the `root` password is `cse&(]]`).

## Course grading

![grading](img/RME-grading.png)

**Passing requirements**: the overall grade must be **5.8** or higher AND the midterm grade must be at least a **5** AND the final exam grade must be at least a **5** in accordance with TU Delft's exam regulations.

Assignments are done in **pairs of two students** and are graded by student assistants in a binary manner (pass or fail). There are six assignments in total, three cover web programming topics and three cover database topics. While the assignments together make up only 20% of the final grade and are not required, we strongly recommend to tackle the assignments - they cover a lot of exam materials in a practical manner!

We have two assessment moments: one for the Web technology assignments and one for the Database technology assignments. The three Web assignments are assessed in a single session of your team's own choosing: you can book a timeslot for the Web assessment in weeks 2.3, 2.4, 2.5 or 2.6. The assessment is interview-based. The assessment session can yield anything between 3x pass and 3x no-pass. The grading is conducted per student, i.e. you and your partner may receive different pass/no-pass results.

## Course topics

- Week 2.1: (Lecture L1) HTTP and (L2) HTML5
- Week 2.2: (L3) JavaScript and (L4) Node.js
- Week 2.3: (L5) CSS and (L6) Node.js (advanced topics)
- Week 2.4: (L7) Cookies & sessions and (L8) web security
- Week 2.5: DB topics; **midterm on December 13** (*the midterm only covers web technology topics*)
- Week 2.6: DB topics
- Week 2.7: DB topics
- Week 2.8: DB topics
- Week 2.9: DB topics
- Week 2.10: _no lectures_ this week; **final exam on February 1** (*the final exam only covers DB topics*)

## Sample exams

In the past years, the web and database (DB) topics were interwoven (usually 1 lecture of web and 1 lecture of DB topics per week) and thus the existing midterm and final exams also contain questions on both topics. To study for the midterm and/or final **this year**, make sure to look at the midterm and final exams from the past together to find examples of all Web/DB question types.

Exam topics are all topics covered in the lectures and the required readings. Content of the recommended activitivies/readings that goes beyond what is covered in the lectures/course book is not tested in the exam.

- [Midterm 2015/16](https://chauff.github.io/documents/webdb-2017-18/midterm2.pdf)
- [Final 2015/16](https://chauff.github.io/documents/webdb-2017-18/final2.pdf)
- [Midterm 2016/17](https://chauff.github.io/documents/webdb-2017-18/midterm1.pdf)
- [Final 2016/117](https://chauff.github.io/documents/webdb-2017-18/final1.pdf)

## Assignments

There are six assignments in total.

The first three assignments cover web technology topics.

- [Assignment 1 (web)](Assignment-1.md)
- [Assignment 2 (web)](Assignment-2.md)
- [Assignment 3 (web)](Assignment-3.md)

## Demo application

A demo board game application (a word guesser) [is available](https://github.com/chauff/Web-Teaching/tree/master/demo-code) as well. If you are stuck on how to go about implementing something, the source code of this app can help you to get unstuck. Is has been implemented along the lines of the assignments.

The demo app, just as listed in this year's board game project, consists of two screens, a splash screen:

<img src="https://raw.githubusercontent.com/chauff/Web-Teaching/master/img/A3-splash-CSS-completed.png" alt="splash screen" width="600px">

and a game screen:

<img src="https://raw.githubusercontent.com/chauff/Web-Teaching/master/img/A3-game-CSS-completed.png" alt="splash screen" width="600px">

## Interactive web technology exercises

Students who do not have a lot of prior knowledge often struggle to get started.
Here is a [list of useful interactive exercises](nodeschool-exercises.md) and how they match up with each lecture. Each of these exercises is small, taking just a few minutes (sometimes less than a minute) to solve.

## Twitter accounts to follow.

Twitter is a great resource to hear the latest and greatest about the web stack. This is a list of accounts I recommend to follow:
- [Franziska Hinkelmann](https://twitter.com/fhinkel), engineer working on Node.js at Google
- [Lin Clark](https://twitter.com/linclark) makes very good code cartoons and works at Mozilla
- [V8](https://twitter.com/v8js), Google's JavaScript engine
- [JavaScript Daily](https://twitter.com/JavaScriptDaily), does exactly as the name suggests
- [AmsterdamJS](https://twitter.com/amsterdamjs), local JavaScript community
- [Node.js](https://twitter.com/nodejs) (of course)
- [Axel Rauschmeyer](https://twitter.com/rauschma), a JavaScript book author
- [Addy Osmani](https://twitter.com/addyosmani), a Googler working on Google Chrome (well known for his JavaScript design patterns book)
- [Wes Bos](https://twitter.com/wesbos), a well-known instructor of the web stack
- [Mozilla Hacks](https://twitter.com/mozhacks), official Mozilla accounts for web developers
- [Visual Studio Code](https://twitter.com/code)
- [JavaScript Conference Series](https://twitter.com/jsconf) - look out for their conference talks, usually posted on YouTube
- [Chrome DevTools](https://twitter.com/ChromeDevTools), tips and tricks of the dev tool trade
- [Syntax](https://twitter.com/syntaxfm), podcasts for web developers

## Web development resources

The practical assignments of this work often require looking up Web development specifics. Two good resources, in general, for Web engineering are [Mozilla's MDN portal](https://developer.mozilla.org/en-US/) and [Google's Web Fundamentals](https://developers.google.com/web/fundamentals/).

![MDN](img/RME-mdn.png) ![Google Fundamentals](img/RME-fundamentals.png)

## Lecture material types

![materials](img/RME-materials.png)

For each lecture we provide a range of materials:

- **Required readings**: most of the required readings are book chapters of the web course book. The book introduces each technology from scratch. The lectures go beyond what is covered in the book and assume that you have read the corresponding book chapter(s) **before** the lecture.
- **Recommended activities**: activities that we think will help you get a better grasp of the different web technologies. Activities are either programming exercises or podcasts (there are some great ones out there!). Don't see those as a complete list to work through, that is impossible given the time!
- **Recommended readings**: these may be tweets, blog posts or book chapters that help you understand some of the introduced concepts better; again, do not attempt to read all of the materials.
- **Relevant scientific publications**: we are often asked why this kind of course is part of the computer science curriculum. Isn't this "just" programming? To showcase how web technologies are researched, we here list a number of scientific publications that contribute to our understanding of (the use of) web technologies.

## Web lectures

**Status update**: transcripts of Lectures 1 to 8 are online. The lecture slides are from the 2017/18 edition and will be updated in the coming month.

- **Lecture 1** covers HTTP ([2018/19 transcript](Lecture-1.md), [2017/18 slides](https://chauff.github.io/documents/webdb-2017-18/web-http.pdf))
  - Required readings: *none*
  - Recommended activity:
    - :headphones: Listen to [this podcast](https://syntax.fm/show/044/how-to-learn-new-things-quickly) on how to learn new things quickly in the Web technology world.
  - Recommended readings:
    - :closed_book: Chapters 1, 2 and 3 of [HTTP: The Definite Guide (O'REILLY 2002)](http://shop.oreilly.com/product/9781565925090.do).
    - [MDN overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP).
    - Developer tools overview of your favorite web browser (e.g. [Firefox](https://developer.mozilla.org/son/docs/Tools) or [Chrome](https://developer.chrome.com/devtools)).
    - [A brief history of HTTP](https://hpbn.co/brief-history-of-http/).
    - [Browser fingerprinting](https://arstechnica.com/security/2017/02/now-sites-can-fingerprint-you-online-even-when-you-use-multiple-browsers/) showcases how seemingly innocuous data can identify users.
    - [A crash course on HTTP and DNS by Mozilla (among other things)](https://hacks.mozilla.org/2018/05/a-cartoon-intro-to-dns-over-https/).
  - Relevant scientific publications:
    - Ihm, S. and Pai, V.S., 2011. [Towards understanding modern web traffic](https://dl.acm.org/citation.cfm?id=2068845). In Proceedings of the 2011 ACM SIGCOMM conference on Internet measurement conference (pp. 295-312). ACM.
    - Naylor, D., Finamore, A., Leontiadis, I., Grunenberger, Y., Mellia, M., Munafò, M., Papagiannaki, K. and Steenkiste, P., 2014. [The cost of the S in HTTPS](https://dl.acm.org/citation.cfm?id=2674991). In Proceedings of the 10th ACM International on Conference on emerging Networking Experiments and Technologies (pp. 133-140). ACM.
    - Falaki, H., Lymberopoulos, D., Mahajan, R., Kandula, S. and Estrin, D., 2010. [A first look at traffic on smartphones](https://dl.acm.org/citation.cfm?id=1879176). In Proceedings of the 10th ACM SIGCOMM conference on Internet measurement (pp. 281-287). ACM.
    
- **Lecture 2** covers web design and HTML5 ([2018/19 transcript](Lecture-2.md), [2017/18 slides](https://chauff.github.io/documents/webdb-2017-18/web-html5.pdf))
  - Required readings:
    - :warning: Chapter 2 of the [web course book](http://shop.oreilly.com/product/0636920030621.do).
    - :warning: [Introduction to HTML forms](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Your_first_HTML_form) (ignore the section on *Basic form styling*, we will cover CSS in a later lecture) and [Sending form data](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Sending_and_retrieving_form_data) (up to and including the section on *Viewing HTTP requests*).
  - Recommended activity:
    - :headphones: Listen to [this podcast](http://talkingcode.com/podcast/episode-11-tom-dale/) on modern web applications and the move from web sites to web apps and an almost *native* experience.
  - Recommended readings:
    - :closed_book: Chapter 3 of the [Definite Guide to HTML5](https://www.apress.com/gp/book/9781430239604).
    - [Web Fundamentals by Google](https://developers.google.com/web/fundamentals/).
    - [Examples of what modern web technologies can achieve in Chrome](https://experiments.withgoogle.com/) (if you use another browser, not all examples may work as expected).
  - Relevant scientific publications:
    - Fernandez, A., Insfran, E. and Abrahão, S., 2011. [Usability evaluation methods for the web: A systematic mapping study](https://www.sciencedirect.com/science/article/pii/S0950584911000607). Information and Software Technology, 53(8), pp.789-817.
    - Sonderegger, A. and Sauer, J., 2010. [The influence of design aesthetics in usability testing: Effects on user performance and perceived usability](https://www.sciencedirect.com/science/article/pii/S0003687009001148). Applied Ergonomics, 41(3), pp. 403-410.
  
- **Lecture 3** on client-side JavaScript ([2018/19 transcript](Lecture-3.md), [2017/18 slides](https://chauff.github.io/documents/webdb-2017-18/web-javascript.pdf))
  - Required readings:
    - :warning: Chapter 4 of the [web course book](http://shop.oreilly.com/product/0636920030621.do).
  - Recommended activities:
    - [Interactive exercises for Lecture 3](nodeschool-exercises.md).
    - :headphones: Listen to this podcast on [debugging](https://syntax.fm/show/047/how-to-get-better-at-debugging).
    - [JavaScript30](https://javascript30.com/): 30 day vanilla JS coding challenges
  - Recommended readings:
    - :closed_book: [Learning JavaScript design patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/), in particular the sections on the [constructor pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#constructorpatternjavascript) and the [module pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript).
    - MDN's introduction to [JavaScript objects](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects).
    - [The dynamic nature of JavaScript makes optimization tricky (blog post)](https://v8project.blogspot.com/2017/09/elements-kinds-in-v8.html).
    - [Why do we need all those fancy tools for JavaScript development nowadays? (blog post)](https://medium.com/the-node-js-collection/modern-javascript-explained-for-dinosaurs-f695e9747b70).
    - [Learn how to debug with Firefox devtools](https://mozilladevelopers.github.io/playground/debugger).
    - [Array.prototype.sort is now stable in V8](https://twitter.com/mathias/status/1036626116654637057) (tweet): shows that even basic mechanisms like sorting are still being changed in mature implementations.
    - [Tooling and conventions](https://twitter.com/manucorporat/status/1037370271286657024) are vital in the fast-paced world of JavaScript.
    - [The State of JavaScript 2017](https://2017.stateofjs.com/).
  - Relevant scientific publications:
    - Charland, A. and Leroux, B., 2011. [Mobile application development: web vs. native](https://queue.acm.org/detail.cfm?id=1968203). Queue, 9(4), p. 20.
    - Mowery, K., Bogenreif, D., Yilek, S. and Shacham, H., 2011. [Fingerprinting information in JavaScript implementations](https://hovav.net/ucsd/dist/jspriv.pdf). In Proceedings of W2SP (Vol. 2, No. 11).
    - Ratanaworabhan, P., Livshits, B. and Zorn, B.G., 2010. [JSMeter: Comparing the Behavior of JavaScript Benchmarks with Real Web Applications](https://www.usenix.org/legacy/events/webapps10/tech/full_papers/Ratanaworabhan.pdf). WebApps, 10, pp.3-3.
    - Lin, J., 2018. [Computing without Servers, V8, Rocket Ships, and Other Batshi*t Crazy Ideas in Data Systems](http://ceur-ws.org/Vol-2167/keynote1.pdf). In Proceedings of DESIRES. A quote ... "_So, the future is. . .  JavaScript? Once  we get beyond the fact that JavaScript is an undeniably shitty language on which to build an interlingual execution platform, there is at least some so-crazy-it-might-actually-work appeal to this idea._"
    - Patra, J., Dixit, P.N. and Pradel, M., 2018, May. [ConflictJS: finding and understanding conflicts between JavaScript libraries](http://mp.binaervarianz.de/icse2018.pdf). In Proceedings of the 40th International Conference on Software Engineering (pp. 741-751). ACM.

- **Lecture 4** on Node.js ([2018/19 transcript](Lecture-4.md), [2017/18 slides](https://chauff.github.io/documents/webdb-2017-18/web-nodejs.pdf))
  - Required readings:
    - :warning: Chapters 5 & 6 of the [web course book](http://shop.oreilly.com/product/0636920030621.do).
  - Recommended activities:
    - [Interactive exercises for Lecture 4](nodeschool-exercises.md).
  - Recommended readings:
    - [Node.js State of the Union 2017](https://medium.com/the-node-js-collection/node-js-state-of-the-union-blog-2017-ed86640ec451).
    - [The world runs on Node.js (Twitter thread)](https://twitter.com/bitandbang/status/1037306199522328577).
  - Relevant scientific publications:
    - Chaniotis, I.K., Kyriakou, K.I.D. and Tselikas, N.D., 2015. [Is Node.js a viable option for building modern web applications? A performance evaluation study.](https://link.springer.com/article/10.1007/s00607-014-0394-9) Computing, 97(10), pp.1023-1044.
  
- **Lecture 5** covers CSS ([2018/19 transcript](Lecture-5.md), [2017/18 slides](https://chauff.github.io/documents/webdb-2017-18/web-css3.pdf))
  - Required readings:
    - :warning: Chapter 3 of the [web course book](http://shop.oreilly.com/product/0636920030621.do).
  - Recommended activities:
    - :tv: Watch [this YouTube video from CSSConf](https://www.youtube.com/watch?v=cYGOv2ToZjY) covering the long (and painful) history of CSS.
    - :headphones: Listen to [this podcast](https://syntax.fm/show/021/what-s-new-in-css-variables-scoping-new-selectors-and-color-functions) on the present and future of CSS.
  - Recommended readings:
    - :closed_book: Chapters 1-4 and chapter 13 of [The Book of CSS3: A developer's guide to the future of web design](https://nostarch.com/css3_2e) by Peter Gasston (2nd edition, 2014).
    - To make sense of CSS positioning, take a look [here](https://alistapart.com/article/css-positioning-101).
    - If you want to look behind the scenes, read Mozilla's blog post on their [CSS engine Quantum CSS](https://hacks.mozilla.org/2017/08/inside-a-super-fast-css-engine-quantum-css-aka-stylo/).
  - Relevant scientific publications:
    - Meyerovich, L.A. and Bodik, R., 2010, April. [Fast and parallel webpage layout](https://dl.acm.org/citation.cfm?id=1772763) In Proceedings of the 19th international conference on World wide web (pp. 711-720). ACM.

- **Lecture 6** on advanced Node.js concepts ([2018/19 transcript](Lecture-6.md), [2017/18 slides](https://chauff.github.io/documents/webdb-2017-18/web-nodejs-continued.pdf))
  - Required readings: *none*
  - Recommended activities:
    - An interactive ejs playground can be found [here](https://ionicabizau.github.io/ejs-playground/).
  - Recommended readings:
    - To learn more about ejs, take a look at its [GitHub repository](https://github.com/mde/ejs).
    - To learn more about middleware and Express, take a look at the [Express documentation](http://expressjs.com/en/guide/using-middleware.html).
    - An overview of [best practices in Node.js](https://github.com/i0natan/nodebestpractices).
    - [Slide deck on High Performance JS in V8](https://docs.google.com/presentation/d/1KCcA-WAyhGs0SEOrfU21fjaTWTxvNxYLwmNlGIbuZFw/edit?usp=sharing).
  - Relevant scientific publications:
    - Fard, A.M. and Mesbah, A., 2013, September. [JSNose: Detecting javascript code smells](https://www.computer.org/csdl/proceedings/scam/2013/9999/00/06648192.pdf). In Source Code Analysis and Manipulation (SCAM), 2013 IEEE 13th International Working Conference on (pp. 116-125). IEEE.
    - Nasehi, S.M., Sillito, J., Maurer, F. and Burns, C., 2012, September. [What makes a good code example?: A study of programming Q&A in StackOverflow](https://pdfs.semanticscholar.org/8b8d/4c0284f26d5e4ce08c85f98fd453762ab26d.pdf). In 2012 28th IEEE International Conference on Software Maintenance (ICSM) (pp. 25-34). IEEE.

- **Lecture 7** on cookies and sessions ([2018/19 transcript](Lecture-7.md), [2017/18 slides](https://chauff.github.io/documents/webdb-2017-18/web-cookies-sessions.pdf))
  - Required readings: *none*
  - Recommended activities: *none*
  - Recommended readings:
    - :closed_book: Chapter 9 of [Web Development with Node & Express](http://shop.oreilly.com/product/0636920032977.do) by Ethan Brown.
    - Instead of cookies to recognize a user, we can also resort to the more stealthy version of [browser fingerprinting](https://arstechnica.com/security/2017/02/now-sites-can-fingerprint-you-online-even-when-you-use-multiple-browsers/).
  - Relevant scientific publications:
    - Roesner, F., Kohno, T. and Wetherall, D., 2012. [Detecting and defending against third-party tracking on the web](https://www.usenix.org/system/files/conference/nsdi12/nsdi12-final17.pdf). In Proceedings of the 9th USENIX conference on Networked Systems Design and Implementation (pp. 12-12). USENIX Association.
    - Park, J.S. and Sandhu, R., 2000. [Secure cookies on the Web](http://www.profsandhu.com/journals/ic/ieeeic00.pdf). IEEE internet computing, 4(4), pp.36-44.
    - Franken, G., Van Goethem, T. and Joosen, W., 2018. [Who left open the cookie jar? a comprehensive evaluation of third-party cookie policies](https://www.usenix.org/system/files/conference/usenixsecurity18/sec18-franken.pdf). In Proceedings of the 27th USENIX Security Symposium, pp. 151-168.

- **Lecture 8** on web security ([2018/19 transcript](Lecture-8.md), [2017/18 slides](https://chauff.github.io/documents/webdb-2017-18/web-security.pdf))
  - Required readings: *none*
  - Recommended activities:
    - :headphones: Listen to [this podcast](https://syntax.fm/show/035/keeping-up-with-the-codeashians-dealing-with-our-fast-paced-industry) on how to navigate the fast-paced Web technology industry.
    - The [OWASP Juice Shop](https://www.owasp.org/index.php/OWASP_Juice_Shop_Project) is a more advanced Node.js/Express application that is intentionally insecure to train your web security skills.
  - Recommended readings:
    - :closed_book: If you want to know everything there is about security, read Ross Anderson's [Security Engineering book](https://www.cl.cam.ac.uk/~rja14/book.html). [Chapter 21](http://www.cl.cam.ac.uk/%7Erja14/Papers/SEv2-c21.pdf) is most pertinent to the web security lecture (warning: this is an extensive read).
    - [Stanford's CS155](https://crypto.stanford.edu/cs155/): Computer and Network Security course has a number of lectures on web security (PDFs: [here](https://crypto.stanford.edu/cs155/lectures/08-browser-sec-model.pdf), [here](https://crypto.stanford.edu/cs155/lectures/10-SessionMgmt.pdf), [here](https://crypto.stanford.edu/cs155/lectures/09-web-site-sec.pdf) and [here](https://crypto.stanford.edu/cs155/lectures/11-workers-sandbox-csp.pdf)).
    - CERN's [web security lecture](https://indico.cern.ch/event/242207/).
    - The [Open Web Application Security Project](https://www.owasp.org/index.php/Main_Page) provides an extensive list of practical tips, best practices and further readings on the topic.
    - [Node.js security best practices](https://medium.com/@nodepractices/were-under-attack-23-node-js-security-best-practices-e33c146cb87d).
  - Relevant scientific publications:
    - Aggarwal, G., Bursztein, E., Jackson, C. and Boneh, D., 2010. [An Analysis of Private Browsing Modes in Modern Browsers](http://crypto.stanford.edu/~dabo/papers/privatebrowsing.pdf). In Proceedings of the 19th USENIX conference on Security. USENIX Association.
    - Kieyzun, A., Guo, P.J., Jayaraman, K. and Ernst, M.D., 2009. [Automatic creation of SQL injection and cross-site scripting attacks](https://dl.acm.org/citation.cfm?id=1555036). In Proceedings of the 31st International Conference on Software Engineering (pp. 199-209). IEEE Computer Society.
    - Von Ahn, L., Maurer, B., McMillen, C., Abraham, D. and Blum, M., 2008. [recaptcha: Human-based character recognition via web security measures](http://science.sciencemag.org/content/321/5895/1465). Science, 321(5895), pp.1465-1468.
    - Acar, G., Eubank, C., Englehardt, S., Juarez, M., Narayanan, A. and Diaz, C., 2014. [The web never forgets: Persistent tracking mechanisms in the wild](https://www.ftc.gov/system/files/documents/public_comments/2015/10/00064-98109.pdf). In Proceedings of the 2014 ACM SIGSAC Conference on Computer and Communications Security (pp. 674-689). ACM.
