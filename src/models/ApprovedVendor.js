const mongoose = require("mongoose");

const approved = new mongoose.Schema({
    sNo: { type: Number, required: true },
    nameOfSuppliers: { type: String, required: true },
    address: { type: String, required: true },
    contactPerson: { type: String, required: true },
    material: { type: String, required: true },
    suppliersCode: { type: String, required: true },
    auditDate: { type: String, required: true },
    nextAuditDueDate: { type: String, required: true },
}, {timestamps: true});

const ApprovedVendor = mongoose.model("approvedvendor", approved);
module.exports = ApprovedVendor;