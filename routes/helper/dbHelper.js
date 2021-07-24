const { response } = require("express");
const Invoice = require("../../models/Invoice");
const { SchemaPath } = require("./pathHelper");
const InvoiceSchema = require(SchemaPath("Invoice"));
const ListItemSchema = require(SchemaPath("ListItem"));

async function NewInvoiceSchema(
  items,
  invoiceNumber,
  dueDate,
  additionalNote,
  paymentInstructions,
  isPaid,
  currency
) {
  return new Promise((resolve, reject) => {
    let Invoice = new InvoiceSchema({
      invoiceNumber,
      isPaid,
      currency,
      dueDate,
      additionalNote,
      paymentInstructions,
    });

    let totalCost = 0;
    items.forEach((item) => {
      let list = new ListItemSchema({ item });
      let otherExpenses =
        item.totalWorkHours * item.ratePerHour +
        item.workExpenses +
        item.laborExpenses;

      let materialCostPerList = 0;
      item.materialExpenses.forEach((material) => {
        materialCostPerList += material.materialCost;
      });
      list.item.materialCostPerList = materialCostPerList;

      list.save().then((res) => {
        Invoice.updateOne(
          { $push: { listItems: res._id } },
          function (err, doc) {
            if (err) {
              console.log(err);
            } else {
              console.log(doc);
            }
          }
        );
      });
      totalCost += otherExpenses + materialCostPerList;
    });

    Invoice.totalCost = totalCost;
    Invoice.save(function (err, savedInvoice) {
      if (err) {
        resolve({ status: false });
      } else {
        resolve({ status: true, savedInvoice });
      }
    });
  });
}

function DeleteInvoice(id) {
  return new Promise((resolve) => {
    InvoiceSchema.findByIdAndDelete(id).then((Invoice) => {
      if (Invoice == null) {
        resolve(false);
      } else {
        let listIds = [];
        Invoice.listItems.forEach((item) => {
          listIds.push(item);
        });
        ListItemSchema.deleteMany({ _id: { $in: listIds } }, (err, doc) => {
          if (err) {
            console.log(err);
          } else {
            resolve(true);
          }
        });
      }
    });
  });
}

function FindInvoice(id) {
  return new Promise((resolve, reject) => {
    InvoiceSchema.findById(id)
      .populate("listItems")
      .exec(function (err, item) {
        if (err) {
          reject(false);
        } else {
          resolve(item);
        }
      });
  });
}

async function UpdateInvoiceUtil(data) {
  return new Promise(async (resolve, reject) => {
    let Invoice = await InvoiceSchema.findById(data.id);
    if (Invoice == null) {
      resolve(false);
    } else {
      Invoice.invoiceNumber = data.invoiceNumber;
      Invoice.dueDate = data.dueDate;
      Invoice.additionalNote = data.additionalNote;
      Invoice.paymentInstructions = data.paymentInstructions;
      let updatedInvoice = Invoice.save();
      resolve(updatedInvoice);
    }
  });
}

async function UpdateInvoice(data) {
  let updateInvoiceInfo = await UpdateInvoiceUtil(data);
  if (updateInvoiceInfo == false) {
    return { status: false, msg: "Invoice not found" };
  }

  for (let index = 0; index < data.items.length; index++) {
    const { id } = data.items[index];

    let listItem = await ListItemSchema.findById(id);
    for (const key in data.items[index]) {
      if (key.toString() !== "id") {
        listItem.item[key] = data.items[index][key];
      }
    }
    let updatedList = await listItem.save();
  }
  return { status: true, msg: "successfully Updated" };
}

module.exports = {
  NewInvoiceSchema,
  DeleteInvoice,
  FindInvoice,
  UpdateInvoice,
};
