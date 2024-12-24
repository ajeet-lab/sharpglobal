const mongoose = require("mongoose");

const negotiationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref:'empdatas' },
    uin: { type: Number, required: true },
    enquiryId: { type: mongoose.Schema.Types.ObjectId, required: true, ref:'customerenquiary' },
    negotiationDate: { type: String, required: true },
    rateQuoted: { type: String, required: true },
    commentsByClient: { type: String },
    replyBySharp: { type: String },
  },
  { timestamps: true }
);

const Negotiation = mongoose.model("negotiation", negotiationSchema);

module.exports = Negotiation;
