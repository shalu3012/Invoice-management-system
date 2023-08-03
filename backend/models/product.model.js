const mongoose=require('mongoose');

const ProductSchema=mongoose.Schema({
    item:{type:String},
    qty:{type:Number},
    price:{type:Number},
    discount:{type:Number},
    desc:{type:String},
    unit:{type:String},
    total:{type:Number},
    subtotal:{type:Number},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    company_id:{type:mongoose.Schema.Types.ObjectId,ref:'CoInfo'},
    client_id:{type:mongoose.Schema.Types.ObjectId,ref:'Client'},
    invoice_id:{type:mongoose.Schema.Types.ObjectId,ref:'Invoice'}
},{timestamps:true})


const Product=new mongoose.model('Product', ProductSchema);
module.exports=Product