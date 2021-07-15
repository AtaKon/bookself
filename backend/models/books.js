const mongoose = require("mongoose");


const booksSchema = mongoose.Schema({
    title: {type: String,required:false},
    path:{type:String,required:true},
    category:{type:String,required:false},
    subCategory:{type:String,required:false},
    authors:{type:String,required:false},
    year:{type:String,required:false}
  });
  
  module.exports = mongoose.model('Books',booksSchema);
  