const fs = require("fs");

const file = process.argv[2];

fs.watch(file, () => {
    console.log("File changed!");
});

console.log(`Now watching ${file}`);
