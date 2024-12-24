const mongoose = require('mongoose');
const incomingSchema = new mongoose.Schema({
    uin: { type: String},
    unit: { type: String},
    lotNumber: { type: String },
    date: {type:String},
    weightChart: { type: String},
    sNo: { type: String},
    sharpSNo: { type: String},
    supplierSNo: { type: String},
    grossWt: { type: String},
    tareWt: {type: String},
    netWt: {type: String},
    sNo2: {type: String},
    recheckedTareWt: { type: String},
    difference: { type: String},
    date2: {type: String},
    supervisorSign: {type: String},
    
}, {timestamps: true});

const Incoming = mongoose.model("incoming", incomingSchema);
module.exports = Incoming;