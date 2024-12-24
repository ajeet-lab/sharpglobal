const express = require("express");
const router = express.Router();
const QcController = require("../controllers/QcController");
const GlobalMiddleware = require("../middleware/GlobalMiddleware");

router.all("/*", (req, res, next) => {
  res.locals.layout = "qc";
  next();
});

router.route("/sop/:id").get(GlobalMiddleware().qcAuth, QcController().sop);

router
  .route("/materiallog")
  .get(GlobalMiddleware().qcAuth, QcController().materialLog)
  .post(GlobalMiddleware().qcAuth, QcController().postMaterialLog);

router
  .route("/materialreport")
  .get(GlobalMiddleware().qcAuth, QcController().materialReport);

router
  .route("/materialreport/cmo")
  .get(GlobalMiddleware().qcAuth, QcController().cmo)
  .post(GlobalMiddleware().qcAuth, QcController().postCmo);
router
  .route("/materialreport/po")
  .get(GlobalMiddleware().qcAuth, QcController().po)
  .post(GlobalMiddleware().qcAuth, QcController().postPo);

router
  .route("/materialreport/so")
  .get(GlobalMiddleware().qcAuth, QcController().so)
  .post(GlobalMiddleware().qcAuth, QcController().postSo);

router
  .route("/materialreport/dmo")
  .get(GlobalMiddleware().qcAuth, QcController().dmo)
  .post(GlobalMiddleware().qcAuth, QcController().postDmo);

router
  .route("/materialreport/menthol")
  .get(GlobalMiddleware().qcAuth, QcController().menthol)
  .post(GlobalMiddleware().qcAuth, QcController().postMenthol);

router
  .route("/materialreport/menthone")
  .get(GlobalMiddleware().qcAuth, QcController().menthone)
  .post(GlobalMiddleware().qcAuth, QcController().postMenthone);

router
  .route("/materialreport/dfmo")
  .get(GlobalMiddleware().qcAuth, QcController().dfmo)
  .post(GlobalMiddleware().qcAuth, QcController().postDfmo);

router
  .route("/materialreport/dfpo")
  .get(GlobalMiddleware().qcAuth, QcController().dfpo)
  .post(GlobalMiddleware().qcAuth, QcController().postDfpo);

router
  .route("/materialreport/dfso")
  .get(GlobalMiddleware().qcAuth, QcController().dfso)
  .post(GlobalMiddleware().qcAuth, QcController().postDfso);

router
  .route("/materialreport/basiloil")
  .get(GlobalMiddleware().qcAuth, QcController().basilOil)
  .post(GlobalMiddleware().qcAuth, QcController().postBasilOil);

router
  .route("/materialreport/cineole")
  .get(GlobalMiddleware().qcAuth, QcController().cineole)
  .post(GlobalMiddleware().qcAuth, QcController().postCineole);

router
  .route("/materialreport/tp")
  .get(GlobalMiddleware().qcAuth, QcController().tp)
  .post(GlobalMiddleware().qcAuth, QcController().postTp);

router
  .route("/materialreport/at")
  .get(GlobalMiddleware().qcAuth, QcController().at)
  .post(GlobalMiddleware().qcAuth, QcController().postAt);

router
  .route("/materialreport/lc")
  .get(GlobalMiddleware().qcAuth, QcController().lc)
  .post(GlobalMiddleware().qcAuth, QcController().postLc);

router
  .route("/materialreport/pc")
  .get(GlobalMiddleware().qcAuth, QcController().pc)
  .post(GlobalMiddleware().qcAuth, QcController().postPc);

router
  .route("/materialreport/view")
  .get(GlobalMiddleware().qcAuth, QcController().reportView);
// .post(GlobalMiddleware().qcAuth, QcController().postPc)

router
  .route("/oticalrotaion/rm")
  .get(GlobalMiddleware().qcAuth, QcController().rm);

router.get("/material/stage", GlobalMiddleware().qcAuth, QcController().stage);

router
  .route("/material/physical")
  .get(GlobalMiddleware().qcAuth, QcController().physical);

router
  .route("/material/checklist")
  .post(GlobalMiddleware().qcAuth, QcController().postPhysical);

router
  .route("/material/stage/gc-log-book")
  .get(GlobalMiddleware().qcAuth, QcController().gcLogBook)
  .post(GlobalMiddleware().qcAuth, QcController().postGcLogBook);

router
  .route("/material/stage/polarimeter")
  .get(GlobalMiddleware().qcAuth, QcController().polarimeter)
  .post(GlobalMiddleware().qcAuth, QcController().postPolarimeter);

router
  .route("/material/fg/melting-point")
  .get(GlobalMiddleware().qcAuth, QcController().fgMeltingPoint)
  .post(GlobalMiddleware().qcAuth, QcController().postFgMeltingPoint);

router
  .route("/material/fg/oven")
  .get(GlobalMiddleware().qcAuth, QcController().fgOven)
  .post(GlobalMiddleware().qcAuth, QcController().postFgOven);

router
  .route("/material/fg/waterbath")
  .get(GlobalMiddleware().qcAuth, QcController().fgWaterBath)
  .post(GlobalMiddleware().qcAuth, QcController().postFgWaterBath);

router
  .route("/material/fg/weighingBalance")
  .get(GlobalMiddleware().qcAuth, QcController().fgWeighingBalance)
  .post(GlobalMiddleware().qcAuth, QcController().postFgWeighingBalance);

router.get("/logout", GlobalMiddleware().qcAuth, QcController().logout);

module.exports = router;
