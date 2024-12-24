const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const GlobalMiddleware = require('../middleware/GlobalMiddleware');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
const upload = multer({
  storage: storage
});



router.all('/*', (req, res, next) => {
  res.locals.layout = 'user';
  next();
});


router.route('/factory/distillation')
  .get(GlobalMiddleware().userAuth, UserController().distillation)
  .post(GlobalMiddleware().userAuth, UserController().postDistillation);

router.route('/factory/distillation/view')
  .get(GlobalMiddleware().userAuth, UserController().distillationView);


// ALL CHEMIST ROUTE
router.route('/gc/upload')
  .get(GlobalMiddleware().userAuth, UserController().gcupload)
  .post(GlobalMiddleware().userAuth, upload.single('image_url'), UserController().postgcupload)

router.route('/gc/view').get(GlobalMiddleware().userAuth, UserController().gcview)

router.route('/logout').get(GlobalMiddleware().userAuth, UserController().logout);

module.exports = router;