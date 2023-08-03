const mongoose = require("mongoose");

const CoInfoSchema = mongoose.Schema(
  {
    coName: {
      type: String,
      required: [true, "Company Name is required."],
      min: 2,
    },
    coWeb: {
      type: String,
      required: [true, "Company website is required."],
      min: 2,
    },
    taxName: { type: String, default: "VAT", min: 2 },
    taxRate: {
      type: Number,
      required: [true, "Tax rate is required."],
      min: 2,
    },
    taxNo: { type: Number, required: [true, "Tax number is required."] },
    addressStreet: {
      type: String,
      required: [true, "Street is required."],
      min: 2,
    },
    addressCountry: {
      type: String,
      required: [true, "Country is required."],
      min: 2,
    },
    addressState: {
      type: String,
      required: [true, "State is required."],
      min: 2,
    },
    addressCity: {
      type: String,
      required: [true, "City is required."],
      min: 2,
    },
    addressPostal: {
      type: String,
      required: [true, "Postal Code is required."],
      min: 2,
    },
    user_id: { type: mongoose.Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  }
);
const CoInfo = new mongoose.model("CoInfo", CoInfoSchema);
module.exports = CoInfo;
