const User = require("../models/User");
const PO = require("../models/PO");
const ExcelJs = require("exceljs");
const Customer = require("../models/Customer");
const Inventory = require("../models/Inventory");
const Wip = require("../models/Wip");
const ConstantDrum = require("../models/ConstantDrum");
const SharpInventory = require("../models/SharpInventory");
const NewProductMoment = require("../models/NewProductMonment");
const CustomerDetails = require("../models/CustomerDetails");
const Product = require("../models/Product");
const CustomerEnquiry = require("../models/CustomerEnquiry");
const Negotiation = require("../models/Negotiation");
const Contractor = require("../models/Contractor");
const PaymentTerm = require("../models/PaymentTerm");

function AdminController() {
  return {
    // GAT HOME
    home(req, res) {
      res.render("admin/home");
    },

    // VIEW PO
    async viewpo(req, res) {
      try {
        const podata = await PO.find({});
        res.render("admin/po/view", {
          podata: podata,
        });
      } catch (error) {
        console.log(error.message);
        res.redirect("/admin/po/view");
      }
    },

    // EXPORT PO
    async exportpo(req, res) {
      try {
        let poData = await PO.find({});
        const workbook = new ExcelJs.Workbook();
        const worksheet = workbook.addWorksheet("PO Data");
        worksheet.columns = [
          {
            header: "PO Recived Date",
            key: "po_received_date",
            width: 10,
          },

          {
            header: "Customer Name",
            key: "customer_name",
            width: 15,
          },

          {
            header: "Country",
            key: "country",
            width: 8,
          },

          {
            header: "Customer Address",
            key: "customer_address",
            width: 8,
          },

          {
            header: "Po For Where",
            key: "po_for_where",
            width: 8,
          },

          {
            header: "Customer Po No",
            key: "customer_po_no",
            width: 12,
          },

          {
            header: "Customer Product Name",
            key: "customer_product_name",
            width: 20,
          },

          {
            header: "Customer Product Code",
            key: "customer_product_code",
            width: 5,
          },

          {
            header: "Sharp Product Name",
            key: "sharp_product_name",
            width: 20,
          },
          {
            header: "Qty kgs",
            key: "qty_kgs",
            width: 15,
          },
          {
            header: "Cur",
            key: "cur",
            width: 15,
          },
          {
            header: "Price kg",
            key: "price_kg",
            width: 15,
          },

          {
            header: "Value",
            key: "value",
            width: 30,
          },

          {
            header: "Exchange Rate",
            key: "exchange_rate",
            width: 20,
          },

          {
            header: "Value in INR",
            key: "value_in_inr",
            width: 20,
          },

          {
            header: "Incoterm",
            key: "incoterm",
            width: 20,
          },

          {
            header: "Payment Terms",
            key: "payment_terms",
            width: 20,
          },

          {
            header: "Shipment Period ETD",
            key: "shipment_period_etd",
            width: 12,
          },

          {
            header: "Shipment Period ETA",
            key: "shipment_period_eta",
            width: 20,
          },

          {
            header: "Req Factory ETD",
            key: "req_factory_etd",
            width: 20,
          },

          {
            header: "Dispatch Plan Date",
            key: "dispatch_plan_date",
            width: 10,
          },

          {
            header: "Status of Orders",
            key: "status_of_orders",
            width: 20,
          },

          {
            header: "Remark",
            key: "remark",
            width: 20,
          },

          {
            header: "Delay Status",
            key: "delay_status",
            width: 20,
          },

          {
            header: "Delay Remarks",
            key: "delay_remarks",
            width: 20,
          },

          {
            header: "INV No",
            key: "inv_no",
            width: 10,
          },
          {
            header: "INV Date",
            key: "inv_date",
            width: 10,
          },

          {
            header: "Sample Required",
            key: "sample_required",
            width: 8,
          },
          {
            header: "Batch No",
            key: "batch_no",
            width: 10,
          },

          {
            header: "DHL No",
            key: "dhl_no",
            width: 8,
          },

          {
            header: "Date",
            key: "date",
            width: 8,
          },

          {
            header: "Sample Remarks",
            key: "sample_remarks",
            width: 8,
          },
        ];

        let count = 1;
        poData.forEach((data) => {
          data.s_no = count;
          worksheet.addRow(data);
          count += 1;
        });

        worksheet.getRow(1).eachCell((cell) => {
          cell.font = {
            bold: true,
          };
        });

        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.setHeader(
          "Content-Disposition",
          "attachment; filename=Export PO.xlsx"
        );
        await workbook.xlsx.write(res);
        res.end();
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/admin/home");
      }
    },

    // GET ADD CUSTOMER
    addCustomer(req, res) {
      res.render("admin/po/addcustomer");
    },

    // POST ADD CUSTOMER
    async postAddNew(req, res) {
      try {
        req.body.uin = req.admin.uin;
        req.body.user = req.admin._id;
        await CustomerDetails.create(req.body);
        req.flash("success_msg", "Customer add successfull");
        res.redirect("/admin/add/customer");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/admin/add/customer");
      }
    },

    // For Custmor update find customer
    async findCustomer(req, res) {
      try {
        const customer = await Customer.findOne({
          name: req.query.name,
        });
        if (customer != "" || customer != null) {
          return res.render("admin/po/updatecustomer", {
            customer,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    async updateCustomer(req, res) {
      res.render("admin/po/updatecustomer", {
        customer: "",
      });
    },

    async postUpdateCustomer(req, res) {
      try {
        const name = req.params.id;
        const {
          address1,
          address2,
          address3,
          country,
          state,
          pincode,
          phone,
          mobile,
          fax,
          email1,
          email2,
        } = req.body;

        const existCustomer = await Customer.findOne({
          name: name,
        });
        if (existCustomer != "" || existCustomer != null) {
          await Customer.findByIdAndUpdate(
            existCustomer._id,
            {
              address1,
              address2,
              address3,
              country,
              state,
              pincode,
              phone,
              mobile,
              fax,
              email1,
              email2,
              updateAt: new Date(),
            },
            {
              new: true,
            }
          );

          req.flash("success_msg", "Update successfull..");
          return res.redirect("/admin/update/customer");
        }
      } catch (error) {
        console.log("error", error.message);
        req.flash("error_msg", error.message);
        return res.redirect("/admin/update/customer");
      }
    },

    // GET ORDER ENTRY
    async orderFindCustomer(req, res) {
      try {
        const customer = await Customer.findOne({
          name: req.query.name,
        });
        if (customer != "" || customer != null) {
          return res.render("admin/po/orderentry", {
            customer,
          });
        }
      } catch (error) {
        req.flash("error_msg", error_message);
        res.redirect("/admin/order/entry");
      }
    },

    // INVENTORY CONTROLLERS
    async newProduction(req, res) {
      const wips = await Wip.find({});
      const inventory = await Inventory.find({
        user: req.admin._id,
      });
      const drumNumbers = await ConstantDrum.find({});
      res.render("admin/inventory/newproduction", {
        wips: wips,
        inventory: inventory,
        drumNumbers: drumNumbers,
      });
    },

    async postNewProduction(req, res) {
      try {
        const user = req.admin;
        const { drumNo, wt, plantNo, batchNo, grade } = req.body;
        let existDrumNo = await Inventory.findOne({
          drumNo,
        });
        if (existDrumNo != null) {
          req.flash("error_msg", "Drum No. already exists.");
          return res.redirect("/admin/new/production");
        } else {
          const newInventory = new Inventory({
            user: user._id,
            uin: user.uin,
            name: user.name,
            locationCode: user.unit,
            drumNo,
            wt,
            plantNo,
            batchNo,
            grade,
          });
          await newInventory.save();
          req.flash("success_msg", "Add New Production");
          return res.redirect("/admin/new/production");
        }
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/admin/new/production");
      }
    },

    async newProductionFinalSumbit(req, res) {
      try {
        const inventory = await Inventory.find({
          user: req.admin._id,
          finalSubmitStatus: "Pending",
        });
        if (inventory != "") {
          await Inventory.updateMany(
            {
              finalSubmitStatus: "Pending",
            },
            {
              finalSubmitStatus: "Approved",
              updatedAt: Date.now(),
            },
            {
              new: true,
            }
          );
          req.flash("success_msg", "All data submited");
          return res.redirect("/admin/new/production");
        }
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/admin/new/production");
      }
    },

    // async inventoryView(req, res) {
    //     try {
    //         const inventory = await SharpInventory.find({});
    //         res.render("admin/inventory/inventoryview", {
    //             inventory
    //         })
    //     } catch (error) {
    //         req.flash("error_msg", error.message);
    //         res.redirect('/admin/inventory/view')
    //     }
    // },

    async issueDrumNo(req, res) {
      const drums = await ConstantDrum.find({});
      res.render("admin/inventory/issuedrumno", {
        user: req.admin,
        drums: drums,
      });
    },

    async postIssueDrumNo(req, res) {
      try {
        const { drumNo, qty } = req.body;
        if (qty > 100) {
          req.flash("error_msg", "Qty is less then 100");
          return res.redirect("/admin/issue/drumno");
        } else {
          let numDrum = drumNo.split("-");
          numDrum = numDrum[numDrum.length - 1];
          for (i = 1; i <= qty; i++) {
            const generateDrumNo = new ConstantDrum({
              uin: req.admin.uin,
              unit: req.admin.unit,
              drumNo: `${req.admin.unit}-${Number(numDrum) + i}`,
            });
            await generateDrumNo.save();
          }

          req.flash("success_msg", "Drum No. issue successfully");
          return res.redirect("/admin/issue/drumno");
        }
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/admin/issue/drumno");
      }
    },

    async moveInventory(req, res) {
      const user = req.admin;
      const pMoment = await NewProductMoment.find({});
      let lMoment = pMoment[pMoment.length - 1];
      res.render("admin/inventory/moveinventory", {
        user,
        lMoment,
      });
    },

    async postMoveInventory(req, res) {
      try {
        const user = req.admin;
        const { drumNo, zone, row, column, floor } = req.body;
        const existDrum = await NewProductMoment.findOne({
          drumNo,
          zone,
          row,
          column,
          floor,
        });
        if (existDrum) {
          req.flash("error_msg", "Drum already exist");
          return res.redirect("/admin/move/inventory");
        } else {
          const findDrum = await NewProductMoment.findOne({
            drumNo,
          });
          if (findDrum) {
            await NewProductMoment.findByIdAndUpdate(
              findDrum._id,
              {
                zone,
                row,
                column,
                floor,
                updatedAt: Date.now(),
              },
              {
                new: true,
              }
            );

            req.flash("success_msg", "Movement Update..");
            return res.redirect("/admin/move/inventory");
          } else {
            const productMoment = new NewProductMoment({
              user: user._id,
              uin: user.uin,
              name: user.name,
              locationCode: user.locationCode ? user.locationCode : user.unit,
              drumNo,
              zone,
              floor,
              row,
              column,
            });
            await productMoment.save();
            req.flash("success_msg", "Movement Added..");
            res.redirect("/admin/move/inventory");
          }
        }
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/admin/move/inventory");
      }
    },

    // GET INVENTORY UPDATE
    // async updateInventory(req, res) {
    //     res.render('admin/inventery/updateinventory')
    // },

    // POST INVENTORY UPDATE
    // async postUpdateInventory(req, res) {
    //     const {
    //         batchNo,
    //         a_Pinene,
    //         b_Pinene,
    //         sebanine,
    //         mercine,
    //         limonine,
    //         cineole,
    //         cisIsomer,
    //         cis,
    //         i_Octonal,
    //         menthone,
    //         isoMenthone,
    //         menthylAcetate,
    //         ip_isopulegol,
    //         neoMenthol,
    //         pcbBetaCaryophyllene,
    //         neoIsoPulegol,
    //         neoIsoMenthol,
    //         lm,
    //         isoMenthol,
    //         pu,
    //         pip,
    //         carvone,
    //         aTerpineols,
    //         menthofuran,
    //         sebanineHydrate,
    //         germacreneD,
    //         viridifloral,
    //         diHydroCarvone,
    //         terpenene_1_4_ol,
    //         betaFarnacene,
    //         betaBourbonene,
    //         dMenthol,
    //         only_L_Menthol,
    //         linalool,
    //         methylChavi,
    //         cis2,
    //         tt,
    //         tmc,
    //         hb,
    //         total
    //     } = req.body
    //     const sInventory = await SharpInventory.findOne({
    //         batchNo_LotNo: batchNo
    //     });
    //     if (sInventory != null) {
    //         await SharpInventory.findByIdAndUpdate(sInventory._id, {
    //             a_Pinene,
    //             b_Pinene,
    //             sebanine,
    //             mercine,
    //             limonine,
    //             cineole,
    //             cisIsomer,
    //             cis,
    //             i_Octonal,
    //             menthone,
    //             isoMenthone,
    //             menthylAcetate,
    //             ip_isopulegol,
    //             neoMenthol,
    //             pcbBetaCaryophyllene,
    //             neoIsoPulegol,
    //             neoIsoMenthol,
    //             lm,
    //             isoMenthol,
    //             pu,
    //             pip,
    //             carvone,
    //             aTerpineols,
    //             menthofuran,
    //             sebanineHydrate,
    //             germacreneD,
    //             viridifloral,
    //             diHydroCarvone,
    //             terpenene_1_4_ol,
    //             betaFarnacene,
    //             betaBourbonene,
    //             dMenthol,
    //             only_L_Menthol,
    //             linalool,
    //             methylChavi,
    //             cis2,
    //             tt,
    //             tmc,
    //             hb,
    //             total,
    //             updatedAt: Date.now()
    //         }, {
    //             new: true
    //         });
    //         req.flash("success_msg", "Inventory update Successfully");
    //         return res.redirect('/admin/update/inventory');
    //     } else {
    //         req.flash("error_msg", "Somthing Went Wrong");
    //         return res.redirect('/admin/update/inventory');
    //     }
    // },

    async searchDrum(req, res) {
      res.render("admin/inventory/searchdrum", {
        movementData: [],
      });
    },

    async postSearchDrum(req, res) {
      const drumNo = req.body.drumNo;
      const movementData = await NewProductMoment.find({
        drumNo,
      });
      res.render("admin/inventory/searchdrum", {
        movementData: movementData,
      });
    },

    async customerEnquiry(req, res) {
      try {
        const custDetails = await CustomerDetails.find({});
        const products = await Product.find({});
        res.render("admin/customer/enquiry", { custDetails, products });
      } catch (error) {
        req.flash("error_msg", "Somthing Went Wrong");
        return res.redirect("/admin/customer/enquiry");
      }
    },

    async customerFindCust(req, res) {
      const { id } = req.query;
      try {
        const customer = await CustomerDetails.findById(id);
        const products = await Product.find({});
        res.render("admin/customer/findcust", { customer, products });
      } catch (error) {
        res.redirect("/admin/customer/enquiry");
      }
    },

    async postCustomerFindCust(req, res) {
      const { date } = req.body;
      try {
        let newDate;
        newDate = date.replace("-", "");
        newDate = newDate.replace("-", "");
        req.body.date = newDate;
        req.body.user = req.admin._id;
        req.body.user = req.admin._id;
        req.body.uin = req.admin.uin;
        await CustomerEnquiry.create(req.body);
        req.flash("success_msg", "Enquiry submited..");
        res.redirect("/admin/customer/enquiryview");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/admin/customer/enquiry");
      }
    },

    async customerEnquiryView(req, res) {
      try {
        const enquiry = await CustomerEnquiry.find({
          status: { $ne: "Po Pending" },
        });
        res.render("admin/customer/enquiryview", { enquiry });
      } catch (error) {
        console.log(error.message);
        res.render("/admin/home");
      }
    },

    // CUSTOMER ENQUIRY CONFIRM ORDER
    async customerEnquiryConfirmOrder(req, res) {
      try {
        const enquiry = await CustomerEnquiry.findOne({_id: req.params.id, status: { $ne: "Po Pending" }});
        if(!enquiry){
          req.flash('warning_msg', 'Enquiry not found..');
          return res.redirect('/admin/customer/enquiryview')
        }
        const products = await Product.find();
        const paymentTerms = await PaymentTerm.find();
        res.render("admin/customer/confirmorder", {
          enquiry,
          products,
          paymentTerms,
        });
      } catch (error) {
        console.log(error.message);
        req.flash("error_msg", error.message);
        res.redirect("/admin/customer/enquiryview");
      }
    },

    // post CUSTOMER ENQUIRY POST CONFIRM ORDER
    async postCustomerEnquiryConfirmOrder(req, res) {
      const {
        enquiryType,
        rateQuoted,
        quantity,
        specification,
        productName,
        customerCode,
        scNo,
        supplyPeriodStart,
        supplyPeriodEnd,
        incoterm,
        contractBooked,
        supplyLocation,
        paymentTerm,
        newTerm,
      } = req.body;
      try {
        if (paymentTerm === "New Term") {
          await PaymentTerm.create({ paymentTerm: req.body.newTerm });
        }

        if (enquiryType === "Contract") {
          await CustomerEnquiry.findByIdAndUpdate(
            req.params.id,
            {
              enquiryType,
              rateQuoted: Number(rateQuoted),
              quantity: Number(quantity),
              specification,
              productName,
              customerCode,
              scNo,
              supplyPeriodStart,
              supplyPeriodEnd,
              incoterm,
              contractBooked,
              supplyLocation,
              paymentTerm,
              status: "Po Pending",
              updateAt: Date.now(),
            },
            { returnDocument: "after" }
          );

          req.flash("success_msg", "Order confirmed successfully...");
          return res.redirect("/admin/customer/enquiryview");
        } else {
          await CustomerEnquiry.findByIdAndUpdate(
            req.params.id,
            {
              enquiryType,
              rateQuoted: Number(rateQuoted),
              quantity: Number(quantity),
              specification,
              productName,
              customerCode,
              status: "Po Pending",
              updateAt: Date.now(),
            },
            { returnDocument: "after" }
          );
          req.flash("success_msg", "Order confirmed successfully...");
          return res.redirect("/admin/customer/enquiryview");
        }
      } catch (error) {
        console.log(error.message);
        req.flash("error_msg", error.message);
        res.redirect("/admin/customer/enquiryview");
      }
    },

    async customerEnquiryClose(req, res) {
      try {
        await CustomerEnquiry.findByIdAndUpdate(
          req.params.id,
          {
            status: "Closed",
            reason: req.body.closeReason,
            updatedAt: Date.now(),
          },
          { returnDocument: "after" }
        );
        req.flash("success_msg", "Enquiry Closed..");
        res.redirect("/admin/customer/enquiryview");
      } catch (error) {
        console.log(error.message);
        req.flash("error_msg", error.message);
        res.redirect("/admin/customer/enquiryview");
      }
    },

    async customerEnquiryAllOrdersConfirm(req, res) {
      let { ids } = req.params;
      try {
        const date = new Date();
        let d = date.getDate();
        let m = date.getMonth() + 1;
        const y = date.getFullYear();
        const tDate = `${y}${m <= 9 ? `0` + m : m}${d <= 9 ? `0` + d : d}`;

        ids = ids.split(",");
        ids.forEach(async (id) => {
          await CustomerEnquiry.findByIdAndUpdate(
            id,
            {
              uin: req.admin.uin,
              user: req.admin._id,
              negotiationDate: tDate,
              status: "Po Pending",
              updateAt: Date.now(),
            },
            { returnDocument: "after" }
          );
        });
        req.flash("success_msg", "All orders have been confirmed.");
        res.redirect("/admin/customer/enquiryview");
      } catch (error) {
        console.log(error.message);
        req.flash("error_msg", error.message);
        res.redirect("/admin/customer/enquiryview");
      }
    },

    async customerEnquiryDetailView(req, res) {
      try {
        const enquiry = await CustomerEnquiry.findById(req.params.id);
        const negotiation = await Negotiation.find({
          enquiryId: req.params.id,
        });
        res.render("admin/customer/enquirydetailview", {
          enquiry,
          negotiation,
        });
      } catch (error) {
        console.log(error.message);
        req.flash("error_msg", error.message);
        res.redirect("/admin/customer/enquiryview");
      }
    },

    async negotiation(req, res) {
      const { id } = req.params;
      try {
        const enquiry = await CustomerEnquiry.findById(id);
        res.render("admin/customer/negotiation", { enquiry });
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/admin/customer/enquiryview");
      }
    },

    async postNegotiation(req, res) {
      try {
        const date = new Date();
        let d = date.getDate();
        let m = date.getMonth() + 1;
        const y = date.getFullYear();
        const tDate = `${y}${m <= 9 ? `0` + m : m}${d <= 9 ? `0` + d : d}`;
        req.body.uin = req.admin.uin;
        req.body.user = req.admin._id;
        await CustomerEnquiry.findByIdAndUpdate(
          req.body.enquiryId,
          {
            negotiationDate: tDate,
            rateQuoted: Number(req.body.rateQuoted),
            status: "Negotiating",
            reason: "",
          },
          { returnDocument: "after" }
        );
        await Negotiation.create(req.body);
        req.flash("success_msg", "Negotiation");
        res.redirect("/admin/customer/enquiryview");
      } catch (error) {
        console.log(error.message);
        req.flash("error_msg", error.message);
        res.redirect("/admin/customer/enquiryview");
      }
    },

    // ================= Po ===============

    async createContractor(req, res) {
      try {
        const products = await Product.find({});
        const customer = await CustomerEnquiry.findById(req.query.id);
        const paymentTerms = await PaymentTerm.find();
        res.render("admin/po/createcontractor", {
          products,
          customer,
          paymentTerms,
        });
      } catch (error) {
        console.log(error);
        return res.redirect("/admin/po/pending");
      }
    },

    async postCreateContractor(req, res) {
      try {
        req.body.uin = req.admin.uin;
        req.body.user = req.admin._id;
        req.body.status = "Po Pending";
        if (req.body.paymentTerm === "New Term") {
          await PaymentTerm.create({ paymentTerm: req.body.newTerm });
        }
        await Contractor.create(req.body);
        req.flash("success_msg", "Data Save Successfully");
        return res.redirect("/admin/po/pending");
      } catch (error) {
        req.flash('error_msg', error.message)
        return res.redirect("/admin/po/pending");
      }
    },

    async poPendingView(req, res) {
      try {
        const poPending = await CustomerEnquiry.find({
          status: { $eq: "Po Pending" },
        });
        const contractors = await Contractor.find();
        const customers = await Customer.find();
        res.render("admin/po/popendingview", {
          poPending,
          contractors,
          customers,
        });
      } catch (error) {
        req.flash('error_msg', error.message);
        res.render("/admin/home");
      }
    },

    async orderCreate(req, res) {
      try {
        const enquiry = await CustomerEnquiry.findOne({
          _id: req.query.id,
          status: "Po Pending",
        });
        const products = await Product.find();
        const paymentTerms = await PaymentTerm.find({});
        res.render("admin/po/orderentry", {
          enquiry,
          products,
          paymentTerms,
        });
      } catch (error) {
        req.flash('error_msg', error.message)
        res.redirect('/admin/po/pending');
      }
    },

    async postOrderCreate(req, res) {
      try {
        req.body.uin = req.admin.uin;
        req.body.user = req.admin._id;
        await PO.create(req.body);
        req.flash("success_msg", "Data Save Successfully");
        return res.redirect("/admin/po/pending");
      } catch (error) {
        req.flash("error_msg", error.message);
        res.redirect("/admin/po/pending");
      }
    },

    async salesConfirmation(req, res) {
      res.render("admin/po/salesconfirmation");
    },

    async logout(req, res) {
      res.clearCookie("adminToken");
      res.redirect("/");
    },
  };
}
module.exports = AdminController;
