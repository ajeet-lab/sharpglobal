const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    uin: {type:Number, required: true},
    user: {type:String, required: true, ref:'user'},
    name: {type:String, required:true},
    shippingAddress: {type:String, required:true},
    billingAddress:{type:String, required:true},
    phone: {type:Number, required:true},
    mobile: {type:Number, required:true},
    email: {type:String, required:true},
}, {timestamps: true});

const Customer = mongoose.model("customer", customerSchema);
module.exports = Customer