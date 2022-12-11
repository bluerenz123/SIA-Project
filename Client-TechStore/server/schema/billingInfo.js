const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillingInfo = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    address: String,
    email: String,
    credit_card: String,
    cvv: String,
    expiry_date: Date,
  },
  { timestamps: true }
);

BillingInfo.virtual("url").get(function () {
  return `/billing-info/${this._id}`;
});

module.exports = mongoose.model("BillingInfo", BillingInfo);
