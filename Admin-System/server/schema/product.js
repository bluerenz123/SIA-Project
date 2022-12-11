const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["Phone", "Tablet", "Laptop", "Accessories"],
    },
    description: String,
    price: { type: Schema.Types.Decimal128, required: true },
    image_path: String,
  },
  { timestamps: true }
);

ProductSchema.virtual("url").get(function () {
  return `/product/${this._id}`;
});

module.exports = mongoose.model("Product", ProductSchema);
