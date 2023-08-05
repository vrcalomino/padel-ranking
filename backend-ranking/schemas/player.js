const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  playedMatches: {
    type: Number,
  },
  wonMatches: {
    type: Number,
  },
  lostMatches: {
    type: Number,
  },
  pastMatches: {
    type: [String],
  },
});

playerSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Player", playerSchema);
