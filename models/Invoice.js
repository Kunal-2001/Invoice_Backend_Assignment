const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    uppercase: true,
    maxLength: 7,
    minLength: 7,
  },
  listItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  isPaid: { type: Boolean, default: false },
  status: { type: String, default: "Unpaid" },
  totalCost: { type: Number },
  currency: { type: String, default: "$" },
  dueDate: { type: Date, default: new Date(+new Date() + 2 * 60 * 1000) },
  additionalNote: {
    type: String,
  },
  paymentInstructions: {
    bankTransfer: {
      type: String,
    },
    chequesPayableTo: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
