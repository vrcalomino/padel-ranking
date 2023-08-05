const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  place: {
    type: String,
  },
  coupleOne: {
    type: [String],
    required: true,
  },
  coupleTwo: {
    type: [String],
    required: true,
  },
  firstSet: {
    type: [Number],
    required: true,
  },
  secondSet: {
    type: [Number],
    required: true,
  },
  thirdSet: {
    type: [Number],
  },
});

matchSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Match", matchSchema);
