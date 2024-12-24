const mongoose = require("mongoose");
const weighingBalanceSchema = new mongoose.Schema(
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
    performedBy: { type: String },
    signatureBy: { type: String },
    verifiedBy: { type: String },
  },
  { timestamps: true }
);

const WeighingBalance = mongoose.model("weighingbalance", weighingBalanceSchema);
module.exports = WeighingBalance;
