const express=require('express');
const router=express.Router();

router.use('/data',require('./data2'));

module.exports=router;