const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Order = require("./order");

const TransactionSchema = new Schema({
  customer_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  total_price: Schema.Types.Decimal128,
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

TransactionSchema.virtual("url").get(function () {
  return `/transaction/${this._id}`;
});
TransactionSchema.pre("remove", function (next) {
  this.orders.forEach((v) => Order.findByIdAndDelete(v).exec());
  next();
});

module.exports = mongoose.model("Transaction", TransactionSchema);
