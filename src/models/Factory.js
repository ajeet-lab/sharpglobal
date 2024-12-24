const mongoose = require('mongoose');
const factorySchema = new mongoose.Schema({
    uin: {type: Number},
    unit: {type: String},
    plantNo: {type: String},
    status: {type: String},
    process: {type: String},
    batchNo: {type: String},
    update_At: {type: String}
}, {timestamps: true});

const Factory = mongoose.model("factories", factorySchema);
module.exports = Factory;