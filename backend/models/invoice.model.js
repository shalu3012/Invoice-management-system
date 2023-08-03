const mongoose = require("mongoose");

const InvoiceSchema = mongoose.Schema(
  {
    invoiceNo: { type: String },
    status: { type: String, default: "Draft" },
    invoiceDate: { type: String },
    dueDate: { type: Date },
    paidDate: { type: Date },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    company_id: { type: mongoose.Schema.Types.ObjectId, ref: "CoInfo" },
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  },
  { timestamps: true }
);

const Invoice = new mongoose.model("Invoice", InvoiceSchema);
module.exports = Invoice;
