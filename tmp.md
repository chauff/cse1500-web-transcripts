# A1:Server-side Injection

## Definition

 Injection flaws occur when untrusted data is sent 
 to an interpreter as part of a command or query. 
 The attacker’s hostile data can trick the interpreter 
 into executing unintended commands or accessing data without proper authorization. 

 ## What

When `eval()`, `setTimeout()`, `setInterval()`, `Function()` are used to process user provided inputs, it can be exploited by an attacker to inject and execute malicious JavaScript code on server. 

Web applications using the JavaScript `eval()` function to parse the incoming data without any type of input validation are vulnerable to this attack. An attacker can inject arbitrary JavaScript code to be executed on the server. Similarly `setTimeout()`, and `setInterval()` functions can take code in string format as a first argument causing same issues as `eval()`.

This vulnerability can be very critical and damaging by allowing attacker to send various types of commands.