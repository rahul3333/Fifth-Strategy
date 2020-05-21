const express=require('express');
const router=express.Router();

const dataApi=require('../../../controllers/api/v2/data2_api');

router.get('/',dataApi.index);

module.exports=router;