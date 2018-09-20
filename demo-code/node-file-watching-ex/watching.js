var fs = require('fs');

var file = process.argv[2];

fs.watch(file, function () {
	console.log("File changed!");
});

console.log("Now watching " + file);