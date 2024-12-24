const moment = require("moment");
const CheckList = require("../models/CheckList");
const Incoming = require("../models/Incoming");
const Physical = require("../models/Physical");
const StockIssue = require("../models/StockIssue");
const StockRegister = require("../models/StockRegister");
const StockRequest = require("../models/StockRequest");
const GateEntry = require("../models/GateEntry");

function WherehouseController() {
  return {
    async pendingList(req, res) {
      try {
        let gateEntry = await GateEntry.find({
          status: "Pending",
        });
        res.render("wherehouse/material/pending", {
          gateEntry,
        });
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/wherehouse/material/pending");
      }
    },

    async check1list(req, res) {
      try {
        // let gateEntry = await GateEntry.findById(req.params.id);
        // let gateEntryLastIndex = gateEntry[gateEntry.length-1];
        // console.log(gateEntryLastIndex);
        res.render("wherehouse/material/checklist");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/wherehouse/material/checklist");
      }
    },

    async check1listPost(req, res) {
      try {
        req.body.uin = req.whereUser.uin;
        req.body.unit = req.whereUser.unit;
        const checklist = new CheckList(req.body);
        await checklist.save();
        req.flash("success_msg", "Add successfully");
        res.redirect(`/wherehouse/material/physical`);
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect(`/wherehouse/material/checklist`);
      }
    },

    async checklist(req, res) {
      try {
        let gateEntry = await GateEntry.findById(req.params.id);
        let gateEntryLastIndex = gateEntry[gateEntry.length-1];
        console.log(gateEntryLastIndex);
        res.render("wherehouse/material/checklist", {
          gateEntry, gateEntryLastIndex
        });
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/wherehouse/material/checklist");
      }
    },

    async postChecklist(req, res) {
      const { id } = req.params;
      try {
        req.body.uin = req.whereUser.uin;
        req.body.unit = req.whereUser.unit;
        const checklist = new CheckList(req.body);
        await checklist.save();
        await GateEntry.findByIdAndUpdate(id, {
          status: "Approved",
          updatedAt: Date.now(),
        });
        req.flash("success_msg", "Add successfully");
        res.redirect(`/wherehouse/material/physical`);
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect(`/wherehouse/material/checklist/${id}`);
      }
    },

    async physical(req, res) {
      try {
        let checkList = await CheckList.find({});
        checkList = checkList[checkList.length - 1];
        res.render("wherehouse/material/physical", {
          checkList,
        });
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/wherehouse/material/physical");
      }
    },

    async postPhysical(req, res) {
      try {
        req.body.uin = req.whereUser.uin;
        req.body.unit = req.whereUser.unit;
        if (!req.body.identificationNoLotByQC) {
          req.flash("success_msg", "Data submit to qc");
          return res.redirect("/wherehouse/material/physical");
        } else {
          const physical = new Physical(req.body);
          await physical.save();
          req.flash("success_msg", "Submit Succcessfully");
          return res.redirect("/wherehouse/material/incoming");
        }
        
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/wherehouse/material/physical");
      }
    },

    async incoming(req, res) {
      try {
        let physical = await Physical.find({});
        physical = physical[physical.length - 1];
        res.render("wherehouse/material/incoming", {
          physical,
        });
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/wherehouse/material/incoming");
      }
    },

    async postIncoming(req, res) {
      try {
        req.body.uin = req.whereUser.uin;
        req.body.unit = req.whereUser.unit;
        const incoming = new Incoming(req.body);
        await incoming.save();
        req.flash("success_msg", "Data submited");
        res.redirect("/wherehouse/material/view/incoming");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/wherehouse/material/incoming");
      }
    },

    async viewChecklist(req, res) {
      try {
        const checkList = await CheckList.find({});
        res.render("wherehouse/view/checklist", {
          checkList,
        });
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/wherehouse/material/view/checklist");
      }
    },

    async viewPhysical(req, res) {
      try {
        const physical = await Physical.find({});
        res.render("wherehouse/view/physical", {
          physical,
        });
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/wherehouse/material/view/physical");
      }
    },

    async viewIncoming(req, res) {
      try {
        const incoming = await Incoming.find({});
        res.render("wherehouse/view/incoming", {
          incoming,
        });
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/wherehouse/material/view/incoming");
      }
    },

    async stockRegister(req, res) {
      res.render("wherehouse/stock/stockregister");
    },

    async postStockRegister(req, res) {
      try {
        req.body.uin = req.whereUser.uin;
        req.body.unit = req.whereUser.unit;
        const stockRegister = new StockRegister(req.body);
        await stockRegister.save();
        req.flash("success_msg", "Stock Registered");
        res.redirect("/wherehouse/stock/register");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/wherehouse/stock/register");
      }
    },

    async stockRequest(req, res) {
      res.render("wherehouse/stock/request");
    },

    async postStockRequest(req, res) {
      try {
        req.body.uin = req.whereUser.uin;
        req.body.unit = req.whereUser.unit;
        const stockRequest = new StockRequest(req.body);
        await stockRequest.save();
        req.flash("success_msg", "Request successfully");
        res.redirect("/wherehouse/stock/request");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/wherehouse/stock/request");
      }
    },

    async stockIssue(req, res) {
      res.render("wherehouse/stock/issue");
    },

    async postStockIssue(req, res) {
      try {
        req.body.uin = req.whereUser.uin;
        req.body.unit = req.whereUser.unit;
        const stockIssue = new StockIssue(req.body);
        await stockIssue.save();
        req.flash("success_msg", "Issued successfully");
        res.redirect("/wherehouse/stock/issue");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/wherehouse/stock/issue");
      }
    },

    // LOGOUT CONTROLLER
    async logout(req, res) {
      res.clearCookie("wherehouseToken");
      return res.redirect("/");
    },
  };
}

module.exports = WherehouseController;
