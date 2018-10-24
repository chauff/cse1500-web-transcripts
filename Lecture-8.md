# Web security <!-- omit in toc -->

## Table of Content <!-- omit in toc -->
- [Learning goals](#learning-goals)
- [Introduction](#introduction)
- [Threat categories](#threat-categories)
    - [Defacement](#defacement)
    - [Data disclosure](#data-disclosure)
    - [Data loss](#data-loss)
    - [Denial of service](#denial-of-service)
    - [Foot in the door](#foot-in-the-door)
    - [Unauthorized access](#unauthorized-access)
- [Most frequent vulnerabilities](#most-frequent-vulnerabilities)
- [NodeGoat](#nodegoat)
- [Injection](#injection)
- [Broken authentication](#broken-authentication)
- [XSS](#xss)
- [CSRF](#csrf)
- [Web security in Node.js/Express](#web-security-in-nodejsexpress)
- [Self-check](#self-check)

## Learning goals

- Describe the most common security issues in web applications.
- Describe and implement number of attacks that can be executed against unsecured code.
- Implement measures to protect a web application against such attacks.

## Introduction

Web applications are an attractive target for *attackers* (also known as *malicious users*) for several reasons:

- Web applications are open to attack from **different angles** as they rely on various software systems to run: an attacker can go after the **web server** hosting the web application, the **web browser** displaying the application, the **web application** itself if it is programmed without security in mind and of course the **user** is also a point of attack.
- Successfully attacking a web application with thousands or millions of users offers a lot of potential gain.
- "Hacking" today does not require expert knowledge, as easy-to-use automated tools are available that test servers and applications for known vulnerabilities (e.g. [Wapiti](http://wapiti.sourceforge.net/), [w3af](http://w3af.org/)).

When developing a web application, it is useful to ask yourself **how can it be attacked?** and secure yourself against those attacks. While web applications are relatively easy to develop thanks to the tooling available today, they are difficult to secure as that step requires substantial technological understanding on the part of the developer.

Large-scale web portals such as Facebook have partially "outsourced" the finding of security issues to so-called *white hat hackers* - people interested in security issues that earn money from testing companies' defenses and pointing them towards specific security issues. [Facebook, for example, has paid out millions in *bug bounties* by 2016](https://www.facebook.com/notes/facebook-bug-bounty/facebook-bug-bounty-5-million-paid-in-5-years/1419385021409053/), while [Google paid 36K to a single bug hunter](https://www.cnbc.com/2018/05/26/teenager-wins-36k-from-google-bug-bounty-program.html) once.
Bug bounty programs are run to this day by, among others, [Facebook](https://www.facebook.com/whitehat), [Google](https://www.google.com/about/appsecurity/reward-program/), [PayPal](https://www.paypal.com/us/webapps/mpp/security-tools/reporting-security-issues), [Quora](https://engineering.quora.com/Security-Bug-Bounty-Program), [Mozilla](https://www.mozilla.org/en-US/security/bug-bounty/) and [Microsoft](https://www.microsoft.com/en-us/msrc/bounty).

## Threat categories

There are a number of overarching threat categories, we introduce each of them with a concrete example security incidence.

### Defacement

Website defacement is an attack against a website that changes the visual appearance of a site.

A famous example here is CERN, [which in 2008 had one of its portals defaced by a Greek hacker group](https://astroengine.com/2008/09/16/greek-hackers-invade-lhc-nothing-much-happens/). This benevolent looking  page:

![CERN web page](img/L8-cern-1.png)

became this one:

![CERN web page hacked](img/L8-cern-2.png)

Beside defacement, no damage was done. Despite this, the attack was a cause for concern as the "hacked" web server formed part of the monitoring systems for some of the Large Hadron Collider detector hardware.

### Data disclosure

Data disclosure is a threat that is recurrently in the news, when a large company has to admit data disclosure - the most recent example (as of 10/2018) being [Facebook's security breach of 50 million user accounts](https://www.nytimes.com/2018/09/28/technology/facebook-hack-data-breach.html).

A less well-known example is a [2015 attack against VTech](http://www.computerworld.com/article/3009236/cybercrime-hacking/massive-vtech-hack-exposes-data-of-nearly-5-million-parents-and-over-200-000-kids.html), a toy producer. In this instance the attackers gained access to nearly 5 million records of parents including their email addresses and passwords. Worst of all, while the passwords were stored encrypted, the security questions were stored in plaintext, making them an easy target to exploit.

### Data loss

This threat is the most devastating for organizations that do not have proper backups in place: attackers are deleting data from servers they infiltrate.

Code Spaces ([snapshot of their splash page in 2014](https://web.archive.org/web/20140219025823/http://www.codespaces.com:80/)) used to be a company providing secure hosting options and project management services for companies. Until the day the [*Murder in the Amazon cloud*](http://www.infoworld.com/article/2608076/data-center/murder-in-the-amazon-cloud.html) happened - the title of the article is not an exaggeration. Code Spaces was built on Amazon Web Services (AWS), one of the major cloud computing platform provider used by many companies due to their low cost. Services on demand tend to be much cheaper than running and maintaining one's own hardware. AWS has an easy to use interface to spin up servers---a Web interface that has (of course) an authentication step built-in. An attacker managed to get access to this interface and threatened to shut down the servers and delete the data snapshots (literally possible with a click of a button) unless a ransom was paid. The company did not pay and tried to get access to their control panel back, but by that time the attacker had already deleted almost all resources. As Code Spaces had decided to run the servers **and their backups** from the same AWS account, they were all vulnerable at once. The company clients' data was gone and [Code Spaces shut down](https://web.archive.org/web/20140625045902/http://www.codespaces.com/).

### Denial of service

Denial of service (DoS) attacks make web applications unavailable for legitimate users.

To showcase this threat we use a 2015 Steam store attack, which is extensively described in a [Steam post](https://store.steampowered.com/news/19852/). A signature of a DoS attack is the abnormal traffic increase - in this case, the Steam store had to deal with a 2000% increase in traffic. Steam had a defense against a DoS attack in place to minimize the impact on Steam's servers; however, the defense (caching rules of additional web caches) was imperfect and incorrectly cached web traffic was shown to authenticated users, which means that some users saw other people's account page.

### Foot in the door

The most difficult component of a system to secure are its users. Phishing and social engineering can lead unsuspecting users to give access to some part of the system to attackers---this is the foot in the door, from there, attackers try to infiltrate other internal systems.

A common example (also described in this [attack on the US State Department](https://edition.cnn.com/2015/04/07/politics/how-russians-hacked-the-wh/)) is the sending of emails to government employees impersonating a colleague (who knows whom can often be inferred from public appearances, the staff overview on websites, public documents, etc.) and requesting access to a low-level security system. Often, access is simply granted by the unsuspecting user, despite policies to the contrary.

### Unauthorized access

In this threat type, attackers can use functions of a web application they should not be able to use. 

An example here is [Instagram's backend admin panel](https://www.hackread.com/instagram-hacked-researcher-gets-admin-panel-access/) which was accessible on the web while it should have only been accessible from the internal Instagram network.  

## Most frequent vulnerabilities

In order to effectively secure a web application, it helps to know what the most frequent security issues are.

Let's turn to the [Cyber security risk report 2016 published by HPE](https://www.thehaguesecuritydelta.com/media/com_hsd/report/57/document/4aa6-3786enw.pdf) (CSRHPE) to answer this question. For this report, several thousand applications (mobile, web, desktop) were sampled and their security was probed. We here go over some of the most important findings concerning web applications.

The most important **software security issues** for web and mobile applications are the following, reported as *percentage of scanned applications*:

![Web and mobile security](img/L8-security-report-1.png)

<sub>Figure taken from page 56, CSRHPE.</sub>

:point_up: In general, mobile applications are more vulnerable than web applications; the worst issues were found in the *security features* category, which includes authentication, access control, confidentiality and cryptography issues. 99% of mobile applications had at least one issue here. The *environment* category is also problematic with 77% of web applications and 88% of mobile applications having an issue here - this refers to server mis-configurations, improper file settings, sample files and outdated software versions. The third category to mention is *Input validation and representation* which covers issues such as cross-site scripting (we cover this later in this lecture) and SQL injection (covered in a DB lecture), which is present in most mobile applications and 44% of web applications. The latter is actually surprising, as a lot of best practices of how to secure web applications exist - clearly though, these recommendations are often ignored.

If we zoom in on the non-mobile applications, the ten most commonly occurring vulnerabilities are the following, reported as *percentage of applications* and *median vulnerability count*:

![Top 10 vulnerabilities](img/L8-security-report-2.png)

<sub>Figure taken from page 57, CSRHPE.</sub>

:point_up: Some of these vulnerabilities you should already recognize and be able to place in context, specifically *Cookie Security: cookie not sent over SSL* and *Cookie Security: HTTPOnly not set*. The vulnerability *Privacy violation: autocomplete* should intuitively make sense: auto-completion is a feature provided by modern browsers; browsers store information submitted by the user through `<input>` fields. The browser can then offer autocompletion for subsequent forms with similar field names. If sensitive information is stored in this manner, a malicious actor can provide a form to a user that is then auto-filled with sensitive values and transmitted back to the attacker. For this reason, it is often worthwhile to [switch off autocompletion](https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion) for sensitive input fields.

:point_up: Lastly, let's discuss the *Hidden field* vulnerability. It provides developers with a simple manner of including data that should not be seen/modified by users when a `<form>` is submitted. For example, a web portal may offer the same form on every single web page and the hidden field stores a numerical identifier of the specific page (or route) the form was submitted from. However, as with any data sent to the browser, with a bit of knowledge about the dev tools available in modern browsers, the user can easily change the hidden field values, which creates a vulnerability of the server does not validate the correctness of the returned value.

Taking a slightly higher-level view, the top five violated security categories across all scanned applications are the following, reported as *percentage of applications violating a category*:

![Top 5 violated security categories](img/L8-security-report-3.png)

<sub>Figure taken from page 59, CSRHPE.</sub>

The only category not covered so far is *Insecure transport*. This refers to the fact that applications rely on insecure communication channels or weakly secured channels to transfer sensitive data. Nowadays, at least for login/password fields, the browsers provide a warning to the user indicating the non-secure nature of the connection, as seen in this example:

![NodeGoat not secure](img/L8-browser-warning.png)

It is worth noting that in recent years browsers have implemented support for the `Strict-Transport-Security` header, which allows web applications to inform the browser that it should **only** be accessed via HTTPS. This prevents attacks such as described in this [MDN article on `Strict-Transport-Security`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security):

```console
You log into a free WiFi access point at an airport and start surfing the web, visiting your
online banking service to check your balance and pay a couple of bills. Unfortunately, the
access point you're using is actually a hacker's laptop, and they're intercepting your original
HTTP request and redirecting you to a clone of your bank's site instead of the real thing.
Now your private data is exposed to the hacker.

Strict Transport Security resolves this problem; as long as you've accessed your bank's web site
once using HTTPS, and the bank's web site uses Strict Transport Security, your browser will know
to automatically use only HTTPS, which prevents hackers from performing this
sort of man-in-the-middle attack.
```

## NodeGoat

One of the best ways of learning about web security is to actually try out a few of the introduced techniques in an actual web application that is vulnerable. As we covered Node.js/Express, most useful to us is a vulnerable web application that was written in Node.js/Express.

The [OWASP NodeGoat project](https://github.com/OWASP/NodeGoat) was designed specifically for this purpose, it provides an "*environment to learn how OWASP Top 10 security risks apply to web applications developed using Node.js*". OWASP stands for [Open Web Application Security Project](https://www.owasp.org); OWASP is an organization whose mission is to improve software security. And creating a vulnerable application to showcase the worst security issues, is one way to train software engineers in web security.

The application NodeGoat implements is an *Employee Retirement Savings Management* system called RetireEasy - you already saw a glimpse of it in the previous section.

Apart from providing a vulnerable application, NodeGoat also provides a helpful [tutorial](http://nodegoat.herokuapp.com/tutorial) on the implemented vulnerabilities, how to execute attacks and, importantly, how to mitigate them.

In the following sections, we will discuss a number of vulnerabilities on the example of NodeGoat.

## Injection

## Broken authentication

## XSS

## CSRF

## Web security in Node.js/Express

A popular package to secure Express-based applications is [Helmet](https://www.npmjs.com/package/helmet). It acts as middleware in Express applications and sets HTTP headers according to best security practices.

## Self-check

Here are a few questions you should be able to answer after having followed the lecture and having worked through the required readings:

1. Consider the following list of abilities a malicious user (the attacker) may have who managed to intercept all of your network traffic. Which of these abilities are needed to steal session cookies?
    1. The attacker can eavesdrop (read all your HTTP requests).
    2. The attacker can inject additional HTTP requests with your source address.
    3. The attacker can modify HTTP requests.
    4. The attacker can drop HTTP requests.