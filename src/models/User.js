const mongoose = require('mongoose');

const empdatasSchema = new mongoose.Schema({
    uin: {
        type: Number
    },
    role: {type: String},

    designation: {
        type: String
    },

    depart: {
        type: String
    },

    state: {
        type: String
    },
    city: {
        type: String
    },
    
    empType: {
        type: String
    },

    vertical: {
        type: String
    },
    funding: {
        type: String
    },
  
    unit: {
        type: String
    },

    shif: {
        type: String
    },

    name: {
        type: String
    },
   
    agencyid: {
        type: String
    },
    outletcode: {
        type: String
    },
    hoid: {
        type: String
    },

    outletname: {
        type: String
    },
    outlettype: {
        type: String
    },

    maritalstatus: {
        type: String
    },
  
    mobile: {
        type: Number
    },
    email: {
        type: String
    },
    asmpid: {
        type: String
    },
    gender: {
        type: String
    },
    reportingManager: {
        type: String
    },

    education: {
        type: String
    },
    experience: {
        type: String
    },

    dob: {
        type: String
    },

    doj: {
        type: String
    },

    tluin: {
        type: String
    },

    tsmuin: {
        type: String
    },
    asmuin: {
        type: String
    },
    rsmuin: {
        type: String
    },
    zsmuin: {
        type: String
    },
    kamid: {
        type: String
    },

    houin: {
        type: String
    },
    status: {
        type: String
    },

    fatherage: {
        type: String
    },
    motherName: {
        type: String
    },

    father: {
        type: String
    },
    insurance: {
        type: String
    },

    esi: {
        type: String
    },
    pfnumber: {
        type: String
    },

    nameInBank: {
        type: String
    },
    bankName: {
        type: String
    },

    accountNumber: {
        type: Number
    },
    ifsc: {
        type: String
    },

    dol: {
        type: String
    },
    aadhar: {
        type: Number
    },

    uan: {
        type: Number
    },
    panCard: {
        type: String
    },

    offeredSalary: {
        type: String
    },
    tierSalary: {
        type: String
    },

    modifiedtime: {
        type: String
    },
    detailsPendency: {
        type: String
    },

    referenceBy: {
        type: String
    },
    recruitedBy: {
        type: String
    },

    appointmentBy: {
        type: String
    },
    ctc: {
        type: Number
    },

    grossSalary: {
        type: Number
    },
    basicSalary: {
        type: Number
    },

    hra: {
        type: Number
    },
    medical : {
        type: String
    },

    conveyance : {
        type: Number
    },

    splAllowances : {
        type: Number
    },

    lta: {
        type: Number
    },

    personalAllowance : {
        type: Number
    },
    enquiryAccess: {
        type: String
    },


});

const User = mongoose.model("empdatas", empdatasSchema);
module.exports = User;