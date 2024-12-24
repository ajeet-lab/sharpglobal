const mongoose  = require('mongoose');

const paymentSchema = new mongoose.Schema({
    paymentTerm:{
        type: String
    }
}, {timestamps: true});

const PaymentTerm = mongoose.model('paymentterm', paymentSchema);
module.exports = PaymentTerm