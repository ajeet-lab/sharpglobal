const express = require('express');
const router = express.Router();
const WherehouseController = require('../controllers/WherehouseController');
const GlobalMiddleware = require('../middleware/GlobalMiddleware');

router.all('/*', (req, res, next) => {
    res.locals.layout = "wherehouse";
    next();
});



router.route("/material/pending")
    .get(GlobalMiddleware().wherehouseAuth, WherehouseController().pendingList)


router.route("/material/checklist")
    .get(GlobalMiddleware().wherehouseAuth, WherehouseController().check1list)
    .post(GlobalMiddleware().wherehouseAuth, WherehouseController().check1listPost)    

router.route("/material/checklist/:id")
    .get(GlobalMiddleware().wherehouseAuth, WherehouseController().checklist)
    .post(GlobalMiddleware().wherehouseAuth, WherehouseController().postChecklist)



router.route("/material/physical")
    .get(GlobalMiddleware().wherehouseAuth, WherehouseController().physical)
    .post(GlobalMiddleware().wherehouseAuth, WherehouseController().postPhysical)


router.route("/material/incoming")
    .get(GlobalMiddleware().wherehouseAuth, WherehouseController().incoming)
    .post(GlobalMiddleware().wherehouseAuth, WherehouseController().postIncoming)



router.route("/material/view/checklist")
    .get(GlobalMiddleware().wherehouseAuth, WherehouseController().viewChecklist)

router.route("/material/view/physical")
    .get(GlobalMiddleware().wherehouseAuth, WherehouseController().viewPhysical)

router.route("/material/view/incoming")
    .get(GlobalMiddleware().wherehouseAuth, WherehouseController().viewIncoming)


    
router.route("/stock/register")
    .get(GlobalMiddleware().wherehouseAuth, WherehouseController().stockRegister)
    .post(GlobalMiddleware().wherehouseAuth, WherehouseController().postStockRegister)


router.route("/stock/request")
    .get(GlobalMiddleware().wherehouseAuth, WherehouseController().stockRequest)
    .post(GlobalMiddleware().wherehouseAuth, WherehouseController().postStockRequest)

router.route("/stock/issue")
    .get(GlobalMiddleware().wherehouseAuth, WherehouseController().stockIssue)
    .post(GlobalMiddleware().wherehouseAuth, WherehouseController().postStockIssue)




router.get('/logout', GlobalMiddleware().wherehouseAuth, WherehouseController().logout);


module.exports = router