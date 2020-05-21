const express=require('express');
const router=express.Router();
const passport=require('passport');

const dataApi=require('../../../controllers/api/v1/data_api');

router.get('/',dataApi.index);
router.delete('/:id',passport.authenticate('jwt',{session:false}),dataApi.destroy);

module.exports=router;