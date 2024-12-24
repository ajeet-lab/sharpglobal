const express = require("express");
const router = express.Router();
const GlobalMiddleware = require("../middleware/GlobalMiddleware");
const AdminController = require("../controllers/AdminController");

router.all("/*", (req, res, next) => {
  res.locals.layout = "admin";
  next();
});

// DASHBOARD ROUTE
router.get("/home", GlobalMiddleware().adminAuth, AdminController().home);

// VIEW PO
router.get("/po/view", GlobalMiddleware().adminAuth, AdminController().viewpo);

// EXPORT PO
router.get(
  "/po/export",
  GlobalMiddleware().adminAuth,
  AdminController().exportpo
);

// ADD CUSTOMER
router
  .route("/add/customer")
  .get(GlobalMiddleware().adminAuth, AdminController().addCustomer)
  .post(GlobalMiddleware().adminAuth, AdminController().postAddNew);

// UPDATE CUSTOMER
router
  .route("/update/customer")
  .get(GlobalMiddleware().adminAuth, AdminController().updateCustomer);

router
  .route("/findcustomer")
  .get(GlobalMiddleware().adminAuth, AdminController().findCustomer);

router
  .route("/update/customer/:id")
  .post(GlobalMiddleware().adminAuth, AdminController().postUpdateCustomer);

router
  .route("/order/findcustomer")
  .get(GlobalMiddleware().adminAuth, AdminController().orderFindCustomer);

// CREATE NEW DRUM
router
  .route("/new/production")
  .get(GlobalMiddleware().adminAuth, AdminController().newProduction)
  .post(GlobalMiddleware().adminAuth, AdminController().postNewProduction);

// CREATE NEW DRUM ROUTE
router
  .route("/new/production/finalsubmit")
  .get(
    GlobalMiddleware().adminAuth,
    AdminController().newProductionFinalSumbit
  );

// INVENTORY VIEW ROUTE
// router.route('/inventory/view')
//     .get(GlobalMiddleware().adminAuth, AdminController().inventoryView)

router
  .route("/issue/drumno")
  .get(GlobalMiddleware().adminAuth, AdminController().issueDrumNo)
  .post(GlobalMiddleware().adminAuth, AdminController().postIssueDrumNo);

router
  .route("/move/inventory")
  .get(GlobalMiddleware().adminAuth, AdminController().moveInventory)
  .post(GlobalMiddleware().adminAuth, AdminController().postMoveInventory);

// INVENTORY UPDATE
// router.route('/update/inventory')
//     .get(GlobalMiddleware().adminAuth, AdminController().updateInventory)
//     .post(GlobalMiddleware().adminAuth, AdminController().postUpdateInventory);

router
  .route("/search/drum")
  .get(GlobalMiddleware().adminAuth, AdminController().searchDrum)
  .post(GlobalMiddleware().adminAuth, AdminController().postSearchDrum);

// CUSTOMER ENQUIRY
router
  .route("/customer/enquiry")
  .get(GlobalMiddleware().adminAuth, AdminController().customerEnquiry);

router
  .route("/customer/findcust")
  .get(GlobalMiddleware().adminAuth, AdminController().customerFindCust)
  .post(GlobalMiddleware().adminAuth, AdminController().postCustomerFindCust);

router
  .route("/customer/enquiryview")
  .get(GlobalMiddleware().adminAuth, AdminController().customerEnquiryView);

router
  .route("/customer/confirmorder/:id")
  .get(
    GlobalMiddleware().adminAuth,
    AdminController().customerEnquiryConfirmOrder
  )
  .post(
    GlobalMiddleware().adminAuth,
    AdminController().postCustomerEnquiryConfirmOrder
  );

router
  .route("/customer/confirmorders/:ids")
  .get(
    GlobalMiddleware().adminAuth,
    AdminController().customerEnquiryAllOrdersConfirm
  );

router.get(
  "/customer/negotiation/:id",
  GlobalMiddleware().adminAuth,
  AdminController().negotiation
);

router.post(
  "/customer/negotiation",
  GlobalMiddleware().adminAuth,
  AdminController().postNegotiation
);

router.post(
  "/enquiry/close/:id",
  GlobalMiddleware().adminAuth,
  AdminController().customerEnquiryClose
);

router.get(
  "/enquiry/viewdetail/:id",
  GlobalMiddleware().adminAuth,
  AdminController().customerEnquiryDetailView
);

router.get(
  "/po/pending",
  GlobalMiddleware().adminAuth,
  AdminController().poPendingView
);

// CREATE PO ROUTE
router.route("/po/create-contractor").get(GlobalMiddleware().adminAuth, AdminController().createContractor).post(GlobalMiddleware().adminAuth, AdminController().postCreateContractor);


router
  .route("/po/entry?")
  .get(GlobalMiddleware().adminAuth, AdminController().orderCreate)
  .post(GlobalMiddleware().adminAuth, AdminController().postOrderCreate);


router.get('/po/sales-confirmation', GlobalMiddleware().adminAuth, AdminController().salesConfirmation)  

router.get("/logout", GlobalMiddleware().adminAuth, AdminController().logout);
module.exports = router;
