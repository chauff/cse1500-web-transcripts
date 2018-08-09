# Assignment 2

In the first part of this assignment, you will add client-­side JavaScript code to your application
to make it *interactive*. In the second part of this assignment, you will get started with node.js.

Remember that this is a group assignment! Work efficiently as a team!

**[TODO: make it clear how exactly the deliverable should look like: where to upload, what to upload]**

**[TODO: go over npm init and so on; provide a clear folder structure for the entire project]**

## 1. UI Actions Plan

Recall the step-by-step guide of creating a responsive UI control, introduced in the JavaScript lecture:

1. Pick a control (e.g. a button)
2. Pick an event (e.g. a mouseover or a click)
3. Write a JavaScript function: what should happen when the event occurs (e.g. a popup appears)?
4. Attach the function to the event on the control.

### Create such a plan for each UI element of your Habit tracker application that will become interactive. Note: this is a plan for what you will implement later, no actual code needs to be written here! You must include the following interactive elements:

- Add a habit with a desired frequency (e.g. daily, every weekday, every hour)
- Delete a habit
- Update the status of a habit at a particular time
- Change an existing habit’s content (i.e. habit text and status)
- Sort the habits according to how well they are meeting the desired goal
- Add one more action of your choice depending on your initial design (e.g. allow a user to tag a habit as “work”-­related or “sports”-­related)

### Add one more action of your choice depending on your initial design (e.g. allow a user to tag a habit as "work"-­related or "sports"-­related). It should be possible to use the habit tracker application with a keyboard alone or with a combination of keyboard and mouse (i.e. you need to implement actions for both types of events). Ensure that the habit tracker app behaves as we would expect based on our own experience: for instance, we expect that once a habit item has been added to the list of habits, it should no longer be visible in the input element of the application.

## 2. Client-side JavaScript Objects

### Think about the design of your JavaScript code – which aspects of your action plan can you translate into objects? For example, you might want to model each habit as an object. Similarly, you can also think about modeling the list of all habits as an object and so on. Decide on the use of at least one of the introduced JavaScript design patterns.

## 3. Client-side: Writing Code

### Now that you have made your plan and decided on the use of OO principles, start coding! Implement your plan of actions one action at a time with the following requirements:

- Reduce the redundancy in the code as much as possible. 
- Create as few global variables as possible.
- Achieve a separation between content and interaction: the JavaScript-­based interaction functionality should not be embedded in your HTML files.

*Note: do not have to incorporate style elements yet (CSS), we will cover the style in a later lecture. If you choose to incorporate CSS, be aware that the TAs will ignore the CSS during the assessment.*
