const mongoose = require('mongoose');

const chemistSchema = new mongoose.Schema({
    uin: {type: Number, required:true},
    productName: {type:String, required:true},
    datePackingOrder: {type:String, required:true},
    batchNo:{type:String, required:true},
    batchSize: {type:String, required:true},
    dispatchSize: {type:String, required:true},
    invoiceNo: {type:String, required:true},
    sharpProductCode: {type:String, required:true},
    image_url: {type:String, required:true},
}, {timestamps: true});

const Chemist = mongoose.model("chemist", chemistSchema);
module.exports = Chemist