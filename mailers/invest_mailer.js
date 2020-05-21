const nodemailer=require('../config/nodemailer');



exports.newInvestment=(company)=>{
    let htmlString=nodemailer.renderTemplate({company:company},'/Investment/new_investment.ejs');
    
    nodemailer.transporter.sendMail({
        from:'fifthStrategy.fs@gmail.com',
        to:company.user.email,
        subject:"New Investment",
        html:htmlString
    },(err,info)=>{       //info carries the information about the request
        if(err){
            console.log('Error in sending mail : ',err);
            return;
        }

        console.log('Mail Delivered',info);
        return;
    })
}