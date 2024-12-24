const mongoose = require('mongoose');

const newProductMommentSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    uin: {type:Number, required:true},
    name: {type:String, required:true},
    locationCode: {type:String, required:true},
    drumNo: {type:String, required:true},
    zone: {type:String, required:true},   
    floor: {type:String, required:true},
    row: {type:String, required:true},
    column: {type:String, required:true},
}, {timestamps: true});

const NewProductMoment = mongoose.model("newproductmoment", newProductMommentSchema);
module.exports = NewProductMoment