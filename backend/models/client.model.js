const mongoose = require("mongoose");

const ClientSchema = mongoose.Schema(
  {
    coName: {
      type: String,
      required: [true, "Company name is required."],
      min: 2,
    },
    coWeb: {
      type: String,
      required: [true, "Company name is required."],
      min: 2,
    },
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, min: 2 },
    taxName: { type: String, default: "VAT", min: 2 },
    taxRate: { type: String, required: true, min: 2 },
    taxNo: { type: String, required: true, min: 2 },
    addressStreet: { type: String, required: true, min: 2 },
    addressCountry: { type: String, required: true, min: 2 },
    addressState: { type: String, required: true, min: 2 },
    addressCity: { type: String, required: true, min: 2 },
    addressPostal: { type: String, required: true, min: 2 },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    company_id: { type: mongoose.Schema.Types.ObjectId, ref: "CoInfo" },
    invoiceLength: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Client = new mongoose.model("Client", ClientSchema);
module.exports = Client;
