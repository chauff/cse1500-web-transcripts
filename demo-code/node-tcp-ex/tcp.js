const fs = require("fs");
const net = require("net");

// command line arguments: file to watch and port number
const filename = process.argv[2];
const port = process.argv[3];

const server = net.createServer((connection) => {
    // what to do on connect
    console.log("Subscriber connected");
    connection.write(`Now watching ${filename
    } for changes\n`);

    const watcher = fs.watch(filename, () => {
        connection.write(`File ${filename
        } has changed: ${Date.now()}\n`);
    });

    // what to do on disconnect
    connection.on("close", () => {
        console.log("Subscriber disconnected");
        watcher.close();
    });
});

server.listen(port, () => {
    console.log("Listening to subscribers...");
});
