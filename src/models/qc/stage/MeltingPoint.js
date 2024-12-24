const mongoose = require("mongoose");
const meltingSchema = new mongoose.Schema(
  {
    uin: { type: Number },
    unit: { type: String },
    codeNo: { type: String },
    date: { type: String },
    startTime: { type: String },
    stopTime: { type: String },
    oprationDetail: { type: String },
    product: { type: String },
    batchNo_identification: { type: String },
    stage: { type: String },
    firstReading: { type: String },
    secondReading: { type: String },
    thirdReading: { type: String },
    averageReading: { type: String },
    performedBy: { type: String },
    signatureBy: { type: String },
    verifiedBy: { type: String },
  },
  { timestamps: true }
);

const MeltingPoint = mongoose.model(
  "meltingpoint",
  meltingSchema
);
module.exports = MeltingPoint;
