const express=require('express');
const app=express();
const cookieParser = require('cookie-parser');
const path=require('path');
const db=require('./config/mongoose-connection');
const ownersRouter=require('./routes/ownersRouter');
const productsRouter=require('./routes/productsRouter');
const usersRouter=require('./routes/usersRouter');
const indexRouter=require('./routes/index');
require("dotenv").config();
const expressSession=require('express-session');
const flash=require('connect-flash');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname),'public'));
app.set("view engine","ejs");
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false, // You can set this to true if you want to save uninitialized sessions
        secret: 'secret',
       // cookie: { secure: process.env.NODE_ENV === 'production' } // Set secure cookies in production
    })
);
app.use(flash());
app.use("/",indexRouter);
app.use("/owners" ,ownersRouter);
app.use("/users" ,usersRouter);
app.use("/products" ,productsRouter);
app.listen(3000);
