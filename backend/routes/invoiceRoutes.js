const express=require('express');
const router=express.Router();
const {addInvoice,deleteProduct,deleteInvoice,updateInvoice,getAllInvoicesWithClientInfo,getInvoiceByUser_id,getInvoiceWithProducts,getInvoiceByClientId,getAllInvoicesWithProduct,getInvoiceByClientIdAndInvoiceDate}=require('../controllers/invoiceController')

router.route('/').post(addInvoice)
router.route('/updateInvoice').post(updateInvoice)
router.route('/getAllInvoicesWithClientInfo').get(getAllInvoicesWithClientInfo);
router.route('/getInvoiceWithProducts').get(getInvoiceWithProducts);
router.route('/getAllInvoicesWithProduct').get(getAllInvoicesWithProduct);
router.route('/getInvoiceByClientId').get(getInvoiceByClientId);
router.route('/getInvoiceByClientIdAndInvoiceDate').get(getInvoiceByClientIdAndInvoiceDate);
router.route('/getInvoiceByUser_id').get(getInvoiceByUser_id);
router.route('/deleteProduct').delete(deleteProduct);
router.route('/deleteInvoice').delete(deleteInvoice);

module.exports=router;