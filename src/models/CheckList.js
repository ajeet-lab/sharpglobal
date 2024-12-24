const mongoose = require('mongoose');
const checklistSchema = new mongoose.Schema({
    sNo: {type: Number, required: true},
    uin: { type: String},
    unit: { type: String},
    invoiceNo: { type: String },
    date: {type:String},
    supplierName: { type: String, required: [true, "Supier Name is required"], trim:true},
    material: { type: String, required: [true, "Material is required"]},
    weightOfMaterial: { type: String},
    quantityInDrums: { type: String, required: [true, "Quantity In Drums is required"]},
    supplyAsPerApproved: { type: String},
    vehicleCondition: {type: String},
    leakedDrum: {type: String},
    evidenceBrokenSeals: {type: String},

    damagedContainers: { type: String},
    wetContainers: { type: String},
    rodentInsectInfestations: {type: String},
    wrongLabeling: {type: String},
    leakage: {type: String},

    numberOfDrumsLeak: { type: String},
    supplierWeightChart: { type: String},
    materialAccept: {type: String},
    materialRejectReturn: {type: String},
    warningSupplier: {type: String},

    rejectionMaterial: { type: String},
    weightMaterialChecked: { type: String},
    weightDifference: {type: String},
    remarks: {type: String},
    dateTimeUnloading: {type: String},


    name: { type: String},
    signature: { type: String},
    qcUin: String,
    qcUnit: String,
    identificationNoLotByQC: {type:String, default: undefined},

    
}, {timestamps: true});

const CheckList = mongoose.model("checklist", checklistSchema);
module.exports = CheckList;