const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Admin Schema
const AdminSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

AdminSchema.virtual("url").get(function () {
  return `/admin/${this._id}`;
});

module.exports = mongoose.model("Admin", AdminSchema);
