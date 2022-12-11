const Order = require("../schema/order");

exports.list = function (req, res, next) {
  Order.find({}, (err, list_orders) => {
    if (err) return next(err);

    res.json(list_orders);
    return;
  });
};

exports.detail = function (req, res, next) {
  Order.findById(req.params.id, (err, detail_order) => {
    if (err) return next(err);

    res.json(detail_order);
    return;
  });
};

exports.create = function (req, res, next) {
  const new_order = new Order({
    transaction_id: req.body.transaction_id,
    product_id: req.body.product_id,
    quantity: req.body.quantity,
    total_amount: req.body.total_amount,
  });

  new_order.save((err) => {
    if (err) return next(err);

    res.json(new_order);
    return;
  });
};

exports.delete = function (req, res, next) {
  Order.findByIdAndDelete(req.params.id, (err, removed_order) => {
    if (err) return next(err);

    res.json({ status: "Deletion Success", removed_order });
  });
};

exports.update = function (req, res, next) {
  const new_order = {
    transaction_id: req.body.transaction_id,
    product_id: req.body.product_id,
    quantity: req.body.quantity,
    total_amount: req.body.total_amount,
  };

  Order.findByIdAndUpdate(
    req.params.id,
    new_order,
    { new: true },
    (err, updated_order) => {
      if (err) return next(err);

      res.json({ status: "Update Success", updated_order });
    }
  );
};
