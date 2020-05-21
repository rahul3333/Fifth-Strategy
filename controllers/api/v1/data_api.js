const company=require('../../../models/company');
module.exports.index= async (req,res)=>{
    let posts=await company.find({});
    return res.json(200,{
        message:"List of Posts",
        posts:posts
    })
}

module.exports.destroy=function(req,res){
    
    company.findById(req.params.id,function(err,Company){
        if(Company.user==req.user.id){
            Company.remove();
            return res.status(200).json({
                message:"Post Deleted"
            });
        
    }else{
        res.json(401,{
            message:'You cannot delete this entry'
        });
    }
        if(err){
            return res.json(500,{
                message:"Internal Server Error"
            });
        }
    })
    }