let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let sampleData = require("./sampleInvoice.json");
chai.should();

chai.use(chaiHttp);

describe("testing invoice API", () => {
  describe("POST /apis/findInvoice", () => {
    it("should return the invoice matched with id", (done) => {
      const invoiceId = { invoiceId: process.env.FIND_INVOICE_ID };
      chai
        .request(server)
        .post("/apis/findInvoice")
        .send(invoiceId)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });

  describe("POST /apis/createInvoice", () => {
    it("should create a new invoice", (done) => {
      chai
        .request(server)
        .post("/apis/createInvoice")
        .send(sampleData)
        .end((err, response) => {
          const data = response.body.invoice.savedInvoice;
          response.should.have.status(201);
          response.body.should.be.a("object");
          data.should.be.property("invoiceNumber").eq("IND-007");
          data.should.be.property("additionalNote").eq("Sample Note");
          data.should.be.property("paymentInstructions").should.be.a("object");
          data.should.be
            .property("paymentInstructions")
            .property("bankTransfer")
            .eq("2127714");
          data.should.be
            .property("paymentInstructions")
            .property("chequesPayableTo")
            .eq("XYZ Coop");
          data.should.be.property("totalCost").eq(3420);
          done();
        });
    });
  });
  describe("POST /apis/deleteInvoice", () => {
    it("should return the status of delete action", (done) => {
      const invoiceId = { id: process.env.REMOVE_INVOICE_ID };
      chai
        .request(server)
        .post("/apis/deleteInvoice")
        .send(invoiceId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.property("msg").eq("Successfully deleted");
          done();
        });
    });
  });
});
