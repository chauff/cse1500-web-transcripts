const express = require("express");
const http = require("http");
const cookies = require("cookie-parser");
const credentials = require("./credentials");

console.log(`credentials: ${credentials.cookieSecret}`);
const app = express();
app.use(cookies(credentials.cookieSecret));

const port = process.argv[2];
http.createServer(app).listen(port);

app.get("/sendMeCookies", (req, res) => {
    console.log("Handing out cookies");
    res.cookie("chocolate", "kruemel");
    res.cookie("signed_chocolate", "monster", { signed: true });
    res.send();
});

app.get("/listAllCookies", (req, res) => {
    console.log("++ unsigned ++");
    console.log(req.cookies);
    console.log("++ signed ++");
    console.log(req.signedCookies);
    res.clearCookie("chocolate");
    res.send();
});
