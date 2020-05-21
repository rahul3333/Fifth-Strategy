const company=require('../models/company');
const User=require('../models/users');
const path=require('path');
const child_process=require('child_process').spawn;
const investMailer=require('../mailers/invest_mailer');
module.exports.create=async function(req,res){
    try {
        let invest=await company.create({
            invest:req.body.invest,
            company_name:req.body.company_name,
            no_of_days:req.body.no_of_days,
            user:req.user._id
        });
        
            invest=await invest.populate('user','name email').execPopulate();
            var process=child_process('python',[path.join(__dirname,'../stock2.py'),invest.company_name,invest.no_of_days,invest.invest]);
            
            process.stdout.on('data', function(data) { 
                console.log('In data');
                
                console.log(data.toString()); 
            } ) 
            req.flash('success',"Rs.",req.body.invest,' has been Invested in',req.body.company_name,"!!!");
            investMailer.newInvestment(invest);
            return res.redirect('back');
             
    } catch (error) {
        req.flash('error','Error in investing');
        console.log(error);
        
        return res.redirect('back');
    }
}

module.exports.previous=function(req,res){
    company.find({},function(err,record){
        res.render('previous_investment',{
                    title:'History',
                    record:record
                });
//     })

    // If I want to display whole information of the user then populate() is used
//    company.find().populate('user').exec(function(err,record){
//         res.render('previous_investment',{
//             title:'History',
//             record:record
//         });
})}

module.exports.destroy=function(req,res){
    
    company.findById(req.params.id,function(err,Company){
        if(Company.user==req.user.id){
            Company.remove();
            req.flash('success','Record Removed!!!');
            return res.redirect('back');
        }
        else{
            req.flash('error',err);
            return res.redirect('back');
        }
    })
}