const nodemailer=require('../config/nodemailer');


exports.forgottenPassword=(password)=>{
    let htmlString=nodemailer.renderTemplate({password:password},'/Investment/forgottenpassword.ejs');

    nodemailer.transporter.sendMail({
        from:'fifthStrategy.fs@gmail.com',
        to:company.user.email,
        subject:"Forgot Password",
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log('Error in sending mail : ',err);
            return;
        }

        console.log('Mail Delivered',info);
        return;
    })
    }

