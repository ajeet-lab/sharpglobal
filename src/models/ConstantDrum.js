const mongoose = require('mongoose');

const constantDrumSchema = new mongoose.Schema({
    uin: {type: Number, required:true},
    unit: {type:String, required:true},
    drumNo: {type:String, required:true},
}, {timestamps: true});

const ConstantDrum = mongoose.model("constantdrum", constantDrumSchema);
module.exports = ConstantDrum