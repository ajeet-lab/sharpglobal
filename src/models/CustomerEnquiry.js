const mongoose = require("mongoose");

const customerEnqSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "empdatas",
    },
    uin: { type: Number, required: true },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "customerdetail",
    },
    date: { type: String, required: true },
    enquiryType: { type: String, required: true, default: "Immediate PO" },
    negotiationDate: { type: String },
    customer: { type: String },
    customerName: { type: String },
    address: { type: String, required: true },
    reference: { type: String, required: true },
    brokerRemark: { type: String },
    productName: { type: String, required: true },
    customerCode: { type: String },
    scNo: { type: String },
    supplyPeriodStart: { type: String},
    supplyPeriodEnd: { type: String},
    incoterm: { type: String },
    contractBooked: { type: String },
    supplyLocation: { type: String },
    paymentTerm: { type: String },
    quantity: { type: Number, required: true },
    weight: { type: String, required: true },
    specification: { type: String },
    status: { type: String, required: true, default: "Press" },
    reason: { type: String, default: "" },
    rateQuoted: {
      type: Number,
    },
    finalPrice: {
      type: Number,
    },

    finalQuantity: { type: Number },
  },
  {
    timestamps: true,
  }
);

const CustomerEnquiry = mongoose.model("customerenquiary", customerEnqSchema);
module.exports = CustomerEnquiry;
