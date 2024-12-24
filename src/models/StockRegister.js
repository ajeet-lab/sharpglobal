const mongoose = require("mongoose");

const stockRegister = mongoose.Schema({
    uin: {type:Number, required: true},
    unit: {type:String, required:true},
    sNo: {type: Number, required: true},
    date: {type: String, required: true},
    partyName: {type: String, required: true},

    invoiceNo: {type: String, required: true},
    openingQty: {type: String, required: true},
    recievedQty: {type: String, required: true},
    lotNo: {type: String, required: true},
    issueDate: {type: String, required: true},

    issueQty: {type: String, required: true},
    plantTank: {type: String, required: true},
    useBatchNo: {type: String, required: true},
    useDate: {type: String, required: true},
    cloasingBalance: {type: String, required: true},

}, {timestamps: true});

const StockRegister = mongoose.model("stockregister", stockRegister);
module.exports = StockRegister;