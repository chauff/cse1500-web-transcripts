---
layout: default
permalink: /sessions/
linkname: Sessions et al.
ordering: 7
warning: false
---

# Cookies, sessions and third-party authentication <!-- omit in toc -->

{% include_relative explanation.md %}

## Table of Contents <!-- omit in toc -->

- [Required & recommended readings and activities](#required--recommended-readings-and-activities)
- [:scroll: Learning goals](#scroll-learning-goals)
- [Recall the HTTP lecture](#recall-the-http-lecture)
- [Introduction to cookies](#introduction-to-cookies)
- [Viewing cookies in the browser](#viewing-cookies-in-the-browser)
- [Cookie security](#cookie-security)
- [How do cookies relate to sessions?](#how-do-cookies-relate-to-sessions)
- [Cookie flow](#cookie-flow)
- [Cookies in more detail](#cookies-in-more-detail)
  - [Transient vs. persistent cookies](#transient-vs-persistent-cookies)
  - [Cookie fields](#cookie-fields)
  - [Cookie field Domain](#cookie-field-domain)
  - [Return to sender ...](#return-to-sender-)
- [An excursion: writing a Firefox extension](#an-excursion-writing-a-firefox-extension)
- [:bangbang: A Node.js application](#bangbang-a-nodejs-application)
- [Accessing and deleting cookies in Express](#accessing-and-deleting-cookies-in-express)
- [A more pessimistic view on cookies](#a-more-pessimistic-view-on-cookies)
  - [Third-party cookies](#third-party-cookies)
  - [Evercookie](#evercookie)
  - [Browser fingerprinting](#browser-fingerprinting)
- [Client-side cookies and local/session storage](#client-side-cookies-and-localsession-storage)
- [:bangbang: Sessions](#bangbang-sessions)
- [Third-party authentication](#third-party-authentication)
  - [OAuth 2.0 roles](#oauth-20-roles)
  - [Roles exemplified](#roles-exemplified)
  - [:bangbang: Express](#bangbang-express)
- [Self-check](#self-check)

## Required & recommended readings and activities

- Required readings: _none_
- Recommended activities: _none_
- Recommended readings:
  - Chapters 9 and 18 (here, only the section on _Authentication_, starting on page 234) of the [Web Development with Node & Express book](https://www.oreilly.com/library/view/web-development-with/9781492053507/).
  - Instead of cookies to recognize a user, we can also resort to the more stealthy version of [browser fingerprinting](https://arstechnica.com/security/2017/02/now-sites-can-fingerprint-you-online-even-when-you-use-multiple-browsers/).
  - :tv: [Storage on the web](https://www.youtube.com/watch?v=NNuTV-gjlZQ): how to store **large amounts** of data on the modern browser.
  - An elaborate [thread of tweets](https://threadreaderapp.com/thread/1199817699116736512.html) discusses privacy implications of 1st/3rd party cookies and tracking of users through them.
- Relevant scientific publications:
  - Solomos, Konstantinos, John Kristoff, Chris Kanich, and Jason Polakis. [Tales of favicons and caches: Persistent tracking in modern browsers](https://www.cs.uic.edu/~polakis/papers/solomos-ndss21.pdf). In Proceedings of the Network and Distributed System Security Symposium. 2021.
  - Roesner, Franziska, Tadayoshi Kohno, and David Wetherall. [Detecting and defending against third-party tracking on the web](https://www.usenix.org/system/files/conference/nsdi12/nsdi12-final17.pdf). In Proceedings of the 9th USENIX conference on Networked Systems Design and Implementation. 2012.
  - Sandhu, Ravi, and Joon S. Park. [Secure cookies on the Web](https://ieeexplore.ieee.org/abstract/document/865085). IEEE internet computing, 4(4), pp.36-44. 2000.
  - Franken, Gertjan, Tom Van Goethem, and Wouter Joosen. [Who left open the cookie jar? a comprehensive evaluation of third-party cookie policies](https://www.usenix.org/system/files/conference/usenixsecurity18/sec18-franken.pdf). In Proceedings of the 27th USENIX Security Symposium, pp. 151-168. 2018.

## :scroll: Learning goals

- Decide for a given usage scenario whether cookies or sessions are suitable.
- Explain and implement cookie usage.
- Explain and implement session usage.
- Explain third-party authentication.

## Recall the HTTP lecture

HTTP is **stateless**, every HTTP request contains all information necessary for the server to send a response in reply to a request. The server is not required to keep track of the requests received. This became obvious when we discussed authentication: the client, making an HTTP request to a server requiring authentication will send the username/password combination in every single request. This design decision simplifies the server architecture considerably.

## Introduction to cookies

The modern web, however, is **not** stateless. Many web applications track users and their state, for example:

- [bol.com](https://www.bol.com/) keeps users' shopping cart filled even when they leave the site;
- Newspapers such as [nytimes.com](https://www.nytimes.com/) or [nrc.nl](https://www.nrc.nl/) track users' number of free articles read per month.
- Users remain logged into portals such as [Facebook](https://www.facebook.com/) and [Twitter](https://twitter.com/home) across browser tabs.

**Not the stateless web is the norm, but the stateful web**. Cookies (and sessions) are one major way to achieve a stateful web. Cookies are **short amounts of text** that are most often **generated by the server, sent to the client** and **stored by the client** for some amount of time. These small amount of texts consist of a key and a value. It should be mentioned that MDN considers cookies an outdated technology&mdash;there are a host of other options available today as [outlined by MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage). It remains a fact though that cookies are employed by all major websites. The reason is simple: no matter the browser, cookies are supported.

**Client-side cookies** (i.e., cookies generated by the client and stored by the client, still to be sent to a server) also exist, but as we will see later, (1) they do not contribute to making the web stateful, (2) are not very intuitive to use, and (3) better client-side storage options exist. In the remainder of the transcript, we cover client-side cookies in a [single section](#client-side-cookies-and-local-storage); the rest of this transcript refers to cookies that are generated by servers and exchanged between client and server.

According to the _HTTP State Management Mechanism_ [RFC6265](https://tools.ietf.org/html/rfc6265), clients (most often browsers) should fulfill the following minimum requirements to store cookies:

- store 4096 bytes per cookie;
- store 50 cookies per domain;
- and at least 3000 cookies in total.

**Cookies are old** compared to other technologies of the web, they have been around since 1994. This also explains their small size: in those days, the Internet was a very slow piece of technology, to transmit 4KB of data, a dial-up modem took about a second. If a web application has 20 cookies to send, each one 4KB in size, the user will have waited 20 seconds for just the cookies to be send from server to client.

A server-side application creating cookies should use as few cookies as possible and also make those cookies as small as possible to avoid reaching these implementation limits. In the age of video streaming, a few kilobytes worth of cookies seems negligible, however, Internet access is not on the same level in all corners of the world and not every client is a modern browser.

Once you start looking more closely at cookies servers send to clients, you are likely to find cookies with keys like `__utma`, `__utmb` or `__utmz` over and over again. These are [Google Analytics cookies](https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage), one of the most popular toolkits that web developers use to _track_ their web applications' access and usage patterns.

A question we have not yet considered is what actually can be stored in cookies. Cookies are versatile. They act as the **server's short term memory**; the server determines what to store in a cookie, typical examples being:

- the history of a user's page views,
- the setting of HTML form elements (which can also be done fully on the client-side as we will see later), or,
- the user's UI preferences which the server can use to personalize an application's appearance.

<debug-info markdown="block">
## Viewing cookies in the browser

Cookies are **not hidden** from the user, they are stored _in the clear_ and can be viewed. Users can also delete and disallow cookies.

Firefox’s developer tools are helpful to inspect what is being sent over the network (in this case, cookies) :point_down::

![Viewing cookies in the browser](../img/sessions-cookies-browser.png)

<sup>Screenshot taken September 20, 2020. Firefox's Network tab.</sup>

:point_up: Highlighted above are the two categories of cookies: response cookies and request cookies. As the name suggests, *response cookies* are cookies that are appearing in an HTTP response (cookies sent by the server) and _request cookies_ are cookies appearing in an HTTP request (cookies sent from client to server). **Importantly, that the client does not send client-generated cookies to the server, the client only _returns_ cookies to the server that the server sent to the client beforehand.**

When developing web applications, use Firefox's Storage Inspector tab, which allows us to efficiently debug and investigate cookie settings :point_down::

![Storage dev tools cookies](../img/sessions-storage.png)

<sup>Screenshot taken September 20, 2020. Firefox's Storage Inspector tab. Each row shows one cookie.</sup>

The screenshot :point_up: shows the essence of a cookie: a cookie consists of a name/value pair and a number of optional cookie fields, which we discuss below. The screenshot also shows that a modern browser has more than just cookie storage available. While most of these technologies are beyond the scope of this class, we will briefly look at local storage later on.
</debug-info>

## Cookie security

Cookies are just small pieces of text, in the form of key (or _name_) and value. They can be **altered by the user** and **send back** to the server in their **altered form**.

This opens up a line of attack: a server that is trusting all cookies it receives back from clients without further checks, is susceptible to abuse from malicious users. Imagine a web application that determines the role of a user (e.g., on Brightspace we have instructors, graders, students and visitors) based on some criteria, saves this information in a cookie and sends it to its clients. Each time a client makes a request to a server, the server reads out the returned cookie to determine for which role to send back a response. A malicious user can change that role - say, from student to grader - and will receive information that is not intended for her.

In fact, [RFC6265](https://tools.ietf.org/html/rfc6265) contains a stern warning about the use of cookies:

```
This document defines the HTTP Cookie and Set-Cookie header fields. These
header fields can be used by HTTP servers to store state (called cookies) 
at HTTP user agents, letting the servers maintain a stateful session over 
the mostly stateless HTTP protocol.
...
Although cookies have many historical infelicities that degrade their 
security and privacy the Cookie and Set-Cookie header fields are widely 
used on the Internet.
```

Overall, security and privacy are not strong points of cookies and as long as we are aware of this and do not try to transmit sensitive or compromising information within cookies, the potential risks are limited. This RFC excerpt also tells us how cookies are sent and received: in the HTTP header fields `Set-Cookie` and in `Cookie` respectively.

The private browsing mode (also known as incognito mode) of modern browsers still allows to receive/send cookies. The cookies though are only held in memory (not stored on disk, independent of the cookie type) and are completely separated from the cookie storage of the regular browsing mode. All cookies are discarded once the private/incognito browser session ends. _Note, that the incognito/private browsing mode does **not** make you anonymous to servers, instead it makes your data/browsing activities untrackable to other people with physical access to your device and browser._

## How do cookies relate to sessions?

Cookies and sessions are closely related. **Sessions make use of cookies**. The difference to the cookie-only setting is the following: a single cookie is generated per client by the server and that cookie only contains a **unique ID**, the rest of the data is **stored on the server** and associated with the client through that ID.

**In general, sessions are preferable to cookies as they expose very little information (only a randomly generated ID).**

## Cookie flow

In this section, we cover the cookie flow between client and server. Consider the diagram below. On the left we have our browser (the client) part of which is a cookie store and on the right we have our server-side application.

![Cookie basics](../img/sessions-cookie-basics.png)

<sup>Cookie flow between client (on the left) and server (on the right).</sup>

:point_up: At the first visit to a web application, the client sends an HTTP request not containing a cookie. The server sends an HTTP response to the client including a cookie. Cookies are **encoded in HTTP headers**. At each subsequent HTTP request made to the same server-side application, the browser returns all cookies that were sent from that application. Cookies are actually **bound to a site domain name**, they are only sent back on requests to this specific site - a security feature of the browser. As we will see in a moment, we also have the ability for even more fine-grained control over when to return cookies from client to server.

Servers usually only send a cookie once, unless the key/value pair has changed. While it would be quite tedious to create and manage cookies by hand, modern web frameworks have designated methods to make cookie management efficient.

## Cookies in more detail

### Transient vs. persistent cookies

Cookies can either be transient or persistent.

**Transient cookies** are also called _session cookies_ and only exist in the memory of the browser. They are deleted when the browser is closed. They are _not_ deleted when just the browser tab or browser window is closed however! **If a cookie has no explicit expiration date, it automatically becomes a transient cookie.**

**Persistent cookies** on the other hand remain intact after the browser is closed, they are **stored on disk**. They do have a maximum age and are send back from client to server only as long as they are **valid**. They are valid when they have not yet exceeded their maximum age.

_Note: modern browsers offer to **restore** the session after a browser crash. In this case, transient cookies are often restored as well as the browser session is continued. This though is implemented inconsistently across different browsers._

### Cookie fields

Cookies consist of seven components, of which only the first one is a required component:

:one: The `cookie-name=cookie-value` field has to be set for a cookie to be valid.

:two: The `Expires` (expiration date) and `Max-Age` (seconds until the cookie expires) fields determine whether a cookie is a transient or persistent cookie.

:three: The `Domain` field determines the (sub)domain the cookie is associated with. It is restricted to the same domain as the server is running on. *We take a closer look at this particular field in the next section.*

:four: The `Path` field determines for which paths the cookie is applicable using wildcarding. Setting the path to a slash (`/`) matches all pages, while `/wishlist` will match all pages under the `/wishlist` path and so on.

:five: `Secure` flag: if this flag is set for a cookie it will only be sent via HTTPS, ensuring that the cookie is always encrypted when transmitting from client to server. This makes the cookie less likely to be exposed to cookie theft via eavesdropping. This is most useful for cookies that contain sensitive information, such as the session ID. A browser having stored a secure cookie will not add it to the HTTP request to a server if the request is sent via HTTP.

:six: `HttpOnly` flag: cookies with this flag are not accessible to **non-HTTP entities**. By default, cookies can be read out and altered through JavaScript, which can lead to security leaks. Once this flag is set in a cookie it cannot be accessed through JavaScript and thus no malicious JavaScript code snippet can compromise the content of the cookie. As all cookies, these cookies remain readable to the user that operates the client.

:seven: `Signed` flag: signed cookies allow the server to check whether the cookie value has been tampered with by the client. Let's assume a cookie value `monster`, the signed cookie value is then `s%3Amonster.TdcGYBnkcvJsd0%2FNcE2L%2Bb8M55geOuAQt48mDZ6RpoU`. The server signs the cookie by **appending** a base-64 encoded _Hash Message Authentication Code_ (HMAC) to the value. Note that the value is still readable, signed cookies offer **no privacy**, they make cookies though robust against tampering. The server stores a _secret_ (a non-guessable string) that is required to compute the HMAC. For a cookie that is returned to the server, the server recomputes the HMAC of the value and only if the computed HMAC value matches the HMAC returned to the server, does the server consider the cookie value as untampered. Unless the server has an easily guessable secret string (such as the default secret string of the server framework), this ensures protection against tampering.

### Cookie field Domain

Cookie fields are generally easy to understand. There is one field though which requires a more in-depth explanation and that is the `Domain` field.

Each cookie that is sent from a server to a client has a so-called **origin**, that is the **request domain** of the cookie. For example if a client makes a `GET` request to `http://www.my_site.nl/wishlist` the request domain of the cookie the server sends in the HTTP response is `www.my_site.nl`. Even if the port or the scheme (http vs https) differ, the received cookie is still applicable. That is, our cookie with the request domain `www.my_site.nl` will also be returned from the client to the server if the next request the client makes is to `https://www.my_site.nl:3005`.

If the `Domain` field is not set, the cookie is only applicable to its request domain. This means that the cookie with request domain `www.my_site.nl` is not applicable if the next request from the client is made to `http://my_site.nl` - note the lack of the `www.` prefix.

If the `Domain` field is set however, the cookie is applicable to the **domain listed in the field and all its sub-domains**. Importantly, the `Domain` field has to cover the request domain as well. This is best explained in an example: let's assume, a client makes for the first time an HTTP `GET` request to `http://www.my_site.nl/wishlist`. The server sends a cookie in the HTTP header that has a `name=value` field, with the `Path` set to `/` (i.e. the wildcard), and importantly the `Domain` set to `my_site.nl`. The domain attribute covers the more specific request domain. This cookie will be send back to the server by the client when the client any of its sub-domains including `www.my_site.nl`, `wishlist.my_site.nl` or even something like `serverA.admin.wishlist.my_site.nl`. The only restriction here is that the domain attribute cannot be a public suffix, like `.com` since that would violate the principle of cookies can ultimately only be returned to the same domain.

Once more:

```
GET http://www.my_site.nl/wishlist
Set-Cookie: name=value; Path=/; Domain=my_site.nl
```

is applicable to

- `www.my_site.nl`
- `wishlist.my_site.nl`
- `serverA.admin.wishlist.my_site.nl`

### Return to sender ...

If you carefully look at the cookies that are sent in HTTP request/response messages you may notice that HTTP requests only contain name/value pairs (i.e., the data sent from the browser to the server consists only of name/value pairs) while the HTTP responses in addition to name/value pairs contain a variety of cookie fields. The client (in our case the browser) relies on the information in the cookie fields to determine how to store the cookies and when to send them back to the server as part of an HTTP request.

<optional-info markdown="block">
## An excursion: writing a Firefox extension

Let's _customize_ our browser now to make it easier for us to see how many cookies our browser has in its cookie storage for each URL we visit. Instead of opening the browser's developer tools every time, we want to see this information right away _whilst_ browsing. We want something like this :point_down::

![Firefox extension](../img/sessions-extension.png)

<sup>Firefox Extension. Screenshot taken September 20, 2020.</sup>

Such an _extension_ (a piece of software to customize your browser) can be built with a few lines of JavaScript. We will introduce here how this very extension looks for Firefox; it is similar for other major browsers in use today.

Let's first look at the code below :point_down:. It is a piece of JavaScript that reads out the cookie name/value pairs in JavaScript. Thus, we will only be able to access those cookies that are not explicitly set as `httpOnly`). First, it creates a `<div>` element that contains an `<h2>` element which states the number of cookies accessible to JavaScript for the given URL. For each of those cookies, a `<div>` is created. All created elements receive rudimentary styling. Once more, mixing code and presentation is bad software engineering practice, for demonstration purposes we decided to keep the extension in a single file. Importantly, each created element has to be added to a parent (otherwise it will have no effect). A <kbd>Close</kbd> button is added to make it possible to close this cookie info box.

```javascript
//minimal styling of the cookie container
let cookieWindow = document.createElement("div");
cookieWindow.style.position = "absolute";
cookieWindow.style.display = "block";
cookieWindow.style.overflow = "auto";
cookieWindow.style.fontSize = "16px";
cookieWindow.style.top = "0px";
cookieWindow.style.left = "0px";
cookieWindow.style.width = "400px";
cookieWindow.style.maxHeight = "800px";
cookieWindow.style.opacity = "0.8";
cookieWindow.style.color = "navy";
cookieWindow.style.zIndex = "99999";
cookieWindow.style.backgroundColor = "gold";
cookieWindow.style.padding = "10px";
cookieWindow.style.margin = "10px";
cookieWindow.style.wordWrap = "break-word";

//cookies can be accessed via document.cookie; all cookies are returned,
//delimited from each other by a semicolon
let cookiesArray = document.cookie.split("; ");

//inform the viewer about the number of accessible cookies
let header = document.createElement("h2");
header.style.fontSize = "200%";
header.style.marginBottom = "10px";
header.textContent = cookiesArray.length + " JS accessible cookie";
if (cookiesArray.length > 1) {
  header.textContent += "s";
}
cookieWindow.appendChild(header);

//incorporate a "close" button for when the information becomes annoying
let close = document.createElement("button");
close.textContent = "Close";
close.style.position = "absolute";
close.style.top = "10px";
close.style.right = "10px";
close.style.border = "1px solid black";
close.style.backgroundColor = "white";
close.style.padding = "5px";
cookieWindow.appendChild(close);
close.addEventListener("click", function (e) {
  cookieWindow.style.display = "none";
});

//add each cookie name/value pair to our container;
//truncate the value if necessary
for (let i = 0; i < cookiesArray.length; i++) {
  let cookie = cookiesArray[i].split("=");
  let div = document.createElement("div");
  div.style.padding = "5px";
  div.style.fontSize = "110%";
  if (i % 2 == 0) {
    div.style.backgroundColor = "seashell";
  } else {
    div.style.backgroundColor = "mistyrose";
  }
  let partialValue = cookie[1].substr(0, 15);
  if (partialValue.length < cookie[1].length) partialValue += "...";
  div.textContent = cookie[0] + " \u21d2 " + partialValue;
  cookieWindow.appendChild(div);
}

document.body.appendChild(cookieWindow);
```

Evidently, an extension is a piece of JavaScript that looks very much like any other regular piece of JavaScript we write to create/style content on a web document. _What makes this an extension then?_ Answer: the fact that we employ this script _locally_ on our browser. How do we do this? We first need to create a `manifest.json` file that tells the browser (i) for which URLs (here: all) this extension should become active and (ii) the content scripts to load :point_down::

```javascript
{
  "manifest_version": 2,
  "name": "showCookies",
  "version": "0.1",
  "description": "Show off cookies.",
  "content_scripts": [
    {
      "matches": [
        "<all_urls>"
      ],
      "js": [
        "showCookies.js"
      ]
    }
  ]
}
```

The last step then is the deployment of the extension: we have a manifest file and a JavaScript file (here called `showCookies.js`) on local disk in a single folder. Now all we have to do is open Firefox's `about:debugging` pane, click <kbd>This Firefox</kbd> and then register our manifest file as temporary extension. If done successfully, you should see something like this :point_down::

![Firefox about debugging](../img/sessions-aboutdebugging.png)

<sup>Firefox's about:debugging screen. One temporary extension has been installed.</sup>

Whenever you make code changes, you will have to click <kbd>Reload</kbd> in order to see the effects. That's it, now have a fully working Firefox extension. A click on <kbd>Remove</kbd> will remove the extension again. Try out different URLs with this extension enabled to observe the amount of cookies accessible to JavaScript, e.g. `coolblue.nl`, `nytimes.com`, `tudelft.nl`, `duckduckgo.com` (which sets just _one_ cookie!), `twitter.com` or `volkskrant.nl` (which sets 35+ accessible cookies).

We have here just shown a very simple example of what an extension can do. But as with all web technologies, much more is possible than we cover in this class. For Firefox, [this page](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons) offers a good starting point into how to modify Firefox. Similarly for Chrome, you should start [here](https://developer.chrome.com/extensions). The new Microsoft Edge extension guide can be found [here](https://docs.microsoft.com/en-us/microsoft-edge/extensions-chromium/).
</optional-info>

## :bangbang: A Node.js application

How can we make use of cookies in our server-side application? Do Node.js and Express support the usage of cookies? Yes they do! In fact, dedicated **middleware** makes the usage of cookies with Express easy.

The example application [node-cookies-ex](https://github.com/chauff/cse1500-demo-code/tree/master/node-cookies-ex) shows off a minimal cookie example. Install, run and explore its codebase before continuing. Once the server is started, try out the following URLs:

- `http://localhost:3000/sendMeCookies`. The route `/sendMeCookies` sends cookies from the server to the client, one of which is signed. Signing is as simple as setting the `signed` property to `true`. Cookies the client sends back to the server appear in the HTTP request object and can be accessed through `req.cookies`. Here, a distinction is made between signed and unsigned cookies&mdash;you can only be sure that the signed cookies have not been tampered with.
- `http://localhost:3000/listAllCookies`. This lists all cookies sent by the client to the server on the terminal where the server was started.

Since cookies can be modified by a malicious user we need to be able to verify that the returned cookie was created by our application server. That is what the `Signed` flag is for. To make cookies secure, a **cookie secret** is necessary. The cookie secret is a string that is known to the server and used to compute a hash before they are sent to the client. The secret is ideally a random string.

It is a common practice to externalize third-party credentials, such as the cookie secret, database passwords, and API tokens. Not only does this ease maintenance (by making it easy to locate and update credentials), it also allows you to omit the credentials file from your version control system. This is especially critical for open source repositories hosted on platforms such as GitHub. In [node-cookies-ex](https://github.com/chauff/cse1500-demo-code/tree/master/node-cookies-ex), the credentials are stored in `credentials.js` (which **for demo purposes** is actually under version control): it is a module that exports an object, which contains the `cookieSecret` property, but could also contain database logins and passwords, third-party authentication tokens and so on :point_down::

```javascript
module.exports = {
  cookieSecret: "my_secret_abc_123",
};
```

## Accessing and deleting cookies in Express

Besides creating cookies, we also need to be able to access and delete them. To access a cookie value, append the cookie key to `req.cookies` or `req.signedCookies` :point_down::

```javascript
const val = req.signedCookies.signed_choco;
```

In order to delete a cookie we call the function `clearCookie` in the HTTP **response** object :point_down::

```javascript
res.clearCookie("chocolate");
```

If we dig into the Express code, in particular [response.js](https://github.com/expressjs/express/blob/master/lib/response.js), we find `clearCookie` to be defined as follows:

```javascript
res.clearCookie = function clearCookie(name, options) {
  var opts = merge({ expires: new Date(1), path: "/" }, options);

  return this.cookie(name, "", opts);
};
```

:point_up: This means, that, in order to clear a cookie, the server sends the cookie to the client with an expiration date **in the past**. This informs the browser that this cookie has become invalid and the browser deletes the cookie from its cookie storage. In order to delete a cookie successfully, not only the name has to match but also the cookie domain and path.

## A more pessimistic view on cookies

### Third-party cookies

While cookies have many beneficial uses, they are also often associated with user tracking. Tracking occurs through the concept of third-party cookies.

We distinguish two types of cookies:

- **first-party** cookies, and,
- **third-party** cookies.

First-party cookies are cookies that belong to the same domain that is shown in the browser's address bar (or that belong to the sub domain of the domain in the address bar).
Third-party cookies are cookies that belong to domains _different_ from the one shown in the browser's address bar.

Web portals can feature content from third-party domains (such as banner ads), which opens up the potential for tracking users' browsing history.

Consider this example :point_down::

![Third-party cookies](../img/sessions-third-party-cookies.png)

<sup>Toy example of first-party vs. third-party cookies.</sup>

:point_up: Here, we suppose a user visits `x.org`. The server replies to the HTTP request, using `Set-Cookie` to send a cookie to the client. This is a first-party cookie. `x.org` also contains an advert from `ads.agency.com`, which the browser loads as well. In the corresponding HTTP response, the server `ads.agency.com` also sends a cookie to the client, this time belonging to the advert's domain (`ads.agency.com`). This is a third-party cookie.
This by itself is not a problem. However, the global ad agency is used by many different websites, and thus, when the user visits other websites, those may also contain adverts from `ads.agency.com`. Eventually, all cookies from the domain `ads.agency.com` will be sent back to the advertiser when loading any of their ads or when visiting their website. The ad agency can then use these cookies to build up a browsing history of the user across all the websites that show their ads.

Thus, technologically **third-party cookies are not different from first-party cookies**.

<optional-info markdown="block">
### Evercookie

As seen in our cookie demo, cookies are easy to create, use and delete. The last aspects though only holds for _plain cookies_, i.e. little pieces of information that use the standard cookie infrastructure of HTTP and the browser.

Storing small pieces of information **somewhere** in the browser can actually be accomplished in many different ways if one is familiar with the technologies: cookies can be stored in local storage, session storage, IndexedDB and so on. These components are all part of the regular browser software. Covering them is beyond the scope of this lecture, just be aware that all those components can be misused.

[Evercookie](https://github.com/samyk/evercookie) is a JavaScript API that does exactly that. It produces extremely persistent cookies that are not stored in the browser's standard cookie store, but elsewhere. Evercookie uses several types of storage mechanisms that are available in the browser and if a user tries to delete any of the cookies, it will recreate them using each mechanism available. Note: _this is a tool which should **not** be used for any type of web application used in production, it is however a very good educational tool to learn about different components of the browser._

### Browser fingerprinting

Besides all sorts of client-side storage, it is also possible to collect a relatively stable and unique _fingerprint_ of a particular browser with a few of the browser's web API calls. In this manner, users can be tracked as long as they use the same browser on the same device. One defence against browser fingerprinting is for instance [the randomization of specific browser functions](https://link.springer.com/chapter/10.1007/978-3-319-62105-0_7). This is an active area of security research. This problem is also significant enough, that the W3C has an entire working group dedicated to [mitigating browser fingerprinting in web specifications](https://www.w3.org/TR/fingerprinting-guidance/).
</optional-info>

## Client-side cookies and local/session storage

So far, we have looked at cookies that are created by a server-side application, sent to clients in response to HTTP requests and then returned to the server in subsequent requests.
We thus have an exchange of information between the client and server. Now, we look at so-called client-side cookies, that are cookies which are created by the client itself and also only used by the client. They are still sent to a server as part of an HTTP request.

To set a client-side cookie, usually JavaScript is employed. A standard use case is a web form, which the user partially filled in but did not submit yet. Often it is advantageous to keep track of the information already filled in and to refill the form with that data when the user revisits the form. In this case, keeping track of the form data can be done with client-side cookies.

This code snippet :point_down: shows how client-side cookies can be set through JavaScript:

```javascript
//sets TWO(!) cookies
document.cookie = "name1=value1";
document.cookie = "name2=value2; expires=Fri, 24-Jan-2025 12:45:00 GMT";

//deletes a cookie by RESETTING the expiration date
document.cookie = "name2=value2; expires=Fri, 24-Jan-1970 12:45:00 GMT";
```

:point_up: To set a cookie we assign a name/value to `document.cookie`. `document.cookie` is a string containing a semicolon-separated list of all cookies. Each time we make a call to it, we can only assign a single cookie. Thus, line 3 does not replace the existing cookie, instead we have added a second cookie to `document.cookie`. The cookie added in line 3 showcases how to set the different cookie fields.
Deleting a cookie requires us to set the expiration date to a **date in the past** as shown in line 6; assigning an empty string to `document.cookie` will **not** have any effect.

The fact that cookies are appended one after the other in `document.cookie` also means that we cannot access a cookie by its name. Instead, the string returned by `document.cookie` has to be parsed, by first splitting the cookies into separate strings based on the semicolon and then determining field name and field value by splitting on `=`. If you looked closely at the Firefox extension introduced earlier, you will have seen this pattern already :point_down::

```javascript
const cookiesArray = document.cookie.split("; ");
const cookies = [];

for (let i = 0; i < cookiesArray.length; i++) {
  let cookie = cookiesArray[i].split("=");
  cookies[cookie[0]] = cookie[1];
}
```

On the site you are currently reading this transcript, it is possible to highlight pieces of text and add a few notes. You may have noticed that you were not asked to provide a username/password to enable highlighting. If we would have chosen to store those highlights/notes on a server, it would have been necessary to add an authorization step (you probably only want to receive your own notes and highlights!). Here, we store all this information on the client-side only. We could have used cookies for this purpose but there is a more recent solution: [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). Local storage persists data on disk (without an expiration date) and has an intuitive programming interface. Its storage object can be accessed via `window.localStorage` (or shorter `localStorage` as this refers by default to a property of the `window` object in the browser). The addition and removal of items in local storage is performed as follows: 

```javascript
localStorage.setItem("1600637", "Why not use something else?"); //add a data item (key/value must be strings)
let note = localStorage.getItem("1600637"); //retrieve an item with a specific key
localStorage.removeItem("1600637"); //remove an item
```

Since `localStorage.setItem()` only supports strings as key and value, JavaScript objects need to be transformed into strings first via `JSON.stringify`. The [W3C's web storage recommendation](https://www.w3.org/TR/webstorage/) mentions a maximum storage size of 5MB per origin but also notes that this is a _mostly arbitrary limit_.

When exploring the local storage (after a few highlights) of our course site, you should see something like this :point_down:. Here, all highlights are together stored in a single data item, while each note is a separate data item.

![Third-party cookies](../img/sessions-localstorage.png)

<sup>CSE1500 web technology site. Firefox Storage Inspector tab. Screenshot taken September 20, 2020.</sup>

Finally, we discuss session storage, which is also used for client-side data storage. In contrast to local storage, [**session storage**](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) clears the data once the *page session* ends. A new page session is created by the browser each time a browser tab/window is opened. The tab/window closure finishes the page session. Importantly, this page session concept is different from sessions between client and server which we discuss next. The session storage object can be accessed via `window.sessionStorage`. The API is equivalent to the `localStorage` API.


## :bangbang: Sessions

Let's now turn to sessions established between client and server. Sessions make use of cookies. Sessions improve upon cookies in two ways:

1. they enable tracking of user information without too much reliance on the unreliable cookie architecture;
2. they allow server-side applications to store much larger amounts of data.

However, we still have the problem that without cookies, the server cannot tell HTTP requests from different clients apart. So, sessions are a compromise or hybrid between cookies and server-side saved data. Let's describe how sessions work on a toy web application example:

![Sessions](../img/sessions-sessions.png)

<sup>Session workflow.</sup>

:point_up: A client visits a web application for the first time, sending an HTTP `GET` request to start a game. The server checks the HTTP request and does not find any cookies; and thus the server randomly generates a session ID and returns it in a cookie to the client. This is the piece of information that will identify the client in future requests to the server. The server uses the session ID to look up information about the client, usually stored in a database. This enables servers to store as much information as necessary, without hitting a limit on the number of cookies or the maximum size of a cookie.

For this process to be robust, the session IDs need to be generated at random. If we simply increment a session counter for each new client that makes a request we will end up with a very insecure application. Malicious users can snoop around by randomly changing the session ID in their cookie. Of course, this can partially be mitigated by using signed cookies, but it is much safer to not let clients guess a valid session ID at all.

To conclude this section, we discuss how to make use of sessions in Node.js/Express. Sessions are easy to set up, through the use of another middleware component: `express-session`. The most common use case of sessions is authentication, i.e. the task of verifying a user's identity.

Let's look at [node-sessions-ex](https://github.com/chauff/cse1500-demo-code/tree/master/node-sessions-ex) for a working example. Install, run (reload the browser several times with path `/countMe`) and explore the code. The corresponding `app.js` file is shown below with annotations :point_down::

```javascript
const express = require("express");
const http = require("http");

/* Cookie and session setup */
const credentials = require("./credentials");
const cookies = require("cookie-parser");
const sessions = require("express-session");
/* Setup complete */
const app = express();

app.use(cookies(credentials.cookieSecret));
const sessionConfiguration = {
	// Code is slightly adjusted to avoid deprecation warnings when running the code.
	secret: credentials.cookieSecret,
	resave: false,
	saveUninitialized: true,
};
app.use(sessions(sessionConfiguration));
http.createServer(app).listen(3000);

app.get("/countMe", function (req, res) {

  /* session object available on req object only */
	const session = req.session;

	if (session.views) { /* the session exists! */
		session.views++;
		res.send("You have been here " + session.views + " times (last visit: " + session.lastVisit + ")");
		session.lastVisit = new Date().toLocaleDateString();
	}
	else { /* the session does not exist */
		session.views = 1;
		session.lastVisit = new Date().toLocaleDateString();
		res.send("This is your first visit!");
	}
});
```

:point_up: Here, we store the session information in memory, which of course means that when the server fails, the data will be lost. In most web applications, we would store this information eventually in a database.
To set up the usage of sessions in Express, we need two middleware components: `cookie-parser` (line 6) and `express-session` (line 7). Since sessions use cookies, we also need to ensure that our middleware pipeline is set up in the correct order: the `cookie-parser` should be added to the pipeline before `express-session`, otherwise this piece of code will lead to an error (*try it out for yourself*).

:point_up: We define one route, called `/countMe` (line 21), that determines for a client making an HTTP request, how many requests the client has already made. Once the session middleware is enabled, session variables can be accessed on the session object which itself is a property of the request object&mdash;`req.session` (line 23). 
If that session object has a property `views` (line 25), we know that the client has been here before. We increment the `views` count and send an HTTP response to the client, informing it about how often the client has been here and when the last visit was. Then we set the property `lastVisit` to the current date (line 35) and are done.
If `session.views` does not exist (line 36), we create the `views` and `lastVisit` properties and set them accordingly, returning a *This is your first visit* as content in the HTTP response.
Finally, it is worth noting that all session-related actions are performed on the `request` object.

That's it about sessions: the Express framework makes it possible to use sessions without being too concerned about the low-level technical details (though this knowledge is required to debug your code).

## Third-party authentication

The final topic of this lecture is third-party authentication. This is a topic easily complex enough to cover a whole lecture. We introduce the principles of third-party authentication, but do not dive into great detail of the authentication protocol.

Even if you are not aware of the name, you will have used third-party authentication already. In many web applications that require a login, we are given the choice of either creating a username/password or by signing up through a third party such as Facebook, Google or Twitter. Below is a login screen of [Quora](https://www.quora.com/), with Facebook and Google acting as third-party authenticators:

![Joining Quora](../img/sessions-quora.png)

<sup>Screenshot of quora.com taken September 20, 2020.</sup>

Third-party authentication has become prevalent across the web, because **authentication**, i.e. the task of verifying a user's identity, is hard to do right.

If an application implements its own authentication scheme, it has to ensure that the information (username, password, email) are stored safely and securely and not accessible to any unwanted party. Users tend to reuse logins and password and even if a web application does not contain sensitive information, if the username/passwords are stolen, users might have used the same username/password combination for important and sensitive web applications such as bank portals, insurance portals, etc.

To avoid these issues, application developers _out-source_ authentication to large companies that have the resources and engineering power to guarantee safe and secure storage of credentials. If an application makes use of third-party authentication, it **never has access to any sensitive user credentials**.

There are two drawbacks though:

- we have to **trust** that the web platform providing authentication is truthful;
- some of our users may not want to use their social web logins to authenticate to an application.

The protocol that governs most third-party authentication services today is the **OAuth 2.0 Authorization Framework**, standardized in [RFC6749](https://tools.ietf.org/html/rfc6749). Its purpose is the following:

```
The OAuth 2.0 authorization framework enables a third-party application
to obtain limited access to an HTTP service, either on behalf of a resource
owner by orchestrating an approval interaction between the resource owner
and the HTTP service, or by allowing the third-party application to obtain
access on its own behalf.
```

### OAuth 2.0 roles

The OAuth 2.0 protocol knows several roles:

| Role                 | Description                                                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Resource owner       | Entity that grants access to a protected resource                                                                               |
| Resource server      | Server hosting the protected resources, capable of accepting and responding to protected resource requests using access tokens. |
| Client               | An application making protected resource requests on behalf of the resource owner and with its authorization.                   |
| Authorization server | Server issuing access tokens to the client after successfully authenticating the resource owner and obtaining authorization.    |

The **access token** referred to in the resource server role is a string denoting a _specific scope, lifetime and other access attributes_.

### Roles exemplified

Let's consider this specific example: an end-user (resource owner) can grant a printing service (client) access to her protected photos stored at a photo-sharing service (resource server), without sharing her username and password with the printing service :point_down::

![OAuth2 example 1](../img/sessions-oauth2-1.png)

:point_down: The user authenticates directly with a server trusted by the photo-sharing service(authorization server), which issues the printing service delegation-specific credentials (access token):

![OAuth2 example 1](../img/sessions-oauth2-2.png)

The mapping between the entities and OAuth 2.0 roles is as follows :point_down::

![OAuth2 example 1](../img/sessions-oauth2-3.png)

This is it. This is our excursion into third-party authentication.

### :bangbang: Express

To incorporate third-party authentication in an Express application, incorporate an authentication middleware component that is OAuth 2.0 compatible. A popular choice of middleware is [passport](https://www.npmjs.com/package/passport), which incorporates a range of authentication protocols across a number of third-party authenticators.

## Self-check

Here are a few questions you should be able to answer after having followed the lecture and having worked through the required readings:

<details> 
  <summary>True or False? Third-party cookies and first-party cookies are stored in different cookie storage facilities within the browser.</summary>
  False.
</details>

<details> 
  <summary>True or False? Third-party cookies originate from a different domain than first-party cookies.</summary>
  True.
</details>

<details> 
  <summary>True or False? Third-party cookies have a lower priority than first-party cookies and are returned to the server only after any first-party cookies.</summary>
  False.
</details>

<details> 
  <summary>A server-side application uses sessions to track users. What is the common approach to determine the end of a session?</summary>
  If x seconds have passed without a request from the client, the server ends the session.
</details>

<details> 
  <summary>What is the main purpose of the "consumer secret" (or "client secret") in third-party authentication?</summary>
  It ensures that only authorized applications query the authentication server for an access token.
</details>

<details> 
  <summary>True or False? A signed cookie enables the server to issue an encrypted value to the client, that cannot be decrypted by the client.</summary>
  False.
</details>

<details> 
  <summary>True or False? A signed cookie enables the server to verify that the issued cookie is returned by the client unchanged, without having to store the original issued cookie on the server.</summary>
  True.
</details>

<details> 
  <summary>True or False? The value of a signed cookie is encrypted with HMAC to avoid man-in-the-middle attacks. The client can decrypt the value with a previously negotiated key.</summary>
  False.
</details>

<details> 
  <summary>True or False? If a cookie's <span markdown="span">HTTPOnly</span> flag is set, the user cannot view or change the cookie in the browser.</summary>
  False.
</details>

<details> 
  <summary>The browser B currently has no stored cookies. The server sends the following four cookies to B (assume this is happening today). 
  <div markdown="1">
  ```
  Set-Cookie: bg=white; Expires=Fri, 01-Aug-2016 21:47:38 GMT; Path=/; Domain=tudelft.nl
  Set-Cookie: pref=1; Path=/; Domain=tudelft.nl
  Set-Cookie: dom=23; Expires=Thu, 01-Jan-2023 00:00:01 GMT; Path=/; Domain=tudelft.nl; HttpOnly
  Set-Cookie: view=mobile; Path=/; Domain=tudelft.nl; secure
  ```
  </div>
  B crashes 10 minutes later and the user restarts B. How many cookies can the user access after the restart with client-side JavaScript?</summary>
  0
</details>
