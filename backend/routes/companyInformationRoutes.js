const express=require('express');
const router=express.Router();
const {companyInformation,updateCompanyInfo}=require('../controllers/companyInformationController')

router.route('/').post(companyInformation)
router.route('/updateCompanyInfo').post(updateCompanyInfo)

module.exports=router;