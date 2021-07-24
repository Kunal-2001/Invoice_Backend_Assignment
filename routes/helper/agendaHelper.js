const { SchemaPath, ConfigPath } = require("./pathHelper");
const { agenda } = require(ConfigPath("AgendaConfig"));
const InvoiceSchema = require(SchemaPath("Invoice"));

agenda.define("findInvoice", async (job) => {
  // find all invoices and check their due date
  InvoiceSchema.find({}, function (err, invoices) {
    // Can Perform operations such as sending reminder to the client
    invoices.forEach(async (invoice) => {
      let dueDate = new Date(invoice.dueDate);
      let currentDate = new Date();
      if (dueDate < currentDate) {
        invoice.status = "delayed";
      }
      let updatedInvoice = await invoice.save();
    });
  });
});
(async function () {
  const dateQuery = agenda.create("findInvoice");
  await agenda.start();
  await dateQuery.repeatEvery("10 minutes").save();
})();
