const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

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
//What's the diff betwen send and render
//Start Server
app.listen(3000, function(){
  console.log('Server started on port 3000...')
});
