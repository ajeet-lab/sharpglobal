const mongoose = require('mongoose');

const attenDBDSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    uin: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
    },
    timeIn: {
        type: String,
    },

    timeOut: {
        type: String,
    },

    isApproved:{
        type: String
    },

    remark: {
        type: String,
    },
});

const Attendbd = mongoose.model("attendbd", attenDBDSchema);
module.exports = Attendbd