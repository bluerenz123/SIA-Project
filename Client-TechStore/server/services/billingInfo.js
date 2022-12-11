const BillingInfo = require("../schema/billingInfo");

exports.list = function (req, res, next) {
  BillingInfo.find({}, (err, list_billingInfos) => {
    if (err) return next(err);

    res.json(list_billingInfos);
    return;
  });
};

exports.detail = function (req, res, next) {
  BillingInfo.findById(req.params.id, (err, billingInfo) => {
    if (err) return next(err);

    res.json(billingInfo);
    return;
  });
};

exports.create = function (req, res, next) {
  const new_billingInfo = new BillingInfo({
    user_id: req.body.user_id,
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    credit_card: req.body.credit_card,
    cvv: req.body.cvv,
    expiry_date: req.body.expiry_date,
  });

  new_billingInfo.save((err) => {
    if (err) return next(err);

    res.json(new_billingInfo);
    return;
  });
};

exports.delete = function (req, res, next) {
  BillingInfo.findByIdAndDelete(req.params.id, (err, removed_billingInfo) => {
    if (err) return next(err);

    res.json({ status: "Deletion Success", removed_billingInfo });
  });
};

exports.update = function (req, res, next) {
  const update_billingInfo = {
    user_id: req.body.user_id,
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    credit_card: req.body.credit_card,
    cvv: req.body.cvv,
    expiry_date: req.body.expiry_date,
  };
  BillingInfo.findByIdAndUpdate(
    req.params.id,
    update_billingInfo,
    { new: true },
    (err, updated_billingInfo) => {
      if (err) return next(err);

      res.json({ status: "Update Success", updated_billingInfo });
    }
  );
};
