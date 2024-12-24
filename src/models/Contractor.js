const mongoose = require("mongoose");
const contractorSchema = new mongoose.Schema(
  {
    uin: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "empdatas",
    },
    enquiryClosedWith: { type: String, required: true },
    customerName: { type: String, required: true },
    contractBooked: { type: String, required: true },
    billingAddress: {type: String, required: true, default:'' },
    shippingAddress: {type: String, required: true, default:'' },
    supplyLocation: { type: String, default: "" },
    scNo: { type: String, required: true },
    productName: { type: String, required: true },
    customerProductCode: { type: String, required: true, default: "" },
    quantity: { type: Number, required: true },
    weight: { type: String, required: true },
    rate: { type: Number, required: true },
    supplyPeriodStart: { type: String, required: true },
    supplyPeriodStart: { type: String, required: true },
    supplyPeriodEnd: { type: String, required: true },
    incoterm: { type: String, required: true },
    paymentTerm: { type: String, required: true },
    newTerm: { type: String, required: true, default: '' },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

const Contractor = mongoose.model("contractor", contractorSchema);
module.exports = Contractor;
