const express = require("express");
const router = express.Router();
const { SchemaPath, ConfigPath } = require("../helper/pathHelper");
require("../helper/agendaHelper");
const {
  NewInvoiceSchema,
  DeleteInvoice,
  FindInvoice,
  UpdateInvoice,
} = require("../helper/dbHelper");
const InvoiceSchema = require(SchemaPath("Invoice"));
const ListItemSchema = require(SchemaPath("ListItem"));
const { CreateTransporter } = require(ConfigPath("EmailConfig"));

router.post("/createInvoice", async function (req, res) {
  let {
    invoiceNumber,
    dueDate,
    additionalNote,
    paymentInstructions,
    items,
    isPaid,
    currency,
  } = req.body;

  const invoice = await NewInvoiceSchema(
    items,
    invoiceNumber,
    dueDate,
    additionalNote,
    paymentInstructions,
    isPaid,
    currency
  );
  if (invoice.status == false) {
    res.status(500).json({ status: false });
  } else {
    res.status(201).json({ invoice });
  }
});

router.post("/deleteInvoice", function (req, res) {
  let { id } = req.body;
  DeleteInvoice(id).then((response) => {
    if (response == false) {
      res.status(404).json({ status: false, msg: "Could'nt find invoice" });
    } else {
      res.status(200).json({ status: true, msg: "Successfully deleted" });
    }
  });
});

router.post("/findInvoice", function (req, res) {
  let { invoiceId } = req.body;

  FindInvoice(invoiceId).then((response) => {
    if (response == null || response == false) {
      res.status(404).json({ status: false, msg: "Invoice not found" });
    } else {
      res.status(200).json({ status: true, data: response });
    }
  });
});

router.post("/editInvoice", async function (req, res) {
  let { data } = req.body;
  let response = await UpdateInvoice(data);
  if (response.status == false) {
    res.status(404).json(response);
  } else {
    res.status(200).json(response);
  }
});

router.post("/sendInvoiceEmail", async function (req, res) {
  let transporter = await CreateTransporter();
  let { invoiceId } = req.body;

  // Send Invoice data to the EJS template for mailing invoice
  let InvoiceData = await InvoiceSchema.findById(invoiceId.toString());
  if (InvoiceData == null) {
    return res.json({ status: false, msg: "Unable to find invoice" });
  }
  // A dummy purpose of sending the object converted to string
  try {
    transporter
      .sendMail({
        from: process.env.EMAIL_ID,
        to: process.env.RECEIVER_EMAIL,
        subject: "Invoice Reminder",
        header: {
          priority: "high",
        },
        text: JSON.stringify(InvoiceData),
      })
      .then((response) => {
        res.json({ status: true, msg: "Successfully Sent Email" });
      })
      .catch((err) => {
        console.log(err + "Yes");
      });
  } catch (err) {
    throw new Error("Something went wrong");
  }
});

module.exports = router;
