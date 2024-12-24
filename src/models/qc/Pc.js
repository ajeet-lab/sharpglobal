const mongoose = require("mongoose");
const pcSchema = new mongoose.Schema({
    uin: {type: Number},
    unit: {type: String},
    specificationNumber: {type: String},
    materialCode: {type: String},
    plantOrigin: {type: String},
    storageCondition: {type: String},

    reportNo: {type: String},
    date: {type: String},
    invoiceNo: {type: String},
    invoiceDate: {type: String},
    supplierName: {type: String},
    identificationNo: {type: String},
    netWeight: {type: String},
    noOfDrums: {type: String},
    sampleAmount: {type: String},
    sampledBy: {type: String}, 
    method: {type: String},
    equipmentID: {type: String},

    injectionVolume: {type: String},
    columnTemperature: {type: String},
    injectorTemperature: {type: String},
    detectorTemperature: {type: String},
    heliumFlowRate: {type: String},
    splitRatio: {type: String},
    programmingRatio: {type: String},

    description: {type: String},
    odour: {type: String},
    acidity: {type: String},
    specificOpticalRotation: {type: String}, 
    bCaryophyllene: {type: String},
    
    report: {type: String},
    reportDate: {type: String},
    chemistQualityControl: {type: String},
    headQuality: {type: String},

},{timestamps: true});

const Pc = mongoose.model("pc", pcSchema);
module.exports = Pc;




