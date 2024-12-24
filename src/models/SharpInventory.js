const mongoose = require('mongoose');

const sharpInventorySchema = new mongoose.Schema({
    description: {type:String, required:true},
    locationCode: {type:String, required:true},
    filledByGC: {type:String, required:true},
    rcvdFrmTank_PlantNo: {type:Number, required:true},
    materialCharged:{type:Number, required:true},
    usedInBatchNo: {type:String, required:true},
    tanksNo_PlantNo: {type:String, required:true},
    batchNo: {type:String, required:true},
    plantNo: {type:String, required:true},
    drumNo: {type:String, required:true},
    proDate: {type:String, required:true},
    ageingDays:{type:String, required:true},
    CutTimeEnds: {type:String, required:true},
    noOfDrums: {type:Number, required:true},
    drum_wt: {type:Number, required:true},
    sample: {type:String, required:true},
    ri: {type:String, required:true},
    batchNo_LotNo: {type:String, required:true},
    mixturesOfOdoriferousSubstances:{type:String, required:true},
    CategoryforBForm: {type:String, required:true},

    a_Pinene: {type:Number, required:true},
    b_Pinene: {type:Number, required:true},
    sebanine: {type:Number, required:true},
    mercine: {type:Number, required:true},
    limonine: {type:Number, required:true},
    cineole: {type:Number, required:true},
    cisIsomer: {type:Number, required:true},
    cis: {type:Number, required:true},
    i_Octonal: {type:Number, required:true},
    menthone: {type:Number, required:true},
    isoMenthone: {type:Number, required:true},
    menthylAcetate: {type:Number, required:true},
    ip_isopulegol: {type:Number, required:true},
    neoMenthol: {type:Number, required:true},
    pcbBetaCaryophyllene: {type:Number, required:true},
    neoIsoPulegol: {type:Number, required:true},
    neoIsoMenthol: {type:Number, required:true},
    lm: {type:Number, required:true},
    isoMenthol: {type:Number, required:true},
    pu: {type:Number, required:true},
    pip: {type:Number, required:true},
    carvone: {type:Number, required:true},
    aTerpineols: {type:Number, required:true},
    menthofuran: {type:Number, required:true},
    sebanineHydrate: {type:Number, required:true},
    germacreneD: {type:Number, required:true},
    viridifloral: {type:Number, required:true},
    diHydroCarvone: {type:Number, required:true},
    terpenene_1_4_ol: {type:Number, required:true},
    betaFarnacene: {type:Number, required:true},
    betaBourbonene: {type:Number, required:true},
    dMenthol: {type:Number, required:true},
    only_L_Menthol: {type:Number, required:true},
    linalool: {type:Number, required:true},
    methylChavi: {type:Number, required:true},
    cis2: {type:Number, required:true},
    tt: {type:Number, required:true},
    tmc: {type:Number, required:true},
    hb: {type:Number, required:true},
    total: {type:Number, required:true}


});

const SharpInventory = mongoose.model("sharpinventories", sharpInventorySchema);
module.exports = SharpInventory;










