var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;

var url = 'mongodb://tech1337:asshole@ds159112.mlab.com:59112/ogapp';

/* GET home page. */

router.get('/', function(req, res, next){
    res.render('index');
});

router.get('/new', function (req, res) {
   res.redirect('/', {filename: "New File"});
});

router.get('/load', function(req, res, next) {
    var data = [];
    mongo.connect(url, function(err, db){
        if (!err){
            var item = db.collection('documents').find({});
            item.forEach(function(record, err){
                if(!err){
                    data.push(record);
                }
            }, function () {
                res.render('index', {records: data});
                db.close();
                console.log(data);
            });
        } else {
            console.log(err);
        }
    });
});

module.exports = router;
