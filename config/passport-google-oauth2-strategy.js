const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/users');
const env=require('./environment');

passport.use(new googleStrategy({
    clientID:env.google_client_ID,
    clientSecret:env.google_client_Secret,
    callbackURL:env.google_callback_URL
},

    function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('Error in google Strategy : ',err);
                return;
            }
            console.log(profile);
            if(user){
                return done(null,user)
            }
            else{
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString("hex")
                },function(err,user){
                    if(err){
                        console.log('Error in google Strategy : ',err);
                        return;
                    }

                    return done(null,user);
                })
            }
        })
    }

));

module.exports=passport;