var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var bodyParser = require('body-parser');

var multer = require('multer');
var upload = multer();

const fs = require('fs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
//app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(express.json())    // <==== parse request body as JSON
app.use(upload.array())    // <==== parse multipart-form data with multer
//app.use(bodyParser.json())

app.post('/upload-handler', (req, res) => {
	console.log("I got a POST")
	console.log(req.headers)
	console.log(req.headers['content-type'])
	console.log("===============================")
	console.log(req.body)
	var fname = req.body['file.name']
	var ftype = req.body['file.content_type']
	var fpath = req.body['file.path']
	console.log(fname, ftype, fpath)
	var oldPath = fpath
	var newPath = '/var/www/colrc/tmp/testing.foobar'

	fs.rename(oldPath, newPath, function (err) {
		if (err) throw err
		console.log('Successfully renamed - AKA moved!')
	})
	
	res.status(200).send("Received file")
})

app.get('/upload-handler', (req, res) => {
	//let bs = res.json({requestBody: req.body})
	console.log(req)  // <==== req.body will be a parsed JSON object
	//console.log(req.query)
	console.log(req.body)
	//console.log(req.body)
	//console.log(JSON.stringify({requestBody: req.body}))
	//fs.writeFile("/var/www/colrc/tmp/crap.json", JSON.stringify({requestBody: req.body}), (err) => {
	//	console.log(err)
	//})
	res.status(200).send("Received file")
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;