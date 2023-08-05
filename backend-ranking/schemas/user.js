const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  admin: {
    type: Boolean,
    required: false,
    default: false,
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
    delete returnedObject.admin;
  },
});

module.exports = mongoose.model("User", userSchema);
