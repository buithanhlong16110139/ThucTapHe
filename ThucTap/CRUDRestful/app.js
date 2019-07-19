var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session')
const expressValidator = require('express-validator')
const flash = require('connect-flash')
const mongoose = require('mongoose')
var router = require('./routes/index');
// 1
//const router = require('./routes');
//const users = require('./routes/users');
//const books = require('./routes/books');

var app = express();

// 2
mongoose.Promise = global.Promise
const mongoDB = process.env.MONGODB_URI || 'mongodb://127.0.0.1/CRUDProduct'
mongoose.connect(mongoDB)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 3
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}))

//4
// app.use(expressValidator({
//   errorFormatter: function(param, msg, value) {
//     var namespace = param.split('.')
//     , root = namespace.shift()
//     , formParam = root

//     while(namespace.length) {
//       formParam += '[' + namespace.shift() + ']'
//     }
//     return {
//       param : formParam,
//       msg : msg,
//       value : value
//     }
//   }
// }))

// 5
app.use(flash())
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')
  next()
})

// 6
//app.use('/', router);
//app.use('/users', users);
//app.use('/books', books);

// //Bất đồng bộ
// app.get('/', function () {
//   const User = require('./routes/users/user.Models');
//   // async function fetchOwners(catIDs) {
//   //   const owners = [];
//   //   for (const id of catIDs) {
//   //     const cat = await fetchCat(id);// get detail object Cat
//   //     const owner = await fetchOwner(cat.ownerID); //find owner via ownerID
//   //     owners.push(owner);
//   //   }
//   //   return owners;
//   // }
//   // const owners = catIDs.map(id => {
//   //   const cat = fetchCatSync(id);
//   //   const owner = fetchOwnerSync(cat.ownerID);
//   //   return owner;
//   // });
//   execute()

//   async function execute() {
//     let result = await findResult()
//     console.log("bước 3");///second
//   }

//   async function findResult() {
//     for (let i = 0; i < 1000000000; i++) {
//       let j = 100
//     }

//     console.log('Bước 1');///first

//     let result = await User.collection.findOne({ username: 'long14a12dgl' });
//     console.log("Bước 2");///third
//     console.log(result);
//     //console.log('after findResult');
//     return(result);
//   }
// })

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// app.get('/', function(req, res){
//   res.render('addPro');
// })
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;