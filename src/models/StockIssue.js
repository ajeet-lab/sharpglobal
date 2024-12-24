const mongoose = require("mongoose");

const stockIssue = mongoose.Schema({
    uin: {type:Number, required: true},
    unit: {type:String, required:true},
    sNo: [],
    date: {type:String},
    slipNo: {type:String},
    slipNoDate: {type:String},
    materialDetails: [],
    lotNo:[], 
    quantity: [],
    noOfDrums: [],
    listAttached:[]
    

}, {timestamps: true});

const StockIssue = mongoose.model("stockissue", stockIssue);
module.exports = StockIssue;