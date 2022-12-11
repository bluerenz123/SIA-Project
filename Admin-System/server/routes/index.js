var express = require("express");
var router = express.Router();

const admin_services = require("../services/admin");
const product_services = require("../services/product");
const order_services = require("../services/order");
const transaction_services = require("../services/transaction");

//Index
router.get("/", function (req, res, next) {
	res.json({ message: "This is the index of the admin system server..." });
});

// ADMIN routes
router.post("/admin/create", admin_services.create);
router.post("/admin/:id/delete", admin_services.delete);
router.post("/admin/:id/update", admin_services.update);
router.get("/admin/:id", admin_services.detail);
router.get("/admins", admin_services.list);

// PRODUCTS routes
router.post("/product/create", product_services.create);
router.post("/product/:id/delete", product_services.delete);
router.post("/product/:id/update", product_services.update);
router.get("/product/:id", product_services.detail);
router.get("/products", product_services.list);

// ORDERS routes
router.post("/order/create", order_services.create);
router.post("/order/:id/delete", order_services.delete);
router.post("/order/:id/update", order_services.update);
router.get("/order/:id", order_services.detail);
router.get("/orders", order_services.list);

// TRANSACTION routes
router.post("/transaction/create", transaction_services.create);
router.post("/transaction/:id/delete", transaction_services.delete);
router.post("/transaction/:id/update", transaction_services.update);
router.get("/transaction/:id", transaction_services.detail);
router.get("/transactions", transaction_services.list);

module.exports = router;
