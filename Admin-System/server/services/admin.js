const Admin = require("../schema/admin");

exports.list = function (req, res, next) {
  Admin.find({}, (err, list_admins) => {
    if (err) return next(err);

    res.json(list_admins);
    return;
  });
};

exports.detail = function (req, res, next) {
  Admin.findById(req.params.id, (err, admin) => {
    if (err) return next(err);

    res.json(admin);
    return;
  });
};

exports.create = function (req, res, next) {
  const new_admin = new Admin({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  new_admin.save((err) => {
    if (err) return next(err);

    res.json(new_admin);
    return;
  });
};

exports.delete = function (req, res, next) {
  Admin.findByIdAndDelete(req.params.id, (err, removed_admin) => {
    if (err) return next(err);

    res.json({ status: "Deletion Success", removed_admin });
  });
};

exports.update = function (req, res, next) {
  const update_admin = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  Admin.findByIdAndUpdate(
    req.params.id,
    update_admin,
    { new: true },
    (err, updated_admin) => {
      if (err) return next(err);

      res.json({ status: "Update Success", updated_admin });
    }
  );
};
