const mongoose = require("mongoose");


const booksSchema = mongoose.Schema({
    title: {type: String,required:false},
    path:{type:String,required:true},
    categories:{type:[String],required:false},
    subTitle:{type:String,required:false},
    authors:{type:[String],required:false},
    publisher:{type:String,required:false},
    year:{type:Date,required:false},
    description:{type:String,required:false},
    imageLink:{type:String,required:false},
    inFavourites:{type:Boolean,required:false,default:false}
  });
  
  module.exports = mongoose.model('Books',booksSchema);
  

  //title, subtitle , authors , publisher , publishedDate, description, categories{
  