const express = require('express');
const mongoose =require('mongoose');
const chalk = require('chalk');

const log = console.log;

//Routes
const booksRoute=require('./routes/books');

const app = express();

mongoose.connect("mongodb://localhost:27017/Bookself?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false",{ useNewUrlParser: true,useFindAndModify: false,useUnifiedTopology: true })
.then(()=>{
  log(chalk.green("Connected to database!"));
})
.catch(()=>{
  log(chalk.red("Connection failed!"));
});



app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers',
  'Origin, X-Requested-With,Content-Type, Accept,Authorization');
  res.setHeader('Access-Control-Allow-Methods',
  'GET, POST, PATCH,PUT, DELETE, OPTIONS');
  next();
});

app.use("/api/books",booksRoute);


module.exports=app;