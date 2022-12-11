const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  transaction_id: {
    type: Schema.Types.ObjectId,
    ref: "Transaction",
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },
  total_amount: Schema.Types.Decimal128,
});

OrderSchema.virtual("url").get(function () {
  return `/order/${this._id}`;
});

module.exports = mongoose.model("Order", OrderSchema);
