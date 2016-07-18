if (process.argv.length != 4) {
	console.log('usage: node encrypt.js password /path/to/file');
	process.exit(1);
}


var fs = require('fs');

var sjcljs = fs.readFileSync('sjcl.js', {encoding: 'utf-8'});
require('vm').runInThisContext(sjcljs);

var tmpl = fs.readFileSync('tmpl.html', {encoding: 'utf-8'});
var data = sjcl.encrypt(process.argv[2], fs.readFileSync(process.argv[3], {encoding: 'utf-8'}));
var result = tmpl.replace('{sjcl.js}', sjcljs).replace('{encryptedData}', data);

console.log(result);
