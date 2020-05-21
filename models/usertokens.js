const mongoose=require('mongoose');

const usertokenSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    accesstoken:{
        type:String,
    },
    resetPasswordExpires: {
        type:Date
    }

},{
    timestamps:true
})

const Access=mongoose.model('Access',usertokenSchema);
module.exports=Access;