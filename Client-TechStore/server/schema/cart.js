const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    product_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },
    total_price: Schema.Types.Decimal128,
  },
  { timestamps: true }
);

CartSchema.virtual("url").get(function () {
  return `/cart/${this._id}`;
});

module.exports = mongoose.model("Cart", CartSchema);
