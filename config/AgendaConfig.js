const Agenda = require("agenda");

const dashboardName = process.env.MONGODB_DASHBOARD_NAME;
const mongoConnectionString = `mongodb://localhost/${dashboardName}`;

const agenda = new Agenda({ db: { address: mongoConnectionString } });

module.exports = { agenda };
