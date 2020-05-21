const express=require('express');
const router=express.Router();

router.use('/data',require('./data'));
router.use('/users',require('./users'));

module.exports=router;