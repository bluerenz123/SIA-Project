const Cart = require("../schema/cart");

exports.list = function (req, res, next) {
  Cart.find({}, (err, list_carts) => {
    if (err) return next(err);

    res.json(list_carts);
    return;
  });
};

exports.detail = function (req, res, next) {
  Cart.findById(req.params.id, (err, detail_cart) => {
    if (err) return next(err);

    res.json(detail_cart);
    return;
  });
};

exports.create = function (req, res, next) {
  const new_cart = new Cart({
    user_id: req.body.user_id,
    product_id: req.body.product_id,
    quantity: req.body.quantity,
    total_price: req.body.total_price,
  });

  new_cart.save((err) => {
    if (err) return next(err);

    res.json(new_cart);
    return;
  });
};

exports.delete = function (req, res, next) {
  Cart.findByIdAndDelete(req.params.id, (err, removed_cart) => {
    if (err) return next(err);

    res.json({ status: "Deletion Success", removed_cart });
  });
};

exports.update = function (req, res, next) {
  const new_cart = {
    user_id: req.body.user_id,
    product_id: req.body.product_id,
    quantity: req.body.quantity,
    total_price: req.body.total_price,
  };

  Cart.findByIdAndUpdate(
    req.params.id,
    new_cart,
    { new: true },
    (err, updated_cart) => {
      if (err) return next(err);

      res.json({ status: "Update Success", updated_cart });
    }
  );
};
