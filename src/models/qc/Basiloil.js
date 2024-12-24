const mongoose = require("mongoose");
const basiloilSchema = new mongoose.Schema({
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
    initialOvenTemperature: {type: String},
    finalOvenTemperature: {type: String},
    injectorTemperature: {type: String},
    detectorTemperature: {type: String},
    heliumPressure: {type: String},
    hydrogenPressure: {type: String},
    zeroAirPressure: {type: String},
    programmingRate: {type: String},

    description: {type: String},
    odour: {type: String},
    acidity: {type: String},
    opticalRotation: {type: String}, 
    // totalTerpenes: {type: String},
    linalool: {type: String},
    menthone: {type: String},
    methylChavicol:{type: String},
    // menthylAcetate: {type: String},
    // neoMenthol: {type: String},
    // lMenthol: {type: String},
    // menthofuran: {type: String},
    // lCarvone: {type: String},
    
    report: {type: String},
    reportDate: {type: String},
    chemistQualityControl: {type: String},
    inchargeQc: {type: String},

},{timestamps: true});

const Basiloil = mongoose.model("basiloil", basiloilSchema);
module.exports = Basiloil;




