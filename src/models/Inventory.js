const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref:"User"},
    uin: {type:Number, required:true},
    name: {type:String, required:true},
    locationCode: {type:String, required:true},
    unit: {type:String},
    drumNo: {type:String, required:true},
    wt: {type:Number, required:true},
    plantNo: {type:String, required:true},
    batchNo: {type:Number, required:true},
    finalSubmitStatus: {type: String, default: "Pending"}
}, {timestamps: true});

const Inventory = mongoose.model("inventory", inventorySchema);
module.exports = Inventory;