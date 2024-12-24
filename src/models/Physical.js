const mongoose = require('mongoose');
const physicalSchema = new mongoose.Schema({
    uin: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String },
    nameOfSupplier: {type:String, trim:true},
    invoiceNoDate: { type: String, required: true },
    sNo: { type: Number, required: true },
    description: { type: String, required: true },
    quantityPerInvoice: { type: String, required: true },
    weightShortageExcess: { type: String, required: true },
    noOfDrums: {type: String},
    noOfPacking: {type: String},
    identificationNoLotByQC: {type: String},
    
}, {timestamps: true});

const Physical = mongoose.model("physical", physicalSchema);
module.exports = Physical;