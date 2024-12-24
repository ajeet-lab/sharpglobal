const mongoose = require('mongoose');

const distillationSchema = new mongoose.Schema({
    uin: {type: Number},
    unit: {type: String},
    plantNo: {type: String},
    batchNo: {type: String},
    objective: {type: String},
    plantStartTime: {type: String},
    batchCompleteTime: {type: String},

    
    batchTimeTaken: {type: String},
    feedItem: {type: String},
    feedQty: {type: String},
    qtyObjective: {type: String},
    interCutQty: {type: String},

    bottom: {type: String},
    water: {type: String},
    loss: {type: String},
    update_At: {type: String}

}, {timestamps: true});

const Distillation = mongoose.model("distillation", distillationSchema);
module.exports = Distillation;