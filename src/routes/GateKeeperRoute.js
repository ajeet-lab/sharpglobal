const express = require('express');
const router = express.Router();
const GateKeeperController = require('../controllers/GateKeeperController');
const GlobalMiddleware = require('../middleware/GlobalMiddleware');

router.all('/*', (req, res, next) => {
    res.locals.layout = "gatekeeper";
    next()
});


// HOME ROUTE
router.route('/home')
    .get(GlobalMiddleware().gateAuth, GateKeeperController().home);

// GET ATTENDANCE  ROUTES
router.route('/attendance/gate')
    .get(GlobalMiddleware().gateAuth, GateKeeperController().gateAttendance);


router.route('/gate/markIn/:id')
    .get(GlobalMiddleware().gateAuth, GateKeeperController().gateMarkIn)

router.route('/gate/markOut/:id').get(GlobalMiddleware().gateAuth, GateKeeperController().gateMarkOut);


router.route('/attendance/view')
    .get(GlobalMiddleware().gateAuth, GateKeeperController().viewAttendance);

router.get('/logout', GlobalMiddleware().gateAuth, GateKeeperController().logout);





router.route("/approve-delear-list")
    .get(GlobalMiddleware().gate2Auth, GateKeeperController().approveDelearList);

router.route("/dealer/:id")
    .get(GlobalMiddleware().gate2Auth, GateKeeperController().dealer);

// MATERIAL FORM
router.route("/gateentry")
    .get(GlobalMiddleware().gate2Auth, GateKeeperController().gateEntry)
    .post(GlobalMiddleware().gate2Auth, GateKeeperController().postGateEntry);

router.get("/gateentry/view", GlobalMiddleware().gate2Auth, GateKeeperController().gateEntryView)    

    
router.get('/logout2', GlobalMiddleware().gate2Auth, GateKeeperController().logout2);



module.exports = router