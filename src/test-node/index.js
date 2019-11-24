var express = require('express');
var app = express();
var square = require('./square')

var wiki = require('./wiki.js')

app.use('/wiki', wiki);

app.get('/', function(req, res) {
  res.send('Hello World!');
  console.log('Received a get request and responded')
  console.log('4 * 4 is equal to: ' + square.area(4))
});

/*app.get('calculate', function(req,res) {
	var answer = square.area(4)
	res.send('The answer to 4*4 is: ' + answer)
});*/

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
