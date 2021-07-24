const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
  item: {
    totalWorkHours: {
      type: Number,
    },
    ratePerHour: { type: Number },
    workExpenses: { type: Number },
    materialExpenses: [
      {
        materialType: {
          type: String,
        },
        materialCost: {
          type: Number,
        },
      },
    ],
    materialCostPerList: {
      type: Number,
    },
    laborExpenses: { type: Number },
  },
});

module.exports = mongoose.model("Item", ItemSchema);
