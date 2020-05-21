const Access = require("../models/usertokens");
const User= require("../models/users");
const crypto=require('crypto');
const accessMailer=require('../mailers/forgot_password');
const fs=require('fs');
const path=require('path');
module.exports.signin=(req,res)=>{

    if(req.isAuthenticated()){
       return res.redirect('/users/invest');
    }
    // User.find({},function(err,user){
        // console.log(user);
        res.render('sign_in',{
            title:'Sign-In',
            // user:user
        // });  
    })
};

module.exports.signup=(req,res)=>{
    
    if(req.isAuthenticated()){
        return res.redirect('/users/invest');
    }
    res.render('signup',{
        title:'Sign-Up'
    });
};

module.exports.invest=(req,res)=>{
    res.render('invest',{
        title:'Investment'
    });
};

module.exports.output=(req,res)=>{
    res.render('output',{
        title:'Invested Money'
    })
}

module.exports.profile=(req,res)=>{
    res.render('profile',{
        title:'Profile'
    })
}

module.exports.create=function(req,res){
if (req.body.password != req.body.confirm_password){
    return res.redirect('back');
}

User.findOne({email: req.body.email}, function(err, user){
    if(err){console.log('error in finding user in signing up'); return}

    if (!user){
        User.create(req.body, function(err, user){
            if(err){
                console.log('error in creating user while signing up'); 
                return
            }
            console.log('User created successfully');
            
            // Access.create({
            //     user:user._id,
            //     accesstoken:crypto.randomBytes(20).toString("hex"),
            //     resetPasswordExpires:Date.now()+300000
            // })
            return res.redirect('/users/signin');
        })
    }
    else {
        console.log('User already exists ');
        return res.redirect('back');
    }
});
}

module.exports.createSession= function(req,res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/invest');
}

module.exports.destroySession= function(req,res){
    req.logout();
    req.flash('success','You have been Logged Out');
    return res.redirect('/');
}

module.exports.updateprofile=(req,res)=>{
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            req.flash('success','Record Updated Successfully!!!')
            return res.redirect('back');
        });
    }
    else{
        req.flash('error','Cannot Update the record!!!')
        return res.status(401).send('Unauthorized');
    }
}

module.exports.updateprofilepic= async function(req,res){
    if(req.user.id==req.params.id){
        try {
            let user=await User.findByIdAndUpdate(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('Multer Error : ',err);
                }
                if(req.file){
                    user.avatar=User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        } catch (error) {
            req.flash('error',err);
            return res.redirect('back');
        }
    }
}

module.exports.forgotPassword=async function(req,res){
    try {
        User.findOne({email:req.body.mail_id},async function(err,user){
            console.log('Email : ',user);
            console.log('Email : ',req.body.mail_id);
            if(user){
               let accesstoken=await Access.create({
                    user:req.user._id,
                    accesstoken:crypto.randomBytes(20).toString("hex"),
                    resetPasswordExpires:Date.now()+300000      //Token available till 5 minutes
                });
                accesstoken=await accesstoken.populate('user','name email').execPopulate();
                req.flash('success',"A mail has been sent to current email!!!");
                accessMailer.forgottenPassword(accesstoken);
                return res.redirect('back');
            }
            else{
                req.flash('Incorrect Email');
                return res.redirect('back');
            }
        
    })
 } catch (error) {
        req.flash('error','Error in investing');
        console.log(error);
        return res.redirect('back');
    }
}