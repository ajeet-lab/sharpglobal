const mongoose = require("mongoose");

const custDetailsSchema = new mongoose.Schema(
  {
    uin: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    customer: { type: String, required: true },
    customerName: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

const CustomerDetails = mongoose.model("customerdetail", custDetailsSchema);

module.exports = CustomerDetails;
