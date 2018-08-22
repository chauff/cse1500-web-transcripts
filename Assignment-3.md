# Assignment 3

- take a concrete website and let students determine number of cookies sent; number of third-party cookies

In the first part of the assignment, you will complete the first prototype of your Web application, by adding CSS. In the second part, you will refactor and refine your application to make it more maintainable and robust.

**[TODO: make it clear how exactly the deliverable should look like: where to upload, what to upload]**

## 1. CSS

Now that we (finally) covered CSS, you will continue to work on your two HTML documents (the
splash screen and habit tracker page) and style them with CSS. To ensure that your CSS is of high
quality, you can make use of CSS Lint: [http://csslint.net/](http://csslint.net/).
Choose three browsers (e.g. the latest versions of Safari, Google Chrome and Microsoft Edge) on which to test your Web application - the application should look and run in the same manner across those three browsers.
You are **not allowed** to use external libraries or preprocessing tools. Your application should have a modern look and feel (that is, use sufficient CSS styling).

### 1.1) Splash screen

First, work on your splash screen and style the page with CSS according to your design. To ensure that every student learns the basics of CSS, we provide a list of must-have CSS properties. Your code must include at least one instance of each of the following:

- Pseudo-classes :hover :active
- Pseudo-elements: ::after ::before
- Box model: margin, padding, border
- At least two different position attributes, e.g. position:relative and position:absolute.
- At least one CSS animation

You are of course welcome to use more CSS properties to style your splash screen. Once you have completed your CSS implementation, make a screenshot and add your implemented design to your Brightspace discussion forum thread (where you already posted your initial design). Does your implementation deviate significantly from your initial design? Write a paragraph comparing the two.

### 1.2) Habit tracker page

Work on your habit tracker page and implement your design in CSS. The look of the habits page should be coherent with the splash screen. You will be able to reuse some of the CSS written for the splash screen - make sure that you are efficient and do not duplicate existing CSS code if possible.

Your design must visually distinguish between:
- habits that are on track and habits whose desired and actual frequency differ substantially (e.g. a positive habit with a daily goal of execution that is executed once a week could be flagged here). You can decide what "substantially" means to you.
- positive and negative habits (if you have those in your design), and
- habits that have been executed vs those still due in the desired time interval (e.g. a weekly habit that has not been completed this week should visually differ from one that has). 

Once you have completed your CSS implementation, make a screenshot and add your implemented design to your Brightspace discussion forum thread (where you already posted your initial design). Does your implementation deviate significantly from your initial design? Write a paragraph comparing the two. Note that designs can change and if your implemented design differs considerably from the envisioned one this is not a problem. It will not cause an issue during the assessment of your work - be prepared to discus the reasons for your change in design.

## 2. Code refactoring: modularization

We finally covered the topic of node.js modules. Based on your understanding of node.js modules,
modularize your code and organize the different functionalities into separate modules (e.g. one module to keep track of all configuration settings, one module for routes, etc.).

## 3. Code refactoring: routes

Allow your users to make small mistakes in the URL paths; for example, if you have a route ‘listhabits’ a user typing `https://localhost:3000/listhabitts` should be served `https://localhost:3000/listhabits`. Every route you have in your application should allow such small deviations to some degree. It is up to you to find sensible regular expressions. Introduce routing parameters into at least one of your routes (it is up to you to find out where it makes most sense).

## 4. Code refactoring: templating

So far, when you access your application's URL for the first time, an empty habit list is returned (unless you already added code to mitigate this effect). In a subsequent Ajax request, the existing habits are sent from the server to the client.
Templates allow us to change this setup and immediately send the existing habits. In this exercise you are asked to use EJS for templating. To get started, follow the EJS procedure outlined in the lecture.

*Note: this exercise requires you (once again) to rewrite parts of the code you have already written. This is not a mistake; it is intended and one of the goals of the lab: we want you to realise the different manners in which the same result can be achieved.*

## 5. Third-party authentication

We finally make use of the application's splash screen. Implement a third-party authentication of your own choice (e.g. Twitter [as covered in class] or Facebook). Use the passport middleware for this task: [http://passportjs.org/]](http://passportjs.org/).

The habits of each user using your application should only be visible to him/her. Note that you will have to install passport via npm (don't forget to update your `package.json`, i.e. use the `–save` option).
