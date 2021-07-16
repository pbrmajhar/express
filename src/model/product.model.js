const mongoose = requre("mongoose");
const objectId = mongoose.Schema;

const productSchema = new mongoose.Schema(
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
      type: objectId,
      ref: "Category",
    },
    sub_category: [
      {
        type: objectId,
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
      enum: ["Yes", "No"],
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

module.exports = mongoose.model("Product", productSchema);
