---
layout: default
permalink: /http/
linkname: HTTP
ordering: 1
warning: false
---

# HTTP: the language of web communication <!-- omit in toc -->

{% include_relative explanation.md %}

## Table of Contents <!-- omit in toc -->

- [Required & recommended readings and activities](#required--recommended-readings-and-activities)
- [Web standards](#web-standards)
- [:scroll: Learning goals](#scroll-learning-goals)
- [World Wide Web vs. Internet](#world-wide-web-vs-internet)
  - [A brief history of the web](#a-brief-history-of-the-web)
  - [Key aspects of the Internet](#key-aspects-of-the-internet)
  - [Two important organizations](#two-important-organizations)
- [HTTP messages](#http-messages)
  - [Web servers and clients](#web-servers-and-clients)
  - [Network communication](#network-communication)
  - [:bangbang: Activity](#bangbang-activity)
  - [HTTP request message](#http-request-message)
  - [HTTP response message](#http-response-message)
- [HTTP headers dissected](#http-headers-dissected)
  - [Well-known header fields](#well-known-header-fields)
  - [Header field Content-Type](#header-field-content-type)
  - [Header field Content-Length](#header-field-content-length)
  - [Header field Content-Encoding](#header-field-content-encoding)
  - [Header field Content-MD5](#header-field-content-md5)
  - [Header field Expires](#header-field-expires)
  - [Header field Cache-Control](#header-field-cache-control)
  - [Header field Last-Modified](#header-field-last-modified)
  - [Header fields Connection & Upgrade](#header-fields-connection--upgrade)
  - [Status codes](#status-codes)
- [HTTP methods](#http-methods)
  - [Common HTTP methods](#common-http-methods)
  - [:bangbang: Activity](#bangbang-activity-1)
  - [From domain to IP address](#from-domain-to-ip-address)
- [Uniform Resource Locators (URLs)](#uniform-resource-locators-urls)
  - [URL syntax: query](#url-syntax-query)
  - [URL syntax: port](#url-syntax-port)
  - [Schemes: more than just HTTP(S)](#schemes-more-than-just-https)
  - [Relative vs. absolute URLs](#relative-vs-absolute-urls)
  - [URL design restrictions](#url-design-restrictions)
- [Authentication](#authentication)
  - [Authentication by user-related HTTP header fields](#authentication-by-user-related-http-header-fields)
  - [Authentication by Client-IP address tracking](#authentication-by-client-ip-address-tracking)
  - [Authentication by fat URLs](#authentication-by-fat-urls)
  - [Authentication by HTTP basic authentication](#authentication-by-http-basic-authentication)
- [Secure HTTP](#secure-http)
- [Self-check](#self-check)

## Required & recommended readings and activities

- Required readings: _none_
- Recommended activity:
  - :headphones: Listen to [this podcast](https://syntax.fm/show/044/how-to-learn-new-things-quickly) on how to learn new things quickly in the Web technology world.
- Recommended readings:
  - :closed_book: Chapters 1, 2 and 3 of [HTTP: The Definite Guide (O'REILLY 2002)](http://shop.oreilly.com/product/9781565925090.do).
  - [MDN's overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP).
  - Take a look at the developer tools' guide of your favorite web browser (e.g. [for Firefox](https://developer.mozilla.org/en-US/docs/Tools) or [for Chrome](https://developer.chrome.com/devtools)).
  - [A brief history of HTTP](https://hpbn.co/brief-history-of-http/).
  - [A crash course on HTTP and DNS (plus a deep dive into some security issues) by Lin Clark](https://hacks.mozilla.org/2018/05/a-cartoon-intro-to-dns-over-https/).
  - [A brief history of web standards](https://www.smashingmagazine.com/2019/01/web-standards-guide/) and how to make use of them.
- Relevant scientific publications:
  - Ihm, Sunghwan, and Vivek S. Pai. [Towards understanding modern web traffic](https://conferences.sigcomm.org/imc/2011/docs/p295.pdf). Proceedings of the 2011 ACM SIGCOMM conference.
  - Naylor, David, et al. [The cost of the S in HTTPS](https://dl.acm.org/doi/10.1145/2674005.2674991). Proceedings of the 2014 CoNEXT conference.
  - Falaki, Hossein, et al. [A first look at traffic on smartphones](http://conferences.sigcomm.org/imc/2010/papers/p281.pdf). Proceedings of the 2010 ACM SIGCOMM conference.
  - Mishra, Vikas, et al. [Don't Count Me Out: On the Relevance of IP Address in the Tracking Ecosystem](https://doi.org/10.1145/3366423.3380161). Proceedings of the 2020 WebConf conference.
  
## Web standards

![Web standards](../img/http-web.png)

<sup>Web standards. Image sourced from the linked video below.</sup>

To start off this lecture, take a look at this two-minute [video pitch](https://vimeo.com/110256895) from the World Wide Web Consortium, also known as the **W3C**. It tells us what web standards are and why they are important.

## :scroll: Learning goals

- Describe how web servers and clients interact with each other.
- Write HTTP messages that request web resources from web servers and understand the responses.
- Describe the different components of URLs and their purpose.
- Understand and employ HTTP authentication.

## World Wide Web vs. Internet

### A brief history of the web

The vision of the World Wide Web was already developed in the 1940s by Vannevar Bush, an American engineer who described his idea of a _memex_ (a combination of memory and index) in the article [As We May Think](https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/).

In the 1960s, the first steps from vision to reality were made by DARPA, the _Defense Advanced Research Projects Agency_ of the US department of defense. The so-called ARPANET was built for mail and file transfer and designed to withstand the loss of a portion of the network&mdash;as long as some connections remain active, those remaining connected parties should still be able to communicate.

It took about 30 years before the Internet was opened to the public in the late 1980s and among the first non-military participants were universities and organizations such as [CERN](https://home.cern/), the _European Organisation for Nuclear Research_. In fact, at CERN, Tim Berners-Lee created the World Wide Web: he was the first to successfully implement client-server communication on the Internet via the **hypertext transfer protocol** (in short: HTTP). **This protocol, and how it enables the web to function as we know it today, is what this lecture is all about.** At its basic level, the web can be described as **a system of interconnected hypertext documents, available via the Internet**. Tim Berners-Lee remains an important figure in the web community; he is the [current director of the Word Wide Web Consortium](https://www.w3.org/Consortium/facts#people).

In the early days of the web, browsers looked nothing like they do today; one of the earliest browsers was [Lynx](http://lynx.invisible-island.net/), a text-based browser that is functioning to this day. Take a look at how `google.com` and `amazon.com` are rendered on Lynx:

![](../img/http-lynx-google.png)

<sup>Google.com as rendered by the Lynx browser.</sup>

![](../img/http-lynx-amazon.png)

<sup>Amazon.com as rendered by the Lynx browser.</sup>

If you are inclined to try text-based browsers yourself, take a look at [browsh](https://www.brow.sh), a modern-day text-based browser.

Browsers with graphical user interfaces started to appear in 1994, the front-runner being Netscape, quickly followed by Microsoft's Internet Explorer. The first version of Mozilla Firefox was released in 2002, Google Chrome started out in 2008. [Brave](https://brave.com/) was launched in 2016, advertised as browser that takes users' privacy seriously.

The late 90s and early 2000s were hampered by the so-called [browser wars](https://en.wikipedia.org/wiki/Browser_wars)&mdash;the browser companies actively working against each other to gain a competitive advantage. Instead of adhering to a shared standard (as published by the Word Wide Web Consortium), different browser vendors implemented very different features and the labels _Best viewed with Netscape_ or _Best viewed with Internet Explorer_ were a common occurrence.

### Key aspects of the Internet

The web is built on top of the Internet. The Internet describes the hardware layer: it is spanned from **interconnected computer networks around the globe that all communicate through one common standard**, the so-called TCP/IP protocol suite.
The different sub-networks function autonomously, they do not depend on each other. There is not a single master&mdash;no machine or sub-network is in control of the whole network. It is very easy for machines or even entire sub-networks to join and leave the network without interrupting the flow of data among the remaining network.
All devices interact with each other through **agreed-upon open standards**. These standards are implemented in a wide range of open-source server and client software.

To show how far we have come, [take a look](https://twitter.com/workergnome/status/807704855276122114) at the **entire** state of the Internet in 1973.

### Two important organizations

The web and the Internet are not static, they are continuously changing. This development is led by two organizations:

- The Internet Engineering Task Force (**IETF**) leads the development of the Internet.
- The World Wide Web Consortium (**W3C**) leads the development of the web.

To many, the IETF is a lesser known organization, and while you may not often come across the IETF acronym, you will time and again encounter so-called RFCs. RFCs are **Request for Comments**, released by the IETF. They describe the Internet standards in detail. As an example, [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) is the document describing the Internet Message Format, aka email format, in about 50 A4 pages.

## HTTP messages

Let's now turn to HTTP, the hypertext transfer protocol, the focus of this lecture. The most important [versions](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP) of the protocol are the following:

- **HTTP/0.9** was the first version of the protocol. It was very limited in power, and developed between 1989-1991.
- **HTTP/1.1** is governed by [RFC 2068](https://www.ietf.org/rfc/rfc2068.txt); it was standardized in 1997. HTTP/1.1 is the first **standardized** version of HTTP.
- **HTTP/2** is governed by [RFC 7540](https://tools.ietf.org/html/rfc7540); it was standardized in 2015.
- **HTTP/3** has not been standardized yet, though a [RFC draft](https://tools.ietf.org/html/draft-ietf-quic-http-34) already exists.

HTTP/2 is the first new version of HTTP since HTTP/1.1. It originated at Google where it was developed as [SPDY protocol](https://developers.google.com/web/fundamentals/performance/http2/) (_speedy protocol_). For those interested, here is a [history lesson in the form of a Twitter thread](https://threadreaderapp.com/thread/1177480451193131009.html) about how HTTP/3 came to pass and what issues of earlier HTTP versions it addresses.

In this lecture, we focus on HTTP/1.1. Note though, that most of the concepts also apply to HTTP/2.

### Web servers and clients

On the web, clients and servers communicate with each other through **HTTP requests** and **HTTP responses**. If you open a web browser and type in the URL of your email provider, e.g. `https://gmail.com/`, your web browser is acting as the **client** sending an HTTP request. Your email provider is acting as the **server**, sending an HTTP response:

![HTTP request and response](../img/http-http-req-res.png)

<sup>Client-server communication on the web.</sup>

How does the communication between the two devices work? Servers wait for data requests continuously and are able to serve many HTTP requests at the same time. Servers host **web resources**, that is any kind of content with an identity on the web. This can be static files, web services, but also dynamically generated content. As long as they are accessible through an identifier, they can be considered as web resources.

The **client always initiates the communication**, sending an **HTTP request** to the server, e.g. to access a particular file. The server sends an **HTTP response**&mdash;if indeed it has this file and the client is authorized to access it, it will send the file to the client, otherwise it will send an error message. The client, i.e. most often the web browser, will then initiate an action, depending on the type of content received: HTML files are rendered, music files are played and executables are executed.
**HTTP proxies** are part of the Internet's infrastructure - there are many devices between a client and server that forward or process (e.g. filtering of requests, caching of responses) the HTTP requests and responses.

### Network communication

Let us now consider where HTTP fits into the **network stack**, i.e. the set of protocols ("stacked" on top of each other) that together define how communication over the Internet happens. A common representation of the network stack is the _Open Systems Interconnection model_ (or _OSI model_):

![Zimmermann's OSI model](../img/http-OSI.png)

<sup>Image sourced from the [OSI reference model paper](https://ieeexplore.ieee.org/abstract/document/1094702). For our purposes the two outer stacks can be considered client and server, the middle ones are HTTP proxies. An HTTP message travels down the network stack on the device being transformed in every layer potentially into multiple messages which are then transmitted via the physical network. At the other end, these messages travel up the device's network stack again, being transformed in every layer and then at the final layer the HTTP message is reassembled.</sup>

The above diagram is a simplification of the true network stack, and today mostly a textbook model, but it shows the main idea of network communication very well. Network protocols are matched into different layers, starting at the bottom layer, the **physical layer**, where we talk about bits, i.e. `0`s and `1`s that pass through the physical network, and ending at the **application layer**, were we deal with **semantic units** such as video segments and emails.

Many network protocols exist, to us only three are of importance:

- the Internet Protocol (**IP**),
- the Transmission Control Protocol (**TCP**), and
- the HyperText Transfer Protocol (**HTTP**).

HTTP resides at the top of the stack, and TCP builds on top of IP. Important to know is that HTTP is **reliable**. It inherits this property from TCP, which is reliable (in contrast to IP, which is not). This means, that the data appears **in order** and **undamaged**. This guarantee allows video streaming and other applications: HTTP **guarantees** that the video segments arrive at the client in the correct order; without this guarantee, all segments of a video would have to be downloaded and then assembled in the right order, before you could watch it.

<optional-info markdown="block">
Note, that this setup will change in HTTP/3. HTTP/3 resides on top of the User Datagram Protocol (UDP), a protocol without guarantees of message delivery and packet order. HTTP/3 itself will be responsible to ensure reliable transmissions in a highly efficient manner. This setup will lead to speedups over HTTP/1.1 and HTTP/2.
</optional-info>

### :bangbang: Activity

Open a modern browser and use its built-in **web development tools** to see what **HTTP messages** are exchanged when accessing a URL.

The Firefox developer tools can be reached from within the browser by heading to the browser's toolbar and navigating to `Tools » Browser Tools » Web Developer Tools`. The Chrome developer tools can be reached via the toolbar, navigating to `View » Developer » Developer Tools`. There are several panels, we here take a look at the **Network panel** on Firefox and how it looks after the user requested the URL [https://www.tudelft.nl/](https://www.tudelft.nl/):

![Browser built-in web dev tools](../img/http-devtools.png)

<sup>Firefox's developer tools. Screenshot taken August 28, 2020.</sup>

:point_up: You can see that the resource initially requested (`/`, i.e. the resource residing at the URL [https://www.tudelft.nl/](https://www.tudelft.nl/)) links to a myriad of additional web resources, which are then automatically requested by the web browser, leading to a **cascade of resource requests** (33 to be exact as shown in the bottom left of the network panel). Another vital piece of information when developing resource-intensive web applications is the [timing information](https://developer.mozilla.org/en-US/docs/Tools/Network_Monitor/request_details) (broken down into different stages) available for each HTTP request. It allows us to identify resources that are slow to load. In this example we see that it takes more than one second to receive a response from the server when requesting `/` and about three seconds to complete all requests.

Each resource is requested through an **HTTP request**. How exactly such a request looks like can be seen in Firefox's _Headers_ panel which appears within the Network panel when clicking on a particular resource row. To see the actual raw format of the headers that are sent (either as part of the HTTP request or HTTP response) as part of HTTP messages, toggle the `Raw` button :point_down::

![Browser built-in web dev tools](../img/http-devtools2.png)

<sup>Firefox's developer tools. Screenshot taken August 28, 2020.</sup>

Now that you have a first idea of what HTTP messages are about, we take a closer look at some of the details.

### HTTP request message

Remember that HTTP request messages are always sent by the client; they typically look like this:

```http
GET / HTTP/1.1
Host: www.tudelft.nl
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:31.0) Gecko/20100101 Firefox/31.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-gb,en;q=0.5
Accept-Encoding: gzip, deflate
DNT: 1
Cookie: __utma=1.20923577936111.16111.19805.2;utmcmd=(none);
```

:point_up: HTTP/1.1 is a **plain text protocol** and **line-oriented** (later protocol versions have switched to a binary protocol). The first line indicates what this message is about. In this case the keyword `GET` indicates that we are requesting a resource residing at `/`. The version number `1.1` indicates the highest version of HTTP that an application supports. Line 2 tells us from which host we request the resource: `www.tudelft.nl`. Once you start creating your own HTTP request messages, you may wonder why we need the `host` header, given that we provide a domain name or IP address (what this exactly means is explained later on in this transcript) before creating HTTP messages. We need the `host` header, because it enables **several domains** to reside at **the same IP address**. The client sending this request also provides additional information, such as which type of content it accepts, whether or not it is able to read encoded content, and so on. In line 8, you can see that in this request, a cookie is sent from the client to server.
### HTTP response message

The server that received the above HTTP request may now assemble the following response:

```http
HTTP/1.1 200 OK
Date: Fri, 22 Nov 2019 13:35:55 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 5994
Connection: keep-alive
Set-Cookie: fe_typo_user=d5e20a55a4a92e0; path=/; domain=tudelft.nl
[..other header fields..]
Server: TU Delft Web Server

[..body..]
```

:point_up: Here, `[..body..]` indicates other message content we are not interested in at the moment. The first line indicates the status of the response. In this case, the requested **resource exists** and the client is authorized to access it. Thus, the server sends back the status `200 OK`. The response is then structured into **response header fields** in the `name:value` format, and the **response body** which contains the actual content. The body is optional&mdash;if the requested resource is not found, an error status code without a body would be returned to the client.
The header fields contain important information for the client to understand the data being sent, including the type of content, the content length and so on. Without this information, the client would be unable to process the data in the correct manner.

## HTTP headers dissected

### Well-known header fields

More than fifty header fields exist, a number of well-known ones are the following:

| Header field             | Description                                         |
| :----------------------- | :-------------------------------------------------- |
| **Content-Type**         | Entity type                                         |
| **Content-Length**       | Length/size of the message                          |
| **Content-Encoding**     | Data transformations applied to the entity          |
| Content-Location         | Alternative location of the entity                  |
| Content-Range            | For partial entities, range defines the pieces sent |
| **Content-MD5**          | Checksum of the content                             |
| **Last-Modified**        | Date on which this entity was created/modified      |
| **Expires**              | Date at which the entity will become stale          |
| Allow                    | Lists the legal request methods for the entity      |
| **Connection & Upgrade** | Protocol upgrade                                    |

The header fields **in bold** will be covered below in more detail. Let's briefly describe the other ones:

- The `Content-Location` field can be useful if loading times are long or the content is corrupt (e.g. as found via a checksum computation); it can point to an alternative location where the same web resource resides.
- `Content-Range` is vital for entities that consist of multiple parts and are sent partially across different HTTP responses; without this information, the client would be unable to piece together the whole entity.
- `Allow` indicates to the client what type of requests can be made for the entity in question; `GET` is only one of a number of methods, it may also be possible to alter or delete a web resource.

### Header field Content-Type

This header field informs the client about the type of content being sent. 

We use **MIME types** for this purpose. **MIME** stands for _Multipurpose Internet Mail Extensions_ (governed by RFCs [2045](https://tools.ietf.org/html/rfc2045) and [2046](https://tools.ietf.org/html/rfc2046)) and was designed to solve problems when moving messages between electronic mail systems; it worked well and was adopted by HTTP to label its content.

MIME **types** determine how the client reacts: html is rendered, videos are played, and so on.
The pattern is always the same: each MIME type has a **primary object type** and a **subtype**.
Here are a few typical examples: `text/plain`, `text/html`, `image/jpeg`, `video/quicktime`, `application/vnd.ms-powerpoint`. As you can see in the `text/*` cases, the primary object type can have several subtypes.

<!---
1. download CC-*warc.wat files
2. extract the relevant json: more CC-MAIN-*wat |grep "^{" > tmp.txt
3. extract the mime types, count them up and list them in sorted order
4.
const file = process.argv[2];
var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(file)
});
let map = {};
lineReader.on('line', function (line) {
        let obj = JSON.parse(line);
        if( obj.Envelope["WARC-Header-Metadata"]["WARC-Identified-Payload-Type"]){
                let mime = obj.Envelope["WARC-Header-Metadata"]["WARC-Identified-Payload-Type"]
                let count = 1;
                if( map[mime]){
                        count = count + map[mime];
                }
                map[mime] = count;
        }
});
lineReader.on('close', function(line) {
        let sortable = [];
        for(let m in map){
                sortable.push([m,map[m]]);
        }
        sortable.sort(function(a,b){
                return a[1]-b[1];
        });
        console.log(sortable);
});
 --->

Diverse MIME types exist. Below is a list of some of the most popular and least popular MIME types among 170K web resources sampled from a 2019 large-scale [web crawl](http://commoncrawl.org/):

| Most popular          | Least popular                 |
| :---------------------| :---------------------------- |
| text/html             | video/quicktime               |
| application/xhtml+xml | text/rdf+n3                   |
| application/pdf       | application/postscript        |
| application/rss+xml   | application/x-bzip2           |
| image/jpeg            | application/msword            |
| application/atom+xml  | application/coreldraw         |
| text/plain            | audio/midi                    |
| application/xml       | application/vnd.ms-powerpoint |
| text/calendar         | application/pgp-signature     |

You should be able to recognize most of the popular types apart from `application/rss+xml` and `application/atom+xml`&mdash;those are two popular types of web feed standards.

If a server does not include a specific MIME type in the HTTP response header, the default setting of `unknown/unknown` is used.

### Header field Content-Length

This header field contains the **size of the entity body** in the HTTP response message. It has two purposes:

- To indicate to the client whether or not the entire message was received. If the message received is less than what was promised, the client should make the request again.
- To enable **persistent connections**. Building up a TCP connection costs time. Instead of doing this for every single HTTP request/response cycle, we can reuse the same TCP connection for multiple HTTP request/response messages. For this to work though, it needs to be known when a particular HTTP message ends and when a new one starts.

### Header field Content-Encoding

Content is often encoded, and often this means it is **compressed**. Four common encodings are:

- `gzip`
- `compress`
- `deflate`
- `identity`

The first three encodings above refer to different compression algorithms; the `identity` encoding indicates that no encoding should be employed.

**How do client and server negotiate acceptable encodings?** If the server would send content in an encoding for which the client requires specific software that is not available, the client would receive a blob of data that it cannot interpret. To avoid this situation, the client sends in its HTTP request a list of encodings it can deal with. This happens in the `Accept-Encoding` HTTP request header, e.g. `Accept-Encoding: gzip, deflate`.

But why bother with encodings at all? If an image or video is compressed by the server before it is sent to the client, **network bandwidth is saved**. There is a **tradeoff**, however: compressed content needs to be decompressed by the client, which **increases the processing costs**.

### Header field Content-MD5

Data corruption occurs regularly, the Internet spans the entire globe, billions of devices are connected to it. To route a message it has to pass through many devices, all of which run on software. And software is buggy (which in the worst case can lead to [catastrophic errors](https://raygun.com/blog/costly-software-errors-history/)).

MD5 stands for **message digest** and acts as a sanity check: the HTTP message content is hashed into a 128 bit value (the checksum). _Hashing_ means that data of arbitrary size is mapped to data of fixed size in a deterministic manner. The MD5 checksum algorithm is described in [RFC 1321](https://tools.ietf.org/html/rfc1321). Once a client receives an HTTP response message that contains an MD5 checksum (computed by the server based on the message body), it then computes the checksum of the messages body as well and compares it with the server-provided value. If there is a mismatch, the client should assume that the content has been corrupted along the way and thus it should request the web resource again.

`Content-MD5` remains in use today as a simple checking mechanism (e.g. [Amazon's S3 service relies on it](https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObject.html)), although it has been removed in the HTTP/1.1 revision of 2014, as indicated in [RFC 7231, Appendix B](https://tools.ietf.org/html/rfc7231): 

```
The Content-MD5 header field has been removed 
because it was inconsistently implemented with 
respect to partial responses.
```

This example shows that once something is established (by entering protocol implementations), it is almost impossible to "take it back" as the web has no centralized authority that can force its participating entities to adhere to a specific standard version and update its implementations accordingly. We will see this pattern time and again in this course, especially once we start discussing the JavaScript language.

### Header field Expires

**Web caches** make up an important part of the Internet. They cache **popular copies** of web resources. This reduces the load on the original servers that host these popular resources, reduces network bottlenecks and increases the responsiveness (web resources are delivered with less delay).
But how does a web cache _know_ for how long a web resource is valid? Imagine a web cache caching `nytimes.com` from the **origin server** (i.e. the server hosting `nytimes.com`)&mdash;this copy will quickly become stale and outdated. On the other hand, an RFC page that rarely changes may remain valid in the cache for a long time.

This is where the `Expires` header field comes in. It indicates to a web cache when a fetched resource is no longer valid and needs to be retrieved from the origin server.

![Web cache](../img/http-webcache.png)

<optional-info markdown="block"> 
Nowadays, web caching is just one part of the services a so-called **Content Delivery Network (CDN)** provides. A CDN consists of a network of geographically distributed servers whose purpose is the speedup of common services. CDNs are particularly important for streaming providers as users today have come to expect an almost immediate response to starting a song, a movie, etc. Netflix, for instance, has built its own CDN&mdash;if you are interested in the how and why, take a look at this [Netflix talk](https://www.youtube.com/watch?v=Lwh6Yd_kfsQ).
</optional-info>

### Header field Cache-Control

There is another header that is similar to the `Expires` header: `Cache-Control`. For our purposes, the most important difference between them is the manner in which they indicate staleness to the web cache. `Expires` uses an **absolute expiration date** (e.g. _December 1, 2021_) while `Cache-Control` uses a **relative time expressed in seconds** (e.g. `max-age=60`) since being sent. If both header fields are set, `Cache-Control` takes precedence.

Enabling the origin server to fix in advance how quickly a cached version of a resource goes stale was an important design decision. The alternative would have been to solely rely on web caches to query the origin servers to determine whether or not the cached resources are out of date&mdash;this would be inefficient though as these kind of enquiries would have to happen very frequently.

Here is an example of the header settings of [https://www.theguardian.com/international](https://www.theguardian.com/international), the frontpage of a UK-based news site:

![Cache-Control Guardian UK](../img/http-cache-control.png)

<sup>Response header (partially shown). Firefox, August 30, 2020. </sup>

Thus, the Guardian homepage goes stale after sixty seconds in a cache, a sensible timing, given the nature of news. You also see here that [`Cache-Control`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) directives can contain more than just the seconds-until-stale though most of these directives are beyond the scope of our lecture.

Finally, we note that modern browsers have an [HTTP cache](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching) as well, which works analogously to the introduced web cache, relying on the same HTTP header fields to make caching decisions. The browser's cache can be considered as a _private cache_ as it exists only on the local machine. The directive `private` in the Guardian's `Cache-Control` settings :point_up: tells the caches which ones are allowed to cache the response: in this case only the browser cache. In contrast, the directive `public` means that any type of cache can store a copy of the response. 

<debug-info markdown="block">
A browser's HTTP cache is at times the source of frustration for web developers. If you are updating the code of your web application, deploying it and testing it in your browser, it may appear to not have any effect. And then a round of debugging starts. However, there may be nothing wrong with your code, instead your browser may be relying on the cached version of your web application source code files. For development purposes, the browser's HTTP cache should be switched off. For Firefox, this means (1) opening a new tab and (2) typing `about:config` in the address bar. This gives you access to advanced configuration preferences. Then, (3) search for the preference name `http-cache` and (4) set it to false.  

Note, that this is only useful for development purposes, if you are also wanting to ensure that your application's users are not served cached versions, there are different ways to go about this (this is beyond the scope of this lecture, but you can take a look at this [StackOverflow question and its answers](https://stackoverflow.com/questions/49547/how-do-we-control-web-page-caching-across-all-browsers) for a start; bottom line: there is no easy one-size-fits-all solution).
</debug-info>

### Header field Last-Modified

The `Last-Modified` header field contains the date when the web resource was last altered. **There is no header field though that indicates how much the resource has changed.** Even if only a whitespace was added to a plain-text document, the `Last-Modified` header would change.

This header field is often employed in combination with the [`If-Modified-Since`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Modified-Since) header. When web caches actively try to revalidate web resources they cache, they only want the web resource sent by the origin server if it has changed since the `Last-Modified` date. If nothing has changed, the origin server returns a `304 Not Modified` response; otherwise the updated web resource is sent to the web cache.

`Last-Modified` dates have to be taken with a grain of salt. They are not always reliable, and can be manipulated by the origin server to make it seem as if novel content is regularly served which in the early years of web search engines was rumored to help search engine rankings.

### Header fields Connection & Upgrade

In HTTP/1.1 the client **always** initiates the conversation with the server via an HTTP request. For a number of use cases though this is a severe limitation. Take a look at these two examples from the [New York Times website](https://www.nytimes.com/) and [Twitter](https://www.nytimes.com/) respectively:

![New York Times live polling](../img/http-nytimes-example.png)

![Twitter update](../img/http-twitter-example.png)

In both examples, the encircled numbers are updated _on the fly_, without the user having to manually refresh the page.

This can be achieved through **polling**: the client **regularly** sends an HTTP request to the server, the server in turn sends its HTTP response and if the numbers have changed, the client renders the updated numbers. This of course is a wasteful approach&mdash;the client might send hundreds or thousands of HTTP requests (depending on the chosen update frequency) that always lead to the same HTTP response.

An alternative to polling is **long polling**: here, the client sends an HTTP request as before, but this time the server holds the request open until new data is available before sending its HTTP response. Once the response is sent, the client immediately sends another HTTP request that is kept open. While this avoids wasteful HTTP request/response pairs, it requires the server backend to be significantly more complex: the backend is now responsible for ensuring the right data is sent to the right client and scaling becomes an issue.

Both options are workarounds to the requirement of **client-initiated** HTTP request/response pairs. The IETF recognized early on that such solutions will not be sufficient forever and in 2011 standardized the **WebSocket protocol** ([RFC 6455](https://tools.ietf.org/html/rfc6455)). The RFC 6455 abstract read as follows :point_down: :

```
The WebSocket Protocol enables two-way communication between a client
running untrusted code in a controlled environment to a remote host
that has opted-in to communications from that code.  The security
model used for this is the origin-based security model commonly used
by web browsers.  The protocol consists of an opening handshake
followed by basic message framing, layered over TCP.  The goal of
this technology is to provide a mechanism for browser-based
applications that need two-way communication with servers that does
not rely on opening multiple HTTP connections (e.g., using
XMLHttpRequest or <iframe>s and long polling).
```

Thus, WebSockets enable true **bidirectional communication** between client and server. The server no longer has to wait for an HTTP request to send data to a client, but can do so _any time_&mdash;**as long as both client and server agree to use the WebSocket protocol**.

Client and server agree to this new protocol as follows: the client initiates the protocol _upgrade_ by sending a HTTP request with at least two headers: `Connection: Upgrade` (the client requests an upgrade) and `Upgrade: [protocols]` (one or more protocol names in order of the client's preference). Depending on the protocol the client requests, additional headers may be sent. The server then either responds with `101 Switching Protocols` if the server agrees to this upgrade or with `200 OK` if the upgrade request is ignored.

For a concrete example, explore the HTTP request/response headers of our [demo game](https://github.com/chauff/balloons-game). It relies on WebSockets to enable bidirectional communication between client and server. Firefox's network panel allows you once more to investigate the protocol specifics:

![Network monitor WebSockets](../img/http-websocket.png)

<sup>Network monitor panel. Firefox, November 5, 2021.</sup>

The client sends the following HTTP headers (shown here are only those relevant to the WebSocket connection) to request the upgrade to the WebSocket protocol:

```http
GET / HTTP/1.1
Host: localhost:3000
Sec-WebSocket-Version: 13
Origin: http://localhost:3000
Sec-WebSocket-Extensions: permessage-deflate
Sec-WebSocket-Key: PshjfQw+QSXKCdtISkhxoQ==
Connection: keep-alive, Upgrade
Upgrade: websocket
```

As you can see, besides `Connection` and `Upgrade` a number of other information is sent, including the `Sec-WebSocket-Key`.

The server accepts the protocol with the following headers:

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: mvSYriEU6WB1iTmKzBHEZwJGFtA=
```

The `Sec-WebSocket-Accept` value is derived from the hashed concatenation of the `Sec-WebSocket-Key` the client sent and the _magic string_ `258EAFA5-E914-47DA-95CA-C5AB0DC85B11` (i.e. a fixed string, as stated in the [WebSocket RFC](https://tools.ietf.org/html/rfc6455#section-11.3.3)); if the server sends the correct `Sec-WebSocket-Accept` response, the client has assurance that the server actually supports WebSockets (instead of wrongly interpreting HTTP header fields).

Lastly it is worth to mention that besides switching to the WebSocket protocol, another common switch is from HTTP/1.1 to HTTP/2.

### Status codes

To finish off this part about HTTP header fields, we take a look at the **response status codes**. You have just seen the `101` status code, which indicates that the server is switching to the protocol setup requested by the client. The status code is a very prominent part of the HTTP response&mdash;it appears in the first line of the response. 

Different status codes exist. They provide the client with some level of information about what is going on. Response status codes can be classified into five categories:

| Status codes | Type          |
| :----------- | :------------ |
| `1xx`        | Informational |
| `2xx`        | Success       |
| `3xx`        | Redirected    |
| `4xx`        | Client error  |
| `5xx`        | Server error  |

Status codes starting with 100 provide information to the client, e.g. `100 Continue` tells the client that the request is still ongoing and has not been rejected by the server.

Status code `200 OK` is the most common one&mdash;it indicates that the HTTP request was successful and the response contains the requested web resource (or a part of it).

Status codes in the three hundred range most often point to a **redirect**: a resource that was originally under URL `A` can now be found under URL `B`. These redirects are automatically resolved by the browser. You only notice a slightly longer loading time, otherwise redirects do not affect browser users. The network monitor shows you what exactly this delay amounts:

![Network monitor redirect](../img/http-redirect.png)

<sup>Network panel after entering `http://delft.nl` into the address bar. Firefox, August 31, 2020.</sup>

:point_up: Here, the URL [http://delft.nl](http://delft.nl) was entered into the browser's address bar. The browser renders the expected page (the homepage of the city of Delft), however, in the background it took three HTTP requests to retrieve the resource at path `/`. The status codes `302 Moved Temporarily` and `301 Moved Permanently` indicate that the resource at `http://delft.nl` has been moved elsewhere: first to `https://delft.nl` and then to `https://www.delft.nl`. Each time, the `Location` header tells us the new location.

Status codes in the four hundred range indicate an error on the client side. Most well known here is `404: Not Found`, that is, the web resource or entity the client requests, does not exist on the server.

Errors on the server side are indicated by status codes in the five hundred range. One common status code is `502: Bad gateway`. Ideally, server-side error codes should not be visible to clients as they can reveal a lot of information about the server's software setup, which aids malicious users.

## HTTP methods

Consider the first line of our introductory [HTTP request message](#http-request-message) example again:

```http
GET / HTTP/1.1
```

So far, we have only seen `GET` requests, i.e. requests to get access to some web resource. `GET` however is only one of a number of **HTTP methods**, which we will introduce next.

### Common HTTP methods

The following are the most common HTTP methods:

- `GET` retrieves a web resource.
- `HEAD` returns the header of a HTTP response only (but not the web resource itself).
- `POST` sends data from the client to the server for processing.
- `PUT` saves the body of the request on the server; if you have ever used the File Transfer Protocol (ftp) you are already familiar with `PUT`.
- `TRACE` can be used to trace where a message passes through before arriving at the server.
- `OPTIONS` is helpful to determine what kind of methods a server supports.
- `DELETE` can be used to remove resources from a web server.

This is not an exhaustive list of methods and not all servers enable or implement all the methods shown here.

### :bangbang: Activity

Let's see how this protocol works in practice. One of the learning goals of this lecture is to be able to **make HTTP requests yourself**. And once again, remember that we stick to HTTP/1.1.

One tool to practice HTTP request writing is `telnet`. Telnet is defined in [RFC 15](https://tools.ietf.org/html/rfc15); this low RFC numbering should tell you that it is a very old standard - it is from 1969. It is described as follows:

```
A sub-system called "Telnet" is proposed which is a shell 
program around the network system primitives, allowing a 
teletype or similar terminal at a remote host to function 
as a teletype at the serving host.
```

Telnet **opens a TCP connection to a web server** (this requires a port number, for now just take this information as-is, you will learn more about port numbers in a bit) and anything you type into the telnet terminal is sent to the server. The server treats telnet as a web client and all returned data is displayed on the terminal.

<debug-info markdown="block">
Telnet **is not capable of dealing with https** (i.e. **secure** http). Keep this in mind when you are trying this activity with web resources of your own. When you practice HTTP requests *over https*, you need to use [openssl](https://www.openssl.org/) instead of telnet.
</debug-info>

In the next few paragraphs, we describe in detail how to practice writing HTTP messages yourself via telnet and openssl. Before we start though, we here show the entire terminal session in one go:

<asciinema-player src="../cast/mit-telnet-openssl.cast" cols="80" rows="18"></asciinema-player>

<sup>HTTP requests made via telnet (http) and openssl (https).</sup>

Every line of the protocol is completed with a _carriage return_ (i.e., press <kbd>Enter</kbd>). The protocol also has _empty lines_, those are indicated below with a `<carriage return>` tag (again, just press <kbd>Enter</kbd>). **All indented lines are returned by the server and do not have to be typed out.**

In order to close a telnet session, enter the telnet prompt. To do so, press <kbd>Ctrl</kbd> + <kbd>]</kbd>. This You should now see `telnet>` on your terminal; type `quit` and press <kbd>Enter</kbd> to close the session.

We start off with http and telnet. We are conducting our telnet activity on [mit.edu](http://mit.edu), the homepage of the Massachusetts Institute of Technology&mdash;we use it as it is one of the more popular URLs that are still accessible over http.

**Use `HEAD` to get information about the page**:

```
telnet mit.edu 80
    Trying 88.221.9.235...
    Connected to mit.edu.
    Escape character is ‘^]’
HEAD / HTTP/1.1
host:mit.edu
<carriage return>
    HTTP/1.1 302 Moved Temporarily
    Server: AkamaiGHost
    Content-Length: 0
    Location: http://web.mit.edu/
    Date: Mon, 14 Dec 2020 18:01:44 GMT
    Connection: keep-alive
    ...
```

**Use `HEAD` to see what is at the moved location** (note that `mit.edu` and `web.mit.edu` refer to different locations):

```
telnet web.mit.edu 80
    Trying 104.73.43.233...
    Connected to e9566.dscb.akamaiedge.net.
    Escape character is '^]'.
HEAD / HTTP/1.1
host:web.mit.edu
<carriage return>
    HTTP/1.1 301 Moved Permanently
    Server: AkamaiGHost
    Content-Length: 0
    Location: https://web.mit.edu/
    Date: Mon, 14 Dec 2020 18:02:23 GMT
    Connection: keep-alive
    ...
```

At this point, we need to switch to openssl (as the redirect location is `https`) to continue down this path and retrieve the content available at the URL's location. Note the changed port number (443); this is the default port for https. We use `GET` to retrieve the content:

```
openssl s_client -crlf -connect web.mit.edu:443
    ...
    ...
GET / HTTP/1.1
host:web.mit.edu
<carriage return>
    HTTP/1.1 200 OK
    Server: Apache
    Last-Modified: Mon, 14 Dec 2020 05:02:53 GMT
    ETag: "10e8a584-89a9-5fd6f1fd"
    ...
```

This is it. We have followed the redirects and retrieved the one resource we were after. The browser takes care of all of these intermediate steps for you.

### From domain to IP address

Have you noticed something in the activity you just completed? We connected to the domain `mit.edu` on port `80` and immediately got the response: `Trying 88.221.9.235`. This is called an **IP address** or _Internet Protocol address_.

The Internet maintains two principal namespaces: the **domain name hierarchy** and the **IP address system**. While domain names are handy for humans, the IP address system is used for the communication among devices.

The entity responsible for translating a domain name into an IP address is called the **Domain Name System server** or DNS server; it is essentially a world-wide distributed directory service that needs to be continuously updated and synced. The DNS protocol was first described in [RFC1034](https://tools.ietf.org/html/rfc1034) and in the meantime has been amended by more than fifteen additional RFCs. This indicates the complexity of the problem the DNS protocol is solving.
Several public DNS servers exist, a popular one is operated by Google, called [Public DNS](https://developers.google.com/speed/public-dns/).
Version 4 IP addresses (IPv4), just as the one shown above, consist of 32 bits; they are divided into 4 blocks of 8 bits each. 8 bit can encode all numbers between 0 and 255. This means, that in this format, a total of **2^32 unique IP addresses** or just shy of 4.3 billion unique IP addresses can be generated.

This might sound like a lot, but just think about how many devices you own that connect to the Internet. This problem was foreseen already in the early 1990s and over time a new standard was developed by the IETF and published in 1998: [the **IPv6** standard](https://tools.ietf.org/html/rfc8200). An IPv6 address consists of 128 bit, organized into 8 groups of four hexadecimal digits. This means, that up to 2^128 unique addresses can be generated, that is such a large number that meaningful comparisons are hard to come by. In decimal form, 2^128 is a number with 39 digits! A large enough address space to last us almost forever.

Why are we still using IPv4? Because transitioning to the new standard takes time&mdash;a lot of devices require software upgrades (and nobody can force the maintainers to upgrade) and things still work, so there is no immediate sense of urgency.

[Google keeps track of the percentage of users using its services through IPv6](https://www.google.com/intl/en/ipv6/statistics.html#tab=ipv6-adoption&tab=ipv6-adoption). As of November 2021 about 37% of users rely on IPv6, a slow and steady increase. It is just a matter of years until IPv4 is replaced by IPv6.

While we typically use domain names, we can also use IP addresses directly in the browser's address bar. One quick way of determining the IP address of a domain is the `ping` command: it sends an echo request package to a destination and awaits the reply, measuring the round-trip time as part of it and listing the IP address as a by-product. For example, `ping www.google.com` tells us that the corresponding IP address is `142.251.36.36` (a single domain can be tied to several IP addresses to enable large-scale operations and thus you are likely to receive a different IP address when trying out this command):

<asciinema-player src="../cast/ping-example.cast"  cols="80" rows="18"></asciinema-player>

## Uniform Resource Locators (URLs)

Let's now take a closer look at the format of _Uniform Resource Locators_ (URLs). You are probably typing those into your browser at least a few times a day, let's see how well you know them! To get you started, here is a short quiz.

**How many of the following URLs are valid?**

- `mailto:c.hauff@tudelft.nl`
- `ftp://anonymous:mypass@ftp.csx.cam.ac.uk/gnu;date=today`
- `http://www.bing.com/?scope=images&nr=1#top`
- `https://duckduckgo.com/html?q=delft`
- `http://myshop.nl/comp;typ=c/apple;class=a;date=today/index.html;fr=delft`
- `http://правительство.рф`

<details> 
  <summary>Click to find out the answer! </summary>
   All URLs are valid. 
</details>

URLs are the common way to access any resource on the Internet; the format of URLs is standardized. You should already be relatively familiar with the format of URLs accessing resources through HTTP and HTTPS. Resource access in other protocols (e.g. `ftp`) is similar, with only small variations.

In general, a URL consists of up to 9 parts:

`<scheme>://<user>:<pw>@<host>:<port>/<path>;<params>?<query>#<frag>`

which have the following meaning:

- `<scheme>`: determines the protocol to use when connecting to the server.
- `<user>:<pw>`: the username/password combination which may be necessary to access a resource.
- `<host>`: the domain name (host name) or numeric IP address of the server.
- `<port>`: the port on which the server is expecting requests for the resource. Ports enable multiplexing: multiple services are available on one location. 
- `<path>`: the local path to the resource.
- `<params>`: additional input parameters applications may require to access a resource on the server correctly. Parameters can be set per path segment.
- `<query>`: parameters passed to gateway resources, e.g. applications (identified by the path) such as search engines.
- `<frag>`: the name of a piece of a resource. Only used by the client. The fragment is not transmitted to the server.

### URL syntax: query

One of the most important URL parts for us is the syntax for a `query`.  Let's consider `https://duckduckgo.com/html?q=delft`. This URL points to the Duckduckgo website and contains the `q=delft` query. This query component is passed to the application accessed at the web server&mdash;in this case, DuckDuckGo's search system. Returned to us is a list of search results for the keyword `delft`. This syntax is necessary to enable interactive application.
By convention we use `name=value` to pass application variables. If an application expects several variables, e.g. not only the search string but also the number of expected search results, we combine them with an ampersand (`&`): `name1=value1&name2=value2& ...`. 

As URLs cannot contain spaces an obvious next question is how we deal with searches that contain spaces such as `delft weather` or `delft number of university students`. In URL query components, whitespaces are typically encoded with the reserved character `+` which leads to `https://duckduckgo.com/?q=delft+weather`.

### URL syntax: port

When typing a URL into the browser's address bar, we seemingly do not have to worry about ports as we rarely encounter one in URLs. This, however, is only the case because of the use of **default ports**: if no port is provided in the URL, the browser uses the default port of the scheme. For `http` port `80` is the default port (as stated in its [RFC](https://datatracker.ietf.org/doc/html/rfc2616#section-3.2.2)) and for `https` it is port `443` (as stated in its [RFC](https://datatracker.ietf.org/doc/html/rfc2818#section-2.3)).

### Schemes: more than just HTTP(S)

`http` and `https` are not the only protocols that exist. `http` and `https` differ in their encryption&mdash;`http` does not offer encryption, while `https` does. `mailto` is the email protocol, `ftp` is the file transfer protocol. 

The local file system can also be accessed through the URL syntax as `file://<host>/<path>`. As an example, to view file `tmp.html` which resides in the directory `/Users/claudia` in the browser, we can use the URL `file:///Users/claudia/tmp.html`.

### Relative vs. absolute URLs

URLs can either be **absolute** or **relative**. Absolute URLs contain the full address of the resource (scheme, host and port) while relative URLs lack those elements.

Relative URLs are typically found in HTML documents:

```html
<!-- HTML extract -->
<h1>Resources</h1>
<ol>
  <li><a href="brightspace">Brightspace</a></li>
  <li><a href=" ../disclaimer">Disclaimer</a></li>
</ol>
```

If in this example we consider the absolute URL `https://www.tudelft.nl/` as our _base URL_, we can derive from relative plus base URLs the respective absolute URLs:

```
https://www.tudelft.nl/students/brightspace
https://www.tudelft.nl/disclaimer
```

An absolute URL can be used to retrieve a web resource without requiring any additional information. The two relative URLs above by themselves do not provide sufficient information to resolve to a specific web resource. 

Relative URLs require a **base URL** to enable their conversion into absolute URLs. By default, this base URL is derived from the absolute URL of the resource the relative URLs are found in. The base URL of a resource is everything up to and including the last slash in its path name.

The base URL is used to convert the relative URLs into absolute URLs. The conversion in the first case (`brightspace`) is straightforward, the relative URL is appended to the base URL. In the second case (`../disclaimer`) you have to know that the meaning of `..` is to move a directory up, thus in the base URL the `/students` directory is removed from the base and then the relative URL is added.

Note, that this conversion from relative to absolute URL can be governed by quite complex rules, they are described in [RFC 3986](https://www.ietf.org/rfc/rfc3986.txt).

### URL design restrictions

When URLs were first developed they had two basic design goals:

1. to be **portable across protocols**;
2. to be **human readable**, i.e. they should not contain invisible or non-printing characters.

The development of the Internet had largely been driven by US companies and organization and thus it made sense - at the time - to limit URL characters to the [ASCII alphabet](https://en.wikipedia.org/wiki/ASCII): this alphabet includes the Latin alphabet and additional reserved characters (such as `!`, `(`, `)`, `+`, etc.). The limitation is already apparent in the name: ASCII stands for _American Standard Code for Information Interchange_ and thus heavily favours the English language.

Later, **character encoding** was added, e.g. a whitespace becomes `%20`. If a URL such as `https://www.tudelft.nl.nl/event calendar 2020.pdf` is entered into a modern browser, it is automatically encoded as `https://www.tudelft.nl.nl/event%20calendar%202020.pdf` before the HTTP request is made. In this manner, characters that are not part of ASCII can be encoded through a **combination** of ASCII characters.

Character encodings are not sufficient though, what about languages that are not based on the Latin alphabet (what about URLs like `http://правительство.рф` which uses the cyrillic script)? Ideally, URLs should allow non-Latin characters as well, which today boils down to the use of the [Unicode standard](https://unicode.org/standard/standard.html):

```
The Unicode Standard is a character coding system designed 
to support the worldwide interchange, processing, and display 
of the written texts of the diverse languages and technical 
disciplines of the modern world.
```

As of 2020, more than 140,000 characters have been included in the Unicode standard.

How does this help us to use URLs with non-Latin characters? **Punycode** ([RFC 3492](https://www.ietf.org/rfc/rfc3492.txt)) was developed to allow URLs with unicode characters to be translated **uniquely and reversibly** into an ASCII string. Quoting the RFC abstract:

```
Punycode is a simple and efficient transfer encoding syntax 
designed for use with Internationalized Domain Names in 
Applications (IDNA). It uniquely and reversibly transforms a 
Unicode string into an ASCII string.  ASCII characters in the 
Unicode string are represented literally, and non-ASCII 
characters are represented by ASCII characters that are allowed 
in host name labels (letters, digits, and hyphens).
```

The cyrillic URL example above transforms into the following ASCII URL: `http://xn--80aealotwbjpid2k.xn--p1ai/`. A URL already in ASCII format remains the same after Punycode encoding.

One word of caution though: **mixed scripts** (i.e. using different alphabets in a single URL) are a potential security issue! Consider the following URL: `https://рayрal.com`. It looks like `https://paypal.com`, the well-known e-payment website. It is not! **Don't take our word for it, try it out in your own browser.** Notice that the Russian letter _r_ looks very much like a latin _p_ and a potential attacker can use this knowledge to create a fake paypal website (to gather credit card information) and lead users on with the malicious, but on first sight correctly looking paypal URL.

## Authentication

The last topic we cover as part of our excursion into HTTP is authentication. **Authentication is any process by which a system verifies the identity of a user who wishes to access it.**

So far, we have viewed HTTP as an anonymous and **stateless** request/response protocol. This means that the same HTTP request is treated in exactly the same manner by a server, independent of who or what entity sent the request. We have seen that each HTTP request is dealt with independently, the server does not maintain a state for a client which makes even simple forms of tracking (e.g. how often has a client requested a particular web resource) impossible.

But of course, this is not how today's web works: servers **do** identify devices and users, most web applications indeed track their users very closely. We now cover the mechanisms available to us on the web to identify users and devices. We consider four options in this lecture:

- HTTP headers;
- client IP addresses;
- user login;
- fat URLs.

If you are already familiar with web development you may miss in this list several other options (such as cookies). We cover these concepts in a later lecture. Let's now discuss in turn the four options listed above.

### Authentication by user-related HTTP header fields

The HTTP header fields we have seen so far were only a few of all possible ones. Several HTTP header fields can be used to provide information about the user or her context. Some are shown here&mdash;they are all request header fields, that is, sent from client to server:

| Request header field | Description                 |
| :------------------- | :-------------------------- |
| `From`               | User's email address        |
| `User-Agent`         | User's browser              |
| `Referer`            | Resource the user came from |
| `Client-IP`          | Client's IP address         |
| `Authorization`      | Username and password       |

The first three header fields contain information about the user such as an email address, the identifying string for the user's device (though here device is rather general and refers to a particular type of mobile phone, not the specific phone of this user), and the resource (typically the web page) the user came from.

In reality, users rarely publish their email addresses through the `From` field, this field is today mostly used by web crawlers; in case they break a web server due to too much crawling, the owner of the web server can quickly contact the humans behind the crawler via email. The `User-Agent` allows device/browser-specific customization, but not more (and it is not always reliable). Here is a concrete example of the `User-Agent` a Firefox browser may send: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:68.0) Gecko/20100101 Firefox/68.0`. A number of services (e.g. [userstack](https://userstack.com/)) exist that provide interpretations of the user-agent string. The `Referer` is similarly crude: it can tell us something about a user's interests (because the user had just visited that resource) but does not enable us to uniquely identify a user.

To conclude, the HTTP headers `From`, `Referer` and `User-Agent` are not suitable to track the modern web user.

### Authentication by Client-IP address tracking

As an alternative, we can authenticate users via client IP address tracking, either extracted from the HTTP header field `Client-IP` or the underlying TCP connection. This would provide us with an ideal way to authenticate users **_IF_** every user would be assigned a distinct IP address that rarely or never changes.

However, we know that IP addresses are assigned to machines, not users. Internet service providers do not assign a unique IP to each one of their user-device combinations, they **dynamically** assign IP addresses to users' devices from a common address pool. A user device's IP address can thus change any day.

Today's Internet is also more complicated than just straightforward client and servers. We access the web through firewalls which obscure the users' IP addresses, we use proxies and gateways that in turn set up their own TCP connections and come with their own IP addresses.

To conclude, in this day and age, IP addresses cannot be used anymore to provide a reliable authentication mechanism.

### Authentication by fat URLs

That brings us to fat URLs. The options we have covered so far are not good choices for authentication, fat URLs on the other hand are in use to this day.

The principle of fat URLs is simple: users are tracked through the generation of **unique URLs for each user**. If a user visits a web site for the first time, the server recognizes the URL as not containing a _fat element_ and assumes the user has not visited the site before. It generates a unique ID for the user. The server then redirects the user to that fat URL. Crucially, in the last step, the server **on the fly rewrites the HTML** for every single user, adding the user's ID to each and every hyperlink. A rewritten HTML link may look like this: `<a href="/browse/002-1145265-8016838">Gifts</a>` (note the random numbers string at the end of the relative URL).

In this manner, different HTTP requests can be tied together into a single **logical session**: the server is aware which requests are coming from the same user through the ID inside the fat URLs.

Let's look at this concept one more time, based on the following toy example :point_down: :

![Fat URL toy example](../img/http-fatURLs.png)

<sup>Usage of fat URLs: a toy example.</sup>

On the left :point_up: you see a shop web site, consisting of the entry page `my-shop.nl` and two other pages, one for books and one for gifts. The entry page links to both of those pages. These URLs do not contain a fat element. The first time a user requests the entry page `my-shop.nl`, the server recognizes the lack of an identifier in the URL and generates one. Specifically for that user, it also rewrites the HTML of the entry page: its hyperlinks now contain the unique ID. The server then redirects the user to `my-shop.nl/43233` and serves the changed HTML content. In this manner, as long as the user browses through the shop, the user remains authenticated to the server. This authentication approach is still relatively weak though as the user can navigate to `my-shop.nl` again and to receive a new unique identifier.

**Fat URLs have issues**:

1. First of all, they are *ugly*, instead of short and easy to remember URLs you are left with overly long ones.
2. Fat URLs should not be shared&mdash;you never know what kind of history information you share with others if you hand out the URLs generated for you!
3. Fat URLs are also not a good idea when it comes to web caches as these caches rely on the _one page per request_ paradigm; fat URLs though follow the _one page per user_ paradigm.
4. Dynamically generating HTML every time a user requests a web resource adds to the server load.
5. All of this effort does not completely avoid loosing the user: as soon as the user navigates away from the sitee, the user's identification is lost.

To conclude, fat URLs are a valid option for authentication as long as you are aware of the issues they have.

### Authentication by HTTP basic authentication

Let's move on to the final authentication option we consider here: **HTTP basic authentication**. You are already familiar with this type of authentication: the server asks the user **explicitly** for authentication by requesting a valid username and a password.
HTTP has a built-in mechanism to support this process through the `WWW-Authenticate` and `Authorization` headers. Since HTTP is **stateless**, once a user has logged in, the login information has to be resend to the server with every single HTTP request the user's device is making.

Here is a concrete example of HTTP basic authentication:

![Basic authentication example](../img/http-basicauth.png)

<sup>Overview of HTTP basic authentication.</sup>

We have the usual server (on the left) and client (on the right) setup :point_up:. The client sends an HTTP request to access a particular web resource, in this case the `index.html` page residing at `www.microsoft.com`.

The server sends back a `401 Unauthorized` status code, indicating to the client that this web resource requires authentication. It also sends back information about the supported authentication scheme (in this case: `Basic`). There are several authentication schemes, but we will only consider the basic one here. The _realm_ describes the protection area: if several web resources on the same server require authentication within the same realm, a single user/password combination should be sufficient to access all of them.

In response to the `401` status code, the client presents a login screen to the user, requesting the username and password. The client sends username and password encoded (**but not encrypted**) to the server via the HTTP `Authorization` header field.

If the username/password combination is correct, and the user is allowed to access the web resource, the server sends an HTTP response with the web resource in question in the message body.

For future HTTP requests to the site, the browser **automatically sends along** the stored username/password. It does not wait for another request.

As just mentioned, the username/password combination are encoded by the client, before being passed to the server. The **encoding scheme** is simple: the username and password are joined together by a colon and converted into **base-64 encoding** (described in detail in [RFC 4648](https://tools.ietf.org/html/rfc4648#section-4)). It is a simple _binary-to-text_ encoding scheme that ensures that only HTTP compatible characters are entered into the message.

For example, in base-64 encoding `Normandië` becomes `Tm9ybWFuZGnDqw==` and `Delft` becomes `RGVsZnQ=`.

It has to be emphasized once more that encoding has nothing to do with encryption. The username and password sent via basic authentication can be decoded trivially, they are sent over the network _in the clear_.
This by itself is not critical, as long as users are aware of this. However, users tend to be lazy, they tend to reuse the same or similar login/password combinations for a wide range of websites of highly varying criticality. Even though the username/password for site `A` may be worthless to an attacker, if the user only made a slight modification to her usual username/password combination to access site `B`, let's say her online bank account, the user will be in trouble.

Overall, basic authentication is the best of the four authentication options discussed; it prevents accidental or casual access by curious users to content where privacy is desired but not essential. Basic authentication is useful for personalization and access control within a friendly environment such as an intranet.

In the wild, i.e. the general web, basic authentication should only be used in combination with secure HTTP. We look at it next.

## Secure HTTP

So far we have seen _lightweight authentication_ approaches. Those are not useful for bank transactions or confidential data. Secure HTTP should provide:

- server authentication (client is sure to talk to the right server);
- client authentication (server is sure to talk to the right client);
- integrity (client and server are sure their data is intact);
- encryption;
- efficiency;
- adaptability (to the current state of the art in encryption).

**HTTPS** is the most popular secure form of HTTP. The URL scheme is `https` instead of `http`. Now, request and response data are **encrypted** before being sent across the network. In the layered network architecture, an additional layer is introduced: the Secure Socket Layer (SSL). It sits below the HTTP layer and above the TCP layer.

Importantly, client and server have to **negotiate** the cryptographic protocol to use: the most secure protocol both sides can handle. The encryption employed is only as secure as the weaker side allows: if the server has the latest encryption protocols enabled but the client has not been updated in years, a weak encryption will be the result.

## Self-check

Here are a few questions you should be able to answer after having followed the transcript:

<details> 
  <summary>True or False? The <span markdown="span">Content-MD5</span> header field in an HTTP response provides a public key to decrypt the message body.</summary>
  False.
</details>

<details> 
  <summary>True or False? The base-64 encoding in HTTP basic authentication ensures that only the correct username and password are transmitted.</summary>
  False.
</details>

<details> 
  <summary>True or False? The client's credentials need to be sent in every single HTTP request to a server requiring basic authentication.</summary>
  True.
</details>

<details> 
  <summary>What does long polling refer to in the context of HTTP?</summary>
  Long polling emulates a push mechanism that is missing in HTTP/1.1: the client sends an HTTP request; the server holds the request open until new data is available before sending its HTTP response. Once the response is sent, the client immediately sends another HTTP request that is kept open.
</details>

<details> 
  <summary>What does <span markdown="span">Accept-Encoding:identity</span> indicate?</summary>
  Sent in the request header. The client only understands content that
is not compressed.
</details>

<details> 
  <summary>What do persistent connections refer to in the context of HTTP?</summary>
  A single TCP connection is used to send and receive multiple HTTP requests and responses.
</details>

<details> 
  <summary>True or False? Web caches make use of the <span markdown="span">Expires</span> header field to determine when a fetched resource is no longer valid.</summary>
  True.
</details>

<details> 
  <summary>Is the following HTTP request message valid?
  <div markdown="1">
  ```http
  GET HTTP/1.1 /
  Host: www.tudelft.nl
  User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:31.0)
  Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
  Accept-Language: en-gb,en;q=0.5
  DNT: 1
  Cookie: __utma=1.20923577936111.16111.19805.2;utmcmd=(none);
  ```
  </div>
  </summary>
  It is invalid as the syntax of the first line is incorrect. The correct syntax is the following: <span markdown="span">GET / HTTP/1.1</span>.
</details>

<details> 
  <summary>If an HTTP request message contains the following line, what does this mean?
  <div markdown="1">
  ```
  Authorization: Basic dXNlcjpwYXNzd2Q=
  ```
  </div>
  </summary>
  The client attempts to authenticate itself with a server, usually after the server responded with an <span markdown="span">Unauthorized</span> response to an earlier HTTP request for a particular resource.
</details>

<details> 
  <summary>True or False? In HTTP/1.1 the client always initiates the conversation with the server.</summary>
  True.
</details>

<details> 
  <summary>True or False? HTTP/1.1 supports bidirectional communication between client and server.</summary>
  False.
</details>

<details>
  <summary>What does the header field <span markdown="span">Cache-Control:max-age=100</span> mean if it is sent in an HTTP response? You can assume that the HTTP response was sent today.</summary>
  The web cache through which the HTTP response passes, caches the resource sent in the HTTP response. If an HTTP request for the cached resource arrives at the cache more than two minutes after the response was cached, the web cache will revalidate the resource by querying the origin server
</details>

<details> 
  <summary>True or False? A PUT method request can lead to the creation of a new resource on the server.</summary>
  True.
</details>

<details> 
  <summary>True or False? PUT sends data from server to client; the client determines how to handle the data.</summary>
  False.
</details>
