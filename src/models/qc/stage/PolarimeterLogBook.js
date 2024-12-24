const mongoose = require("mongoose");
const polarimeterLogBookSchema = new mongoose.Schema(
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
    firstReadingTemp: { type: String },
    secondReading: { type: String },
    secondReadingTemp: { type: String },
    thirdReading: { type: String },
    thirdReadingTemp: { type: String },
    averageReading: { type: String },
    performedBy: { type: String },
    signatureBy: { type: String },
    verifiedBy: { type: String },
  },
  { timestamps: true }
);

const PolarimeterLogBook = mongoose.model(
  "polarimeterlogbook",
  polarimeterLogBookSchema
);
module.exports = PolarimeterLogBook;
