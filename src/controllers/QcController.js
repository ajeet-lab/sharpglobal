const At = require("../models/qc/At");
const Basiloil = require("../models/qc/Basiloil");
const Cineole = require("../models/qc/Cineole");
const Cmo = require("../models/qc/Cmo");
const Dfmo = require("../models/qc/Dfmo");
const Dfpo = require("../models/qc/Dfpo");
const Dfso = require("../models/qc/Dfso");
const Dmo = require("../models/qc/Dmo");
const Lc = require("../models/qc/Lc");
const Materiallog = require("../models/qc/Materiallog");
const Menthol = require("../models/qc/Menthol");
const Menthone = require("../models/qc/Menthone");
const Pc = require("../models/qc/Pc");
const Po = require("../models/qc/Po");
const So = require("../models/qc/So");
const Tp = require("../models/qc/Tp");
const CheckList = require("../models/CheckList");
const Physical = require("../models/Physical");
const GcLogBook = require("../models/qc/stage/GcLogBook");
const PolarimeterLogBook = require("../models/qc/stage/PolarimeterLogBook");
const MeltingPoint = require("../models/qc/stage/MeltingPoint");
const Oven = require("../models/qc/stage/Oven");
const WaterBath = require("../models/qc/stage/WaterBath");
const WeighingBalance = require("../models/qc/stage/WeighingBalance");

function QcController() {
  return {
    async physical(req, res) {
      try {
        let checkList = await CheckList.find({
          identificationNoLotByQC: undefined,
        });
        let physical = await Physical.find({
          identificationNoLotByQC: undefined,
        });
        checkList = checkList[checkList.length - 1];
        physical = physical[physical.length - 1];
        res.render("qc/material/physical", {
          checkList,
          physical,
        });
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/qc/material/physical");
      }
    },

    async postPhysical(req, res) {
      const { id, identificationNoLotByQC, description } = req.body;
      try {
        let checkList = await CheckList.findById(id);
        checkList.identificationNoLotByQC = identificationNoLotByQC;
        checkList.qcUin = req.qcUser.uin;
        checkList.qcUnit = req.qcUser.unit;
        await checkList.save();
        req.flash("success_msg", "Identification Number issue..");
        res.redirect("/qc/material/physical");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/qc/material/physical");
      }
    },

    // SOP
    sop(req, res) {
      const id = req.params.id;
      if (id == 1) {
        res.render("qc/sop/sop1", {
          id,
        });
      } else if (id == 2) {
        res.render("qc/sop/sop2", {
          id,
        });
      } else if (id == 3) {
        res.render("qc/sop/sop3", {
          id,
        });
      } else if (id == 4) {
        res.render("qc/sop/sop4", {
          id,
        });
      } else {
        res.render("qc/sop/sop5", {
          id,
        });
      }
    },

    async materialLog(req, res) {
      try {
        res.render("qc/material/materiallog");
      } catch (error) {
        console.log(error.message);
      }
    },

    async postMaterialLog(req, res) {
      try {
        req.body.uin = req.qcUser.uin;
        req.body.unit = req.qcUser.unit;
        const materiallog = new Materiallog(req.body);
        await materiallog.save();
        req.flash("success_msg", "Data add successfully");
        res.redirect("/qc/materiallog");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/qc/materiallog");
      }
    },

    async materialReport(req, res) {
      res.render("qc/material/materialreport");
    },

    cmo(req, res) {
      res.render("qc/material/report/cmo");
    },

    async postCmo(req, res) {
      try {
        req.body.uin = req.qcUser.uin;
        req.body.unit = req.qcUser.unit;
        req.body.specificationNumber = "RM-6001";
        req.body.materialCode = "CM";
        req.body.plantOrigin = "Mentha Arvensis";
        req.body.storageCondition = "Protected from Light and Moisture";
        const cmo = new Cmo(req.body);
        await cmo.save();
        req.flash("success_msg", "Data Added..");
        res.redirect("/qc/materialreport/cmo");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/qc/materialreport/cmo");
      }
    },

    po(req, res) {
      res.render("qc/material/report/po");
    },
    async postPo(req, res) {
      try {
        req.body.uin = req.qcUser.uin;
        req.body.unit = req.qcUser.unit;
        req.body.specificationNumber = "RM-6002";
        req.body.materialCode = "PO";
        req.body.plantOrigin = "Plant Origin Mentha piperita";
        req.body.storageCondition =
          "Storage Condition Protected from Light and Moisture";
        const po = new Po(req.body);
        await po.save();
        req.flash("success_msg", "Data Added..");
        res.redirect("/qc/materialreport/po");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/qc/materialreport/po");
      }
    },

    so(req, res) {
      res.render("qc/material/report/so");
    },
    async postSo(req, res) {
      try {
        req.body.uin = req.qcUser.uin;
        req.body.unit = req.qcUser.unit;
        req.body.specificationNumber = "RM-6003";
        req.body.materialCode = "SO";
        req.body.plantOrigin = "Mentha spicata";
        req.body.storageCondition = "Protected from Light and Moisture";
        const so = new So(req.body);
        await so.save();
        req.flash("success_msg", "SO Data Added..");
        res.redirect("/qc/materialreport/so");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/qc/materialreport/so");
      }
    },

    dmo(req, res) {
      res.render("qc/material/report/dmo");
    },
    async postDmo(req, res) {
      try {
        req.body.uin = req.qcUser.uin;
        req.body.unit = req.qcUser.unit;
        req.body.specificationNumber = "RM-6004";
        req.body.materialCode = "DO";
        req.body.plantOrigin = "Mentha Arvensis";
        req.body.storageCondition = "Protected from Light and Moisture";
        const dmo = new Dmo(req.body);
        await dmo.save();
        req.flash("success_msg", "DMO Data Added..");
        res.redirect("/qc/materialreport/dmo");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/qc/materialreport/dmo");
      }
    },

    menthol(req, res) {
      res.render("qc/material/report/menthol");
    },

    async postMenthol(req, res) {
      try {
        req.body.uin = req.qcUser.uin;
        req.body.unit = req.qcUser.unit;
        req.body.specificationNumber = "RM-6010";
        req.body.materialCode = "MN";
        req.body.plantOrigin = "Mentha Arvensis";
        req.body.storageCondition = "Protected from Light and Moisture";
        const menthol = new Menthol(req.body);
        await menthol.save();
        req.flash("success_msg", "Menthol Data Added..");
        res.redirect("/qc/materialreport/menthol");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/qc/materialreport/menthol");
      }
    },

    menthone(req, res) {
      res.render("qc/material/report/menthone");
    },

    async postMenthone(req, res) {
      try {
        req.body.uin = req.qcUser.uin;
        req.body.unit = req.qcUser.unit;
        req.body.specificationNumber = "RM-6009";
        req.body.materialCode = "MN";
        req.body.plantOrigin = "Mentha Arvensis";
        req.body.storageCondition = "Protected from Light and Moisture";
        const menthone = new Menthone(req.body);
        await menthone.save();
        req.flash("success_msg", "Menthone Data Added..");
        res.redirect("/qc/materialreport/menthone");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/qc/materialreport/menthone");
      }
    },

    dfmo(req, res) {
      res.render("qc/material/report/dfmo");
    },

    async postDfmo(req, res) {
      try {
        req.body.uin = req.qcUser.uin;
        req.body.unit = req.qcUser.unit;
        req.body.specificationNumber = "RM-6005";
        req.body.materialCode = "DM";
        req.body.plantOrigin = "Mentha Arvensis";
        req.body.storageCondition = "Protected from Light and Moisture";
        const dfmo = new Dfmo(req.body);
        await dfmo.save();
        req.flash("success_msg", "DFMO Data Added..");
        res.redirect("/qc/materialreport/dfmo");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/qc/materialreport/dfmo");
      }
    },

    dfpo(req, res) {
      res.render("qc/material/report/dfpo");
    },
    async postDfpo(req, res) {
      try {
        req.body.uin = req.qcUser.uin;
        req.body.unit = req.qcUser.unit;
        req.body.specificationNumber = "RM-6006";
        req.body.materialCode = "DP";
        req.body.plantOrigin = "Mentha piperita";
        req.body.storageCondition = "Protected from Light and Moisture";
        const dfpo = new Dfpo(req.body);
        await dfpo.save();
        req.flash("success_msg", "DFPO Data Added..");
        res.redirect("/qc/materialreport/dfpo");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/qc/materialreport/dfpo");
      }
    },

    dfso(req, res) {
      res.render("qc/material/report/dfso");
    },
    async postDfso(req, res) {
      try {
        req.body.uin = req.qcUser.uin;
        req.body.unit = req.qcUser.unit;
        req.body.specificationNumber = "RM-6007";
        req.body.materialCode = "DS";
        req.body.plantOrigin = "Mentha spicata";
        req.body.storageCondition = "Protected from Light and Moisture";
        const dfso = new Dfso(req.body);
        await dfso.save();
        req.flash("success_msg", "DFSO Data Added..");
        res.redirect("/qc/materialreport/dfso");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/qc/materialreport/dfso");
      }
    },

    basilOil(req, res) {
      res.render("qc/material/report/basiloil");
    },
    async postBasilOil(req, res) {
      try {
        req.body.uin = req.qcUser.uin;
        req.body.unit = req.qcUser.unit;
        req.body.specificationNumber = "RM-6008";
        req.body.materialCode = "BO";
        req.body.plantOrigin = "Ocimum basilicum";
        req.body.storageCondition = "Protected from Light and Moisture";
        const basiloil = new Basiloil(req.body);
        await basiloil.save();
        req.flash("success_msg", "Basil Oil Data Added..");
        res.redirect("/qc/materialreport/basiloil");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/qc/materialreport/basiloil");
      }
    },

    cineole(req, res) {
      res.render("qc/material/report/cineole");
    },
    async postCineole(req, res) {
      try {
        req.body.uin = req.qcUser.uin;
        req.body.unit = req.qcUser.unit;
        req.body.specificationNumber = "RM-6011";
        req.body.materialCode = "EO";
        req.body.plantOrigin = "Mentha Arvensis";
        req.body.storageCondition = "Protected from Light and Moisture";
        const cineole = new Cineole(req.body);
        await cineole.save();
        req.flash("success_msg", "Cineole Oil Data Added..");
        res.redirect("/qc/materialreport/cineole");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/qc/materialreport/cineole");
      }
    },

    tp(req, res) {
      res.render("qc/material/report/tp");
    },
    async postTp(req, res) {
      try {
        req.body.uin = req.qcUser.uin;
        req.body.unit = req.qcUser.unit;
        req.body.specificationNumber = "RM-6008";
        req.body.materialCode = "TP";
        req.body.plantOrigin = "Mentha Arvensis";
        req.body.storageCondition = "Protected from Light and Moisture";
        const tp = new Tp(req.body);
        await tp.save();
        req.flash("success_msg", "TP Oil Data Added..");
        res.redirect("/qc/materialreport/tp");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/qc/materialreport/tp");
      }
    },

    at(req, res) {
      res.render("qc/material/report/at");
    },
    async postAt(req, res) {
      try {
        req.body.uin = req.qcUser.uin;
        req.body.unit = req.qcUser.unit;
        req.body.specificationNumber = "RM-6013";
        req.body.materialCode = "AT";
        req.body.plantOrigin = "Mentha Arvensis";
        req.body.storageCondition = "Protected from Light and Moisture";
        const at = new At(req.body);
        await at.save();
        req.flash("success_msg", "AT Data Added..");
        res.redirect("/qc/materialreport/at");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/qc/materialreport/at");
      }
    },

    lc(req, res) {
      res.render("qc/material/report/lc");
    },
    async postLc(req, res) {
      try {
        req.body.uin = req.qcUser.uin;
        req.body.unit = req.qcUser.unit;
        req.body.specificationNumber = "RM-6014";
        req.body.materialCode = "LC";
        req.body.plantOrigin = "Mentha Arvensis";
        req.body.storageCondition = "Protected from Light and Moisture";
        const lc = new Lc(req.body);
        await lc.save();
        req.flash("success_msg", "LC Data Added..");
        res.redirect("/qc/materialreport/lc");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/qc/materialreport/lc");
      }
    },

    pc(req, res) {
      res.render("qc/material/report/pc");
    },
    async postPc(req, res) {
      try {
        req.body.uin = req.qcUser.uin;
        req.body.unit = req.qcUser.unit;
        req.body.specificationNumber = "RM-6015";
        req.body.materialCode = "PC";
        req.body.plantOrigin = "Mentha Arvensis";
        req.body.storageCondition = "Protected from Light and Moisture";
        const pc = new Pc(req.body);
        await pc.save();
        req.flash("success_msg", "PC Data Added..");
        res.redirect("/qc/materialreport/pc");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/qc/materialreport/pc");
      }
    },

    async reportView(req, res) {
      try {
        const cmo = await Cmo.find({});
        const po = await Po.find({});
        const so = await So.find({});
        const dmo = await Dmo.find({});
        const menthol = await Menthol.find({});
        const menthone = await Menthone.find({});
        const dfmo = await Dfmo.find({});
        const dfpo = await Dfpo.find({});
        const dfso = await Dfso.find({});
        const basiloil = await Basiloil.find({});
        const cineole = await Cineole.find({});
        const tp = await Tp.find({});
        const at = await At.find({});
        const lc = await Lc.find({});
        const pc = await Pc.find({});
        res.render("qc/material/reportview/view", {
          cmo,
          po,
          so,
          dmo,
          menthol,
          menthone,
          dfmo,
          dfpo,
          dfso,
          basiloil,
          cineole,
          tp,
          at,
          lc,
          pc,
        });
      } catch (error) {
        req.flash("error_msg", error.message);
        res.render("/qc/materialreport/view");
      }
    },

    // Otical Rotaion
    rm(req, res) {
      res.render("qc/material/or/rm");
    },

    stage(req, res) {
      res.render("qc/stage/stage");
    },

    gcLogBook(req, res) {
      res.render("qc/stage/gclogbook");
    },

    async postGcLogBook(req, res) {
      try {
        await GcLogBook.create(req.body);
        req.flash("success_msg", "Log Book data uploaded..");
        res.redirect("/qc/material/stage/gc-log-book");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/qc/material/stage/gc-log-book");
      }
    },

    polarimeter(req, res) {
      res.render("qc/stage/polarimeterlogbook");
    },

    async postPolarimeter(req, res) {
      try {
        await PolarimeterLogBook.create(req.body);
        req.flash("success_msg", "Polarimeter Log Book data uploaded..");
        res.redirect("/qc/material/stage/polarimeter");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/qc/material/stage/polarimeter");
      }
    },

    fgMeltingPoint(req, res) {
      res.render("qc/stage/fg/meltingpoint");
    },

    async postFgMeltingPoint(req, res) {
      try {
        await MeltingPoint.create(req.body);
        req.flash("success_msg", "Melting data uploaded..");
        res.redirect("/qc/material/fg/melting-point");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/qc/material/fg/melting-point");
      }
    },

    fgOven(req, res) {
      res.render("qc/stage/fg/oven");
    },

    async postFgOven(req, res){
      try {
        await Oven.create(req.body);
        req.flash("success_msg", "Oven data uploaded..");
        res.redirect("/qc/material/fg/oven");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/qc/material/fg/oven");
      }
    },

    fgWaterBath(req, res) {
      res.render("qc/stage/fg/waterbath");
    },

    async postFgWaterBath(req, res){
      try {
        await WaterBath.create(req.body);
        req.flash("success_msg", "Water Bath data uploaded..");
        res.redirect("/qc/material/fg/oven");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/qc/material/fg/oven");
      }
    },

    fgWeighingBalance(req, res) {
      res.render("qc/stage/fg/weighingbalance");
    },

    async postFgWeighingBalance(req, res){
      try {
        await WeighingBalance.create(req.body);
        req.flash("success_msg", "Weighing Balance data uploaded..");
        res.redirect("/qc/material/fg/weighingbalance");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/qc/material/fg/weighingbalance");
      }
    },

    // LOGOUT CONTROLLER
    async logout(req, res) {
      res.clearCookie("qcToken");
      return res.redirect("/");
    },
  };
}

module.exports = QcController;
