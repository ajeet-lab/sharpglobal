const mongoose = require('mongoose');

const wipSchema = new mongoose.Schema({
    locationCode: {type:String, required:true},
    drumNo: {type:String, required:true},      
    wt: {type:Number, required:true},
    plantNo: {type:String, required:true},
    batchNo :{type:String, required:true},
    grade: {type:String, required:true},
    
});

const Wip = mongoose.model("wip", wipSchema);
module.exports = Wip