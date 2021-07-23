const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      requred: true,
      text: true,
      maxlength: 32,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    sub_category: [
      {
        type: ObjectId,
        ref: "Subcategory",
      },
    ],
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: Array,
    shipping: {
      type: String,
      enum: ["yes", "no"],
    },
    colors: Array,
    brands: Array,
    size: Array,
    // rating: [
    //   {
    //     type: Number,
    //     postedBy: { type: objectId, ref: "User" },
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
