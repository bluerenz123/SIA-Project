var express = require("express");
var router = express.Router();

const user_services = require("../services/user");
const cart_services = require("../services/cart");
const billingInfo_services = require("../services/billingInfo");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ message: "This is the index of your client system server.." });
});

// USER routes
router.post("/user/create", user_services.create);
router.post("/user/:id/delete", user_services.delete);
router.post("/user/:id/update", user_services.update);
router.get("/user/:id", user_services.detail);
router.get("/users", user_services.list);

// CARTS routes
router.post("/cart/create", cart_services.create);
router.post("/cart/:id/delete", cart_services.delete);
router.post("/cart/:id/update", cart_services.update);
router.get("/cart/:id", cart_services.detail);
router.get("/carts", cart_services.list);

// BILLING INFO routes
router.post("/billing-info/create", billingInfo_services.create);
router.post("/billing-info/:id/delete", billingInfo_services.delete);
router.post("/billing-info/:id/update", billingInfo_services.update);
router.get("/billing-info/:id", billingInfo_services.detail);
router.get("/billing-infos", billingInfo_services.list);

module.exports = router;
