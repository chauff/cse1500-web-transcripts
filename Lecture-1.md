# HTTP: the language of Web communication

## Web standards

A [video pitch](https://vimeo.com/110256895) by the World Wide Web Consortium (also known as `W3C`): what are Web standards and what makes Web standards so important?

## Learning goals

- Describe how Web servers asnd clients interact with each other
- Write HTTP messages that request Web resources from Web servers and understand the responses
- Describe the different components of URLs and their purpose
- Understand and employ basic HTTP authentication
- Explain the difference between HTTP and HTTPS

## World Wide Web vs. Internet

### A brief history of the Web

The vision of the World Wide Web was already developed in the 1940s by Vannevar Bush, an American engineer who described his idea of a *memex* (a combination of memory and index) in the article [As We May Think](https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/). The Web can simply be described as **a system of interconnected hypertext documents, available via the Internet**.

In the 1960s, the first steps from vision to reality were made by DARPA, the *Defense Advanced Research Projects Agency* of the US department of defense. The so-called ARPANET was built for mail and file transfer and designed in a way to withstand the loss of a portion of the network; as long as some connections remain, the remaining connected parties should still be able to communicate. 

It took about 30 years, before the Internet was opened to the public (in the late 1980s) and among the first non-military participants were universities and organisations such as [CERN](https://home.cern/), the *European Organisation for Nuclear Research*. In fact, at CERN, Tim Berners-Lee created the World Wide Web: he was the man who first successfully implemented client-server communication on the Internet via the **hypertext transfer protocol** (or HTTP). Tim Berners-Lee remains an important figure on the Web development today, in fact, he is the current director of the Word Wide Web Consortium.

In the early days of the Web, the "browser" looked nothing like they do today; one of the earliest one was Lynx, a text-based browser. Here is an example of such a text-based browser, Lynx, which you can still use today:

<img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Lynx-wikipedia.png" width="600">

Browsers with graphical user interfaces started to appear in 1994, the frontrunner being Netscape, quickly followed by Microsoft. The first version of Mozilla Firefox was released in 2002, Google Chrome started out in 2008. The late 90s and early 2000s were hampered by the so-called [browser wars](https://en.wikipedia.org/wiki/Browser_wars) - the browser companies actively working against each other to gain competitive advantages. Instead of adhering to a shared standard (as today published by the Word Wide Web Consortium), different browsers implemented very different features and the label *Best viewed with Netscape* or *Best viewed with Internet Explorer* were a common occurrence.

### Key aspects of the Internet

The Web is built on top of the Internet. The Internet describes the hardware layer: it is spanned from **interconnected computer networks around the globe that all communicate through one common standard**, the so-called TCP/IP protocol.
The different sub-networks function autonomously, they do not depend on each other. There is not a single master - no machine or sub-network is in control of the whole network. It is very easy for machines or even entire sub-networks to join and leave the network without interrupting the flow of data among the remaining network.
All devices interact with each other through agreed-upon open standards which are very easy to use as these standards are implemented in a wide range of open-source server and client software.

To show how far we have come, [here](https://qz.com/860873/a-1973-map-of-the-internet-charted-by-darpa/) is the state of the Internet in 1973. 

### Two important organizations

The Web and the Internet are not static, they are continuously in development. This development is led by two organisations: the **IETF** - the *Internet Engineering Task Force* - leads the development of the Internet. The **W3C** - the *World Wide Web Consortium* - leads the development of the Web. The IETF to many is a less well-known (but equally important) organization than the W3C, and while you may not often come across the IETF acronym, you will time and again encounter the so-called RFCs. RFCs are **Request for Comments**, released by the IETF. They describe the Internet standards in detail. As an example, [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) is the document describing the Internet Message Format, aka email format, in about 50 pages.

## HTTP messages

- **HTTP/1.1** is governed by [RFC 2068](https://www.ietf.org/rfc/rfc2068.txt); it was standardised in 1997.
- **HTTP/2** is governed by [RFC 7540](https://tools.ietf.org/html/rfc7540); it was standardized in 2015.

HTTP/2 is the first new version of http since HTTP/1.1. It originated at Google where it was developed as SPDY protocol ("speedy protocol"); [more details here](https://developers.google.com/web/fundamentals/performance/http2/). According to current estimates, about 30% of websites support HTTP/2. As HTTP/1.1 is still the dominant protocol type, we focus on it in our lecture.

### Web servers and clients

On the Web, clients and servers communicate with each other through HTTP requests and responses. If you open a Web browser and type in the URL of your email provider, e.g. `https://gmail.com/` your Web browser is acting as the **client**. The **server** is your email provider. 
How does the communication between the two devices work? Servers wait for data requests continuously and are able to serve thousands of client requests at the same time. Servers host **Web resources** that is any kind of content with an identity on the Web. This can be static files, but also software programs or Web cam gateways. As long as they are accessible through an identifier, they can be considered as Web resources. 
The **client initiates the communication**, sending an **HTTP request** to the server, e.g. to access a particular file. The server sends an **HTTP response** - if indeed it has this file it will send it to the client, otherwise it will send an error message. The client, i.e. most often the Web browser, will then initiate an action, depending on the type of content received - HTML files are rendered, music files are played and executables are executed.

### Network communication

Where does HTTP fit into the **network stack**? A very common representation of the network stack is the ****OSI model**, the *Open Systems Interconnection model*. It is a simplification of the true network stack, and today mostly a textbook model, but it shows the main idea of network communication very well. Network protocols are matched into different layers, starting at the bottom layer, the **physical layer**, where we talk about bits, i.e. zeroes and ones that pass through the physical network, and ending at the **application layer**, were we end up with semantic units such as video segments and emails.

Many network protocols exist, to us only three are of importance:

- the Internet Protocol (or IP), 
- the Transmission Control Protocol (or TCP)
- and HTTP itself.

HTTP is at the top of the stack, and TCP builds on top of IP. Important to know is the following: HTTP is **reliable**; the data appears **in order** and **undamaged**! This guarantee allows video streaming and other applications: HTTP **guarantees** that the video segments arrive at the client in the correct order; without this guarantee, all segments of a video would have to be downloaded and then assembled in the right order, before you could watch it!

### !Activity!

Open your favourite browser and use its built-in **Web development tools** (all modern browsers have those) to see what is going on in terms of HTTP messages when loading a website. 

![Browser built-in Web dev tools](img/devtools.png)

You can see several panels, for the different types of data that are downloaded or created when a Web site loads. To load a seemingly simple site like [https://www.tudelft.nl/](https://www.tudelft.nl/), many different Web resources are actually needed. The resource initially requested (`/`, i.e. the page residing at the URL you chose) links to a myriad of additional Web resources, which are then automatically requested by the Web browser as well, leading to a **cascade of resource requests**.
Each resource is requested separately by your browser. How exactly is it requested? Through an HTTP request! And how exactly that looks you can view in the Headers tab (and not just the request header, but also the response header):

![Browser built-in Web dev tools](img/devtools2.png)

You will also notice that the HTTP requests differ slightly between different types of Web resources (e.g. image vs. html page).

### HTTP request message
<a name="http-request"></a>

Below is a typical HTTP request message:

```bash
GET / HTTP/1.1
Host: www.tudelft.nl
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:31.0) Gecko/20100101 Firefox/31.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-gb,en;q=0.5
Accept-Encoding: gzip, deflate
DNT: 1
Cookie: __utma=1.20923577936111.16111.19805.2;utmcmd=(none);
```

HTTP is a **plain text protocol** and **line-oriented**. 
The first line indicates what this message is about. In this case the keyword `GET` indicates that we are requesting something. The version number (`1.1`) indicates the highest version of HTTP that an application supports.  What are we requesting? Line 2 answers this question, we are requesting the Web resource at `www.tudelft.nl`. The client sending this request also provides additional information, such as which type of content it accepts, whether or not it is able to read encoded content, etc. In the last line, you can see that in this request, a cookie is sent from the client to the server as well. 

### HTTP response message
<a name="http-response"></a>

The server that received the HTTP request above now assembles the following response (note that `[..xx..]` indicates other messsage content we are not interested in at the moment):

```bash
HTTP/1.1 200 OK
Date: Fri, 01 Aug 2014 13:35:55 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 5994
Connection: keep-alive
Set-Cookie: fe_typo_user=d5e20a55a4a92e0;  path=/; domain=tudelft.nl
[..other header fields..]
Server: TU Delft Web Server

[..body..]
```
The first line indicates the status of the response - in this case, the requested resource exists and the server sends back the status `200 OK`: everything is okay, the resource was found and is send to you.
The response is then structured into **header fields**, in the format of `name:value`, and the **response body** which contains the actual content. The body is optional - if the requested resource is not found, an error status code without a body would be returned to the client.
The header fields contain important information for the client to understand the data being sent, including the type of content, the length and so on. As you can see here, the server can also send cookies to the client in the header fields.


## HTTP headers dissected


### Important entity header fields

Many header fields exist, the most important ones (though to some extent this remains an arbitrary choice) are listed below:

| Header field     | Description                                         |
|------------------|-----------------------------------------------------|
| **Content-Type**     | Entity type                                         |
| **Content-Length**   | Length/size of the message                          |
| Content-Language | Language of the entity sent           |
| **Content-Encoding** | Data transformations applied to the entity          |
| Content-Location | Alternative location of the entity                  |
| Content-Range    | For partial entities, range defines the pieces sent |
| **Content-MD5**      | Checksum of the content                             |
| **Last-Modified**    | Date on which this entity was created/modified      |
| **Expires**          | Date at which the entity will become stale          |
| Allow            | Lists the legal request methods for the entity      |


The bold header fields will be covered below. Let's briefly walk over the other fields:

- The `Content-Language` indicates the language the entity is in, which can be English, Dutch or any other language. 
- The `Content-Location` can be useful if loading times are long or the content seems wrong; it can point to an alternative location where the same Web resource resides. 
- `Content-Range` is important for entities that consist of multiple parts and are sent partially across different http responses; without this information, the client would be unable to piece together the whole entity.
- Finally, `Allow` indicates to the client what type of requests can be made for the entity in question; `GET` is only one of a number of methods, it may also be possible to alter or delete a Web resource.

Lets look at a few of these fields a bit more in detail.


### Content-Type

**MIME** stands for *Multipurpose Internet Mail Extensions* and was designed to solve problems when moving messages between electronic mail systems; it worked well and was adopted by HTTP to label its content.
**MIME types* determine how the client reacts - html is rendered, videos are played and so on.
The pattern is always the same: each MIME type has a **primary object type** and a **subtype**.
Here are a few typical examples: `text/plain`, `text/html`, `image/jpeg`, `video/quicktime`, `application/vnd.ms-powerpoint`. As you can see in the `text/*` cases, the primary object type can have several subtypes.

MIME types can be very diverse. Here is a list of the most and least popular MIME types found on a sample of a large-scale [Web crawl](http://commoncrawl.org/) in 2014:

| Most popular         | Least popular               |
|----------------------|-----------------------------|
| text/html            | application/pgp-keys        |
| image/jpg            | application/x-httpd-php4    |
| text/xml             | chemical/x-pdb              |
| application/rss+xml  | model/mesh                  |
| text/plain           | application/x-perl          |
| application/xml      | audio/x_mpegurl             |
| text/calendar        | application/bib             |
| application/pdf      | application/postscript      |
| application/atom+xml | application/x-msdos-program |

You should be able to recognise most of the popular types; `application/rss+xml` and `application/atom+xml` are two popular types of Web feed standards. Note, that if a server does not include a specific MIME type the default setting becomes `unknown/unknown`.

Among the least popular MIME types are application specific types such as `chemical/x-pdb` for protein databank data and others.

### Content-Length

The content-length contains the size of the entity body in the message.

It has two purposes: 

1. to indicate to the client whether or not the entire message was received. If the message received is less than what was promised the client will make the same request again.

2. The header is also of importance for so-called *persistent connections*. Building up a TCP connection costs time. Instead of doing this for every single HTTP request/response cycle, we can reuse the same TCP connection for multiple HTTP request/response messages. For this to work though, it needs to be known when a particular HTTP message ends and when a new one starts. 

### Content-Encoding

Content is often encoded, and in particular **compressed**. The four common encodings are `gzip`, `compress`, `deflate` or `identity`, the latter indicates that no encoding should be used.
How do client and server negotiate acceptable encodings? If the server would send content in an encoding for which the client requires specific software to decode but does not have, the client receives a blob of data but is unable to interpret it. To avoid this situation, the client sends in the HTTP request a list of encodings it can deal with. This happens in the `Accept-Encoding` request header, e.g. `Accept-Encoding: gzip, deflate`.

Why bother with encodings at all? If an image or video is compressed by the server before it is sent to the client, network bandwidth is saved. There is a **tradeoff** however: compressed content needs to be decompressed by the client, which increases the processing costs. 

### Content-MD5

Data corruption occurs regularly, the Internet spans the entire globe, billions of devices are connected to it. To route a message it has to pass through several devices, all of which run on software. And software is buggy. MD5 acts as a sanity check.

MD5 stands for **message digest** and is an important data verification component: the message content is hashed into a 128 bit value. Once the client receives the http response it computes the checksum of the content as well and compares it with the checksum in the header field. If there is a mismatch, the client assumes that the content is corrupted and requests the content again.

### Expires

**Web caches** make up an important part of the Internet. They cache **popular copies** of Web resources. This reduces the load on those servers that host these popular resources, reduces a network bottleneck and increases the responsiveness (the delay is decreased).
But how does a Web cache know for how long a Web resource is valid? Imagine a Web cache caching `nu.nl` from the origin server (i.e. the server hosting `nu.nl`) - this copy will quickly become stale and outdated. On the other hand, an RFC page that rarely changes may be valid in the cache for a long time.

This is where the `Expires` header field comes in. It indicates to a Web cache when a fetched resource is no longer valid and needs to be retrieved from the origin server.

### Expires & Cache-Control

There is another header that is similar to `Expires`: `Cache-Control`. They differ in the manner they indicate staleness to the Web cache: `Expires` uses an **absolute expiration date**, e.g. December 1, 2021, while `Cache-Control` uses a **relative time**, e.g. 3600 seconds since being sent.

Enabling the origin server to fix in advance how quickly a cached version of a resource goes stale was an important design decision. The alternative would have been to solely rely on Web caches to query the original server to determine whether or not the cached resources are out of date - this would be inefficient though as these kind of queries would have to happen very frequently.

### Last-Modified

A final header field we consider is `Last-Modified`. It contains the date when the Web resource was last altered. There is no header field though that indicates **how much** the resource has changed. Even if only a whitespace was added to a plain text document, the `Last-Modified` header would change.

It is often used in combination with `If-Modified-Since`. When Web caches actively try to revalidate Web resources they cache, they only want the Web resource sent by the origin server if it has changed since the `Last-Modified` date. If nothing has changed, the origin server simply returns a `304 Not Modified` response; otherwise the updated Web resource is sent to the Web cache.

`Last-Modified` dates should be taken with a grain of salt. They are not always reliable, and can be manipulated by the origin server to ensure high cache validation rates for instance.

### Status codes

To finish off this part about HTTP header fields, we take a look at the response status codes. You have just read about the `304` status code, sent by the origin server in the response after a request from the Web cache asking about an updated copy of a Web resource.

If you look at the [first HTTP response example](#http-response), you will see that the status code is a very prominent part of the HTTP response - it appears in the very first line of the response. In this case the status code is `200`.

Quite a few different status codes exist that provide the client with some level of information on what is going on. Response status codes can be classified into five categories:

| Status codes         |                 |
|----------------------|------------------------------|
| 1XX                  | Informational                |
| 2XX                  | Success (200 OK)             |
| 3XX                  | Redirected                   |
| 4XX                  | Client error (404 Not Found) |
| 5XX                  | Server error                 |

Status codes starting with 100 provide information to the client, e.g. `100 Continue` tells the client that the request is still ongoing and has not been rejected by the server. A status code we will come across in later lectures is `101 Switching Protocols` when we discuss WebSockets; this response code indicates the server switching to a protocol as requested by the client. 

Status code `200` is the most common one - it indicates that the HTTP request was successful and the response contains the requested Web resource (or a part of it). 

Status codes starting with 3 most often point to a redirect: a resource that was originally under URL `A` can now be found under URL `B`. These redirects are automatically resolved by the browser - you only notice a slightly longer loading time, otherwise redirects do not affect browser users.

Status codes starting with 4 indicate an error on the client side - most well known here is `404: Not Found`, i.e. the Web resource or entity the client requests, does not exist on the server. 
Errors on the server side start with 5; one relatively common status code is `502: Bad gateway`.

## HTTP methods

Recall the first line of the [HTTP request message](#http-request) above:

```bash
GET / HTTP/1.1
```

So far, we have only seen `GET` requests, i.e. requests to get access to some Web resource. `GET` however is only one of multiple so-called **HTTP methods**.

### Common HTTP methods

There are 7 common HTTP methods:
- `GET` you have already seen.
- `HEAD` returns the header of a HTTP response only (not the content)
- `POST` sends data from the client to the server for processing
- `PUT` saves the body of the request on the server; if you have ever used ftp you are already familiar with put
- `TRACE` can be used to trace where a message passes through before arriving at the server
- `OPTIONS` is helpful to determine what kind of methods a server supports and finally
- `DELETE` can be used to remove documents from a Web server

This is by no means an exhaustive list of methods and not all servers enable or implement all the methods shown here. This list shows just the most common methods in use today.

### !Activity!

Lets see how this protocol works in practice. One of the learning goals of this lecture is to be able to make HTTP requests yourself. 
One basic tool to practice HTTP request writing is `telnet`. Telnet is a protocol defined in [RFC 15](https://tools.ietf.org/html/rfc15) (this low number should tell you that it is a very old standard - it is from 969). Software that implements the client-side part of the protocol is also called telnet. Telnet opens a TCP connection to a Web server (this requires a port number, for now just take it as is, you will learn more about port numbers in a bit) and anything you type into the telnet terminal is sent to the server. The server treats telnet as a Web client and all returned data is displayed in the terminal.

Try out the following examples yourself (everything indented is returned by the server and does not have to be typed out; `[carriage return]` indicates when/how often to press `Enter`):

**Use `HEAD` to just get information about the page**

```bash
$ telnet microsoft.com 80
    Trying 134.170.185.46
    Connected to microsoft.com
    Escape character is ‘^]’
HEAD / HTTP/1.1
host:microsoft.com
[carriage return]
[carriage return]
    HTTP/1.1 301 Moved Permanently
    [...]
    Location: http://www.microsoft.com
```


**Use `HEAD` to see what is at the moved location**

```bash
$ telnet www.microsoft.com 80
    Trying 134.170.185.46
    Connected to microsoft.com
    Escape character is ‘^]’
HEAD / HTTP/1.1
host:www.microsoft.com
[carriage return]
[carriage return]
    HTTP/1.1 200 OK
    [...]
    Content-Type: text/html
```

**Use `GET` to retrieve the content**

```bash
$ telnet www.microsoft.com 80
GET / HTTP/1.1
host:www.microsoft.com
[line feed]
[line feed]
```

(check out Microsoft's message that is returned here; investigate what a *User-Agent string* is)

**Use `GET` to retrieve content from another path**

```bash
$ telnet www.microsoft.com 80
    Trying 134.170.185.46
    Connected to microsoft.com
    Escape character is ‘^]’
GET /en/us/default.aspx?redir=true HTTP/1.1
host:www.microsoft.com
[line feed]
[line feed]
    HTTP/1.1 301 Moved Permanently
    Location: http://www.microsoft.com/en-us/default.aspx?redir=true
```

By now it should be clear that multiple requests may be required to end up with the wanted resource. The Web browser handles these redirects transparently. Lastly, you also saw that Web servers can recognise to some extent the source of a request and act accordingly; we did not include a user agent string to identify ourselves as requester and were given a response that assumed a machine-generated request.

### From domain to IP address

Have you noticed something in the activity you just completed (hopefully)? We connected to the domain `microsoft.com` on port `80` and immediately got the response: `Trying 134.170.185.46`. This is called an **IP address** (an *Internet Protocol address*). 

The Internet maintains two principal namespaces: the **domain name hierarchy** and the **IP address system**. While domain names are handy for humans, the IP address system is used for the communication among devices. 

The entity responsible for translating the domain into an IP address is called the **Domain Name System server** or DNS server. Several exist, a popular one is operated by Google, called [Public DNS](https://developers.google.com/speed/public-dns/).
Version 4 IP addresses (IPv4) consist of 32 bits; they are divided into 4 blocks of 8 bits each. 8 bit can encode all numbers between 0 and 255. This means, that in this format, a total of **2^32 unique IP addresses** or just shy of 4.3 billion unique IP addresses can be generated. 

This might sound like a lot, but just think about how many devices you own that connect to the Internet ... This problem was foreseen already in the early 1990s and over time a new standard was developed by the IETF (published in 1998). This is the **IPv6** standard. An IPv6 address consists of 128 bit, organised into 8 groups of four hexadecimal digits. This means, that up to 2^128 unique addresses can be generated, that is such a large number that meaningful comparisons are hard to come by. In decimal form, 2^128 is a number with 39 digits! A large enough address space to last us forever.

Why are we still using IPv4? Because transitioning to the new standard takes time - a lot of devices require software upgrades and things still work, so there is no immediate sense of urgency.

[Google keeps track of the percentage of users using its services through IPv6](https://www.google.com/intl/en/ipv6/statistics.html#tab=ipv6-adoption&tab=ipv6-adoption). As of late 2018 about 25% of users rely on IPv6, a slow and steady increase - it is just a matter of time until IPv4 is replaced by IPv6.

## Uniform Resource Locators (URLs)

Let's now take a closer look at the format of Uniform Resource Locators or in short URLs. You are probably typing those into your browser at least a few times a day, let's see how well you know them! To get you started, here is a short quiz.

**How many of the following URLs are valid?**

- `mailto:c.hauff@tudelft.nl`
- `ftp://anonymous:mypass@ftp.csx.cam.ac.uk/gnu;date=today`
- `http://www.bing.com/?scope=images&nr=1#top`
- `https://duckduckgo.com/html?q=delft`
- `http://myshop.nl/comp;typ=c/apple;class=a;date=today/index.html;fr=delft`
- `http://правительство.рф`

[Find out](#answer)

URLs are the common way to access any resource on the Internet; the format of URLs is standardized. You should already be relatively familiar with the format of URLs accessing resources through http or https. Resource access in other protocols (e.g. `ftp`) is similar, with only small variations.

In general, a URL consists of up to 9 parts

```
<scheme>://<user>:<password>@<host>:<port>/<path>;<params>?<query>#<frag>
```

From back to front:
- `<frag>`: The name of a piece of a resource. Only used by the client - the fragment is not transmitted to the server.
- `<query>`: Parameters passed to gateway resources, i.e. applications [identified by the path] such as search engines.
- `<params>`: Additional input parameters applications may require to access a resource on the server correctly. Can be set per path segment.
- `<path>`: the local path to the resource
- `<port>`: the port on which the server is expecting requests for the resource
- `<host>`: domain name (host name) or numeric IP address of the server
- `<user>:<password>`: the username/password (may be necessary to access a resource)
- `<scheme>`: determines the protocol to use when connecting to the server.

### URL syntax: query

One of the most important URL types for us is the syntax for a `query`. What does that mean? Let's consider `https://duckduckgo.com/html?q=delft`. This is an example of a URL pointing to the Duckduckgo website that - as part of the URL - contains the `q=Delft` query. This query component is passed to the application accessed at  the Web server - in this case Duckduckgo's search system and returned to you is a list of search results for the query *Delft*. This syntax is necessary to enable interactive application. 
By convention we use `name=value` to pass application variables. If an application expects several variables, e.g. not only the search string but also the number of expected search results, we combine them with an `&`: `name1=value1&name2=value2& ...`

### Schemes: more than just http(s)

We have already touched upon the fact that `http` and `https` are the most common protocols, but certainly not the only ones. `http` and `https` differ in their encryption - `http` does not offer encryption, while `https` does. `mailto` is the email protocol, `ftp` is the file transfer protocol. The local file system can also be accessed through the URL syntax as `file://<host>/<path>`, e.g. to view `tmp.html` from the directory `/Users/my_home` in the browser, you can use `file:///Users/my_home/tmp.html`. 

### Relative vs. absolute URLs

URLs can either be **absolute** or **relative**. Shown below are examples of both types:

Absolute (our base URL):
```
http://www.st.ewi.tudelft.nl/~hauff/new/index.html
```

Relative:
```html
<h1>Visualizations</h1>
<ol>
	<li><a href="vis/trecvis.html">TREC</a></li>
	<li><a href=" ../airsvis.html">AIRS</a></li>
</ol>
```
Those relative URLs in combination with the base URL above lead to
```
http://www.st.ewi.tudelft.nl/~hauff/new/vis/trecvis.html
http://www.st.ewi.tudelft.nl/~hauff/airsvis.html
```

The absolute URL at the top can be used to retrieve a Web resource without requiring any additional information. The two URLs below are relative as they by themselves do not provide sufficient information to resolve to a specific Web resource. They are embedded in HTML markup which, in this case, resides within the Web page pointed to by the absolute URL at the top. 

Relative URLs require a **base URL** to enable their conversion into absolute URLs. By default, this base URL is derived from the absolute URL of the Web page the relative URLs are found in. The base URL of a resource is everything up to and including the last slash in its path name. 

The base URL is used to convert the relative URLs into absolute URLs. The conversion in the first case (`vis/trecvis.html`) is straightforward, the relative URL is appended to the base URL. In the second case (`../airsvis.html`) you have to know that the meaning of `..` is to move a directory up, thus in the base URL the `/new` directory is removed from the base and then the relative URL is added. 
Note, that this conversion can be governed by more complex rules, they are described in [RFC 3986](https://www.ietf.org/rfc/rfc3986.txt).

### URL design restrictions

When URLs were first developed they had two basic design goals: 

1. to be **portable across protocols**;
2. to be **human readable**, i.e. they should not contain invisible or non-printing characters. 

The development of the Internet had largely been driven by US companies and organization and thus it made sense - at the time - to limit URL characters to the [ASCII alphabet](https://en.wikipedia.org/wiki/ASCII): this alphabet includes the Latin alphabet and additional reserved characters (such as !, (, ), ...). The limitation is in the name: ASCII stands for *American Standard Code for Information Interchange* and thus heavily favours English speakers.

Added later was the character encoding, e.g. a whitespace becomes `%20`. That means, that characters that are not part of ASCII can be encoded through a combination of ASCII characters.
Character encodings are not sufficient though, what about languages that are not even based on the Latin alphabet (what about URLs like `http://правительство.рф`)? Ideally, URLs should allow non-Latin characters as well, which today boils down to the use of unicode characters. 

IETF comes once again to the rescue! **Punycode** ([RFC 3492](https://www.ietf.org/rfc/rfc3492.txt)) was developed to allow URLs with unicode characters that are then translated uniquely and reversibly into an ASCII string.

The cyrillic URL example above transforms into this ASCII URL: `http//:xn—80aealotwbjpid2k.xn—p1ai`. A URL already in ASCII format remains the same after the Punycode encoding.

One word of caution though: **mixed scripts** (i.e. using different alphabets in a single URL) are a potential security issue: consider the following URL: `http://рayрal.com`; copy it and try it out in your browser. It looks like paypal.com the well-known e-payment website. It is not! Notice that the Russian letter *r* looks very much like a latin *p* and a potential attacker can use this knowledge to create a fake paypal website (to gather credit card information) and lead users on with the wrong, but on first sight correctly looking paypal URL.

## Authentication



