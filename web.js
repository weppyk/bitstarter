var fs = require('fs');
var indexhtml = fs.readFileSync('index.html');
var indexhtmls = indexhtml.toString('utf8');
//var express = require('express');
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
  response.send(indexhtmls);

//gg
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
