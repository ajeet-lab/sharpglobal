const mongoose = require("mongoose");

const stockRequest = mongoose.Schema({
    uin: {type:Number, required: true},
    unit: {type:String, required:true},
    sNo: [],
    materialDetails: [],
    quantity: [],
    noOfDrums: [],
    

}, {timestamps: true});

const StockRequest = mongoose.model("stockrequest", stockRequest);
module.exports = StockRequest;