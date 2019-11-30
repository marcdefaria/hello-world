var express = require('express');
var app = express();
var square = require('./square')
var logger = require('morgan')
var wiki = require('./wiki.js')

const username = process.argv[2].split('=')[1]

// --------------mongodb connection-----------------------------
const connectionString = 'mongodb+srv://marc:reversed@testcluster1-4shd2.mongodb.net/test?retryWrites=true&w=majority'

const mongoose = require('mongoose')
const userSchema = require('./userSchema.js')
const User = mongoose.model('user', userSchema, 'user')

async function createUser(username) {
	return new User({
		username,
		created: Date.now()
	}).save()
}

async function findUser(username) {
	return await User.findOne({ username })
}

;(async () => {
	const connector = mongoose.connect(connectionString)
	const username = process.argv[2].split('='[1])

	let user = await connector.then(async () => {
		return findUser(username)
	})

	if (!user) {
		user = await createUser(username)
	}

	console.log(user)
	process.exit(0)
})()
// -------------------------------------------------------------


// remember to always require and instantiate middleware before routing
app.use(logger('dev'))

app.use('/wiki', wiki);

// serving static files
app.use(express.static('public'))

// Handling errors
app.use( function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

/*---------My own Middleware function------------------------------*/
var a_middleware_function = function(req, res, next) {
	console.log('Middleware function for all routes and verbs called');
	next();
}

// Function added with use() for all routes and verbs
app.use(a_middleware_function);

/*-----------------------------------------------------------------*/


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
