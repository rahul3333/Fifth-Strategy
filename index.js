//for production start => npm run script_name

const express=require('express');
const cookieParser=require('cookie-parser');
const port=8000;
const passportGoogle=require('./config/passport-google-oauth2-strategy');
const app=express();
require('./config/view-helpers')(app);
var bodyParser = require('body-parser')
const db=require('./config/mongoose');
var session = require('express-session');
const passport= require('passport');
const passportLocal=require('./config/passport-local-startegy');
const passportJWT=require('./config/passport-jwt-strategy')
const MongoStore=require('connect-mongo')(session);
const flash=require('connect-flash');
const customMware=require('./config/middleware');
const fs=require('fs');
const env=require('./config/environment');
const logger=require('morgan');
var child_process=require('child_process');
const path=require('path');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json())

app.use(logger(env.morgan.mode,env.morgan.options));
console.log(env.name,__dirname+env.assets_path);

app.use(express.static(path.join(__dirname,env.assets_path)));
app.use('/uploads',express.static(__dirname+'/uploads'));
app.set('view engine','ejs');
app.set('views','./views');
app.use(session({
    name:'fifth_Strategy',
    secret:env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store:new MongoStore(
    {
      mongooseConnection:db,
      autoRemove:'disabled'  
    },
    function(err){
        console.log(err||'connect-mongodb setup ok');
        
    }
    )
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setflash);
app.use('/',require('./routes'))

app.listen(port,function(err){
    if(err){
        console.log('Error while Running Server');
        return;
    }
    console.log(`Server running on port ${port}`); 
});


