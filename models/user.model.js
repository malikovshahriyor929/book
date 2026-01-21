const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActiveted: { type: Boolean, require: true, default: false },
  },
  { timestamps: true },
);

module.exports = model("user", postSchema);
