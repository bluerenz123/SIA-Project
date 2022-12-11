var express = require("express");
var router = express.Router();

const user_services = require("../services/user");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ message: "This is the index of your client system server.." });
});

// user routes
router.post("/user/create", user_services.create);
router.post("/user/:id/delete", user_services.delete);
router.post("/user/:id/update", user_services.update);
router.get("/user/:id", user_services.detail);
router.get("/users", user_services.list);

module.exports = router;
