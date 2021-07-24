const mongoose = require("mongoose");
const dashboardName = process.env.MONGODB_DASHBOARD_NAME;
const connectionURI = `mongodb://localhost/${dashboardName}`;

mongoose
  .connect(connectionURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));
