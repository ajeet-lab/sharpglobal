const express = require('express');
const router = express.Router();
const GlobalMiddleware = require('../middleware/GlobalMiddleware')
const HrController = require('../controllers/HrController')

router.all('/*', (req, res, next) => {
    res.locals.layout = "hr";
    next()
})

// DASHBOARD ROUTE
// router.get('/home', GlobalMiddleware().hrAuth, HrController().home);

// ATTENDACE HOME ROUTE
router.route('/attendance')
    .get(GlobalMiddleware().hrAuth, HrController().attendance)

// VIEW ALL ATTENDANCE ROUTE
router.route('/attendance/view')
    .get(GlobalMiddleware().hrAuth, HrController().viewAttendance)

// APPROVAL MARK IN ATTENDANCE 
router.route('/attendance/approve')
    .get(GlobalMiddleware().hrAuth, HrController().approvalAttendance)

// UPDATE APPROVAL MARK IN ATTENDANCE
router.route('/attendance/approved/:id')
    .put(GlobalMiddleware().hrAuth, HrController().approvedAttendance)

// REJECTED MARK IN ATTENDANCE
router.route('/attendance/reject/:id')
    .put(GlobalMiddleware().hrAuth, HrController().rejectAttendance)


// ATTENDANCE SUMMERY
router.route('/attendance/summery')
    .get(GlobalMiddleware().hrAuth, HrController().attendanceSummery)


// EXPORT ATTENDANCE SUMMERY
router.get('/export/summery', GlobalMiddleware().hrAuth, HrController().exportSummery);

// EXPORT ATTENDANCE LISTS
router.get('/export/attendance', GlobalMiddleware().hrAuth, HrController().exportAttendance);


// UPDATE EMPLOYEE ROUTE
router.route("/employee/update")
    .get(GlobalMiddleware().hrAuth, HrController().employeeUpdate)
    .put(GlobalMiddleware().hrAuth, HrController().putEmployeeUpdate);

// FIND EMPLOYEE AND UPDATE EMPLOYEE ROUTE
router.route("/find/employee")
    .get(GlobalMiddleware().hrAuth, HrController().findEmployee)

//GET CREATE PAGE AND CREATE EMPLOYEE ROUTE
router.route('/employee/create')
    .get(GlobalMiddleware().hrAuth, HrController().createUser)
    .post(GlobalMiddleware().hrAuth, HrController().postCreateUser)


// LOGOUT ROUTE
router.get('/logout', GlobalMiddleware().hrAuth, HrController().logout);

module.exports = router