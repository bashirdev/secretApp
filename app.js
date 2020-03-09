//jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
//const encrypt = require('mongoose-encryption');
// const md5=require('md5');
const expresssession = require('express-session');
const passport =require('passport');
const passportLocalMongoose =require('passport-local-mongoose');

const app =express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));



app.use(session({
   secret:"this is my secret password.",
   resave:false,
   saveUninitialized: false
  
}));
app.use(passport.initialize());
app.use(passport.session());


//const bcrypt = require('bcrypt');
//const saltRounds = 10;

//console.log(md5('12356'));
//console.log(process.env.API_KEY);



mongoose.connect('mongodb://localhost:27017/userDB', {useNewUrlParser:true});


const userSchema =new mongoose.Schema({
  email:String,
  password:String
});

userSchema.plugin(passportLocalMongoose);

// userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] });

const User =mongoose.model('User', userSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/" , function(req,res){
    res.render("home");
});


app.get('/login', function(req,res){
    res.render('login');
});



app.get('/register' , function(req,res){
    res.render("register");
});

app.post('/register', function(req,res){

   
});


app.post('/login', function(req,res){
    
});

app.listen(3000, function(){
    console.log("the server will be start on port 3000");
});