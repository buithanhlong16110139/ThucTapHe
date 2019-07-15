var express = require('express');
var bodyParser = require('body-parser');
var { mongoose } = require('./db.js');
var mongodb = require('mongodb');
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
var server = require('http').Server(app);
server.listen(3000);



app.get('/', function(req, res){
    res.render('trangchu');
})

