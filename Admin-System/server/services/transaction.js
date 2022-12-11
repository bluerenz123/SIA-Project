const Transaction = require("../schema/transaction");
const Order = require("../schema/order");

exports.list = function (req, res, next) {
  Transaction.find()
    .populate("orders", "-__v")
    .exec((err, list_transactions) => {
      if (err) return next(err);

      res.json(list_transactions);
      return;
    });
};

exports.detail = function (req, res, next) {
  Transaction.findById(req.params.id)
    .populate("orders", "-__v")
    .exec((err, detail_transaction) => {
      if (err) return next(err);

      res.json(detail_transaction);
      return;
    });
};

exports.create = [
  (req, res, next) => {
    if (!Array.isArray(req.body.orders)) {
      req.body.orders =
        typeof req.body.orders === "undefined" ? [] : [req.body.orders];
    }
    next();
  },
  function (req, res, next) {
    const new_transaction = new Transaction({
      customer_id: req.body.customer_id,
      total_price: req.body.total_price,
      orders: req.body.orders,
    });

    new_transaction.save((err) => {
      if (err) return next(err);

      res.json(new_transaction);
      return;
    });
  },
];

exports.delete = [
  function (req, res, next) {
    Transaction.findById(req.params.id, (err, transaction) => {
      if (err) return next(err);
      transaction.remove();
      res.json({ status: "Deletion Success", transaction });
    });
  },
];

exports.update = [
  (req, res, next) => {
    if (!Array.isArray(req.body.orders)) {
      req.body.orders =
        typeof req.body.orders === "undefined" ? [] : [req.body.orders];
    }
    next();
  },

  function (req, res, next) {
    const new_transaction = {
      customer_id: req.body.customer_id,
      total_price: req.body.total_price,
      orders: req.body.orders,
    };

    Transaction.findByIdAndUpdate(
      req.params.id,
      new_transaction,
      { new: true },
      (err, updated_transaction) => {
        if (err) return next(err);

        res.json({ status: "Update Success", updated_transaction });
      }
    );
  },
];
