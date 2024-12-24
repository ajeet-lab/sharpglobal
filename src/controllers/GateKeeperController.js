const Attendance = require('../models/Attendance');
const User = require('../models/User');
const AttenDBD = require('../models/AttenDBD');
const moment = require('moment');
const GateEntry = require('../models/GateEntry');
const ApprovedVendor = require('../models/ApprovedVendor');

function GateKeeperController() {
    return {

        // GATEKEEPER HOME
        async home(req, res) {
            res.render('gatekeeper/home');
        },


        // ALL EMPLOYEE GATE ATTENDANCE
        async gateAttendance(req, res) {
            const user = req.user;
            const empLists = await User.find({
                unit: user.unit
            });
            res.render("gatekeeper/attendance/gate", {
                user,
                empLists
            })
        },



        // MARK IN ATTENDANCE
        async gateMarkIn(req, res) {
            try {
                const uin = req.params.id;
                const gateEmp = await User.findOne({
                    uin: uin
                });
                const gateUser = await Attendance.findOne({
                    uin: uin
                });
                if (gateUser != null) {
                    if (gateUser.notMarked === 1) {
                        gateUser.notMarked = 0;
                        gateUser.marked = 1;
                        gateUser.isApproved = "Pending";
                        gateUser.remark = "Present";
                        gateUser.statusIn = gateUser.statusIn + 1;
                        gateUser.timeIn = moment().utcOffset("+05:30").format('LLL');
                        await gateUser.save();
                        req.flash("success_msg", "Attendance Marked Successfull..");
                        return res.redirect('/gatekeeper/attendance/gate')
                    } else {
                        req.flash("error_msg", "Attendance already marked")
                        return res.redirect('/gatekeeper/attendance/gate')
                    }
                } else {
                    const user = new Attendance({
                        unit: req.user.unit,
                        gateKeeperUin: req.user.uin,
                        uin: gateEmp.uin,
                        name: gateEmp.name,
                        empType: gateEmp.empType,
                        isApproved: "Pending",
                        notMarked: 0,
                        marked: 1,
                        timeIn: moment().utcOffset("+05:30").format('LLL'),
                        statusIn: 1,
                        remark: "Present"
                    });
                    await user.save();
                    req.flash("success_msg", "Attendance Marked Successfull..");
                    return res.redirect('/gatekeeper/attendance/gate');
                }

            } catch (error) {
                req.flash("error_msg", error.message)
                res.redirect('/gatekeeper/attendance/gate')
            }
        },


        // MARK OUT ATTENDANCE
        async gateMarkOut(req, res) {
            try {
                const uin = req.params.id;
                const gateUser = await Attendance.findOne({
                    uin: uin
                });
                if (gateUser) {
                    if (gateUser.notMarked === 0 && (gateUser.isApproved === "Approved" || gateUser.isApproved === "Rejected")) {
                        gateUser.notMarked = 1;
                        gateUser.marked = 0;
                        gateUser.remark = "";
                        gateUser.timeOut = moment().utcOffset("+05:30").format('LLL');
                        await gateUser.save();

                        const attdbd = new AttenDBD({
                            user: req.user._id,
                            unit: req.user.unit,
                            uin: gateUser.uin,
                            name: gateUser.name,
                            designation: gateUser.designation,
                            timeIn: gateUser.timeIn,
                            timeOut: gateUser.timeOut,
                            remark: "Present"
                        });
                        await attdbd.save();
                        req.flash("success_msg", "Attendance Mark out Successfull..");
                        res.redirect('/gatekeeper/attendance/gate')
                    } else if (gateUser.notMarked === 1) {
                        req.flash("error_msg", "You have not marked your attendance first mark in then mark out.")
                        res.redirect('/gatekeeper/attendance/gate')
                    } else {
                        req.flash("error_msg", "Your reporting manager did not approve the attendance Please get the attendance approved.")
                        res.redirect('/gatekeeper/attendance/gate')
                    }
                } else {
                    req.flash("error_msg", "Attendance not Marked..")
                    res.redirect('/gatekeeper/attendance/gate')
                }

            } catch (error) {
                req.flash("error_msg", error.message)
                res.redirect('/gatekeeper/attendance/gate')
            }
        },


        // VIEW ATTENDANCE ATTENDANCE
        async viewAttendance(req, res) {
            const attenDBD = await AttenDBD.find({
                unit: req.user.unit
            });
            res.render("gatekeeper/attendance/view", {
                attenDBD
            })
        },


        // GATEKEEPER LOGOUT
        async logout(req, res) {
            res.clearCookie("gateKeeperToken");
            return res.redirect('/');
        },



        async approveDelearList(req, res) {
            try {
                const vendors = await ApprovedVendor.find({}).sort([['nameOfSuppliers', 1]]);
                res.render("gatekeeper/material/dealerlist", {
                    vendors
                });
            } catch (error) {
                console.log(error);
            }
        },

        async dealer(req, res) {
            const id = req.params.id
            try {
                const vendor = await ApprovedVendor.findById(id);
                console.log(vendor)
                let ge = await GateEntry.find({
                    unit: req.gateEntry.unit
                });
                ge = ge[ge.length - 1];
                res.render("gatekeeper/material/gateentry", {
                    vendor,
                    ge
                })
            } catch (error) {
                console.log(error.message)
            }
        },


        // MATERIAL FORM
        async gateEntry(req, res) {
            try {
                let ge = await GateEntry.find({
                    unit: req.gateEntry.unit
                });
                if (ge == "") {
                    return res.render("gatekeeper/material/gateentry", {
                        vendor: null,
                        ge: undefined
                    });
                };
                ge = ge[ge.length - 1];
                res.render("gatekeeper/material/gateentry", {
                    vendor: null,
                    ge
                });
            } catch (error) {
                res.redirect("/gatekeeper/gateentry");
            }

        },

        async postGateEntry(req, res) {
            const id = req.params.id
            try {
                req.body.uin = req.gateEntry.uin;
                req.body.unit = req.gateEntry.unit;
                const gateEntry = new GateEntry(req.body);
                await gateEntry.save();
                req.flash("success_msg", "Entry Submit successfully..");
                res.redirect("/gatekeeper/gateentry/view");
            } catch (error) {
                req.flash("error_msg", error.message);
                res.redirect("/gatekeeper/gateentry/");
            }
        },

        async gateEntryView(req, res) {
            try {
                const gateEntry = await GateEntry.find({
                    unit: req.gateEntry.unit, status: "Pending"
                });
                res.render("gatekeeper/material/view", {
                    gateEntry
                });
            } catch (error) {
                req.flash("error_msg", error.message);
                res.redirect("/gatekeeper/gateentry/view");
            }
        },

        // GATEKEEPER LOGOUT
        async logout2(req, res) {
            res.clearCookie("gateKeeper2Token");
            return res.redirect('/');
        },

    }
}

module.exports = GateKeeperController;