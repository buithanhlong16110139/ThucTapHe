var express = require('express');
var bodyparser = require('body-parser');
const mongoose = require('mongoose')
var app = express();
var http = require('http').Server(app);

var jsonParser = bodyparser.json();
var urlencodedParser = bodyparser.urlencoded({extended: false})

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/routes'));
const dbConfig = 'mongodb://localhost:27017/CRUDProduct';

mongoose.set('useCreateIndex', true);
mongoose.connect(dbConfig, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

var product = require('./routes/product');

app.use('/product', product);

app.get('/', function(req, res){
    res.render('addPro');
})
var server = app.listen(3000, function() {
  console.log('Server listening on port ' + server.address().port);
});