const express=require('express');
const router=express.Router();
const {addClient,getAllClients,getClient,updateClient,deleteClient}=require('../controllers/clientController')

router.route('/').post(addClient);
router.route('/getAllClients').get(getAllClients);
router.route('/getClient').get(getClient);
router.route('/updateClient').post(updateClient);
router.route('/deleteClient').delete(deleteClient);


module.exports=router;