const User = require("../schema/user");

exports.list = function (req, res, next) {
  User.find({}, (err, list_users) => {
    if (err) return next(err);

    res.json(list_users);
    return;
  });
};

exports.detail = function (req, res, next) {
  User.findById(req.params.id, (err, user) => {
    if (err) return next(err);

    res.json(user);
    return;
  });
};

exports.create = function (req, res, next) {
  const new_user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  new_user.save((err) => {
    if (err) return next(err);

    res.json(new_user);
    return;
  });
};

exports.delete = function (req, res, next) {
  User.findByIdAndDelete(req.params.id, (err, removed_user) => {
    if (err) return next(err);

    res.json({ status: "Deletion Success", removed_user });
  });
};

exports.update = function (req, res, next) {
  const update_user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  User.findByIdAndUpdate(
    req.params.id,
    update_user,
    { new: true },
    (err, updated_user) => {
      if (err) return next(err);

      res.json({ status: "Update Success", updated_user });
    }
  );
};
