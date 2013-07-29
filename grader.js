#!/usr/bin/env node

var fs = require('fs');
var rest = require('restler');
var program = require('commander');
var cheerio = require('cheerio');
var HTMLFILE_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT = "checks.json";
var URLFILE_DEFAULT = '0'; //"https://fierce-reaches-1073.herokuapp.com";

program
     .version('0.0.1');

var assertFileExists = function(infile) {
    var instr = infile.toString();
    if (!fs.existsSync(instr)) {
	console.log("%s does not exist. Exiting.", instr);
	process.exit(1); // http://nodejs.org/api/process.html#process_process
_exit_code
    }
    return instr;
};


var getUrl = function(urlfile, callback) {
    rest.get(urlfile).on('complete', function(result) {
      callback(result);
 });
};
    

var urlHtmlFile = function(urlfile, callback) {
      getUrl(urlfile, function(linka) {
                              //htmlstring=linka;
     callback(cheerio.load(linka));
//     console.log(cheerio.load(linka));
                              //var cheriohtml=cherio.load(htmlstring);
     });
 
                           //   return cheerio.load(htmlstring); //getUrl(urlfile, function(linka) {
    
//	htmlstring = linka;
//	console.log(htmlstring);
//        callback(htmlstring);
//    }
//   ));
//  console.log(htmlstring);
//  return htmlstring;
 };

// konec

var cheerioHtmlFile = function(htmlfile) {
    return cheerio.load(fs.readFileSync(htmlfile)); //take htmlfile into function cheerio(index.html)
};

var loadChecks = function(checksfile) {
    return JSON.parse(fs.readFileSync(checksfile)); //load checksfile into function JSON.parse - convert to array
};

var checkHtmlFile = function(urlfile, htmlfile, checksfile) {
        urlHtmlFile(urlfile, function(prevod) {
//	   console.log(prevod);
// }           
// );
//    console.log(urlfile, htmlfile, checksfile);

//       $ = prevod;     
//     $ = cheerioHtmlFile(htmlfile);
     if(urlfile ==='0'){$ = cheerioHtmlFile(htmlfile);}
     else {$=prevod;};

    var checks = loadChecks(checksfile).sort();
    var out = {};
    for(var ii in checks) { 
	var present = $(checks[ii]).length > 0; //if tag is not in html file, retun 0, otherwise 1
       console.log(ii,checks[ii],present);
    }
    return out;
});
};

var clone = function(fn) {
    // Workaround for commander.js issue.
    // http://stackoverflow.com/a/6772648
    return fn.bind({});
};



if(require.main == module) {
    program
       .option('-c, --checks <check_file>', 'Path to checks.json', clone(assertFileExists), CHECKSFILE_DEFAULT)
       .option('-f, --file <html_file>', 'Path to index.html', clone(assertFileExists), HTMLFILE_DEFAULT)
       .option('-u, --url <url_file>', 'URL path like https://.....',URLFILE_DEFAULT)
       .parse(process.argv);
    var checkJson = checkHtmlFile(program.url, program.file, program.checks);
    var outJson = JSON.stringify(checkJson, null, 4);
    console.log(outJson);
} else {
    exports.checkHtmlFile = checkHtmlFile;
}
