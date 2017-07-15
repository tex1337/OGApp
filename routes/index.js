var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;

var url = 'mongodb://tech1337:asshole@ds159112.mlab.com:59112/ogapp';

/* GET home page. */

router.get('/', function(req, res, next){
    res.render('index', {filename: "New File"});
});

router.get('/load/:fname', function(req, res, next) {
    var data = [];
    mongo.connect(url, function(err, db){

        var items = db.collection('documents').find({filename: req.params.fname});
        items.forEach(function(record, err){
            if(!err){
                data.push(record);
            }
        }, function () {
            if(data.length > 0){
                res.render('index', {filename: data[0].filename, imgJSON: JSON.stringify(data[0].canvasJSON) });
            } else {
                res.render('error', {
                    message: "File Not Found!",
                    error:{
                        status: 'No file named: "' + req.params.fname + '" in DB.'
                    }
                });
            }
            db.close();
        });

    });
});

module.exports = router;
