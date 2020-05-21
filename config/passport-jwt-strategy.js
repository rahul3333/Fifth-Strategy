const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy
const ExtractJWT=require('passport-jwt').ExtractJwt;    //Extract JWT from the header
const env=require('./environment');

const User=require('../models/users');

let opts={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey:env.jwt_Secret
}

passport.use(new JWTStrategy(opts,function(jwtPayload,done){
    User.findById(jwtPayload._id,function(err,user){
        if(err){
            console.log('Error in finding user from jwt');
            return;
        }
        if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    })
}));


module.exports=passport;