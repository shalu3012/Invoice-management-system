const express=require('express');
const router=express.Router();
const {signUpUser,logInUser,updateUserInfo,getUser}=require('../controllers/userController')
const db = require("../db/connection");

router.route('/').post(logInUser);
router.route('/getUser').get(getUser);
router.route('/signUp').post(signUpUser);
router.route('/updateUserInfo').post(updateUserInfo);
module.exports=router;