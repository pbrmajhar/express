const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    file: {
      type: Buffer,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);
