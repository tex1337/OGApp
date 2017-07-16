var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Drawing = require('./Schema/drawing');


var index = require('./routes/index');

var app = express();

// Database URL and Connect
var dburl = 'mongodb://tech1337:asshole@ds159112.mlab.com:59112/ogapp';
mongoose.connect(dburl, {useMongoClient: true});

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
    var jsonString = req.body.canvas;

    //Objectify database and handle errors in mongoose.
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));

    switch (action) {

        case "New":
            res.render('index', {
                filename: ""
            });
        case "Save":
            var newDrawing = {
                filename: fname,
                canvasJSON: jsonString
            };

            Drawing.findOneAndUpdate(
                {"filename": fname},
                newDrawing,
                {upsert: true},
                function(err, doc){
                    if(err){
                        res.render('error', {message: "Failed to run query!", error:{status:err}});
                    } else {
                        res.render('index',
                            {
                                filename: newDrawing.filename,
                                imgJSON: newDrawing.canvasJSON,
                                status: "Saved"}
                            );
                    }
                }
            );

            break;

        case "Load":

            Drawing.findOne({"filename": fname}, function(err, doc){
               if(err){
                   res.render('error', {message: "Failed to run query!", error:{status:err}});
               }
               if(doc === null){
                   res.render('error',
                       {
                           message: "Failed to Load file " + fname + "!",
                           error:{
                               status: "Search of DB returned no file with that name."
                           }
                       });
               } else {
                   res.render('index',
                       {
                           filename: doc.filename,
                           imgJSON: doc.canvasJSON,
                           status: "Loaded"
                       }
                   );
               }
            });

            break;

        case "Delete":
            Drawing.where({ "filename": fname }).findOneAndRemove(function(err, doc){
                var msg = "";
                if(doc === null) {
                    msg = "Failed to delete " + fname + "!";
                    res.render('error', {
                        message: msg,
                        error: {
                            status: "Failed to find " + fname + " in database"
                        }
                    });
                } else {
                    msg = "Deleted file: " + fname;
                    res.render('index',
                        {
                            status: "Deleted"
                        });
                }
            });
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
