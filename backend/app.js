require('dotenv').config();
const express = require('express');
const mongoose =require('mongoose');
const chalk = require('chalk');
const session = require("express-session")
const passport = require('passport');
const cors = require('cors');


require('./auth/auth');

const log = console.log;

//Routes
const booksRoute=require('./routes/books');
const user = require('./routes/user');

const app = express();

mongoose.connect(process.env.mongoURL,{ useNewUrlParser: true,useFindAndModify: false,useUnifiedTopology: true })
.then(()=>{
  log(chalk.green("Connected to database!"));
})
.catch(()=>{
  log(chalk.red("Connection failed!"));
});



app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
                  secret: "secret",
                  resave: true,
                  saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers',
  'Origin, X-Requested-With,Content-Type, Accept,Authorization');
  res.setHeader('Access-Control-Allow-Methods',
  'GET, POST, PATCH,PUT, DELETE, OPTIONS');
  next();
});

app.use("/api/books",passport.authenticate('jwt',{session:false}),booksRoute);

app.use("/user",user);


module.exports=app;