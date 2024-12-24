const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    unit: {
        type: String,
    },
    gateKeeperUin: {
        type: Number,
    },
    uin: {
        type: Number,
    },
    name: {
        type: String,
    },
    isApproved: {
        type: String, default: "Pending"
    }, 
    type: {
        type: String,
    },
    mouin: {
        type: Number,
    },
    rrmouin: {
        type: Number,
    },
    bhuin: {
        type: Number,
    },
    bgrefuin: {
        type: Number,
    },
    rhuin: {
        type: Number,
    },
    houin: {
        type: Number,
    },
    notMarked: {
        type: Number,
    },
    marked: {
        type: Number,
    },
    timeIn: {
        type: String,
    },
    timeOut: {
        type: String,
    },
    statusIn: {
        type: Number,
    },
    extera1: {
        type: String,
    },
    city: {
        type: String,
    },
    zone: {
        type: String,
    },
    state: {
        type: String,
    },
    branch: {
        type: String,
    },
    status: {
        type: String,
    },
    rouin: {
        type: Number,
    },
    RHName: {
        type: String,
    },
    BHName: {
        type: String,
    },
    RRMOName: {
        type: String,
    },
    MOName: {
        type: String,
    },
    HOName: {
        type: String,
    },
    ROName: {
        type: String,
    },
    remark: {
        type: String
    },
    present: {
        type: String
    },
    // casualLeave: {type:String},
    // outletClose: {type:String},
    // photo: {type:String,},
    // weeklyOff:{type:String},
}, {timestamps: true});

const Attendance = mongoose.model("attendances", attendanceSchema);
module.exports = Attendance