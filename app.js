var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();




// view engine setup

app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin: true, credentials: true}));


app.use('/', indexRouter);
app.use('/users', usersRouter);

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

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://rajondemo:NhV17jjarIbpk2v4@cluster0.s63fi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/test', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
   
    
	.then(data=>{
		console.log("connecting successfully");
	})
	.catch(error=> {
		console.log(error);
	})



module.exports = app;
