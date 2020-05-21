const express=require('express');
const router= express.Router();
const passport=require('passport');
const users_controller=require('../controllers/users_controller');
router.all('/signin',users_controller.signin);
router.all('/signup',users_controller.signup);
router.get('/output',passport.checkAuthentication,users_controller.output);
router.all('/create_entry',users_controller.create);
router.get('/profile/:id',users_controller.profile);
router.post('/update/:id',users_controller.updateprofile);
router.post('/updateprofilepic/:id',users_controller.updateprofilepic);

// used passport as middleware to authenticate
router.post('/create_session',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'}
),users_controller.createSession);

router.get('/signout',users_controller.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));  //Google will automatically determine this request
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/signup'}),users_controller.createSession);
router.get('/forgotpassword/:accesstoken',users_controller.forgotPassword);

module.exports=router;