const mongoose=require("mongoose");

const companySchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    company_name:{
        type:String,
        required:true
    },
    invest:{
        type:Number,
        required:true
    },
    price:{
        type:Number
    },
    no_of_days:{
        type:Number
    }
},{
    timestamps:true
});

const Company=mongoose.model('Company',companySchema);
module.exports=Company;