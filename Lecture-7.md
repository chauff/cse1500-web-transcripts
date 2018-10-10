# Cookies, sessions and third-party authentication

## Learning goals

- Decide for a given usage scenario whether cookies or sessions are suitable;
- Explain and implement cookie usage;
- Explain and implement session usage;
- Implement third-party authentication.

## Introduction to cookies and sessions

### Key facts about HTTP

In the first lecture of this course we covered the hypertext transfer protocol in detail. Recall, that HTTP is **stateless**, every HTTP request contains all information necessary for the server to send a response in reply to this request. The server is not required to keep track of the requests received.

This became most obvious when we discussed authentication: the client, making an HTTP request to a server requiring authentication will send the username/password combination in every single request. This design decision simplifies the server architecture a lot.

The modern web, however, is **not** stateless. Many websites and portals you visit track you and your state:

- [bol.com](https://www.bol.com/) keeps your shopping cart filled even when you leave their shop;
- [statcounter](http://statcounter.com/), a popular user tracking toolkit, can exclude yourself from being counted as visitor to your own website by the setting of a cookie;
- JavaScript games often keep track of your game's current status and you can continue when re-visiting the game.

The stateless web does not exist, states are the norm. Cookies and sessions are the tools that enable us to move from stateless HTTP to the **stateful web**.

### Cookies

Cookies are one way to achieve a stateful web. Cookies are **short amounts of text** that are **sent by the server** and **stored by the client** for some amount of time. These small amount of texts consist of a key and a value.

A concrete example is a server generating a random user ID and sending it to the client, with `userID` being the key and the randomly generated string being the value.

According to the *HTTP State Management Mechanism* [RFC6265](https://tools.ietf.org/html/rfc6265), clients (most often browsers) should at least fulfill the following minimum requirements:

- store 4096 bytes per cookie;
- store 50 cookies per domain;
- and at least 3000 cookies in total.

A server-side application creating cookies should use as few cookies as possible and also make those cookies as small as possible to avoid reaching these implementation limits. In the age of constant video streaming, a few kilobytes worth of cookies seem negligible, however, remember that Internet access is not on the same level in all corners of the world and not every client is a modern browser.

Once again, the browser's web developer tools are very helpful to inspect what is being sent over the network (in this case, cookies):

![Viewing cookies in the browser](img/L7-cookies-browser.png)

Once you start looking more closely at the cookies, web sites and portals want to store on your browser, you are likely to find cookies with keys like `__utma`, `__utmb` or `__utmz` over and over again. These are [Google Analytics](https://analytics.google.com/) [cookies](https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage), one of the most popular toolkits that web developers use to track their web applications' access and usage patterns.

Cookies are extremely old compared to other parts of the web, they have been around since 1994. This also explains their small size - in those days, the Internet was a very slow piece of technology, to transmit 4KB of data, a dial-up modem took about a second. If a web site has 20 cookies, to send, all being 4KB large, the user will have waited 20 seconds for just the cookies to be send from server to client.

Cookies are **not hidden** from the user, they are stored *in the clear* and can be viewed at all times. Users can also delete and disallow cookies.

There is more: cookies are just small pieces of text, in the form of key and value. They can be altered by the user and send back to the server in their altered form.
This actually opens up a line of attack: a server that is trusting all cookies that it receives back from clients without further checks, is susceptible to abuse from malicious users. Imagine a website that determines the role of a user (on Brightspace we have instructors, graders, students, visitors, etc.) based on some criteria and then stores this information in a cookie. Each time a client makes a request to the website, the server simply reads out the returned cookie to determine for which role to send back a response. A clever user can change that role - say, from student to grader - and will receive information that is not intended for him or her.

This lecture is about **cookies and sessions** and indeed both are closely related. **Sessions in fact make use of cookies**. The big difference to the cookie-only setting is, that a single cookie is generated per client by the server and that cookie only contains a unique ID, the rest of the data is stored on the server and associated with the client through that id. **In general, sessions are preferable to cookies as they expose very little information (only a randomly generated id).**

[RFC6265](https://tools.ietf.org/html/rfc6265) contains a stern warning about the use of cookies:

```console
"This document defines the HTTP Cookie and Set-Cookie header fields. These header fields can be used by HTTP servers to store state (called cookies) at HTTP user agents, letting the servers maintain a stateful session over the mostly stateless HTTP protocol.
...
Although cookies have many historical infelicities that degrade their security and privacy the Cookie and Set-Cookie header fields are widely used on the Internet.
```

Security and privacy are not strong points of cookies and as long as you are aware of this and do not try to transmit sensitive or compromising information within cookies, the potential risks are limited. This RFC excerpt also tells us how cookies are sent and received: in the HTTP header fields `Set-Cookie` and in `Cookie` respectively. Let's take a closer look at this.

### Cookie basics

Below, on the right we have our server-side application and on the left our browser (the client), which contains a cookie store:

![Cookie basics](img/L7-cookie-basics.png)

At the first visit of a web application, the client sends an HTTP request not containing a cookie. The server-side application sends an HTTP response to the client including a cookie. Cookies are **encoded in the HTTP header**. At each subsequent HTTP request made to the same server-side application, the browser returns all cookies that were sent from that application. Cookies are actually **bound to a site domain name**, they are only sent back on requests to this specific site - a security feature of the browser.

As we will see in a moment, we also have the ability for even more fine-grained control over when to return cookies from client to server.

Servers usually only send a cookie once, unless the key/value pair has changed. While it would be quite tedious to create and manage cookies by hand, most web frameworks have designated methods to develop web applications that make use of cookies.

A question we have not yet considered is what actually can be stored in cookies. Cookies are versatile. They act as the **server's short term memory**; the server determines what to store in a cookie, typical examples being

- the history of a user's page views,
- the setting of HTML form elements (which can also be done fully on the client-side as we will see later), or,
- the user's UI preferences which the server can use to personalize an application's appearance.

Depending on their purpose, cookies can have different lifetimes ...

### Session vs. persistent cookies

Cookies can either be transient or persistent.

**Transient cookies** are also called *session cookies* and only exist in the memory of the client. They are deleted when the browser is closed, not just the tab or browser window. **If a cookie has no explicit expiration date, it automatically becomes a session cookie.**

**Persistent cookies** on the other hand remain intact after the browser is closed, they are **stored on disk**. They do have a maximum age and are send back from client to server only as long as they are **valid**, that is they have not yet exceeded their maximum age.

### Cookie fields

Cookies consist of seven components, of which only the first one is required:

1. The `cookie-name=cookie-value` field has to be set for a cookie to be valid;
2. The `Expires` (expiration date) and `Max-Age` (seconds until the cookie expires) fields whether a cookie is a transient or persistent cookie.
3. The `Domain` field determines the domain the cookie is associated with and is restricted to the same domain as the server is running on.
4. The `Path` field determines for which paths the cookie is applicable using wildcarding. Setting the path to a `/` matches all pages, while `/todos` will match all pages under the `/todos` path and so on.
5. `Secure` flag: if this flag is set for a cookie it will only be sent via HTTPS, ensuring that the cookie is always encrypted when transmitting from client to server. This makes the cookie less likely to be exposed to cookie theft via eavesdropping. This is most useful for cookies that contain sensitive information, such as the session ID. A browser having stored a secure cookie will not add it to the HTTP request to a server if the request is sent via HTTP.
6. `HttpOnly` flag: cookies with this flag are not accessible to **non-HTTP entities**. By default, cookies can be read out and altered through JavaScript, which can lead to security leaks. Once this flag is set in a cookie it cannot be accessed through JavaScript and thus no malicious JavaScript code snippet can compromise the content of the cookie. Of course, these cookies are still readable to the user that operates the client.
7. `Signed` flag: signed cookies allow the server to check whether the cookie value has been tampered with by the client. Let's assume a cookie value `monster`, the signed cookie value is then `s%3Amonster.TdcGYBnkcvJsd0%2FNcE2L%2Bb8M55geOuAQt48mDZ6RpoU`. The server signs the cookie by **appending** a base-64 encoded *Hash Message Authentication Code* (HMAC) to the value. Note that the value is still readable, signed cookies offer **no privacy**, they make cookies though robust against tampering. The server stores a *secret* (a non-guessable string) that is required to compute the HMAC. For a cookie that is returned to the server, the server recomputes the HMAC of the value and only if the computed HMAC value matches the HMAC returned to the server, does the server consider the cookie value as untampered. Unless the server has an easily guessable secret string (such as the default secret string), this ensures no tampering.

### Cookie domain

Cookie fields are generally easy to understand. There is only one field which requires a more in-depth explanation and that is the `Domain` field.

Each cookie that is sent from a server to a client has a so-called **origin**, that is the **request domain** of the cookie. For example if a client makes a `GET` request to `http://www.my_site.nl/todos` the request domain of the cookie the server sends in the HTTP response will be `www.my_site.nl`. Even if the port or the scheme (http vs https) differ, the received cookie is still applicable. That is, our cookie with the request domain `www.my_site.nl` will also be returned from the client to the server if the next request the client makes is to `https://www.my_site.nl:3005`.

But what is then the purpose of the `Domain` field? Well, if the field is not set, the cookie is only applicable to its request domain. This means that the cookie with request domain `www.my_site.nl` is not applicable if the next request from the client is made to `http://my_site.nl` - note the lack of the `www.` prefix.

If the `Domain` field is set however, the cookie is applicable to the **domain listed in the field and all its sub-domains**. Importantly, the `Domain` field has to cover the request domain as well. This is best explained in an example: let's assume, a client makes for the first time an HTTP `GET` request to `http://www.my_site.nl/todos`. The server sends a cookie in the HTTP header that has a `name=value` field, with the `Path` set to `/` (i.e. the wildcard), and importantly the `Domain` set to `my_site.nl`. The domain attribute covers the more specific request domain. This cookie will be send back to the server by the client when the client any of its sub-domains including `www.my_site.nl`, `todos.my_site.nl` or even something like `serverA.admin.todos.my_site.nl`. The only restriction here is that the domain attribute cannot be a public suffix, like `.com` since that would violate the principle of cookies can ultimately only be returned to the same domain.

Once more:

```console
GET http://www.my_site.nl/todos
Set-Cookie: name=value; Path=/; Domain=my_site.nl
```

is applicable to

```console
www.my_site.nl
todos.my_site.nl
serverA.admin.todos.my_site.nl
```

## A first Node.js application

How can we make use of cookies in our server-side application? Do Node.js and Express support the usage of cookies? Yes they do! In fact, dedicated **middleware** makes the usage of cookies with Express a trivial matter.

The example application in folder [demo-code/node-cookies-ex](demo-code/node-cookies-ex) shows off a minimal cookie example.

Since cookies can be modified by a malicious user we need to be able to verify that the cookie that was provided was created by our application server. As you already know, that is what the `Signed` flag is used for. To make cookies secure, a **cookie secret** is necessary. The cookie secret is a string that's known to the server and used to compute a hash before they’re sent to the client. The secret is ideally a random string. It is a common practice to externalize third-party credentials, such as the cookie secret, database passwords, and API tokens (Twitter, Facebook, etc.). Not only does this ease maintenance (by making it easy to locate and update credentials), it also allows you to omit the credentials file from your version control system. This is especially critical for open source repositories hosted on GitHub or other public source control repositories. My credentials are stored in `credentials.js` (which for demo purposes is actually under version control): it is a module that exports an object, which in this case contains only the `cookieSecret` property, but could also contain database logins and passwords, third-party authentication tokens and so on:

```javascript
module.exports = {
    cookieSecret: "my_secret_abc_123"
};
```

Our example application will do two things:

1. send cookies to a client that requests them (route `/sendMeCookies`), and,
2. list all cookies sent by the client on the server (route `/ListAllCookies`).

This is the annotated code of `app.js`:

![Node.js code example](img/L7-node-cookies-ex.png)

The route `/sendMeCookies` sends cookies from the server to the client, one of which is signed. Signing is as simple as setting the `signed` property to `true`. Cookies the client sends back to the server appear in the HTTP request object and can be accessed through `req.cookies`. Here a distinction is made between signed and unsigned cookies - you can only be sure that the signed cookies have not been tampered with.

### Accessing and deleting cookies in Express

To conclude this section and to give you enough knowledge to use cookies in your own application, we take a look at how to access the value of and how to delete cookies. Both are simple operations. To access a cookie value, you simply append the cookie key to `req.cookies` or `req.signedCookies`:

```javascript
var val = req.signedCookies.signed_choco;
```

In order to delete a cookie you call the function `clearCookie` in the HTTP **response** object:

```javascript
res.clearCookie('chocolate');
```

## A more pessimistic view on cookies

While cookies have many beneficial uses, they are also often associated with user tracking. You have just learned that cookies are exclusively returned from client to the server that initially sent the cookie. So how does that enable tracking of users?

As you saw in the [code example above](demo-code/node-cookies-ex), cookies are easy to create, use and delete. The last aspects though only holds for *plain cookies*, i.e. little pieces of information that use the standard cookie infrastructure, HTTP and browsers offer to send and store cookies.

### Evercookie

Storing little pieces of information *somewhere* in the browser can actually be done in many different browsers if you know the technologies within the browser well - more places than you may actually imagine.

[Evercookie](https://github.com/samyk/evercookie) is a JavaScript API that does exactly that. It produces extremely persistent cookies that are not stored in the browser's standard cookie store, but elsewhere. Evercookie uses several types of storage mechanisms that are available in the browser and if a user tries to delete the cookies, it will recreate them using each mechanism available. Note: *this is a tool which should **not** be used for any type of web application used in production, it is however a very good educational tool to learn about different components of the browser.* Lets take a look what exactly Evercookie exploits.

### Third-party cookies

When we talk abut user tracking, we have to talk abut third-party cookies. Tracking occurs through the concept of third-party cookies.

We distinguish two types of cookies:

- first-party cookies, and,
- third-party cookies.

First-party cookies are cookies that belong to the same domain that is shown in the browser's address bar (or that belong to the sub domain of the domain in the address bar).
Third-party cookies are cookies that belong to domains *different* from the one shown in the address bar.

Web pages can feature content from third-party domains (such as banner ads), which opens up the potential for tracking the user's browsing history.

Consider this example:

![Third-party cookies](img/L7-third-party-cookies.png)

Here, we suppose a user visits `x.org`. The server replies to the HTTP request, using `Set-Cookie` to send a cookie to the client. This is a first-party cookie. `x.org` also contains an advert from `ads.agency.com`, which the browser loads as well. In the corresponding HTTP response, the server `ads.agency.com` also sends a cookie to the client, this time belonging to the advert's domain (`ads.agency.com`). This is our third-party cookie.
This by itself is not a problem. However, our global ad agency is used by many different websites, and thus, when the user visits other websites, those may also contain adverts from `ads.agency.com`. Eventually, all cookies from the domain `ads.agency.com` will be sent back to the advertiser when loading any of their ads or when visiting their website. The ad agency can then use these cookies to build up a browsing history of the user across all the websites that have ads from that advertiser.

Thus, **third-party cookies are not any different to first-party cookies**, however since ads are usually controlled by only a few global companies, armed with these cookies the ad agencies can build up a pretty complete browsing history of many web users.

## Client-side cookies

So far, we have looked at cookies that are created by a server-side application, sent to clients in response to HTTP requests and then returned to the server in subsequent requests.
We thus have an exchange of information between the client and server. Now, we look at  so-called client-side cookies, that are cookies which are created by the client itself and also only used by the client.

### Cookies in JavaScript

To set a client-side cookie, usually JavaScript is employed. A standard use case is a web form, which the user partially filled in but did not submit yet. Often it is advantageous to keep track of the information already filled in and to refill the form with that data when the user revisits the form. In this case, keeping track of the form data can be done with client-side cookies.

The code snippet here:

```javascript
//set TWO(!) cookies
document.cookie = "name1=value1";
document.cookie = "name2=value2; expires=Fri, 24-Jan-2019 12:45:00 GMT";

//delete a cookie by RESETTING the expiration date
document.cookie = "name2=value2; expires=Fri, 24-Jan-1970 12:45:00 GMT";
```

shows you how client-side cookies can be set through JavaScript. To set a cookie we assign a name/value to `document.cookie`. `document.cookie` is a string containing a semicolon-separated list of all cookies. Each time we make a call to it, we can only assign a single cookie. Thus after code line 3, we have not replaced the existing cookie, we have added a second cookie to `document.cookie`. In line 3 you can also see how to set the different cookie fields.
Deleting a cookie requires you to set the expiration date to a **date in the past**; assigning an empty string to `document.cookie` will **not** have the anticipated effect.

The fact that cookies are appended one after the other in `document.cookie` also means that we cannot access our cookie by its name. Instead, the string returned by `document.cookie` has to be parsed, by first splitting the cookies into separate strings based on the semicolon and then determining field name and field value by splitting on `=`:

```javascript
var cookiesArray = document.cookie.split('; ');
var cookies=[];

for(var i=0; i < cookiesArray.length; i++) {
    var cookie = cookiesArray[i].split("=");
    cookies[cookie[0]]=cookie[1];
}
```

## Sessions

Let's now turn to sessions. As you already know, sessions make use of cookies. Sessions improve upon cookies in two ways:

- they enable tracking of user information without too much reliance on the unreliable cookie architecture;
- they allow server-side applications to store much larger amounts of data.

However, we still have the problem that without cookies, the server cannot tell HTTP requests from different clients apart. So, sessions are a compromise or hybrid between cookies and server-side saved data.

Let's look at how they work:

![Sessions](img/L7-sessions.png)

A client visits a web site for the first time, sending an HTTP `GET` request to retrieve some todos. The server checks the HTTP request and does not find any cookies, so the server randomly generates a session ID and returns it in a cookie to the client. This is the piece of information that will identify the client in future requests to the server. Any future requests from the client then contain a cookie with that session ID. The server uses the session ID to look up information about the client, usually stored in a database. This enables servers to store as much and as detailed information as necessary, without hitting a limit on the number of cookies or the maximum size of a cookie.

For this process to work and be relatively robust, the session IDs need to be generated at random. If you simply increment a session counter for each new client that makes a request you will end up with a very insecure application. Malicious users can snoop around by randomly changing the session ID in their cookie. Of course, this can partially be mitigated by using signed cookies, but it is much safer to not let clients guess a valid session ID at all.

To conclude this section, we discuss how to make use of sessions in Node.js and within our Express framework setup. Sessions are easy to set up, through the use of another middleware component: `express-session`. The most common use cause of sessions is authentication, i.e. the task of verifying a user’s identity.

Note that with sessions, we do not have to use the request object for retrieving the value
and the response object for setting the value: it’s all performed on the request object
Advantage: data is secure

Let's look at a [code example](demo-code/node-sessions-ex):

![Session code example](img/L7-node-sessions-ex.png)

Here, we store the session information in memory, which of course means that when the server fails, the data will be lost. In a real web application, you would store this information most likely in a database.
To set up the usage of sessions in Express, we need two middleware components: `cookie-parser` and `express-session`. Since sessions use cookies, we also need to ensure that our middleware pipeline is set up in the correct order: the `cookie-parser` should be added to the pipeline before `express-session`, otherwise this piece of code will lead to an error.

We define a single route here, called `/countMe`, which determines for a client making an HTTP request, how many requests the client has already made. Once the session middleware is enabled, session variables can be accessed on the session object which itself is a property of the request object - `req.session`. This is the first course of action: accessing the client's session object.
If that session object has a property `views`, we know that the client has been here before. We increment the `views` count and send an HTTP response to the client, informing him about how often he has been here and when the last visit was. Then we set the property `lastVisit` to the current date and are done.
If `session.views` does not exist, we create the `views` and `lastVisit` properties and set them accordingly, returning a *This is your first visit* as content in the HTTP response.

## Third-party authentication

The final topic of this lecture is third-party authentication. This is a topic easily complex enough to cover a whole lecture, so here I will show you how to add third-party authentication to your own application, with a small amount of of background information.

Even if you are not aware of the name, every one of you has used third-party authentication already. In most portals these days you have two options when signing up, either creating a username/password or by signing up through a third party such as Facebook, Google or Twitter. Here you see an example of how to join [Quora](https://www.quora.com/), with Facebook and Google acting as third-party authenticators:

![Joining Quora](img/L7-quora.png)

Why has third-party authentication become so prevalent across the web? Because **authentication**, i.e. the task of verifying a user's identity, is hard to do right. If your application implements its own authentication scheme, it has to ensure that the information (username, password, email) are stored safely and securely and not accessible to any unwanted party. Users tend to reuse logins and password and even if your web application does not contain sensitive information, if the username/passwords are stolen, users might have used the same username/password combination for important and sensitive web application such as bank portals, insurance portals and so on. To avoid these issues, we "out-source" authentication to large companies that have the resources and engineering power to guarantee safe and secure storage of credentials. If an application makes use of third-party authenatication it never gets access to any sensitive user credentials.

There are two drawbacks though: you have to trust that the web platform providing authentication is truthful and some of your users actually may not want to use their social web logins to authenticate to your application.

Not surprisingly, we have a protocol that governs third-party authentication: the most common one in use today is the **OAuth 2.0 Authorization Framework**, standardized in [RFC6749](https://tools.ietf.org/html/rfc6749). Its' purpose is the following:

```console
"The OAuth 2.0 authorization framework enables a third-party application
to obtain limited access to an HTTP service, either on behalf of a resource
owner by orchestrating an approval interaction between the resource owner
and the HTTP service, or by allowing the third-party application to obtain
access on its own behalf."
```

### OAuth 2.0 roles

The OAuth 2.0 protocol knows several roles:

| Role                 | Description                                                                                                                      |
|----------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| Resource owner       | Entity that grants access to a protected resource                                                                                 |
| Resource server      | Server hosting the protected resources, capable of  accepting and responding to protected resource requests using access tokens. |
| Client               |  An application making protected resource requests on   behalf of the resource owner and with its authorization.                  |
| Authorization server | Server issuing access tokens to the client after successfully  authenticating the resource owner and obtaining authorization.     |

The **access token** referred to in the resource server role is a string denoting a *specific scope, lifetime and other access attributes*.

### Roles exemplified

Let's consider this specific example:

![OAuth2 example 1](img/L7-oauth2-1.png)

An end-user (resource owner) can grant a printing service (client) access to her protected photos stored at a photo-sharing service (resource server), without sharing her username and password with the printing service. Instead, she authenticates directly with a server trusted by the photo-sharing service(authorization server), which issues the printing service delegation-specific credentials (access token).

![OAuth2 example 1](img/L7-oauth2-2.png)

![OAuth2 example 1](img/L7-oauth2-3.png)

### Third-party authentication with Twitter

This final section of the lecture is very practical: we will walk through the steps of adding Twitter-based third-party authentication to your application, i.e. we want to achieve a `Sign in with your Twitter account` functionality.

1. Head to [https://apps.twitter.com/](https://apps.twitter.com/) and create and **app**.
2. ..

## Self-check

Here are a few questions you should be able to answer after having followed the lecture and having worked through the required readings:
