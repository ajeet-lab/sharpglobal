const mongoose = require("mongoose");

const poSchema = new mongoose.Schema(
  {
    uin: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "empdatas",
    },
    enquiryId:{ type: mongoose.Schema.Types.ObjectId,  ref:'customerenquiary' },
    contractorId:{ type: mongoose.Schema.Types.ObjectId,  ref:'contractor' },
    customerName: { type: String, required: true },
    inquiryOrContract: { type: String, required: true },
    poDate: { type: String, required: true },
    poNumber: { type: String, required: true },
    billingAddress: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: String, required: true },
    weight: { type: String, required: true },
    rate: { type: String, required: true },
    additionRate: { type: String, default:'0.0' },
    shipmentPeriod: { type: String, required: true },
    incoterm: { type: String, required: true },
    paymentTerm: { type: String, required: true },
    sampleRequired: { type: String, required: true },
  },
  { timestamps: true }
);

const PO = mongoose.model("podata", poSchema);
module.exports = PO;
