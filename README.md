# Backend of Invoice application

[![Author](http://img.shields.io/badge/author-@Kunal_Singhal-blue.svg)](https://github.com/Kunal-2001)

Backend of An invoice application built on top of Nodejs, Express , Agenda and MongoDB that supports all CRUD operations,<br>mailing features, Alerts on passing due date.

## Setting Enviroment Variables

    cp .env.example .env

    NOTE: Replace Enviroment Variables in the .env file

## Install

    npm install

## Run the app

    nodemon app.js (RUNS ON PORT -> 3000)

## Run the tests

    npm test (CLI output)

# APIS

The API documentation to the example app is described below.

## Get invoice by ID

### Request

`POST /apis/findInvoice`

    curl -i -H 'Accept: application/json' -d 'invoiceId=YOUR_INVOICE_ID'  http://localhost:3000/apis/findInvoice

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 975
    Date: Sat, 24 Jul 2021 09:50:28 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    [Response]

## Create a new Invoice

### Request

`POST /apis/createInvoice/`

    curl -iX POST -H 'Content-Type: application/json' -d '@test/sampleInvoice.json'  http://localhost:3000/apis/createInvoice

### Response

    HTTP/1.1 201 Created
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 338
    Date: Sat, 24 Jul 2021 10:03:01 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"invoice":{"status":true,"savedInvoice":{"listItems":[],"isPaid":false,"status":"Unpaid","currency":"$","dueDate":"2021-07-24T09:50:11.037Z","_id":"60fbe5559e0e5836b9c2cbda","invoiceNumber":"IND-007","additionalNote":"Sample Note","paymentInstructions":{"bankTransfer":"2127714","chequesPayableTo":"XYZ Coop"},"totalCost":3420,"__v":0}}}

## Delete Invoice with ID

### Request

`POST /apis/deleteInvoice/`

    curl -i -H 'Accept: application/json' -d 'id=60fbd301c785a026383606d9'  http://localhost:3000/apis/deleteInvoice

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 44
    ETag: W/"2c-jzBE6U/dk6kQbOo7ANwsRW13Sow"
    Date: Sat, 24 Jul 2021 10:10:19 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"status":true,"msg":"Successfully deleted"}

## Edit existing Invoice

### Request

`POST /apis/editInvoice/`

    curl -iX POST -H 'Content-Type: application/json' -d '@test/updatedInvoice.json'  http://localhost:3000/apis/editInvoice

### Response

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 44
    ETag: W/"2c-Y2dfMxFuJ58ArMikV1CkYf+Qr1M"
    Date: Sat, 24 Jul 2021 10:17:34 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"status":true,"msg":"successfully Updated"}
