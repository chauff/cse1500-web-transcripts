//@ts-check

const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');
const url = require('url');

const absURL = "https://chauff.github.io/cse1500-web-transcripts/";

const regex = /\]\(.*?\)/g;//simple regex to extract markdown links

const outFile = fs.createWriteStream('urlCheck.txt');
outFile.write("URL check @ " + new Date() + "\n");

/* Markdown files to include:
 * all markdown files in the root directory excluding README.md (i.e. only index.js is read)
 * all markdown files in _practicals
 * all markdown files in _lectures
 */
let parseMarkdownFiles = (function () {
    let foldersToCheck = ["/", "_practicals", "_lectures"];

    foldersToCheck.forEach(function (folder) {

        fs.readdir(path.join(__dirname, folder), function (err, files) {
            if (err) {
                return console.log("\tError reading directory: " + err);
            }

            files.forEach(function (file) {
                if (file.endsWith(".md") && !file.startsWith("README")) {

                    //read the file
                    fs.readFile(path.join(__dirname, folder, file), 'utf8', function (err, data) {
                        if (err)
                            return console.log("\t\tError reading file: " + err);

                        //extract all links
                        const links = data.match(regex);

                        //no links found
                        if (links == null) {
                            return;
                        }

                        for (let i = 0; i < links.length; i++) {
                            let link = links[i].slice(2, -1).toLowerCase();//get rid if "](" and ")"

                            let protocol = null;

                            //remove relative links
                            if (link.startsWith("https")) {
                                protocol = https;
                            }
                            else if (link.startsWith("http:")) {
                                protocol = http;
                            }
                            else if (link.startsWith("..") || link.startsWith("/")) {
                                protocol = https; //we remain on github
                                link = url.resolve(absURL, link);
                            }
                            else if (protocol == null) {
                                continue;
                            }
                            else
                                ;

                            //check status code
                            protocol.get(link, (res) => {
                                outFile.write("[" + res.statusCode + "] " + file + " => " + link + "\n");

                            }).on('error', (e) => {
                                outFile.write("[ERROR] " + e.message + " " + file + " => " + link + "\n");
                            });
                        }
                    });
                }
            })
        })
    });
})();


