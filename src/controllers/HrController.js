const Attendance = require("../models/Attendance")
const AttenDBD = require("../models/AttenDBD");
const ExcelJs = require("exceljs");
const User = require("../models/User");

function HrController() {
    return {
        // GET ATTENDANCE CONTROLLER
        home(req, res) {
            res.render("hr/home")
        },

        // GET ATTENDANCE CONTROLLER
        attendance(req, res) {
            res.render("hr/attendance/attendance")
        },

        // VIEW ALL ATTENDENCE CONTROLLER
        async viewAttendance(req, res) {
            try {

                if (req.hrUser.uin === 20130) {
                    const attenDBD = await AttenDBD.find({});
                    res.render("hr/attendance/viewattendance", {
                        attenDBD
                    });
                } else {
                    const attenDBD = await AttenDBD.find({
                        unit: req.hrUser.unit
                    });
                    res.render("hr/attendance/viewattendance", {
                        attenDBD
                    });
                }
            } catch (error) {
                req.flash("error_msg", error.message);
                res.redirect("/hr/attendance");
            }





        },

        // VIEW APPROVAL ATTENDANCE
        async approvalAttendance(req, res) {
            try {
                const attendance = await Attendance.find({
                    unit: req.hrUser.unit
                });
                res.render("hr/attendance/approveattendance", {
                    attendance
                })

            } catch (error) {
                req.flash("error_msg", error.message);
                res.redirect("/hr/attendance")
            }
        },


        // APPROVED ATTENDANCE CONTROLLER
        async approvedAttendance(req, res) {
            try {
                const uin = req.params.id;
                const attendance = await Attendance.find({
                    uin
                });
                if (attendance != "") {
                    await Attendance.findOneAndUpdate({
                        uin: uin
                    }, {
                        isApproved: "Approved",
                        updatedAt: new Date()
                    }, {
                        new: true
                    });
                    req.flash("success_msg", "Attendance Approved");
                    return res.redirect("/hr/attendance/approve")
                }
            } catch (error) {
                req.flash("error_msg", error.message);
                return res.redirect("/hr/attendance/approve")
            }

        },

        // REJECTED ATTENDANCE CONTROLLER
        async rejectAttendance(req, res) {
            try {
                const uin = req.params.id;
                const attendance = await Attendance.findOne({
                    uin
                });
                if (attendance.notMarked === 0 && attendance.marked === 1) {
                    await Attendance.findOneAndUpdate({
                        uin: uin
                    }, {
                        notMarked: 1,
                        marked: 0,
                        statusIn: attendance.statusIn - 1,
                        remark: 'Rejected',
                        updatedAt: new Date()
                    }, {
                        new: true
                    });
                    req.flash("success_msg", "Attendance has been rejected");
                    return res.redirect("/hr/attendance/approve")
                }
            } catch (error) {
                req.flash("error_msg", error.message);
                return res.redirect("/hr/attendance/approve")
            }

        },



        // SUMMERY ATTENDANCE CONTROLLER
        async attendanceSummery(req, res) {
            try {

                if (req.hrUser.uin === 20130 || req.hrUser.uin === 20157) {
                    const appAtten = await AttenDBD.find({timeIn: "September 25"});
                    return res.render("hr/attendance/summery", {
                        appAtten: appAtten
                    })
                } else {
                    const appAtten = await AttenDBD.find({
                        unit: req.hrUser.unit
                    });
                    return res.render("hr/attendance/summery", {
                        appAtten: appAtten
                    })
                }
            } catch (error) {
                req.flash("error_msg", error.message)
                res.redirect("/hr/attendance")
            }
        },

        // Export Attendance Excel
        async exportAttendance(req, res) {
            try {
                let attendance = await AttenDBD.find({});
                const workbook = new ExcelJs.Workbook();
                const worksheet = workbook.addWorksheet("Attendance");

                let allAttendance = {}
                attendance.forEach(async atten => {
                    let uin = atten.uin;
                    let date = new Date(atten.timeIn).getDate() + 1;
                    let sAtten = allAttendance[uin]
                    if (sAtten == null) {
                        let newArr = []
                        for (let i = 1; i <= 31; i++) {
                            newArr.push("");
                        }
                        let name = [atten.name, atten.unit]
                        sAtten = name.concat(newArr);
                    }
                    let inTime = new Date(atten.timeIn).toLocaleTimeString();
                    let outTime = new Date(atten.timeOut).toLocaleTimeString();
                    // let inTime = new Date(atten.timeIn);
                    // let outTime = new Date(atten.timeOut);

                    let milisecond = new Date(atten.timeOut) - new Date(atten.timeIn)
                    let hours = Math.floor(milisecond / 3600000) < 10 ? "0" + Math.floor(milisecond / 3600000) : Math.floor(milisecond / 3600000);

                    let minutes = Math.floor((milisecond / 60000) % 60) < 10 ? "0" + Math.floor((milisecond / 60000) % 60) : Math.floor((milisecond / 60000) % 60);

                    const d = new Date().getMonth();
                    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


                    if (new Date(atten.timeIn) > new Date(months[d - 1] + " 25, 2021 11:59 PM") && new Date(atten.timeIn) < new Date(months[d] + " 25, 2021 11:59 PM")) {

                        sAtten[date] = sAtten[date] + " " + inTime + " " + outTime + " " + hours + "H :" + minutes + "M";

                        // sAtten[date] = sAtten[date] + " " + inTime + " " + outTime
                    }

                    allAttendance[uin] = sAtten

                })

                worksheet.columns = [{
                        header: "UIN",
                        width: 10
                    },
                    {
                        header: "Name",
                        width: 10
                    },

                    {
                        header: "Unit",
                        width: 10
                    },

                    {
                        header: "1",
                        width: 20
                    },

                    {
                        header: "2",
                        width: 20
                    },

                    {
                        header: "3",
                        width: 20
                    },

                    {
                        header: "4",
                        width: 20
                    },

                    {
                        header: "5",
                        width: 20
                    },


                    {
                        header: "6",
                        width: 20
                    },

                    {
                        header: "7",
                        width: 20
                    },

                    {
                        header: "8",
                        width: 20
                    },

                    {
                        header: "9",
                        width: 20
                    },

                    {
                        header: "10",
                        width: 20
                    },

                    {
                        header: "11",
                        width: 20
                    },

                    {
                        header: "12",
                        width: 20
                    },
                    {
                        header: "13",
                        width: 20
                    },

                    {
                        header: "14",
                        width: 20
                    },


                    {
                        header: "15",
                        width: 20
                    },

                    {
                        header: "16",
                        width: 20
                    },

                    {
                        header: "17",
                        width: 20
                    },

                    {
                        header: "18",
                        width: 20
                    },

                    {
                        header: "19",
                        width: 20
                    },

                    {
                        header: "20",
                        width: 20
                    },

                    {
                        header: "21",
                        width: 20
                    },

                    {
                        header: "22",
                        width: 20
                    },

                    {
                        header: "23",
                        width: 20
                    },

                    {
                        header: "24",
                        width: 20
                    },

                    {
                        header: "25",
                        width: 20
                    },

                    {
                        header: "26",
                        width: 20
                    },

                    {
                        header: "27",
                        width: 20
                    },

                    {
                        header: "28",
                        width: 20
                    },

                    {
                        header: "29",
                        width: 20
                    },

                    {
                        header: "30",
                        width: 20
                    },

                    {
                        header: "31",
                        width: 20
                    },
                ];

                for (let lData in allAttendance) {
                    let sData = allAttendance[lData];
                    sData.unshift(lData);
                    worksheet.addRow(sData);
                }
                worksheet.getRow(1).eachCell((cell) => {
                    cell.font = {
                        bold: true
                    };
                });

                res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

                res.setHeader("Content-Disposition", "attachment; filename=Export attendance.xlsx");
                await workbook.xlsx.write(res);
                res.end();
            } catch (error) {
                console.log("catch")
                req.flash("error_msg", error.message);
                res.redirect('/hr/attendance/view');
            }
        },

        // EXPORT SUMMERY
        async exportSummery(req, res) {
            try {
                let attendance;
                if (req.hrUser.uin === 20130 || req.hrUser.uin === 20157) {
                    attendance = await AttenDBD.find({});
                } else {
                    attendance = await AttenDBD.find({
                        unit: req.hrUser.unit
                    });
                }
                const workbook = new ExcelJs.Workbook();
                const worksheet = workbook.addWorksheet("Attendance");

                let allAttendance = {}
                attendance.forEach(async atten => {
                    let uin = atten.uin;
                    let date = new Date(atten.timeIn).getDate() + 1;
                    let sAtten = allAttendance[uin]
                    if (sAtten == null) {
                        let newArr = []
                        for (let i = 1; i <= 31; i++) {
                            newArr.push("");
                        }
                        let name = [atten.name, atten.unit]
                        sAtten = name.concat(newArr);
                    }

                    let milisecond = new Date(atten.timeOut) - new Date(atten.timeIn)
                    let hours = Math.floor(milisecond / 3600000) < 10 ? "0" + Math.floor(milisecond / 3600000) : Math.floor(milisecond / 3600000)

                    let minutes = Math.floor((milisecond / 60000) % 60) < 10 ? "0" + Math.floor((milisecond / 60000) % 60) : Math.floor((milisecond / 60000) % 60)


                    if (new Date(atten.timeIn) > new Date("September 25, 2021 11:59 PM") && new Date(atten.timeIn) < new Date("October 25, 2021 11:59 PM")) {
                        let timeCal = hours + ":" + minutes;
                        let attend = timeCal > '04:00' ? 'P' : (timeCal <= '04:00' && timeCal >= '00:30') ? 'H' : 'A';
                        sAtten[date] = sAtten[date] + attend;
                    }
                    allAttendance[uin] = sAtten

                })

                worksheet.columns = [{
                        header: "UIN",
                        width: 10
                    },
                    {
                        header: "Name",
                        width: 10
                    },

                    {
                        header: "Unit",
                        width: 10
                    },

                    {
                        header: "1",
                        width: 5
                    },

                    {
                        header: "2",
                        width: 5
                    },

                    {
                        header: "3",
                        width: 5
                    },

                    {
                        header: "4",
                        width: 5
                    },

                    {
                        header: "5",
                        width: 5
                    },


                    {
                        header: "6",
                        width: 5
                    },

                    {
                        header: "7",
                        width: 5
                    },

                    {
                        header: "8",
                        width: 5
                    },

                    {
                        header: "9",
                        width: 5
                    },

                    {
                        header: "10",
                        width: 5
                    },

                    {
                        header: "11",
                        width: 5
                    },

                    {
                        header: "12",
                        width: 5
                    },
                    {
                        header: "13",
                        width: 5
                    },

                    {
                        header: "14",
                        width: 5
                    },


                    {
                        header: "15",
                        width: 5
                    },

                    {
                        header: "16",
                        width: 5
                    },

                    {
                        header: "17",
                        width: 5
                    },

                    {
                        header: "18",
                        width: 5
                    },

                    {
                        header: "19",
                        width: 5
                    },

                    {
                        header: "20",
                        width: 5
                    },

                    {
                        header: "21",
                        width: 5
                    },

                    {
                        header: "22",
                        width: 5
                    },

                    {
                        header: "23",
                        width: 5
                    },

                    {
                        header: "24",
                        width: 5
                    },

                    {
                        header: "25",
                        width: 5
                    },

                    {
                        header: "26",
                        width: 5
                    },

                    {
                        header: "27",
                        width: 5
                    },

                    {
                        header: "28",
                        width: 5
                    },

                    {
                        header: "29",
                        width: 5
                    },

                    {
                        header: "30",
                        width: 5
                    },

                    {
                        header: "31",
                        width: 5
                    },

                ];

                for (let lData in allAttendance) {
                    let sData = allAttendance[lData];
                    sData.unshift(lData);
                    worksheet.addRow(sData);
                }


                worksheet.getRow(1).eachCell((cell) => {
                    cell.font = {
                        bold: true
                    };
                });

                res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

                res.setHeader("Content-Disposition", "attachment; filename=Export attendance.xlsx");
                await workbook.xlsx.write(res);
                res.end();
            } catch (error) {
                console.log("catch")
                req.flash("error_msg", error.message);
                res.redirect('/hr/attendance/summery');
            }
        },


        // UPDATE EMPLOYEE
        employeeUpdate(req, res) {
            res.render("hr/employee/update", {
                findUser: ""
            })
        },

        // POST UPDATE EMPLOYEE
        async putEmployeeUpdate(req, res) {
            try {
                const {
                    uin,
                    email,
                    mobile,
                    status
                } = req.body;
                const hrUser = req.hrUser;
                const findUser = await User.findOne({
                    uin,
                    unit: hrUser.unit
                });
                if (findUser) {
                    await User.findByIdAndUpdate(findUser._id, {
                        email,
                        mobile,
                        status,
                        updateAt: Date.now()
                    }, {
                        new: true
                    });
                    req.flash("success_msg", "Update successfully..");
                    res.redirect("/hr/employee/update");
                }

            } catch (error) {
                req.flash("error_msg", error.message);
                res.redirect("/hr/employee/update");
            }
        },


        // FIND EMPLOYEE CONTROLLER
        async findEmployee(req, res) {
            try {
                const findUser = await User.findOne({
                    uin: req.query.uin,
                    unit: req.hrUser.unit
                });
                if (findUser) {
                    return res.render("hr/employee/update", {
                        findUser
                    })
                } else {
                    req.flash("error_msg", "Employee not found..")
                    return res.redirect("/hr/employee/update")
                }

            } catch (error) {
                console.log(error.message);
            }
        },


        // CREATE USER
        async createUser(req, res) {
            const lastUser = await User.find({});
            let luser = lastUser[lastUser.length - 1];
            res.render('hr/employee/create', {
                luser
            });
        },



        // POST CREATE USER CONTROLLER
        async postCreateUser(req, res) {
            try {

                const user = new User(req.body);
                await user.save();
                req.flash("success_msg", "User Create Successfully");
                res.redirect('/hr/employee/create')
            } catch (error) {
                req.flash("error_msg", error.message);
                res.redirect('/hr/employee/create')
            }
        },

        // LOGOUT CONTROLLER
        async logout(req, res) {
            res.clearCookie("hrToken");
            return res.redirect('/');
        }

    }
}

module.exports = HrController;