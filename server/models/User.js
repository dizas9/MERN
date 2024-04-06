const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: { type: "string", required: true },
  lastname: { type: "string", required: true },
  email: { type: "string", required: true, unique: true },
  password: { type: "string", required: true },
  image: { type: "string", required:false },
});

module.exports = mongoose.model("User", UserSchema);
