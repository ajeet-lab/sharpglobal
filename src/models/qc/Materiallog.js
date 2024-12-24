const mongoose = require("mongoose");
const materiallogSchema = new mongoose.Schema({
    dateOfReciept: String,
    nameOfMaterial: String,
    nameOfSupplier: String,
    invoiceNo: String,
    qtyReceived: String,
    totalNoOfDrums: String,
    lotNoAllocated: String,
    lotNoIdentification: String,
    mfdDate: String,
    sampledBy: String,
    analysedBy: String,
    uin: {type: Number},
    unit: {type: String}
},{timestamps: true});

const Materiallog = mongoose.model("materiallog", materiallogSchema);
module.exports = Materiallog;




