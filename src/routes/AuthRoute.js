const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.all('/*', (req, res, next)=> {
    res.locals.layout = "auth";
    next()
});

// Login Route
router.route('/')
    .get(AuthController().login)
    .post(AuthController().postLogin);


// router.put("/all/update", AuthController().allUpdate);

module.exports = router