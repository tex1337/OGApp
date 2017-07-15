var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;

var index = require('./routes/index');
var dburl = 'mongodb://tech1337:asshole@ds159112.mlab.com:59112/ogapp';
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.post('/', function(req, res){
    // When we get some POST, do the requested action
    var action = req.body.actionlist;
    var fname = req.body.filename;
    var jsonString = req.body.canvasJSON;

    switch (action) {
        case "Save":
            // mongo.connect(dburl, function(err, db) {
            //     if(!err){
            //         db.documents.insert({
            //             filename: fname,
            //             canvasJSON: jsonString
            //         });
            //     }
            //     db.close();
            // });
            console.log(jsonString);
            res.redirect("/load/" + fname);
            break;

        case "Load":
            res.redirect("/load/" + fname);
            break;

        case "Delete":
            break;

        default:
            res.render('error', {
                message: "Failed to commit action: " + action,
                error:{
                    status: "Couldn't " +  action + " file: '" + fname +"'. Please try again!"
                }
            });
            break;
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
