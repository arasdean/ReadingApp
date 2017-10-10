const express = require('express');
const path = require('path');
// Init App
const app = express();

//Load View Engine

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//Home Route
app.get('/', function(req, res){
  let books = [
    {
      id:1,
      title: 'Book 1',
      author: 'Haroon',
      body: "This is book one"
    },
    {
      id:2,
      title: 'Book 2',
      author: 'Bilal',
      body: "This is book two"
    },
    {
      id:3,
      title: 'Book 3',
      author: 'John Doe',
      body: "This is book three"
    }
  ];
  res.render("index", {
    title:'Books',
    books: books
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
