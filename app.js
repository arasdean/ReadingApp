const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect("mongodb://localhost/nodeproject");
let db = mongoose.connection;

//check connection

db.once('open', function(){
  console.log('Connected to MongoDB');
});

//check for db errors

db.on('error', function(err){
  console.log(err);
});

// Init App
const app = express();

//Bring in models

const Book = require('./models/books');

//Load View Engine

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Body parser middleware


// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }))
// create application/json parser
app.use(bodyParser.json())


//Home Route
app.get('/', function(req, res){
Book.find({}, function(err, books){
  if(err){
    console.log(err);
  }
  else{res.render("index", {
    title:'Books',
    books: books
  });}


});

});

// Add Route

app.get('/books/add', function(req, res){
  res.render('add_books', {
    title:'Add Books'
  });
});

//Add Submit POST route
app.post('/books/add', function(req, res){
  let book = new Book();
  // console.log(req.body.author);
  book.title = req.body.title;
  book.author = req.body.author;
  book.body = req.body.body;

  book.save(function(err){
    if(err){
      console.log(err);
      return;
    } else{
      res.redirect('/');
    }
  })
});





//What's the diff betwen send and render
//Start Server
app.listen(3000, function(){
  console.log('Server started on port 3000...')
});
