const express=require('express');
const router= express.Router();
const passport=require('passport');
const invest_controller=require('../controllers/invest_controller');
const users_controller=require('../controllers/users_controller');

router.get('/',passport.checkAuthentication,users_controller.invest)
router.all('/create',passport.checkAuthentication,invest_controller.create);
router.get('/previous_investment/:id',passport.checkAuthentication,invest_controller.previous);
router.get('/destroy/:id',passport.checkAuthentication,invest_controller.destroy);

module.exports=router;