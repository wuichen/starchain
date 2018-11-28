const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const routes = require('../api/routes/v1');
const { logs } = require('./vars');
const strategies = require('./passport');
const error = require('../api/middlewares/error');
const path = require('path');

/**
* Express instance
* @public
*/
const app = express();

// request logging. dev: console | production: file
app.use(morgan(logs));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable authentication
app.use(passport.initialize());
passport.use('jwt', strategies.jwt);
passport.use('facebook', strategies.facebook);
passport.use('google', strategies.google);







app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '../../../build', 'index.html'));
});



function doesUserExists(username, password) {
	const user = {
		id: 1,
		username: 'demo@gmail.com',
		password: 'demodemo',
	};
	if (username === user.username && password === user.password) {
		return true;
	}
	return false;
}


app.get('/', (req, res) => {
	res.json({ status: 'OK' });
});

app.post('/api/login', (req, res) => {
	const { username, password } = req.body;
	const response = {};
	// You can use DB checking here

	if (doesUserExists(username, password)) {
		response.token = jsonwebtoken.sign(
			{
				expiredAt: new Date().getTime() + expiredAfter,
				username,
				id: 1,
			},
			secretKey
		);
	} else {
		response.error = 'Not found';
	}
	res.json(response);
});
// app.use('/api/secret', [authenticate, authError]);
app.post('/api/secret/test', (req, res) => {
	res.json({
		status: 200,
		message: 'succcesful',
	});
});









// mount api v1 routes
app.use('/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;
