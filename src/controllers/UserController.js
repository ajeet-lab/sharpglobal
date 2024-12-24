const Distillation = require('../models/Distillation');
const moment = require('moment');
const Chemist = require('../models/Chemist')

function UserController() {
    return {

        async distillation(req, res) {
            res.render("user/factory/distillation")
        },

        async postDistillation(req, res) {
            try {
                const paramsID = req.params.id;
                const {
                    plantNo,
                    batchNo,
                    objective,
                    plantStartTime,
                    batchCompleteTime,
                    batchTimeTaken,
                    feedItem,
                    feedQty,
                    qtyObjective,
                    interCutQty,
                    bottom,
                    water,
                    loss,
                } = req.body;

                const addDistillation = new Distillation({
                    uin: req.user.uin,
                    unit: req.user.unit,
                    plantNo,
                    batchNo,
                    objective,
                    plantStartTime: moment(plantStartTime).utcOffset("+05:30").format('lll'),
                    batchCompleteTime: moment(batchCompleteTime).utcOffset("+05:30").format('lll'),
                    batchTimeTaken,
                    feedItem,
                    feedQty,
                    qtyObjective,
                    interCutQty,
                    bottom,
                    water,
                    loss,
                    update_At: moment().utcOffset("+05:30").format('lll')
                });
                await addDistillation.save();
                req.flash("success_msg", "Updated")
                return res.redirect("/user/factory/distillation");

            } catch (error) {
                req.flash("error_msg", error.message);
                res.redirect("/user/factory/distillation");
            }
        },

        async distillationView(req, res) {
            try {
                const distillations = await Distillation.find({
                    uin: req.user.uin
                });
                res.render("user/factory/view", {
                    distillations
                })
            } catch (error) {
                req.flash("error_msg", error.message);
                res.redirect("/user/factory/view")
            }
        },



        // CHEMIST CONTROLLERS
        gcupload(req, res) {
            res.render('user/chemist/gcupload')
        },



        async postgcupload(req, res) {
            try {
                const fileUrl = req.protocol + '://' + req.get('host') + '/' + req.file.path;
                const {
                    productName,
                    datePackingOrder,
                    batchNo,
                    batchSize,
                    dispatchSize,
                    invoiceNo,
                    sharpProductCode,
                } = req.body;

                if (req.file.mimetype === 'application/pdf') {
                    const chemist = new Chemist({
                        uin: req.user.uin,
                        productName,
                        datePackingOrder,
                        batchNo,
                        batchSize,
                        dispatchSize,
                        invoiceNo,
                        sharpProductCode,
                        image_url: fileUrl
                    });
                    await chemist.save();
                    req.flash('success_msg', "Upload data")
                    res.redirect('/user/gc/upload');
                }else{
                    req.flash("error_msg", "Can upload PDF file Only");
                    res.redirect('/user/gc/upload');
                }
            } catch (error) {
                req.flash('error_msg', error.message);
                res.redirect('/user/gc/upload');
            }
        },


        async gcview(req, res) {
            try {
                const chemists = await Chemist.find({
                    uin: req.user.uin
                });
                if (chemists) {
                    res.render('user/chemist/view', {
                        chemists
                    })
                }

            } catch (error) {
                console.log(error.message)
            }
        },


        async logout(req, res) {
            res.clearCookie("userToken");
            return res.redirect('/');
        }

    }
}


module.exports = UserController;