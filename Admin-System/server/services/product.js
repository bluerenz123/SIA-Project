const Product = require("../schema/product");

exports.list = function (req, res, next) {
  Product.find({}, (err, list_Products) => {
    if (err) return next(err);

    res.json(list_Products);
    return;
  });
};

exports.detail = function (req, res, next) {
  Product.findById(req.params.id, (err, detail_product) => {
    if (err) return next(err);

    res.json(detail_product);
    return;
  });
};

exports.create = function (req, res, next) {
  const new_product = new Product({
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    price: req.body.price,
    image_path: req.body.image_path,
  });

  new_product.save((err) => {
    if (err) return next(err);

    res.json(new_product);
    return;
  });
};

exports.delete = function (req, res, next) {
  Product.findByIdAndDelete(req.params.id, (err, removed_product) => {
    if (err) return next(err);

    res.json({ status: "Deletion Success", removed_product });
  });
};

exports.update = function (req, res, next) {
  const update_product = {
    name: req.body.name,
    type: req.body.type,
    price: req.body.price,
    description: req.body.description,
    image_path: req.body.image_path,
  };

  Product.findByIdAndUpdate(
    req.params.id,
    update_product,
    { new: true },
    (err, updated_product) => {
      if (err) return next(err);

      res.json({ status: "Update Success", updated_product });
    }
  );
};
