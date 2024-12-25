const jwt = require('jsonwebtoken');
const User = require('../models/User');

function AuthController() {
    return {
        login(req, res) {
            res.render('auth/login')
        },

        async postLogin(req, res) {
            try {
                const {
                    uin,
                    password
                } = req.body;
                console.log("Request body ",req.body )
                const user = await User.findOne({
                    uin: parseInt(uin)
                });
                if (!user) {
                    req.flash("error_msg", "Invalid Credentials")
                    return res.redirect('/');
                } else if (password !== 's1234') {
                    req.flash("error_msg", "Invalid Credentials")
                    return res.redirect('/');
                }else if(user.role === "gateEntry"){
                    const data = {
                        id: user._id
                    }
                    const gateEntryToken = jwt.sign(data, 'secret', {
                        expiresIn: '2d'
                    });
                    res.cookie('gateEntryToken', gateEntryToken, {
                        maxAge: 86400000,
                        httpOnly: true
                    });
                    return res.redirect('/gatekeeper/approve-delear-list');
                }else if(user.role === "qc"){
                    const data = {
                        id: user._id
                    }
                    const qcToken = jwt.sign(data, 'secret', {
                        expiresIn: '2d'
                    });
                    res.cookie('qcToken', qcToken, {
                        maxAge: 86400000,
                        httpOnly: true
                    });
                    return res.redirect('/qc/materiallog');
                } else if (user.empType === "tl") {
                    const data = {
                        id: user._id
                    }
                    const gateKeeperToken = jwt.sign(data, 'secret', {
                        expiresIn: '2d'
                    });
                    res.cookie('gateKeeperToken', gateKeeperToken, {
                        maxAge: 86400000,
                        httpOnly: true
                    });
                    return res.redirect('/gatekeeper/attendance/gate');
                }else if(user.role == "Wherehouse"){
                    const data = {
                        id: user._id
                    }
                    const wherehouseToken = jwt.sign(data, 'secret', {
                        expiresIn: '2d'
                    });
                    res.cookie('wherehouseToken', wherehouseToken, {
                        maxAge: 86400000,
                        httpOnly: true
                    });
                    return res.redirect("/wherehouse/material/pending");
                } else if (user.designation === "Reporting Manager" || user.designation === "HR EXECUTIVE" || user.designation === "EA to MD Sir") {
                    const data = {
                        id: user._id
                    }
                    const hrToken = jwt.sign(data, 'secret', {
                        expiresIn: '2d'
                    });
                    res.cookie('hrToken', hrToken, {
                        maxAge: 86400000,
                        httpOnly: true
                    });
                    return res.redirect('/hr/attendance');
                } else if (user.designation === "Supervisor" || user.designation === "CHEMIST") {
                    const data = {
                        id: user._id
                    }
                    const userToken = jwt.sign(data, 'secret', {
                        expiresIn: '2d'
                    });
                    res.cookie('userToken', userToken, {
                        maxAge: 86400000,
                        httpOnly: true
                    })

                    if (user.designation === "Supervisor") {
                        return res.redirect('/user/factory/distillation');
                    } else {
                        return res.redirect('/user/gc/upload');
                    }

                } else {
                    const data = {
                        id: user._id
                    }
                    const adminToken = jwt.sign(data, 'secret', {
                        expiresIn: '2d'
                    });
                    res.cookie('adminToken', adminToken, {
                        maxAge: 86400000,
                        httpOnly: true
                    })
                    return res.redirect('/admin/home');
                }
            } catch (err) {
                req.flash("error_msg", err.message);
                return res.redirect('/');
            }
        },


        async allUpdate(req, res) {
            const attendace = await Attendance.find({});
            const emp = await User.find({});
            if (attendace) {
                emp.forEach(async atten => {
                    const emp = await AttenDBD.findOne({uin: atten.uin, unit:"BHIWADI"});
                    console.log(emp)
                    await Attendance.findOneAndUpdate({
                       uin: atten.uin, unit:"BHIWADI", designation:undefined
                    }, {
                        designation: atten.designation
                    }, {
                        new: true
                    });
                })
                res.json({message: "Success"})
            }else{
                res.json("failed")
            }

        }

    }
}

module.exports = AuthController;