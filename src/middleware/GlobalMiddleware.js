const jwt = require('jsonwebtoken');
const User = require('../models/User');

function GlobalMiddleware() {
    return {

        // USER AUTH MIDDLEWARE
        async userAuth(req, res, next) {
            try {
                const userToken = req.cookies.userToken;
                jwt.verify(userToken, 'secret', async (err, decoded) => {
                    if (err) {
                        req.flash("error_msg", "error Session expire please login");
                        res.redirect('/');
                    } else if (!decoded) {
                        req.flash("error_msg", "Decode Session expire please re-login");
                        res.redirect('/');
                    } else {
                        const user = await User.findById(decoded.id);
                        req.user = user;
                        res.locals.user = user;
                        next();

                    }
                })
            } catch (err) {
                req.flash("error_msg", "Catch Session expire please re-login");
                res.redirect('/');
            }
        },

        // ADMIN AUTH MIDDLEWARE
        async adminAuth(req, res, next) {
            try {
                const adminToken = req.cookies.adminToken;
                jwt.verify(adminToken, 'secret', async (err, decoded) => {
                    if (err) {
                        req.flash("error_msg", "error Session expire please login");
                        res.redirect('/');
                    } else if (!decoded) {
                        req.flash("error_msg", "Decode Session expire please re-login");
                        res.redirect('/');
                    } else {
                        const admin = await User.findById(decoded.id);
                        req.admin = admin;
                        res.locals.admin = admin;
                        next();                            
                    
                    }
                })
            } catch (err) {
                req.flash("error_msg", "Catch Session expire please re-login");
                res.redirect('/');
            }
        },

        // GateKeeper AUTH MIDDLEWARE
        async gateAuth(req, res, next) {
            try {
                const gateKeeperToken = req.cookies.gateKeeperToken;
                jwt.verify(gateKeeperToken, 'secret', async (err, decoded) => {
                    if (err) {
                        req.flash("error_msg", "Session expire please login");
                        res.redirect('/');
                    } else if (!decoded) {
                        req.flash("error_msg", "Session expire please login");
                        res.redirect('/');
                    } else {
                        const user = await User.findById(decoded.id);
                        req.user = user;
                        res.locals.user = user;
                        next();
                    }
                })
            } catch (err) {
                req.flash("error_msg", "Session expire please login");
                res.redirect('/');
            }
        },

        // GateEntry AUTH MIDDLEWARE
        async gate2Auth(req, res, next) {
            try {
                const gateEntryToken = req.cookies.gateEntryToken;
                jwt.verify(gateEntryToken, 'secret', async (err, decoded) => {
                    if (err) {
                        req.flash("error_msg", "Session expire please login");
                        res.redirect('/');
                    } else if (!decoded) {
                        req.flash("error_msg", "Session expire please login");
                        res.redirect('/');
                    } else {
                        const gateEntry = await User.findById(decoded.id);
                        req.gateEntry = gateEntry;
                        res.locals.gateEntry = gateEntry;
                        next();
                    }
                })
            } catch (err) {
                req.flash("error_msg", "Session expire please login");
                res.redirect('/');
            }
        },

        // QC AUTH MIDDLEWARE
        async qcAuth(req, res, next) {
            try {
                const qcToken = req.cookies.qcToken;
                jwt.verify(qcToken, 'secret', async (err, decoded) => {
                    if (err) {
                        req.flash("error_msg", "Session expire please login");
                        res.redirect('/');
                    } else if (!decoded) {
                        req.flash("error_msg", "Session expire please login");
                        res.redirect('/');
                    } else {
                        const qcUser = await User.findById(decoded.id);
                        req.qcUser = qcUser;
                        res.locals.qcUser = qcUser;
                        next();
                    }
                })
            } catch (err) {
                req.flash("error_msg", "Session expire please login");
                res.redirect('/');
            }
        },

        // HR AUTH MIDDLEWARE
        async hrAuth(req, res, next) {
            try {
                const hrToken = req.cookies.hrToken;
                jwt.verify(hrToken, 'secret', async (err, decoded) => {
                    if (err) {
                        req.flash("error_msg", "Session expire please login");
                        res.redirect('/');
                    } else if (!decoded) {
                        req.flash("error_msg", "Session expire please login");
                        res.redirect('/');
                    } else {
                        const hrUser = await User.findById(decoded.id);
                        req.hrUser = hrUser;
                        res.locals.hrUser = hrUser;
                        next();
                    }
                })
            } catch (err) {
                req.flash("error_msg", "Session expire please login");
                res.redirect('/');
            }
        },

         // Wherehouse AUTH MIDDLEWARE
         async wherehouseAuth(req, res, next) {
            try {
                const wherehouseToken = req.cookies.wherehouseToken;
                jwt.verify(wherehouseToken, 'secret', async (err, decoded) => {
                    if (err) {
                        req.flash("error_msg", "Session expire please login");
                        res.redirect('/');
                    } else if (!decoded) {
                        req.flash("error_msg", "Session expire please login");
                        res.redirect('/');
                    } else {
                        const whereUser = await User.findById(decoded.id);
                        req.whereUser = whereUser;
                        res.locals.whereUser = whereUser;
                        next();
                    }
                })
            } catch (err) {
                req.flash("error_msg", "Session expire please login");
                res.redirect('/');
            }
        },

       
    }
}

module.exports = GlobalMiddleware;