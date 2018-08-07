# Assignment 1

The first part of this assignment gives you hands-­on experience in **http**. In the second part you will make a head-­start with the design of your **Habit Tracker Web application**.

Remember that this is a group assignment! Work efficiently as a team!

**[TODO: make it clear what the deliverable is]**


## 1. HTTP request messages: GET/HEAD

---
Hints:
- To store `telnet`'s output to file (in addition to printing it on the console), you can use the command `tee`. As an example:
`telnet www.microsoft.com 80|tee outfile` will save all output to the file outfile.
- [carriage return](https://developer.mozilla.org/en-US/docs/Glossary/CRLF) in the code snippets below indicates when to press 'Enter'.
---

This exercise requires you to use `telnet`. If you use a Linux derivative (e.g. Ubuntu, Mac OS), open a terminal and you are good to go. If you are a Windows user you can either install the Windows Subsystem for Linux (on Windows 10) or install a Windows compatible telnet client such as [PuTTY](https://www.putty.org/). 

Use `telnet` to request the contents of the bread section of the recipe website `myrecipes.com/bread-recipes`.

**[TODO: separate instructions for the use of PuTTY]**

**[TODO: check if the URL is still accessible]**

Start your "conversation" with the Web server by typing the following into the terminal:

```
telnet myrecipes.com 80
```

### 1.1) Write down the HTTP requests you made, the returned responses (e.g. a page has moved or is faulty) until you receive the contents of the recipes Web page. Always use `HEAD` first to retrieve meta-­data about the resource.

### 1.2) Does the content correspond to what you see when accessing the page with your browser? To check, save the response to a file, use "html" as file ending and open it with your browser.

### 1.3) What is the purpose of the ETag in the header information?

### 1.4) What do the different `Cache-Control` directives mean?

---


## 2. HTTP request messages: PUT

While `GET` and `HEAD` are request methods accepted by virtually all Web servers, `PUT`/`POST`/`DELETE` are less often available, due to the implications these methods have on the server.

To test your skills in uploading, deleting and posting data, we will make use of [http://httpbin.org/](http://httpbin.org/), a service designed to test HTTP messages.

Below is an example of how to upload data to the server with `PUT`:

```
telnet httpbin.org 80

PUT /myfile HTTP/1.1
host:httpbin.org
Content-type:text/plain
Content-length:12
[carriage return]
[carriage return]
Hello World!
[carriage return]
```

With this code, we have just created a file on the server called `myfile` which contains the string `Hello World!`. The service sends back in the response the data just uploaded -­ the response
is of content-­type JSON; we are interested in the `data` field, which should contain `Hello World!` if everything worked correctly. Try it for yourself!

### 2.1) The `Content-­length` is exactly the number of characters (12) of `Hello World!`. What happens if the `Content-length` field is smaller or larger than the exact number of characters in the content?

---

## 3. Basic authentication

Lets now try to request a page, which is set up with HTTP basic authentication.

### 3.1) First, open [http://httpbin.org/basic-­auth/user/passwd](http://httpbin.org/basic-­auth/user/passwd) in your browser. You should see a dialogue, requesting username and password. Use `user` as username and `passwd` as password. Reload the Web page -­ what happens now?

### 3.2) Now let's see how this works with actual HTTP messages. Start off with a `HEAD` method to inspect the Web page and document all following steps (requests and responses):
```
telnet httpbin.org 80

HEAD /basic-auth/user/passwd HTTP/1.1
host:httpbin.org
[carriage return]
[carriage return]
```
### Then, use the `Authorization` field to provide username and password to the server. To encode the username and password, you can use any of the freely available base-­64 en/decoders, e.g.[http://decodebase64.com](http://decodebase64.com). Remember that username and password should be combined as `username:password`.

### 3.3) Now close the TCP connection and start a new one, using again: 
````
telnet httpbin.org 80
```` 
### Request the same page -­ what happens? Is the behavior the same as reloading the page in the browser?

---

## 4. Habbit tracker application

**Note**: The Web course book develops a TODO list Web application throughout the different chapters. The assignments in this course focus on the development a different but essentially similar application. Since a similar project is developed in the book and in class, if you find some aspects of the assignments very difficult, the book should help you along.

**Habit trackers** are applications that allow you to set and track your habits- - ­the good as well as the bad ones. Habit trackers either rely on self-­reports or use data from sensors (FitBit, etc.). Many habit trackers are only available as native apps (Android, iOS). *In this class project we focus on building a Web-­based habit tracker application instead that relies on self-­
reports.*

In this assignment you will start developing your own habit tracker application by first considering existing applications and then designing your own.

### 4.1) Select two habit tracker applications, either from the following list or of your own choice (they should be accessible from the Web, without installing a native app):
- A
- B
- C

### 4.2) Use the application's standard interface. Consider their design based on the Web design principles covered in class. Which 2 design aspects stand out in each of the two applications (in the positive or negative sense)?

---

## 5. Usability test

### 5.1) For each of the two chosen applications, perform a usability test yourself by performing the following actions: 

1. create a habit (e.g. “early morning yoga”) that should happen every weekday (not at the weekend), and
2.  a habit that should happen once a week (e.g. “go swimming”);
3. self-­report on both habits;
4. check the progress on how well you are doing;
5. delete one habit. 

### Report on which habit tracker you performed the tests on. Report how much time and how many clicks it took you to perform the actions.

---

## 6. Habbit tracker features

### 6.1) Create a list of 10 habit tracker features that you think a habit tracker Web application should have1. To get you started, here are two essential features: (1) create a habit to track, and, (2) delete a habit.

---

## 7. Design your own habit tracker

Similar to the wireframe example in the course book (check Chapter 2 if you have not done so yet), start designing your own habit tracker application. You will develop this application
throughout the course. Take inspirations from the habit trackers you looked at. Your Web application should be designed for the standard Desktop interface (i.e. not mobile). Before you
start, decide on your **target audience**.

### 7.1) Create a design for the entry page (splash screen): think of a name for your application, a short description & a logo. Feel free to use images with Creative Commons license.

### 7.2) Create a design for the habit tracker page; allow at least the following: (1) add/delete a habit, (2) label a habit as either a positive (a habit you want to build up) or a negative (a habit you want to get rid off) one and (3) visually track the habits progress over time. Add another two features to your design that you think are useful (take inspiration from 3.).

### Note: the wireframes can be done with pen and paper or a software tool (e.g. Gliffy, Balsamiq, Moqups or even Photoshop) of your choice.


### 7.3) Once you have completed the design of your app, head over to TI1506’s Brightspace, go to “Discussions” and then the forum HABIT TRACKER APP DESIGNS. Create a thread with your team’s name as subject/title (e.g. “Minor 01” or “TI-­CF 12”) and post your team’s proposed design. Include in the post the following:
- the two designs (entry page and habit tracker page);
- who you envision your target audience to be;
- a paragraph on the reasoning behind your design and the design goals.

**[TODO: is APONE a better choice here?]**

---

## 8. Your own habbit tracker: HTML

**[TODO: provide a folder structure that resembles what is needed later]**

### 8.1) Similar to the course book, take your design as a starting point and create the respective **two HTML documents** (note that these documents should only contain HTML, no CSS or JavaScript). 

---

**[TODO: summarize deliverables here again?]**
