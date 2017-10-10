let mongoose = require('mongoose');

//books schema

let bookSchema = mongoose.Schema({
  title:{
    type: String,
    require:true
  },
  author:{
    type: String,
    required: true
  },
  body:{
    type: String,
    required: true
  }

});

let Book = module.exports = mongoose.model('Book', bookSchema);
