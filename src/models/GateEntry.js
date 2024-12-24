const mongoose = require('mongoose');
const gateEntrySchema = new mongoose.Schema({
    uin: { type: Number, required: true },
    unit: { type: String, required: true },
    sNo: { type: Number, required: true },
    dateofReceipt: { type: String },
    date: { type: String },
    time: {type:String},
    invoiceNo: { type: String, required: true },
    invoiceNo_date: { type: String, required: true },
    poNo: { type: String, required: true },
    poNo_date: { type: String, required: true },
    nameAndAddress: {type: String, trim:true},
    nameDetailsOfArticles: {type: String},
    materialType:{type: String},
    quantityOfDrums: {type: Number},
    quantity: {type: String},
    rate: {type: Number},
    amount: {type: Number},
    nameOfDeliverer: {type: String},
    picOfDeliverer: {type: String},
    driverNo: {type: Number},
    vehicleNo: {type: String},
    signOfSecurity: {type: String},
    remarks: {type: String},
    status: {type: String, default: "Pending"}

}, {timestamps: true});

const GeteEntry = mongoose.model("gateentry", gateEntrySchema);
module.exports = GeteEntry;