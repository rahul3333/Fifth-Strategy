const express=require('express');
const router=express.Router();
const userApi=require('../../../controllers/api/v1/user_api')

router.post('/create_session',userApi.createSession);

module.exports=router;